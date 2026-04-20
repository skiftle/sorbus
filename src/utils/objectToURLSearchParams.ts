import type { Dict } from '../types';

import { isPlainObject } from './isPlainObject';

export function objectToURLSearchParams(obj: Dict): URLSearchParams {
  const params = new URLSearchParams();

  function addParams(key: string, value: unknown): void {
    if (value === undefined || value === null) {
      return;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        addParams(`${key}[]`, item);
      }
    } else if (value instanceof Date) {
      params.append(key, value.toISOString());
    } else if (isPlainObject(value)) {
      for (const [subKey, subValue] of Object.entries(value)) {
        addParams(`${key}[${subKey}]`, subValue);
      }
    } else {
      params.append(key, String(value as boolean | number | string));
    }
  }

  for (const [key, value] of Object.entries(obj)) {
    addParams(key, value);
  }

  return params;
}
