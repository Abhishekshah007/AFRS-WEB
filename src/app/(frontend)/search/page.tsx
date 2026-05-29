import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { formatEventDate } from '@/lib/cms'
import type { Event as AfrsEvent, Service } from '@/payload-types'
import { PageHero } from '@/components/marketing/PageHero'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search for events, services, and content across the AFRS website.',
}

type Props = { searchParams: Promise<{ q?: string }> }

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams
  const query = (q ?? '').trim()

  let events: AfrsEvent[] = []
  let services: Service[] = []

  if (query.length >= 2) {
    const payload = await getPayloadClient()
    const [eventsResult, servicesResult] = await Promise.all([
      payload.find({
        collection: 'events',
        where: {
          and: [
            { published: { equals: true } },
            { title: { contains: query } },
          ],
        },
        limit: 5,
        depth: 0,
        overrideAccess: false,
      }),
      payload.find({
        collection: 'services',
        where: {
          and: [
            { published: { equals: true } },
            { title: { contains: query } },
          ],
        },
        limit: 5,
        depth: 0,
        overrideAccess: false,
      }),
    ])
    events = eventsResult.docs as AfrsEvent[]
    services = servicesResult.docs as Service[]
  }

  const hasResults = events.length > 0 || services.length > 0

  return (
    <div>
      <PageHero
        eyebrow="SEARCH"
        title="Find What You Need"
        subtitle="Search across events, services, articles, and resources."
      />

      <div className="max-w-[860px] mx-auto px-4 sm:px-6 py-12 lg:py-16">
        {/* Search form */}
        <form method="GET" action="/search" className="flex gap-3">
          <input
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Search events, services, topics…"
            className="flex-1 h-14 rounded-2xl border border-slate-200 bg-white px-5 text-base outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 shadow-sm"
            autoFocus
          />
          <button
            type="submit"
            className="h-14 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition shadow-sm"
          >
            Search
          </button>
        </form>

        {/* Results */}
        {query.length >= 2 && (
          <div className="mt-10">
            {!hasResults && (
              <p className="text-slate-500 text-center py-12">
                No results found for <strong>&ldquo;{query}&rdquo;</strong>. Try a different keyword.
              </p>
            )}

            {events.length > 0 && (
              <section className="mb-10">
                <h2 className="text-base font-extrabold text-slate-900 mb-5 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  Events
                </h2>
                <div className="space-y-3">
                  {events.map((evt) => (
                    <Link
                      key={evt.id}
                      href={`/events/${evt.slug}`}
                      className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                    >
                      <div className="h-10 w-10 shrink-0 rounded-xl bg-indigo-50 flex items-center justify-center text-lg">📅</div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{evt.title}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{formatEventDate(evt.startDate)}</p>
                        {evt.excerpt && <p className="text-xs text-slate-500 mt-1 line-clamp-1">{evt.excerpt}</p>}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {services.length > 0 && (
              <section>
                <h2 className="text-base font-extrabold text-slate-900 mb-5 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                  Services
                </h2>
                <div className="space-y-3">
                  {services.map((srv) => (
                    <Link
                      key={srv.id}
                      href={`/services/${srv.slug}`}
                      className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                    >
                      <div className="h-10 w-10 shrink-0 rounded-xl bg-violet-50 flex items-center justify-center text-lg">🔬</div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{srv.title}</p>
                        {srv.category && <p className="text-xs text-slate-400 mt-0.5 capitalize">{srv.category}</p>}
                        {srv.excerpt && <p className="text-xs text-slate-500 mt-1 line-clamp-1">{srv.excerpt}</p>}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* Quick links when no search */}
        {!query && (
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { href: '/events', label: 'Events', icon: '📅' },
              { href: '/services', label: 'Services', icon: '🔬' },
              { href: '/courses', label: 'Courses', icon: '🎓' },
              { href: '/gallery', label: 'Gallery', icon: '🖼' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-slate-100 bg-white p-6 text-center card-pop"
              >
                <span className="text-2xl">{item.icon}</span>
                <p className="mt-2 text-sm font-bold text-slate-700">{item.label}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
