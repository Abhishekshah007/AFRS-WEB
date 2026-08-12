import { CareerGuidanceView } from '@/components/student-hub/CareerGuidanceView'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Student Career Guidance',
  description:
    'Mentorship programmes, career roadmaps, and internship counselling for AFRS forensic science students.',
}

export default function CareerGuidancePage() {
  return <CareerGuidanceView />
}
