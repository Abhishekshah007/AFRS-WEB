import { getPayloadClient } from '@/lib/payload'
import { formatEventDate } from '@/lib/cms'
import type { Event as AfrsEvent } from '@/payload-types'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { PageHero } from '@/components/marketing/PageHero'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notice Board',
  description: 'Official notices, announcements, and updates from AFRS Institute.',
}

const fallbackNotices = [
  { title: 'Admission open for Certificate in Forensic Document Examination 2026 batch', date: '2026-01-15', tag: 'Admission' },
  { title: 'AFSL accepting new forensic case submissions for FY 2026', date: '2026-01-08', tag: 'Service' },
  { title: 'National Forensic Science Day — Student Essay Competition Results', date: '2025-12-20', tag: 'Results' },
  { title: 'MoU signed with State Forensic Science Laboratory', date: '2025-12-01', tag: 'Partnership' },
  { title: 'Workshop on Digital Forensics: Registration Now Open', date: '2025-11-15', tag: 'Event' },
]

const tagColors: Record<string, string> = {
  Admission: 'bg-indigo-100 text-indigo-700',
  Service: 'bg-emerald-100 text-emerald-700',
  Results: 'bg-orange-100 text-orange-700',
  Partnership: 'bg-violet-100 text-violet-700',
  Event: 'bg-blue-100 text-blue-700',
}

export default async function NoticesPage() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'events',
    where: { published: { equals: true } },
    sort: '-startDate',
    limit: 10,
    depth: 0,
    overrideAccess: false,
  })

  const events = docs as AfrsEvent[]

  return (
    <div>
      <PageHero
        eyebrow="OFFICIAL"
        title="Notice Board"
        subtitle="Announcements, admissions, results, and updates from AFRS Institute."
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 py-12 lg:py-16 grid gap-8 lg:grid-cols-[1fr_320px] items-start">
        {/* Main notices */}
        <div>
          <AnimateOnScroll>
            <h2 className="text-xl font-extrabold text-slate-900 mb-6">Latest Announcements</h2>
          </AnimateOnScroll>

          <AnimateOnScroll stagger>
            <ol className="space-y-4">
              {fallbackNotices.map((notice, i) => (
                <li
                  key={i}
                  className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm card-pop"
                >
                  <div className="mt-0.5 h-7 w-7 shrink-0 rounded-lg bg-indigo-600 text-white text-xs font-extrabold flex items-center justify-center">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-bold text-slate-800 leading-snug">{notice.title}</p>
                      <span className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-bold ${tagColors[notice.tag] ?? 'bg-slate-100 text-slate-600'}`}>
                        {notice.tag}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">{notice.date}</p>
                  </div>
                </li>
              ))}
            </ol>
          </AnimateOnScroll>
        </div>

        {/* Sidebar: upcoming events */}
        {events.length > 0 && (
          <AnimateOnScroll direction="right" className="space-y-4">
            <h2 className="text-lg font-extrabold text-slate-900 mb-5">Upcoming Events</h2>
            {events.slice(0, 5).map((evt) => (
              <Link
                key={evt.id}
                href={`/events/${evt.slug}`}
                className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm card-pop"
              >
                <div className="h-10 w-10 shrink-0 rounded-xl bg-indigo-600 text-white flex flex-col items-center justify-center text-[10px] font-extrabold leading-tight">
                  <span className="text-base">{new Date(evt.startDate).getDate()}</span>
                  <span className="uppercase">{new Date(evt.startDate).toLocaleString('en', { month: 'short' })}</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 leading-snug line-clamp-2">{evt.title}</p>
                  {evt.venue && <p className="text-xs text-slate-400 mt-1">📍 {evt.venue}</p>}
                </div>
              </Link>
            ))}
            <Link href="/events" className="block text-sm font-bold text-indigo-600 hover:text-indigo-700 text-center py-2">
              View All Events →
            </Link>
          </AnimateOnScroll>
        )}
      </div>
    </div>
  )
}
