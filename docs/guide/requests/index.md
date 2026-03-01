---
order: 5
---
# Requests

Every endpoint in the contract becomes a function on the client. Params are a single flat object — path, query, and body params are merged together. Sorbus separates them using the endpoint's `pathParams`, `request.query`, and `request.body` schemas.

## GET — Show

```typescript
const { invoice } = await api.invoices.show({ id: '123' });
```

`id` is extracted as a path param because the endpoint defines `pathParams: z.object({ id: z.string() })`. The remaining params (none here) would go to `request.query`.

## GET — Index

```typescript
const { invoices, meta } = await api.invoices.index({ page: 1 });
```

`page` is extracted as a query param. The response type includes both the data array and pagination metadata — whatever the contract's `response.body` schema defines.

## GET — Nested Resource

```typescript
const { timeEntries, meta } = await api.accounts.timeEntries.index({
  accountId: '123',
  page: 1,
  state: 'submitted',
});
```

`accountId` goes to path, `page` and `state` go to query. All inferred from the schemas.

## POST — Create

```typescript
const { invoice } = await api.invoices.create({
  invoice: {
    number: 'INV-001',
    total: 1000,
  },
});
```

The `invoice` key goes to body because the endpoint defines `request.body: z.object({ invoice: z.object({ ... }) })`.

## PATCH — Update

```typescript
const { invoice } = await api.invoices.update({
  id: '456',
  invoice: {
    total: 1500,
  },
});
```

`id` goes to path, `invoice` goes to body. Partial updates work naturally — the body schema defines which fields are optional.

## DELETE — Destroy

```typescript
await api.invoices.destroy({ id: '456' });
```

DELETE endpoints typically return an empty object. The response is inferred from the contract — if the schema is `z.object({})`, there's nothing to destructure.

## Params Are Flat

All params go in one object. Sorbus uses the endpoint's schemas to determine what goes where:

```typescript
api.accounts.timeEntries.create({
  accountId: '123',        // -> path param (from pathParams schema)
  timeEntry: {             // -> body (from request.body schema)
    date: '2026-02-25',
    hours: 8,
    projectId: '789',
  },
});
```

::: tip
Params are validated by Zod at runtime. If you pass an unexpected field or a wrong type, Zod throws a validation error before the request is sent.
:::

## Raw Params

Every endpoint has a `.raw()` method that accepts `pathParams`, `query`, and `body` as separate keys. This is useful when you need explicit control over where each param goes:

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

api.accounts.timeEntries.index.raw({
  pathParams: {
    accountId: '123',
  },
  query: {
    page: 1,
    state: 'submitted',
  },
});
```

`.raw()` supports `catch` the same way as flat calls:

```typescript
const result = await api.invoices.create.raw(
  {
    body: {
      invoice: {
        number: 'INV-001',
        total: 1000,
      },
    },
  },
  { catch: [422] },
);
```

Only include the keys your endpoint uses — `pathParams`, `query`, and `body` are all optional depending on the endpoint definition.

## With Error Handling

Any request can opt into catching specific errors by passing a second argument. See [Error Handling](../error-handling/) for the full model.

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
