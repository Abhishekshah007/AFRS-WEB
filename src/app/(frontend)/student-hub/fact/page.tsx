import { getPayloadClient } from '@/lib/payload'
import { formatEventDate } from '@/lib/cms'
import { getUgcNetAchievers } from '@/components/student-hub/content'
import { UgcNetExperience } from '@/components/student-hub/UgcNetExperience'
import type { Event as AfrsEvent } from '@/payload-types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FACT - Forensic Aptitude and Caliber Test',
  description:
    'Prepare for FACT, the Forensic Aptitude and Caliber Test, with aptitude practice, forensic reasoning modules, mock tests, and guided preparation.',
}

export default async function FactPage() {
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
    <div className="min-h-screen bg-[#F5F7FB]">
      <UgcNetExperience
        content={{
          heroEyebrow: 'Forensic Aptitude and Caliber Test',
          heroTitlePrefix: 'Prepare for',
          heroTitleHighlight: 'FACT',
          heroDescription:
            'Build forensic aptitude, scientific reasoning, observation skills, and test confidence through structured online and offline preparation.',
          heroCtaLabel: 'Join FACT Batch',
          heroMetricEyebrow: 'Next FACT Practice Cycle',
          heroMetricValue: 'Aptitude + Forensics',
          achieversEyebrow: 'Learner Progress',
          achieversTitle: 'Students Building Forensic Aptitude',
          statsValue: 'FACT',
          statsDescription: 'Focused preparation for aptitude, reasoning, and forensic caliber',
          ecosystemEyebrow: 'Preparation Modes',
          ecosystemTitle: 'FACT Learning Ecosystem',
          onlineTitle: 'Online FACT Practice',
          onlineDescription:
            'Live aptitude drills, forensic reasoning practice, recorded concept sessions, and performance review for remote learners.',
          onlineCtaLabel: 'Start Online',
          offlineTitle: 'Offline FACT Mentorship',
          offlineDescription:
            'Classroom-based practice with guided test analysis, doubt clearing, and supervised forensic aptitude exercises.',
          offlineCtaLabel: 'Join Classroom',
          eventTitle: 'FACT Mock Test Series',
          eventDescription:
            'Practice forensic aptitude, observation, analytical reasoning, and domain awareness through structured mock tests designed for FACT aspirants.',
          eventDateLabel: 'Next Mock Test',
          eventTimeLabel: 'Test Time',
          eventVenueLabel: 'Mode / Venue',
          eventCtaLabel: 'Register for FACT Test',
          emptyEventText: 'FACT test dates and batches will be published shortly.',
        }}
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
