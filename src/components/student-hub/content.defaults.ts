import {
  FileText,
  FlaskConical,
  FolderOpen,
  Rss,
  BookCopy,
  PlayCircle,
  Microscope,
} from 'lucide-react'
import type { ExamPrepCardData, ResourceCardData } from '@/components/student-hub/types'

export const defaultAcademicResources: ResourceCardData[] = [
  {
    id: 'articles',
    title: 'Articles',
    description: 'In-depth articles covering the latest trends and basics of forensic science.',
    ctaLabel: 'Browse Library',
    href: '/student-hub/articles',
    icon: 'FileText',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
  },
  {
    id: 'research',
    title: 'Research Papers',
    description: 'Access peer-reviewed papers and thesis work from scholars worldwide.',
    ctaLabel: 'Access Papers',
    href: '/student-hub/research',
    icon: 'FlaskConical',
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-500',
  },
  {
    id: 'cases',
    title: 'Case Studies',
    description: 'Real-world forensic investigations and solved criminal cases.',
    ctaLabel: 'Read Cases',
    href: '/student-hub/cases',
    icon: 'FolderOpen',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-500',
  },
  {
    id: 'blogs',
    title: 'Blogs',
    description: 'Expert opinions, news, and updates from the forensic community.',
    ctaLabel: 'Read Blogs',
    href: '/student-hub/blogs',
    icon: 'Rss',
    iconBg: 'bg-pink-50',
    iconColor: 'text-pink-500',
  },
  {
    id: 'elibrary',
    title: 'E-Library',
    description: 'Digital books, journals, and reference materials at your fingertips.',
    ctaLabel: 'Enter Library',
    href: '/student-hub/library',
    icon: 'BookCopy',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
  },
  {
    id: 'videos',
    title: 'Video Lectures',
    description: 'Curated video content and recorded webinars for visual learning.',
    ctaLabel: 'Watch Now',
    href: '/student-hub/videos',
    icon: 'PlayCircle',
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
  },
  {
    id: 'practical',
    title: 'Practical Learning',
    description: 'Virtual lab simulations and practical guides for laboratory procedures.',
    ctaLabel: 'Start Experiment',
    href: '/student-hub/practical',
    icon: 'Microscope',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
    featured: true,
  },
]

export const defaultExamPrep: ExamPrepCardData[] = [
  { id: 'ugc-net', badge: 'Comprehensive Preparation Guidance', title: 'UGC NET', subtitle: 'Forensic Science Paper II & III', description: 'Topic-wise notes, previous-year question analysis, mock test series, and mentor support for the National Eligibility Test in forensic science.', ctaLabel: 'View Preparation Resources', href: '/student-hub/ugc-net', watermark: '🎓' },
  { id: 'set-exam', badge: 'State Eligibility Track', title: 'SET / SLET', subtitle: 'State-Level Forensic Eligibility', description: 'Curated syllabi, practice papers, and revision schedules for state-level eligibility examinations relevant to forensic educators.', ctaLabel: 'Explore Guide', href: '/student-hub/ugc-net', watermark: '⚗️' },
]


export const defaultUgcNetAchievers = [
  { name: 'Dr. Ananya S.' },
  { name: 'Rahul Mehta' },
  { name: 'Siddharth V.' },
  { name: 'Priya Sharma' },
  { name: 'Aman Singh' },
  { name: 'Neha Kapur' },
  { name: 'Vikram Rao' },
]

