import Image from 'next/image'
import type { LeaderProfile } from '@/components/about/types'
import { LeadershipCarousel } from '@/components/about/LeadershipCarousel'
import { SectionHeader } from '@/components/about/SectionHeader'
import { aboutTokens } from '@/components/about/tokens'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

export type LeadershipSectionProps = {
  featured: LeaderProfile[]
  committee: LeaderProfile[]
}

/**
 * Meet Our Leadership — featured carousel + executive committee row.
 */
export function LeadershipSection({ featured, committee }: LeadershipSectionProps) {
  return (
    <section className={`${aboutTokens.sectionY} bg-white`} aria-labelledby="leadership-heading">
      <div className={aboutTokens.container}>
        <AnimateOnScroll>
          <SectionHeader
            id="leadership-heading"
            title="Meet Our Leadership"
            subtitle="Guiding forensic education, research, and laboratory excellence at AFRS."
          />
        </AnimateOnScroll>

        <AnimateOnScroll>
          <LeadershipCarousel leaders={featured} />
        </AnimateOnScroll>

        {committee.length > 0 && (
          <AnimateOnScroll className="mt-14 lg:mt-16">
            <h3 className="text-center text-sm font-bold uppercase tracking-widest text-slate-500 mb-8">
              Executive Committee
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 lg:gap-6">
              {committee.map((member) => (
                <li key={member.id}>
                  <div
                    className={`${aboutTokens.radiusCard} border border-slate-100 bg-slate-50/80 p-4 text-center card-pop h-full`}
                  >
                    <div className="relative mx-auto h-16 w-16 overflow-hidden rounded-full bg-indigo-100 ring-2 ring-white shadow">
                      {member.photoUrl ? (
                        <Image
                          src={member.photoUrl}
                          alt=""
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center text-sm font-bold text-[var(--about-primary)]">
                          {member.initials}
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-xs font-bold text-[var(--about-text)] line-clamp-2">{member.name}</p>
                    <p className="mt-0.5 text-[10px] text-slate-500 line-clamp-2">{member.designation}</p>
                  </div>
                </li>
              ))}
            </ul>
          </AnimateOnScroll>
        )}
      </div>
    </section>
  )
}
