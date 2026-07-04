import React from 'react'
import { Inter, DM_Sans } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AppProviders } from '@/components/providers/AppProviders'
import { getPayloadClient } from '@/lib/payload'
import type { FooterSetting, HeaderSetting, SiteSetting } from '@/payload-types'
import './styles.css'

// Body text - clean, readable, professional
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

// Headings - strong, scientific, modern
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

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
    payload.findGlobal({ slug: 'headerSettings', depth: 1 }) as Promise<HeaderSetting>,
    payload.findGlobal({ slug: 'footerSettings', depth: 0 }) as Promise<FooterSetting>,
    payload.findGlobal({ slug: 'siteSettings', depth: 0 }) as Promise<SiteSetting>,
  ])

  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased">
        <Navbar settings={headerSettings} />
        <AppProviders>
          <main className="relative min-h-[50vh]">{children}</main>
        </AppProviders>
        <Footer
          settings={footerSettings}
          siteSettings={siteSettings}
          socialMediaLinks={headerSettings}
        />
      </body>
    </html>
  )
}
