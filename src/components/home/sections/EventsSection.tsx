import Image from 'next/image'
import Link from 'next/link'
import { formatEventDate, formatEventType, resolveMediaUrl, richTextToPlain } from '@/lib/cms'
import type { Event as AfrsEvent } from '@/payload-types'
import type { PaginatedDocs } from 'payload'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { TYPOGRAPHY, UI } from '../design'
import { CONTAINER, eventCardImages, SECTION } from './constants'
import type { SectionText } from './types'

export function EventsSection({
  sectionText,
  events,
}: {
  sectionText: SectionText
  events: PaginatedDocs<AfrsEvent>
}) {
  const buttonColors = [
    'bg-indigo-600 hover:bg-indigo-700',
    'bg-violet-700 hover:bg-violet-800',
    'bg-orange-500 hover:bg-orange-600',
  ]
  const badgeColors = ['bg-indigo-500', 'bg-violet-600', 'bg-orange-500']

  return (
    <section className={`${SECTION} bg-white section-glow-top`}>
      <div className={CONTAINER}>
        <SectionHeader
          title={sectionText.eventsHeading || 'Upcoming Events'}
          subtitle={
            sectionText.eventsDescription ||
            'Join our forensic science training programs and workshops'
          }
        />
        <AnimateOnScroll stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.docs.length === 0 && (
            <p className="md:col-span-3 text-center text-slate-400 py-8">
              No upcoming events — add them in the CMS.
            </p>
          )}
          {events.docs.map((afrsEvent, index) => {
            const image = resolveMediaUrl(
              afrsEvent.banner,
              eventCardImages[index % eventCardImages.length],
            )
            const summary =
              afrsEvent.excerpt ||
              richTextToPlain(afrsEvent.description, 95) ||
              'Join our focused forensic learning event designed for practical skill development.'

            return (
              <article key={afrsEvent.id} className={`${UI.card} overflow-hidden card-pop`}>
                <div className="relative h-48 bg-slate-100">
                  <Image
                    src={image}
                    alt={`${afrsEvent.title} cover`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div
                    className={`h-10 w-10 rounded-lg ${badgeColors[index % badgeColors.length]} text-white flex items-center justify-center text-sm`}
                  >
                    <span className="sr-only">{afrsEvent.eventNature}</span>
                  </div>
                  <h3 className={`mt-4 ${TYPOGRAPHY.cardTitle} text-slate-900`}>
                    {afrsEvent.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500">
                    {formatEventDate(afrsEvent.startDate)}
                    {afrsEvent.venue ? ` • ${afrsEvent.venue}` : ''}
                  </p>
                  {afrsEvent.eventType && (
                    <p className="mt-1 text-xs text-slate-400">
                      {formatEventType(afrsEvent.eventType)}
                    </p>
                  )}
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{summary}</p>
                  <Link
                    href={`/events/${afrsEvent.slug}`}
                    className={`mt-6 block text-center text-white py-2.5 rounded-lg text-sm font-bold transition ${buttonColors[index % buttonColors.length]}`}
                  >
                    {afrsEvent.registrationOpen === false ? 'View Details' : 'Register Now'}
                  </Link>
                </div>
              </article>
            )
          })}
        </AnimateOnScroll>
      </div>
    </section>
  )
}
