import {
  defaultAfslSection,
  defaultImpactSection,
  defaultInternshipSection,
  defaultQuickLinksSection,
  defaultTrainingSection,
  defaultVideoSection,
} from '@/data/defaults/home-sections'
import { resolveMediaUrlOptional } from '@/lib/cms'
import type { HomePage, Media } from '@/payload-types'

/**
 * Turns the Home page global's section groups into render-ready props. Every text
 * field falls back to the built-in copy when blank, and every list when empty, so a
 * half-filled CMS never leaves a hole on the page.
 */

function text(value: string | null | undefined, fallback: string): string {
  return value?.trim() || fallback
}

function list<T>(items: T[] | null | undefined, fallback: T[]): T[] {
  return items && items.length > 0 ? items : fallback
}

function image(media: number | Media | null | undefined, fallbackUrl: string): string {
  return resolveMediaUrlOptional(media) ?? fallbackUrl
}

function imageAlt(media: number | Media | null | undefined, fallbackAlt: string): string {
  return (typeof media === 'object' && media?.alt?.trim()) || fallbackAlt
}

export function resolveTrainingSection(cms?: HomePage['training']) {
  const d = defaultTrainingSection
  return {
    eyebrow: text(cms?.eyebrow, d.eyebrow),
    title: text(cms?.title, d.title),
    subtitle: text(cms?.subtitle, d.subtitle),
    ctaLabel: text(cms?.ctaLabel, d.ctaLabel),
    ctaHref: text(cms?.ctaHref, d.ctaHref),
    items: list(
      cms?.items
        ?.filter((item) => item.title?.trim())
        .map((item) => ({ icon: item.icon?.trim() || '•', title: item.title.trim() })),
      d.items,
    ),
  }
}

export function resolveInternshipSection(cms?: HomePage['internship']) {
  const d = defaultInternshipSection
  return {
    eyebrow: text(cms?.eyebrow, d.eyebrow),
    title: text(cms?.title, d.title),
    description: text(cms?.description, d.description),
    features: list(
      cms?.features?.map((item) => item.text?.trim()).filter((item): item is string => !!item),
      d.features,
    ),
    ctaLabel: text(cms?.ctaLabel, d.ctaLabel),
    ctaHref: text(cms?.ctaHref, d.ctaHref),
    imageUrl: image(cms?.image, d.imageUrl),
    imageAlt: imageAlt(cms?.image, d.imageAlt),
  }
}

export function resolveVideoSection(cms?: HomePage['video']) {
  const d = defaultVideoSection
  return {
    title: text(cms?.title, d.title),
    paragraphs: text(cms?.body, d.body)
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean),
    ctaLabel: text(cms?.ctaLabel, d.ctaLabel),
    ctaHref: text(cms?.ctaHref, d.ctaHref),
    videoUrl: text(cms?.videoUrl, d.videoUrl),
    posterUrl: text(cms?.posterUrl, d.posterUrl),
  }
}

export function resolveImpactSection(cms?: HomePage['impact']) {
  const d = defaultImpactSection
  return {
    title: text(cms?.title, d.title),
    subtitle: text(cms?.subtitle, d.subtitle),
    items: list(
      cms?.items
        ?.filter((item) => item.title?.trim())
        .map((item) => ({
          icon: item.icon || 'badge',
          title: item.title.trim(),
          description: item.description?.trim() ?? '',
        })),
      d.items,
    ),
  }
}

export function resolveAfslSection(cms?: HomePage['afsl']) {
  const d = defaultAfslSection
  return {
    title: text(cms?.title, d.title),
    tagline: text(cms?.tagline, d.tagline),
    description: text(cms?.description, d.description),
    cards: list(
      cms?.cards
        ?.filter((card) => card.title?.trim())
        .map((card) => ({ icon: card.icon?.trim() || '•', title: card.title.trim() })),
      d.cards,
    ),
    offers: {
      title: text(cms?.offersTitle, d.offersTitle),
      description: text(cms?.offersDescription, d.offersDescription),
      primaryLabel: text(cms?.offersPrimaryLabel, d.offersPrimaryLabel),
      primaryHref: text(cms?.offersPrimaryHref, d.offersPrimaryHref),
      secondaryLabel: text(cms?.offersSecondaryLabel, d.offersSecondaryLabel),
      secondaryHref: text(cms?.offersSecondaryHref, d.offersSecondaryHref),
      imageUrl: image(cms?.offersImage, d.offersImageUrl),
      imageAlt: imageAlt(cms?.offersImage, d.offersImageAlt),
    },
    contact: {
      eyebrow: text(cms?.contactEyebrow, d.contactEyebrow),
      description: text(cms?.contactDescription, d.contactDescription),
      primaryLabel: text(cms?.contactPrimaryLabel, d.contactPrimaryLabel),
      primaryHref: text(cms?.contactPrimaryHref, d.contactPrimaryHref),
      secondaryLabel: text(cms?.contactSecondaryLabel, d.contactSecondaryLabel),
      secondaryHref: text(cms?.contactSecondaryHref, d.contactSecondaryHref),
      imageUrl: image(cms?.contactImage, d.contactImageUrl),
      imageAlt: imageAlt(cms?.contactImage, d.contactImageAlt),
    },
  }
}

export function resolveQuickLinksSection(cms?: HomePage['quickLinks']) {
  const d = defaultQuickLinksSection
  return {
    title: text(cms?.title, d.title),
    subtitle: text(cms?.subtitle, d.subtitle),
    items: list(
      cms?.items
        ?.filter((item) => item.label?.trim() && item.href?.trim())
        .map((item) => ({
          icon: item.icon || 'link',
          label: item.label.trim(),
          href: item.href.trim(),
        })),
      d.items,
    ),
  }
}

export type TrainingSectionContent = ReturnType<typeof resolveTrainingSection>
export type InternshipSectionContent = ReturnType<typeof resolveInternshipSection>
export type VideoSectionContent = ReturnType<typeof resolveVideoSection>
export type ImpactSectionContent = ReturnType<typeof resolveImpactSection>
export type AfslSectionContent = ReturnType<typeof resolveAfslSection>
export type QuickLinksSectionContent = ReturnType<typeof resolveQuickLinksSection>
