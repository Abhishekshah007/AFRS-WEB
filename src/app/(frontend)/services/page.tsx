import { getServicesPageData } from '@/lib/queries/services'
import { getSiteVisitorTotal } from '@/lib/site/visitorTotal'
import { ServicesPageView } from '@/components/services/ServicesPageView'
import { buildPageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = buildPageMetadata({
  title: 'Forensic Services & Laboratory',
  description:
    'AFSL forensic laboratory services including crime scene investigation, fingerprint examination, questioned documents, digital forensics and expert consultancy.',
  path: '/services',
})

export default async function ServicesPage() {
  const [data, totalVisitors] = await Promise.all([getServicesPageData(), getSiteVisitorTotal()])
  // The services data is cached until an editor saves; the visitor total must stay live.
  return <ServicesPageView {...data} totalVisitors={totalVisitors} />
}
