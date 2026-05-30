export type EducationProgramme = {
  id: string
  icon: string
  title: string
  description: string
  href: string
}

export type TrainingOption = {
  id: string
  icon: string
  title: string
  tag: string
  tagTone: 'blue' | 'green' | 'purple' | 'orange'
}

export type HubEventCard = {
  id: string
  slug: string
  title: string
  description: string
  eventType: string
  eventTypeLabel: string
  startDate: string
  visualTone: 'blue' | 'orange' | 'purple'
  visualIcon: string
}

export type ResourcePerson = {
  id: string
  name: string
  title: string
  photoUrl?: string
  initials: string
}

export type ArchiveItem = {
  label: string
  count: string
}

export type GalleryThumb = {
  id: string
  src: string
  alt: string
}
