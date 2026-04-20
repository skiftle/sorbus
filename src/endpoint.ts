import type { ZodType } from 'zod';

import { isPlainObject } from './utils/is-plain-object';

/** The API endpoint. */
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

/** The supported HTTP method. */
export type EndpointMethod =
  | 'DELETE'
  | 'GET'
  | 'HEAD'
  | 'OPTIONS'
  | 'PATCH'
  | 'POST'
  | 'PUT';

/** @internal */
export interface EndpointTree {
  [key: string]: Endpoint | EndpointTree;
}

/**
 * Defines an endpoint with full type inference.
 *
 * @param endpoint - The endpoint definition.
 * @returns The endpoint, typed as passed in.
 *
 * @example
 * ```ts
 * import { defineEndpoint } from 'sorbus';
 * import * as z from 'zod';
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

/** @internal */
export function isEndpoint(value: unknown): value is Endpoint {
  return (
    isPlainObject(value) &&
    typeof value.method === 'string' &&
    METHODS.has(value.method) &&
    typeof value.path === 'string'
  );
}
