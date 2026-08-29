import { getServicesPageData } from '@/lib/queries/services'
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
  const data = await getServicesPageData()
  return <ServicesPageView {...data} />
}
