---
order: 8
---
# Caching

Sorbus has built-in support for `ETag` / `If-None-Match` caching on GET requests. You bring the cache — sorbus handles the HTTP headers and 304 responses.

## When You Need This

In the browser, `fetch` already has an HTTP cache — the browser handles ETags automatically. You don't need sorbus's cache for client-side requests.

But sorbus isn't only a browser library. When you run it server-side — in SvelteKit remote functions, Remix loaders, Next.js server components, or any Node environment — there's no built-in HTTP cache. Every `fetch` hits the network. That's where sorbus's cache comes in.

| Environment | Browser HTTP cache? | Sorbus cache useful? |
|-------------|--------------------|--------------------|
| Browser SPA | Yes | No |
| SvelteKit remote function | No | Yes |
| Remix loader | No | Yes |
| Next.js server component | No | Yes |
| Node BFF / API gateway | No | Yes |

## How It Works

**First GET /invoices/123**

1. Server responds `200` with an `ETag: "abc123"` header and a JSON body
2. Sorbus stores the ETag and JSON in your cache
3. Returns parsed response data

**Second GET /invoices/123**

1. Sorbus finds a cache entry for this URL
2. Sends `If-None-Match: "abc123"` header
3. Server checks: has the resource changed since `"abc123"`?
   - **No** — responds `304 Not Modified` (no body)
   - **Yes** — responds `200` with a new ETag and new body

**On 304:**

1. Sorbus uses the cached JSON — no body to download or parse
2. `normalizeKey` still applies to the cached data
3. Response schema still validates the cached data
4. Returns the same type as a normal `200`

The server decides whether the resource changed. Sorbus just stores the ETag and sends it back. This means caching is transparent — the response type is always the same regardless of whether it came from the network or the cache.

## Setup

Pass a `cache` object to `createClient`:

```typescript
const cache = new Map<string, { etag: string; json: Record<string, any> }>();

const api = createClient(contract, '/api', {
  cache: {
    get: (url) => cache.get(url) ?? null,
    set: (url, entry) => cache.set(url, entry),
  },
});
```

## Cache Interface

```typescript
interface Cache {
  get(url: string): CacheEntry | null | Promise<CacheEntry | null>;
  set(url: string, entry: CacheEntry): void | Promise<void>;
}

interface CacheEntry {
  etag: string;
  json: Record<string, any>;
}
```

Both methods accept sync or async implementations. A `Map` works, Redis works, Cloudflare KV works — sorbus awaits the result either way.

| Method | Called when | Arguments |
|--------|-----------|-----------|
| `get` | Before every GET request | The full URL (including query string) |
| `set` | After a GET 200 with an `ETag` header | The URL and the entry to store |

`get` returns `null` when there's no cached entry. `set` stores the raw JSON (before `normalizeKey`) and the ETag string.

## What Gets Cached

| Request | Cached? | Why |
|---------|---------|-----|
| GET 200 with ETag | Yes | Server provided a cacheable response |
| GET 200 without ETag | No | No ETag to send back |
| POST, PATCH, DELETE | No | Only GET requests are cached |
| GET with query params | Yes | Each unique URL is a separate cache key |

## With catch

Caching works the same with or without `catch`. A 304 is a success response:

```typescript
// Without catch — returns TData directly
const { invoice } = await api.invoices.show({ id: '123' });

// With catch — 304 is wrapped as { ok: true, status: 304, data: TData }
const result = await api.invoices.show(
  { id: '123' },
  { catch: [404] },
);
```

## SvelteKit Example

```typescript
// src/lib/api.server.ts
const cache = new Map<string, { etag: string; json: Record<string, any> }>();

export const api = createClient(contract, 'https://api.example.com', {
  cache: {
    get: (url) => cache.get(url) ?? null,
    set: (url, entry) => cache.set(url, entry),
  },
  serializeKey: (key) => key.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`),
  normalizeKey: (key) => key.replace(/_([a-z])/g, (_, c) => c.toUpperCase()),
});
```

```typescript
// src/routes/invoices/[id]/+page.svelte
import { api } from '$lib/api.server';

const { invoice } = await api.invoices.show({ id: $page.params.id });
```

The `Map` lives in server memory for the lifetime of the process. Every remote function call for the same invoice reuses the cached response until the server says it changed.

## Cache Invalidation

Sorbus doesn't invalidate cache entries — that's up to you. Common patterns:

```typescript
// Clear a specific entry after mutation
async function handleUpdate(id: string, data: FormData) {
  await api.invoices.update({ id, invoice: data });
  cache.delete(`https://api.example.com/invoices/${id}`);
}

// Clear all entries
function clearCache() {
  cache.clear();
}
```

## Custom Cache Backends

The cache interface is simple enough to wrap any storage:

```typescript
// Redis (Node server)
import { redis } from './redis';

const api = createClient(contract, 'https://api.example.com', {
  cache: {
    get: async (url) => {
      const raw = await redis.get(`cache:${url}`);
      return raw ? JSON.parse(raw) : null;
    },
    set: async (url, entry) => {
      await redis.set(`cache:${url}`, JSON.stringify(entry), 'EX', 3600);
    },
  },
});
```

## Without Caching

If you don't pass a `cache` option, no caching happens. No `If-None-Match` headers are sent, no responses are stored. This is the right default for browser-side usage.

```typescript
const api = createClient(contract, '/api');
```
