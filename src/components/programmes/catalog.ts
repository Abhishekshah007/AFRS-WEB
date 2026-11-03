import type { EducationProgramme, TrainingOption } from '@/components/programmes/types'
import {
  defaultArchiveFilterLinks,
  defaultEducationCategories,
  defaultTrainingCategories,
  staleProgrammeIds,
} from '@/data/defaults/programmes/catalog'
import { isEventOngoing, isEventUpcoming } from '@/components/programmes/mapEvent'
import { getPayloadClient } from '@/lib/payload'
import type { Event as AfrsEvent } from '@/payload-types'
import { safeQuery } from '@/lib/resilience/safeQuery'

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
  archiveFilterLinks?: Partial<ArchiveFilterLinks>
}

type CategoryRecord = {
  id: number
  kind: 'education' | 'training'
  sortOrder?: number | null
  slug: string
  icon: string
  title: string
  summary: string
  intro?: string | null
  tag?: string | null
  tagTone?: string | null
  body?: string | null
  highlightsTitle?: string | null
  highlightsNote?: string | null
  whoCanApply?: unknown
  outcomesTitle?: string | null
  outcomes?: unknown
  ctaLabel?: string | null
  vision?: string | null
  missionTitle?: string | null
  missionItems?: unknown
  extraSections?: unknown
  disclaimer?: string | null
}

type ProgrammeRecord = Record<string, unknown> & {
  programmeId: string
  category: number | { id: number }
}

async function findAllCatalogueRecords(collection: 'programmeCategories' | 'programmes') {
  const payload = await getPayloadClient()
  const records: Record<string, unknown>[] = []
  let page = 1

  while (true) {
    const result = await payload.find({
      collection,
      limit: 500,
      page,
      depth: 0,
      sort: 'sortOrder',
      overrideAccess: false,
    })
    records.push(...(result.docs as unknown as Record<string, unknown>[]))
    if (!result.hasNextPage) return records
    page += 1
  }
}

function relatedCategoryId(value: ProgrammeRecord['category']): string {
  return String(typeof value === 'object' ? value.id : value)
}

function programmesByCategoryId(records: Record<string, unknown>[]) {
  const grouped = new Map<string, ProgrammeListItem[]>()
  for (const rawRecord of records) {
    const record = rawRecord as ProgrammeRecord
    const categoryId = relatedCategoryId(record.category)
    const categoryProgrammes = grouped.get(categoryId) ?? []
    categoryProgrammes.push({
      ...(record as unknown as Omit<ProgrammeListItem, 'id'>),
      id: record.programmeId,
    })
    grouped.set(categoryId, categoryProgrammes)
  }
  return grouped
}

function mapEducationCategory(
  category: CategoryRecord,
  programmes: ProgrammeListItem[],
): EducationCategory {
  return {
    slug: category.slug,
    icon: category.icon,
    title: category.title,
    summary: category.summary,
    intro: category.intro,
    programmes,
  }
}

function mapTrainingCategory(
  category: CategoryRecord,
  programmes: ProgrammeListItem[],
): TrainingCategory {
  return {
    slug: category.slug,
    icon: category.icon,
    title: category.title,
    tag: category.tag ?? '',
    tagTone: isTagTone(category.tagTone) ? category.tagTone : 'blue',
    summary: category.summary,
    intro: category.intro,
    body: category.body,
    highlightsTitle: category.highlightsTitle,
    highlightsNote: category.highlightsNote,
    whoCanApply: toTextArray(category.whoCanApply),
    outcomesTitle: category.outcomesTitle,
    outcomes: toTextArray(category.outcomes),
    ctaLabel: category.ctaLabel,
    vision: category.vision,
    missionTitle: category.missionTitle,
    missionItems: toTextArray(category.missionItems),
    extraSections: toExtraSections(category.extraSections),
    disclaimer: category.disclaimer,
    programmes,
  }
}

