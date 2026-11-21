import { cache } from 'react'

import { getPayloadClient } from '@/lib/payload'
import { logCmsError } from '@/lib/resilience/logger'
import { resolveEventType } from '@/lib/taxonomy'
import type { ProgrammesCatalog } from '@/payload-types'
import { DEFAULT_EVENTS_HUB_HERO, DEFAULT_EVENTS_PAGE_HERO } from '@/data/defaults/events-pages'

export { DEFAULT_EVENTS_HUB_HERO, DEFAULT_EVENTS_PAGE_HERO }

export type ArchiveRowConfig = {
  label: string
  nature?: 'national' | 'international'
  eventTypeSlug?: string
}

const text = (value: string | null | undefined, fallback: string) => value?.trim() || fallback

/** Programmes catalog page copy (events heroes + archive rows) with built-in fallbacks. */
export const getProgrammePagesCopy = cache(async () => {
  let catalog: Partial<ProgrammesCatalog> = {}
  try {
    const payload = await getPayloadClient()
    catalog = (await payload.findGlobal({
      slug: 'programmesCatalog',
      depth: 1,
      select: { archiveRows: true, eventsPage: true, eventsHub: true },
      overrideAccess: false,
    })) as ProgrammesCatalog
  } catch (error) {
    logCmsError('getProgrammePagesCopy', error)
  }

  const page = catalog.eventsPage
  const hub = catalog.eventsHub
  const archiveRows: ArchiveRowConfig[] = (catalog.archiveRows ?? [])
    .filter((row) => row.label?.trim())
    .map((row) => ({
      label: row.label.trim(),
      nature: row.nature === 'national' || row.nature === 'international' ? row.nature : undefined,
      eventTypeSlug: resolveEventType(row.eventType)?.slug,
    }))

  return {
    eventsPage: {
      eyebrow: text(page?.eyebrow, DEFAULT_EVENTS_PAGE_HERO.eyebrow),
      title: text(page?.title, DEFAULT_EVENTS_PAGE_HERO.title),
      subtitle: text(page?.subtitle, DEFAULT_EVENTS_PAGE_HERO.subtitle),
      primaryLabel: text(page?.primaryLabel, DEFAULT_EVENTS_PAGE_HERO.primaryLabel),
      primaryHref: text(page?.primaryHref, DEFAULT_EVENTS_PAGE_HERO.primaryHref),
      secondaryLabel: text(page?.secondaryLabel, DEFAULT_EVENTS_PAGE_HERO.secondaryLabel),
      secondaryHref: text(page?.secondaryHref, DEFAULT_EVENTS_PAGE_HERO.secondaryHref),
    },
    eventsHub: {
      eyebrow: text(hub?.eyebrow, DEFAULT_EVENTS_HUB_HERO.eyebrow),
      title: text(hub?.title, DEFAULT_EVENTS_HUB_HERO.title),
      description: text(hub?.description, DEFAULT_EVENTS_HUB_HERO.description),
    },
    /** Empty means "use the built-in five rows". */
    archiveRows,
  }
})

/** Link to the completed-events archive filtered like an archive row. */
export function archiveRowHref(row: ArchiveRowConfig): string {
  const params = new URLSearchParams({ schedule: 'completed' })
  if (row.nature) params.set('nature', row.nature)
  if (row.eventTypeSlug) params.set('type', row.eventTypeSlug)
  return `/courses/events?${params.toString()}`
}
