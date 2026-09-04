import type { Testimonial } from '@/payload-types'
import type { PaginatedDocs } from 'payload'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { TestimonialsCarousel } from '@/components/testimonials/TestimonialsCarousel'
import { SECTION } from './constants'

const CONTAINER = 'mx-auto w-full max-w-[1120px] px-6 sm:px-8'

export function TestimonialsSection({
  testimonials,
}: {
  testimonials: PaginatedDocs<Testimonial>
}) {
  if (!testimonials.docs.length) return null

  const items = testimonials.docs.map((t) => ({
    id: t.id,
    name: t.name,
    title: t.title,
    testimonial: t.testimonial,
    rating: t.rating,
  }))

  return (
    <section className={`${SECTION} bg-white section-glow-top`}>
      <div className={CONTAINER}>
        <SectionHeader
          title="Testimonials"
          subtitle="Voices from students and professionals who trained with AFRS."
        />
        <AnimateOnScroll>
          <TestimonialsCarousel items={items} variant="afrs" />
        </AnimateOnScroll>
      </div>
    </section>
  )
}
