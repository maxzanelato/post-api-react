export function formatPostId(id: number): string {
  return `#${String(id).padStart(3, '0')}`;
}

export function truncateText(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).trimEnd()}…`;
}