/** Lowercase URL-safe slug for event pages and form field keys. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

/** camelCase key for storing dynamic form answers (no spaces, editor-friendly). */
export function fieldKeyFromLabel(label: string, index = 0): string {
  const words = label
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  if (!words.length) return `field${index + 1}`

  const camel = words
    .map((word, i) => (i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join('')

  return camel.slice(0, 48)
}
