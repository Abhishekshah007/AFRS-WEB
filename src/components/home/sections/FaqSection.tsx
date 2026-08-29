import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { CONTAINER, SECTION } from './constants'
import { HOME_FAQS } from './faqs'

export function FaqSection() {
  const faqs = HOME_FAQS

  return (
    <section className={`${SECTION} bg-white section-glow-top`}>
      <div className={`${CONTAINER} max-w-3xl`}>
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Quick answers about programs, registration, and services."
        />
        <AnimateOnScroll stagger className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-2xl border border-slate-100 bg-white overflow-hidden card-pop"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer p-5 text-sm font-semibold text-slate-800 list-none">
                {faq.q}
                <span className="shrink-0 h-8 w-8 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-lg font-light group-open:rotate-45 transition">
                  +
                </span>
              </summary>
              <p className="px-5 pb-5 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </AnimateOnScroll>
      </div>
    </section>
  )
}
