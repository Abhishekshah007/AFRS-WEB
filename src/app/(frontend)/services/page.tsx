import { getServicesPageData } from '@/lib/queries/services'
import { ServicesPageView } from '@/components/services/ServicesPageView'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AFSL - Applied Forensic Sciences Laboratory',
  description:
    'Future-ready forensic laboratory services — DNA analysis, cyber forensics, questioned documents, training, and expert legal consultancy.',
}

export default async function ServicesPage() {
  const data = await getServicesPageData()
  return <ServicesPageView {...data} />
}
