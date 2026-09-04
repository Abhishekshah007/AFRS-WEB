import { TestimonialsCarousel, type TestimonialCard } from '@/components/testimonials/TestimonialsCarousel'

export type AfslTestimonial = TestimonialCard

const CONTAINER = 'mx-auto w-full max-w-[1120px] px-6 sm:px-8'

export function AfslTestimonialsSection({ testimonials }: { testimonials: AfslTestimonial[] }) {
  if (!testimonials.length) return null

  return (
    <section className="bg-white py-20" aria-labelledby="afsl-testimonials-heading">
      <div className={CONTAINER}>
        <p className="text-center text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#75162D]">
          Client Voices
        </p>
        <h2
          id="afsl-testimonials-heading"
          className="mt-2 text-center text-[34px] font-black text-[#1A0C0F]"
        >
          Client Testimonials
        </h2>
        <p className="mx-auto mt-4 max-w-[620px] text-center text-[14px] font-medium leading-6 text-[#687487]">
          Feedback from advocates, investigators, and institutions who work with AFSL for forensic
          examination and expert consultancy.
        </p>
        <div className="mt-12">
          <TestimonialsCarousel items={testimonials} variant="afsl" />
        </div>
      </div>
    </section>
  )
}
