import type { Article } from '@/payload-types'
import type { ArticleListItem, FeaturedArticle } from '@/components/student-hub/articles/types'
import { getCategoryLabel } from '@/components/student-hub/articles/categoryStyles'
import { resolveMediaUrlOptional } from '@/lib/cms'
import type { Media } from '@/payload-types'

function resolveArticleCoverUrl(
  media: number | Media | null | undefined,
): string | undefined {
  const url = resolveMediaUrlOptional(media)
  if (url) return url
  if (typeof media !== 'object' || media === null) return undefined

  if (media.thumbnailURL) return media.thumbnailURL
  if (media.filename) return `/api/media/file/${encodeURIComponent(media.filename)}`

  return undefined
}

export function mapArticle(doc: Article): ArticleListItem {
  const category = (doc.category ?? 'general') as ArticleListItem['category']
  return {
    id: String(doc.id),
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    category,
    categoryLabel: getCategoryLabel(category),
    authorName: doc.authorName,
    readTimeMinutes: doc.readTimeMinutes ?? 10,
    coverUrl: resolveArticleCoverUrl(doc.coverImage),
    publishedDate: doc.publishedDate ?? undefined,
  }
}

export function mapFeaturedArticle(doc: Article): FeaturedArticle {
  const base = mapArticle(doc)
  const coverUrl = base.coverUrl || undefined

  return {
    ...base,
    coverUrl,
    imageSrc: coverUrl,
    authorTitle: doc.authorTitle ?? undefined,
    authorAvatarUrl: resolveMediaUrlOptional(doc.authorAvatar as number | Media | null | undefined),
  }
}
