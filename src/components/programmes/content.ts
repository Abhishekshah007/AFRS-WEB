import type {
  ArchiveItem,
  EducationProgramme,
  GalleryThumb,
  HubEventCard,
  ResourcePerson,
  TrainingOption,
} from '@/components/programmes/types'
import { PROGRAMME_IMAGES } from '@/components/programmes/tokens'

export const defaultEducationProgrammes: EducationProgramme[] = [
  {
    id: 'online',
    icon: '💻',
    title: 'Training Online',
    description: 'Live and recorded forensic modules accessible from anywhere with mentor support.',
    href: '/contact',
  },
  {
    id: 'professional',
    icon: '🎓',
    title: 'Forensic Professional Course',
    description: 'Structured certification pathways for investigators and laboratory professionals.',
    href: '/contact',
  },
  {
    id: 'certificate',
    icon: '📜',
    title: 'Certificate Programme',
    description: 'Short-term credentials in document, digital, and biological forensic disciplines.',
    href: '/contact',
  },
  {
    id: 'workshop',
    icon: '🔬',
    title: 'Workshop Series',
    description: 'Hands-on sessions led by practicing forensic scientists and guest faculty.',
    href: '/events',
  },
]

export const defaultTrainingOptions: TrainingOption[] = [
  { id: '1', icon: '🖥', title: 'Online Training', tag: 'Virtual', tagTone: 'blue' },
  { id: '2', icon: '🧪', title: 'Lab Based Training', tag: 'On-site', tagTone: 'green' },
  { id: '3', icon: '🌐', title: 'Online Internship', tag: 'Virtual', tagTone: 'blue' },
  { id: '4', icon: '🏛', title: 'Lab Based Internship', tag: 'On-site', tagTone: 'green' },
  { id: '5', icon: '📚', title: 'Dissertation', tag: 'Academic', tagTone: 'purple' },
  { id: '6', icon: '📄', title: 'Research Articles', tag: 'Academic', tagTone: 'orange' },
]

export const defaultHubEvents: HubEventCard[] = [
  {
    id: 'e1',
    slug: 'crime-scene-workshop',
    title: 'Advanced Crime Scene Investigation Workshop',
    description: 'Field documentation, evidence packaging, and chain-of-custody protocols for complex scenes.',
    eventType: 'workshop',
    eventTypeLabel: 'Workshop',
    startDate: new Date(Date.now() + 86400000 * 30).toISOString(),
    visualTone: 'blue',
    visualIcon: '👥',
  },
  {
    id: 'e2',
    slug: 'forensic-conference',
    title: 'National Forensic Science Conference 2026',
    description: 'Keynotes, panel discussions, and networking with researchers and agency leaders.',
    eventType: 'conference',
    eventTypeLabel: 'Conference',
    startDate: new Date(Date.now() + 86400000 * 60).toISOString(),
    visualTone: 'orange',
    visualIcon: '🌐',
  },
  {
    id: 'e3',
    slug: 'digital-forensics-training',
    title: 'Digital Forensics Bootcamp for Students',
    description: 'Mobile imaging, cloud artifacts, and report writing for academic and internship readiness.',
    eventType: 'training',
    eventTypeLabel: 'Training',
    startDate: new Date(Date.now() + 86400000 * 45).toISOString(),
    visualTone: 'purple',
    visualIcon: '🎓',
  },
]

export const defaultArchive: ArchiveItem[] = [
  { label: 'National Events', count: '12 Nos' },
  { label: 'International Events', count: '08 Nos' },
  { label: 'Workshops', count: '24 Nos' },
  { label: 'Webinars', count: '18 Nos' },
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

export const trainingChecklist = [
  'Hands-on training with certified forensic scientists',
  'Industry-recognized certification pathways',
  'Flexible online and on-site learning options',
]

export const tagToneClass: Record<TrainingOption['tagTone'], string> = {
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-emerald-100 text-emerald-700',
  purple: 'bg-violet-100 text-violet-700',
  orange: 'bg-orange-100 text-orange-700',
}

export const eventVisualClass: Record<HubEventCard['visualTone'], string> = {
  blue: 'bg-blue-50',
  orange: 'bg-orange-50',
  purple: 'bg-violet-50',
}
