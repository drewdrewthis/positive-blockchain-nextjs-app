export function covertBooleanMapToArray(map: Record<string, boolean>) {
  return Object.values(map).reduce((acc, value, index) => {
    if (value) {
      acc.push(Object.keys(map)[index]);
    }
    return acc;
  }, [] as string[]);
}
