import type { Dict } from '../types';

export function isPlainObject(value: unknown): value is Dict {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}
