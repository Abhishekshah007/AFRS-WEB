import type { ArticleListItem } from '@/components/student-hub/articles/types'
import { ArticleCard } from '@/components/student-hub/articles/ArticleCard'
import { ArticlesPagination } from '@/components/student-hub/articles/ArticlesPagination'
import { studentHubTokens } from '@/components/student-hub/tokens'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

export type RecentPublicationsSectionProps = {
  articles: ArticleListItem[]
  currentPage: number
  totalPages: number
  searchParams: Record<string, string | undefined>
}

/**
 * Recent publications grid with optional grid/list toggle UI (grid default).
 */
export function RecentPublicationsSection({
  articles,
  currentPage,
  totalPages,
  searchParams,
}: RecentPublicationsSectionProps) {
  return (
    <section className={`${studentHubTokens.sectionY} bg-white`} aria-labelledby="recent-publications-heading">
      <div className={studentHubTokens.container}>
        <AnimateOnScroll>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-lg" aria-hidden>
                ▦
              </span>
              <h2 id="recent-publications-heading" className={`${studentHubTokens.heading} text-xl sm:text-2xl`}>
                Recent Publications
              </h2>
            </div>
            <div className="flex gap-2" role="group" aria-label="Layout view">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--articles-primary)] text-white text-sm font-bold">
                ▦
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 text-sm">
                ☰
              </span>
            </div>
          </div>
        </AnimateOnScroll>

        {articles.length === 0 ? (
          <p className="text-center text-slate-500 py-16">No articles match your search. Try another topic or keyword.</p>
        ) : (
          <AnimateOnScroll stagger>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {articles.map((article) => (
                <li key={article.id}>
                  <ArticleCard article={article} />
                </li>
              ))}
            </ul>
          </AnimateOnScroll>
        )}

        <ArticlesPagination
          currentPage={currentPage}
          totalPages={totalPages}
          searchParams={searchParams}
        />
      </div>
    </section>
  )
}
