import Link from 'next/link'
import { ArrowRight, Clock3, Layers3 } from 'lucide-react'
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
  const programmeType = breadcrumbs.some((item) => item.href?.includes('/courses/training'))
    ? 'training'
    : 'education'

  return (
    <div className="programmes-page bg-white min-h-screen">
      <SubPageHero
        breadcrumbs={breadcrumbs}
        eyebrow={eyebrow}
        title={title}
        description={summary}
        icon={icon}
      />

      <section className={`${programmesTokens.sectionY}`}>
        <div className={programmesTokens.container}>
          <AnimateOnScroll>
            <div className="mb-10 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--prog-primary)]">
                    Education track
                  </p>
                  <h2 className="mt-2 text-2xl font-extrabold text-slate-950">
                    Programmes in {title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    Compare duration, delivery mode, and level before sending an enquiry.
                  </p>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                  <Layers3 className="h-5 w-5 text-[var(--prog-primary)]" />
                  <p className="text-sm text-slate-500">
                    <span className="font-extrabold text-slate-900">{programmes.length}</span>{' '}
                    programme{programmes.length === 1 ? '' : 's'} available
                  </p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className="mb-8 flex justify-end">
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
                    className={`${programmesTokens.radiusCard} group relative h-full overflow-hidden border border-slate-100 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-[var(--prog-primary)]/20 hover:shadow-[0_18px_42px_rgba(15,23,42,0.10)]`}
                  >
                    <div className="h-1.5 bg-gradient-to-r from-[var(--prog-primary)] via-blue-500 to-transparent" />
                    <div className="flex h-full flex-col p-6">
                      <div className="mb-5 flex flex-wrap gap-2">
                        {prog.level && (
                          <span
                            className={`rounded-full px-3 py-1 text-[10px] font-bold ${levelColors[prog.level] ?? 'bg-slate-100 text-slate-600'}`}
                          >
                            {prog.level}
                          </span>
                        )}
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-600">
                          {prog.mode}
                        </span>
                      </div>
                      <h2 className="text-xl font-extrabold leading-snug text-slate-950 group-hover:text-[var(--prog-primary)]">
                        {prog.title}
                      </h2>
                      <p className={`mt-3 text-sm flex-1 ${programmesTokens.body}`}>
                        {prog.description}
                      </p>
                      <div className="mt-6 flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-xs font-bold text-slate-600">
                        <Clock3 className="h-4 w-4 text-[var(--prog-primary)]" />
                        Duration: {prog.duration}
                      </div>
                      <Link
                        href={`/courses/register?${new URLSearchParams({
                          type: programmeType,
                          categoryTitle: title,
                          programmeId: prog.id,
                          programmeTitle: prog.title,
                          duration: prog.duration,
                          mode: prog.mode,
                        }).toString()}`}
                        className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[var(--prog-primary)] px-6 text-sm font-bold text-white transition hover:bg-[var(--prog-primary-hover)]"
                      >
                        Register Interest
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
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
