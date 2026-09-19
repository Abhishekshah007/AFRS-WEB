import Link from 'next/link'
import { formatArticleDate } from '@/components/student-hub/articles/detail/buildArticleDetail'
import { getArticleHref } from '@/components/student-hub/articles/links'
import { formatEventDate } from '@/lib/cms'
import { isSearchQueryValid, normalizeSearchQuery, searchSiteContent } from '@/lib/queries/search'
import { PageHero } from '@/components/marketing/PageHero'
import { buildPageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = buildPageMetadata({
  title: 'Search',
  description: 'Search AFRS articles, events, forensic services and published content.',
  path: '/search',
  index: false,
})

type Props = { searchParams: Promise<{ q?: string }> }

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams
  const query = normalizeSearchQuery(q)

  const { articles, events, services } = isSearchQueryValid(query)
    ? await searchSiteContent(query)
    : { articles: [], events: [], services: [] }

  const hasResults = articles.length > 0 || events.length > 0 || services.length > 0

  return (
    <div>
      <PageHero
        eyebrow="SEARCH"
        title="Find What You Need"
        subtitle="Search articles by title, author, or content — plus events and services."
      />

      <div className="max-w-[860px] mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <form method="GET" action="/search" className="flex gap-3">
          <input
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Search articles, authors, events, services…"
            className="flex-1 h-14 rounded-2xl border border-slate-200 bg-white px-5 text-base outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-300 shadow-sm"
            autoFocus
          />
          <button
            type="submit"
            className="h-14 px-8 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm transition shadow-sm"
          >
            Search
          </button>
        </form>

        {isSearchQueryValid(query) && (
          <div className="mt-10">
            {!hasResults && (
              <p className="text-slate-500 text-center py-12">
                No results found for <strong>&ldquo;{query}&rdquo;</strong>. Try a different
                keyword.
              </p>
            )}

            {articles.length > 0 && (
              <section className="mb-10">
                <h2 className="text-base font-extrabold text-slate-900 mb-5 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  Articles
                </h2>
                <div className="space-y-3">
                  {articles.map((article) => (
                    <Link
                      key={article.id}
                      href={getArticleHref(article.slug)}
                      className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                    >
                      <div className="h-10 w-10 shrink-0 rounded-xl bg-brand-50 flex items-center justify-center text-lg">
                        📰
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 text-sm">{article.title}</p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          By {article.authorName}
                          {article.publishedDate
                            ? ` · ${formatArticleDate(article.publishedDate)}`
                            : ''}
                        </p>
                        {article.excerpt && (
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{article.excerpt}</p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
                {articles.length >= 8 && (
                  <p className="mt-4 text-center">
                    <Link
                      href={`/student-hub/articles?q=${encodeURIComponent(query)}`}
                      className="text-sm font-semibold text-brand-600 hover:text-brand-700"
                    >
                      View all article matches →
                    </Link>
                  </p>
                )}
              </section>
            )}

            {events.length > 0 && (
              <section className="mb-10">
                <h2 className="text-base font-extrabold text-slate-900 mb-5 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  Events
                </h2>
                <div className="space-y-3">
                  {events.map((evt) => (
                    <Link
                      key={evt.id}
                      href={`/events/${evt.slug}`}
                      className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                    >
                      <div className="h-10 w-10 shrink-0 rounded-xl bg-brand-50 flex items-center justify-center text-lg">
                        📅
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{evt.title}</p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {formatEventDate(evt.startDate)}
                        </p>
                        {evt.excerpt && (
                          <p className="text-xs text-slate-500 mt-1 line-clamp-1">{evt.excerpt}</p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {services.length > 0 && (
              <section>
                <h2 className="text-base font-extrabold text-slate-900 mb-5 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  Services
                </h2>
                <div className="space-y-3">
                  {services.map((srv) => (
                    <Link
                      key={srv.id}
                      href={`/services/${srv.slug}`}
                      className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                    >
                      <div className="h-10 w-10 shrink-0 rounded-xl bg-brand-50 flex items-center justify-center text-lg">
                        🔬
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{srv.title}</p>
                        {srv.category && (
                          <p className="text-xs text-slate-400 mt-0.5 capitalize">{srv.category}</p>
                        )}
                        {srv.excerpt && (
                          <p className="text-xs text-slate-500 mt-1 line-clamp-1">{srv.excerpt}</p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {!query && (
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { href: '/student-hub/articles', label: 'Articles', icon: '📰' },
              { href: '/events', label: 'Events', icon: '📅' },
              { href: '/services', label: 'Services', icon: '🔬' },
              { href: '/courses', label: 'Courses', icon: '🎓' },
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
