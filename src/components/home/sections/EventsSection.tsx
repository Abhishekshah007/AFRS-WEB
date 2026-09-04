import type { PaginatedDocs } from 'payload'
import { EventHubCard } from '@/components/programmes/EventHubCard'
import { mapEventToHubCard } from '@/components/programmes/mapEvent'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
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
        <AnimateOnScroll stagger className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {events.docs.length === 0 && (
            <p className="py-8 text-center text-slate-400 md:col-span-3">
              No upcoming events — add them in the CMS.
            </p>
          )}
          {events.docs.map((afrsEvent, index) => (
            <EventHubCard key={afrsEvent.id} event={mapEventToHubCard(afrsEvent, index)} />
          ))}
        </AnimateOnScroll>
      </div>
    </section>
  )
}
