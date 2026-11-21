import { PageHero } from '@/components/marketing/PageHero'
import type { LegalPageContent } from '@/data/defaults/legal'

/** Shared layout for /privacy and /terms (same markup both pages used before). */
export function LegalPageView({
  content,
  introClassName = 'text-sm leading-relaxed text-slate-600',
}: {
  content: LegalPageContent
  introClassName?: string
}) {
  return (
    <div>
      <PageHero
        eyebrow="LEGAL"
        title={content.title}
        subtitle={`Last updated: ${content.lastUpdated}`}
      />
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-14 lg:py-20">
        <div className="space-y-10 text-slate-700">
          <p className={introClassName}>{content.intro}</p>
          {content.sections.map((s, index) => (
            <section key={`${s.title}-${index}`}>
              <h2 className="text-lg font-extrabold text-slate-900 mb-3">{s.title}</h2>
              {s.body.split(/\n\s*\n/).map((para, i) => (
                <p key={i} className="text-sm leading-relaxed text-slate-600 mb-3">
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
