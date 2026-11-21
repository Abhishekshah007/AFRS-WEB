import type { Article } from '@/payload-types'
import type { ArticleListItem, FeaturedArticle } from '@/components/student-hub/articles/types'
import { resolveArticleCategory } from '@/lib/taxonomy'
import { resolveMediaUrlOptional } from '@/lib/cms'
import { articleGeneratedImagePath } from '@/lib/seo/metadata'
import type { Media } from '@/payload-types'

/** URL of the editor-uploaded cover image, if any (no generated fallback). */
export function resolveArticleCoverUrl(
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
  const category = resolveArticleCategory(doc.category)
  return {
    id: String(doc.id),
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    category: category.slug,
    categoryLabel: category.label,
    authorName: doc.authorName,
    readTimeMinutes: doc.readTimeMinutes ?? 10,
    // Until an editor uploads a cover, show the same generated image used for share previews.
    coverUrl:
      resolveArticleCoverUrl(doc.coverImage) ??
      articleGeneratedImagePath(doc.title, category.slug, category.label),
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
