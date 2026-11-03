import type { Payload, PayloadRequest } from 'payload'

import {
  defaultEducationCategories,
  defaultTrainingCategories,
} from '@/data/defaults/programmes/catalog'
import type {
  EducationCategory,
  ProgrammeListItem,
  TrainingCategory,
} from '@/domain/programmes/catalog-types'
import type { Programme, ProgrammeCategory, ProgrammesCatalog } from '@/payload-types'

type LegacyTrainingCategory = Omit<
  TrainingCategory,
  'programmes' | 'whoCanApply' | 'outcomes' | 'missionItems' | 'extraSections'
> & {
  programmes?: ProgrammeListItem[]
  whoCanApply?: unknown
  outcomes?: unknown
  missionItems?: unknown
  extraSections?: unknown
}

type LegacyCatalog = {
  educationCategories?: LegacyEducationCategory[] | null
  trainingCategories?: LegacyTrainingCategory[] | null
}

type LegacyEducationCategory = Omit<EducationCategory, 'programmes'> & {
  programmes?: ProgrammeListItem[]
}

type CatalogueCategoryInput = {
  kind: 'education' | 'training'
  slug: string
  icon: string
  title: string
  summary: string
  intro?: string | null
  tag?: string | null
  tagTone?: 'blue' | 'green' | 'purple' | 'orange' | null
  sortOrder: number
  body?: string | null
  highlightsTitle?: string | null
  highlightsNote?: string | null
  whoCanApply?: { text: string }[]
  outcomesTitle?: string | null
  outcomes?: { text: string }[]
  ctaLabel?: string | null
  vision?: string | null
  missionTitle?: string | null
  missionItems?: { text: string }[]
  extraSections?: {
    title: string
    items: { text: string }[]
    note?: string | null
  }[]
  disclaimer?: string | null
}

type CatalogueProgrammeInput = Omit<Programme, 'id' | 'createdAt' | 'updatedAt' | 'category'> & {
  category: number
}

async function findAll(
  payload: Payload,
  collection: 'programmeCategories' | 'programmes',
  req: PayloadRequest,
): Promise<Record<string, unknown>[]> {
  const docs: Record<string, unknown>[] = []
  let page = 1

  while (true) {
    const result = await payload.find({
      collection,
      limit: 500,
      page,
      depth: 0,
      sort: 'sortOrder',
      overrideAccess: true,
      req,
    })
    docs.push(...(result.docs as unknown as Record<string, unknown>[]))
    if (!result.hasNextPage) return docs
    page += 1
  }
}

function textRows(value: unknown): { text: string }[] {
  if (!Array.isArray(value)) return []
  return value
    .map((item) => (typeof item === 'string' ? item : (item as { text?: unknown })?.text))
    .filter((text): text is string => typeof text === 'string')
    .map((text) => ({ text }))
}

function extraSectionRows(value: unknown): CatalogueCategoryInput['extraSections'] {
  if (!Array.isArray(value)) return []
  return value.map((section) => {
    const item = section as { title?: string; note?: string | null; items?: unknown }
    return {
      title: item.title ?? '',
      note: item.note ?? null,
      items: textRows(item.items),
    }
  })
}

function validTagTone(
  value: TrainingCategory['tagTone'] | null | undefined,
): 'blue' | 'green' | 'purple' | 'orange' | undefined {
  return value === 'blue' || value === 'green' || value === 'purple' || value === 'orange'
    ? value
    : undefined
}

function categoryKey(kind: 'education' | 'training', slug: string): string {
  return `${kind}:${slug}`
}

function categoryInput(
  source: LegacyEducationCategory | LegacyTrainingCategory,
  kind: 'education' | 'training',
  sortOrder: number,
): CatalogueCategoryInput {
  const training = source as LegacyTrainingCategory
  return {
    kind,
    slug: source.slug,
    icon: source.icon,
    title: source.title,
    summary: source.summary,
    intro: source.intro,
    tag: training.tag,
    tagTone: validTagTone(training.tagTone),
    sortOrder,
    body: training.body,
    highlightsTitle: training.highlightsTitle,
    highlightsNote: training.highlightsNote,
    whoCanApply: textRows(training.whoCanApply),
    outcomesTitle: training.outcomesTitle,
    outcomes: textRows(training.outcomes),
    ctaLabel: training.ctaLabel,
    vision: training.vision,
    missionTitle: training.missionTitle,
    missionItems: textRows(training.missionItems),
    extraSections: extraSectionRows(training.extraSections),
    disclaimer: training.disclaimer,
  }
}

function relatedId(value: Programme['category']): number {
  return typeof value === 'number' ? value : value.id
}

function programmeInput(
  item: ProgrammeListItem,
  categoryId: number,
  sortOrder: number,
): CatalogueProgrammeInput {
  if (!item.id?.trim()) {
    throw new Error(`Cannot migrate a programme without an identifier in category ${categoryId}.`)
  }
  return {
    category: categoryId,
    programmeId: item.id,
    title: item.title,
    description: item.description,
    duration: item.duration,
    mode: item.mode,
    level: item.level,
    eventSlug: item.eventSlug,
    organization: item.organization || 'afrs',
    registration: item.registration as Programme['registration'],
    sortOrder,
  }
}

