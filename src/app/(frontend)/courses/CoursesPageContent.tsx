import { ProgrammesPageView } from '@/components/programmes/ProgrammesPageView'
import { getTrainingChecklist } from '@/components/programmes/content.server'
import {
  educationProgrammesForHub,
  getArchiveFilterLinks,
  trainingOptionsForHub,
} from '@/components/programmes/catalog'
import type { ArchiveItem } from '@/components/programmes/types'
import { getPayloadClient } from '@/lib/payload'
import { fetchProgrammeHubEvents } from '@/lib/programmeEvents'
import { getSiteVisitorTotal } from '@/lib/site/visitorTotal'
import { GALLERY_PAGE_PRESETS, galleryHref } from '@/lib/gallery/constants'
import { getGalleryThumbs } from '@/lib/queries/gallery'
import type { SiteSetting } from '@/payload-types'
import { getSiteResourcePersons } from '@/lib/queries/resource-persons'
import {
  archiveRowHref,
  getProgrammePagesCopy,
  type ArchiveRowConfig,
} from '@/lib/queries/programme-pages'
import type { ResourcePersonModalView } from '@/components/programmes/ResourceArchiveGallery'
import type { Where } from 'payload'

function formatArchiveCount(count: number): string {
  return `${String(count).padStart(2, '0')} Nos`
}

function archiveHref(href: string): string {
  const [path, query = ''] = href.split('?')
  const params = new URLSearchParams(query)
  params.set('schedule', 'completed')
  return `${path}?${params.toString()}`
}

function completedEventWhere(extra: Where): Where {
  const now = new Date().toISOString()

  return {
    and: [
      { published: { equals: true } },
      extra,
      {
        or: [
          { endDate: { less_than: now } },
          {
            and: [
              { endDate: { exists: false } },
              {
                startDate: {
                  less_than: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                },
              },
            ],
          },
        ],
      },
    ],
  }
}

export type CoursesPageContentProps = {
  /** Server-render the Courses page with this resource person modal already open. */
  initialModal?: ResourcePersonModalView
}

/** Shared body of `/courses` and the crawlable `/courses/resource-persons/*` URLs. */
export async function CoursesPageContent({ initialModal }: CoursesPageContentProps = {}) {
  const payload = await getPayloadClient()

  const [
    site,
    { upcoming: upcomingEvents, ongoing: ongoingEvents },
    { people: resourcePersons },
    gallery,
    links,
    educationProgrammes,
    trainingOptions,
    cmsChecklist,
    pagesCopy,
  ] = await Promise.all([
    payload.findGlobal({ slug: 'siteSettings', depth: 0 }) as Promise<SiteSetting>,
    fetchProgrammeHubEvents({ limit: 24 }),
    getSiteResourcePersons(),
    getGalleryThumbs({ ...GALLERY_PAGE_PRESETS.courses, limit: 6 }),
    getArchiveFilterLinks(),
    educationProgrammesForHub(),
    trainingOptionsForHub(),
    getTrainingChecklist(),
    getProgrammePagesCopy(),
  ])


  const galleryViewAllHref = galleryHref('events', 'afrs')

  // Archive rows come from Course site settings → "Archive sidebar"; when that list is
  // empty, the five built-in rows are used (with their existing filter links).
  const archiveRows: (ArchiveRowConfig & { href: string })[] =
    pagesCopy.archiveRows.length > 0
      ? pagesCopy.archiveRows.map((row) => ({ ...row, href: archiveRowHref(row) }))
      : [
          { label: 'National Events', nature: 'national', href: archiveHref(links.nationalEvents) },
          {
            label: 'International Events',
            nature: 'international',
            href: archiveHref(links.internationalEvents),
          },
          { label: 'Workshops', eventTypeSlug: 'workshop', href: archiveHref(links.workshops) },
          {
            label: 'Faculty Development Programs',
            eventTypeSlug: 'fdp',
            href: archiveHref(links.fdp),
          },
          { label: 'Conferences', eventTypeSlug: 'conference', href: archiveHref(links.conferences) },
        ]

  const archiveCounts = await Promise.all(
    archiveRows.map((row) => {
      const filters: Where[] = [
        ...(row.nature ? [{ eventNature: { equals: row.nature } }] : []),
        ...(row.eventTypeSlug ? [{ 'eventType.slug': { equals: row.eventTypeSlug } }] : []),
      ]
      return payload.count({
        collection: 'events',
        where: completedEventWhere(filters.length ? { and: filters } : {}),
        overrideAccess: false,
      })
    }),
  )

  // Always real counts (the old fallback showed invented numbers when every count was 0).
  const archiveItems: ArchiveItem[] = archiveRows.map((row, index) => ({
    label: row.label,
    count: formatArchiveCount(archiveCounts[index]?.totalDocs ?? 0),
    href: row.href,
  }))

  return (
    <ProgrammesPageView
      educationProgrammes={educationProgrammes}
      trainingOptions={trainingOptions}
      upcomingEvents={upcomingEvents}
      ongoingEvents={ongoingEvents}
      resourcePersons={resourcePersons}
      archive={archiveItems}
      gallery={gallery}
      galleryViewAllHref={galleryViewAllHref}
      totalVisitors={await getSiteVisitorTotal(site)}
      trainingChecklist={cmsChecklist}
      initialResourceModal={initialModal}
    />
  )
}
