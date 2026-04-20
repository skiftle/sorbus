---
order: 9
---
# Type Performance

Sorbus infers the client type from the contract. For small and medium APIs this is instant — you write a contract, TypeScript derives every operation.

Large contracts — hundreds of endpoints, deep nested Zod schemas — are a different story. Inference runs on every file that imports the client. Tooltips lag. `tsc` takes longer.

The fix is to pre-materialize the client type so TypeScript resolves it once and reuses the result everywhere.

::: info
If the API can be split into smaller clients — one per subsystem, say — do that first.
:::

## Why Inference Gets Slow

TypeScript resolves `createClient(contract)` by walking the contract, unwrapping every Zod schema through `z.output<T>`, and assembling an operation type for each endpoint. Each step is cheap. Multiplied across hundreds of endpoints, the cost adds up.

The single biggest contributor is Zod's `output<T>`. Its conditional type machinery is deep, and it runs once per schema, per file, per open.

## Level 1: Materialize the Operation Tree

`createClientFactory<T>` accepts an explicit return type:

```typescript
import type { Operation } from 'sorbus';
import { createClientFactory, defineContract, defineEndpoint } from 'sorbus';
import * as z from 'zod';

import { InvoiceSchema } from './domains/invoice';

const show = defineEndpoint({
  method: 'GET',
  path: '/invoices/:id',
  pathParams: z.object({ id: z.string() }),
  response: { body: z.object({ invoice: InvoiceSchema }) },
});

const contract = defineContract({
  endpoints: {
    invoices: { show },
  },
});

interface InvoicesOperationTree {
  show: Operation<typeof contract.endpoints.invoices.show>;
}

export interface Client {
  invoices: InvoicesOperationTree;
}

export const createClient = createClientFactory<Client>(contract);
```

Consumers see `Client` directly. TypeScript stops re-deriving the operation tree on every import.

This helps, but only partly. Each `Operation<typeof contract.endpoints.x>` still resolves Zod schemas at use sites — the `output<T>` work remains. You skip the tree walk, not the per-endpoint cost.

## Level 2: Materialize the Endpoints

The deeper optimization replaces `typeof` references with plain TypeScript interfaces, so Zod never runs during inference:

```typescript
import type { Operation } from 'sorbus';
import { createClientFactory, defineContract, defineEndpoint } from 'sorbus';
import * as z from 'zod';

import type { Invoice } from './domains/invoice';
import { InvoiceSchema } from './domains/invoice';

const show = defineEndpoint({
  method: 'GET',
  path: '/invoices/:id',
  pathParams: z.object({ id: z.string() }),
  response: { body: z.object({ invoice: InvoiceSchema }) },
});

const contract = defineContract({
  endpoints: {
    invoices: { show },
  },
});

interface InvoicesShow {
  method: 'GET';
  path: '/invoices/:id';
  pathParams: { id: string };
  response: { body: { invoice: Invoice } };
}

interface InvoicesOperationTree {
  show: Operation<InvoicesShow>;
}

export interface Client {
  invoices: InvoicesOperationTree;
}

export const createClient = createClientFactory<Client>(contract);
```

`Operation<InvoicesShow>` stays in the TypeScript type system. No `output<T>`, no Zod conditionals. The contract still validates at runtime — this is only about the static type surface.

The trade: you maintain endpoint interfaces in parallel with Zod schemas. Every schema change means a matching endpoint update. For a hand-written contract, this is where the maintenance cost lands.

## Apiwork Does Level 2 for Free

If you generate your contract with [Apiwork](../apiwork/), the generator produces endpoint interfaces alongside the contract:

```bash
npx apiwork sorbus http://localhost:3000/api/v1/.apiwork --outdir src/api/sorbus
```

Output:

```
src/api/sorbus/
  client.ts        Client interface + createClient
  contract.ts      Sorbus contract
  domains/         Domain type aliases
  endpoints/       OperationTree with endpoint interfaces
```

You regenerate on contract changes. Endpoint interfaces stay in sync with Zod schemas without a separate maintenance step.

## When to Reach for This

| API size                     | Approach                                                  |
| ---------------------------- | --------------------------------------------------------- |
| < 30 endpoints               | `createClient(contract, baseUrl)` — inference handles it  |
| 30–100 endpoints             | Same — still fast enough                                  |
| 100+ endpoints, deep schemas | `createClientFactory<Client>` with materialized endpoints    |
| Any size, using Apiwork      | Automatic — the generator materializes endpoints             |

Start with inference. Materialize when type-checking actually slows you down.

## Design Note

Sorbus defaults to inference because it is the lightest contract: write TypeScript, get TypeScript. Codegen is optional.

Materialization is an escape hatch for scale, not the recommended starting point. When you already run codegen via Apiwork, there is nothing extra to add — endpoint interfaces come with every regeneration.
