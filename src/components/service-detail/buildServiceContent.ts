import { SERVICE_DETAIL_IMAGES } from '@/components/service-detail/tokens'
import type { GallerySlide, HelpCardItem, ServiceDetailData } from '@/components/service-detail/types'
import type { Service } from '@/payload-types'

const defaultIcons = ['📋', '🗺️', '📷', '🔬', '⚖️']

/** Default help cards when CMS features array is empty (Crime Scene Investigation template). */
export function defaultHelpCards(imageTrace: string = SERVICE_DETAIL_IMAGES.traceMicroscope): HelpCardItem[] {
  return [
    {
      id: 'evidence',
      icon: '📋',
      title: 'Evidence Collection',
      description: 'Systematic recovery, packaging, and labeling of physical evidence to preserve integrity.',
      bullets: ['Chain-of-custody documentation', 'Contamination prevention', 'Field photography logs'],
    },
    {
      id: 'reconstruction',
      icon: '🗺️',
      title: 'Scene Reconstruction',
      description: 'Spatial analysis and timeline development to support investigative conclusions.',
    },
    {
      id: 'photography',
      icon: '📷',
      title: 'Forensic Photography',
      description: 'High-fidelity imaging for court admissibility and peer review.',
    },
    {
      id: 'trace',
      icon: '🔬',
      title: 'Trace Analysis',
      description: 'Microscopic examination of fibers, hair, glass, and other transfer evidence.',
      wide: true,
      imageUrl: imageTrace,
    },
    {
      id: 'testimony',
      icon: '⚖️',
      title: 'Expert Witness Testimony',
      description: 'Clear, defensible expert opinions for legal proceedings and agency briefings.',
    },
  ]
}

/** Map Payload service.features to help cards; marks 4th item as wide when present. */
export function featuresToHelpCards(
  features: Service['features'],
  traceImageUrl?: string,
): HelpCardItem[] {
  if (!features?.length) return defaultHelpCards(traceImageUrl)

  return features.map((f, i) => ({
    id: `feature-${i}`,
    icon: defaultIcons[i % defaultIcons.length],
    title: f.featureTitle ?? 'Service capability',
    description: f.featureDescription ?? '',
    wide: i === 3,
    imageUrl: i === 3 ? traceImageUrl : undefined,
  }))
}

export function defaultGallerySlides(): GallerySlide[] {
  return [
    { id: 'g1', src: SERVICE_DETAIL_IMAGES.galleryLab, alt: 'Digital forensics lab', caption: 'Digital Forensics' },
    { id: 'g2', src: SERVICE_DETAIL_IMAGES.galleryTubes, alt: 'Laboratory analysis', caption: 'Lab Analysis' },
    { id: 'g3', src: SERVICE_DETAIL_IMAGES.galleryDna, alt: 'Biological evidence', caption: 'Biological Evidence' },
    { id: 'g4', src: SERVICE_DETAIL_IMAGES.galleryScreens, alt: 'Evidence analysis', caption: 'Evidence Analysis' },
  ]
}

export function buildOverviewParagraphs(data: ServiceDetailData): string[] {
  if (data.contentPlain) {
    const parts = data.contentPlain.split(/\n\n+/).filter(Boolean)
    if (parts.length >= 2) return parts.slice(0, 2)
    if (parts.length === 1) {
      return [parts[0], data.excerpt || defaultSecondParagraph(data.title)]
    }
  }
  return [data.excerpt || defaultFirstParagraph(data.title), defaultSecondParagraph(data.title)]
}

function defaultFirstParagraph(title: string): string {
  return `${title} is the systematic process of documenting, collecting, and preserving physical evidence from a scene while maintaining strict chain-of-custody and contamination controls.`
}

function defaultSecondParagraph(title: string): string {
  return `Our team applies validated protocols and court-ready reporting so investigators and legal counsel can rely on findings throughout ${title.toLowerCase()} workflows.`
}
