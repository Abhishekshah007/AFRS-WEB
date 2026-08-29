import Link from 'next/link'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { UI } from '../design'
import { CONTAINER, SECTION } from './constants'

export function FutureSection() {
  return (
    <section className={`${SECTION} ${UI.sectionSurface} section-glow-top`}>
      <div className={`${CONTAINER} grid gap-10 lg:grid-cols-2 items-center`}>
        <AnimateOnScroll direction="left">
          <div className="relative rounded-3xl overflow-hidden bg-slate-200 aspect-[16/10] lg:min-h-[320px] card-pop">
            {/* https://res.cloudinary.com/drrzakkgo/video/upload/v1785948666/afrs-prev_ub9leo.mp4 */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source
                src="https://res.cloudinary.com/drrzakkgo/video/upload/v1785948666/afrs-prev_ub9leo.mp4"
                type="video/mp4"
              />
            </video>

            <div className="absolute inset-0 bg-slate-900/25" />
            {/* <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                aria-label="Play introduction video"
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-white/95 text-brand-700 text-xl font-bold shadow-xl hover:scale-105 transition"
              >
                ►
              </button>
            </div> */}
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll direction="right">
          <div>
            <SectionHeader
              align="left"
              accent={false}
              className="mb-0 max-w-none mx-0"
              title="Exploring the Future of Forensics"
            />
            <p className={`mt-5 ${UI.body}`}>
              Explore our latest research breakthroughs and educational highlights. At AFRS, we use
              state-of-the-art technology to solve complex problems and train the next generation of
              forensic experts.
            </p>
            <p className={`mt-3 ${UI.body}`}>
              Watch our introductory video to learn more about our mission and the impact we make
              globally.
            </p>
            <Link
              href="/courses"
              className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-brand-600 hover:bg-brand-700 px-6 text-white text-sm font-bold transition"
            >
              Explore Our Courses
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
