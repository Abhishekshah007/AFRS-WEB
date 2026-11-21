import { LegalPageView } from '@/components/marketing/LegalPageView'
import { getLegalPage } from '@/lib/queries/legal-pages'
import { buildPageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = buildPageMetadata({
  title: 'Terms of Service',
  description: 'Terms governing use of the AFRS website, programmes and related services.',
  path: '/terms',
})

/** Text is edited in the CMS: Page copy → Legal pages → Terms of Service. */
export default async function TermsPage() {
  const content = await getLegalPage('terms')
  return <LegalPageView content={content} />
}
