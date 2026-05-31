import type { EducationProgramme, TrainingOption } from '@/components/programmes/types'

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

export const educationCategories: EducationCategory[] = [
  {
    slug: 'training-online',
    icon: '💻',
    title: 'Training Online',
    summary: 'Live and recorded forensic modules accessible from anywhere with mentor support.',
    programmes: [
      {
        id: 'to-1',
        title: 'Introduction to Forensic Science (Online)',
        description: 'Foundational modules covering crime scene basics, evidence types, and legal procedure.',
        duration: '6 weeks',
        mode: 'Online',
        level: 'Beginner',
      },
      {
        id: 'to-2',
        title: 'Digital Evidence Handling — Remote Lab',
        description: 'Virtual lab exercises for imaging, hashing, and chain-of-custody documentation.',
        duration: '8 weeks',
        mode: 'Online',
        level: 'Intermediate',
      },
      {
        id: 'to-3',
        title: 'Document Examination — Online Cohort',
        description: 'Handwriting comparison, ink analysis theory, and case study reviews with faculty Q&A.',
        duration: '10 weeks',
        mode: 'Online',
        level: 'Intermediate',
      },
      {
        id: 'to-4',
        title: 'Forensic Report Writing Masterclass',
        description: 'Structured reporting for courts and agencies with peer-reviewed assignments.',
        duration: '4 weeks',
        mode: 'Online',
        level: 'All levels',
      },
    ],
  },
  {
    slug: 'forensic-professional-course',
    icon: '🎓',
    title: 'Forensic Professional Course',
    summary: 'Structured certification pathways for investigators and laboratory professionals.',
    programmes: [
      {
        id: 'fp-1',
        title: 'Professional Diploma in Forensic Investigation',
        description: 'End-to-end investigation workflow from scene to courtroom testimony.',
        duration: '12 months',
        mode: 'Hybrid',
        level: 'Advanced',
      },
      {
        id: 'fp-2',
        title: 'Advanced Crime Scene Management',
        description: 'Complex scene documentation, team coordination, and multi-agency protocols.',
        duration: '3 months',
        mode: 'On-site',
        level: 'Advanced',
      },
      {
        id: 'fp-3',
        title: 'Laboratory Quality & Accreditation Prep',
        description: 'ISO-aligned practices for forensic laboratories and audit readiness.',
        duration: '6 weeks',
        mode: 'Hybrid',
        level: 'Professional',
      },
    ],
  },
  {
    slug: 'certificate-programme',
    icon: '📜',
    title: 'Certificate Programme',
    summary: 'Short-term credentials in document, digital, and biological forensic disciplines.',
    programmes: [
      {
        id: 'cp-1',
        title: 'Certificate in Forensic Document Examination',
        description: 'Handwriting, typeface, ink analysis, and alteration detection.',
        duration: '3 months',
        mode: 'Hybrid',
        level: 'Beginner',
      },
      {
        id: 'cp-2',
        title: 'Certificate in Digital Forensics',
        description: 'Mobile imaging, network forensics, and legal aspects of digital evidence.',
        duration: '3 months',
        mode: 'Online',
        level: 'Intermediate',
      },
      {
        id: 'cp-3',
        title: 'Certificate in Forensic Ballistics',
        description: 'Firearm identification, wound patterns, and trajectory reconstruction.',
        duration: '2 months',
        mode: 'On-site',
        level: 'Intermediate',
      },
    ],
  },
  {
    slug: 'workshop-series',
    icon: '🔬',
    title: 'Workshop Series',
    summary: 'Hands-on sessions led by practicing forensic scientists and guest faculty.',
    programmes: [
      {
        id: 'ws-1',
        title: 'Crime Scene Photography Workshop',
        description: 'Lighting, scale placement, and admissible photographic documentation.',
        duration: '2 days',
        mode: 'On-site',
      },
      {
        id: 'ws-2',
        title: 'Toxicology Sample Collection Workshop',
        description: 'Sampling protocols, preservation, and transport for toxicological analysis.',
        duration: '1 day',
        mode: 'On-site',
      },
      {
        id: 'ws-3',
        title: 'Expert Witness Testimony Workshop',
        description: 'Courtroom presentation skills and cross-examination preparation.',
        duration: '3 days',
        mode: 'Hybrid',
      },
    ],
  },
]

