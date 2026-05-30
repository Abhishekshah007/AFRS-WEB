'use client'

import Link from 'next/link'
import { useState } from 'react'

export function HeroInquiryCard({ services }: { services: { title: string; slug: string }[] }) {
  const [selected, setSelected] = useState(services[0]?.slug ?? '')

  return (
    <div className="afsl-hero-card float-soft w-full max-w-[400px] lg:ml-auto rounded-[24px] border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-md">
      <p className="text-[11px] font-bold uppercase tracking-widest text-white/70">Quick forensic inquiry</p>
      <label className="mt-4 block text-xs font-semibold text-white/90">
        Select a Service
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="mt-2 w-full h-12 rounded-xl border border-white/25 bg-white/95 px-4 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-violet-400/50"
        >
          {services.length === 0 ? (
            <option value="">General inquiry</option>
          ) : (
            services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))
          )}
        </select>
      </label>
      <Link
        href={selected ? `/contact?service=${encodeURIComponent(selected)}` : '/contact'}
        className="mt-4 flex h-12 w-full items-center justify-center rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] text-sm font-bold text-white shadow-lg shadow-violet-900/40 transition"
      >
        Get Forensic Inquiry →
      </Link>
      <p className="mt-3 text-center text-[10px] text-white/50">Response within 24 business hours</p>
    </div>
  )
}
