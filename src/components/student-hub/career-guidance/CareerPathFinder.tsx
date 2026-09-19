import { ArrowDown, Briefcase, GraduationCap, Heart, Sparkles, Target } from 'lucide-react'
import { studentHubTokens } from '@/components/student-hub/tokens'
import type { CareerGuidancePageContent } from '@/components/student-hub/career-guidance/types'

type Props = Pick<
  CareerGuidancePageContent,
  'finderTitle' | 'finderIntro' | 'finderDescription' | 'finderFormula' | 'finderDisclaimer'
>

const formulaIcons = [GraduationCap, Heart, Sparkles, Target]

function parseFormula(formula: string): string[] {
  const parts = formula
    .split(/\s*\+\s*/)
    .map((part) => part.trim())
    .filter(Boolean)
  return parts.length > 0 ? parts : [formula]
}

export function CareerPathFinder({
  finderTitle,
  finderIntro,
  finderDescription,
  finderFormula,
  finderDisclaimer,
}: Props) {
  const formulaParts = parseFormula(finderFormula)

  return (
    <div className="career-path-finder overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-br from-white via-brand-50/40 to-amber-50/30 p-6 sm:p-10 lg:p-12">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-700 shadow-sm">
            <Briefcase className="h-3.5 w-3.5" aria-hidden />
            Career path finder
          </div>
          <h2 className={`mt-4 text-2xl sm:text-3xl ${studentHubTokens.heading}`}>{finderTitle}</h2>
          <p className="mt-3 text-base font-semibold text-slate-700">{finderIntro}</p>
          <p className={`mt-4 text-[15px] leading-relaxed ${studentHubTokens.body}`}>
            {finderDescription}
          </p>
        </div>

        <div className="rounded-2xl border border-white/80 bg-white/90 p-5 shadow-sm sm:p-6">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Your inputs
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {formulaParts.map((part, index) => {
              const Icon = formulaIcons[index % formulaIcons.length]
              return (
                <div key={part} className="flex items-center gap-2 sm:gap-3">
                  <div className="flex min-w-[7.5rem] max-w-[9.5rem] flex-col items-center rounded-2xl border border-slate-200 bg-slate-50 px-3 py-4 text-center shadow-sm">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="mt-3 text-[11px] font-bold leading-snug text-slate-800">
                      {part}
                    </span>
                  </div>
                  {index < formulaParts.length - 1 ? (
                    <span className="text-lg font-light text-brand-300" aria-hidden>
                      +
                    </span>
                  ) : null}
                </div>
              )
            })}
          </div>

          <div className="mt-6 flex flex-col items-center gap-3">
            <ArrowDown className="h-5 w-5 text-brand-400" aria-hidden />
            <div className="w-full rounded-2xl bg-gradient-to-r from-brand-700 to-brand-600 px-5 py-4 text-center shadow-md">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-100">
                Recommended outcome
              </p>
              <p className="mt-1 text-sm font-extrabold text-white sm:text-base">
                Learning &amp; Development Pathway
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-3xl border-t border-brand-100/80 pt-6 text-center text-xs leading-relaxed text-slate-500">
        {finderDisclaimer}
      </p>
    </div>
  )
}
