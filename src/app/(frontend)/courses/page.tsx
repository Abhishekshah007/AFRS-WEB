import { buildPageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'

import { CoursesPageContent } from './CoursesPageContent'

export const metadata: Metadata = buildPageMetadata({
  title: 'Forensic Science Courses, Training & Internships',
  description:
    'Explore AFRS forensic science courses, AFSL laboratory training and internships, and upcoming workshops for students and professionals.',
  path: '/courses',
})

export default function CoursesPage() {
  return <CoursesPageContent />
}