async function findProgrammesForCategory(categoryId: number) {
  const payload = await getPayloadClient()
  const records: Record<string, unknown>[] = []
  let page = 1

  while (true) {
    const result = await payload.find({
      collection: 'programmes',
      where: { category: { equals: categoryId } },
      limit: 500,
      page,
      depth: 0,
      sort: 'sortOrder',
      overrideAccess: false,
    })
    records.push(...(result.docs as unknown as Record<string, unknown>[]))
    if (!result.hasNextPage) return records
    page += 1
  }
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
  mergeItem: (_cmsItem: T | undefined, _defaultItem: T) => T,
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

  const defaultOrder = new Map(defaults.map((item, index) => [item.slug, index]))
  const cmsOrder = new Map(
    (cms ?? []).map((item, index) => [
      item.slug,
      {
        order: (item as T & { sortOrder?: number | null }).sortOrder,
        index,
      },
    ]),
  )

  return merged
    .map((item, index) => {
      const cmsPosition = cmsOrder.get(item.slug)
      return {
        item,
        order:
          typeof cmsPosition?.order === 'number'
            ? cmsPosition.order
            : (defaultOrder.get(item.slug) ?? index),
        tieBreaker: cmsPosition?.index ?? index,
      }
    })
    .sort((left, right) => left.order - right.order || left.tieBreaker - right.tieBreaker)
    .map(({ item }) => item)
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
    conferences: links?.conferences || archiveFilterLinks.conferences,
    fdp: links?.fdp || archiveFilterLinks.fdp,
  }
}

export async function getProgrammesCatalogData() {
  try {
    const payload = await getPayloadClient()
    const [categoryRecords, programmeRecords, global] = await Promise.all([
      findAllCatalogueRecords('programmeCategories'),
      findAllCatalogueRecords('programmes'),
      payload.findGlobal({
        slug: 'programmesCatalog',
        depth: 0,
        select: { archiveFilterLinks: true },
        overrideAccess: false,
      }) as Promise<ProgrammesCatalogGlobal>,
    ])

    const programmesByCategory = programmesByCategoryId(programmeRecords)
    const categories = categoryRecords as unknown as CategoryRecord[]
    const education = categories
      .filter((category) => category.kind === 'education')
      .map((category) =>
        mapEducationCategory(
          category,
          programmesByCategory.get(String(category.id)) ?? [],
        ),
      )
    const training = categories
      .filter((category) => category.kind === 'training')
      .map((category) =>
        mapTrainingCategory(
          category,
          programmesByCategory.get(String(category.id)) ?? [],
        ),
      )
    return {
      educationCategories: normalizeEducation(education),
      trainingCategories: normalizeTraining(training),
      archiveFilterLinks: normalizeArchiveLinks(global.archiveFilterLinks),
    }
  } catch (error) {
    console.error('[programmes/catalog] Unable to load catalogue records', error)
    return { educationCategories, trainingCategories, archiveFilterLinks }
  }
}

export async function getEducationCategories() {
  try {
    const records = (await findAllCatalogueRecords('programmeCategories')) as unknown as CategoryRecord[]
    const categories = records
      .filter((category) => category.kind === 'education')
      .map((category) => mapEducationCategory(category, []))
    return normalizeEducation(categories)
  } catch (error) {
    console.error('[programmes/catalog] Unable to load education categories', error)
    return educationCategories
  }
}

export async function getTrainingCategories() {
  try {
    const records = (await findAllCatalogueRecords('programmeCategories')) as unknown as CategoryRecord[]
    const categories = records
      .filter((category) => category.kind === 'training')
      .map((category) => mapTrainingCategory(category, []))
    return normalizeTraining(categories)
  } catch (error) {
    console.error('[programmes/catalog] Unable to load training categories', error)
    return trainingCategories
  }
}