export async function migrateProgrammeCatalogToCollections(
  payload: Payload,
  req: PayloadRequest,
): Promise<void> {
  const legacy = (await payload.findGlobal({
    slug: 'programmesCatalog',
    depth: 0,
    overrideAccess: true,
    req,
  })) as unknown as LegacyCatalog
  const education = legacy.educationCategories?.length
    ? legacy.educationCategories
    : defaultEducationCategories
  const training = legacy.trainingCategories?.length
    ? legacy.trainingCategories
    : defaultTrainingCategories
  const [existingCategoryRecords, existingProgrammeRecords] = await Promise.all([
    findAll(payload, 'programmeCategories', req),
    findAll(payload, 'programmes', req),
  ])
  const categoriesByRoute = new Map(
    (existingCategoryRecords as unknown as ProgrammeCategory[]).map((category) => [
      categoryKey(category.kind, category.slug),
      category,
    ]),
  )
  const programmesById = new Map(
    (existingProgrammeRecords as unknown as Programme[]).map((programme) => [
      programme.programmeId,
      programme,
    ]),
  )
  const importedProgrammeIds = new Set<string>()

  const importCategory = async (
    category: LegacyEducationCategory | LegacyTrainingCategory,
    kind: 'education' | 'training',
    sortOrder: number,
  ) => {
    let categoryDoc = categoriesByRoute.get(categoryKey(kind, category.slug))
    if (!categoryDoc) {
      categoryDoc = await payload.create({
        collection: 'programmeCategories',
        data: categoryInput(category, kind, sortOrder),
        overrideAccess: true,
        req,
      })
    }
    categoriesByRoute.set(categoryKey(kind, category.slug), categoryDoc)

    for (const [index, item] of (category.programmes ?? []).entries()) {
      if (importedProgrammeIds.has(item.id)) {
        throw new Error(`Programme identifier "${item.id}" is duplicated in the legacy catalogue.`)
      }
      importedProgrammeIds.add(item.id)

      const existing = programmesById.get(item.id)
      if (existing) {
        if (relatedId(existing.category) !== categoryDoc.id) {
          throw new Error(
            `Programme identifier "${item.id}" is already linked to a different category.`,
          )
        }
        continue
      }
      const created = await payload.create({
        collection: 'programmes',
        data: programmeInput(item, categoryDoc.id, index),
        overrideAccess: true,
        req,
      })
      programmesById.set(item.id, created)
    }
  }

  for (const [index, category] of education.entries()) {
    await importCategory(category, 'education', index)
  }
  for (const [index, category] of training.entries()) {
    await importCategory(category, 'training', index)
  }

  await payload.updateGlobal({
    slug: 'programmesCatalog',
    data: { educationCategories: [], trainingCategories: [] },
    overrideAccess: true,
    req,
  })
}

function legacyProgramme(programme: Programme): ProgrammeListItem {
  return {
    id: programme.programmeId,
    organization: programme.organization,
    title: programme.title,
    description: programme.description,
    duration: programme.duration,
    mode: programme.mode,
    level: programme.level ?? undefined,
    eventSlug: programme.eventSlug,
    registration: programme.registration,
  }
}

export async function restoreProgrammeCatalogGlobal(
  payload: Payload,
  req: PayloadRequest,
): Promise<void> {
  const [categoryRecords, programmeRecords] = await Promise.all([
    findAll(payload, 'programmeCategories', req),
    findAll(payload, 'programmes', req),
  ])
  const programmes = programmeRecords as unknown as Programme[]
  const educationCategories: LegacyEducationCategory[] = []
  const trainingCategories: LegacyTrainingCategory[] = []

  for (const category of categoryRecords as unknown as ProgrammeCategory[]) {
    const categoryProgrammes = programmes
      .filter((programme) => relatedId(programme.category) === category.id)
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      .map(legacyProgramme)
    const common = {
      slug: category.slug,
      icon: category.icon,
      title: category.title,
      summary: category.summary,
      intro: category.intro,
    }

    if (category.kind === 'education') {
      educationCategories.push({ ...common, programmes: categoryProgrammes })
      continue
    }

    trainingCategories.push({
      ...common,
      tag: category.tag ?? '',
      tagTone: category.tagTone ?? 'blue',
      body: category.body,
      highlightsTitle: category.highlightsTitle,
      highlightsNote: category.highlightsNote,
      whoCanApply: category.whoCanApply ?? [],
      outcomesTitle: category.outcomesTitle,
      outcomes: category.outcomes ?? [],
      ctaLabel: category.ctaLabel,
      vision: category.vision,
      missionTitle: category.missionTitle,
      missionItems: category.missionItems ?? [],
      extraSections: category.extraSections ?? [],
      disclaimer: category.disclaimer,
      programmes: categoryProgrammes,
    })
  }

  await payload.updateGlobal({
    slug: 'programmesCatalog',
    data: {
      educationCategories:
        educationCategories as unknown as ProgrammesCatalog['educationCategories'],
      trainingCategories: trainingCategories as unknown as ProgrammesCatalog['trainingCategories'],
    },
    overrideAccess: true,
    req,
  })
}
