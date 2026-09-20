import Link from 'next/link'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import type { HomeNoticeBoardItem } from '@/lib/queries/home-content'
import { CONTAINER, SECTION } from './constants'
import type { SectionText } from './types'

export function LatestNewsSection({
  items,
  sectionText,
}: {
  items: HomeNoticeBoardItem[]
  sectionText?: SectionText
}) {
  return (
    <section className={`${SECTION} bg-white section-glow-top`} id="noticeBoard">
      <div className={`${CONTAINER} max-w-3xl`}>
        <SectionHeader
          title={sectionText?.noticeBoardHeading || 'Notice Board'}
          subtitle={
            sectionText?.noticeBoardDescription ||
            'Stay updated with AFRS announcements and publications.'
          }
        />
        <AnimateOnScroll>
          <ul className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-5 hover:bg-slate-50 transition"
              >
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{item.title}</p>
                  <p className="text-xs text-slate-400 mt-1">{item.date}</p>
                </div>
                <Link
                  href={item.href}
                  className="text-sm font-bold text-brand-600 hover:text-brand-700 shrink-0"
                >
                  Read More →
                </Link>
              </li>
            ))}
          </ul>
        </AnimateOnScroll>
        <p className="mt-4 text-center">
          <Link href="/notices" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
            View all notices →
          </Link>
        </p>
      </div>
    </section>
  )
}