export async function getArchiveFilterLinks() {
  try {
    const payload = await getPayloadClient()
    const global = (await payload.findGlobal({
      slug: 'programmesCatalog',
      depth: 0,
      select: { archiveFilterLinks: true },
      overrideAccess: false,
    })) as ProgrammesCatalogGlobal
    return normalizeArchiveLinks(global.archiveFilterLinks)
  } catch (error) {
    console.error('[programmes/catalog] Unable to load archive filter links', error)
    return archiveFilterLinks
  }
}

export async function getEducationCategory(slug: string): Promise<EducationCategory | undefined> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'programmeCategories',
      where: {
        and: [{ kind: { equals: 'education' } }, { slug: { equals: slug } }],
      },
      limit: 1,
      depth: 0,
      overrideAccess: false,
    })
    const doc = result.docs[0]
    if (!doc) return (await getEducationCategories()).find((category) => category.slug === slug)
    const category = mapEducationCategory(
      doc as unknown as CategoryRecord,
      (programmesByCategoryId(await findProgrammesForCategory(doc.id)).get(String(doc.id)) ?? []),
    )
    return normalizeEducation([category]).find((item) => item.slug === slug)
  } catch (error) {
    console.error(`[programmes/catalog] Unable to load education category "${slug}"`, error)
    return (await getEducationCategories()).find((category) => category.slug === slug)
  }
}

export async function getTrainingCategory(slug: string): Promise<TrainingCategory | undefined> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'programmeCategories',
      where: {
        and: [{ kind: { equals: 'training' } }, { slug: { equals: slug } }],
      },
      limit: 1,
      depth: 0,
      overrideAccess: false,
    })
    const doc = result.docs[0]
    if (!doc) return (await getTrainingCategories()).find((category) => category.slug === slug)
    const category = mapTrainingCategory(
      doc as unknown as CategoryRecord,
      (programmesByCategoryId(await findProgrammesForCategory(doc.id)).get(String(doc.id)) ?? []),
    )
    return normalizeTraining([category]).find((item) => item.slug === slug)
  } catch (error) {
    console.error(`[programmes/catalog] Unable to load training category "${slug}"`, error)
    return (await getTrainingCategories()).find((category) => category.slug === slug)
  }
}

export function orderProgrammesByActiveEventSlugs(
  programmes: ProgrammeListItem[],
  activeEventSlugs: Set<string>,
): ProgrammeListItem[] {
  return programmes
    .map((programme, index) => ({ programme, index }))
    .sort((a, b) => {
      const aIsActive = activeEventSlugs.has(a.programme.eventSlug?.trim() ?? '')
      const bIsActive = activeEventSlugs.has(b.programme.eventSlug?.trim() ?? '')
      return Number(bIsActive) - Number(aIsActive) || a.index - b.index
    })
    .map(({ programme }) => programme)
}

export async function prioritizeActiveScheduledProgrammes(
  programmes: ProgrammeListItem[],
): Promise<ProgrammeListItem[]> {
  const eventSlugs = [
    ...new Set(
      programmes
        .map((programme) => programme.eventSlug?.trim())
        .filter((slug): slug is string => Boolean(slug)),
    ),
  ]
  if (eventSlugs.length === 0) return programmes

  return safeQuery('prioritizeActiveScheduledProgrammes', async () => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'events',
      where: {
        and: [{ published: { equals: true } }, { slug: { in: eventSlugs } }],
      },
      limit: eventSlugs.length,
      depth: 0,
      overrideAccess: false,
    })

    const now = new Date()
    const activeEventSlugs = new Set(
      (docs as AfrsEvent[])
        .filter(
          (event) =>
            event.registrationOpen !== false &&
            (isEventUpcoming(event, now) || isEventOngoing(event, now)),
        )
        .map((event) => event.slug)
        .filter((slug): slug is string => Boolean(slug)),
    )

    return orderProgrammesByActiveEventSlugs(programmes, activeEventSlugs)
  }, programmes)
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
