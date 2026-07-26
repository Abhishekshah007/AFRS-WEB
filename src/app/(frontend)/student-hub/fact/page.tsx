import { getUgcNetAchievers } from '@/components/student-hub/content'
import { getUpcomingStudentHubEvents } from '@/components/student-hub/eventSummaries.server'
import { UgcNetExperience } from '@/components/student-hub/UgcNetExperience'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FACT - Forensic Aptitude and Caliber Test',
  description:
    'Prepare for FACT, the Forensic Aptitude and Caliber Test, with aptitude practice, forensic reasoning modules, mock tests, and guided preparation.',
}

export default async function FactPage() {
  const [{ featured, events }, achievers] = await Promise.all([
    getUpcomingStudentHubEvents(),
    getUgcNetAchievers(),
  ])

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
        featured={featured}
        events={events}
      />
    </div>
  )
}
