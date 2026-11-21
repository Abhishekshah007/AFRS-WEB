import { defaultAudienceSection } from '@/data/defaults/home-sections'

type AudienceRow = { audience?: string | null; why?: string | null }

export type TargetAudienceTableProps = {
  eyebrow?: string | null
  title?: string | null
  badge?: string | null
  rows?: AudienceRow[] | null
}

/** "Who it serves" table on the About page; copy comes from About page → section text. */
export function TargetAudienceTable({ eyebrow, title, badge, rows }: TargetAudienceTableProps) {
  const d = defaultAudienceSection
  const tableRows = (rows ?? [])
    .map((row) => ({ audience: row.audience?.trim() ?? '', why: row.why?.trim() ?? '' }))
    .filter((row) => row.audience)
  const audienceRows = tableRows.length > 0 ? tableRows : d.rows

  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-12 sm:px-8 lg:px-10">
      <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-gradient-to-br from-slate-50 via-white to-brand-50 shadow-[0_12px_32px_rgba(15,23,42,0.08)]">
        <div className="border-b border-slate-200/80 bg-white/70 px-6 py-5 sm:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--about-primary)]">
                {eyebrow?.trim() || d.eyebrow}
              </p>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">
                {title?.trim() || d.title}
              </h3>
            </div>
            <div className="inline-flex w-fit items-center rounded-full border border-[var(--about-primary)]/15 bg-[var(--about-primary)]/10 px-3 py-1 text-sm font-medium text-[var(--about-primary)]">
              {badge?.trim() || d.badge}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm text-slate-700">
            <thead className="bg-slate-50/80">
              <tr>
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Target audience
                </th>
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Why it matters
                </th>
              </tr>
            </thead>
            <tbody>
              {audienceRows.map(({ audience, why }, index) => (
                <tr
                  key={`${audience}-${index}`}
                  className={index % 2 === 0 ? 'bg-white/70' : 'bg-slate-50/60'}
                >
                  <td className="px-6 py-4 font-semibold text-slate-900">{audience}</td>
                  <td className="px-6 py-4 text-slate-600">{why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
