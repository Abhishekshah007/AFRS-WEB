import Image from 'next/image'
import Link from 'next/link'
import { resolveMediaUrl } from '@/lib/cms'
import type { Media, Scientist } from '@/payload-types'
import type { PaginatedDocs } from 'payload'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { TYPOGRAPHY, UI } from '../design'
import { CONTAINER, fallbackScientists, SECTION } from './constants'

export function ExpertsSection({ scientists }: { scientists: PaginatedDocs<Scientist> }) {
  const experts = scientists.docs.length ? scientists.docs : fallbackScientists

  return (
    <section className={`${SECTION} bg-white section-glow-top`}>
      <div className={`${CONTAINER} grid gap-10 xl:grid-cols-[1fr_340px] items-start`}>
        <div>
          <SectionHeader
            align="left"
            accent={false}
            className="mb-8 max-w-none mx-0"
            title="Our Expert Scientists"
            subtitle="Leading professionals driving forensic innovation and research excellence."
          />
          <AnimateOnScroll stagger className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {experts.map((expert, index) => {
              const photoUrl =
                'photo' in expert
                  ? resolveMediaUrl(expert.photo as Media | number | null | undefined, '')
                  : ''
              const initial = expert.name?.trim().split(/\s+/).pop()?.[0]?.toUpperCase() || '?'
              const cardKey =
                'id' in expert && expert.id ? String(expert.id) : `${expert.name}-${index}`

              return (
                <div key={cardKey} className={`${UI.cardSmall} p-5 card-pop flex gap-4`}>
                  <div className="h-14 w-14 shrink-0 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-lg font-bold overflow-hidden">
                    {photoUrl ? (
                      <Image
                        src={photoUrl}
                        alt={expert.name}
                        width={56}
                        height={56}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      initial
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{expert.name}</h3>
                    <p className="text-xs font-semibold text-brand-600 mt-0.5">
                      {expert.designation}
                    </p>
                    {expert.bio && (
                      <p className="mt-2 text-sm text-slate-500 leading-relaxed line-clamp-3">
                        {expert.bio}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </AnimateOnScroll>
        </div>
        <AnimateOnScroll direction="right">
          <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-500 p-8 text-white shadow-lg">
            <h3 className={TYPOGRAPHY.cardTitle}>Case Submission</h3>
            <p className="mt-4 text-sm text-white/85 leading-relaxed">
              Need professional forensic assistance? Our team is ready to help with specialized
              investigation and expert reporting for your specific case requirements.
            </p>
            <Link
              href="/services#lab-inquiry-form"
              className="mt-8 inline-flex w-full h-12 items-center justify-center rounded-xl bg-orange-500 hover:bg-orange-600 text-sm font-bold transition"
            >
              Enquire Now
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
