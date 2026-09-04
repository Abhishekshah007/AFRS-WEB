import { ExpertConsultationSection, type ConsultSectionConfig } from '@/components/service-detail/ExpertConsultationSection'
import { HowWeHelpSection } from '@/components/service-detail/HowWeHelpSection'
import { InvestigationGallery } from '@/components/service-detail/InvestigationGallery'
import { ServiceDetailHero } from '@/components/service-detail/ServiceDetailHero'
import { ServiceOverviewSection } from '@/components/service-detail/ServiceOverviewSection'
import { buildOverviewParagraphs } from '@/components/service-detail/buildServiceContent'
import type { GallerySlide, HelpCardItem, ServiceDetailData, SiteContactInfo } from '@/components/service-detail/types'
import { serviceDetailTokens } from '@/components/service-detail/tokens'

export type ServiceDetailViewProps = {
  service: ServiceDetailData
  helpCards: HelpCardItem[]
  gallerySlides: GallerySlide[]
  contact: SiteContactInfo
}

function buildConsultConfig(service: ServiceDetailData): ConsultSectionConfig {
  const isLegalConsultancy =
    service.category === 'consultancy' ||
    /legal|consultancy/i.test(service.slug)

  if (isLegalConsultancy) {
    return {
      formType: 'legalConsultancy',
      heading: 'Request Legal Consultancy',
      intro:
        'Submit your medico-legal or forensic consultancy request. Our specialists review case details and respond within one business day.',
      caseTypes: [
        'Medico-legal opinion',
        'Court testimony support',
        'Evidence review',
        'Case documentation',
        'Expert witness briefing',
        'Other legal inquiry',
      ],
      submitLabel: 'Submit Consultancy Request',
    }
  }

  return {
    formType: 'serviceConsult',
    heading: 'Consult with an Expert',
    intro: `Speak with a forensic specialist about ${service.title.toLowerCase()}. We respond to case inquiries within one business day.`,
    caseTypes: ['New case', 'Ongoing investigation', 'Expert opinion', 'Training inquiry'],
    submitLabel: 'Send Message',
  }
}

/**
 * Full service catalog detail layout — composed from section components.
 */
export function ServiceDetailView({ service, helpCards, gallerySlides, contact }: ServiceDetailViewProps) {
  const overviewTitle = `What is ${service.title}?`
  const paragraphs = buildOverviewParagraphs(service)
  const consultConfig = buildConsultConfig(service)

  return (
    <div className={`service-detail-page min-h-screen ${serviceDetailTokens.pageBg}`}>
      <ServiceDetailHero
        title={service.title}
        description={service.excerpt}
        bannerUrl={service.bannerUrl}
      />
      <ServiceOverviewSection title={overviewTitle} paragraphs={paragraphs} />
      <HowWeHelpSection
        items={helpCards}
        title={service.helpHeading || undefined}
        subtitle={service.helpIntro || undefined}
      />
      <InvestigationGallery slides={gallerySlides} />
      <ExpertConsultationSection
        serviceTitle={service.title}
        serviceSlug={service.slug}
        contact={contact}
        config={consultConfig}
      />
    </div>
  )
}
