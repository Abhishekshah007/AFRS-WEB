import Link from 'next/link'
import type {
  ArticleDetailData,
  RelatedArticlePreview,
} from '@/components/student-hub/articles/detail/types'
import type { ArticleListItem } from '@/components/student-hub/articles/types'
import { ArticleBody } from '@/components/student-hub/articles/detail/ArticleBody'
import { ArticleDetailHero } from '@/components/student-hub/articles/detail/ArticleDetailHero'
import { AuthorBioCard } from '@/components/student-hub/articles/detail/AuthorBioCard'
import { ReadNextSection } from '@/components/student-hub/articles/detail/ReadNextSection'
import { RelatedArticlesSidebar } from '@/components/student-hub/articles/detail/RelatedArticlesSidebar'
import { TableOfContents } from '@/components/student-hub/articles/detail/TableOfContents'
import { studentHubTokens } from '@/components/student-hub/tokens'

export type ArticleDetailViewProps = {
  article: ArticleDetailData
  related: RelatedArticlePreview[]
  nextArticle: ArticleListItem | null
}

/**
 * Two-column article detail layout — matches screenshot exactly.
 * Left: full article card (hero → body → author bio)
 * Right sticky sidebar: ToC + Related Articles
 * Below: Read Next section
 */
export function ArticleDetailView({ article, related, nextArticle }: ArticleDetailViewProps) {
  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      {/* ── Breadcrumb bar ─────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-100">
        <nav
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-slate-400"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-[var(--articles-primary)] transition-colors">
            Home
          </Link>
          <span className="text-slate-300" aria-hidden>
            /
          </span>
          <Link
            href="/student-hub"
            className="hover:text-[var(--articles-primary)] transition-colors"
          >
            Student Corner
          </Link>
          <span className="text-slate-300" aria-hidden>
            /
          </span>
          <Link
            href="/student-hub/articles"
            className="hover:text-[var(--articles-primary)] transition-colors"
          >
            Articles
          </Link>
          <span className="text-slate-300" aria-hidden>
            /
          </span>
          <span className="font-medium text-slate-600 line-clamp-1 max-w-[180px] sm:max-w-sm lg:max-w-lg">
            {article.title}
          </span>
        </nav>
      </div>

      {/* ── Main content ───────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_320px] gap-8 items-start">
          {/* ── Left: Article card ─────────────────────────────── */}
          <article className="min-w-0 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {/* Hero (image + title + meta) */}
            <div className="px-6 sm:px-8 lg:px-10 pt-8">
              <ArticleDetailHero article={article} />
            </div>

            {/* Divider */}
            <div className="mt-6 border-t border-slate-100" />

            {/* Body prose */}
            <div className="px-6 sm:px-8 lg:px-10 py-8">
              <ArticleBody article={article} />
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100" />

            {/* Author bio */}
            <div className="px-6 sm:px-8 lg:px-10 py-8">
              <AuthorBioCard article={article} />
            </div>
          </article>

          {/* ── Right: Sticky sidebar ──────────────────────────── */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-24 self-start">
            {/* Table of contents */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              {/* Sidebar section header style */}
              <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-100">
                <span className="h-1 w-4 rounded-full bg-[var(--articles-primary)]" aria-hidden />
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Contents
                </h2>
              </div>
              <div className="px-5 py-4">
                <TableOfContents sections={article.sections} />
              </div>
            </div>

            {/* Related articles */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-100">
                <span className="h-1 w-4 rounded-full bg-[var(--articles-primary)]" aria-hidden />
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Related Articles
                </h2>
              </div>
              <div className="px-5 py-4">
                <RelatedArticlesSidebar articles={related} />
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ── Read Next ──────────────────────────────────────────── */}
      <ReadNextSection nextArticle={nextArticle} />
    </div>
  )
}
