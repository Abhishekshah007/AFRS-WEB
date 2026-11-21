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
  'siteVisitors',
  'users',
  'contactMessages',
  'eventRegistrations',
  'courseRegistrations',
])

/**
 * Media writes that cannot change any public page: new uploads (nothing references them
 * yet; the page/doc that starts using a file revalidates on its own save) and private
 * participant files (payment proofs, registration exports). Revalidating on these used
 * to purge the whole site on every registration, re-rendering every page.
 */
function isInertMediaWrite(
  slug: string,
  operation: string | undefined,
  doc: Record<string, unknown> | null | undefined,
): boolean {
  if (slug !== 'media') return false
  return operation === 'create' || doc?.isPrivate === true
}

export const revalidateCollectionAfterChange: CollectionAfterChangeHook = ({
  collection,
  doc,
  previousDoc,
  operation,
}) => {
  if (SKIP_COLLECTIONS.has(collection.slug)) return doc
  if (isInertMediaWrite(collection.slug, operation, doc as Record<string, unknown>)) return doc

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
  if (collection.slug === 'media' && (doc as { isPrivate?: boolean })?.isPrivate) return doc

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
