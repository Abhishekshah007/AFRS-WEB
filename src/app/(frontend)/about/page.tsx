import { AboutPageView } from '@/components/about/AboutPageView'
import { getAboutPageData } from '@/lib/queries/about'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about AFRS — our vision, mission, leadership, certifications, and achievements in forensic science education and research.',
}

export default async function AboutPage() {
  const props = await getAboutPageData()
  return <AboutPageView {...props} />
}
