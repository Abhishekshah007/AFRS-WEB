import { AboutPageView } from '@/components/about/AboutPageView'
import { getAboutPageData } from '@/lib/queries/about'
import { buildPageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = buildPageMetadata({
  title: 'About AFRS',
  description:
    'Learn about Applied Forensic Research Sciences — vision, mission, leadership, certifications and contribution to forensic science education in India.',
  path: '/about',
})

export default async function AboutPage() {
  const props = await getAboutPageData()
  return <AboutPageView {...props} />
}
