---
order: 6
---
# Error Handling

Sorbus's error model is simple: **throw by default, catch when you choose**.

Every error throws `ApiError`. You don't check status codes, you don't inspect response shapes, you don't forget to handle failures. If you need to handle a specific error — like showing validation messages from a 422 — you opt in with `catch`.

## Without Catch — Throw Everything

```typescript
const { invoice } = await api.invoices.show({ id: '123' });
```

| Response | What happens |
|----------|-------------|
| 2xx | Returns the parsed response data directly |
| 4xx | Throws `ApiError` |
| 5xx | Throws `ApiError` |

The return type is the response data — no wrapping, no Result. This is the right default for loaders, data fetching, and any call where errors should bubble to an error boundary.

## With Catch — Handle Specific Errors

```typescript
const result = await api.invoices.create(
  {
    invoice: {
      number: 'INV-001',
      total: 1000,
    },
  },
  { catch: [422] },
);
```

| Response | What happens |
|----------|-------------|
| 2xx | Returns `{ ok: true, status, data: TData }` |
| 422 | Returns `{ ok: false, status, data: TError }` |
| Other 4xx | Throws `ApiError` |
| 5xx | Throws `ApiError` |

When `catch` is present, the **entire** response is wrapped in a `Result` — both success and error. This is because TypeScript needs a discriminant (`ok`) to narrow the type.

::: tip
Only the status codes you list in `catch` are caught. Everything else still throws. You opt in to exactly the errors you want to handle.
:::

## The Result Type

```typescript
type Result<TData, TError> =
  | { ok: true; status: number; data: TData }
  | { ok: false; status: number; data: TError };
```

TypeScript narrows `data` based on `ok`:

```typescript
const result = await api.invoices.create(data, { catch: [422] });

if (!result.ok) {
  result.data;  // TError — the parsed error body
  return;
}

result.data;    // TData — the parsed success response
```

## Catching Multiple Status Codes

Pass multiple codes to handle different error scenarios:

```typescript
const result = await api.invoices.send(
  { id: '123' },
  { catch: [409, 422] },
);

if (!result.ok) {
  if (result.status === 409) {
    showDialog('Already sent by another user.');
    return;
  }

  // 422
  setErrors(result.data.errors);
  return;
}

toast(`Invoice ${result.data.invoice.number} sent!`);
```

All caught errors share the same `TError` type (from the contract's `error` schema). Use `result.status` to distinguish between them.

## ApiError

When an error is **not** caught, Sorbus throws `ApiError`:

```typescript
import { ApiError } from 'sorbus';

class ApiError extends Error {
  status: number;
  body: unknown;
}
```

Use it in try/catch for scenarios like error boundaries or network error handling:

```typescript
import { ApiError, ParseError, FetchError } from 'sorbus';

try {
  const { invoice } = await api.invoices.show({ id });
  return { invoice };
} catch (error) {
  if (error instanceof ApiError) {
    throw new Response(null, { status: error.status });
  }
  if (error instanceof ParseError) {
    console.error('Schema mismatch:', error.cause);
  }
  if (error instanceof FetchError) {
    console.error('Network failure:', error.message);
  }
  throw error;
}
```

## ParseError

When data doesn't match a Zod schema in the contract, Sorbus throws `ParseError`:

```typescript
import { ParseError } from 'sorbus';

class ParseError extends Error {
  cause: Error;
}
```

This covers both directions:

- **Response parsing** — the API returned data that doesn't match the response schema (typically contract drift)
- **Request parsing** — you passed params that don't match the request schema (typically a bug)

The original `ZodError` is available on `cause` for inspection:

```typescript
try {
  const { invoice } = await api.invoices.show({ id });
  return { invoice };
} catch (error) {
  if (error instanceof ParseError) {
    console.error('Schema mismatch:', error.cause);
  }
  throw error;
}
```

## FetchError

When the network request itself fails (DNS, timeout, connection refused), Sorbus throws `FetchError`:

```typescript
import { FetchError } from 'sorbus';

class FetchError extends Error {}
```



The contract's `error` key defines the shape of error response bodies:

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

This schema is used to:
- **Parse** error response bodies at runtime
- **Type** the `data` field on caught errors (`TError`)
- **Type** the `body` field on `ApiError` (at runtime, not statically)

If no `error` schema is defined, caught error data is `unknown`.

## Errors Autocomplete

Each endpoint can declare possible error status codes:

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
},
```

These appear as autocomplete suggestions when you type `catch: [...]`. If `errors` is omitted, `catch` accepts any number.

## When to Use What

| Scenario | Approach |
|----------|----------|
| Loader / data fetch | No `catch` — let errors throw to error boundary |
| Form submission | `{ catch: [422] }` — show validation errors inline |
| Optimistic action | `{ catch: [409, 422] }` — handle conflicts and validation |
| Delete | No `catch` — 404 or 403 should be exceptional |
| Global error handling | `try/catch` with `ApiError` — redirect, log, or re-throw |
| Contract drift | `try/catch` with `ParseError` — log and investigate |
| Network failure | `try/catch` with `FetchError` — show offline message |
