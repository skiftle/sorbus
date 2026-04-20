/**
 * The key format for request serialization or response normalization.
 *
 * Keys that are already all-uppercase (e.g. `URL`, `ID`, `HTTP`) pass through
 * unchanged to preserve acronyms. To transform them, supply a custom function
 * instead of a preset format.
 *
 * @example
 * ```ts
 * import { createClient } from 'sorbus';
 * import { contract } from './contract';
 *
 * const api = createClient(contract, '/api/v1', {
 *   serializeKey: 'snake',
 *   normalizeKey: 'camel',
 * });
 * ```
 */
export type KeyFormat = 'camel' | 'kebab' | 'pascal' | 'snake';

/** @internal */
export function resolveKeyTransform(
  format: KeyFormat,
): (key: string) => string {
  switch (format) {
    case 'camel':
      return cached(toCamelCase);
    case 'kebab':
      return cached(toKebabCase);
    case 'pascal':
      return cached(toPascalCase);
    case 'snake':
      return cached(toSnakeCase);
  }
}

function cached(fn: (key: string) => string): (key: string) => string {
  const cache = new Map<string, string>();

  return (key: string) => {
    let result = cache.get(key);

    if (result === undefined) {
      result = /^[A-Z]+$/.test(key) ? key : fn(key);
      cache.set(key, result);
    }

    return result;
  };
}

function toCamelCase(key: string): string {
  const leading = /^_+/.exec(key)?.[0] ?? '';
  return (
    leading +
    key
      .slice(leading.length)
      .replace(/[-_]([a-z])/g, (_match, c: string) => c.toUpperCase())
  );
}

function toKebabCase(key: string): string {
  return toSnakeCase(key).replace(/_/g, '-');
}

function toPascalCase(key: string): string {
  return toCamelCase(key).replace(/^[a-z]/, (c) => c.toUpperCase());
}

function toSnakeCase(key: string): string {
  return key
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    .replace(/([a-z\d])([A-Z])/g, '$1_$2')
    .replace(/-/g, '_')
    .toLowerCase();
}
