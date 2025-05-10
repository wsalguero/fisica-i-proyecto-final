export function isNullOrEmpty(value: string | null): boolean {
  if (value === null || value === undefined || value === "") {
    return true;
  }

  return false;
}
