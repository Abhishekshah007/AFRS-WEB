import Link from 'next/link'
import { ArrowRight, Clock3, Layers3 } from 'lucide-react'
import type { ProgrammeListItem } from '@/components/programmes/catalog'
import { SubPageHero, type BreadcrumbItem } from '@/components/programmes/SubPageHero'
import { programmesTokens } from '@/components/programmes/tokens'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

const levelColors: Record<string, string> = {
  Beginner: 'bg-emerald-100 text-emerald-700',
  Intermediate: 'bg-brand-100 text-brand-700',
  Advanced: 'bg-brand-200/50 text-brand-700',
  Professional: 'bg-slate-100 text-slate-700',
  Academic: 'bg-brand-50 text-brand-600',
  'All levels': 'bg-brand-100 text-brand-500',
}

export type CategoryListingViewProps = {
  breadcrumbs: BreadcrumbItem[]
  eyebrow: string
  title: string
  summary: string
  icon: string
  programmes: ProgrammeListItem[]
  backHref?: string
  intro?: string | null
  body?: string | null
  highlightsTitle?: string | null
  highlightsNote?: string | null
  whoCanApply?: string[] | null
  outcomesTitle?: string | null
  outcomes?: string[] | null
  vision?: string | null
  missionTitle?: string | null
  missionItems?: string[] | null
  extraSections?: { title: string; items: string[]; note?: string | null }[] | null
  disclaimer?: string | null
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
  intro,
  body,
  highlightsTitle,
  highlightsNote,
  whoCanApply,
  outcomesTitle,
  outcomes,
  vision,
  missionTitle,
  missionItems,
  extraSections,
  disclaimer,
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
                    {intro || 'Compare duration, delivery mode, and level before sending an enquiry.'}
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

          {(body || whoCanApply?.length || outcomes?.length || vision || missionItems?.length) && (
            <AnimateOnScroll>
              <div className="mb-10 space-y-6">
                {body && (
                  <article className="w-full rounded-2xl border border-slate-100 bg-white p-6 sm:p-8">
                    <h3 className="text-lg font-extrabold text-slate-900">About the programme</h3>
                    <div className="mt-3 space-y-4">
                      {body
                        .split(/\n\s*\n/)
                        .map((paragraph) => paragraph.trim())
                        .filter(Boolean)
                        .map((paragraph) => (
                          <p
                            key={paragraph.slice(0, 48)}
                            className={`text-sm leading-relaxed text-justify ${programmesTokens.body}`}
                          >
                            {paragraph}
                          </p>
                        ))}
                    </div>
                    {highlightsNote && !highlightsTitle && (
                      <p className="mt-4 text-xs leading-relaxed text-justify text-slate-500">
                        {highlightsNote}
                      </p>
                    )}
                  </article>
                )}

                {(vision || missionItems?.length) && (
                  <div className="grid gap-6 lg:grid-cols-2">
                    {vision && (
                      <article className="rounded-2xl border border-slate-100 bg-white p-6">
                        <h3 className="text-lg font-extrabold text-slate-900">Vision</h3>
                        <p className={`mt-3 text-sm leading-relaxed text-justify ${programmesTokens.body}`}>
                          {vision}
                        </p>
                      </article>
                    )}
                    {missionItems?.length ? (
                      <article className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                        <h3 className="text-lg font-extrabold text-slate-900">Mission</h3>
                        {missionTitle && (
                          <p className="mt-3 text-sm font-semibold text-slate-700">{missionTitle}</p>
                        )}
                        <ul className="mt-4 space-y-2">
                          {missionItems.map((item) => (
                            <li key={item} className="flex gap-2 text-sm text-slate-700">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </article>
                    ) : null}
                  </div>
                )}

                {(whoCanApply?.length || outcomes?.length) && (
                  <div
                    className={`grid gap-6 ${whoCanApply?.length && outcomes?.length ? 'lg:grid-cols-2' : ''}`}
                  >
                    {whoCanApply?.length ? (
                      <article className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                        <h3 className="text-lg font-extrabold text-slate-900">Who Can Apply?</h3>
                        <ul className="mt-4 space-y-2">
                          {whoCanApply.map((item) => (
                            <li key={item} className="flex gap-2 text-sm text-slate-700">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </article>
                    ) : null}
                    {outcomes?.length ? (
                      <article className="rounded-2xl border border-slate-100 bg-white p-6">
                        <h3 className="text-lg font-extrabold text-slate-900">
                          {outcomesTitle || 'Learning Outcomes'}
                        </h3>
                        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                          {outcomes.map((item) => (
                            <li key={item} className="flex gap-2 text-sm text-slate-700">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </article>
                    ) : null}
                  </div>
                )}
              </div>
            </AnimateOnScroll>
          )}

          {extraSections?.length ? (
            <AnimateOnScroll>
              <div className="mb-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {extraSections.map((section) => (
                  <article
                    key={section.title}
                    className="rounded-2xl border border-slate-100 bg-white p-6"
                  >
                    <h3 className="text-lg font-extrabold text-slate-900">{section.title}</h3>
                    <ul className="mt-4 space-y-2">
                      {section.items.map((item) => (
                        <li key={item} className="flex gap-2 text-sm text-slate-700">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    {section.note && (
                      <p className="mt-4 text-xs leading-relaxed text-slate-500">{section.note}</p>
                    )}
                  </article>
                ))}
              </div>
            </AnimateOnScroll>
          ) : null}

          {disclaimer && (
            <p className="mb-10 text-xs leading-relaxed text-justify text-slate-500">{disclaimer}</p>
          )}

          {highlightsTitle && (
            <div className="mb-4">
              <h3 className="text-lg font-extrabold text-slate-900">{highlightsTitle}</h3>
              {highlightsNote && (
                <p className="mt-2 max-w-none text-sm leading-relaxed text-justify text-slate-500">
                  {highlightsNote}
                </p>
              )}
            </div>
          )}
          <AnimateOnScroll stagger>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {programmes.map((prog) => (
                <li key={prog.id}>
                  <article
                    className={`${programmesTokens.radiusCard} group relative h-full overflow-hidden border border-slate-100 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-[var(--prog-primary)]/20 hover:shadow-[0_18px_42px_rgba(15,23,42,0.10)]`}
                  >
                    <div className="h-1.5 bg-gradient-to-r from-[var(--prog-primary)] via-brand-200 to-transparent" />
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
