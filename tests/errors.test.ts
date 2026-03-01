import { describe, expect, it } from 'vitest';

import { ApiError, FetchError, ParseError } from '../src/errors';

describe('ApiError', () => {
  it('stores status and body', () => {
    const error = new ApiError(422, { message: 'Validation failed' });

    expect(error.status).toBe(422);
    expect(error.body).toEqual({ message: 'Validation failed' });
    expect(error.message).toBe('Request failed with status 422');
    expect(error.name).toBe('ApiError');
  });

  it('accepts null body', () => {
    const error = new ApiError(500, null);

    expect(error.status).toBe(500);
    expect(error.body).toBeNull();
  });
});

describe('FetchError', () => {
  it('stores message', () => {
    const error = new FetchError('Network request failed');

    expect(error.message).toBe('Network request failed');
    expect(error.name).toBe('FetchError');
  });
});

describe('ParseError', () => {
  it('stores cause', () => {
    const cause = new Error('Expected string, received number');
    const error = new ParseError(cause);

    expect(error.message).toBe('Failed to parse response');
    expect(error.name).toBe('ParseError');
    expect(error.cause).toBe(cause);
  });
});
