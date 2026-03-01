import { describe, expect, it } from 'vitest';

import { objectToURLSearchParams } from '../../src/utils/objectToURLSearchParams';

describe('objectToURLSearchParams', () => {
  it('serializes string values', () => {
    const params = objectToURLSearchParams({ status: 'draft' });

    expect(params.toString()).toBe('status=draft');
  });

  it('serializes number values', () => {
    const params = objectToURLSearchParams({ page: 2 });

    expect(params.toString()).toBe('page=2');
  });

  it('serializes boolean values', () => {
    const params = objectToURLSearchParams({ active: true });

    expect(params.toString()).toBe('active=true');
  });

  it('serializes nested objects with bracket notation', () => {
    const params = objectToURLSearchParams({
      filter: { status: 'draft' },
    });

    expect(params.toString()).toBe('filter%5Bstatus%5D=draft');
    expect(params.get('filter[status]')).toBe('draft');
  });

  it('serializes arrays with bracket notation', () => {
    const params = objectToURLSearchParams({ ids: [1, 2, 3] });

    expect(params.getAll('ids[]')).toEqual(['1', '2', '3']);
  });

  it('skips null and undefined values', () => {
    const params = objectToURLSearchParams({
      name: 'Acme Corp',
      notes: null,
      status: undefined,
    });

    expect(params.toString()).toBe('name=Acme+Corp');
  });

  it('serializes Date as ISO string', () => {
    const params = objectToURLSearchParams({
      after: new Date('2024-01-15T10:30:00Z'),
    });

    expect(params.get('after')).toBe('2024-01-15T10:30:00.000Z');
  });
});
