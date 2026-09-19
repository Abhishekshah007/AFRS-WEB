import type { Article } from '@/payload-types'
import type { ArticleListItem, FeaturedArticle } from '@/components/student-hub/articles/types'
import { getCategoryLabel } from '@/components/student-hub/articles/categoryStyles'
import { resolveMediaUrlOptional } from '@/lib/cms'
import type { Media } from '@/payload-types'

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
    coverUrl: resolveMediaUrlOptional(doc.coverImage as number | Media | null | undefined),
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
