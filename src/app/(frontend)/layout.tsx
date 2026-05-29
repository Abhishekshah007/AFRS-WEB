import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getPayloadClient } from '@/lib/payload'
import type { FooterSetting, HeaderSetting, SiteSetting } from '@/payload-types'
import './styles.css'

export async function generateMetadata(): Promise<import('next').Metadata> {
  const payload = await getPayloadClient()
  const siteSettings = (await payload.findGlobal({ slug: 'siteSettings', depth: 0 })) as SiteSetting
  const siteName = siteSettings?.siteName || 'Applied Forensic Research Sciences Institute'
  const description =
    'Advancing the frontiers of forensic science through education, research, and professional excellence.'

  return {
    metadataBase: new URL('https://afrs-webapp.vercel.app'),
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description,
    applicationName: siteName,
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website',
      siteName,
      title: siteName,
      description,
      url: '/',
    },
    twitter: { card: 'summary_large_image', title: siteName, description },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayloadClient()
  const [headerSettings, footerSettings, siteSettings] = await Promise.all([
    payload.findGlobal({ slug: 'headerSettings', depth: 0 }) as Promise<HeaderSetting>,
    payload.findGlobal({ slug: 'footerSettings', depth: 0 }) as Promise<FooterSetting>,
    payload.findGlobal({ slug: 'siteSettings', depth: 0 }) as Promise<SiteSetting>,
  ])

  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        <Navbar settings={headerSettings} />
        <main>{children}</main>
        <Footer settings={footerSettings} siteSettings={siteSettings} />
      </body>
    </html>
  )
}
