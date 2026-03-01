---
order: 1
---
# Apiwork (Rails)

[Apiwork](https://apiwork.dev) is a Ruby gem for building declarative, typed REST APIs in Rails. Together with Sorbus, you get Prisma's type safety and query ergonomics — but with Rails conventions and batteries included.

Define a representation — which columns are readable, writable, filterable, sortable — and Apiwork generates a complete Sorbus contract with Zod schemas. Filtering with AND/OR/NOT, sorting, pagination, includes, nested writes, typed validation errors — all derived from your database, all typed end-to-end.

## The Representation

This is all you write on the backend:

```ruby
class InvoiceRepresentation < Apiwork::Representation::Base
  attribute :id
  attribute :number, writable: true, filterable: true, sortable: true
  attribute :total, filterable: true, sortable: true
  attribute :status, filterable: true
  attribute :issued_on, writable: true, filterable: true, sortable: true

  belongs_to :customer, filterable: true
  has_many :items, writable: true
end
```

Everything else is derived. Column types, nullability, enums, associations — Apiwork reads them from the database and generates typed Zod schemas for every request, response, filter, and sort. One command, one `contract.ts`, zero maintenance.

## Filtering

Every attribute marked `filterable: true` gets a full set of typed operators in the contract. The operators depend on the column type — strings get `contains` and `starts_with`, numbers and dates get `gt`, `lt`, and `between`.

```typescript
// Simple filter
const { invoices } = await api.invoices.index({
  filter: {
    status: {
      eq: 'paid',
    },
  },
});

// Multiple filters (implicit AND)
const { invoices } = await api.invoices.index({
  filter: {
    status: {
      eq: 'paid',
    },
    number: {
      contains: 'INV-2024',
    },
  },
});

// Date range
const { invoices } = await api.invoices.index({
  filter: {
    issuedOn: {
      gte: '2024-01-01',
      lte: '2024-12-31',
    },
  },
});
```

### Logical Operators

Combine filters with `AND`, `OR`, and `NOT`:

```typescript
// OR — draft or overdue
const { invoices } = await api.invoices.index({
  filter: {
    OR: [
      {
        status: {
          eq: 'draft',
        },
      },
      {
        status: {
          eq: 'overdue',
        },
      },
    ],
  },
});

// AND + OR — (sent or paid) AND issued this year
const { invoices } = await api.invoices.index({
  filter: {
    AND: [
      {
        OR: [
          {
            status: {
              eq: 'sent',
            },
          },
          {
            status: {
              eq: 'paid',
            },
          },
        ],
      },
      {
        issuedOn: {
          gte: '2024-01-01',
        },
      },
    ],
  },
});

// NOT — everything except void
const { invoices } = await api.invoices.index({
  filter: {
    NOT: {
      status: {
        eq: 'void',
      },
    },
  },
});
```

All of this is typed. The contract knows which operators exist for each attribute, which enum values are valid, and which fields are filterable. Invalid filters fail at compile time.

### Operators

| Type | Operators |
|------|-----------|
| String | `eq`, `in`, `contains`, `starts_with`, `ends_with`, `null` |
| Number | `eq`, `gt`, `gte`, `lt`, `lte`, `between`, `in`, `null` |
| Date | `eq`, `gt`, `gte`, `lt`, `lte`, `between`, `in`, `null` |
| Boolean | `eq`, `null` |
| Enum | `eq`, `in` |

## Includes

Load associations with typed `include`. Only associations defined in the representation are available — autocomplete shows exactly what you can include:

```typescript
const { invoice } = await api.invoices.show({
  id: '123',
  include: {
    customer: true,
    items: true,
  },
});

// invoice.customer and invoice.items are typed
```

## Sorting

Every attribute marked `sortable: true` accepts `'asc'` or `'desc'`:

```typescript
const { invoices, meta } = await api.invoices.index({
  sort: {
    issuedOn: 'desc',
    number: 'asc',
  },
});
```

## Pagination

Index endpoints include typed pagination:

```typescript
const { invoices, meta } = await api.invoices.index({
  page: {
    number: 2,
    size: 20,
  },
});

// meta.page, meta.totalPages, meta.totalCount
```

## Nested Writes

Associations marked `writable: true` support create, update, and delete in a single request. The operation is inferred from the presence of `id`:

```typescript
// Create with nested items
const { invoice } = await api.invoices.create({
  invoice: {
    number: 'INV-001',
    items: [
      {
        description: 'Consulting',
        quantity: 10,
        rate: 150,
      },
      {
        description: 'Development',
        quantity: 40,
        rate: 200,
      },
    ],
  },
});

// Update — mixed operations in one request
const { invoice } = await api.invoices.update({
  id: '123',
  invoice: {
    items: [
      {
        id: '5',
        description: 'Updated item',
      },
      {
        description: 'New item',
        quantity: 1,
        rate: 100,
      },
      {
        OP: 'delete',
        id: '3',
      },
    ],
  },
});
```

No `id` means create. With `id` means update. `OP: 'delete'` with `id` means delete. All in one request, all typed.

## Validation Errors

When a create or update fails validation, catch the error and get typed fields:

```typescript
const result = await api.invoices.create(
  {
    invoice: {
      number: 'INV-001',
    },
  },
  { catch: [422] },
);

if (!result.ok) {
  result.data.errors;
  // { number?: string[], total?: string[] }
  return;
}

result.data.invoice; // fully typed
```

The error shape is generated from the contract. Rails validation errors map directly to typed fields — no casting, no guessing.

## The Workflow

```
1. Change your Rails code (add column, change type, add enum value)
2. Regenerate the contract
3. TypeScript tells you what broke
```

The database is the source of truth. Apiwork reads it, Sorbus types it. Nothing drifts.
