import { ProgrammesPageView } from '@/components/programmes/ProgrammesPageView'
import { getTrainingChecklist } from '@/components/programmes/content.server'
import {
  educationProgrammesForHub,
  trainingOptionsForHub,
} from '@/components/programmes/catalog'
import type { ArchiveItem } from '@/components/programmes/types'
import { getPayloadClient } from '@/lib/payload'
import { countCompletedEvents, fetchProgrammeHubEvents } from '@/lib/programmeEvents'
import { getSiteVisitorTotal } from '@/lib/site/visitorTotal'
import { GALLERY_PAGE_PRESETS, galleryHref } from '@/lib/gallery/constants'
import { getGalleryThumbs } from '@/lib/queries/gallery'
import type { SiteSetting } from '@/payload-types'
import { getSiteResourcePersons } from '@/lib/queries/resource-persons'
import {
  archiveRowHref,
  DEFAULT_ARCHIVE_ROWS,
  getProgrammePagesCopy,
} from '@/lib/queries/programme-pages'
import type { ResourcePersonModalView } from '@/components/programmes/ResourceArchiveGallery'

function formatArchiveCount(count: number): string {
  return `${String(count).padStart(2, '0')} Nos`
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
    educationProgrammes,
    trainingOptions,
    cmsChecklist,
    pagesCopy,
  ] = await Promise.all([
    payload.findGlobal({ slug: 'siteSettings', depth: 0 }) as Promise<SiteSetting>,
    fetchProgrammeHubEvents({ limit: 24 }),
    getSiteResourcePersons(),
    getGalleryThumbs({ ...GALLERY_PAGE_PRESETS.courses, limit: 6 }),
    educationProgrammesForHub(),
    trainingOptionsForHub(),
    getTrainingChecklist(),
    getProgrammePagesCopy(),
  ])


  const galleryViewAllHref = galleryHref('events', 'afrs')

  // Archive rows come from Course site settings → "Archive sidebar"; when that list is
  // empty, the built-in rows are used. Counts use the same "finished" rule as the
  // Archive tab they link to (dates + manual Schedule status), so the numbers match.
  const archiveRows = (
    pagesCopy.archiveRows.length > 0 ? pagesCopy.archiveRows : DEFAULT_ARCHIVE_ROWS
  ).map((row) => ({ ...row, href: archiveRowHref(row) }))

  const archiveCounts = await Promise.all(
    archiveRows.map((row) =>
      countCompletedEvents({ nature: row.nature, types: row.eventTypeSlugs }),
    ),
  )

  // Always real counts (the old fallback showed invented numbers when every count was 0).
  const archiveItems: ArchiveItem[] = archiveRows.map((row, index) => ({
    label: row.label,
    count: formatArchiveCount(archiveCounts[index] ?? 0),
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
