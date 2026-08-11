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
  programmes: ProgrammeListItem[]
}

export type TrainingCategory = {
  slug: string
  icon: string
  title: string
  tag: string
  tagTone: TrainingOption['tagTone']
  summary: string
  programmes: ProgrammeListItem[]
}

export type ArchiveFilterLinks = {
  nationalEvents: string
  internationalEvents: string
  workshops: string
  webinars: string
}
