import type { PaginatedDocs } from 'payload'
import { EventCardsCarousel } from '@/components/programmes/EventCardsCarousel'
import { mapEventToHubCard } from '@/components/programmes/mapEvent'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { Event as AfrsEvent } from '@/payload-types'
import { CONTAINER, SECTION } from './constants'
import type { SectionText } from './types'

export function EventsSection({
  sectionText,
  events,
}: {
  sectionText: SectionText
  events: PaginatedDocs<AfrsEvent>
}) {
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
        {events.docs.length === 0 ? (
          <p className="py-8 text-center text-slate-400">
            No upcoming events — add them in the CMS.
          </p>
        ) : (
          <EventCardsCarousel
            events={events.docs.map((afrsEvent, index) => mapEventToHubCard(afrsEvent, index))}
            viewAllHref="/courses/events"
            ariaLabel="Upcoming events"
            className="mt-8"
          />
        )}
      </div>
    </section>
  )
}
