import type { SiteContactInfo } from '@/components/service-detail/types'
import { ServiceConsultForm } from '@/components/service-detail/ServiceConsultForm'
import { serviceDetailTokens } from '@/components/service-detail/tokens'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

export type ExpertConsultationSectionProps = {
  serviceTitle: string
  contact: SiteContactInfo
}

/**
 * Split consultation card: expert info (gradient) + inquiry form.
 */
export function ExpertConsultationSection({ serviceTitle, contact }: ExpertConsultationSectionProps) {
  return (
    <section
      id="consult-expert"
      className={`${serviceDetailTokens.sectionY} ${serviceDetailTokens.pageBg}`}
      aria-labelledby="consult-heading"
    >
      <div className={serviceDetailTokens.container}>
        <AnimateOnScroll>
          <div className={`overflow-hidden ${serviceDetailTokens.radiusLg} shadow-xl grid lg:grid-cols-[1fr_1.1fr]`}>
            <div className="svc-consult-panel p-8 sm:p-10 lg:p-12 text-white">
              <h2 id="consult-heading" className="text-2xl sm:text-[28px] font-extrabold leading-tight">
                Consult with an Expert
              </h2>
              <p className="mt-4 text-sm text-white/80 leading-relaxed max-w-md">
                Speak with a forensic specialist about {serviceTitle.toLowerCase()}. We respond to case inquiries
                within one business day.
              </p>

              <div className="mt-8 space-y-4">
                <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 group">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-lg" aria-hidden>
                    📞
                  </span>
                  <span className="text-sm font-semibold group-hover:underline">{contact.phone}</span>
                </a>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 group">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-lg" aria-hidden>
                    ✉
                  </span>
                  <span className="text-sm font-semibold group-hover:underline">{contact.email}</span>
                </a>
              </div>

              <div className="mt-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-5">
                <p className="text-sm text-white/90 leading-relaxed">
                  Our experts are ready to assist you with your forensic needs — from scene documentation to
                  courtroom testimony.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 sm:p-10 lg:p-12">
              <ServiceConsultForm serviceTitle={serviceTitle} />
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
