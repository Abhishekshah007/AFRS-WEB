import {
  CMS_ARTICLE_CATEGORY_OPTIONS,
  GENERAL_ARTICLE_CATEGORY,
} from '@/data/article-categories'
import { DEFAULT_EVENT_TYPES } from '@/data/event-types'
import type { ArticleCategory, EventType } from '@/payload-types'

/**
 * Client-safe helpers that turn an Article `category` / Event `eventType` relationship
 * value (populated doc, bare id, or legacy slug string) into display data.
 */

export type ArticleCategoryInfo = { slug: string; label: string }
export type EventTypeInfo = { slug: string; label: string; badgeLabel: string }

function titleCase(slug: string): string {
  return slug
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export function defaultArticleCategoryLabel(slug: string): string {
  return CMS_ARTICLE_CATEGORY_OPTIONS.find((option) => option.value === slug)?.label ?? titleCase(slug)
}

export function resolveArticleCategory(
  value: number | string | ArticleCategory | null | undefined,
): ArticleCategoryInfo {
  if (value && typeof value === 'object') {
    return { slug: value.slug, label: value.label }
  }
  if (typeof value === 'string' && value.trim()) {
    return { slug: value, label: defaultArticleCategoryLabel(value) }
  }
  return { slug: GENERAL_ARTICLE_CATEGORY.value, label: GENERAL_ARTICLE_CATEGORY.label }
}

export function resolveEventType(
  value: number | string | EventType | null | undefined,
): EventTypeInfo | null {
  if (value && typeof value === 'object') {
    return {
      slug: value.slug,
      label: value.label,
      badgeLabel: value.shortLabel?.trim() || value.label,
    }
  }
  if (typeof value === 'string' && value.trim()) {
    const known = DEFAULT_EVENT_TYPES.find((type) => type.slug === value)
    const label = known?.label ?? titleCase(value)
    const shortLabel = known && 'shortLabel' in known ? known.shortLabel : undefined
    return { slug: value, label, badgeLabel: shortLabel ?? label }
  }
  return null
}
