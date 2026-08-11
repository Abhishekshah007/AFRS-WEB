import { getPayloadClient } from '@/lib/payload'
import { formatEventDate } from '@/lib/cms'
import type { Event as AfrsEvent, Notice } from '@/payload-types'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { PageHero } from '@/components/marketing/PageHero'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notice Board',
  description: 'Official notices, announcements, and updates from AFRS Institute.',
}

const tagColors: Record<string, string> = {
  Admission: 'bg-indigo-100 text-indigo-700',
  Service: 'bg-emerald-100 text-emerald-700',
  Results: 'bg-orange-100 text-orange-700',
  Partnership: 'bg-violet-100 text-violet-700',
  Event: 'bg-blue-100 text-blue-700',
  General: 'bg-slate-100 text-slate-600',
}

function formatNoticeDate(value?: string | null) {
  if (!value) return ''
  return new Date(value).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default async function NoticesPage() {
  const payload = await getPayloadClient()
  const [{ docs: noticeDocs }, { docs: eventDocs }] = await Promise.all([
    payload.find({
      collection: 'notices',
      where: { published: { equals: true } },
      sort: ['-noticeDate', 'order'],
      limit: 20,
      depth: 0,
      overrideAccess: false,
    }),
    payload.find({
      collection: 'events',
      where: { published: { equals: true } },
      sort: '-startDate',
      limit: 6,
      depth: 0,
      overrideAccess: false,
    }),
  ])

  const notices = noticeDocs as Notice[]
  const events = eventDocs as AfrsEvent[]

  return (
    <div>
      <PageHero
        eyebrow="OFFICIAL"
        title="Notice Board"
        subtitle="Announcements, admissions, results, and updates from AFRS Institute."
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 py-12 lg:py-16 grid gap-8 lg:grid-cols-[1fr_320px] items-start">
        <div>
          <AnimateOnScroll>
            <h2 className="text-xl font-extrabold text-slate-900 mb-6">Latest Announcements</h2>
          </AnimateOnScroll>

          {notices.length === 0 ? (
            <p className="text-sm text-slate-500">
              No notices published yet. Add announcements from the CMS under Content → Notices.
            </p>
          ) : (
            <AnimateOnScroll stagger>
              <ol className="space-y-4">
                {notices.map((notice, i) => (
                  <li
                    key={notice.id}
                    className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm card-pop"
                  >
                    <div className="mt-0.5 h-7 w-7 shrink-0 rounded-lg bg-indigo-600 text-white text-xs font-extrabold flex items-center justify-center">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        {notice.href ? (
                          <Link href={notice.href} className="text-sm font-bold text-slate-800 leading-snug hover:text-indigo-600">
                            {notice.title}
                          </Link>
                        ) : (
                          <p className="text-sm font-bold text-slate-800 leading-snug">{notice.title}</p>
                        )}
                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-bold ${tagColors[notice.tag ?? 'General'] ?? tagColors.General}`}
                        >
                          {notice.tag}
                        </span>
                      </div>
                      {notice.summary ? (
                        <p className="mt-2 text-sm text-slate-600">{notice.summary}</p>
                      ) : null}
                      <p className="mt-1 text-xs text-slate-400">{formatNoticeDate(notice.noticeDate)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </AnimateOnScroll>
          )}
        </div>

        <aside className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-extrabold text-slate-900">Upcoming Events</h3>
          <ul className="mt-4 space-y-3">
            {events.map((event) => (
              <li key={event.id} className="text-sm">
                <Link href={`/events/${event.slug}`} className="font-semibold text-slate-800 hover:text-indigo-600">
                  {event.title}
                </Link>
                <p className="text-xs text-slate-400 mt-0.5">{formatEventDate(event.startDate)}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  )
}
