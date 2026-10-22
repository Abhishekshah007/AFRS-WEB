import { isEventOngoing, isEventUpcoming } from '@/components/programmes/mapEvent'
import { formatEventDate, isSafeHref, resolveMediaUrlOptional } from '@/lib/cms'
import { resolveEventSlug } from '@/lib/utils/slugify'
import type { Event as AfrsEvent, Media, SitePopup } from '@/payload-types'

export const HOME_POPUP_LIMIT = 5
export const HOME_POPUP_STORAGE_KEY = 'afrs.homePopup.dismissed'

export type HomePopupPoster = {
  kind: 'poster'
  id: string
  title: string
  imageUrl: string
  href?: string
  updatedAt: string
}

export type HomePopupEvent = {
  kind: 'event'
  id: string
  title: string
  imageUrl?: string
  whenLabel: string
  venue?: string
  href: string
  ctaLabel: 'Apply' | 'View event'
  updatedAt: string
}

export type HomePopupSlide = HomePopupPoster | HomePopupEvent

type DatedEvent = {
  id?: number | null
  published?: boolean | null
  showInHomePopup?: boolean | null
  startDate?: string | null
  endDate?: string | null
}

export function isEligibleHomePopupEvent(evt: DatedEvent, now = new Date()): boolean {
  if (!evt.published || !evt.showInHomePopup || !evt.startDate) return false
  const asEvent = evt as AfrsEvent
  return isEventUpcoming(asEvent, now) || isEventOngoing(asEvent, now)
}

export function countHomePopupSlots(
  posters: { id?: number | null; published?: boolean | null }[],
  events: DatedEvent[],
  now = new Date(),
): number {
  const posterCount = posters.filter((poster) => poster.published).length
  const eventCount = events.filter((evt) => isEligibleHomePopupEvent(evt, now)).length
  return posterCount + eventCount
}

export function homePopupFingerprint(slides: Pick<HomePopupSlide, 'kind' | 'id' | 'updatedAt'>[]): string {
  return slides.map((slide) => `${slide.kind}:${slide.id}:${slide.updatedAt}`).join('|')
}

function posterSlide(doc: SitePopup): HomePopupPoster | null {
  const imageUrl = resolveMediaUrlOptional(doc.image as number | Media | null | undefined)
  if (!imageUrl || !doc.published) return null
  const href = doc.linkUrl?.trim()
  return {
    kind: 'poster',
    id: String(doc.id),
    title: doc.title,
    imageUrl,
    href: href && isSafeHref(href) ? href : undefined,
    updatedAt: doc.updatedAt,
  }
}

function eventWhenLabel(evt: AfrsEvent): string {
  const date = formatEventDate(evt.startDate)
  const time = evt.startTime?.trim()
  return time ? `${date} · ${time}` : date
}

function eventSlide(evt: AfrsEvent, now: Date): HomePopupEvent | null {
  if (!isEligibleHomePopupEvent(evt, now)) return null
  const slug = resolveEventSlug(evt.slug, String(evt.id))
  if (!slug) return null
  const registrationOpen = evt.registrationOpen !== false
  const venue = evt.venue?.trim()
  return {
    kind: 'event',
    id: String(evt.id),
    title: evt.title,
    imageUrl: resolveMediaUrlOptional(evt.banner as number | Media | null | undefined),
    whenLabel: eventWhenLabel(evt),
    venue: venue || undefined,
    href: registrationOpen ? `/events/${slug}/register` : `/events/${slug}`,
    ctaLabel: registrationOpen ? 'Apply' : 'View event',
    updatedAt: evt.updatedAt,
  }
}

/** Posters by sort order, then upcoming/ongoing events by start date. Capped at 5. */
export function buildHomePopupSlides(
  posters: SitePopup[],
  events: AfrsEvent[],
  now = new Date(),
): HomePopupSlide[] {
  const orderedPosters = [...posters].sort((a, b) => {
    const orderDiff = (a.order ?? 0) - (b.order ?? 0)
    if (orderDiff !== 0) return orderDiff
    return a.id - b.id
  })
  const orderedEvents = [...events].sort((a, b) => {
    const dateDiff = new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    if (dateDiff !== 0) return dateDiff
    return a.id - b.id
  })

  const slides = [
    ...orderedPosters.map(posterSlide).filter((slide): slide is HomePopupPoster => slide !== null),
    ...orderedEvents.map((evt) => eventSlide(evt, now)).filter((slide): slide is HomePopupEvent => slide !== null),
  ]

  return slides.slice(0, HOME_POPUP_LIMIT)
}
