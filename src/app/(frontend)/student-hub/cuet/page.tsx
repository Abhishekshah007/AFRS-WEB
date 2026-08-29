import { getUgcNetAchievers } from '@/components/student-hub/content'
import { getUpcomingStudentHubEvents } from '@/components/student-hub/eventSummaries.server'
import { UgcNetExperience } from '@/components/student-hub/UgcNetExperience'
import { buildPageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = buildPageMetadata({
  title: 'CUET Forensic Science (SCQP13) Preparation',
  description:
    'CUET UG/PG Forensic Science (SCQP13) preparation with domain practice, mock tests and guided study support.',
  path: '/student-hub/cuet',
})

export default async function CuetPage() {
  const [{ featured, events }, achievers] = await Promise.all([
    getUpcomingStudentHubEvents(),
    getUgcNetAchievers(),
  ])

  return (
    <div className="student-hub-page min-h-screen hub-surface">
      <UgcNetExperience
        content={{
          heroEyebrow: 'NTA CUET UG/PG',
          heroTitlePrefix: 'Prepare for',
          heroTitleHighlight: 'CUET UG/PG (SCQP13)',
          heroDescription:
            'Build domain knowledge, exam strategy, and test confidence for CUET UG/PG Forensic Science (Paper Code: SCQP13) through structured online and offline preparation.',
          heroCtaLabel: 'Join CUET Batch',
          heroMetricEyebrow: 'Next CUET Practice Cycle',
          heroMetricValue: 'Paper Code SCQP13',
          achieversEyebrow: 'Learner Progress',
          achieversTitle: 'Students Preparing for CUET',
          statsValue: 'SCQP13',
          statsDescription: 'Focused preparation for CUET UG/PG Forensic Science',
          ecosystemEyebrow: 'Preparation Modes',
          ecosystemTitle: 'CUET Learning Ecosystem',
          onlineTitle: 'Online CUET Practice',
          onlineDescription:
            'Live concept classes, paper-pattern drills, recorded sessions, and performance review for remote CUET aspirants.',
          onlineCtaLabel: 'Start Online',
          offlineTitle: 'Offline CUET Mentorship',
          offlineDescription:
            'Classroom-based practice with guided test analysis, doubt clearing, and supervised SCQP13 preparation.',
          offlineCtaLabel: 'Join Classroom',
          eventTitle: 'CUET Mock Test Series',
          eventDescription:
            'Practice the CUET UG/PG Forensic Science pattern (SCQP13) through structured mock tests covering domain knowledge, reasoning, and exam temperament.',
          eventDateLabel: 'Next Mock Test',
          eventTimeLabel: 'Test Time',
          eventVenueLabel: 'Mode / Venue',
          eventCtaLabel: 'Register for CUET Test',
          emptyEventText: 'CUET test dates and batches will be published shortly.',
        }}
        achievers={achievers}
        featured={featured}
        events={events}
      />
    </div>
  )
}
