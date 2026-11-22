import type { Metadata } from 'next'
import { cache } from 'react'

import { resolveMediaUrlOptional, richTextToPlain } from '@/lib/cms'
import { getPayloadClient } from '@/lib/payload'
import { buildPageMetadata, optimizePosterSocialImage } from '@/lib/seo/metadata'
import { clipMeta } from '@/lib/seo/site'
import type { Event as AfrsEvent, Media } from '@/payload-types'

/** One query per request for an event page and its metadata (React cache dedupes). */
export const findPublishedEventBySlug = cache(async (slug: string) => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'events',
    where: { slug: { equals: slug }, published: { equals: true } },
    limit: 1,
    depth: 1,
    overrideAccess: false,
  })
  return (result.docs[0] as AfrsEvent | undefined) ?? null
})

/**
 * Share/SEO metadata for an event URL. Used by both the event page and its /register
 * page, so a shared registration link shows the event poster and title (WhatsApp,
 * Facebook, LinkedIn) instead of the site-wide AFRS logo.
 */
export function eventShareMetadata(
  evt: AfrsEvent,
  { path, titlePrefix, index = true }: { path: string; titlePrefix?: string; index?: boolean },
): Metadata {
  const banner = resolveMediaUrlOptional(evt.banner as number | Media | null | undefined)
  return buildPageMetadata({
    title: titlePrefix ? `${titlePrefix}${evt.title}` : evt.title,
    description: clipMeta(evt.excerpt || richTextToPlain(evt.description, 160) || evt.title, 160),
    path,
    image: banner ? optimizePosterSocialImage(banner) : undefined,
    index,
  })
}
