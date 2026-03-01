import type { Dict } from '../types';

export function objectToURLSearchParams(obj: Dict): URLSearchParams {
  const params = new URLSearchParams();

  function addParams(key: string, value: unknown): void {
    if (value === undefined || value === null) {
      return;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        if (typeof item === 'object' && item !== null) {
          addParams(`${key}[]`, item);
        } else {
          params.append(`${key}[]`, String(item));
        }
      }
    } else if (typeof value === 'object') {
      if (value instanceof Date) {
        params.append(key, value.toISOString());
      } else {
        const record = value as Dict;
        for (const [subKey, subValue] of Object.entries(record)) {
          addParams(`${key}[${subKey}]`, subValue);
        }
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
