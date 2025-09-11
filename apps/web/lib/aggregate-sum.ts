export function aggregateSum<T extends Record<string, unknown>>(
  array: T[],
  key: keyof T,
): number {
  return array.reduce((acc, obj) => {
    const value = obj[key];
    return acc + (typeof value === "number" ? value : 0);
  }, 0);
}
