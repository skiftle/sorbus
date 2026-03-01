---
order: 2
---
# Installation

## Requirements

- TypeScript 5.6 or higher
- Zod 4.0 or higher

## Install

```bash
npm install sorbus zod
# or
pnpm add sorbus zod
```

## Setup

Create a contract file and a client file:

```
src/
├── api/
│   ├── contract.ts    # Endpoint definitions with Zod schemas
│   └── client.ts      # createClient with config
```

The contract defines your API shape. The client wraps it with runtime config like the base URL and key transforms. See [Contract](./contract/) and [Client](./client/) for details.

## What's Exported

```typescript
// Functions
import {
  createClient,
  defineContract,
  defineEndpoint,
} from 'sorbus';

// Errors
import {
  ApiError,
  FetchError,
  ParseError,
} from 'sorbus';

// Types
import type {
  Cache,
  CacheEntry,
  Client,
  Contract,
  CreateClientOptions,
  Endpoint,
  EndpointMethod,
  KeyFormat,
  RequestOptions,
  Result,
} from 'sorbus';
```
