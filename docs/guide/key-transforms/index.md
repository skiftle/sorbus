---
order: 7
---
# Key Transforms

APIs often use snake_case while TypeScript uses camelCase. Sorbus bridges this with `serializeKey` and `normalizeKey`.

## Setup

```typescript
import { createClient } from 'sorbus';
import { contract } from './contract';

const api = createClient(contract, '/api', {
  serializeKey: 'snake',
  normalizeKey: 'camel',
});
```

`serializeKey` transforms outgoing keys (body and query params). `normalizeKey` transforms incoming keys (response body, cached data). Pass a format name for built-in transforms, or a function for custom logic.

## Formats

| Format | Example |
|--------|---------|
| `'camel'` | `userName` |
| `'pascal'` | `UserName` |
| `'kebab'` | `user-name` |
| `'snake'` | `user_name` |

Each transform handles any input format. You only specify the target.

## Common Configurations

```typescript
// camelCase code, snake_case API (Rails, Python, Ruby)
serializeKey: 'snake',
normalizeKey: 'camel',

// camelCase code, kebab-case API
serializeKey: 'kebab',
normalizeKey: 'camel',

// No transform (API already matches your code)
// Don't set serializeKey or normalizeKey
```

## How It Works

```
TypeScript (camelCase)  -->  serializeKey  -->  Server (snake_case)
Server (snake_case)     -->  normalizeKey  -->  TypeScript (camelCase)
```

Keys are transformed recursively through nested objects and arrays:

```typescript
// Before serialize (your code)
{
  timeEntry: {
    projectId: '789',
    taskDetails: {
      billableHours: 8,
    },
  },
}

// After serialize (wire format)
{
  time_entry: {
    project_id: '789',
    task_details: {
      billable_hours: 8,
    },
  },
}
```

## What Gets Transformed

| Direction | What | Example |
|-----------|------|---------|
| `serializeKey` | Body param keys | `{ projectId: '1' }` becomes `{ project_id: '1' }` |
| `serializeKey` | Query param keys | `?totalCount=5` becomes `?total_count=5` |
| `normalizeKey` | Response body keys | `{ created_at: '...' }` becomes `{ createdAt: '...' }` |
| `normalizeKey` | Cached response keys | Same as response |

## What Stays Untouched

| What | Why |
|------|-----|
| URL paths | Paths like `/time_entries/:id` are the server's format |
| Path param values | `accountId: '123'` — the value `'123'` is not a key |

## Caching

Built-in transforms are cached per key. The first time `userName` is transformed to `user_name`, the result is stored. Subsequent calls for the same key return the cached result. API keys are a finite set — the cache grows to a fixed size and stays there.

## Custom Functions

For formats not covered by the built-in options, pass a function:

```typescript
const api = createClient(contract, '/api', {
  serializeKey: (key) => key.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`),
  normalizeKey: (key) => key.replace(/_([a-z])/g, (_, c) => c.toUpperCase()),
});
```
