import type {
  ArchiveItem,
  GalleryThumb,
  HubEventCard,
  ResourcePerson,
} from '@/components/programmes/types'
import { PROGRAMME_IMAGES } from '@/components/programmes/tokens'

export const defaultHubEvents: HubEventCard[] = [
  {
    id: 'e1', slug: 'crime-scene-workshop', title: 'Advanced Crime Scene Investigation Workshop',
    description: 'A comprehensive deep dive into evidence collection and preservation techniques.',
    eventType: 'workshop', eventTypeLabel: 'Workshop', eventNature: 'national', startDate: '2024-03-15T00:00:00.000Z', visualTone: 'blue', visualIcon: '👥',
  },
  {
    id: 'e2', slug: 'forensic-conference', title: 'Global Forensic Science Innovation Summit',
    description: 'Leading experts discuss the future of digital forensics and cyber security.',
    eventType: 'conference', eventTypeLabel: 'Conference', eventNature: 'international', startDate: '2024-04-02T00:00:00.000Z', visualTone: 'orange', visualIcon: '🌐',
  },
  {
    id: 'e3', slug: 'faculty-toxicology-fdp', title: 'Faculty Development Programme on Toxicology',
    description: 'Enhancing teaching methodologies for forensic toxicology educators.',
    eventType: 'training', eventTypeLabel: 'FDP', eventNature: 'national', startDate: '2024-04-20T00:00:00.000Z', visualTone: 'purple', visualIcon: '🎓',
  },
]

export const defaultArchive: ArchiveItem[] = [
  { label: 'National Events', count: '12 Nos', href: '/courses/events?nature=national' },
  { label: 'International Events', count: '08 Nos', href: '/courses/events?nature=international' },
  { label: 'Workshops', count: '24 Nos', href: '/courses/events?type=workshop' },
  { label: 'Webinars', count: '18 Nos', href: '/courses/events?type=webinar' },
]

export const defaultResourcePersons: ResourcePerson[] = [
  { id: '1', name: 'Dr. Rajesh Kumar', title: 'Forensic Toxicologist', initials: 'RK' },
  { id: '2', name: 'Dr. Priya Sharma', title: 'Document Expert', initials: 'PS' },
]

export const defaultGallery: GalleryThumb[] = [
  { id: 'g1', src: PROGRAMME_IMAGES.gallery1, alt: 'AFRS training session' },
  { id: 'g2', src: PROGRAMME_IMAGES.gallery2, alt: 'Laboratory workshop' },
  { id: 'g3', src: PROGRAMME_IMAGES.gallery3, alt: 'Forensic conference' },
]

export const defaultTrainingChecklist = [
  'Hands-on training with certified forensic scientists',
  'Industry-recognized certification pathways',
  'Flexible online and on-site learning options',
]

export const tagToneClass: Record<'blue' | 'green' | 'purple' | 'orange' | 'slate', string> = {
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-emerald-100 text-emerald-700',
  purple: 'bg-violet-100 text-violet-700',
  orange: 'bg-orange-100 text-orange-700',
  slate: 'bg-slate-100 text-slate-600',
}

export const eventVisualClass: Record<HubEventCard['visualTone'], string> = {
  blue: 'bg-blue-50',
  orange: 'bg-orange-50',
  purple: 'bg-violet-50',
}
