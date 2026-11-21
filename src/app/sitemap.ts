import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'
import {
  defaultEducationCategories,
  defaultTrainingCategories,
} from '@/data/defaults/programmes/catalog'
import { defaultServicesCatalog } from '@/data/defaults/services-catalog'
import { getSiteUrl } from '@/lib/seo/site'
import {
  getSiteResourcePersons,
  RESOURCE_PERSONS_PATH,
  resourcePersonPath,
} from '@/lib/queries/resource-persons'

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
  ...defaultEducationCategories.map((category) => `/courses/education/${category.slug}`),
  ...defaultTrainingCategories.map((category) => `/courses/training/${category.slug}`),
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
    const [services, events, articles, categories, resourcePersons] = await Promise.all([
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
      payload.find({
        collection: 'programmeCategories',
        limit: 1000,
        depth: 0,
        overrideAccess: false,
      }),
      getSiteResourcePersons(),
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

    const staticUrls = new Set(staticEntries.map(({ url }) => url))
    const programmeCategoryEntries: MetadataRoute.Sitemap = categories.docs
      .filter(
        (category) =>
          typeof category.slug === 'string' &&
          category.slug &&
          !staticUrls.has(`${origin}/courses/${category.kind}/${category.slug}`),
      )
      .map((category) => ({
        url: `${origin}/courses/${category.kind}/${category.slug}`,
        lastModified: category.updatedAt ? new Date(category.updatedAt) : now,
        changeFrequency: 'monthly',
        priority: 0.6,
      }))

    // One crawlable URL per published CMS resource person (opens their modal on /courses).
    const resourcePersonEntries: MetadataRoute.Sitemap = resourcePersons.fromCms
      ? [
          {
            url: `${origin}${RESOURCE_PERSONS_PATH}`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.6,
          },
          ...resourcePersons.people
            .filter((person): person is typeof person & { slug: string } => Boolean(person.slug))
            .map((person) => ({
              url: `${origin}${resourcePersonPath(person.slug)}`,
              lastModified: now,
              changeFrequency: 'monthly' as const,
              priority: 0.5,
            })),
        ]
      : []

    return [
      ...staticEntries,
      ...serviceEntries,
      ...eventEntries,
      ...articleEntries,
      ...programmeCategoryEntries,
      ...resourcePersonEntries,
    ]
  } catch {
    const fallbackServices: MetadataRoute.Sitemap = defaultServicesCatalog.map((service) => ({
      url: `${origin}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))
    return [...staticEntries, ...fallbackServices]
  }
}
