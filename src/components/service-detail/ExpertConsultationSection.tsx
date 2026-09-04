import type { SubmissionFormType } from '@/fields/submissionExport'
import type { SiteContactInfo } from '@/components/service-detail/types'
import { ServiceConsultForm } from '@/components/service-detail/ServiceConsultForm'
import { serviceDetailTokens } from '@/components/service-detail/tokens'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

export type ConsultSectionConfig = {
  formType: SubmissionFormType
  heading: string
  intro: string
  caseTypes: string[]
  submitLabel: string
}

export type ExpertConsultationSectionProps = {
  serviceTitle: string
  serviceSlug?: string
  contact: SiteContactInfo
  config: ConsultSectionConfig
}

/**
 * Split consultation card: expert info (gradient) + inquiry form.
 */
export function ExpertConsultationSection({
  serviceTitle,
  serviceSlug,
  contact,
  config,
}: ExpertConsultationSectionProps) {
  return (
    <section
      id="consult-expert"
      className={`${serviceDetailTokens.sectionY} ${serviceDetailTokens.pageBg}`}
      aria-labelledby="consult-heading"
    >
      <div className={serviceDetailTokens.container}>
        <AnimateOnScroll>
          <div
            id="consultancyForm"
            className={`overflow-hidden ${serviceDetailTokens.radiusLg} shadow-xl grid lg:grid-cols-[1fr_1.1fr]`}
          >
            <div className="svc-consult-panel p-8 sm:p-10 lg:p-12 text-white">
              <h2
                id="consult-heading"
                className="text-2xl sm:text-[28px] font-extrabold leading-tight"
              >
                {config.heading}
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">{config.intro}</p>

              <div className="mt-8 space-y-4">
                <a
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                  className="group flex items-center gap-3"
                >
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-lg"
                    aria-hidden
                  >
                    📞
                  </span>
                  <span className="text-sm font-semibold group-hover:underline">
                    {contact.phone}
                  </span>
                </a>
                <a href={`mailto:${contact.email}`} className="group flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-lg"
                    aria-hidden
                  >
                    ✉
                  </span>
                  <span className="text-sm font-semibold group-hover:underline">
                    {contact.email}
                  </span>
                </a>
              </div>

              <div className="mt-10 rounded-xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                <p className="text-sm leading-relaxed text-white/90">
                  Our experts are ready to assist you with your forensic needs — from scene
                  documentation to courtroom testimony.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 sm:p-10 lg:p-12">
              <ServiceConsultForm
                serviceTitle={serviceTitle}
                serviceSlug={serviceSlug}
                formType={config.formType}
                caseTypes={config.caseTypes}
                submitLabel={config.submitLabel}
              />
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
