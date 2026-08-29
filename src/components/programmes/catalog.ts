import type { EducationProgramme, TrainingOption } from '@/components/programmes/types'
import {
  defaultArchiveFilterLinks,
  defaultEducationCategories,
  defaultTrainingCategories,
  staleProgrammeIds,
} from '@/data/defaults/programmes/catalog'
import { getPayloadClient } from '@/lib/payload'

export type {
  ArchiveFilterLinks,
  EducationCategory,
  ProgrammeListItem,
  TrainingCategory,
} from '@/domain/programmes/catalog-types'

import type {
  ArchiveFilterLinks,
  CategoryExtraSection,
  EducationCategory,
  ProgrammeListItem,
  TrainingCategory,
} from '@/domain/programmes/catalog-types'

type TagTone = TrainingOption['tagTone']

export const educationCategories: EducationCategory[] = defaultEducationCategories
export const trainingCategories: TrainingCategory[] = defaultTrainingCategories
export const archiveFilterLinks: ArchiveFilterLinks = defaultArchiveFilterLinks

type CmsTextRow = { text?: string | null }

type ProgrammesCatalogGlobal = {
  educationCategories?: EducationCategory[]
  trainingCategories?: TrainingCategory[]
  archiveFilterLinks?: Partial<ArchiveFilterLinks>
}

function isTagTone(value: string | null | undefined): value is TagTone {
  return value === 'blue' || value === 'green' || value === 'purple' || value === 'orange'
}

function toTextArray(items: unknown): string[] {
  if (!Array.isArray(items)) return []
  return items
    .map((item) => (typeof item === 'string' ? item : (item as CmsTextRow | null)?.text))
    .filter((item): item is string => Boolean(item?.trim()))
}

function toExtraSections(items: unknown, fallback?: CategoryExtraSection[] | null): CategoryExtraSection[] | null {
  if (!Array.isArray(items) || items.length === 0) return fallback ?? null

  const normalized = items
    .map((item) => {
      const row = item as { title?: string | null; note?: string | null; items?: unknown }
      const title = row.title?.trim() ?? ''
      const sectionItems = toTextArray(row.items)
      return {
        title,
        items: sectionItems,
        note: row.note?.trim() || null,
      }
    })
    .filter((item) => item.title && item.items.length)

  return normalized.length ? normalized : fallback ?? null
}

const staleEducationCopy: Record<string, string[]> = {
  'training-online': ['Training Online'],
  'training-lab-based': ['Professional and Foundation Courses'],
  'capsule-training': ['Capsule Training Program'],
  'research-workshops': ['Research and Project Workshops'],
}

const staleTrainingCopy: Record<string, string[]> = {
  'lab-based-training': ['Lab Based Training'],
  'lab-based-internship': ['Lab Based Internship'],
}

const staleTrainingSummaries: Record<string, string[]> = {
  'research-articles': [
    'Guidance for forensic research writing, publication and domain-specific studies.',
    'Innovative forensic studies',
  ],
}

function shouldReplaceCopy(slug: string, title: string | undefined, staleMap: Record<string, string[]>): boolean {
  if (!title?.trim()) return true
  return staleMap[slug]?.includes(title.trim()) ?? false
}

function isStaleProgrammeList(programmes: ProgrammeListItem[] | undefined): boolean {
  if (!programmes?.length) return true
  return programmes.every((item) => staleProgrammeIds.has(item.id))
}

function mergeBySlug<T extends { slug: string; programmes: ProgrammeListItem[] }>(
  cms: T[] | undefined,
  defaults: T[],
  mergeItem: (cmsItem: T | undefined, defaultItem: T) => T,
): T[] {
  const cmsBySlug = new Map((cms ?? []).filter((item) => item?.slug).map((item) => [item.slug, item]))
  const seen = new Set<string>()
  const merged: T[] = []

  for (const defaultItem of defaults) {
    seen.add(defaultItem.slug)
    merged.push(mergeItem(cmsBySlug.get(defaultItem.slug), defaultItem))
  }

  for (const cmsItem of cms ?? []) {
    if (!cmsItem?.slug || seen.has(cmsItem.slug)) continue
    merged.push(mergeItem(cmsItem, cmsItem))
  }

  return merged
}

function mergeEducationItem(
  cmsItem: EducationCategory | undefined,
  defaultItem: EducationCategory,
): EducationCategory {
  const source = cmsItem ?? defaultItem
  const replaceCopy = shouldReplaceCopy(defaultItem.slug, source.title, staleEducationCopy)

  return {
    ...defaultItem,
    ...source,
    title: replaceCopy ? defaultItem.title : source.title?.trim() || defaultItem.title,
    summary: replaceCopy ? defaultItem.summary : source.summary?.trim() || defaultItem.summary,
    icon: source.icon?.trim() || defaultItem.icon,
    intro: source.intro?.trim() || defaultItem.intro,
    programmes: isStaleProgrammeList(source.programmes) ? defaultItem.programmes : source.programmes,
  }
}

