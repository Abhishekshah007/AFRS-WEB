/**
 * Production origin used for canonicals, sitemap, Open Graph, and JSON-LD.
 * Set NEXT_PUBLIC_SITE_URL in every deployed environment (no trailing slash).
 */
export const DEFAULT_SITE_URL = 'https://www.appliedforensicresearchsciences.in'
export const BRAND_SHORT = 'AFRS'
export const BRAND_LEGAL = 'Applied Forensic Research Sciences Institute'
export const AFSL_NAME = 'Applied Forensic Science Laboratory'
export const DEFAULT_OG_IMAGE = '/assets/logo.png'

export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    DEFAULT_SITE_URL
  return raw.replace(/\/+$/, '')
}

export function absoluteUrl(path = '/'): string {
  const origin = getSiteUrl()
  if (!path || path === '/') return `${origin}/`
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${origin}${normalized}`
}

export function clipMeta(text: string, max: number): string {
  const cleaned = text.replace(/\s+/g, ' ').trim()
  if (cleaned.length <= max) return cleaned
  return `${cleaned.slice(0, max - 1).trimEnd()}…`
}
