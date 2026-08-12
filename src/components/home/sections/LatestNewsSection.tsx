import Link from 'next/link'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { CONTAINER, SECTION } from './constants'

export function LatestNewsSection() {
  const items = [
    {
      title: 'New batch for Digital Forensics certification opens soon',
      date: 'May 2026',
      href: '/articles',
    },
    {
      title: 'AFRS partners with leading universities for internship programs',
      date: 'Apr 2026',
      href: '/articles',
    },
    {
      title: 'Workshop on questioned document examination — registration live',
      date: 'Mar 2026',
      href: '/events',
    },
  ]

  return (
    <section className={`${SECTION} bg-white section-glow-top`}>
      <div className={`${CONTAINER} max-w-3xl`}>
        <SectionHeader
          title="Notice Board"
          subtitle="Stay updated with AFRS announcements and publications."
        />
        <AnimateOnScroll>
          <ul className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
            {items.map((item) => (
              <li
                key={item.title}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-5 hover:bg-slate-50 transition"
              >
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{item.title}</p>
                  <p className="text-xs text-slate-400 mt-1">{item.date}</p>
                </div>
                <Link
                  href={item.href}
                  className="text-sm font-bold text-indigo-600 hover:text-indigo-700 shrink-0"
                >
                  Read More →
                </Link>
              </li>
            ))}
          </ul>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
