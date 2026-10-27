import React from 'react'
import { Inter, DM_Sans } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AppProviders } from '@/components/providers/AppProviders'
import { AfrsChatbot } from '@/components/chatbot/AfrsChatbot'
import { getLayoutGlobals } from '@/lib/queries/layout'
import type { Viewport } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { ADSENSE_ACCOUNT, getSiteUrl } from '@/lib/seo/site'
import { organizationGraph, websiteGraph, withContext } from '@/lib/seo/schema'
import { DEFAULT_LAB_EMAIL } from '@/data/defaults/siteContact'
import { VisitorTracker } from '@/components/site/VisitorTracker'
import { resolveTotalVisitors } from '@/lib/site/totalVisitors'
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3B010B',
}

export async function generateMetadata(): Promise<import('next').Metadata> {
  const { siteSettings } = await getLayoutGlobals()
  const siteName = siteSettings?.siteName || 'Applied Forensic Research Sciences Institute'
  const description =
    'AFRS provides forensic science education, professional training, internships, research support and AFSL laboratory services across India.'

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: 'Forensic Science Education, Training & Services | AFRS',
      template: `%s | AFRS`,
    },
    description,
    applicationName: siteName,
    authors: [{ name: siteName, url: getSiteUrl() }],
    creator: siteName,
    publisher: siteName,
    category: 'education',
    manifest: '/manifest.webmanifest',
    icons: {
      icon: '/assets/logo.png',
      apple: '/assets/logo.png',
    },
    other: {
      'google-adsense-account': ADSENSE_ACCOUNT,
    },
    openGraph: {
      type: 'website',
      siteName,
      locale: 'en_IN',
      title: 'Forensic Science Education, Training & Services | AFRS',
      description,
      url: '/',
      images: [{ url: '/assets/logo.png', alt: siteName }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Forensic Science Education, Training & Services | AFRS',
      description,
      images: ['/assets/logo.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { headerSettings, footerSettings, siteSettings, cmsAvailable } = await getLayoutGlobals()

  const socials = siteSettings?.socialLinks || {}
  const sameAs = [
    socials.facebook,
    socials.instagram,
    socials.linkedin,
    socials.youtube,
    socials.twitter,
  ].filter((url): url is string => typeof url === 'string' && url.startsWith('http'))

  return (
    <html lang="en-IN" className={`${inter.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brand focus:shadow-lg"
        >
          Skip to main content
        </a>
        <JsonLd data={withContext([organizationGraph(sameAs), websiteGraph()])} />
        <VisitorTracker startingTotal={resolveTotalVisitors(siteSettings)} />
        {!cmsAvailable && (
          <div
            className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-xs font-semibold text-amber-900"
            role="status"
          >
            Some content is loading from backup data. Full CMS content will return shortly.
          </div>
        )}
        <Navbar settings={headerSettings} labEmail={siteSettings?.labEmail || DEFAULT_LAB_EMAIL} />
        <AppProviders>
          <main id="main-content" className="relative min-h-[50vh]" tabIndex={-1}>
            {children}
          </main>
          <AfrsChatbot
            phone={siteSettings?.phone || undefined}
            email={siteSettings?.email || undefined}
            labEmail={siteSettings?.labEmail || DEFAULT_LAB_EMAIL}
          />
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
