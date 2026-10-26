'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { FooterSetting, SiteSetting } from '@/payload-types'
import Image from 'next/image'
import logo from '../../public/assets/logo.png'
import afslLogo from '../../public/assets/afsl-logo.png'
import SocialMediaIcons from './social/SocialMediaIcons'
import type { HeaderSetting } from '@/payload-types'
import {
  DEFAULT_AFRS_EMAIL,
  DEFAULT_LAB_EMAIL,
  DEFAULT_SITE_ADDRESS,
} from '@/data/defaults/siteContact'
import { isAfslPath } from '@/lib/site/afslPath'

const AFSL_COLUMNS = [
  {
    title: 'Laboratory',
    links: [
      { label: 'AFSL home', url: '/services' },
      { label: 'Case enquiry', url: '/services#service-consult-form' },
      { label: 'Laboratory gallery', url: '/gallery?category=lab&brand=afsl' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact the lab', url: '/services#service-consult-form' },
      { label: 'Privacy Policy', url: '/privacy' },
      { label: 'Terms of Service', url: '/terms' },
    ],
  },
]

export default function Footer({
  socialMediaLinks,
  settings,
  siteSettings,
}: {
  settings?: FooterSetting | null
  siteSettings?: SiteSetting | null
  socialMediaLinks?: HeaderSetting | null
}) {
  const pathname = usePathname()
  const afsl = isAfslPath(pathname)
  const aboutTitle = afsl
    ? 'Applied Forensic Science Laboratory'
    : settings?.aboutTitle || 'AFRS Institute'
  const aboutDescription = afsl
    ? 'An registered forensic laboratory for examination, consultation, and report verification.'
    : settings?.aboutDescription ||
      'Dedicated to advancing the frontiers of forensic science through education and research excellence.'
  const copyrightText = afsl
    ? '© 2026 Applied Forensic Science Laboratory. All rights reserved.'
    : settings?.copyrightText || '© 2026 Applied Forensic Research Sciences. All Rights Reserved.'

  const columns = afsl
    ? AFSL_COLUMNS
    : (settings?.columns ?? [
        {
          title: 'Quick Links',
          links: [
            { label: 'Home', url: '/' },
            { label: 'About Us', url: '/about' },
            { label: 'Programmes', url: '/courses' },
            { label: 'Services', url: '/services' },
          ],
        },
        {
          title: 'Resources',
          links: [
            { label: 'Notice Board', url: '/notices' },
            { label: 'E-Library', url: '/student-hub' },
            { label: 'Virtual Museum', url: '/gallery' },
          ],
        },
        {
          title: 'Support',
          links: [
            { label: 'Contact Us', url: '/contact' },
            { label: 'Privacy Policy', url: '/privacy' },
            { label: 'Terms of Service', url: '/terms' },
          ],
        },
      ])

  const phone = siteSettings?.phone || '+91-9926692487'
  const email = siteSettings?.email || DEFAULT_AFRS_EMAIL
  const labEmail = siteSettings?.labEmail || DEFAULT_LAB_EMAIL
  const address = siteSettings?.address?.trim() || DEFAULT_SITE_ADDRESS
  const brandLogo = afsl ? afslLogo : logo
  const brandHome = afsl ? '/services' : '/'
  return (
    <footer className="bg-brand text-brand-beige/80">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pt-16 pb-8">
        {/* Main grid */}
        <div
          className={`grid grid-cols-1 gap-10 ${afsl ? 'lg:grid-cols-[1.4fr_1fr_1fr]' : 'lg:grid-cols-[1.4fr_1fr_1fr_1fr]'}`}
        >
          {/* About + socials */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Link
                href={brandHome}
                className="w-10 h-10 bg-gradient-to-br from-brand-maroon to-brand-burgundy rounded-full flex items-center justify-center shadow"
              >
                <Image
                  src={brandLogo}
                  alt={afsl ? 'AFSL Logo' : 'AFRS Logo'}
                  className="object-contain"
                />
              </Link>
              <h4 className="text-white text-base font-bold">{aboutTitle}</h4>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">{aboutDescription}</p>
            {/* {socialItems.length > 0 && ( */}
            <div className="mt-5 flex flex-wrap gap-3">
              <SocialMediaIcons icons={socialMediaLinks?.topBarLeftText3} />
            </div>
            {/* )} */}
          </div>

          {/* Link columns */}
          {columns.map((col, i) => (
            <div key={i}>
              <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
                {col.title}
              </h4>
              <ul className="space-y-2.5 text-sm">
                {(col.links ?? []).map((link, j) => (
                  <li key={j}>
                    <Link href={link.url ?? '#'} className="hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Reach us + map row */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h5 className="text-white font-semibold text-sm mb-4">Reach Us</h5>
            <address className="not-italic text-sm leading-7 space-y-1.5">
              <p className="whitespace-pre-line">{address}</p>
              <p>
                <span className="text-slate-500">Phone: </span>
                <a href={`tel:${phone}`} className="hover:text-white transition">
                  {phone}
                </a>
              </p>
              <p>
                <span className="text-slate-500">Email: </span>
                <a
                  href={`mailto:${afsl ? labEmail : email}`}
                  className="hover:text-white transition"
                >
                  {afsl ? labEmail : email}
                </a>
              </p>
              {afsl ? null : (
                <p>
                  <span className="text-slate-500">Lab Email: </span>
                  <a href={`mailto:${labEmail}`} className="hover:text-white transition">
                    {labEmail}
                  </a>
                </p>
              )}
            </address>
          </div>

          <div className="rounded-2xl border border-white/10 overflow-hidden min-h-[200px] bg-white/5">
            <iframe
              title={afsl ? 'AFSL location map' : 'AFRS location map'}
              src={
                siteSettings?.mapEmbedUrl?.trim() ||
                'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.465245677421!2d75.85528599999999!3d22.7109426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3963029d8d31129b%3A0x8d9fee0077bf145a!2sAPPLIED%20FORENSIC%20RESEARCH%20SCIENCES!5e0!3m2!1sen!2sin!4v1780047411280!5m2!1sen!2sin'
              }
              width="100%"
              height="290"
              style={{ border: 0 }}
              allowFullScreen
              loading="eager"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>{copyrightText}</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-white transition">
              Terms of Conditions
            </Link>
            <Link href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="/notices" className="hover:text-white transition">
              Cookies Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
