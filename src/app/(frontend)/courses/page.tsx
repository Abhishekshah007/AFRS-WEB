import { ProgrammesPageView } from '@/components/programmes/ProgrammesPageView'
import {
  defaultArchive,
  defaultGallery,
  defaultResourcePersons,
  educationProgrammesForHub,
  trainingOptionsForHub,
} from '@/components/programmes/content'
import { archiveFilterLinks } from '@/components/programmes/catalog'
import type { ArchiveItem, GalleryThumb, ResourcePerson } from '@/components/programmes/types'
import { getPayloadClient } from '@/lib/payload'
import { fetchProgrammeHubEvents } from '@/lib/programmeEvents'
import { resolveMediaUrl } from '@/lib/cms'
import type { Media, Scientist, SiteSetting } from '@/payload-types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Forensic Programmes & Events',
  description:
    'Explore AFRS education programmes, AFSL training and internships, and register for upcoming forensic workshops and conferences.',
}

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

export default async function CoursesPage() {
  const payload = await getPayloadClient()

  const [
    site,
    { upcoming: upcomingEvents, ongoing: ongoingEvents },
    scientistsResult,
    galleryResult,
    nationalCount,
    intlCount,
    workshopCount,
    webinarCount,
  ] = await Promise.all([
    payload.findGlobal({ slug: 'siteSettings', depth: 0 }) as Promise<SiteSetting>,
    fetchProgrammeHubEvents({ limit: 24 }),
    payload.find({
      collection: 'scientists',
      where: { published: { equals: true } },
      sort: 'order',
      limit: 4,
      depth: 1,
      overrideAccess: false,
    }),
    payload.find({
      collection: 'galleryItems',
      where: { published: { equals: true } },
      sort: 'order',
      limit: 6,
      depth: 1,
      overrideAccess: false,
    }),
    payload.count({
      collection: 'events',
      where: { and: [{ published: { equals: true } }, { eventNature: { equals: 'national' } }] },
      overrideAccess: false,
    }),
    payload.count({
      collection: 'events',
      where: { and: [{ published: { equals: true } }, { eventNature: { equals: 'international' } }] },
      overrideAccess: false,
    }),
    payload.count({
      collection: 'events',
      where: { and: [{ published: { equals: true } }, { eventType: { equals: 'workshop' } }] },
      overrideAccess: false,
    }),
    payload.count({
      collection: 'events',
      where: { and: [{ published: { equals: true } }, { eventType: { equals: 'webinar' } }] },
      overrideAccess: false,
    }),
  ])

  const resourcePersons: ResourcePerson[] =
    scientistsResult.docs.length > 0
      ? (scientistsResult.docs as Scientist[]).slice(0, 2).map((s) => {
          const photo =
            s.photo && typeof s.photo === 'object' && s.photo.url ? s.photo.url : undefined
          return {
            id: String(s.id),
            name: s.name,
            title: s.designation,
            photoUrl: photo,
            initials: initialsFromName(s.name),
          }
        })
      : defaultResourcePersons

  const gallery: GalleryThumb[] =
    galleryResult.docs.length > 0
      ? galleryResult.docs.map((item) => ({
          id: String(item.id),
          src: resolveMediaUrl(item.image as number | Media | null | undefined, defaultGallery[0].src),
          alt: item.title,
        }))
      : defaultGallery

  const archive: ArchiveItem[] = [
    {
      label: 'National Events',
      count: formatArchiveCount(nationalCount.totalDocs),
      href: archiveFilterLinks['National Events'],
    },
    {
      label: 'International Events',
      count: formatArchiveCount(intlCount.totalDocs),
      href: archiveFilterLinks['International Events'],
    },
    { label: 'Workshops', count: formatArchiveCount(workshopCount.totalDocs), href: archiveFilterLinks.Workshops },
    { label: 'Webinars', count: formatArchiveCount(webinarCount.totalDocs), href: archiveFilterLinks.Webinars },
  ]

  const hasArchiveData = archive.some((a) => !a.count.startsWith('00'))
  const archiveItems = hasArchiveData ? archive : defaultArchive

  return (
    <ProgrammesPageView
      educationProgrammes={educationProgrammesForHub()}
      trainingOptions={trainingOptionsForHub()}
      upcomingEvents={upcomingEvents.slice(0, 3)}
      ongoingEvents={ongoingEvents.slice(0, 3)}
      resourcePersons={resourcePersons}
      archive={archiveItems}
      gallery={gallery}
      totalVisitors={site?.totalVisitors ?? 25847}
    />
  )
}
