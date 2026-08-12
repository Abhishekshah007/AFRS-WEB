import type { Scientist } from '@/payload-types'
import { UI } from '../design'

export const heroPanelImage =
  'https://res.cloudinary.com/drrzakkgo/image/upload/v1781617023/WhatsApp_Image_2026-06-16_at_6.35.45_PM_jfmudj.jpg'
export const eventCardImages = [
  'https://www.appliedforensicresearchsciences.in/static/media/carousel-10.6bcf7e5d176fb7d57b28.jpeg',
  'https://www.appliedforensicresearchsciences.in/static/media/carousel-6.37510e2cbc3800979dc5.jpeg',
  'https://www.appliedforensicresearchsciences.in/static/media/carousel-7.526a8153933073ab1327.jpeg',
]
export const aboutImage =
  'https://www.appliedforensicresearchsciences.in/static/media/carousel-9.49c91d30b5585ee2a892.jpeg'
export const galleryImages = [
  'https://res.cloudinary.com/drrzakkgo/image/upload/v1777273424/WhatsApp_Image_2026-04-15_at_11.53.12_PM_u2uvdf.jpg',
  'https://res.cloudinary.com/drrzakkgo/image/upload/v1777273424/WhatsApp_Image_2026-04-15_at_11.54.13_PM_gzfbix.jpg',
  'https://res.cloudinary.com/drrzakkgo/image/upload/v1777658711/d8sz7npdnmpz7pqeb78v.jpg',
  'https://res.cloudinary.com/drrzakkgo/image/upload/v1777273424/WhatsApp_Image_2026-04-15_at_11.53.12_PM_u2uvdf.jpg',
]

export const defaultImpactStats = [
  {
    value: '4000+',
    label: 'Students Trained',
    tone: 'blue',
    description: 'Hands-on forensic education across India.',
  },
  {
    value: '250+',
    label: 'Case Consultations',
    tone: 'red',
    description: 'Expert support for investigations and reporting.',
  },
  {
    value: '06+',
    label: 'Book Published',
    tone: 'orange',
    description: 'From crime scene to digital forensics.',
  },
  {
    value: '150+',
    label: 'Research Papers',
    tone: 'emerald',
    description: 'Collaboration with institutions nationwide.',
  },
  {
    value: '350+',
    label: 'Expert Sessions',
    tone: 'orange',
    description: 'Regular training and certification programs.',
  },
]

export const fallbackScientists: Pick<Scientist, 'name' | 'designation' | 'bio'>[] = [
  {
    name: 'Mr. Rakesh Mia',
    designation: 'Forensic Science Expert',
    bio: 'Specialized in analytical forensics, evidence interpretation, and academic mentoring.',
  },
  {
    name: 'Mr. Vijay',
    designation: 'Investigation Specialist',
    bio: 'Focused on practical case workflows, documentation standards, and lab methodology.',
  },
]

export const serviceIcons = [
  { label: 'Forensic Investigation', color: 'bg-indigo-100 text-indigo-600', accent: '#6366f1' },
  { label: 'Fingerprint Analysis', color: 'bg-blue-100 text-blue-600', accent: '#3b82f6' },
  { label: 'Questioned Documents', color: 'bg-violet-100 text-violet-600', accent: '#8b5cf6' },
  { label: 'Cyber Forensics', color: 'bg-cyan-100 text-cyan-700', accent: '#06b6d4' },
  { label: 'DNA Profiling', color: 'bg-emerald-100 text-emerald-600', accent: '#10b981' },
  { label: 'Forensic Training', color: 'bg-orange-100 text-orange-600', accent: '#f97316' },
]

export const CONTAINER = UI.container
export const SECTION = UI.section
