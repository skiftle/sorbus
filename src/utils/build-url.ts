import type { Dict } from '../types';

import { objectToURLSearchParams } from './object-to-url-search-params';
import { transformKeys } from './transform-keys';

export function buildUrl(
  endpointPath: string,
  pathParams: Dict | undefined,
  query: Dict | undefined,
  baseUrl: string,
  serializeKey: (key: string) => string,
): string {
  let path = endpointPath;

  path = path.replace(/:([^/]+)/g, (_match, key: string) => {
    const value = pathParams?.[key];
    if (value === undefined || value === null) {
      throw new Error(`Missing path param: ${key}`);
    }
    if (
      typeof value !== 'string' &&
      typeof value !== 'number' &&
      typeof value !== 'boolean'
    ) {
      throw new Error(`Path param ${key} must be a string, number, or boolean`);
    }
    return encodeURIComponent(String(value));
  });

  const url = new URL(path.startsWith('/') ? path.slice(1) : path, baseUrl);

  if (query) {
    url.search = objectToURLSearchParams(
      transformKeys(query, serializeKey),
    ).toString();
  }

  return url.toString();
}
