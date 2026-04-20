import type { ZodType } from 'zod';

import type { Contract } from './contract';
import type { KeyFormat } from './key-format';
import type { Cache, OperationContext, OperationTree } from './types';

import { resolveKeyTransform } from './key-format';
import { buildOperationTree } from './operation';

const identity = (key: string): string => key;

/**
 * The options for {@link createClient}.
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

/** The inferred client type for contract `T`. */
export type InferClient<T extends Contract> = OperationTree<
  T['endpoints'],
  InferError<T>
>;

/** The inferred error type for contract `T`. */
export type InferError<T> = T extends { error: ZodType<infer E> } ? E : unknown;

/**
 * Creates a typed API client from a contract.
 *
 * @param contract - The contract.
 * @param baseUrl - The base URL for all requests.
 * @param options - The client options.
 * @returns The typed API client.
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
  options?: CreateClientOptions,
): InferClient<T>;
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export function createClient<T>(
  contract: Contract,
  baseUrl: string,
  options?: CreateClientOptions,
): T;
export function createClient(
  contract: Contract,
  baseUrl: string,
  options: CreateClientOptions = {},
): unknown {
  const context: OperationContext = {
    baseUrl,
    cache: options.cache,
    errorSchema: contract.error,
    fetch: options.fetch ?? globalThis.fetch,
    headers: options.headers,
    normalizeKey: resolveKey(options.normalizeKey),
    serializeKey: resolveKey(options.serializeKey),
  };

  return buildOperationTree(contract.endpoints, context);
}

/**
 * Creates a factory function pre-configured with a contract.
 *
 * Useful for wrapping a contract once and exposing a simple
 * `(baseUrl, options) => client` function.
 *
 * @param contract - The contract to bind.
 * @returns A factory that creates clients for the given contract.
 *
 * @example
 * ```ts
 * import { createClientFactory } from 'sorbus';
 *
 * // Inferred from contract
 * const makeClient = createClientFactory(contract);
 *
 * // Explicit return type (e.g. pre-computed Client interface)
 * const makeClient = createClientFactory<Client>(contract);
 *
 * const dev = makeClient('http://localhost:3000');
 * const prod = makeClient('https://api.example.com');
 * ```
 */
export function createClientFactory<T extends Contract>(
  contract: T,
): (baseUrl: string, options?: CreateClientOptions) => InferClient<T>;
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export function createClientFactory<T>(
  contract: Contract,
): (baseUrl: string, options?: CreateClientOptions) => T;
export function createClientFactory(
  contract: Contract,
): (baseUrl: string, options?: CreateClientOptions) => unknown {
  return (baseUrl, options) => createClient(contract, baseUrl, options);
}

function resolveKey(
  key: ((k: string) => string) | KeyFormat | undefined,
): (k: string) => string {
  if (typeof key === 'function') return key;
  if (key) return resolveKeyTransform(key);
  return identity;
}
