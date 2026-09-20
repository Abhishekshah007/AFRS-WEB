import { getPayloadClient } from '@/lib/payload'
import { logCmsError } from '@/lib/resilience/logger'
import type { Article, Event as AfrsEvent, Service } from '@/payload-types'
import type { Where } from 'payload'

const MIN_QUERY_LENGTH = 2

export function normalizeSearchQuery(query: string | null | undefined): string {
  return (query ?? '').trim()
}

export function isSearchQueryValid(query: string): boolean {
  return query.length >= MIN_QUERY_LENGTH
}

/** OR clause for matching article title, author, excerpt, or rich-text body. */
export function buildArticleSearchOrClause(query: string): Where {
  const term = query.trim()

  return {
    or: [
      { title: { contains: term } },
      { authorName: { contains: term } },
      { excerpt: { contains: term } },
      { content: { contains: term } },
    ],
  }
}

/** Published articles matching title, author, excerpt, or rich-text body. */
export function buildArticleSearchWhere(query: string): Where {
  return {
    and: [{ published: { equals: true } }, buildArticleSearchOrClause(query)],
  }
}

function buildEventSearchWhere(query: string): Where {
  return {
    and: [{ published: { equals: true } }, { title: { contains: query.trim() } }],
  }
}

function buildServiceSearchWhere(query: string): Where {
  return {
    and: [{ published: { equals: true } }, { title: { contains: query.trim() } }],
  }
}

export type SiteSearchResults = {
  articles: Article[]
  events: AfrsEvent[]
  services: Service[]
}

export async function searchSiteContent(query: string, limits?: {
  articles?: number
  events?: number
  services?: number
}): Promise<SiteSearchResults> {
  const empty: SiteSearchResults = { articles: [], events: [], services: [] }

  if (!isSearchQueryValid(query)) {
    return empty
  }

  const articleLimit = limits?.articles ?? 8
  const eventLimit = limits?.events ?? 5
  const serviceLimit = limits?.services ?? 5

  try {
    const payload = await getPayloadClient()
    const [articlesResult, eventsResult, servicesResult] = await Promise.all([
      payload.find({
        collection: 'articles',
        where: buildArticleSearchWhere(query),
        sort: '-publishedDate',
        limit: articleLimit,
        depth: 0,
        overrideAccess: false,
      }),
      payload.find({
        collection: 'events',
        where: buildEventSearchWhere(query),
        limit: eventLimit,
        depth: 0,
        overrideAccess: false,
      }),
      payload.find({
        collection: 'services',
        where: buildServiceSearchWhere(query),
        limit: serviceLimit,
        depth: 0,
        overrideAccess: false,
      }),
    ])

    return {
      articles: articlesResult.docs as Article[],
      events: eventsResult.docs as AfrsEvent[],
      services: servicesResult.docs as Service[],
    }
  } catch (error) {
    logCmsError('searchSiteContent', error, { query })
    return empty
  }
}
