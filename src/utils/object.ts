/**
 * Remove key requested by object
 *
 * @param obj
 * @param keysToRemove
 * @returns object
 */
export function removeKeys<T extends Record<string, any>>(
  obj: T,
  keysToRemove: (keyof T)[],
): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([key]) => !keysToRemove.includes(key as keyof T),
    ),
  ) as Partial<T>;
}

/**
 * Get key requested by object
 *
 * @param obj
 * @param keysToGet
 * @returns object
 */
export function getKeys<T extends Record<string, any>>(
  obj: T,
  keysToGet: (keyof T)[],
): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => keysToGet.includes(key as keyof T)),
  ) as Partial<T>;
}
