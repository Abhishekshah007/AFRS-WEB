import { SERVICE_DETAIL_IMAGES } from '@/components/service-detail/tokens'
import type { GallerySlide, HelpCardItem, ServiceDetailData } from '@/components/service-detail/types'
import { resolveMediaUrl } from '@/lib/cms'
import type { Media, Service } from '@/payload-types'

const fallbackHelpImages = [
  SERVICE_DETAIL_IMAGES.traceMicroscope,
  SERVICE_DETAIL_IMAGES.overview,
  SERVICE_DETAIL_IMAGES.galleryLab,
  SERVICE_DETAIL_IMAGES.galleryTubes,
  SERVICE_DETAIL_IMAGES.galleryDna,
]

function toBulletList(value?: string | null): string[] | undefined {
  if (!value?.trim()) return undefined
  const bullets = value
    .split(/\r?\n/)
    .map((line) => line.replace(/^[-•*]\s*/, '').trim())
    .filter(Boolean)
  return bullets.length > 0 ? bullets : undefined
}

/** Default help cards when CMS features array is empty. */
export function defaultHelpCards(): HelpCardItem[] {
  return [
    {
      id: 'evidence',
      title: 'Evidence Collection',
      description:
        'Systematic recovery, packaging, and labeling of physical evidence to preserve integrity from the scene through laboratory intake.',
      bullets: ['Chain-of-custody documentation', 'Contamination prevention', 'Field photography logs'],
      imageUrl: fallbackHelpImages[0],
    },
    {
      id: 'reconstruction',
      title: 'Scene Reconstruction',
      description: 'Spatial analysis and timeline development to support investigative conclusions.',
      imageUrl: fallbackHelpImages[1],
    },
    {
      id: 'photography',
      title: 'Forensic Photography',
      description: 'High-fidelity imaging for court admissibility and peer review.',
      imageUrl: fallbackHelpImages[2],
    },
    {
      id: 'trace',
      title: 'Trace Analysis',
      description: 'Microscopic examination of fibers, hair, glass, and other transfer evidence.',
      imageUrl: fallbackHelpImages[3],
    },
    {
      id: 'testimony',
      title: 'Expert Witness Testimony',
      description: 'Clear, defensible expert opinions for legal proceedings and agency briefings.',
      imageUrl: fallbackHelpImages[4],
    },
  ]
}

/** Map Payload service.features to full-width help rows. */
export function featuresToHelpCards(features: Service['features']): HelpCardItem[] {
  if (!features?.length) return defaultHelpCards()

  return features.map((feature, index) => ({
    id: feature.id ?? `feature-${index}`,
    title: feature.featureTitle ?? 'Service capability',
    description: feature.featureDescription ?? '',
    bullets: toBulletList(feature.featurePoints),
    imageUrl: resolveMediaUrl(
      feature.featureIcon as number | Media | null | undefined,
      fallbackHelpImages[index % fallbackHelpImages.length],
    ),
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
