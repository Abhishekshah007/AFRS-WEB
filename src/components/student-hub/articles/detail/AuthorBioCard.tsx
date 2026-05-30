import Link from 'next/link'
import Image from 'next/image'
import type { ArticleDetailData } from '@/components/student-hub/articles/detail/types'
import { studentHubTokens } from '@/components/student-hub/tokens'

export type AuthorBioCardProps = {
  article: ArticleDetailData
}

/**
 * Author biography card below the article body.
 */
export function AuthorBioCard({ article }: AuthorBioCardProps) {
  return (
    <aside
      className={`mt-10 ${studentHubTokens.radiusCard} border border-slate-100 bg-slate-50/80 p-6 sm:p-8 shadow-sm`}
      aria-labelledby="author-bio-heading"
    >
      <div className="flex gap-4">
        <div className="h-14 w-14 shrink-0 rounded-full bg-[var(--articles-accent)] text-white flex items-center justify-center text-xl font-bold overflow-hidden">
          {article.authorAvatarUrl ? (
            <Image src={article.authorAvatarUrl} alt="" width={56} height={56} className="h-full w-full object-cover" />
          ) : (
            article.authorName.charAt(0)
          )}
        </div>
        <div>
          <h2 id="author-bio-heading" className="text-lg font-extrabold text-slate-900">
            About {article.authorName}
          </h2>
          {article.authorTitle && (
            <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-[var(--articles-primary)]">
              {article.authorTitle}
            </p>
          )}
          <p className={`mt-3 text-sm ${studentHubTokens.body}`}>{article.authorBio}</p>
          <Link
            href={`/student-hub/articles?q=${encodeURIComponent(article.authorName)}`}
            className={`mt-4 inline-block ${studentHubTokens.linkCta}`}
          >
            View All Articles <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </aside>
  )
}
