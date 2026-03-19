import type { z } from 'zod';

import type { Contract } from './contract';
import type { Endpoint } from './endpoint';
import type { Client, Dict } from './types';
import type { KeyFormat } from './utils/keyFormat';

import { buildEndpointDict } from './endpoint';
import { ApiError, FetchError, ParseError } from './errors';
import { buildUrl } from './utils/buildUrl';
import { resolveKeyTransform } from './utils/keyFormat';
import { transformKeys } from './utils/transformKeys';

const identity = (key: string): string => key;

/** The ETag cache for GET requests. */
export interface Cache {
  /** Retrieves a cached entry by URL. */
  get: (url: string) => CacheEntry | null | Promise<CacheEntry | null>;
  /** Stores a cache entry by URL. */
  set: (url: string, entry: CacheEntry) => Promise<void> | void;
}

/** A cached response entry. */
export interface CacheEntry {
  /** The ETag header value. */
  etag: string;
  /** The raw JSON response body. */
  json: Dict;
}

/**
 * Options for {@link createClient}.
 *
 * @example
 * ```ts
 * import { createClient } from 'sorbus';
 * import { contract } from './contract';
 *
 * const api = createClient(contract, '/api/v1', {
 *   headers: () => ({
 *     Authorization: `Bearer ${getToken()}`,
 *   }),
 *   serializeKey: 'snake',
 *   normalizeKey: 'camel',
 * });
 * ```
 */
export interface CreateClientOptions {
  /** The ETag cache for GET requests. */
  cache?: Cache;
  /** The fetch implementation. Defaults to `globalThis.fetch`. */
  fetch?: typeof fetch;
  /** The headers for every request. */
  headers?: (() => HeadersInit) | HeadersInit;
  /** The key transform for response data. */
  normalizeKey?: ((key: string) => string) | KeyFormat;
  /** The key transform for request data. */
  serializeKey?: ((key: string) => string) | KeyFormat;
}

/** The inferred error type from a contract's error schema. */
export type InferError<T> = T extends { error: z.ZodType<infer E> }
  ? E
  : unknown;

interface CallOptions {
  catch?: number[];
  headers?: HeadersInit;
  signal?: AbortSignal;
}

interface SeparatedParams {
  body?: Dict;
  pathParams?: Dict;
  query?: Dict;
}

/**
 * Creates a typed API client from a contract.
 *
 * @param contract - The contract.
 * @param baseUrl - The base URL for all requests.
 * @param options - The client options.
 *
 * @example
 * ```ts
 * import { createClient } from 'sorbus';
 * import { contract } from './contract';
 *
 * const api = createClient(contract, '/api/v1', {
 *   headers: () => ({
 *     Authorization: `Bearer ${getToken()}`,
 *   }),
 *   serializeKey: 'snake',
 *   normalizeKey: 'camel',
 * });
 *
 * const { invoices } = await api.invoices.index();
 *
 * const result = await api.invoices.show(
 *   { id: '1' },
 *   { catch: [404] },
 * );
 *
 * if (result.ok) {
 *   console.log(result.data);
 * }
 * ```
 */
