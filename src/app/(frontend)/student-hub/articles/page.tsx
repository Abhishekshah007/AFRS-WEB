import { ArticlesPageView } from '@/components/student-hub/articles/ArticlesPageView'
import { defaultArticles, defaultFeatured } from '@/components/student-hub/articles/content'
import { mapArticle, mapFeaturedArticle } from '@/components/student-hub/articles/mapArticle'
import { getPayloadClient } from '@/lib/payload'
import { unstable_cache } from 'next/cache'
import { SITE_CACHE_TAGS } from '@/lib/cache/siteCacheTags'
import type { Article } from '@/payload-types'
import { buildPageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'
import type { Where } from 'payload'
import { buildArticleSearchOrClause } from '@/lib/queries/search'
import { getArticleFilterTopics } from '@/lib/queries/taxonomies'

export const metadata: Metadata = buildPageMetadata({
  title: 'Forensic Insights & Articles',
  description:
    'Articles and expert insights on forensic science disciplines, methods and professional practice for students and practitioners.',
  path: '/student-hub/articles',
})

const PAGE_SIZE = 8

/** Cards never show the article body; skipping it keeps queries and the cache small. */
const LISTING_SELECT = { content: false, pullQuote: false, authorBio: false } as const

/**
 * Database reads for the listing, cached per (topic, search, page) and refreshed when an
 * article or category is saved. This page renders per request (it reads ?topic/?q/?page),
 * so without the cache every visit — including bots — re-ran four queries.
 */
const loadArticlesListing = unstable_cache(
  async (activeTopic: string, q: string, currentPage: number) => {
    const payload = await getPayloadClient()

    const andClauses: Where[] = [{ published: { equals: true } }]

    if (activeTopic !== 'all') {
      andClauses.push({ 'category.slug': { equals: activeTopic } })
    }

    if (q) {
      andClauses.push(buildArticleSearchOrClause(q))
    }

    const where: Where = { and: andClauses }

    return Promise.all([
      payload.find({
        collection: 'articles',
        where: { and: [{ published: { equals: true } }, { featured: { equals: true } }] },
        limit: 1,
        depth: 1,
        select: LISTING_SELECT,
        overrideAccess: false,
      }),
      payload.find({
        collection: 'articles',
        where,
        sort: '-publishedDate',
        limit: PAGE_SIZE,
        page: currentPage,
        depth: 1,
        select: LISTING_SELECT,
        overrideAccess: false,
      }),
      // Count only — this used to be a find with limit 0, which loads every article in full.
      payload.count({
        collection: 'articles',
        where: { published: { equals: true } },
        overrideAccess: false,
      }),
      getArticleFilterTopics(),
    ])
  },
  ['articles-listing-v1'],
  { tags: [SITE_CACHE_TAGS.articles], revalidate: 3600 },
)

type Props = {
  searchParams: Promise<{ q?: string; topic?: string; page?: string }>
}

export default async function StudentHubArticlesPage({ searchParams }: Props) {
  const { q, topic, page: pageParam } = await searchParams
  const currentPage = Math.max(1, Number(pageParam) || 1)
  const activeTopic = topic ?? 'all'

  const [featuredResult, listResult, countResult, topics] = await loadArticlesListing(
    activeTopic,
    q?.trim() ?? '',
    currentPage,
  )

  const cmsFeatured = featuredResult.docs[0] as Article | undefined
  const cmsArticles = listResult.docs as Article[]

  const featured = cmsFeatured ? mapFeaturedArticle(cmsFeatured) : defaultFeatured
  const articles =
    cmsArticles.length > 0
      ? cmsArticles.map(mapArticle)
      : defaultArticles.filter((a) => {
          if (activeTopic !== 'all' && a.category !== activeTopic) return false
          if (q?.trim()) {
            const needle = q.trim().toLowerCase()
            return (
              a.title.toLowerCase().includes(needle) ||
              a.excerpt.toLowerCase().includes(needle) ||
              a.authorName.toLowerCase().includes(needle)
            )
          }
          return true
        })

  // Real number of published articles (previously showed an invented 1240 when 0).
  const totalDocs = countResult.totalDocs
  const totalPages =
    cmsArticles.length > 0
      ? listResult.totalPages
      : Math.max(1, Math.ceil(articles.length / PAGE_SIZE))

  const paginatedArticles =
    cmsArticles.length > 0
      ? articles
      : articles.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  return (
    <ArticlesPageView
      featured={featured}
      articles={paginatedArticles}
      currentPage={currentPage}
      totalPages={totalPages}
      totalPublished={totalDocs}
      activeTopic={activeTopic}
      initialQuery={q}
      searchParams={{ q, topic: activeTopic, page: pageParam }}
      topicFilters={[
        { id: 'all', label: 'All Topics', value: 'all' },
        ...topics.map((topic) => ({ id: topic.slug, label: topic.label, value: topic.slug })),
      ]}
    />
  )
}