export const trainingCategories: TrainingCategory[] = [
  {
    slug: 'online-training',
    icon: '🖥',
    title: 'Online Training',
    tag: 'Virtual',
    tagTone: 'blue',
    summary: 'Instructor-led virtual modules with assessments and mentor feedback.',
    programmes: [
      {
        id: 'ot-1',
        title: 'Forensic Biology — Online Module',
        description: 'DNA concepts, sample types, and report interpretation for non-lab staff.',
        duration: '6 weeks',
        mode: 'Virtual',
      },
      {
        id: 'ot-2',
        title: 'Cybercrime Investigation Basics',
        description: 'Introduction to digital evidence, OSINT, and case documentation.',
        duration: '8 weeks',
        mode: 'Virtual',
      },
    ],
  },
  {
    slug: 'lab-based-training',
    icon: '🧪',
    title: 'Lab Based Training',
    tag: 'On-site',
    tagTone: 'green',
    summary: 'Practical bench work at AFSL under senior scientists.',
    programmes: [
      {
        id: 'lb-1',
        title: 'Trace Evidence Practical Training',
        description: 'Microscopy, fiber comparison, and glass fracture analysis.',
        duration: '4 weeks',
        mode: 'On-site',
      },
      {
        id: 'lb-2',
        title: 'Serology & DNA Bench Training',
        description: 'Presumptive tests, extraction workflows, and contamination control.',
        duration: '6 weeks',
        mode: 'On-site',
      },
    ],
  },
  {
    slug: 'online-internship',
    icon: '🌐',
    title: 'Online Internship',
    tag: 'Virtual',
    tagTone: 'blue',
    summary: 'Remote case reviews and supervised assignments with weekly check-ins.',
    programmes: [
      {
        id: 'oi-1',
        title: 'Virtual Case File Internship',
        description: 'Review anonymized case files and draft forensic summaries.',
        duration: '4–6 weeks',
        mode: 'Virtual',
      },
      {
        id: 'oi-2',
        title: 'Research & Literature Internship',
        description: 'Literature reviews and bibliography support for faculty projects.',
        duration: '6 weeks',
        mode: 'Virtual',
      },
    ],
  },
  {
    slug: 'lab-based-internship',
    icon: '🏛',
    title: 'Lab Based Internship',
    tag: 'On-site',
    tagTone: 'green',
    summary: 'Placement in AFSL laboratories with structured rotation schedule.',
    programmes: [
      {
        id: 'li-1',
        title: 'AFSL Summer Internship Programme',
        description: 'Rotations across document, biology, and chemistry units.',
        duration: '6 weeks',
        mode: 'On-site',
      },
      {
        id: 'li-2',
        title: 'Extended Laboratory Internship',
        description: 'In-depth placement with capstone report and faculty evaluation.',
        duration: '12 weeks',
        mode: 'On-site',
      },
    ],
  },
  {
    slug: 'dissertation',
    icon: '📚',
    title: 'Dissertation',
    tag: 'Academic',
    tagTone: 'purple',
    summary: 'Supervised dissertation support with access to faculty and library resources.',
    programmes: [
      {
        id: 'ds-1',
        title: 'M.Sc. Dissertation Mentorship',
        description: 'Topic selection, methodology review, and draft feedback sessions.',
        duration: '6–12 months',
        mode: 'Academic',
      },
      {
        id: 'ds-2',
        title: 'Ph.D. Research Advisory',
        description: 'Periodic reviews with subject-matter scientists at AFRS.',
        duration: 'Flexible',
        mode: 'Academic',
      },
    ],
  },
  {
    slug: 'research-articles',
    icon: '📄',
    title: 'Research Articles',
    tag: 'Academic',
    tagTone: 'orange',
    summary: 'Co-authorship and publication guidance for forensic research.',
    programmes: [
      {
        id: 'ra-1',
        title: 'Student Research Publication Track',
        description: 'From abstract to journal submission with editorial support.',
        duration: '3–6 months',
        mode: 'Academic',
      },
      {
        id: 'ra-2',
        title: 'Collaborative Case Study Papers',
        description: 'Joint publications with AFRS scientists on anonymized casework.',
        duration: 'Variable',
        mode: 'Academic',
      },
    ],
  },
]

export function getEducationCategory(slug: string): EducationCategory | undefined {
  return educationCategories.find((c) => c.slug === slug)
}

export function getTrainingCategory(slug: string): TrainingCategory | undefined {
  return trainingCategories.find((c) => c.slug === slug)
}

export function educationProgrammesForHub(): EducationProgramme[] {
  return educationCategories.map((c) => ({
    id: c.slug,
    icon: c.icon,
    title: c.title,
    description: c.summary,
    href: `/courses/education/${c.slug}`,
  }))
}

export function trainingOptionsForHub(): TrainingOption[] {
  return trainingCategories.map((c) => ({
    id: c.slug,
    slug: c.slug,
    icon: c.icon,
    title: c.title,
    tag: c.tag,
    tagTone: c.tagTone,
    href: `/courses/training/${c.slug}`,
  }))
}

export const archiveFilterLinks: Record<string, string> = {
  'National Events': '/courses/events?nature=national',
  'International Events': '/courses/events?nature=international',
  Workshops: '/courses/events?type=workshop',
  Webinars: '/courses/events?type=webinar',
}
