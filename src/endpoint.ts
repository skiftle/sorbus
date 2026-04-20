import type { ZodType } from 'zod';

import { isPlainObject } from './utils/isPlainObject';

/** A single API endpoint. */
export interface Endpoint {
  /** The HTTP error status codes. */
  errors?: readonly number[];
  /** The HTTP method. */
  method: EndpointMethod;
  /** The URL path (e.g. `/invoices/:id`). */
  path: string;
  /** The Zod schema for path parameters. */
  pathParams?: ZodType;
  /** The request schemas. */
  request?: {
    /** The Zod schema for the request body. */
    body?: ZodType;
    /** The Zod schema for query parameters. */
    query?: ZodType;
  };
  /** The response schemas. */
  response?: {
    /** The Zod schema for the response body. */
    body: ZodType;
  };
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

/** A nested tree of endpoints, grouped by resource. */
export interface EndpointTree {
  [key: string]: Endpoint | EndpointTree;
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

export function isEndpoint(value: unknown): value is Endpoint {
  return (
    isPlainObject(value) &&
    typeof value.method === 'string' &&
    METHODS.has(value.method) &&
    typeof value.path === 'string'
  );
}
