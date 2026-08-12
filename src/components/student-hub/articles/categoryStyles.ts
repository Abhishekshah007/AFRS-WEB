import type { ArticleCategory } from '@/components/student-hub/articles/types'
import {
  ARTICLE_CATEGORY_OPTIONS,
  CMS_ARTICLE_CATEGORY_OPTIONS,
} from '@/data/article-categories'

export const categoryLabels: Record<ArticleCategory, string> = Object.fromEntries(
  CMS_ARTICLE_CATEGORY_OPTIONS.map((option) => [option.value, option.label]),
) as Record<ArticleCategory, string>

const TAG_PALETTE = [
  'bg-sky-100 text-sky-700',
  'bg-violet-100 text-violet-700',
  'bg-pink-100 text-pink-700',
  'bg-emerald-100 text-emerald-700',
  'bg-indigo-100 text-indigo-700',
  'bg-teal-100 text-teal-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-cyan-100 text-cyan-700',
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
