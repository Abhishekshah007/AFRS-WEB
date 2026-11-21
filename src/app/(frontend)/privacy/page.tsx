import { LegalPageView } from '@/components/marketing/LegalPageView'
import { getLegalPage } from '@/lib/queries/legal-pages'
import { buildPageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = buildPageMetadata({
  title: 'Privacy Policy',
  description:
    'How AFRS collects, uses and protects personal information submitted through this website.',
  path: '/privacy',
})

/** Text is edited in the CMS: Page copy → Legal pages → Privacy Policy. */
export default async function PrivacyPage() {
  const content = await getLegalPage('privacy')
  return <LegalPageView content={content} introClassName="text-slate-600 leading-relaxed" />
}
