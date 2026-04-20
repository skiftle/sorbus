/**
 * Thrown when the server returns a non-OK response.
 *
 * @example
 * ```ts
 * import { ApiError } from 'sorbus';
 *
 * try {
 *   await api.invoices.show({ id: '1' });
 * } catch (error) {
 *   if (error instanceof ApiError) {
 *     console.log(error.status);
 *     console.log(error.body);
 *   }
 * }
 * ```
 */
export class ApiError extends Error {
  /** The parsed response body, or `null` if unparseable. */
  readonly body: unknown;
  /** The HTTP status code. */
  readonly status: number;

  constructor(status: number, body: unknown) {
    super(`Request failed with status ${String(status)}`);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

/**
 * Thrown when the network request fails.
 *
 * @example
 * ```ts
 * import { FetchError } from 'sorbus';
 *
 * try {
 *   await api.invoices.index();
 * } catch (error) {
 *   if (error instanceof FetchError) {
 *     console.log(error.message);
 *   }
 * }
 * ```
 */
export class FetchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FetchError';
  }
}

/**
 * Thrown when Zod validation of the response fails.
 *
 * @example
 * ```ts
 * import { ParseError } from 'sorbus';
 *
 * try {
 *   await api.invoices.show({ id: '1' });
 * } catch (error) {
 *   if (error instanceof ParseError) {
 *     console.log(error.cause);
 *   }
 * }
 * ```
 */
export class ParseError extends Error {
  constructor(cause: unknown) {
    super('Failed to parse response');
    this.name = 'ParseError';
    this.cause = cause;
  }
}
