import { ArticlesPageView } from '@/components/student-hub/articles/ArticlesPageView'
import { defaultArticles, defaultFeatured } from '@/components/student-hub/articles/content'
import { mapArticle, mapFeaturedArticle } from '@/components/student-hub/articles/mapArticle'
import { getPayloadClient } from '@/lib/payload'
import type { Article } from '@/payload-types'
import type { Metadata } from 'next'
import type { Where } from 'payload'

export const metadata: Metadata = {
  title: 'Forensic Insights & Articles',
  description:
    'Curated forensic science articles, research summaries, and expert insights for AFRS students and professionals.',
}

const PAGE_SIZE = 8

type Props = {
  searchParams: Promise<{ q?: string; topic?: string; page?: string }>
}

export default async function StudentHubArticlesPage({ searchParams }: Props) {
  const { q, topic, page: pageParam } = await searchParams
  const currentPage = Math.max(1, Number(pageParam) || 1)
  const activeTopic = topic ?? 'all'

  const payload = await getPayloadClient()

  const andClauses: Where[] = [{ published: { equals: true } }]

  if (activeTopic && activeTopic !== 'all') {
    andClauses.push({ category: { equals: activeTopic } })
  }

  if (q?.trim()) {
    andClauses.push({
      or: [{ title: { contains: q.trim() } }, { excerpt: { contains: q.trim() } }, { authorName: { contains: q.trim() } }],
    })
  }

  const where: Where = { and: andClauses }

  const [featuredResult, listResult, countResult] = await Promise.all([
    payload.find({
      collection: 'articles',
      where: { and: [{ published: { equals: true } }, { featured: { equals: true } }] },
      limit: 1,
      depth: 1,
      overrideAccess: false,
    }),
    payload.find({
      collection: 'articles',
      where,
      sort: '-publishedDate',
      limit: PAGE_SIZE,
      page: currentPage,
      depth: 1,
      overrideAccess: false,
    }),
    payload.find({
      collection: 'articles',
      where: { published: { equals: true } },
      limit: 0,
      overrideAccess: false,
    }),
  ])

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

  const totalDocs = countResult.totalDocs > 0 ? countResult.totalDocs : 1240
  const totalPages = cmsArticles.length > 0 ? listResult.totalPages : Math.max(1, Math.ceil(articles.length / PAGE_SIZE))

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
    />
  )
}
