import { describe, expect, it, vi } from 'vitest';
import { z } from 'zod';

import { createClient } from '../src/client';
import { defineContract } from '../src/contract';
import { ApiError, FetchError, ParseError } from '../src/errors';

const BASE_URL = 'https://api.example.com/';

function mockFetch(
  status: number,
  body?: unknown,
  headers?: Record<string, string>,
): typeof fetch {
  return vi.fn<typeof fetch>().mockImplementation(() =>
    Promise.resolve(
      new Response(body === undefined ? null : JSON.stringify(body), {
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        status,
      }),
    ),
  );
}

const invoiceSchema = z.object({
  id: z.number(),
  number: z.string(),
  status: z.string(),
});

const invoiceContract = defineContract({
  endpoints: {
    invoices: {
      create: {
        method: 'POST' as const,
        path: '/invoices',
        request: {
          body: z.object({ number: z.string(), status: z.string() }),
        },
        response: { body: invoiceSchema },
      },
      delete: {
        errors: [404] as const,
        method: 'DELETE' as const,
        path: '/invoices/:id',
        pathParams: z.object({ id: z.number() }),
      },
      get: {
        method: 'GET' as const,
        path: '/invoices/:id',
        pathParams: z.object({ id: z.number() }),
        response: { body: invoiceSchema },
      },
      list: {
        method: 'GET' as const,
        path: '/invoices',
        request: {
          query: z.object({ status: z.string().optional() }),
        },
        response: { body: z.object({ invoices: z.array(invoiceSchema) }) },
      },
      update: {
        method: 'PATCH' as const,
        path: '/invoices/:id',
        pathParams: z.object({ id: z.number() }),
        request: {
          body: z.object({ status: z.string() }),
        },
        response: { body: invoiceSchema },
      },
    },
  },
});

