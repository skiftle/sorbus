import type { Dict } from '../types';

import { isPlainObject } from './is-plain-object';

export function transformKeys(
  obj: Dict,
  callback: (key: string) => string,
): Dict {
  return Object.entries(obj).reduce<Dict>((result, [key, value]) => {
    const newKey = callback(key);
    const typed: unknown = value;
    if (isPlainObject(typed)) {
      result[newKey] = transformKeys(typed, callback);
    } else if (Array.isArray(typed)) {
      result[newKey] = typed.map((item: unknown) =>
        isPlainObject(item) ? transformKeys(item, callback) : item,
      );
    } else {
      result[newKey] = typed;
    }
    return result;
  }, {});
}
