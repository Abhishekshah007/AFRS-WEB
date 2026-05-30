import { Suspense } from 'react'
import { ArticlesHero } from '@/components/student-hub/articles/ArticlesHero'
import { ArticlesStatsBar } from '@/components/student-hub/articles/ArticlesStatsBar'
import { FeaturedArticleCard } from '@/components/student-hub/articles/FeaturedArticleCard'
import { RecentPublicationsSection } from '@/components/student-hub/articles/RecentPublicationsSection'
import { topicFilters } from '@/components/student-hub/articles/content'
import type { ArticleListItem, FeaturedArticle } from '@/components/student-hub/articles/types'
import { studentHubTokens } from '@/components/student-hub/tokens'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import Link from 'next/link'

export type ArticlesPageViewProps = {
  featured: FeaturedArticle | null
  articles: ArticleListItem[]
  currentPage: number
  totalPages: number
  totalPublished: number
  activeTopic: string
  initialQuery?: string
  searchParams: Record<string, string | undefined>
}

/**
 * Forensic Insights & Articles — student hub sub-page layout.
 */
export function ArticlesPageView({
  featured,
  articles,
  currentPage,
  totalPages,
  totalPublished,
  activeTopic,
  initialQuery,
  searchParams,
}: ArticlesPageViewProps) {
  return (
    <div className="student-hub-page articles-page bg-white">
      <Suspense fallback={<div className="articles-hero h-64" aria-hidden />}>
        <ArticlesHero filters={topicFilters} activeTopic={activeTopic} initialQuery={initialQuery} />
      </Suspense>

      {/* Breadcrumb strip */}
      <div className="border-b border-slate-100 bg-white">
        <div className={`${studentHubTokens.container} py-3 text-xs text-slate-500 flex gap-2 items-center`}>
          <Link href="/student-hub" className="hover:text-[var(--articles-primary)]">
            Student Hub
          </Link>
          <span aria-hidden>/</span>
          <span className="font-semibold text-slate-700">Articles</span>
        </div>
      </div>

      {featured && (
        <section className="py-10 md:py-12 bg-white">
          <div className={studentHubTokens.container}>
            <AnimateOnScroll>
              <FeaturedArticleCard article={featured} />
            </AnimateOnScroll>
          </div>
        </section>
      )}

      <RecentPublicationsSection
        articles={articles}
        currentPage={currentPage}
        totalPages={totalPages}
        searchParams={searchParams}
      />

      <ArticlesStatsBar totalPublished={totalPublished} />
    </div>
  )
}
