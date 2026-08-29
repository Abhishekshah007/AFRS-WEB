import type {
  ArchiveFilterLinks,
  EducationCategory,
  TrainingCategory,
} from '@/domain/programmes/catalog-types'
import {
  academicResourceItems,
  capsuleTrainingTitles,
  dissertationSupportSteps,
  knowledgeUpdateItems,
  labInternshipExposureTitles,
  labTrainingAreaTitles,
  labTrainingOutcomes,
  labTrainingWhoCanApply,
  onlineInternshipTitles,
  onlineTrainingTitles,
  policeTrainingTitles,
  professionalCourseTitles,
  programmeList,
  researchAreaTitles,
  researchMissionItems,
  studentSupportItems,
} from '@/data/defaults/programmes/lists'

export const defaultEducationCategories: EducationCategory[] = [
  {
    slug: 'training-online',
    icon: 'Video',
    title: 'One-Month Online Training',
    summary:
      'Structured one-month online modules covering core forensic science disciplines from FS-101 to FS-120.',
    intro:
      'AFRS offers one-month online training programmes designed to build subject knowledge across the forensic science curriculum.',
    programmes: programmeList(
      'ot',
      onlineTrainingTitles,
      '1 month',
      'Online',
      'All levels',
      'One-month online training covering core concepts, examination orientation and subject practice.',
    ),
  },
  {
    slug: 'online-internship',
    icon: 'Laptop',
    title: 'One-Month Online Internship',
    summary:
      'Remote internship tracks across forensic specialisations, including practical and tool-based learning.',
    intro:
      'One-month online internships help students apply forensic concepts through supervised, specialisation-focused assignments.',
    programmes: programmeList(
      'oi',
      onlineInternshipTitles,
      '1 month',
      'Online',
      'All levels',
      'One-month online internship with supervised assignments in this forensic specialisation.',
    ),
  },
  {
    slug: 'training-lab-based',
    icon: 'Award',
    title: 'Professional and Certificate Courses',
    summary:
      'Professional certificate programmes in core forensic domains and emerging areas of practice.',
    intro:
      'Certificate and professional courses for students and practitioners seeking structured credentials in specialised forensic fields.',
    programmes: programmeList(
      'pc',
      professionalCourseTitles,
      'As per programme',
      'Hybrid',
      'Professional',
      'Professional / certificate course in this forensic domain.',
    ),
  },
  {
    slug: 'capsule-training',
    icon: 'Timer',
    title: 'Capsule Training Programmes',
    summary:
      'Short, focused training modules on specialised forensic topics, casework themes and current legal frameworks.',
    intro:
      'Capsule programmes provide intensive coverage of selected forensic topics. Duration and eligibility vary by module.',
    programmes: programmeList(
      'ct',
      capsuleTrainingTitles,
      'As per programme',
      'Hybrid',
      'Intermediate',
      'Short, focused capsule training on this specialised forensic topic.',
    ),
  },
  {
    slug: 'police-training',
    icon: 'Shield',
    title: 'Police Training Programmes',
    summary:
      'Professional programmes for forensic, prosecution and investigation officers on new criminal laws and specialised casework.',
    intro:
      'Police and investigation-oriented programmes covering new criminal laws, digital evidence, NDPS cases and courtroom-ready forensic practice.',
    programmes: programmeList(
      'pt',
      policeTrainingTitles,
      'As per programme',
      'On-site',
      'Professional',
      'Professional training module for investigation, prosecution and forensic officers.',
    ),
  },
  {
    slug: 'research-workshops',
    icon: 'Library',
    title: 'Research Areas',
    summary:
      'Academically structured and research-relevant dissertation topics across key forensic domains.',
    intro:
      'AFSL provides academically structured and research-relevant dissertation topics across key forensic domains.',
    programmes: programmeList(
      'ra',
      researchAreaTitles,
      'Flexible',
      'Academic',
      'Academic',
      'Academically structured research / dissertation topic in this forensic domain.',
    ),
  },
]

