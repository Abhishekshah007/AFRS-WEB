'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import type { HeaderSetting } from '@/payload-types'
import Image from 'next/image'
import logo from '../../public/assets/logo.png'
import { springSnappy } from '@/components/motion/variants'
import SocialMediaIcons from './social/SocialMediaIcons'

const fallbackNavLinks = [
  { label: 'Home', url: '/' },
  { label: 'About AFRS', url: '/about' },
  { label: 'AFSL Forensic Services', url: '/services' },
  { label: 'Student Corner', url: '/student-hub' },
  { label: 'Programmes', url: '/courses' },
  { label: 'Reach Us', url: '/contact' },
]

const fallbackTopLinks = [
  { label: 'Events', url: '/events' },
  { label: 'Language', url: '#' },
  { label: 'Notification', url: '#' },
]

export default function Navbar({ settings }: { settings?: HeaderSetting | null }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = (settings?.navItems?.length ? settings.navItems : fallbackNavLinks).filter(
    (item) => item?.label && item?.url,
  ) as { label: string; url: string }[]

  const topLinks = (settings?.topBarLinks?.length ? settings.topBarLinks : fallbackTopLinks).filter(
    (item) => item?.label && item?.url,
  ) as { label: string; url: string }[]

  const brandTitle = settings?.brandTitle || 'Applied Forensic Research Sciences'
  const topLeftText = settings?.topBarLeftText || '+91-9926692487'
  const topLeftText2 = settings?.topBarLeftText2 || 'afrsciences@gmail.com'
  const topLeftText3 = settings?.topBarLeftText3 || [
    {
      icon: 9,
      label: 'Facebook',
      url: 'https://www.facebook.com/share/1BiD8xBRKc/',
    },
    {
      icon: 10,
      label: 'Instagram',
      url: 'https://instagram.com/afrsciences',
    },
    {
      icon: 11,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/company/afrsciences',
    },
    {
      icon: 12,
      label: 'Twitter',
      url: 'https://twitter.com/afrsciences',
    },
    {
      icon: 13,
      label: 'YouTube',
      url: 'https://www.youtube.com/c/AppliedforensicscienceforjusticeStudentGroup/videos',
    },
    {
      icon: 14,
      label: 'WhatsApp',
      url: 'https://api.whatsapp.com/send/?phone=9926692487&text&type=phone_number&app_absent=0',
    },
    {
      icon: 15,
      label: 'Telegram',
      url: 'https://t.me/afsjstudent',
    },
  ]

  const topBarEnabled = settings?.topBarEnabled ?? true

  return (
    <header className="sticky top-0 z-50">
      {topBarEnabled && (
        <div className="bg-[#0a0f1e] text-slate-300 text-xs border-b border-white/5">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 py-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              <span className="hover:text-white transition-colors">{topLeftText}</span>
              <span className="hover:text-white transition-colors">{topLeftText2}</span>
              <div className="flex gap-2">
                <SocialMediaIcons icons={settings?.topBarLeftText3} />
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              {topLinks.map((link) => (
                <Link
                  key={`${link.label}-${link.url}`}
                  href={link.url}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <motion.nav
        className={`max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 py-3 min-h-[68px] flex items-center justify-between gap-4 transition-all duration-300 ${
          scrolled
            ? 'bg-white/72 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_8px_32px_-8px_rgba(15,23,42,0.12)]'
            : 'bg-white/95 border-b border-slate-100'
        }`}
      >
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <motion.div
            whileHover={{ scale: 1.06, rotate: 3 }}
            transition={springSnappy}
            className="w-11 h-11 bg-gradient-to-br from-indigo-500 via-violet-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/25"
          >
            <Image src={logo} alt="AFRS Logo" width={44} height={44} className="rounded-full" />
          </motion.div>
          <div className="hidden sm:block">
            {pathname === '/services' ? (
              <p className="font-extrabold text-sm text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                Applied Forensic Science Laboratory
              </p>
            ) : (
              <p className="font-extrabold text-sm text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                {brandTitle}
              </p>
            )}
          </div>
        </Link>

        <ul className="hidden xl:flex items-center gap-1 lg:gap-2 flex-1 justify-center">
          {navLinks.map((link) => {
            const active =
              pathname === link.url || (link.url !== '/' && pathname.startsWith(link.url))
            return (
              <li key={link.url} className="relative">
                <Link
                  href={link.url}
                  className={`relative block px-3 py-2 text-[11px] lg:text-xs font-bold whitespace-nowrap transition-colors rounded-lg ${
                    active
                      ? 'text-indigo-600'
                      : 'text-slate-600 hover:text-indigo-700 hover:bg-indigo-50/80'
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-lg bg-indigo-50 -z-10"
                      transition={springSnappy}
                    />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={springSnappy}
          >
            <Link
              href="/search"
              aria-label="Search"
              className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                />
              </svg>
            </Link>
          </motion.div>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="xl:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
            onClick={() => setOpen(!open)}
          >
            <div
              className={`w-5 h-0.5 bg-current mb-1.5 transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`}
            />
            <div
              className={`w-5 h-0.5 bg-current mb-1.5 transition-opacity ${open ? 'opacity-0' : ''}`}
            />
            <div
              className={`w-5 h-0.5 bg-current transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </div>
      </motion.nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="xl:hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto shadow-xl"
        >
          {navLinks.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className={`block text-sm py-2.5 px-3 font-medium rounded-xl transition ${
                pathname === link.url
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-slate-700 hover:text-indigo-700 hover:bg-slate-50'
              }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      )}
    </header>
  )
}
