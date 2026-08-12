import type { Testimonial } from '@/payload-types'
import type { PaginatedDocs } from 'payload'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { UI } from '../design'
import { CONTAINER, SECTION } from './constants'

export function TestimonialsSection({
  testimonials,
}: {
  testimonials: PaginatedDocs<Testimonial>
}) {
  if (!testimonials.docs.length) return null

  return (
    <section className={`${SECTION} bg-white section-glow-top`}>
      <div className={CONTAINER}>
        <SectionHeader
          title="Testimonials"
          subtitle="Voices from students and professionals who trained with AFRS."
        />
        <AnimateOnScroll stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.docs.map((t) => (
            <div key={t.id} className={`${UI.card} p-8 card-pop text-center`}>
              <div className="mx-auto h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl font-bold">
                {t.name?.[0]?.toUpperCase() || '?'}
              </div>
              <p className="mt-4 font-bold text-slate-900">{t.name}</p>
              {t.title && <p className="text-xs text-slate-400 mt-1">{t.title}</p>}
              <p className="mt-4 text-sm text-slate-600 leading-relaxed italic">
                &ldquo;{t.testimonial}&rdquo;
              </p>
              <div
                className="mt-4 text-amber-400 text-sm tracking-widest"
                aria-label="5 star rating"
              >
                ★★★★★
              </div>
            </div>
          ))}
        </AnimateOnScroll>
      </div>
    </section>
  )
}