export const defaultTrainingCategories: TrainingCategory[] = [
  {
    slug: 'online-training',
    icon: 'Video',
    title: 'Online Training',
    tag: 'Virtual',
    tagTone: 'blue',
    summary: 'Instructor-led virtual modules with assessments and mentor feedback.',
    programmes: programmeList(
      'afsl-ot',
      onlineTrainingTitles,
      '1 month',
      'Online',
      'All levels',
      'Virtual instructor-led training with assessments and mentor support.',
    ),
  },
  {
    slug: 'lab-based-training',
    icon: 'FlaskConical',
    title: 'Lab-Based Forensic Training',
    tag: 'On-site',
    tagTone: 'green',
    summary: 'Specialised practical training in forensic science at AFSL laboratory facilities.',
    intro: 'Specialised Practical Training in Forensic Science',
    body:
      'AFSL Lab-Based Training programmes are designed for students and professionals seeking focused practical skill development in specific forensic disciplines. The training combines relevant theoretical concepts with practical demonstrations, supervised exercises and case-oriented learning to help participants understand how forensic principles are applied in professional examination workflows.',
    highlightsTitle: 'Training Areas',
    highlightsNote:
      'Depending on the selected programme, training may cover the areas below. Training modules, practical activities, duration and eligibility may vary according to the selected programme.',
    whoCanApply: labTrainingWhoCanApply,
    outcomesTitle: 'Learning Outcomes',
    outcomes: labTrainingOutcomes,
    ctaLabel: 'Explore Lab-Based Training',
    programmes: programmeList(
      'lbt',
      labTrainingAreaTitles,
      'As per programme',
      'On-site',
      'All levels',
      'Practical laboratory training with demonstrations, supervised exercises and case-oriented learning.',
    ),
  },
  {
    slug: 'online-internship',
    icon: 'Laptop',
    title: 'Online Internship',
    tag: 'Virtual',
    tagTone: 'blue',
    summary: 'Remote case reviews and supervised assignments with weekly check-ins.',
    programmes: programmeList(
      'afsl-oi',
      onlineInternshipTitles,
      '1 month',
      'Online',
      'All levels',
      'Remote internship assignments with supervised learning in this specialisation.',
    ),
  },
  {
    slug: 'lab-based-internship',
    icon: 'Microscope',
    title: 'Lab-Based Forensic Internship',
    tag: 'On-site',
    tagTone: 'green',
    summary:
      'Structured practical internship connecting academic learning with forensic laboratory procedures.',
    intro: 'Structured Practical Internship in Forensic Science',
    body:
      'The AFSL Lab-Based Internship Programme is designed to complement academic education with structured practical exposure to forensic laboratory procedures, examination techniques and professional workflows. The programme provides students and aspiring forensic professionals with an opportunity to strengthen their understanding of forensic science through practical learning, demonstrations, supervised activities and case-oriented exercises, according to the selected internship curriculum.',
    highlightsTitle: 'Internship Exposure',
    highlightsNote:
      'Depending on the selected internship programme, participants may receive exposure to the areas below.',
    programmes: programmeList(
      'lbi',
      labInternshipExposureTitles,
      'As per programme',
      'On-site',
      'All levels',
      'Hands-on internship exposure through practical learning, demonstrations and supervised activities.',
    ),
  },
  {
    slug: 'dissertation',
    icon: 'GraduationCap',
    title: 'Dissertation',
    tag: 'Academic',
    tagTone: 'purple',
    summary: 'Supervised dissertation support with access to faculty and structured forensic research topics.',
    intro:
      'AFSL provides academically structured and research-relevant dissertation topics across key forensic domains.',
    programmes: programmeList(
      'ds',
      researchAreaTitles,
      '6–12 months',
      'Academic',
      'Academic',
      'Supervised dissertation topic with faculty guidance in this forensic domain.',
    ),
  },
  {
    slug: 'research-articles',
    icon: 'Newspaper',
    title: 'Research Articles',
    tag: 'Academic',
    tagTone: 'orange',
    summary:
      'Academic research and dissertation support platform for UG & PG forensic science students.',
    intro: 'Dissertation for UG & PG Students',
    body: `Applied Forensic Science Laboratory (AFSL) is a professional academic initiative dedicated to strengthening research culture in the field of Forensic Science. The platform is designed to support UG & PG students in developing high-quality dissertations, research proposals, and academic projects aligned with modern forensic practices.

AFSL bridges the gap between theoretical knowledge and practical application by providing structured academic guidance, research-based topic selection, and scientific methodology support.

Our Core Purpose: To promote applied forensic research through systematic academic mentorship and scientifically structured dissertation development.`,
    vision:
      'To emerge as a leading applied forensic research support platform contributing to academic excellence and innovation in forensic science.',
    missionTitle: 'To support students in:',
    missionItems: researchMissionItems,
    outcomesTitle: 'Dissertation Development Support System',
    outcomes: dissertationSupportSteps,
    extraSections: [
      { title: 'Academic Resources', items: academicResourceItems },
      { title: 'Student Support System', items: studentSupportItems },
      { title: 'Knowledge & Updates Hub', items: knowledgeUpdateItems },
    ],
    highlightsTitle: 'Research Areas',
    highlightsNote:
      'AFSL provides academically structured and research-relevant dissertation topics across key forensic domains.',
    disclaimer:
      'Applied Forensic Science Laboratory (AFSL) provides academic guidance and educational research support only. All students are expected to comply with their respective university’s academic integrity and submission policies.',
    programmes: programmeList(
      'res',
      researchAreaTitles,
      '3–6 months',
      'Academic',
      'Academic',
      'Academically structured research and dissertation topic in this forensic domain.',
    ),
  },
]

export const defaultArchiveFilterLinks: ArchiveFilterLinks = {
  nationalEvents: '/courses/events?schedule=completed&nature=national',
  internationalEvents: '/courses/events?schedule=completed&nature=international',
  workshops: '/courses/events?schedule=completed&type=workshop',
  webinars: '/courses/events?schedule=completed&type=webinar',
}

/** Placeholder programme IDs from the previous catalog, used to detect stale CMS rows. */
export const staleProgrammeIds = new Set([
  'to-1',
  'to-2',
  'to-3',
  'to-4',
  'fp-1',
  'fp-2',
  'fp-3',
  'cp-1',
  'cp-2',
  'cp-3',
  'ws-1',
  'ws-2',
  'ws-3',
  'ot-1',
  'ot-2',
  'lb-1',
  'lb-2',
  'oi-1',
  'oi-2',
  'li-1',
  'li-2',
  'ds-1',
  'ds-2',
  'ra-1',
  'ra-2',
])
