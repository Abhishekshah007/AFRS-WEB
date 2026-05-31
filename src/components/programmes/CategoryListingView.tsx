import Link from 'next/link'
import type { ProgrammeListItem } from '@/components/programmes/catalog'
import { SubPageHero, type BreadcrumbItem } from '@/components/programmes/SubPageHero'
import { programmesTokens } from '@/components/programmes/tokens'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

const levelColors: Record<string, string> = {
  Beginner: 'bg-emerald-100 text-emerald-700',
  Intermediate: 'bg-indigo-100 text-indigo-700',
  Advanced: 'bg-violet-100 text-violet-700',
  Professional: 'bg-slate-100 text-slate-700',
  'All levels': 'bg-orange-100 text-orange-700',
}

export type CategoryListingViewProps = {
  breadcrumbs: BreadcrumbItem[]
  eyebrow: string
  title: string
  summary: string
  icon: string
  programmes: ProgrammeListItem[]
  backHref?: string
}

/**
 * Lists all programmes within an education or training category.
 */
export function CategoryListingView({
  breadcrumbs,
  eyebrow,
  title,
  summary,
  icon,
  programmes,
  backHref = '/courses',
}: CategoryListingViewProps) {
  return (
    <div className="programmes-page bg-white min-h-screen">
      <SubPageHero breadcrumbs={breadcrumbs} eyebrow={eyebrow} title={title} description={summary} icon={icon} />

      <section className={`${programmesTokens.sectionY}`}>
        <div className={programmesTokens.container}>
          <AnimateOnScroll>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <p className="text-sm text-slate-500">
                <span className="font-bold text-slate-900">{programmes.length}</span> programme
                {programmes.length === 1 ? '' : 's'} available
              </p>
              <Link
                href={backHref}
                className="text-sm font-bold text-[var(--prog-primary)] hover:underline"
              >
                ← Back to Programmes
              </Link>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll stagger>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {programmes.map((prog) => (
                <li key={prog.id}>
                  <article
                    className={`${programmesTokens.radiusCard} border border-slate-100 bg-white p-6 shadow-sm card-pop h-full flex flex-col`}
                  >
                    <div className="flex flex-wrap gap-2 mb-3">
                      {prog.level && (
                        <span
                          className={`rounded-full px-3 py-1 text-[10px] font-bold ${levelColors[prog.level] ?? 'bg-slate-100 text-slate-600'}`}
                        >
                          {prog.level}
                        </span>
                      )}
                      <span className="rounded-full px-3 py-1 text-[10px] font-bold bg-slate-100 text-slate-600">
                        {prog.mode}
                      </span>
                    </div>
                    <h2 className="font-extrabold text-slate-900 text-lg leading-snug">{prog.title}</h2>
                    <p className={`mt-2 text-sm flex-1 ${programmesTokens.body}`}>{prog.description}</p>
                    <p className="mt-4 text-xs font-bold text-[var(--prog-primary)]">Duration: {prog.duration}</p>
                    <Link
                      href={`/contact?programme=${encodeURIComponent(prog.title)}`}
                      className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-[var(--prog-primary)] hover:bg-[var(--prog-primary-hover)] text-white text-sm font-bold px-6 transition"
                    >
                      Enquire / Apply
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  )
}
