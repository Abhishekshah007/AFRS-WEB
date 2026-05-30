import { ExpertConsultationSection } from '@/components/service-detail/ExpertConsultationSection'
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

/**
 * Full service catalog detail layout — composed from section components.
 */
export function ServiceDetailView({ service, helpCards, gallerySlides, contact }: ServiceDetailViewProps) {
  const overviewTitle = `What is ${service.title}?`
  const paragraphs = buildOverviewParagraphs(service)

  return (
    <div className={`service-detail-page min-h-screen ${serviceDetailTokens.pageBg}`}>
      <ServiceDetailHero
        title={service.title}
        description={service.excerpt}
        bannerUrl={service.bannerUrl}
      />
      <ServiceOverviewSection title={overviewTitle} paragraphs={paragraphs} />
      <HowWeHelpSection items={helpCards} />
      <InvestigationGallery slides={gallerySlides} />
      <ExpertConsultationSection serviceTitle={service.title} contact={contact} />
    </div>
  )
}
