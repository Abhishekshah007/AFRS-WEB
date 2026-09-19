import type { CollectionBeforeValidateHook, PayloadRequest } from 'payload'

import { slugify } from '@/lib/utils/slugify'

export function isBrokenSlug(value: unknown): boolean {
  const slug = String(value ?? '').trim()
  if (!slug) return true
  if (/^-+$/.test(slug)) return true
  if (slug.length < 3) return true
  return false
}

async function ensureUniqueEventSlug(
  req: PayloadRequest | undefined,
  baseSlug: string,
  currentId?: string | number,
): Promise<string> {
  const candidate = baseSlug || `event-${Date.now().toString(36)}`
  if (!req?.payload) return candidate

  for (let attempt = 0; attempt < 20; attempt += 1) {
    const slug = attempt === 0 ? candidate : `${candidate}-${attempt + 1}`
    const existing = await req.payload.find({
      collection: 'events',
      where: {
        and: [
          { slug: { equals: slug } },
          ...(currentId != null ? [{ id: { not_equals: currentId } }] : []),
        ],
      },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })

    if (existing.docs.length === 0) return slug
  }

  return `${candidate}-${Date.now().toString(36)}`
}

/**
 * Generate a URL slug from the title before Payload validates the document.
 * The slug field is hidden, so the admin form often submits it empty —
 * generating in beforeChange is too late and Save fails with "Slug is invalid".
 */
export const autoSlugFromTitle: CollectionBeforeValidateHook = async ({
  data,
  originalDoc,
  operation,
  req,
}) => {
  if (!data) return data

  const title = String(data.title ?? originalDoc?.title ?? '').trim()
  if (!title) return data

  const incomingSlug = String(data.slug ?? '').trim()
  const storedSlug = String(originalDoc?.slug ?? '').trim()
  const currentSlug = incomingSlug || storedSlug

  if (operation !== 'create' && !isBrokenSlug(currentSlug)) {
    return data
  }

  const generated = slugify(title) || `event-${Date.now().toString(36)}`
  data.slug = await ensureUniqueEventSlug(
    req,
    generated,
    originalDoc?.id as string | number | undefined,
  )

  return data
}
