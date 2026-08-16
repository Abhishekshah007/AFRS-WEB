import { getUgcNetAchievers } from '@/components/student-hub/content'
import { getUpcomingStudentHubEvents } from '@/components/student-hub/eventSummaries.server'
import { UgcNetExperience } from '@/components/student-hub/UgcNetExperience'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'UGC NET Forensic Science Programme',
  description:
    'Master UGC NET Paper 1 & 2 with our expert-led online training, mock tests, and personalized guidance for aspiring forensic scientists.',
}

export default async function UgcNetPage() {
  const [{ featured, events }, achievers] = await Promise.all([
    getUpcomingStudentHubEvents(),
    getUgcNetAchievers(),
  ])

  return (
    <div className="student-hub-page min-h-screen hub-surface">
      <UgcNetExperience achievers={achievers} featured={featured} events={events} />
    </div>
  )
}
