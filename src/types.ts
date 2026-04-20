import type { output, ZodType } from 'zod';

/** The ETag cache for GET requests. */
export interface Cache {
  /** Retrieves the cached entry for `url`, or `null` if missing. */
  get: (url: string) => CacheEntry | null | Promise<CacheEntry | null>;
  /** Stores `entry` under `url`. */
  set: (url: string, entry: CacheEntry) => Promise<void> | void;
}

/** A cached response entry. */
export interface CacheEntry {
  /** The ETag header value. */
  etag: string;
  /** The raw JSON response body. */
  json: Dict;
}

/** @internal */
export type Dict = Record<string, unknown>;

/** The callable client operation with flat and raw overloads. */
export type Operation<T, TError = unknown> = OperationSignature<
  OperationFlatParams<T>,
  OperationResponse<T>,
  OperationErrors<T>,
  TError
> & {
  raw: OperationSignature<
    OperationRawParams<T>,
    OperationResponse<T>,
    OperationErrors<T>,
    TError
  >;
};

/** @internal */
export interface OperationContext {
  baseUrl: string;
  cache?: Cache;
  errorSchema?: ZodType;
  fetch: typeof fetch;
  headers?: (() => HeadersInit) | HeadersInit;
  normalizeKey: (key: string) => string;
  serializeKey: (key: string) => string;
}

/** @internal */
export type OperationErrors<T> = T extends { errors: readonly (infer E)[] }
  ? E
  : number;

/** @internal */
export type OperationFlatParams<T> = SchemaOutput<BodyOf<T>> &
  SchemaOutput<PathParamsOf<T>> &
  SchemaOutput<QueryOf<T>>;

/** @internal */
export type OperationRawParams<T> = ([BodyOf<T>] extends [never]
  ? {}
  : { body: SchemaOutput<BodyOf<T>> }) &
  ([PathParamsOf<T>] extends [never]
    ? {}
    : { pathParams: SchemaOutput<PathParamsOf<T>> }) &
  ([QueryOf<T>] extends [never] ? {} : { query: SchemaOutput<QueryOf<T>> });

/** @internal */
export type OperationResponse<T> = [ResponseOf<T>] extends [never]
  ? undefined
  : SchemaOutput<ResponseOf<T>>;

/** @internal */
export interface OperationSignature<TParams, TResponse, TErrors, TError> {
  (...args: OptionalIfEmpty<TParams>): Promise<TResponse>;
  (params: TParams, options: RequestOptions): Promise<TResponse>;
  (
    params: TParams,
    options: RequestOptions & { catch: readonly TErrors[] },
  ): Promise<Result<TResponse, TError>>;
}

/** @internal */
export type OperationTree<T, TError = unknown> = {
  [K in keyof T]: T[K] extends { method: string; path: string }
    ? Operation<T[K], TError>
    : T[K] extends Record<string, unknown>
      ? OperationTree<T[K], TError>
      : never;
};
/** @internal */
export type OptionalIfEmpty<T> = {} extends T ? [params?: T] : [params: T];

/** The per-request options. */
export interface RequestOptions {
  /** The per-request headers. */
  headers?: HeadersInit;
  /** The abort signal. */
  signal?: AbortSignal;
}

/**
 * The result returned when the `catch` option is set, discriminated on `ok`.
 *
 * @example
 * ```ts
 * const result = await api.invoices.show(
 *   { id: '1' },
 *   { catch: [404] },
 * );
 *
 * if (result.ok) {
 *   console.log(result.data);
 * } else {
 *   console.log(result.status);
 *   console.log(result.data);
 * }
 * ```
 */
export type Result<TData, TError = unknown> =
  | { data: TData; ok: true; status: number }
  | { data: TError; ok: false; status: number };

type BodyOf<T> = T extends { request: { body: infer B } } ? B : never;

type PathParamsOf<T> = T extends { pathParams: infer P } ? P : never;

type QueryOf<T> = T extends { request: { query: infer Q } } ? Q : never;

type ResponseOf<T> = T extends { response: { body: infer R } } ? R : never;

type SchemaOutput<T> = [T] extends [never]
  ? unknown
  : T extends ZodType
    ? output<T>
    : T;
