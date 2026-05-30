import { notFound } from 'next/navigation'
import { ArticleDetailView } from '@/components/student-hub/articles/detail/ArticleDetailView'
import { buildArticleDetail } from '@/components/student-hub/articles/detail/buildArticleDetail'
import type { RelatedArticlePreview } from '@/components/student-hub/articles/detail/types'
import { defaultArticles } from '@/components/student-hub/articles/content'
import { mapArticle } from '@/components/student-hub/articles/mapArticle'
import { getPayloadClient } from '@/lib/payload'
import type { Article } from '@/payload-types'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'articles',
    where: { slug: { equals: slug }, published: { equals: true } },
    limit: 1,
    depth: 0,
    overrideAccess: false,
  })
  const doc = result.docs[0] as Article | undefined
  if (!doc) return { title: 'Article not found' }
  return { title: doc.title, description: doc.excerpt }
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'articles',
    where: { slug: { equals: slug }, published: { equals: true } },
    limit: 1,
    depth: 1,
    overrideAccess: false,
  })

  const doc = result.docs[0] as Article | undefined
  if (!doc) notFound()

  const article = buildArticleDetail(doc)

  const [relatedResult, nextResult] = await Promise.all([
    payload.find({
      collection: 'articles',
      where: {
        and: [
          { published: { equals: true } },
          { slug: { not_equals: slug } },
          { category: { equals: doc.category } },
        ],
      },
      sort: '-publishedDate',
      limit: 3,
      depth: 1,
      overrideAccess: false,
    }),
    payload.find({
      collection: 'articles',
      where: {
        and: [{ published: { equals: true } }, { slug: { not_equals: slug } }],
      },
      sort: '-publishedDate',
      limit: 1,
      depth: 0,
      overrideAccess: false,
    }),
  ])

  const related: RelatedArticlePreview[] =
    relatedResult.docs.length > 0
      ? (relatedResult.docs as Article[]).map((a) => ({
          ...mapArticle(a),
          tagLabel: a.category === 'general' ? 'CASE STUDY' : undefined,
        }))
      : defaultArticles
          .filter((a) => a.slug !== slug)
          .slice(0, 3)
          .map((a) => ({ ...a, tagLabel: 'CASE STUDY' }))

  const nextArticle =
    nextResult.docs.length > 0
      ? mapArticle(nextResult.docs[0] as Article)
      : defaultArticles.find((a) => a.slug !== slug) ?? null

  return <ArticleDetailView article={article} related={related} nextArticle={nextArticle} />
}
