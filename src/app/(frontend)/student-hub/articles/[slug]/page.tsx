import { notFound } from 'next/navigation'
import { ArticleDetailView } from '@/components/student-hub/articles/detail/ArticleDetailView'
import { buildArticleDetail } from '@/components/student-hub/articles/detail/buildArticleDetail'
import { mergeRelatedArticles } from '@/components/student-hub/articles/detail/relatedArticles'
import { defaultArticles, getDefaultArticleDetail } from '@/components/student-hub/articles/content'
import { mapArticle } from '@/components/student-hub/articles/mapArticle'
import { getPayloadClient } from '@/lib/payload'
import type { Article } from '@/payload-types'
import { articleShareImageUrl, buildPageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbList, withContext } from '@/lib/seo/schema'
import { absoluteUrl, clipMeta } from '@/lib/seo/site'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'articles',
    where: { published: { equals: true } },
    limit: 500,
    depth: 0,
    overrideAccess: false,
  })
  return result.docs
    .filter((doc) => typeof doc.slug === 'string' && doc.slug)
    .map((doc) => ({ slug: doc.slug as string }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: encodedSlug } = await params
  const slug = decodeURIComponent(encodedSlug)
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'articles',
    where: { and: [{ slug: { equals: slug } }, { published: { equals: true } }] },
    limit: 1,
    depth: 1,
    overrideAccess: false,
  })
  const doc = result.docs[0] as Article | undefined
  if (!doc) {
    const article = getDefaultArticleDetail(slug)
    if (!article) return { title: 'Article not found', robots: { index: false, follow: false } }
    return buildPageMetadata({
      title: article.title,
      description: clipMeta(article.excerpt || article.title, 160),
      path: `/student-hub/articles/${article.slug}`,
      image: articleShareImageUrl(article.title, article.category),
      type: 'article',
      publishedTime: article.publishedDate,
      authors: [article.authorName],
    })
  }
  const keywords = [
    ...new Set(
      doc.tags?.map((item) => item.tag?.trim()).filter((tag): tag is string => Boolean(tag)) ?? [],
    ),
  ]
  const coverUrl = mapArticle(doc).coverUrl
  return buildPageMetadata({
    title: doc.title,
    description: clipMeta(doc.excerpt || doc.title, 160),
    path: `/student-hub/articles/${doc.slug}`,
    image: coverUrl ?? articleShareImageUrl(doc.title, doc.category),
    type: 'article',
    publishedTime: doc.publishedDate,
    authors: doc.authorName ? [doc.authorName] : undefined,
    keywords,
  })
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug: encodedSlug } = await params
  const slug = decodeURIComponent(encodedSlug)
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'articles',
    where: { and: [{ slug: { equals: slug } }, { published: { equals: true } }] },
    limit: 1,
    depth: 1,
    overrideAccess: false,
  })

  const doc = result.docs[0] as Article | undefined
  const article = doc ? buildArticleDetail(doc) : getDefaultArticleDetail(slug)
  if (!article) notFound()

  const [sameDomainResult, recentResult] = await Promise.all([
    payload.find({
      collection: 'articles',
      where: {
        and: [
          { published: { equals: true } },
          { slug: { not_equals: slug } },
          { category: { equals: article.category } },
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
      limit: 6,
      depth: 1,
      overrideAccess: false,
    }),
  ])

  const related = mergeRelatedArticles(
    sameDomainResult.docs as Article[],
    recentResult.docs as Article[],
    slug,
  )

  const nextArticle =
    recentResult.docs.length > 0
      ? mapArticle(recentResult.docs[0] as Article)
      : defaultArticles.find((a) => a.slug !== slug) ?? null

  return (
    <>
      <JsonLd
        data={withContext([
          breadcrumbList([
            { name: 'Home', path: '/' },
            { name: 'Student Resources', path: '/student-hub' },
            { name: 'Articles', path: '/student-hub/articles' },
            { name: article.title, path: `/student-hub/articles/${article.slug}` },
          ]),
          {
            '@type': 'Article',
            headline: article.title,
            description: article.excerpt,
            keywords: article.tags.length ? article.tags.join(', ') : undefined,
            datePublished: doc?.publishedDate || undefined,
            author: article.authorName
              ? { '@type': 'Person', name: article.authorName }
              : { '@type': 'Organization', name: 'AFRS' },
            mainEntityOfPage: absoluteUrl(`/student-hub/articles/${article.slug}`),
          },
        ])}
      />
      <ArticleDetailView article={article} related={related} nextArticle={nextArticle} />
    </>
  )
}
