const PLACEHOLDER_VALUES = new Set([
  '...',
  'xxx',
  'changeme',
  'todo',
  'tbd',
  'your-site-key',
  'your_site_key',
  'your-turnstile-site-key',
])

/** Cloudflare Turnstile keys are long alphanumeric strings (test keys included). */
const TURNSTILE_KEY_PATTERN = /^[0-9a-zA-Z_-]{20,}$/

function isPlaceholder(value: string): boolean {
  const normalized = value.trim().toLowerCase()
  if (!normalized) return true
  if (PLACEHOLDER_VALUES.has(normalized)) return true
  if (/^\.+$/.test(normalized)) return true
  if (/^(your|replace|insert|add)[-_ ]/.test(normalized)) return true
  if (normalized.includes('<') && normalized.includes('>')) return true
  return false
}

function isValidTurnstileKey(value: string | undefined): value is string {
  if (!value?.trim()) return false
  const trimmed = value.trim()
  if (isPlaceholder(trimmed)) return false
  return TURNSTILE_KEY_PATTERN.test(trimmed)
}

export function getTurnstileSiteKey(): string | null {
  const value = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  return isValidTurnstileKey(value) ? value.trim() : null
}

export function getTurnstileSecretKey(): string | null {
  const value = process.env.TURNSTILE_SECRET_KEY
  return isValidTurnstileKey(value) ? value.trim() : null
}

export function isTurnstileConfiguredClient(): boolean {
  return Boolean(getTurnstileSiteKey())
}

export function isTurnstileConfiguredServer(): boolean {
  return Boolean(getTurnstileSiteKey() && getTurnstileSecretKey())
}
