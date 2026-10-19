import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

import { applyRevalidatePlan } from '@/lib/cache/revalidateSite'
import {
  revalidatePlanForCollection,
  revalidatePlanForGlobal,
} from '@/lib/cache/revalidateMap'

const SKIP_COLLECTIONS = new Set([
  'users',
  'contactMessages',
  'eventRegistrations',
  'courseRegistrations',
])

export const revalidateCollectionAfterChange: CollectionAfterChangeHook = ({
  collection,
  doc,
  previousDoc,
}) => {
  if (SKIP_COLLECTIONS.has(collection.slug)) return doc

  const plan = revalidatePlanForCollection(collection.slug, doc as Record<string, unknown>)
  if (plan) {
    applyRevalidatePlan(plan, { scope: `revalidate:${collection.slug}:change` })
  }

  if (collection.slug === 'services' && previousDoc) {
    const previousSlug = (previousDoc as { slug?: string }).slug
    const currentSlug = (doc as { slug?: string }).slug
    if (previousSlug && previousSlug !== currentSlug) {
      applyRevalidatePlan(
        {
          paths: [`/services/${previousSlug}`, `/services/${currentSlug}`].filter(Boolean),
          tags: plan?.tags ?? [],
        },
        { scope: 'revalidate:services:slug-change' },
      )
    }
  }

  if (collection.slug === 'events' && previousDoc) {
    const previousSlug = (previousDoc as { slug?: string }).slug
    const currentSlug = (doc as { slug?: string }).slug
    if (previousSlug && previousSlug !== currentSlug) {
      applyRevalidatePlan(
        {
          paths: [`/events/${previousSlug}`],
          tags: plan?.tags ?? [],
        },
        { scope: 'revalidate:events:slug-change' },
      )
    }
  }

  return doc
}

export const revalidateCollectionAfterDelete: CollectionAfterDeleteHook = ({ collection, doc }) => {
  if (SKIP_COLLECTIONS.has(collection.slug)) return doc

  const plan = revalidatePlanForCollection(collection.slug, doc as Record<string, unknown>)
  if (plan) {
    applyRevalidatePlan(plan, { scope: `revalidate:${collection.slug}:delete` })
  }

  return doc
}

export const revalidateGlobalAfterChange: GlobalAfterChangeHook = ({ global }) => {
  const plan = revalidatePlanForGlobal(global.slug)
  if (plan) {
    applyRevalidatePlan(plan, { scope: `revalidate:global:${global.slug}` })
  }

  return undefined
}
