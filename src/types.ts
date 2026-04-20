import type { output, ZodType } from 'zod';

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

export type Dict = Record<string, unknown>;

/** A callable client operation with flat and raw overloads. */
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

export interface OperationContext {
  baseUrl: string;
  cache?: Cache;
  errorSchema?: ZodType;
  fetch: typeof fetch;
  headers?: (() => HeadersInit) | HeadersInit;
  normalizeKey: (key: string) => string;
  serializeKey: (key: string) => string;
}

export interface OperationSignature<TParams, TResponse, TErrors, TError> {
  (...args: OptionalIfEmpty<TParams>): Promise<TResponse>;
  (params: TParams, options: RequestOptions): Promise<TResponse>;
  (
    params: TParams,
    options: RequestOptions & { catch: TErrors[] },
  ): Promise<Result<TResponse, TError>>;
}

// --- Inference helpers ---

export type OperationTree<T, TError = unknown> = {
  [K in keyof T]: T[K] extends { method: string; path: string }
    ? Operation<T[K], TError>
    : T[K] extends Record<string, unknown>
      ? OperationTree<T[K], TError>
      : never;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type OptionalIfEmpty<T> = {} extends T ? [params?: T] : [params: T];

/** The per-request options. */
export interface RequestOptions {
  /** The per-request headers. */
  headers?: HeadersInit;
  /** The abort signal. */
  signal?: AbortSignal;
}

/**
 * The return type when using `catch`. Discriminated on `ok`.
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

export type OperationErrors<T> = T extends { errors: readonly (infer E)[] }
  ? E
  : number;

export type OperationFlatParams<T> = SchemaOutput<BodyOf<T>> &
  SchemaOutput<PathParamsOf<T>> &
  SchemaOutput<QueryOf<T>>;

export type OperationRawParams<T> = ([BodyOf<T>] extends [never]
  ? // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    {}
  : { body: SchemaOutput<BodyOf<T>> }) &
  ([PathParamsOf<T>] extends [never]
    ? // eslint-disable-next-line @typescript-eslint/no-empty-object-type
      {}
    : { pathParams: SchemaOutput<PathParamsOf<T>> }) &
  ([QueryOf<T>] extends [never]
    ? // eslint-disable-next-line @typescript-eslint/no-empty-object-type
      {}
    : { query: SchemaOutput<QueryOf<T>> });

export type OperationResponse<T> = [ResponseOf<T>] extends [never]
  ? undefined
  : SchemaOutput<ResponseOf<T>>;

type BodyOf<T> = T extends { request: { body: infer B } } ? B : never;

type PathParamsOf<T> = T extends { pathParams: infer P } ? P : never;

type QueryOf<T> = T extends { request: { query: infer Q } } ? Q : never;

type ResponseOf<T> = T extends { response: { body: infer R } } ? R : never;

type SchemaOutput<T> = [T] extends [never]
  ? unknown
  : T extends ZodType
    ? output<T>
    : unknown;
