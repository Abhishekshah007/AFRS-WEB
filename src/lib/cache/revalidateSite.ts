import { revalidatePath, revalidateTag } from 'next/cache'

import type { RevalidatePlan } from '@/lib/cache/revalidateMap'
import { SITE_CACHE_TAGS } from '@/lib/cache/siteCacheTags'
import { logCmsError } from '@/lib/resilience/logger'

function unique<T>(values: T[]): T[] {
  return [...new Set(values)]
}

/** Apply a revalidation plan after CMS writes. Safe to call from Payload hooks. */
export function applyRevalidatePlan(plan: RevalidatePlan, context?: { scope: string }): void {
  try {
    const tags = unique(plan.layout ? [...plan.tags, SITE_CACHE_TAGS.layout, SITE_CACHE_TAGS.all] : plan.tags)

    for (const tag of tags) {
      revalidateTag(tag, 'max')
    }

    const paths = unique(plan.paths)
    for (const path of paths) {
      revalidatePath(path)
    }

    if (plan.layout) {
      revalidatePath('/', 'layout')
    }
  } catch (error) {
    logCmsError(context?.scope || 'revalidateSite', error, {
      paths: plan.paths,
      tags: plan.tags,
      layout: plan.layout,
    })
  }
}
