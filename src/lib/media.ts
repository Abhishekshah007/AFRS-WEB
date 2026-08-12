import type { Media } from '@/payload-types'

export type MediaRef = number | Media | null | undefined

export function isPopulatedMedia(media: MediaRef): media is Media {
  return Boolean(media && typeof media === 'object' && 'url' in media && media.url)
}

export function toMediaId(media: MediaRef): number | undefined {
  if (typeof media === 'number') return media
  if (isPopulatedMedia(media) && typeof media.id === 'number') return media.id
  return undefined
}

export function normalizePaginatedDocs<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[]
  if (value && typeof value === 'object' && 'docs' in value) {
    const docs = (value as { docs?: unknown }).docs
    return Array.isArray(docs) ? (docs as T[]) : []
  }
  return []
}
