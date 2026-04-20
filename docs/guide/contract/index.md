---
order: 3
---

# Contract

The contract is a plain object that describes your entire API — endpoints, params, response shapes, and error schema. It uses Zod for validation and type inference.

## Structure

A contract has two top-level keys:

- `endpoints` — a nested tree of endpoint definitions
- `error` — a Zod schema for error responses (optional)

```typescript
import * as z from 'zod';

export const contract = {
  endpoints: {
    invoices: {
      index: {
        method: 'GET',
        path: '/invoices',
        response: {
          body: z.object({
            invoices: z.array(InvoiceSchema),
          }),
        },
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
    message: z.string(),
    errors: z.record(z.string(), z.array(z.string())).optional(),
  }),
} as const;
```

::: tip
`as const` is required when writing a contract as a plain object. It preserves literal types for `method`, `errors`, and the endpoint tree structure. If you use `defineContract` and `defineEndpoint`, this is inferred automatically — see [Splitting Across Files](#splitting-across-files).
:::

## Endpoints

Each endpoint defines the HTTP method, path, and schemas for request and response:

```typescript
{
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
  errors: [401, 404, 500],
}
```

| Field        | Required | Description                                                                                  |
| ------------ | -------- | -------------------------------------------------------------------------------------------- |
| `method`     | Yes      | HTTP method (`GET`, `POST`, `PATCH`, `DELETE`, etc.)                                         |
| `path`       | Yes      | URL path with `:param` placeholders                                                          |
| `response`   | No       | Object with `body` — Zod schema for the success response. Omit for 204 No Content endpoints. |
| `pathParams` | No       | Zod schema for path parameters                                                               |
| `request`    | No       | Object with `query` and/or `body` — Zod schemas for request data                             |
| `errors`     | No       | Array of possible error status codes                                                         |

## Nesting

Endpoints can be nested arbitrarily deep. The nesting becomes the client's call structure:

```typescript
export const contract = {
  endpoints: {
    accounts: {
      timeEntries: {
        index: {
          method: 'GET',
          path: '/:accountId/time_entries',
          pathParams: z.object({
            accountId: z.string(),
          }),
          response: {
            body: z.object({
              timeEntries: z.array(TimeEntrySchema),
            }),
          },
        },
        approve: {
          method: 'PATCH',
          path: '/:accountId/time_entries/:id/approve',
          pathParams: z.object({
            accountId: z.string(),
            id: z.string(),
          }),
          response: {
            body: z.object({
              timeEntry: TimeEntrySchema,
            }),
          },
        },
      },
    },
  },
} as const;
```

This produces: `api.accounts.timeEntries.index(...)`, `api.accounts.timeEntries.approve(...)`, etc.

## Error Schema

The `error` key defines the shape of error response bodies. It applies to all endpoints and is used to type the `data` field on caught errors:

```typescript
export const contract = {
  endpoints: {
    // ...
  },
  error: z.object({
    message: z.string(),
    errors: z.record(z.string(), z.array(z.string())).optional(),
  }),
} as const;
```

When `error` is defined, caught errors are typed:

```typescript
const result = await api.invoices.create(data, { catch: [422] });

if (!result.ok) {
  result.data.message; // string
  result.data.errors; // Record<string, string[]> | undefined
}
```

When `error` is omitted, caught error data is `unknown` — you parse it yourself.

## Errors Array

The `errors` array on each endpoint lists possible error status codes. This gives you autocomplete when using `catch`:

```typescript
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
  errors: [400, 401, 422, 500],
  //       ^-- autocomplete in { catch: [...] }
},
```

If `errors` is omitted, `catch` accepts any `number`.

## Shared Schemas

Extract shared schemas as constants above the contract. This avoids duplication across endpoints — and since Zod schemas are plain objects, they can be reused anywhere that accepts a schema: form validation, server function input validators, test fixtures.

```typescript
import * as z from 'zod';

const InvoiceSchema = z.object({
  id: z.string(),
  number: z.string(),
  total: z.number(),
  state: z.enum(['draft', 'sent', 'paid']),
});

const PaginationSchema = z.object({
  page: z.number(),
  totalPages: z.number(),
  totalCount: z.number(),
});

export const contract = {
  endpoints: {
    invoices: {
      index: {
        method: 'GET',
        path: '/invoices',
        request: {
          query: z.object({
            page: z.number().optional(),
          }),
        },
        response: {
          body: z.object({
            invoices: z.array(InvoiceSchema),
            meta: PaginationSchema,
          }),
        },
        errors: [400, 401, 500],
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
        errors: [401, 404, 500],
      },
    },
  },
  error: z.object({
    message: z.string(),
    errors: z.record(z.string(), z.array(z.string())).optional(),
  }),
} as const;
```

### Reusing Schemas Outside the Contract

When schemas live in their own files (see [Splitting Across Files](#splitting-across-files)), they become your single source of truth for domain types — not just for Sorbus. The contract wraps them in API conventions (`{ invoice: InvoiceSchema }`), but the raw schema is useful on its own.

**SvelteKit remote functions:**

```typescript
// src/routes/invoices/data.remote.ts
import { command } from '$app/server';
import { InvoiceSchema } from '$lib/contract/schemas/invoice';
import { api } from '$lib/api';

export const createInvoice = command(
  InvoiceSchema.pick({
    number: true,
    total: true,
  }),
  async (data) => {
    return await api.invoices.create({ invoice: data }, { catch: [422] });
  },
);
```

**React form validation:**

```typescript
import { InvoiceSchema } from '@/contract/schemas/invoice';

const CreateInvoiceSchema = InvoiceSchema.pick({
  number: true,
  total: true,
});

function validate(formData: FormData) {
  return CreateInvoiceSchema.safeParse({
    number: formData.get('number'),
    total: Number(formData.get('total')),
  });
}
```

The pattern: define the domain shape once, use it everywhere.

## Splitting Across Files

For larger APIs, split the contract into separate files using `defineContract` and `defineEndpoint`. These are identity functions that provide type inference without `as const`.

```
src/
  contract/
    index.ts
    error.ts
    schemas/
      invoice.ts
      customer.ts
    endpoints/
      invoices.ts
      customers.ts
```

Define schemas in their own files:

```typescript
// contract/schemas/invoice.ts
import * as z from 'zod';

export const InvoiceSchema = z.object({
  id: z.string(),
  number: z.string(),
  total: z.number(),
  state: z.enum(['draft', 'sent', 'paid']),
});
```

Define endpoints per resource:

```typescript
// contract/endpoints/invoices.ts
import * as z from 'zod';
import { defineEndpoint } from 'sorbus';
import { InvoiceSchema } from '../schemas/invoice';

export const invoices = {
  index: defineEndpoint({
    method: 'GET',
    path: '/invoices',
    request: {
      query: z.object({
        page: z.number().optional(),
      }),
    },
    response: {
      body: z.object({
        invoices: z.array(InvoiceSchema),
      }),
    },
    errors: [400, 401, 500],
  }),
  show: defineEndpoint({
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
    errors: [401, 404, 500],
  }),
};
```

Assemble the contract:

```typescript
// contract/index.ts
import { defineContract } from 'sorbus';
import { invoices } from './endpoints/invoices';
import { customers } from './endpoints/customers';
import { error } from './error';

export const contract = defineContract({
  endpoints: {
    invoices,
    customers,
  },
  error,
});
```

`defineContract` and `defineEndpoint` infer `as const` automatically — no manual type assertion needed.

## Generated Contracts

Contracts can be generated from backend frameworks. [Apiwork](https://apiwork.dev) generates contracts from Rails representations — including camelCase key conversion, nested resources, and error schemas.

A generated contract looks identical to a hand-written one. The client doesn't know or care how it was produced.
