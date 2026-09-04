import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { fetchActiveEvents } from '@/lib/queries/events'
import { formatEventDate } from '@/lib/cms'
import type { Event as AfrsEvent } from '@/payload-types'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { PageHero } from '@/components/marketing/PageHero'
import { buildPageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'
import { EventHubCard } from '@/components/programmes/EventHubCard'
import { mapEventToHubCard } from '@/components/programmes/mapEvent'
import { SiteGallerySection } from '@/components/gallery/SiteGallerySection'
import { getFeaturedGalleryItems } from '@/lib/queries/gallery'

export const metadata: Metadata = buildPageMetadata({
  title: 'Forensic Science Events',
  description:
    'Upcoming AFRS forensic science workshops, training programmes, conferences and faculty development events.',
  path: '/events',
})

export default async function EventsPage() {
  const payload = await getPayloadClient()

  const [upcoming, past, galleryItems] = await Promise.all([
    fetchActiveEvents(payload, { limit: 9, depth: 1 }),
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
    getFeaturedGalleryItems(4),
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
                    ? 'bg-brand-600 text-white shadow-sm'
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
              <Link href="/contact" className="text-brand-600 font-semibold">contact us</Link>.
            </p>
          ) : (
            <AnimateOnScroll stagger>
              <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
                {upcoming.docs.map((e, index) => (
                  <EventHubCard key={e.id} event={mapEventToHubCard(e as AfrsEvent, index)} />
                ))}
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

      <SiteGallerySection items={galleryItems} className="bg-white" />
    </div>
  )
}


