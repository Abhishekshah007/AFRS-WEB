import { cache } from 'react'

import { ARTICLE_CATEGORY_OPTIONS } from '@/data/article-categories'
import { DEFAULT_EVENT_TYPES } from '@/data/event-types'
import { getPayloadClient } from '@/lib/payload'
import { logCmsError } from '@/lib/resilience/logger'
import type { EventTypeInfo } from '@/lib/taxonomy'
import type { ArticleCategory, EventType } from '@/payload-types'

export type ArticleTopic = { slug: string; label: string }

/** Topics for the Articles filter bar, in CMS order (falls back to built-in list). */
export const getArticleFilterTopics = cache(async (): Promise<ArticleTopic[]> => {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'articleCategories',
      where: { showInFilters: { not_equals: false } },
      sort: ['order', 'label'],
      limit: 200,
      depth: 0,
      overrideAccess: false,
    })
    if (docs.length) {
      return (docs as ArticleCategory[]).map((doc) => ({ slug: doc.slug, label: doc.label }))
    }
  } catch (error) {
    logCmsError('getArticleFilterTopics', error)
  }
  return ARTICLE_CATEGORY_OPTIONS.map((option) => ({ slug: option.value, label: option.label }))
})

/** All event types in CMS order (falls back to built-in list). */
export const getEventTypes = cache(async (): Promise<EventTypeInfo[]> => {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'eventTypes',
      sort: ['order', 'label'],
      limit: 200,
      depth: 0,
      overrideAccess: false,
    })
    if (docs.length) {
      return (docs as EventType[]).map((doc) => ({
        slug: doc.slug,
        label: doc.label,
        badgeLabel: doc.shortLabel?.trim() || doc.label,
      }))
    }
  } catch (error) {
    logCmsError('getEventTypes', error)
  }
  return DEFAULT_EVENT_TYPES.map((type) => ({
    slug: type.slug,
    label: type.label,
    badgeLabel: 'shortLabel' in type ? type.shortLabel : type.label,
  }))
})