describe('createClient', () => {
  describe('GET requests', () => {
    it('parses response with Zod schema', async () => {
      const fetchFn = mockFetch(200, { id: 42, number: 'INV-001', status: 'draft' });
      const client = createClient(invoiceContract, BASE_URL, { fetch: fetchFn });

      const result = await client.invoices.get({ id: 42 });

      expect(result).toEqual({ id: 42, number: 'INV-001', status: 'draft' });
    });

    it('sends query params as URL search params', async () => {
      const fetchFn = mockFetch(200, { invoices: [] });
      const client = createClient(invoiceContract, BASE_URL, { fetch: fetchFn });

      await client.invoices.list({ status: 'draft' });

      const [url] = vi.mocked(fetchFn).mock.calls[0];
      expect(url).toContain('status=draft');
    });

    it('interpolates path params into URL', async () => {
      const fetchFn = mockFetch(200, { id: 42, number: 'INV-001', status: 'draft' });
      const client = createClient(invoiceContract, BASE_URL, { fetch: fetchFn });

      await client.invoices.get({ id: 42 });

      const [url] = vi.mocked(fetchFn).mock.calls[0];
      expect(url).toContain('/invoices/42');
    });
  });

  describe('POST requests', () => {
    it('sends request body as JSON', async () => {
      const fetchFn = mockFetch(200, { id: 1, number: 'INV-001', status: 'draft' });
      const client = createClient(invoiceContract, BASE_URL, { fetch: fetchFn });

      await client.invoices.create({ number: 'INV-001', status: 'draft' });

      const [, init] = vi.mocked(fetchFn).mock.calls[0];
      expect(init?.method).toBe('POST');
      expect(init?.body).toBe(JSON.stringify({ number: 'INV-001', status: 'draft' }));
      expect(new Headers(init?.headers).get('Content-Type')).toBe('application/json');
    });
  });

  describe('flat params', () => {
    it('splits mixed params into pathParams and body', async () => {
      const fetchFn = mockFetch(200, { id: 42, number: 'INV-001', status: 'sent' });
      const client = createClient(invoiceContract, BASE_URL, { fetch: fetchFn });

      const result = await client.invoices.update({ id: 42, status: 'sent' });

      expect(result).toEqual({ id: 42, number: 'INV-001', status: 'sent' });
      const [url, init] = vi.mocked(fetchFn).mock.calls[0];
      expect(url).toContain('/invoices/42');
      expect(init?.body).toBe(JSON.stringify({ status: 'sent' }));
    });
  });

  describe('204 No Content', () => {
    it('returns undefined without catch', async () => {
      const fetchFn = mockFetch(204);
      const client = createClient(invoiceContract, BASE_URL, { fetch: fetchFn });

      await expect(client.invoices.delete({ id: 42 })).resolves.toBeUndefined();
    });

    it('returns ok Result with undefined data in catch mode', async () => {
      const fetchFn = mockFetch(204);
      const client = createClient(invoiceContract, BASE_URL, { fetch: fetchFn });

      const result = await client.invoices.delete({ id: 42 }, { catch: [404] });

      expect(result).toEqual({ data: undefined, ok: true, status: 204 });
    });
  });

  describe('empty response body', () => {
    it('returns undefined for 200 with empty body', async () => {
      const fetchFn = mockFetch(200);
      const client = createClient(invoiceContract, BASE_URL, { fetch: fetchFn });

      await expect(client.invoices.get({ id: 42 })).resolves.toBeUndefined();
    });

    it('returns ok Result with undefined data in catch mode for 200 with empty body', async () => {
      const fetchFn = mockFetch(200);
      const client = createClient(invoiceContract, BASE_URL, { fetch: fetchFn });

      const result = await client.invoices.get({ id: 42 }, { catch: [404] });

      expect(result).toEqual({ data: undefined, ok: true, status: 200 });
    });
  });

  describe('catch mode', () => {
    it('returns ok Result on success', async () => {
      const fetchFn = mockFetch(200, { id: 42, number: 'INV-001', status: 'draft' });
      const client = createClient(invoiceContract, BASE_URL, { fetch: fetchFn });

      const result = await client.invoices.get({ id: 42 }, { catch: [404] });

      expect(result).toEqual({
        data: { id: 42, number: 'INV-001', status: 'draft' },
        ok: true,
        status: 200,
      });
    });

    it('returns error Result for caught status code', async () => {
      const fetchFn = mockFetch(404, { message: 'Not found' });
      const client = createClient(invoiceContract, BASE_URL, { fetch: fetchFn });

      const result = await client.invoices.get({ id: 999 }, { catch: [404] });

      expect(result).toEqual({
        data: { message: 'Not found' },
        ok: false,
        status: 404,
      });
    });

    it('throws ApiError for uncaught status code', async () => {
      const fetchFn = mockFetch(500, { message: 'Internal error' });
      const client = createClient(invoiceContract, BASE_URL, { fetch: fetchFn });

      await expect(
        client.invoices.get({ id: 42 }, { catch: [404] }),
      ).rejects.toThrow(ApiError);
    });
  });

  describe('error handling', () => {
    it('throws ApiError on non-2xx response', async () => {
      const fetchFn = mockFetch(422, { message: 'Validation failed' });
      const client = createClient(invoiceContract, BASE_URL, { fetch: fetchFn });

      try {
        await client.invoices.create({ number: 'INV-001', status: 'draft' });
        expect.unreachable();
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).status).toBe(422);
        expect((error as ApiError).body).toEqual({ message: 'Validation failed' });
      }
    });

    it('throws ApiError with null body when response is not JSON', async () => {
      const fetchFn = vi.fn<typeof fetch>().mockResolvedValue(
        new Response('Internal Server Error', { status: 500 }),
      );
      const client = createClient(invoiceContract, BASE_URL, { fetch: fetchFn });

      try {
        await client.invoices.get({ id: 42 });
        expect.unreachable();
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).status).toBe(500);
        expect((error as ApiError).body).toBeNull();
      }
    });

    it('throws FetchError on network failure', async () => {
      const fetchFn = vi.fn<typeof fetch>().mockRejectedValue(
        new TypeError('Failed to fetch'),
      );
      const client = createClient(invoiceContract, BASE_URL, { fetch: fetchFn });

      await expect(client.invoices.get({ id: 42 })).rejects.toThrow(FetchError);
    });

    it('throws ParseError when response validation fails', async () => {
      const fetchFn = mockFetch(200, { id: 'not-a-number', number: 42, status: true });
      const client = createClient(invoiceContract, BASE_URL, { fetch: fetchFn });

      await expect(client.invoices.get({ id: 42 })).rejects.toThrow(ParseError);
    });
  });

  describe('error schema', () => {
    const errorSchema = z.object({ message: z.string() });

    function errorContract() {
      return defineContract({
        endpoints: {
          get: {
            method: 'GET' as const,
            path: '/invoices/:id',
            pathParams: z.object({ id: z.number() }),
            response: { body: invoiceSchema },
          },
        },
        error: errorSchema,
      });
    }

    it('validates error body with contract error schema', async () => {
      const fetchFn = mockFetch(422, { message: 'Validation failed' });
      const client = createClient(errorContract(), BASE_URL, { fetch: fetchFn });

      try {
        await client.get({ id: 42 });
        expect.unreachable();
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).body).toEqual({ message: 'Validation failed' });
      }
    });

    it('falls back to raw body when error schema does not match', async () => {
      const fetchFn = mockFetch(500, { error: 'unexpected format' });
      const client = createClient(errorContract(), BASE_URL, { fetch: fetchFn });

      try {
        await client.get({ id: 42 });
        expect.unreachable();
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).status).toBe(500);
        expect((error as ApiError).body).toEqual({ error: 'unexpected format' });
      }
    });

    it('falls back to raw body in catch mode when error schema does not match', async () => {
      const fetchFn = mockFetch(422, { error: 'unexpected format' });
      const client = createClient(errorContract(), BASE_URL, { fetch: fetchFn });

      const result = await client.get({ id: 42 }, { catch: [422] });

      expect(result).toEqual({
        data: { error: 'unexpected format' },
        ok: false,
        status: 422,
      });
    });
  });

  describe('headers', () => {
    it('sends static global headers', async () => {
      const fetchFn = mockFetch(200, { id: 42, number: 'INV-001', status: 'draft' });
      const client = createClient(invoiceContract, BASE_URL, {
        fetch: fetchFn,
        headers: { Authorization: 'Bearer token123' },
      });

      await client.invoices.get({ id: 42 });

      const [, init] = vi.mocked(fetchFn).mock.calls[0];
      expect(new Headers(init?.headers).get('Authorization')).toBe('Bearer token123');
    });

    it('calls header function on each request', async () => {
      const fetchFn = mockFetch(200, { id: 42, number: 'INV-001', status: 'draft' });
      let callCount = 0;
      const client = createClient(invoiceContract, BASE_URL, {
        fetch: fetchFn,
        headers: () => {
          callCount++;
          return { 'X-Request-Id': `req-${String(callCount)}` };
        },
      });

      await client.invoices.get({ id: 42 });
      await client.invoices.get({ id: 42 });

      const headers1 = new Headers(vi.mocked(fetchFn).mock.calls[0][1]?.headers);
      const headers2 = new Headers(vi.mocked(fetchFn).mock.calls[1][1]?.headers);
      expect(headers1.get('X-Request-Id')).toBe('req-1');
      expect(headers2.get('X-Request-Id')).toBe('req-2');
    });

    it('merges per-request headers over global headers', async () => {
      const fetchFn = mockFetch(200, { id: 42, number: 'INV-001', status: 'draft' });
      const client = createClient(invoiceContract, BASE_URL, {
        fetch: fetchFn,
        headers: { Authorization: 'Bearer old', 'X-Global': 'yes' },
      });

      await client.invoices.get(
        { id: 42 },
        { catch: [404], headers: { Authorization: 'Bearer new' } },
      );

      const [, init] = vi.mocked(fetchFn).mock.calls[0];
      const headers = new Headers(init?.headers);
      expect(headers.get('Authorization')).toBe('Bearer new');
      expect(headers.get('X-Global')).toBe('yes');
    });
  });

  describe('key transforms', () => {
    it('serializes request body keys', async () => {
      const contract = defineContract({
        endpoints: {
          create: {
            method: 'POST' as const,
            path: '/invoices',
            request: {
              body: z.object({ invoiceNumber: z.string() }),
            },
            response: { body: invoiceSchema },
          },
        },
      });
      const fetchFn = mockFetch(200, { id: 1, number: 'INV-001', status: 'draft' });
      const client = createClient(contract, BASE_URL, {
        fetch: fetchFn,
        serializeKey: 'snake',
      });

      await client.create({ invoiceNumber: 'INV-001' });

      const [, init] = vi.mocked(fetchFn).mock.calls[0];
      const body = JSON.parse(init?.body as string) as Record<string, unknown>;
      expect(body).toEqual({ invoice_number: 'INV-001' });
    });

    it('serializes query param keys', async () => {
      const contract = defineContract({
        endpoints: {
          list: {
            method: 'GET' as const,
            path: '/invoices',
            request: {
              query: z.object({ totalCount: z.number().optional() }),
            },
            response: { body: z.object({ invoices: z.array(invoiceSchema) }) },
          },
        },
      });
      const fetchFn = mockFetch(200, { invoices: [] });
      const client = createClient(contract, BASE_URL, {
        fetch: fetchFn,
        serializeKey: 'snake',
      });

      await client.list({ totalCount: 5 });

      const [url] = vi.mocked(fetchFn).mock.calls[0];
      expect(url).toContain('total_count=5');
    });

    it('normalizes response keys', async () => {
      const contract = defineContract({
        endpoints: {
          get: {
            method: 'GET' as const,
            path: '/invoices/:id',
            pathParams: z.object({ id: z.number() }),
            response: { body: z.object({ dueOn: z.string(), invoiceNumber: z.string() }) },
          },
        },
      });
      const fetchFn = mockFetch(200, { due_on: '2024-01-15', invoice_number: 'INV-001' });
      const client = createClient(contract, BASE_URL, {
        fetch: fetchFn,
        normalizeKey: 'camel',
      });

      const result = await client.get({ id: 42 });

      expect(result).toEqual({ dueOn: '2024-01-15', invoiceNumber: 'INV-001' });
    });

    it('normalizes error response keys', async () => {
      const contract = defineContract({
        endpoints: {
          get: {
            method: 'GET' as const,
            path: '/invoices/:id',
            pathParams: z.object({ id: z.number() }),
            response: { body: invoiceSchema },
          },
        },
        error: z.object({ errorMessage: z.string() }),
      });
      const fetchFn = mockFetch(422, { error_message: 'Validation failed' });
      const client = createClient(contract, BASE_URL, {
        fetch: fetchFn,
        normalizeKey: 'camel',
      });

      try {
        await client.get({ id: 42 });
        expect.unreachable();
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).body).toEqual({ errorMessage: 'Validation failed' });
      }
    });

    it('accepts custom key transform functions', async () => {
      const contract = defineContract({
        endpoints: {
          get: {
            method: 'GET' as const,
            path: '/invoices/:id',
            pathParams: z.object({ id: z.number() }),
            response: { body: invoiceSchema },
          },
        },
      });
      const fetchFn = mockFetch(200, { ID: 42, NUMBER: 'INV-001', STATUS: 'draft' });
      const client = createClient(contract, BASE_URL, {
        fetch: fetchFn,
        normalizeKey: (key: string) => key.toLowerCase(),
      });

      const result = await client.get({ id: 42 });

      expect(result).toEqual({ id: 42, number: 'INV-001', status: 'draft' });
    });
  });

  describe('raw mode', () => {
    it('accepts separated params', async () => {
      const fetchFn = mockFetch(200, { id: 42, number: 'INV-001', status: 'sent' });
      const client = createClient(invoiceContract, BASE_URL, { fetch: fetchFn });

      const result = await client.invoices.update.raw({
        body: { status: 'sent' },
        pathParams: { id: 42 },
      });

      expect(result).toEqual({ id: 42, number: 'INV-001', status: 'sent' });
      const [url, init] = vi.mocked(fetchFn).mock.calls[0];
      expect(url).toContain('/invoices/42');
      expect(init?.body).toBe(JSON.stringify({ status: 'sent' }));
    });

    it('returns error Result in catch mode', async () => {
      const fetchFn = mockFetch(404, { message: 'Not found' });
      const client = createClient(invoiceContract, BASE_URL, { fetch: fetchFn });

      const result = await client.invoices.get.raw(
        { pathParams: { id: 999 } },
        { catch: [404] },
      );

      expect(result).toEqual({
        data: { message: 'Not found' },
        ok: false,
        status: 404,
      });
    });
  });

  describe('ETag caching', () => {
    it('stores response when ETag header is present', async () => {
      const cache = {
        get: vi.fn().mockReturnValue(null),
        set: vi.fn(),
      };
      const fetchFn = mockFetch(200, { id: 42, number: 'INV-001', status: 'draft' }, {
        ETag: '"abc123"',
      });
      const client = createClient(invoiceContract, BASE_URL, { cache, fetch: fetchFn });

      await client.invoices.get({ id: 42 });

      expect(cache.set).toHaveBeenCalledWith(
        expect.stringContaining('/invoices/42'),
        { etag: '"abc123"', json: { id: 42, number: 'INV-001', status: 'draft' } },
      );
    });

    it('does not store response when ETag header is absent', async () => {
      const cache = {
        get: vi.fn().mockReturnValue(null),
        set: vi.fn(),
      };
      const fetchFn = mockFetch(200, { id: 42, number: 'INV-001', status: 'draft' });
      const client = createClient(invoiceContract, BASE_URL, { cache, fetch: fetchFn });

      await client.invoices.get({ id: 42 });

      expect(cache.set).not.toHaveBeenCalled();
    });

    it('sends If-None-Match header when cache entry exists', async () => {
      const cache = {
        get: vi.fn().mockReturnValue({ etag: '"abc123"', json: { id: 42, number: 'INV-001', status: 'draft' } }),
        set: vi.fn(),
      };
      const fetchFn = mockFetch(304);
      const client = createClient(invoiceContract, BASE_URL, { cache, fetch: fetchFn });

      await client.invoices.get({ id: 42 });

      const [, init] = vi.mocked(fetchFn).mock.calls[0];
      expect(new Headers(init?.headers).get('If-None-Match')).toBe('"abc123"');
    });

    it('returns cached data on 304 response', async () => {
      const cache = {
        get: vi.fn().mockReturnValue({ etag: '"abc123"', json: { id: 42, number: 'INV-001', status: 'draft' } }),
        set: vi.fn(),
      };
      const fetchFn = mockFetch(304);
      const client = createClient(invoiceContract, BASE_URL, { cache, fetch: fetchFn });

      const result = await client.invoices.get({ id: 42 });

      expect(result).toEqual({ id: 42, number: 'INV-001', status: 'draft' });
    });

    it('normalizes cached data keys on 304 response', async () => {
      const contract = defineContract({
        endpoints: {
          get: {
            method: 'GET' as const,
            path: '/invoices/:id',
            pathParams: z.object({ id: z.number() }),
            response: { body: z.object({ invoiceNumber: z.string() }) },
          },
        },
      });
      const cache = {
        get: vi.fn().mockReturnValue({ etag: '"abc123"', json: { invoice_number: 'INV-001' } }),
        set: vi.fn(),
      };
      const fetchFn = mockFetch(304);
      const client = createClient(contract, BASE_URL, {
        cache,
        fetch: fetchFn,
        normalizeKey: 'camel',
      });

      const result = await client.get({ id: 42 });

      expect(result).toEqual({ invoiceNumber: 'INV-001' });
    });
  });

  describe('signal', () => {
    it('passes AbortSignal to fetch', async () => {
      const fetchFn = mockFetch(200, { id: 42, number: 'INV-001', status: 'draft' });
      const client = createClient(invoiceContract, BASE_URL, { fetch: fetchFn });
      const controller = new AbortController();

      await client.invoices.get({ id: 42 }, { catch: [404], signal: controller.signal });

      const [, init] = vi.mocked(fetchFn).mock.calls[0];
      expect(init?.signal).toBe(controller.signal);
    });
  });

  describe('nested endpoints', () => {
    it('builds client tree from nested endpoint structure', async () => {
      const contract = defineContract({
        endpoints: {
          billing: {
            invoices: {
              list: {
                method: 'GET' as const,
                path: '/billing/invoices',
                response: { body: z.object({ invoices: z.array(invoiceSchema) }) },
              },
            },
          },
        },
      });
      const fetchFn = mockFetch(200, { invoices: [] });
      const client = createClient(contract, BASE_URL, { fetch: fetchFn });

      const result = await client.billing.invoices.list();

      expect(result).toEqual({ invoices: [] });
    });
  });

  describe('endpoint without response schema', () => {
    it('returns undefined for successful response', async () => {
      const contract = defineContract({
        endpoints: {
          ping: {
            method: 'POST' as const,
            path: '/ping',
          },
        },
      });
      const fetchFn = mockFetch(200, { ok: true });
      const client = createClient(contract, BASE_URL, { fetch: fetchFn });

      await expect(client.ping()).resolves.toBeUndefined();
    });
  });
});
