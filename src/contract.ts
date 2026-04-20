import type { ZodType } from 'zod';

import type { EndpointTree } from './endpoint';

/** The structure of an API contract. */
export interface Contract {
  /** The endpoint tree. */
  endpoints: EndpointTree;
  /** The Zod schema for error responses. */
  error?: ZodType;
}

/**
 * Defines a contract with full type inference.
 *
 * @example
 * ```ts
 * import { defineContract, defineEndpoint } from 'sorbus';
 * import { z } from 'zod';
 *
 * const InvoiceSchema = z.object({
 *   id: z.string(),
 *   number: z.string(),
 * });
 *
 * const index = defineEndpoint({
 *   method: 'GET',
 *   path: '/invoices',
 *   response: {
 *     body: z.object({
 *       invoices: z.array(InvoiceSchema),
 *     }),
 *   },
 * });
 *
 * const show = defineEndpoint({
 *   method: 'GET',
 *   path: '/invoices/:id',
 *   pathParams: z.object({
 *     id: z.string(),
 *   }),
 *   response: {
 *     body: z.object({
 *       invoice: InvoiceSchema,
 *     }),
 *   },
 * });
 *
 * const contract = defineContract({
 *   endpoints: {
 *     invoices: {
 *       index,
 *       show,
 *     },
 *   },
 *   error: z.object({
 *     message: z.string(),
 *   }),
 * });
 * ```
 */
export function defineContract<const T extends Contract>(contract: T): T {
  return contract;
}
