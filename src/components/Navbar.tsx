'use client'
import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { label: 'Home',                    href: '/' },
  { label: 'About AFRS',              href: '/about' },
  { label: 'Forensic Service AFSL',   href: '/services' },
  { label: 'Student Corner',          href: '/student-hub' },
  { label: 'Forensic Education & Training', href: '/courses' },
  { label: 'Reach Us',                href: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-[6px] border-b border-white/30 shadow-sm">
      {/* Top bar */}
      <div className="bg-slate-900 text-slate-100 text-xs">
        <div className="max-w-7xl mx-auto px-6 py-1.5 flex items-center justify-between">
          <div className="flex gap-5">
            <span>+91-0000000000</span>
            <span>info@afrs.org.in</span>
          </div>
          <div className="flex gap-4">
            <Link href="/events" className="hover:text-white transition-colors">Events</Link>
            <span className="text-slate-300">Language</span>
            <span className="text-slate-300">Notification</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-[1280px] mx-auto px-20 py-4 min-h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs tracking-wide">AF</span>
          </div>
          <div>
            <p className="font-extrabold text-[14px] tracking-[-0.02em] text-slate-900 leading-[14px]">Applied Forensic Research</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.05em] font-bold leading-[15px]">Sciences Institute</p>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-[12px] leading-4 font-bold transition ${
                  link.href === '/' ? 'text-indigo-500' : 'text-slate-600 hover:text-indigo-700'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100"
          onClick={() => setOpen(!open)}
        >
          <div className="w-5 h-0.5 bg-current mb-1" />
          <div className="w-5 h-0.5 bg-current mb-1" />
          <div className="w-5 h-0.5 bg-current" />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm text-slate-700 hover:text-indigo-700 py-2 font-medium"
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