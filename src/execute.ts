import type { Endpoint } from './endpoint';
import type { CacheEntry, Dict, OperationContext } from './types';

import { ApiError, FetchError, ParseError } from './errors';
import { buildUrl } from './utils/build-url';
import { transformKeys } from './utils/transform-keys';

/** @internal */
export interface CallOptions {
  catch?: readonly number[];
  headers?: HeadersInit;
  signal?: AbortSignal;
}

/** @internal */
export interface SeparatedParams {
  body?: Dict;
  pathParams?: Dict;
  query?: Dict;
}

/** @internal */
export async function execute(
  endpoint: Endpoint,
  context: OperationContext,
  separated: SeparatedParams,
  callOptions?: CallOptions,
): Promise<unknown> {
  const url = buildUrl(
    endpoint.path,
    separated.pathParams,
    separated.query,
    context.baseUrl,
    context.serializeKey,
  );

  const body = separated.body
    ? JSON.stringify(serializeKeys(context, separated.body))
    : undefined;

  const cacheEntry = (await context.cache?.get(url)) ?? null;
  const headers = buildHeaders(context, callOptions?.headers);

  if (body) headers.set('Content-Type', 'application/json');
  if (cacheEntry) headers.set('If-None-Match', cacheEntry.etag);

  const response = await doFetch(context, url, {
    body,
    headers,
    method: endpoint.method,
    signal: callOptions?.signal,
  });

  const catchStatuses = callOptions?.catch;

  if (isErrorResponse(response)) {
    return handleErrorResponse(context, response, catchStatuses);
  }

  if (isEmptyResponse(response, endpoint)) {
    return makeEmptyResult(response.status, catchStatuses);
  }

  if (isNotModified(response) && cacheEntry) {
    return parseCachedBody(context, endpoint, cacheEntry, catchStatuses);
  }

  const json = await readJsonBody(response);

  if (!json) return makeEmptyResult(response.status, catchStatuses);

  if (shouldStoreInCache(endpoint, response)) {
    const etag = response.headers.get('ETag');
    if (etag) await context.cache?.set(url, { etag, json });
  }

  return parseResponseBody(
    context,
    endpoint,
    json,
    response.status,
    catchStatuses,
  );
}

/** @internal */
export function rethrowOrWrap(error: unknown): never {
  if (
    error instanceof ApiError ||
    error instanceof FetchError ||
    error instanceof ParseError
  ) {
    throw error;
  }
  throw new ParseError(error);
}

function buildHeaders(
  context: OperationContext,
  perRequest?: HeadersInit,
): Headers {
  const base =
    typeof context.headers === 'function' ? context.headers() : context.headers;
  const headers = new Headers(base);

  if (perRequest) {
    for (const [key, value] of new Headers(perRequest).entries()) {
      headers.set(key, value);
    }
  }

  return headers;
}

async function doFetch(
  context: OperationContext,
  url: string,
  init: RequestInit,
): Promise<Response> {
  try {
    return await context.fetch(url, init);
  } catch (error) {
    throw new FetchError(
      error instanceof Error ? error.message : 'Network request failed',
    );
  }
}

async function handleErrorResponse(
  context: OperationContext,
  response: Response,
  catchStatuses: readonly number[] | undefined,
): Promise<unknown> {
  const errorData = await parseErrorBody(context, response);

  if (catchStatuses?.includes(response.status)) {
    return {
      data: errorData,
      ok: false as const,
      status: response.status,
    };
  }

  throw new ApiError(response.status, errorData);
}

function isEmptyResponse(response: Response, endpoint: Endpoint): boolean {
  return response.status === 204 || !endpoint.response;
}

function isErrorResponse(response: Response): boolean {
  return !response.ok && response.status !== 304;
}

function isNotModified(response: Response): boolean {
  return response.status === 304;
}

function makeEmptyResult(
  status: number,
  catchStatuses: readonly number[] | undefined,
): unknown {
  return catchStatuses
    ? { data: undefined, ok: true as const, status }
    : undefined;
}

function normalizeKeys(context: OperationContext, params: Dict): Dict {
  return transformKeys(params, context.normalizeKey);
}

function parseCachedBody(
  context: OperationContext,
  endpoint: Endpoint,
  cacheEntry: CacheEntry,
  catchStatuses: readonly number[] | undefined,
): unknown {
  if (!endpoint.response) return makeEmptyResult(304, catchStatuses);

  try {
    const data: unknown = endpoint.response.body.parse(
      normalizeKeys(context, cacheEntry.json),
    );
    return catchStatuses ? { data, ok: true as const, status: 304 } : data;
  } catch (error) {
    throw new ParseError(error);
  }
}

async function parseErrorBody(
  context: OperationContext,
  response: Response,
): Promise<unknown> {
  const text = await response.text();

  if (!text) return null;

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return text;
  }

  const normalized = normalizeKeys(context, parsed as Dict);

  if (!context.errorSchema) return normalized;

  return context.errorSchema.safeParse(normalized).data ?? normalized;
}

function parseResponseBody(
  context: OperationContext,
  endpoint: Endpoint,
  json: Dict,
  status: number,
  catchStatuses: readonly number[] | undefined,
): unknown {
  if (!endpoint.response) return makeEmptyResult(status, catchStatuses);

  try {
    const data: unknown = endpoint.response.body.parse(
      normalizeKeys(context, json),
    );
    return catchStatuses ? { data, ok: true as const, status } : data;
  } catch (error) {
    throw new ParseError(error);
  }
}

async function readJsonBody(response: Response): Promise<Dict | null> {
  const text = await response.text();

  if (!text) return null;

  try {
    return JSON.parse(text) as Dict;
  } catch {
    throw new ParseError(new Error('Failed to parse response as JSON'));
  }
}

function serializeKeys(context: OperationContext, params: Dict): Dict {
  return transformKeys(params, context.serializeKey);
}

function shouldStoreInCache(endpoint: Endpoint, response: Response): boolean {
  return endpoint.method === 'GET' && response.status === 200;
}
