import { ProgrammesPageView } from '@/components/programmes/ProgrammesPageView'
import { defaultArchive } from '@/components/programmes/content'
import {
  getDefaultResourcePersons,
  getTrainingChecklist,
} from '@/components/programmes/content.server'
import {
  educationProgrammesForHub,
  getArchiveFilterLinks,
  trainingOptionsForHub,
} from '@/components/programmes/catalog'
import type { ArchiveItem, ResourcePerson } from '@/components/programmes/types'
import { getPayloadClient } from '@/lib/payload'
import { fetchProgrammeHubEvents } from '@/lib/programmeEvents'
import { resolveTotalVisitors } from '@/lib/site/totalVisitors'
import { GALLERY_PAGE_PRESETS, galleryHref } from '@/lib/gallery/constants'
import { getGalleryThumbs } from '@/lib/queries/gallery'
import type { ResourcePerson as CmsResourcePerson, SiteSetting } from '@/payload-types'
import { buildPageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'
import type { Where } from 'payload'

export const metadata: Metadata = buildPageMetadata({
  title: 'Forensic Science Courses, Training & Internships',
  description:
    'Explore AFRS forensic science courses, AFSL laboratory training and internships, and upcoming workshops for students and professionals.',
  path: '/courses',
})

function initialsFromName(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

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

export default async function CoursesPage() {
  const payload = await getPayloadClient()

  const [
    site,
    { upcoming: upcomingEvents, ongoing: ongoingEvents },
    resourcePersonsResult,
    gallery,
    nationalCount,
    intlCount,
    workshopCount,
    webinarCount,
    links,
    educationProgrammes,
    trainingOptions,
    fallbackResourcePersons,
    cmsChecklist,
  ] = await Promise.all([
    payload.findGlobal({ slug: 'siteSettings', depth: 0 }) as Promise<SiteSetting>,
    fetchProgrammeHubEvents({ limit: 24 }),
    payload.find({
      collection: 'resourcePersons',
      where: { published: { equals: true } },
      sort: 'order',
      limit: 200,
      depth: 1,
      overrideAccess: false,
    }),
    getGalleryThumbs({ ...GALLERY_PAGE_PRESETS.courses, limit: 6 }),
    payload.count({
      collection: 'events',
      where: completedEventWhere({ eventNature: { equals: 'national' } }),
      overrideAccess: false,
    }),
    payload.count({
      collection: 'events',
      where: completedEventWhere({ eventNature: { equals: 'international' } }),
      overrideAccess: false,
    }),
    payload.count({
      collection: 'events',
      where: completedEventWhere({ eventType: { equals: 'workshop' } }),
      overrideAccess: false,
    }),
    payload.count({
      collection: 'events',
      where: completedEventWhere({ eventType: { equals: 'webinar' } }),
      overrideAccess: false,
    }),
    getArchiveFilterLinks(),
    educationProgrammesForHub(),
    trainingOptionsForHub(),
    getDefaultResourcePersons(),
    getTrainingChecklist(),
  ])

  const resourcePersons: ResourcePerson[] =
    resourcePersonsResult.docs.length > 0
      ? (resourcePersonsResult.docs as CmsResourcePerson[]).map((person) => ({
          id: String(person.id),
          name: person.name,
          title: person.title,
          photoUrl:
            person.photo && typeof person.photo === 'object' && person.photo.url
              ? person.photo.url
              : undefined,
          initials: initialsFromName(person.name),
          bio: person.bio,
        }))
      : fallbackResourcePersons

  const galleryViewAllHref = galleryHref('events', 'afrs')

  const archive: ArchiveItem[] = [
    {
      label: 'National Events',
      count: formatArchiveCount(nationalCount.totalDocs),
      href: archiveHref(links.nationalEvents),
    },
    {
      label: 'International Events',
      count: formatArchiveCount(intlCount.totalDocs),
      href: archiveHref(links.internationalEvents),
    },
    {
      label: 'Workshops',
      count: formatArchiveCount(workshopCount.totalDocs),
      href: archiveHref(links.workshops),
    },
    {
      label: 'Webinars',
      count: formatArchiveCount(webinarCount.totalDocs),
      href: archiveHref(links.webinars),
    },
  ]

  const hasArchiveData = archive.some((a) => !a.count.startsWith('00'))
  const archiveItems = hasArchiveData ? archive : defaultArchive

  return (
    <ProgrammesPageView
      educationProgrammes={educationProgrammes}
      trainingOptions={trainingOptions}
      upcomingEvents={upcomingEvents.slice(0, 3)}
      ongoingEvents={ongoingEvents.slice(0, 3)}
      resourcePersons={resourcePersons}
      archive={archiveItems}
      gallery={gallery}
      galleryViewAllHref={galleryViewAllHref}
      totalVisitors={resolveTotalVisitors(site)}
      trainingChecklist={cmsChecklist}
    />
  )
}
