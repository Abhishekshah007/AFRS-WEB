import type { ExamPrepCardData, ResourceCardData } from '@/components/student-hub/types'

export const defaultAcademicResources: ResourceCardData[] = [
  { id: 'articles', title: 'Articles', description: 'Expert-written articles on forensic methods, case analysis, and emerging research.', ctaLabel: 'Browse Library', href: '/student-hub/articles', icon: '📄', iconBg: 'bg-violet-100' },
  { id: 'papers', title: 'Research Papers', description: 'Peer-reviewed papers and thesis references for academic citation and study.', ctaLabel: 'Browse Papers', href: '/search?q=research', icon: '📑', iconBg: 'bg-blue-100' },
  { id: 'cases', title: 'Case Studies', description: 'Real-world investigation summaries with learning outcomes and discussion points.', ctaLabel: 'View Cases', href: '/search?q=case+studies', icon: '🔍', iconBg: 'bg-pink-100' },
  { id: 'blogs', title: 'Blogs', description: 'Updates from AFRS faculty, students, and guest contributors in forensic science.', ctaLabel: 'Read Blogs', href: '/search?q=blog', icon: '✍️', iconBg: 'bg-indigo-100' },
  { id: 'elibrary', title: 'E-Library', description: 'Digital books, handouts, and reference material available to registered students.', ctaLabel: 'Open E-Library', href: '/search?q=library', icon: '📚', iconBg: 'bg-emerald-100' },
  { id: 'video', title: 'Video Lectures', description: 'Recorded sessions covering core forensic topics and lab demonstrations.', ctaLabel: 'Watch Lectures', href: '/student-hub/ugc-net', icon: '🎬', iconBg: 'bg-cyan-100' },
  { id: 'practical', title: 'Practical Learning', description: 'Virtual simulations, lab guides, and step-by-step practical modules for hands-on skill development.', ctaLabel: 'Start Learning', href: '/student-hub/ugc-net', icon: '🧪', iconBg: 'bg-amber-100', featured: true },
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

