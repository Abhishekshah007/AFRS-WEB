import type { ArticleCategory } from '@/components/student-hub/articles/types'
import {
  ARTICLE_CATEGORY_OPTIONS,
  CMS_ARTICLE_CATEGORY_OPTIONS,
} from '@/data/article-categories'

export const categoryLabels: Record<ArticleCategory, string> = Object.fromEntries(
  CMS_ARTICLE_CATEGORY_OPTIONS.map((option) => [option.value, option.label]),
) as Record<ArticleCategory, string>

const TAG_PALETTE = [
  'bg-brand-50 text-brand-700',
  'bg-brand-100 text-brand-600',
  'bg-brand-200/50 text-brand-700',
  'bg-brand-50 text-brand-500',
  'bg-brand-100 text-brand-700',
  'bg-brand-200/40 text-brand-600',
  'bg-brand-50 text-brand-700',
  'bg-brand-100 text-brand-500',
  'bg-brand-200/60 text-brand-700',
  'bg-slate-100 text-slate-700',
]

export const categoryTagStyles: Record<ArticleCategory, string> = Object.fromEntries(
  CMS_ARTICLE_CATEGORY_OPTIONS.map((option, index) => [
    option.value,
    TAG_PALETTE[index % TAG_PALETTE.length],
  ]),
) as Record<ArticleCategory, string>

export function getCategoryLabel(category: string): string {
  if (category in categoryLabels) return categoryLabels[category as ArticleCategory]
  return ARTICLE_CATEGORY_OPTIONS.find((option) => option.value === category)?.label ?? category
}

export function getCategoryTagClass(category: string): string {
  if (category in categoryTagStyles) return categoryTagStyles[category as ArticleCategory]
  return categoryTagStyles.general
}
