import { describe, expect, it } from 'vitest';

import { isPlainObject } from '../../src/utils/is-plain-object';

describe('isPlainObject', () => {
  it('returns true for empty object', () => {
    expect(isPlainObject({})).toBe(true);
  });

  it('returns true for object with properties', () => {
    expect(isPlainObject({ name: 'Acme Corp', status: 'draft' })).toBe(true);
  });

  it('returns false for null', () => {
    expect(isPlainObject(null)).toBe(false);
  });

  it('returns false for array', () => {
    expect(isPlainObject([1, 2, 3])).toBe(false);
  });

  it('returns false for Date', () => {
    expect(isPlainObject(new Date('2024-01-15T10:30:00Z'))).toBe(false);
  });

  it('returns false for primitive values', () => {
    expect(isPlainObject(42)).toBe(false);
    expect(isPlainObject('invoice')).toBe(false);
    expect(isPlainObject(true)).toBe(false);
    expect(isPlainObject(undefined)).toBe(false);
  });
});
