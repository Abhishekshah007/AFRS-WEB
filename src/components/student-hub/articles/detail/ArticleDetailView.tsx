import Link from 'next/link'
import type { ArticleDetailData, RelatedArticlePreview } from '@/components/student-hub/articles/detail/types'
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
 * Two-column article detail layout under Student Hub.
 */
export function ArticleDetailView({ article, related, nextArticle }: ArticleDetailViewProps) {
  return (
    <div className="student-hub-page articles-page min-h-screen bg-[#f8f9fc]">
      <div className="border-b border-slate-100 bg-white">
        <nav
          className={`${studentHubTokens.container} py-3 text-xs text-slate-500 flex flex-wrap gap-x-2 gap-y-1`}
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-[var(--articles-primary)]">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link href="/student-hub" className="hover:text-[var(--articles-primary)]">
            Student Corner
          </Link>
          <span aria-hidden>/</span>
          <Link href="/student-hub/articles" className="hover:text-[var(--articles-primary)]">
            Articles
          </Link>
          <span aria-hidden>/</span>
          <span className="font-semibold text-slate-700 line-clamp-1 max-w-[200px] sm:max-w-md">{article.title}</span>
        </nav>
      </div>

      <div className={`${studentHubTokens.container} py-10 md:py-14`}>
        <div className="grid gap-10 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] items-start">
          <article className="min-w-0 rounded-2xl bg-white border border-slate-100 shadow-sm p-6 sm:p-8 lg:p-10">
            <ArticleDetailHero article={article} />
            <ArticleBody article={article} />
            <AuthorBioCard article={article} />
          </article>

          <aside className="space-y-6 lg:sticky lg:top-24">
            <TableOfContents sections={article.sections} />
            <RelatedArticlesSidebar articles={related} />
          </aside>
        </div>
      </div>

      <ReadNextSection nextArticle={nextArticle} />
    </div>
  )
}
