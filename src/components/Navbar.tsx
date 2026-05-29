'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import type { HeaderSetting } from '@/payload-types'
import Image from 'next/image'
import logo from '../../public/assets/logo.png'
const fallbackNavLinks = [
  { label: 'Home', url: '/' },
  { label: 'About AFRS', url: '/about' },
  { label: 'Forensic Service AFSL', url: '/services' },
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
  const pathname = usePathname()

  const navLinks = (settings?.navItems?.length ? settings.navItems : fallbackNavLinks).filter(
    (item) => item?.label && item?.url,
  ) as { label: string; url: string }[]

  const topLinks = (settings?.topBarLinks?.length ? settings.topBarLinks : fallbackTopLinks).filter(
    (item) => item?.label && item?.url,
  ) as { label: string; url: string }[]

  const brandTitle = settings?.brandTitle || 'Applied Forensic Research Sciences'
  // const brandSubtitle = settings?.brandSubtitle || 'Forensic Education Institute'
  const topLeftText = settings?.topBarLeftText || '+91-9926692487'
  const topLeftText2 = settings?.topBarLeftText2 || 'afrsciences@gmail.com'
  const topBarEnabled = settings?.topBarEnabled ?? true

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-100">
      {topBarEnabled && (
        <div className="bg-[#0f172a] text-slate-200 text-xs">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 py-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              <span>{topLeftText}</span>
              <span>{topLeftText2}</span>
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

      <nav className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 py-3 min-h-[68px] flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
            <Image src={logo} alt="AFRS Logo" width={44} height={44} />
          </div>
          <div className="hidden sm:block">
            <p className="font-extrabold text-sm text-slate-900 leading-tight">{brandTitle}</p>
            {/* <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">{brandSubtitle}</p> */}
          </div>
        </Link>

        <ul className="hidden xl:flex items-center gap-5 lg:gap-6 flex-1 justify-center">
          {navLinks.map((link) => {
            const active = pathname === link.url
            return (
              <li key={link.url}>
                <Link
                  href={link.url}
                  className={`text-[11px] lg:text-xs font-bold whitespace-nowrap transition-colors ${
                    active ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-700'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            aria-label="Search"
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition"
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
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="xl:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            onClick={() => setOpen(!open)}
          >
            <div className="w-5 h-0.5 bg-current mb-1.5" />
            <div className="w-5 h-0.5 bg-current mb-1.5" />
            <div className="w-5 h-0.5 bg-current" />
          </button>
        </div>
      </nav>

      {open && (
        <div className="xl:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className="block text-sm text-slate-700 hover:text-indigo-700 py-2.5 font-medium border-b border-slate-50 last:border-0"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
