import { CareerGuidanceView } from '@/components/student-hub/CareerGuidanceView'
import { getCareerGuidancePageContent } from '@/components/student-hub/content'
import { buildPageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = buildPageMetadata({
  title: 'Forensic Science Career Guidance',
  description:
    'Career pathways in forensic science: specialisations, internships, competitive exams, research options and one-to-one counselling from AFRS.',
  path: '/student-hub/career-guidance',
})

export default async function CareerGuidancePage() {
  const content = await getCareerGuidancePageContent()

  return <CareerGuidanceView content={content} />
}
