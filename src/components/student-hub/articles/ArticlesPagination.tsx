import Link from 'next/link'

export type ArticlesPaginationProps = {
  currentPage: number
  totalPages: number
  searchParams: Record<string, string | undefined>
}

/**
 * Accessible pagination for article listing (link-based, no client JS required).
 */
export function ArticlesPagination({ currentPage, totalPages, searchParams }: ArticlesPaginationProps) {
  if (totalPages <= 1) return null

  function hrefFor(page: number) {
    const params = new URLSearchParams()
    if (searchParams.q) params.set('q', searchParams.q)
    if (searchParams.topic && searchParams.topic !== 'all') params.set('topic', searchParams.topic)
    if (page > 1) params.set('page', String(page))
    const qs = params.toString()
    return `/student-hub/articles${qs ? `?${qs}` : ''}`
  }

  const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1)

  return (
    <nav className="mt-10 flex justify-center items-center gap-2" aria-label="Articles pagination">
      <Link
        href={hrefFor(Math.max(1, currentPage - 1))}
        aria-disabled={currentPage <= 1}
        className={`flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-sm font-bold transition ${
          currentPage <= 1 ? 'pointer-events-none opacity-40' : 'hover:bg-slate-50'
        }`}
      >
        <span aria-hidden>←</span>
        <span className="sr-only">Previous page</span>
      </Link>

      {pages.map((page) => (
        <Link
          key={page}
          href={hrefFor(page)}
          aria-current={page === currentPage ? 'page' : undefined}
          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition ${
            page === currentPage
              ? 'bg-[var(--articles-primary)] text-white shadow-md'
              : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          {page}
        </Link>
      ))}

      {totalPages > 5 && (
        <>
          <span className="px-1 text-slate-400" aria-hidden>
            …
          </span>
          <Link
            href={hrefFor(totalPages)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-sm font-bold hover:bg-slate-50"
          >
            {totalPages}
          </Link>
        </>
      )}

      <Link
        href={hrefFor(Math.min(totalPages, currentPage + 1))}
        aria-disabled={currentPage >= totalPages}
        className={`flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-sm font-bold transition ${
          currentPage >= totalPages ? 'pointer-events-none opacity-40' : 'hover:bg-slate-50'
        }`}
      >
        <span aria-hidden>→</span>
        <span className="sr-only">Next page</span>
      </Link>
    </nav>
  )
}
