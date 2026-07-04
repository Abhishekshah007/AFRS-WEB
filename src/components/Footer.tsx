import Link from 'next/link'
import type { FooterSetting, SiteSetting } from '@/payload-types'
import Image from 'next/image'
import logo from '../../public/assets/logo.png'
import SocialMediaIcons from './social/SocialMediaIcons'
import type { HeaderSetting } from '@/payload-types'
export default function Footer({
  socialMediaLinks,
  settings,
  siteSettings,
}: {
  settings?: FooterSetting | null
  siteSettings?: SiteSetting | null
  socialMediaLinks?: HeaderSetting | null
}) {
  const aboutTitle = settings?.aboutTitle || 'AFRS Institute'
  const aboutDescription =
    settings?.aboutDescription ||
    'Dedicated to advancing the frontiers of forensic science through education and research excellence.'
  const copyrightText =
    settings?.copyrightText || '© 2026 Applied Forensic Research Sciences. All Rights Reserved.'

  const columns = settings?.columns ?? [
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
  ]

  const phone = siteSettings?.phone || '+91-9926692487'
  const email = siteSettings?.email || 'afrsciences@gmail.com'
  const address = siteSettings?.address || 'AFRS Campus, India'
  return (
    <footer className="bg-[#0a0f1a] text-slate-400">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pt-16 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
          {/* About + socials */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center shadow">
                <Image src={logo} alt="AFRS Logo" className="object-contain" />
              </div>
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
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <h5 className="text-white font-semibold text-sm mb-4">Reach Us</h5>
            <address className="not-italic text-sm leading-7 space-y-1.5">
              <p>{address}</p>
              <p>
                <span className="text-slate-500">Phone: </span>
                <a href={`tel:${phone}`} className="hover:text-white transition">
                  {phone}
                </a>
              </p>
              <p>
                <span className="text-slate-500">Email: </span>
                <a href={`mailto:${email}`} className="hover:text-white transition">
                  {email}
                </a>
              </p>
            </address>
          </div>

          <div className="rounded-2xl border border-slate-800 overflow-hidden min-h-[200px] bg-slate-900/50">
            <iframe
              title="AFRS location map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.465245677421!2d75.85528599999999!3d22.7109426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3963029d8d31129b%3A0x8d9fee0077bf145a!2sAPPLIED%20FORENSIC%20RESEARCH%20SCIENCES!5e0!3m2!1sen!2sin!4v1780047411280!5m2!1sen!2sin"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
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
