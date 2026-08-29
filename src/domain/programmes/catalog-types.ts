import type { TrainingOption } from '@/components/programmes/types'

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
  intro?: string | null
  programmes: ProgrammeListItem[]
}

export type CategoryExtraSection = {
  title: string
  items: string[]
  note?: string | null
}

export type TrainingCategory = {
  slug: string
  icon: string
  title: string
  tag: string
  tagTone: TrainingOption['tagTone']
  summary: string
  intro?: string | null
  body?: string | null
  highlightsTitle?: string | null
  highlightsNote?: string | null
  whoCanApply?: string[] | null
  outcomesTitle?: string | null
  outcomes?: string[] | null
  ctaLabel?: string | null
  vision?: string | null
  missionTitle?: string | null
  missionItems?: string[] | null
  extraSections?: CategoryExtraSection[] | null
  disclaimer?: string | null
  programmes: ProgrammeListItem[]
}

export type ArchiveFilterLinks = {
  nationalEvents: string
  internationalEvents: string
  workshops: string
  webinars: string
}
