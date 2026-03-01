import type { z } from 'zod';

import type { Dict } from './types';

/** A single API endpoint. */
export interface Endpoint {
  /** The HTTP error status codes. */
  errors?: readonly number[];
  /** The HTTP method. */
  method: EndpointMethod;
  /** The URL path (e.g. `/invoices/:id`). */
  path: string;
  /** The Zod schema for path parameters. */
  pathParams?: z.ZodType;
  /** The request schemas. */
  request?: {
    /** The Zod schema for the request body. */
    body?: z.ZodType;
    /** The Zod schema for query parameters. */
    query?: z.ZodType;
  };
  /** The response schemas. */
  response?: {
    /** The Zod schema for the response body. */
    body: z.ZodType;
  };
}

export interface EndpointDict {
  [key: string]: Endpoint | EndpointDict;
}

/** The HTTP methods supported by endpoints. */
export type EndpointMethod =
  | 'DELETE'
  | 'GET'
  | 'HEAD'
  | 'OPTIONS'
  | 'PATCH'
  | 'POST'
  | 'PUT';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EndpointFn = ((...args: any[]) => any) & { raw: (...args: any[]) => any };

export function buildEndpointDict(
  tree: EndpointDict,
  createEndpointFn: (options: Endpoint) => EndpointFn,
): Dict {
  return Object.entries(tree).reduce<Dict>((result, [key, value]) => {
    if (isEndpoint(value)) {
      result[key] = createEndpointFn(value);
    } else {
      result[key] = buildEndpointDict(value, createEndpointFn);
    }
    return result;
  }, {});
}

/**
 * Defines an endpoint with full type inference.
 *
 * @example
 * ```ts
 * import { defineEndpoint } from 'sorbus';
 * import { z } from 'zod';
 *
 * const show = defineEndpoint({
 *   method: 'GET',
 *   path: '/invoices/:id',
 *   pathParams: z.object({
 *     id: z.string(),
 *   }),
 *   response: {
 *     body: z.object({
 *       invoice: z.object({
 *         id: z.string(),
 *         number: z.string(),
 *       }),
 *     }),
 *   },
 * });
 * ```
 */
export function defineEndpoint<const T extends Endpoint>(endpoint: T): T {
  return endpoint;
}

const METHODS: ReadonlySet<string> = new Set([
  'DELETE',
  'GET',
  'HEAD',
  'OPTIONS',
  'PATCH',
  'POST',
  'PUT',
]);

export function isEndpoint(obj: unknown): obj is Endpoint {
  if (typeof obj !== 'object' || obj === null) return false;
  const record = obj as Record<string, unknown>;
  return (
    typeof record.method === 'string' &&
    METHODS.has(record.method) &&
    typeof record.path === 'string'
  );
}
