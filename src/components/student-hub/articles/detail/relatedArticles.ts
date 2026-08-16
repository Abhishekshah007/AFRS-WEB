import type { Article } from '@/payload-types'
import type { RelatedArticlePreview } from '@/components/student-hub/articles/detail/types'
import { mapArticle } from '@/components/student-hub/articles/mapArticle'

const RELATED_LIMIT = 3

export function mergeRelatedArticles(
  sameDomain: Article[],
  recent: Article[],
  currentSlug: string,
  limit = RELATED_LIMIT,
): RelatedArticlePreview[] {
  const seen = new Set<string>([currentSlug])
  const merged: Article[] = []

  for (const doc of [...sameDomain, ...recent]) {
    if (!doc?.slug || seen.has(doc.slug)) continue
    seen.add(doc.slug)
    merged.push(doc)
    if (merged.length >= limit) break
  }

  return merged.map((article) => ({
    ...mapArticle(article),
    tagLabel: article.category === 'general' ? 'CASE STUDY' : undefined,
  }))
}
