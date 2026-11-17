export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function isValidDisplayName(value: string): boolean {
  const normalized = value.trim();
  return normalized.length >= 2 && normalized.length <= 80;
}

export function isValidPassword(value: string): boolean {
  return value.length >= 8 && /[a-z]/.test(value) && /[A-Z]/.test(value) && /\d/.test(value) && !/\s/.test(value);
}
