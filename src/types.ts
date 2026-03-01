import type { z } from 'zod';

/** The typed client matching the contract's endpoint tree. */
export type Client<T, TError = unknown> = {
  [K in keyof T]: T[K] extends { method: string; path: string }
    ? ClientEndpoint<T[K], TError>
    : T[K] extends Record<string, unknown>
      ? Client<T[K], TError>
      : never;
};

export type ClientEndpoint<T, TError = unknown> = EndpointOverloads<
  ClientEndpointParams<T>,
  ResponseData<T>,
  ErrorCodes<T>,
  TError
> & {
  raw: EndpointOverloads<
    RawEndpointParams<T>,
    ResponseData<T>,
    ErrorCodes<T>,
    TError
  >;
};

export type ClientEndpointParams<T> = InferBody<T> &
  InferPathParams<T> &
  InferQuery<T>;

export type Dict = Record<string, unknown>;

export type RawEndpointParams<T> = ([BodyOf<T>] extends [never]
  ? // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    {}
  : { body: InferBody<T> }) &
  ([PathParamsOf<T>] extends [never]
    ? // eslint-disable-next-line @typescript-eslint/no-empty-object-type
      {}
    : { pathParams: InferPathParams<T> }) &
  ([QueryOf<T>] extends [never]
    ? // eslint-disable-next-line @typescript-eslint/no-empty-object-type
      {}
    : { query: InferQuery<T> });

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

type BodyOf<T> = T extends { request: { body: infer B } } ? B : never;

interface EndpointOverloads<TParams, TResponse, TErrors, TError> {
  (...args: OptionalIfEmpty<TParams>): Promise<TResponse>;
  (params: TParams, options: RequestOptions): Promise<TResponse>;
  (
    params: TParams,
    options: RequestOptions & { catch: TErrors[] },
  ): Promise<Result<TResponse, TError>>;
}

type ErrorCodes<T> = T extends { errors: readonly (infer E)[] } ? E : number;

type InferBody<T> = InferOptionalSchema<BodyOf<T>>;
type InferOptionalSchema<T> = [T] extends [never]
  ? unknown
  : T extends z.ZodType
    ? z.output<T>
    : unknown;
type InferPathParams<T> = InferOptionalSchema<PathParamsOf<T>>;

type InferQuery<T> = InferOptionalSchema<QueryOf<T>>;
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type OptionalIfEmpty<T> = {} extends T ? [params?: T] : [params: T];
type PathParamsOf<T> = T extends { pathParams: infer P } ? P : never;
type QueryOf<T> = T extends { request: { query: infer Q } } ? Q : never;

type ResponseData<T> = [ResponseOf<T>] extends [never]
  ? undefined
  : InferOptionalSchema<ResponseOf<T>>;

type ResponseOf<T> = T extends { response: { body: infer R } } ? R : never;
