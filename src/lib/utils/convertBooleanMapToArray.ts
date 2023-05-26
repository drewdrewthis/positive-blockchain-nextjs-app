/**
 * Converts a boolean map to an array of keys where the corresponding values are true.
 * @param map - The boolean map to convert.
 * @returns An array of keys where the corresponding values are true.
 */
export function convertBooleanMapToArray(
  map: Record<string, boolean>
): string[] {
  return Object.values(map).reduce((acc, value, index) => {
    if (value) {
      acc.push(Object.keys(map)[index]);
    }
    return acc;
  }, [] as string[]);
}
