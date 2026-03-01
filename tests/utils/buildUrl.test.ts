import { describe, expect, it } from 'vitest';

import { buildUrl } from '../../src/utils/buildUrl';

const identity = (key: string): string => key;

describe('buildUrl', () => {
  it('builds URL from base and path', () => {
    const url = buildUrl('/invoices', undefined, undefined, 'https://api.example.com/', identity);

    expect(url).toBe('https://api.example.com/invoices');
  });

  it('interpolates path params', () => {
    const url = buildUrl(
      '/invoices/:id',
      { id: 42 },
      undefined,
      'https://api.example.com/',
      identity,
    );

    expect(url).toBe('https://api.example.com/invoices/42');
  });

  it('interpolates multiple path params', () => {
    const url = buildUrl(
      '/customers/:customerId/invoices/:id',
      { customerId: 7, id: 42 },
      undefined,
      'https://api.example.com/',
      identity,
    );

    expect(url).toBe('https://api.example.com/customers/7/invoices/42');
  });

  it('appends query params', () => {
    const url = buildUrl(
      '/invoices',
      undefined,
      { status: 'draft' },
      'https://api.example.com/',
      identity,
    );

    expect(url).toBe('https://api.example.com/invoices?status=draft');
  });

  it('applies serializeKey to query param keys', () => {
    const toSnake = (key: string): string =>
      key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();

    const url = buildUrl(
      '/invoices',
      undefined,
      { dueOn: '2024-01-15' },
      'https://api.example.com/',
      toSnake,
    );

    expect(url).toBe('https://api.example.com/invoices?due_on=2024-01-15');
  });
});