export function createClient<T extends Contract>(
  contract: T,
  baseUrl: string,
  options: CreateClientOptions = {},
): Client<T['endpoints'], InferError<T>> {
  const {
    cache,
    fetch: fetchFn = globalThis.fetch,
    headers: globalHeaders,
  } = options;

  const serializeKey =
    typeof options.serializeKey === 'function'
      ? options.serializeKey
      : options.serializeKey
        ? resolveKeyTransform(options.serializeKey)
        : identity;
  const normalizeKey =
    typeof options.normalizeKey === 'function'
      ? options.normalizeKey
      : options.normalizeKey
        ? resolveKeyTransform(options.normalizeKey)
        : identity;

  function serializeKeys(params: Dict): Dict {
    return transformKeys(params, serializeKey);
  }

  function normalizeKeys(params: Dict): Dict {
    return transformKeys(params, normalizeKey);
  }

  function buildHeaders(perRequest?: HeadersInit): Headers {
    const base =
      typeof globalHeaders === 'function' ? globalHeaders() : globalHeaders;
    const headers = new Headers(base);

    if (perRequest) {
      for (const [key, value] of new Headers(perRequest).entries()) {
        headers.set(key, value);
      }
    }

    return headers;
  }

  function rethrowOrWrap(error: unknown): never {
    if (
      error instanceof ApiError ||
      error instanceof FetchError ||
      error instanceof ParseError
    )
      throw error;
    throw new ParseError(error as Error);
  }

  async function parseErrorBody(response: Response): Promise<unknown> {
    try {
      const json = (await response.json()) as Dict;
      const normalized = normalizeKeys(json);

      if (!contract.error) return normalized;

      return contract.error.safeParse(normalized).data ?? normalized;
    } catch {
      return null;
    }
  }

  function createEndpointFn(endpoint: Endpoint) {
    async function execute(
      separated: SeparatedParams,
      callOptions?: CallOptions,
    ): Promise<unknown> {
      const url = buildUrl(
        endpoint.path,
        separated.pathParams,
        separated.query,
        baseUrl,
        serializeKey,
      );

      const headers = buildHeaders(callOptions?.headers);
      const requestBody = separated.body
        ? JSON.stringify(serializeKeys(separated.body))
        : undefined;

      if (requestBody) {
        headers.set('Content-Type', 'application/json');
      }

      const cacheEntry = await cache?.get(url);

      if (cacheEntry) {
        headers.set('If-None-Match', cacheEntry.etag);
      }

      let response: Response;

      try {
        response = await fetchFn(url, {
          body: requestBody,
          headers,
          method: endpoint.method,
          signal: callOptions?.signal,
        });
      } catch (error) {
        throw new FetchError(
          error instanceof Error ? error.message : 'Network request failed',
        );
      }

      const catchStatuses = callOptions?.catch;

      if (!response.ok && response.status !== 304) {
        const errorData = await parseErrorBody(response);

        if (catchStatuses?.includes(response.status)) {
          return {
            data: errorData,
            ok: false as const,
            status: response.status,
          };
        }

        throw new ApiError(response.status, errorData);
      }

      if (response.status === 204 || !endpoint.response) {
        return catchStatuses
          ? { data: undefined, ok: true as const, status: response.status }
          : undefined;
      }

      if (cacheEntry && response.status === 304) {
        try {
          const data: unknown = endpoint.response.body.parse(
            normalizeKeys(cacheEntry.json),
          );
          return catchStatuses
            ? { data, ok: true as const, status: 304 }
            : data;
        } catch (error) {
          throw new ParseError(error as Error);
        }
      }

      let json: Dict;

      try {
        json = (await response.json()) as Dict;
      } catch {
        throw new ApiError(response.status, null);
      }

      if (endpoint.method === 'GET' && response.status === 200) {
        const etag = response.headers.get('ETag');
        if (etag) await cache?.set(url, { etag, json });
      }

      try {
        const data: unknown = endpoint.response.body.parse(normalizeKeys(json));
        return catchStatuses
          ? { data, ok: true as const, status: response.status }
          : data;
      } catch (error) {
        throw new ParseError(error as Error);
      }
    }

    function flat(
      params: Dict = {},
      callOptions?: CallOptions,
    ): Promise<unknown> {
      try {
        return execute(
          {
            body: endpoint.request?.body?.parse(params) as Dict | undefined,
            pathParams: endpoint.pathParams?.parse(params) as Dict | undefined,
            query: endpoint.request?.query?.parse(params) as Dict | undefined,
          },
          callOptions,
        );
      } catch (error) {
        rethrowOrWrap(error);
      }
    }

    function raw(
      params: SeparatedParams = {},
      callOptions?: CallOptions,
    ): Promise<unknown> {
      try {
        return execute(
          {
            body: endpoint.request?.body?.parse(params.body) as
              | Dict
              | undefined,
            pathParams: endpoint.pathParams?.parse(params.pathParams) as
              | Dict
              | undefined,
            query: endpoint.request?.query?.parse(params.query) as
              | Dict
              | undefined,
          },
          callOptions,
        );
      } catch (error) {
        rethrowOrWrap(error);
      }
    }

    flat.raw = raw;
    return flat;
  }

  return buildEndpointDict(contract.endpoints, createEndpointFn) as Client<
    T['endpoints'],
    InferError<T>
  >;
}
