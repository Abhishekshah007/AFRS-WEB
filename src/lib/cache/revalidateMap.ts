import { SITE_CACHE_TAGS, type SiteCacheTag } from '@/lib/cache/siteCacheTags'

export type RevalidatePlan = {
  paths: string[]
  tags: SiteCacheTag[]
  /** When true, invalidates the shared frontend layout (header, footer, nav). */
  layout?: boolean
}

const LAYOUT_PATH = '/'

function plan(paths: string[], tags: SiteCacheTag[], layout = false): RevalidatePlan {
  return { paths, tags, layout }
}

function serviceDetailPath(slug: unknown): string | undefined {
  return typeof slug === 'string' && slug.trim() ? `/services/${slug.trim()}` : undefined
}

function eventDetailPath(slug: unknown): string | undefined {
  return typeof slug === 'string' && slug.trim() ? `/events/${slug.trim()}` : undefined
}

function articleDetailPath(slug: unknown): string | undefined {
  return typeof slug === 'string' && slug.trim()
    ? `/student-hub/articles/${slug.trim()}`
    : undefined
}

/** Paths and cache tags to refresh when a collection document changes. */
export function revalidatePlanForCollection(
  slug: string,
  doc?: Record<string, unknown> | null,
): RevalidatePlan | null {
  switch (slug) {
    case 'notices':
      return plan(['/', '/notices'], [SITE_CACHE_TAGS.home, SITE_CACHE_TAGS.notices])
    case 'services': {
      const paths = ['/services']
      const detail = serviceDetailPath(doc?.slug)
      if (detail) paths.push(detail)
      return plan(paths, [SITE_CACHE_TAGS.services, SITE_CACHE_TAGS.search])
    }
    case 'scientists':
      return plan(['/', '/services'], [SITE_CACHE_TAGS.home, SITE_CACHE_TAGS.services])
    case 'testimonials':
      return plan(['/', '/services'], [SITE_CACHE_TAGS.home, SITE_CACHE_TAGS.services])
    case 'events': {
      const paths = ['/events', '/courses/events', '/']
      const detail = eventDetailPath(doc?.slug)
      if (detail) paths.push(detail)
      return plan(paths, [SITE_CACHE_TAGS.events, SITE_CACHE_TAGS.home, SITE_CACHE_TAGS.courses])
    }
    case 'articles': {
      const paths = ['/student-hub/articles', '/articles']
      const detail = articleDetailPath(doc?.slug)
      if (detail) paths.push(detail)
      return plan(paths, [SITE_CACHE_TAGS.articles, SITE_CACHE_TAGS.studentHub, SITE_CACHE_TAGS.search])
    }
    case 'galleryItems':
      return plan(['/gallery', '/services'], [SITE_CACHE_TAGS.gallery, SITE_CACHE_TAGS.services])
    case 'impactStats':
    case 'partnersLogo':
    case 'sitePopups':
      return plan(['/'], [SITE_CACHE_TAGS.home])
    case 'aboutCertifications':
    case 'founders':
      return plan(['/about'], [SITE_CACHE_TAGS.about])
    case 'resourcePersons':
      return plan(
        ['/courses', '/courses/education', '/courses/training'],
        [SITE_CACHE_TAGS.courses],
      )
    case 'media':
      return plan(
        ['/', '/services', '/about', '/gallery'],
        [SITE_CACHE_TAGS.all, SITE_CACHE_TAGS.layout],
        true,
      )
    default:
      return null
  }
}

/** Paths and cache tags to refresh when a global is saved. */
export function revalidatePlanForGlobal(slug: string): RevalidatePlan | null {
  switch (slug) {
    case 'homePage':
      return plan(['/'], [SITE_CACHE_TAGS.home])
    case 'aboutPage':
      return plan(['/about'], [SITE_CACHE_TAGS.about])
    case 'servicesPage':
      return plan(['/services'], [SITE_CACHE_TAGS.services])
    case 'siteSettings':
    case 'headerSettings':
    case 'footerSettings':
      return plan([LAYOUT_PATH], [SITE_CACHE_TAGS.layout], true)
    case 'programmesCatalog':
    case 'registrationForm':
      return plan(
        ['/courses', '/courses/education', '/courses/training', '/courses/register'],
        [SITE_CACHE_TAGS.courses],
      )
    case 'studentHubContent':
      return plan(
        ['/student-hub', '/student-hub/ugc-net', '/student-hub/cuet', '/student-hub/career-guidance', '/student-hub/fact'],
        [SITE_CACHE_TAGS.studentHub],
      )
    default:
      return null
  }
}
