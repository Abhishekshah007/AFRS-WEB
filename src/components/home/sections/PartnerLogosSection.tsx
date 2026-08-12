import type { PartnersLogo } from '@/payload-types'
import type { PaginatedDocs } from 'payload'
import { normalizePaginatedDocs } from '@/lib/media'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import PartnerLogosCarousel from '../PartnerLogosCarousel'
import { CONTAINER } from './constants'

export function PartnerLogosSection({
  partnerLogos,
}: {
  partnerLogos?: PaginatedDocs<PartnersLogo> | PartnersLogo[]
}) {
  const items = normalizePaginatedDocs<PartnersLogo>(partnerLogos)

  return (
    <section className="py-12 bg-slate-50 border-y border-slate-100">
      <div className={CONTAINER}>
        <SectionHeader
          align="center"
          accent={false}
          className="mb-10 max-w-none mx-0"
          title="Trusted by Leading Institutions"
          subtitle="We collaborate with renowned organizations to advance forensic science education and research."
        />

        <AnimateOnScroll stagger>
          <PartnerLogosCarousel items={items} />
        </AnimateOnScroll>
      </div>
    </section>
  )
}
