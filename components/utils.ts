export function getSuffix(id: string | null) {
  if (id === null) return '';
  const s = id.split(':');
  if (s.length !== 3) return '';
  // -2023-03-08-16-20-39 = 20 chars
  return s[2].substring(0, s[2].length - 20);
}
