import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { getSiteUrl } from '@/lib/seo/site'

const STATIC_PATHS = [
  '/',
  '/about',
  '/services',
  '/courses',
  '/courses/education',
  '/courses/training',
  '/courses/events',
  '/student-hub',
  '/student-hub/articles',
  '/student-hub/ugc-net',
  '/student-hub/fact',
  '/student-hub/cuet',
  '/student-hub/career-guidance',
  '/events',
  '/contact',
  '/gallery',
  '/notices',
  '/privacy',
  '/terms',
] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = getSiteUrl()
  const now = new Date()
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: path === '/' ? `${origin}/` : `${origin}${path}`,
    lastModified: now,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path.split('/').length <= 2 ? 0.8 : 0.6,
  }))

  try {
    const payload = await getPayloadClient()
    const [services, events, articles] = await Promise.all([
      payload.find({
        collection: 'services',
        where: { published: { equals: true } },
        limit: 500,
        depth: 0,
        overrideAccess: false,
      }),
      payload.find({
        collection: 'events',
        where: { published: { equals: true } },
        limit: 500,
        depth: 0,
        overrideAccess: false,
      }),
      payload.find({
        collection: 'articles',
        where: { published: { equals: true } },
        limit: 1000,
        depth: 0,
        overrideAccess: false,
      }),
    ])

    const serviceEntries: MetadataRoute.Sitemap = services.docs
      .filter((doc) => typeof doc.slug === 'string' && doc.slug)
      .map((doc) => ({
        url: `${origin}/services/${doc.slug}`,
        lastModified: doc.updatedAt ? new Date(doc.updatedAt) : now,
        changeFrequency: 'monthly',
        priority: 0.7,
      }))

    const eventEntries: MetadataRoute.Sitemap = events.docs
      .filter((doc) => typeof doc.slug === 'string' && doc.slug)
      .map((doc) => ({
        url: `${origin}/events/${doc.slug}`,
        lastModified: doc.updatedAt ? new Date(doc.updatedAt) : now,
        changeFrequency: 'weekly',
        priority: 0.7,
      }))

    const articleEntries: MetadataRoute.Sitemap = articles.docs
      .filter((doc) => typeof doc.slug === 'string' && doc.slug)
      .map((doc) => ({
        url: `${origin}/student-hub/articles/${doc.slug}`,
        lastModified: doc.updatedAt
          ? new Date(doc.updatedAt)
          : doc.publishedDate
            ? new Date(doc.publishedDate)
            : now,
        changeFrequency: 'monthly',
        priority: 0.65,
      }))

    return [...staticEntries, ...serviceEntries, ...eventEntries, ...articleEntries]
  } catch {
    return staticEntries
  }
}
