---
order: 1
---

# Introduction

Sorbus is a typed fetch client for APIs where you can't share types directly — Rails, Django, Go, Laravel. Instead of verbose OpenAPI specs and opaque code generators, you define your API as a contract: endpoints with Zod schemas. Params, responses, and errors are all inferred.

The contract is just TypeScript — compose schemas, pick fields for forms, reuse them for validation. Write contracts by hand, or generate them with [Apiwork](https://apiwork.dev) from your Rails API.

## The Contract

```typescript
// contract.ts
import * as z from 'zod';

const InvoiceSchema = z.object({
  id: z.string(),
  number: z.string(),
  total: z.number(),
});

export const contract = {
  endpoints: {
    invoices: {
      create: {
        method: 'POST',
        path: '/invoices',
        request: {
          body: z.object({
            invoice: InvoiceSchema.pick({
              number: true,
              total: true,
            }),
          }),
        },
        response: {
          body: z.object({
            invoice: InvoiceSchema,
          }),
        },
        errors: [422],
      },
      show: {
        method: 'GET',
        path: '/invoices/:id',
        pathParams: z.object({
          id: z.string(),
        }),
        response: {
          body: z.object({
            invoice: InvoiceSchema,
          }),
        },
      },
    },
  },
  error: z.object({
    errors: z.record(z.string(), z.array(z.string())).optional(),
    message: z.string(),
  }),
} as const;
```

## The Client

```typescript
// app.ts
import { createClient } from 'sorbus';
import { contract } from './contract';

const api = createClient(contract, '/api');

// Errors throw — just use the data
const { invoice } = await api.invoices.show({ id: '123' });

// Catch specific status codes when you need to
const result = await api.invoices.create(
  {
    invoice: {
      number: 'INV-001',
      total: 1000,
    },
  },
  { catch: [422] },
);

if (!result.ok) {
  setErrors(result.data.errors);
  return;
}

router.push(`/invoices/${result.data.invoice.id}`);
```

## Throw by Default

Most API calls don't need error handling at the call site — if a request fails, you want it to bubble up. Modern frameworks are built around this: SvelteKit catches thrown errors in `+error.svelte`, React Router in `ErrorBoundary`, TanStack Query in its `error` state.

When you do need to handle a specific error — like showing validation messages from a 422 — you opt in with `catch`. The return type becomes a `Result` with an `ok` discriminant. Only the status codes you list are caught. Everything else still throws.

See [Error Handling](./error-handling/) for the full model.

## Flat Params

Endpoints define path params, query params, and body as separate schemas in the contract. At the call site, you send them all in one flat object — Sorbus reads the schemas and routes each param to the right place.

```typescript
api.invoices.update({
  id: '456',
  invoice: {
    total: 1500,
  },
});
```

If you need explicit control — or if param names ever collide — use `.raw()`:

```typescript
api.invoices.update.raw({
  pathParams: {
    id: '456',
  },
  body: {
    invoice: {
      total: 1500,
    },
  },
});
```

## One Error Shape

Sorbus expects your API to return errors in a consistent format — one schema, shared across all endpoints. A single error shape means every caught error has the same structure.

## How It Works

1. You write a **contract** — a plain object with Zod schemas for each endpoint
2. `createClient` builds a **typed client** from the contract's endpoint tree
3. Each endpoint becomes an **Operation** — a callable with inferred params, response, and a `.raw()` overload
4. Calls **without** `catch` return the response data directly — errors throw
5. Calls **with** `catch` return a `Result` — caught errors are values, uncaught errors throw

The contract is the single source of truth.

## Next Steps

- [Installation](./installation.md) — add Sorbus to your project
- [Contract](./contract/) — define your API shape
- [Error Handling](./error-handling/) — the throw/catch model in detail
