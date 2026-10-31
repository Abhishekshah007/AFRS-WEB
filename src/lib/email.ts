const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function normalizeEmail(value: string | null | undefined): string {
  return value?.trim().toLowerCase() || ''
}

export function isValidEmail(value: string | null | undefined): boolean {
  return EMAIL_RE.test(normalizeEmail(value))
}
