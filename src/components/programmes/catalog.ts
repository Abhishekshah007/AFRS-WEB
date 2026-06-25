import type { EducationProgramme, TrainingOption } from '@/components/programmes/types'
import {
  defaultArchiveFilterLinks,
  defaultEducationCategories,
  defaultTrainingCategories,
} from '@/components/programmes/catalog.defaults'
import { getPayloadClient } from '@/lib/payload'

type TagTone = TrainingOption['tagTone']

export type ProgrammeListItem = {
  id: string
  title: string
  description: string
  duration: string
  mode: string
  level?: string
}

export type EducationCategory = {
  slug: string
  icon: string
  title: string
  summary: string
  programmes: ProgrammeListItem[]
}

export type TrainingCategory = {
  slug: string
  icon: string
  title: string
  tag: string
  tagTone: TagTone
  summary: string
  programmes: ProgrammeListItem[]
}

export type ArchiveFilterLinks = {
  nationalEvents: string
  internationalEvents: string
  workshops: string
  webinars: string
}

export const educationCategories: EducationCategory[] = defaultEducationCategories
export const trainingCategories: TrainingCategory[] = defaultTrainingCategories
export const archiveFilterLinks: ArchiveFilterLinks = defaultArchiveFilterLinks

type ProgrammesCatalogGlobal = {
  educationCategories?: EducationCategory[]
  trainingCategories?: TrainingCategory[]
  archiveFilterLinks?: Partial<ArchiveFilterLinks>
}

function isTagTone(value: string | null | undefined): value is TagTone {
  return value === 'blue' || value === 'green' || value === 'purple' || value === 'orange'
}

function normalizeEducation(categories: EducationCategory[] | undefined): EducationCategory[] {
  if (!categories?.length) return educationCategories
  return categories.filter((c) => c?.slug && c?.title)
}

function normalizeTraining(categories: TrainingCategory[] | undefined): TrainingCategory[] {
  if (!categories?.length) return trainingCategories
  return categories.filter((c) => c?.slug && c?.title).map((c) => ({ ...c, tagTone: isTagTone(c.tagTone) ? c.tagTone : 'blue' }))
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
    const global = (await payload.findGlobal({ slug: 'programmesCatalog', depth: 0, overrideAccess: false })) as ProgrammesCatalogGlobal

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
  return (await getEducationCategories()).map((c) => ({ id: c.slug, icon: c.icon, title: c.title, description: c.summary, href: `/courses/education/${c.slug}` }))
}

export async function trainingOptionsForHub(): Promise<TrainingOption[]> {
  return (await getTrainingCategories()).map((c) => ({ id: c.slug, slug: c.slug, icon: c.icon, title: c.title, summary: c.summary, tag: c.tag, tagTone: c.tagTone, href: `/courses/training/${c.slug}` }))
}
