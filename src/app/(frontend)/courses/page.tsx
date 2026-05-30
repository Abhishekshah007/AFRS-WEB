import { ProgrammesPageView } from '@/components/programmes/ProgrammesPageView'
import {
  defaultArchive,
  defaultEducationProgrammes,
  defaultGallery,
  defaultHubEvents,
  defaultResourcePersons,
  defaultTrainingOptions,
} from '@/components/programmes/content'
import type { ArchiveItem, GalleryThumb, HubEventCard, ResourcePerson } from '@/components/programmes/types'
import { getPayloadClient } from '@/lib/payload'
import { formatEventType, resolveMediaUrl, richTextToPlain } from '@/lib/cms'
import type { Event as AfrsEvent, Media, Scientist, SiteSetting } from '@/payload-types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Forensic Programmes & Events',
  description:
    'Explore AFRS education programmes, AFSL training and internships, and register for upcoming forensic workshops and conferences.',
}

const VISUAL_TONES: HubEventCard['visualTone'][] = ['blue', 'orange', 'purple']
const EVENT_ICONS: Record<string, string> = {
  workshop: '👥',
  conference: '🌐',
  training: '🎓',
  webinar: '💻',
}

function initialsFromName(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

function mapEventToCard(evt: AfrsEvent, index: number): HubEventCard {
  const type = evt.eventType ?? 'workshop'
  return {
    id: String(evt.id),
    slug: evt.slug,
    title: evt.title,
    description: evt.excerpt ?? richTextToPlain(evt.description, 140),
    eventType: type,
    eventTypeLabel: formatEventType(type),
    startDate: evt.startDate,
    visualTone: VISUAL_TONES[index % VISUAL_TONES.length],
    visualIcon: EVENT_ICONS[type] ?? '📅',
  }
}

function isOngoing(evt: AfrsEvent, now: Date): boolean {
  const start = new Date(evt.startDate)
  if (start > now) return false
  if (evt.endDate) return new Date(evt.endDate) >= now
  const weekAgo = new Date(now)
  weekAgo.setDate(weekAgo.getDate() - 7)
  return start >= weekAgo
}

function isUpcoming(evt: AfrsEvent, now: Date): boolean {
  return new Date(evt.startDate) > now
}

function formatArchiveCount(count: number): string {
  return `${String(count).padStart(2, '0')} Nos`
}

export default async function CoursesPage() {
  const payload = await getPayloadClient()
  const now = new Date()

  const [site, eventsResult, scientistsResult, galleryResult, nationalCount, intlCount, workshopCount, webinarCount] =
    await Promise.all([
      payload.findGlobal({ slug: 'siteSettings', depth: 0 }) as Promise<SiteSetting>,
      payload.find({
        collection: 'events',
        where: { published: { equals: true } },
        sort: 'startDate',
        limit: 24,
        depth: 1,
        overrideAccess: false,
      }),
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

  const allEvents = eventsResult.docs as AfrsEvent[]
  const upcomingRaw = allEvents.filter((e) => isUpcoming(e, now))
  const ongoingRaw = allEvents.filter((e) => isOngoing(e, now))

  const upcomingEvents =
    upcomingRaw.length > 0
      ? upcomingRaw.slice(0, 3).map(mapEventToCard)
      : defaultHubEvents

  const ongoingEvents =
    ongoingRaw.length > 0
      ? ongoingRaw.slice(0, 3).map(mapEventToCard)
      : []

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
    { label: 'National Events', count: formatArchiveCount(nationalCount.totalDocs) },
    { label: 'International Events', count: formatArchiveCount(intlCount.totalDocs) },
    { label: 'Workshops', count: formatArchiveCount(workshopCount.totalDocs) },
    { label: 'Webinars', count: formatArchiveCount(webinarCount.totalDocs) },
  ]

  const hasArchiveData = archive.some((a) => !a.count.startsWith('00'))
  const archiveItems = hasArchiveData ? archive : defaultArchive

  return (
    <ProgrammesPageView
      educationProgrammes={defaultEducationProgrammes}
      trainingOptions={defaultTrainingOptions}
      upcomingEvents={upcomingEvents}
      ongoingEvents={ongoingEvents}
      resourcePersons={resourcePersons}
      archive={archiveItems}
      gallery={gallery}
      totalVisitors={site?.totalVisitors ?? 25847}
    />
  )
}
