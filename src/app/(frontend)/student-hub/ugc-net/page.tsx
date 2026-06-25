import { getPayloadClient } from '@/lib/payload'
import { formatEventDate } from '@/lib/cms'
import { getUgcNetAchievers } from '@/components/student-hub/content'
import { UgcNetExperience } from '@/components/student-hub/UgcNetExperience'
import type { Event as AfrsEvent } from '@/payload-types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'UGC NET Forensic Science Programme',
  description:
    'Master UGC NET Paper 1 & 2 with our expert-led online training, mock tests, and personalized guidance for aspiring forensic scientists.',
}

export default async function UgcNetPage() {
  const payload = await getPayloadClient()

  const [eventsResult, achievers] = await Promise.all([
    payload.find({
      collection: 'events',
      where: {
        and: [
          { published: { equals: true } },
          { startDate: { greater_than_equal: new Date().toISOString() } },
        ],
      },
      sort: 'startDate',
      limit: 4,
      depth: 0,
      overrideAccess: false,
    }),
    getUgcNetAchievers(),
  ])

  const events = eventsResult.docs as AfrsEvent[]
  const featured = events[0]

  return (
    <div className="bg-[#F5F7FB] min-h-screen">
      <UgcNetExperience
        achievers={achievers}
        featured={
          featured
            ? {
                slug: featured.slug,
                startDateLabel: formatEventDate(featured.startDate),
                startTime: featured.startTime,
                venue: featured.venue,
                registrationOpen: featured.registrationOpen,
              }
            : null
        }
        events={events.map((event) => ({
          id: event.id,
          slug: event.slug,
          title: event.title,
          eventType: event.eventType,
          startDateLabel: formatEventDate(event.startDate),
          registrationOpen: event.registrationOpen,
        }))}
      />
    </div>
  )
}
