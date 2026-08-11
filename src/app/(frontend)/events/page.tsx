import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { formatEventDate, formatEventType, resolveMediaUrl } from '@/lib/cms'
import type { Event as AfrsEvent, Media } from '@/payload-types'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { PageHero } from '@/components/marketing/PageHero'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Upcoming Events',
  description: 'Register for AFRS forensic science workshops, webinars, training sessions, and conferences.',
}

import { FALLBACK_BANNER_IMAGE } from '@/lib/constants/assets'

const typeColors: Record<string, string> = {
  workshop: 'bg-indigo-100 text-indigo-700',
  webinar: 'bg-violet-100 text-violet-700',
  conference: 'bg-orange-100 text-orange-700',
  training: 'bg-emerald-100 text-emerald-700',
}

export default async function EventsPage() {
  const payload = await getPayloadClient()

  const [upcoming, past] = await Promise.all([
    payload.find({
      collection: 'events',
      where: {
        and: [
          { published: { equals: true } },
          { startDate: { greater_than_equal: new Date().toISOString() } },
        ],
      },
      sort: 'startDate',
      limit: 9,
      depth: 1,
      overrideAccess: false,
    }),
    payload.find({
      collection: 'events',
      where: {
        and: [
          { published: { equals: true } },
          { startDate: { less_than: new Date().toISOString() } },
        ],
      },
      sort: '-startDate',
      limit: 3,
      depth: 1,
      overrideAccess: false,
    }),
  ])

  return (
    <div>
      <PageHero
        eyebrow="AFRS EDUCATION"
        title="Forensic Programmes & Events"
        subtitle="Advance your career with structured workshops, webinars, and certification programmes."
        primaryCta={{ label: 'Register for Training', href: '/courses' }}
        secondaryCta={{ label: 'Contact Us', href: '/contact' }}
      />

      {/* Filter tabs – static UI, ready to wire to search params */}
      <div className="bg-white border-b border-slate-100 sticky top-[68px] z-40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex gap-1 py-2 overflow-x-auto no-scrollbar">
            {['All Events', 'Workshop', 'Webinar', 'Training', 'Conference'].map((tab, i) => (
              <span
                key={tab}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold cursor-pointer transition ${
                  i === 0
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                {tab}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16">
          <AnimateOnScroll>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-10">Upcoming Events</h2>
          </AnimateOnScroll>

          {upcoming.docs.length === 0 ? (
            <p className="text-slate-400 text-center py-12">
              No upcoming events right now — check back soon or{' '}
              <Link href="/contact" className="text-indigo-600 font-semibold">contact us</Link>.
            </p>
          ) : (
            <AnimateOnScroll stagger>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {upcoming.docs.map((e) => {
                  const evt = e as AfrsEvent
                  const banner = resolveMediaUrl(evt.banner as number | Media | null | undefined, FALLBACK_BANNER_IMAGE)
                  const typeClass = typeColors[evt.eventType ?? ''] ?? 'bg-slate-100 text-slate-600'

                  return (
                    <article key={evt.id} className="rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-sm card-pop group">
                      <div className="relative h-48 bg-slate-100 overflow-hidden">
                        <Image
                          src={banner}
                          alt={evt.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {evt.eventType && (
                          <span className={`absolute top-3 left-3 rounded-full px-3 py-1 text-[10px] font-bold ${typeClass}`}>
                            {formatEventType(evt.eventType)}
                          </span>
                        )}
                        {evt.mode && (
                          <span className="absolute top-3 right-3 rounded-full bg-slate-900/70 text-white px-3 py-1 text-[10px] font-bold capitalize">
                            {evt.mode}
                          </span>
                        )}
                      </div>

                      <div className="p-6">
                        <p className="text-xs text-indigo-600 font-semibold">{formatEventDate(evt.startDate)}</p>
                        <h3 className="mt-2 font-extrabold text-slate-900 text-lg leading-snug group-hover:text-indigo-600 transition-colors">
                          {evt.title}
                        </h3>
                        {evt.venue && <p className="mt-1 text-xs text-slate-400">📍 {evt.venue}</p>}
                        {evt.excerpt && (
                          <p className="mt-3 text-sm text-slate-500 leading-relaxed line-clamp-2">{evt.excerpt}</p>
                        )}
                        {evt.registrationCategories && evt.registrationCategories.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {evt.registrationCategories.map((cat) => (
                              <span key={cat.id} className="text-[10px] font-bold rounded-full bg-slate-50 border border-slate-200 px-3 py-1 text-slate-600">
                                {cat.categoryName} {cat.price ? `₹${cat.price}` : ''}
                              </span>
                            ))}
                          </div>
                        )}
                        <Link
                          href={evt.registrationOpen === false ? `/events/${evt.slug}` : `/events/${evt.slug}/register`}
                          className={`mt-5 block text-center py-2.5 rounded-xl text-sm font-bold transition ${
                            evt.registrationOpen === false
                              ? 'bg-slate-100 text-slate-500 cursor-not-allowed'
                              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                          }`}
                        >
                          {evt.registrationOpen === false ? 'Registration Closed' : 'Register Now →'}
                        </Link>
                      </div>
                    </article>
                  )
                })}
              </div>
            </AnimateOnScroll>
          )}
        </div>
      </section>

      {/* Past events */}
      {past.docs.length > 0 && (
        <section className="py-12 bg-slate-50/70">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16">
            <AnimateOnScroll>
              <h2 className="text-xl font-extrabold text-slate-900 mb-8">Past Events</h2>
            </AnimateOnScroll>
            <AnimateOnScroll stagger>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {past.docs.map((e) => {
                  const evt = e as AfrsEvent
                  return (
                    <Link key={evt.id} href={`/events/${evt.slug}`} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm card-pop flex gap-4 items-start">
                      <div className="h-12 w-12 shrink-0 rounded-xl bg-slate-100 flex items-center justify-center text-xl">📅</div>
                      <div>
                        <p className="text-xs text-slate-400">{formatEventDate(evt.startDate)}</p>
                        <p className="mt-1 font-bold text-slate-800 text-sm line-clamp-2">{evt.title}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      )}
    </div>
  )
}


