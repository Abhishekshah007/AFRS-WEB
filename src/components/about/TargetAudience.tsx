const targetAudience = [
  'Students',
  'Research Scholars',
  'Faculty Members',
  'Forensic Professionals',
  'Police Persons',
  'Lawyers',
  'Medical Professionals',
  'Cyber Security Professionals',
  'Government Employees',
  'Investigators',
]

const audienceHighlights = [
  'Build a strong foundation in forensic science principles and practical learning.',
  'Explore advanced research methods and academic pathways with confidence.',
  'Gain skills that support teaching, training, and professional mentorship.',
  'Connect theory to real-world investigative and case-based practice.',
  'Strengthen evidence handling, reporting, and operational understanding.',
  'Develop legal, ethical, and courtroom-ready perspectives for professional growth.',
  'Bridge forensic science with medical and clinical decision-making environments.',
  'Advance digital, cyber-enabled, and modern forensic competencies.',
  'Support public-sector roles through policy, compliance, and governance readiness.',
  'Enhance investigative reasoning and analytical capability in fieldwork.',
]

export function TargetAudienceTable() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-12 sm:px-8 lg:px-10">
      <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-gradient-to-br from-slate-50 via-white to-brand-50 shadow-[0_12px_32px_rgba(15,23,42,0.08)]">
        <div className="border-b border-slate-200/80 bg-white/70 px-6 py-5 sm:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--about-primary)]">
                Who it serves
              </p>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">
                A platform built for every stage of forensic learning and practice
              </h3>
            </div>
            <div className="inline-flex w-fit items-center rounded-full border border-[var(--about-primary)]/15 bg-[var(--about-primary)]/10 px-3 py-1 text-sm font-medium text-[var(--about-primary)]">
              10+ professional groups
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
              {targetAudience.map((audience, index) => (
                <tr
                  key={audience}
                  className={index % 2 === 0 ? 'bg-white/70' : 'bg-slate-50/60'}
                >
                  <td className="px-6 py-4 font-semibold text-slate-900">{audience}</td>
                  <td className="px-6 py-4 text-slate-600">
                    {audienceHighlights[index % audienceHighlights.length]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