function mergeTrainingItem(
  cmsItem: TrainingCategory | undefined,
  defaultItem: TrainingCategory,
): TrainingCategory {
  const source = cmsItem ?? defaultItem
  const replaceCopy =
    shouldReplaceCopy(defaultItem.slug, source.title, staleTrainingCopy) ||
    shouldReplaceCopy(defaultItem.slug, source.summary, staleTrainingSummaries)
  const whoCanApply = toTextArray(source.whoCanApply)
  const outcomes = toTextArray(source.outcomes)
  const missionItems = toTextArray(source.missionItems)

  return {
    ...defaultItem,
    ...source,
    title: replaceCopy ? defaultItem.title : source.title?.trim() || defaultItem.title,
    summary: replaceCopy ? defaultItem.summary : source.summary?.trim() || defaultItem.summary,
    icon: source.icon?.trim() || defaultItem.icon,
    tag: source.tag?.trim() || defaultItem.tag,
    tagTone: isTagTone(source.tagTone) ? source.tagTone : defaultItem.tagTone,
    intro: source.intro?.trim() || defaultItem.intro,
    body: source.body?.trim() || defaultItem.body,
    highlightsTitle: source.highlightsTitle?.trim() || defaultItem.highlightsTitle,
    highlightsNote: source.highlightsNote?.trim() || defaultItem.highlightsNote,
    whoCanApply: whoCanApply.length ? whoCanApply : defaultItem.whoCanApply,
    outcomesTitle: source.outcomesTitle?.trim() || defaultItem.outcomesTitle,
    outcomes: outcomes.length ? outcomes : defaultItem.outcomes,
    ctaLabel: source.ctaLabel?.trim() || defaultItem.ctaLabel,
    vision: source.vision?.trim() || defaultItem.vision,
    missionTitle: source.missionTitle?.trim() || defaultItem.missionTitle,
    missionItems: missionItems.length ? missionItems : defaultItem.missionItems,
    extraSections: toExtraSections(source.extraSections, defaultItem.extraSections),
    disclaimer: source.disclaimer?.trim() || defaultItem.disclaimer,
    programmes: isStaleProgrammeList(source.programmes) ? defaultItem.programmes : source.programmes,
  }
}

function normalizeEducation(categories: EducationCategory[] | undefined): EducationCategory[] {
  return mergeBySlug(categories, educationCategories, mergeEducationItem)
}

function normalizeTraining(categories: TrainingCategory[] | undefined): TrainingCategory[] {
  return mergeBySlug(categories, trainingCategories, mergeTrainingItem)
}

function normalizeArchiveLinks(links: Partial<ArchiveFilterLinks> | undefined): ArchiveFilterLinks {
  return {
    nationalEvents: links?.nationalEvents || archiveFilterLinks.nationalEvents,
    internationalEvents: links?.internationalEvents || archiveFilterLinks.internationalEvents,
    workshops: links?.workshops || archiveFilterLinks.workshops,
    webinars: links?.webinars || archiveFilterLinks.webinars,
  }
}

export async function getProgrammesCatalogData() {
  try {
    const payload = await getPayloadClient()
    const global = (await payload.findGlobal({
      slug: 'programmesCatalog',
      depth: 0,
      overrideAccess: false,
    })) as ProgrammesCatalogGlobal

    return {
      educationCategories: normalizeEducation(global.educationCategories),
      trainingCategories: normalizeTraining(global.trainingCategories),
      archiveFilterLinks: normalizeArchiveLinks(global.archiveFilterLinks),
    }
  } catch {
    return { educationCategories, trainingCategories, archiveFilterLinks }
  }
}

export async function getEducationCategories() {
  return (await getProgrammesCatalogData()).educationCategories
}

export async function getTrainingCategories() {
  return (await getProgrammesCatalogData()).trainingCategories
}

export async function getArchiveFilterLinks() {
  return (await getProgrammesCatalogData()).archiveFilterLinks
}

export async function getEducationCategory(slug: string): Promise<EducationCategory | undefined> {
  return (await getEducationCategories()).find((c) => c.slug === slug)
}

export async function getTrainingCategory(slug: string): Promise<TrainingCategory | undefined> {
  return (await getTrainingCategories()).find((c) => c.slug === slug)
}

export async function educationProgrammesForHub(): Promise<EducationProgramme[]> {
  return (await getEducationCategories()).map((c) => ({
    id: c.slug,
    icon: c.icon,
    title: c.title,
    description: c.summary,
    href: `/courses/education/${c.slug}`,
  }))
}

export async function trainingOptionsForHub(): Promise<TrainingOption[]> {
  return (await getTrainingCategories()).map((c) => ({
    id: c.slug,
    slug: c.slug,
    icon: c.icon,
    title: c.title,
    summary: c.summary,
    tag: c.tag,
    tagTone: c.tagTone,
    href: `/courses/training/${c.slug}`,
  }))
}
