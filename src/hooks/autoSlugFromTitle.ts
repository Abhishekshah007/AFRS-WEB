import type { CollectionBeforeValidateHook } from 'payload'

import { slugify } from '@/lib/utils/slugify'

function isBrokenSlug(value: unknown): boolean {
  const slug = String(value || '').trim()
  return !slug || /^-+$/.test(slug)
}

/** Auto-fill the slug from `title` when empty or invalid (e.g. "----"). */
export const autoSlugFromTitle: CollectionBeforeValidateHook = ({ data }) => {
  if (!data) return data

  const title = String(data.title || '').trim()
  if (!title) return data

  if (isBrokenSlug(data.slug)) {
    data.slug = slugify(title)
  }

  return data
}
