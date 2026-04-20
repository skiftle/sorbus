import { describe, expect, it } from 'vitest';

import { transformKeys } from '../../src/utils/transform-keys';

const toUpperCase = (key: string): string => key.toUpperCase();

describe('transformKeys', () => {
  it('transforms flat object keys', () => {
    const result = transformKeys({ number: 'INV-001', status: 'draft' }, toUpperCase);

    expect(result).toEqual({ NUMBER: 'INV-001', STATUS: 'draft' });
  });

  it('transforms nested object keys recursively', () => {
    const result = transformKeys(
      { invoice: { customer: { name: 'Acme Corp' }, number: 'INV-001' } },
      toUpperCase,
    );

    expect(result).toEqual({
      INVOICE: { CUSTOMER: { NAME: 'Acme Corp' }, NUMBER: 'INV-001' },
    });
  });

  it('transforms keys inside arrays of objects', () => {
    const result = transformKeys(
      { items: [{ unit_price: 150 }, { unit_price: 500 }] },
      toUpperCase,
    );

    expect(result).toEqual({
      ITEMS: [{ UNIT_PRICE: 150 }, { UNIT_PRICE: 500 }],
    });
  });

  it('leaves arrays of primitives unchanged', () => {
    const result = transformKeys({ tags: ['draft', 'urgent'] }, toUpperCase);

    expect(result).toEqual({ TAGS: ['draft', 'urgent'] });
  });

  it('returns empty object for empty input', () => {
    const result = transformKeys({}, toUpperCase);

    expect(result).toEqual({});
  });
});
