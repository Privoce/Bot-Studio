export function selectByIds<T = any>(
  ids: string[],
  entities: { [key: string]: T | undefined }
): T[] {
  const arr: T[] = [];
  for (let i = 0, len = ids.length; i < len; i++) {
    const item = entities[ids[i]];
    if (item) arr.push(item);
  }
  return arr;
}
