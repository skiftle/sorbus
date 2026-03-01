import type { Dict } from '../types';

import { objectToURLSearchParams } from './objectToURLSearchParams';
import { transformKeys } from './transformKeys';

export function buildUrl(
  endpointPath: string,
  pathParams: Dict | undefined,
  query: Dict | undefined,
  baseUrl: string,
  serializeKey: (key: string) => string,
): string {
  let path = endpointPath;

  if (pathParams) {
    path = path.replace(/:([^/]+)/g, (_match, key: string) =>
      encodeURIComponent(String(pathParams[key])),
    );
  }

  const url = new URL(path.startsWith('/') ? path.slice(1) : path, baseUrl);

  if (query) {
    url.search = objectToURLSearchParams(
      transformKeys(query, serializeKey),
    ).toString();
  }

  return url.toString();
}
