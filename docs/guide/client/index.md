---
order: 4
---
# Client

`createClient` takes a contract and returns a fully typed API client. Each endpoint in the contract becomes an **Operation** on the client.

## Creating a Client

```typescript
import { createClient } from 'sorbus';
import { contract } from './contract';

export const api = createClient(contract, '/api');
```

The second argument is the base URL. It can be a relative path (`/api`) or an absolute URL (`https://api.example.com`).

## Operations

Every endpoint on the client is an `Operation`. Calling it sends the request. It also exposes a `.raw()` overload for explicit path, query, and body separation (see [Requests](../requests/)).

Import the `Operation` type when you need a standalone reference to an endpoint — for example to pass one around or wrap it:

```typescript
import type { Operation } from 'sorbus';
import type { contract } from './contract';

const showInvoice: Operation<typeof contract.endpoints.invoices.show> =
  api.invoices.show;
```

## Options

The third argument is an options object:

```typescript
export const api = createClient(contract, '/api', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
  serializeKey: 'snake',
  normalizeKey: 'camel',
  cache: myCache,
});
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `headers` | `HeadersInit \| () => HeadersInit` | — | Headers sent with every request |
| `serializeKey` | `'camel' \| 'pascal' \| 'kebab' \| 'snake' \| (key: string) => string` | — | Transform keys before sending |
| `normalizeKey` | `'camel' \| 'pascal' \| 'kebab' \| 'snake' \| (key: string) => string` | — | Transform keys after receiving |
| `fetch` | `typeof fetch` | `globalThis.fetch` | Custom fetch implementation |
| `cache` | `Cache` | — | ETag cache for GET requests (see [Caching](../caching/)) |

See [Key Transforms](../key-transforms/) for details.

## Headers

Pass headers as an object for static values like API keys:

```typescript
const api = createClient(contract, '/api', {
  headers: {
    Authorization: `Bearer ${token}`,
    'X-API-Key': apiKey,
  },
});
```

Pass a function for dynamic values like tokens that change over time:

```typescript
const api = createClient(contract, '/api', {
  headers: () => ({
    Authorization: `Bearer ${getToken()}`,
  }),
});
```

## Per-Request Options

Every Operation call accepts an optional second argument with `headers` and `signal`. Per-request headers are merged with global headers — per-request values take precedence on collision.

```typescript
const { invoice } = await api.invoices.show({ id: '123' }, {
  headers: {
    'X-Trace-Id': traceId,
  },
  signal: abortController.signal,
});
```

`signal` is useful for cancelling requests on navigation — for example in React or SvelteKit remote functions:

```typescript
const { invoices } = await api.invoices.index({ page: 1 }, {
  signal: controller.signal,
});
```

Per-request options work with `catch` and `.raw()`:

```typescript
const result = await api.invoices.create(
  {
    invoice: {
      number: 'INV-001',
    },
  },
  {
    catch: [422],
    signal,
  },
);

await api.invoices.update.raw(
  {
    pathParams: {
      id: '456',
    },
    body: {
      invoice: {
        total: 1500,
      },
    },
  },
  { signal },
);
```

## Custom Fetch

For advanced cases — credentials, logging, interceptors — pass a custom `fetch`:

```typescript
const api = createClient(contract, '/api', {
  fetch: (url, init) => {
    return fetch(url, {
      ...init,
      credentials: 'include',
    });
  },
});
```

## Type Inference

The client's type is fully inferred from the contract. Endpoint nesting, params, and response types all flow from the contract definition:

```typescript
// Contract nesting becomes client nesting
api.invoices.index(...)
api.accounts.timeEntries.create(...)

// Params are inferred from pathParams + request.query + request.body
api.invoices.show({ id: '123' })
//                  ^? { id: string }

// Response is inferred from the response schema
const { invoice } = await api.invoices.show({ id: '123' });
//      ^? { id: string; number: string; total: number; state: "draft" | "sent" | "paid" }
```

The error type (`TError`) is inferred from the contract's `error` schema. It appears as the `data` field on caught errors. See [Error Handling](../error-handling/).
