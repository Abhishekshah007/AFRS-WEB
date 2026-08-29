import type { ProgrammeListItem } from '@/domain/programmes/catalog-types'

export function programmeList(
  prefix: string,
  titles: string[],
  duration: string,
  mode: string,
  level?: string,
  description = 'Included in this programme offering.',
): ProgrammeListItem[] {
  return titles.map((title, index) => {
    const durationMatch = title.match(/\((\d+\s*Days?)\)/i)
    return {
      id: `${prefix}-${index + 1}`,
      title,
      description,
      duration: durationMatch ? durationMatch[1] : duration,
      mode,
      level,
    }
  })
}

export const onlineTrainingTitles = [
  'FS-101: Forensic Science & Criminal Justice System',
  'FS-102: Crime Scene Investigation',
  'FS-103: Forensic Photography & Videography',
  'FS-104: Forensic Chemistry & Toxicology',
  'FS-105: Forensic Biology & Serology',
  'FS-106: Forensic DNA Analysis',
  'FS-107: Forensic Medicine',
  'FS-108: Questioned Document Examination',
  'FS-109: Forensic Ballistic & Forensic Physics',
  'FS-110: Pattern Evidence Analysis',
  'FS-111: Forensic Psychology & Criminal Profiling',
  'FS-112: Forensic Anthropology',
  'FS-113: Forensic Odontology',
  'FS-114: Forensic Instrumentation Techniques',
  'FS-115: Cyber Security & Digital Forensics',
  'FS-116: Forensic Nanotechnology',
  'FS-117: Forensic Dactyloscopy – The Scientific Study of Fingerprints',
  'FS-118: Criminology, Penology & Victimology',
  'FS-119: Arson Investigation',
  'FS-120: Forensic Accounting and Fraud Examination',
]

export const onlineInternshipTitles = [
  'Forensic Toxicology',
  'Forensic Medicine',
  'Digital and Cyber Forensics',
  'Crime Scene Investigations and Management',
  'Forensic Biology and Serology',
  'Multimedia Forensics – Forensic Photography and Videography',
  'Forensic Ballistics – Forensic Ballistics and Firearm Examination',
  'Forensic Entomology',
  'Forensic Instrumentation',
  'Questioned Document and Handwriting – Questioned Document Examination and Handwriting Examination',
  'Forensic Fingerprinting – Fingerprinting Examination and Analysis, Practical Applications of Recent Advances for Questioned Document and Fingerprint Examination',
  'Forensic Psychology',
  'Industry Oriented Cyber Security with Practical Tool Based Training',
  'Fraud and Insurance Investigations',
  'Forensic Science and Criminology',
  'Forensic Chemistry – Forensic Chemistry and Explosive Analysis',
  'Forensic Odontology',
  'Windows Forensics and Mobile Device Forensics',
  'Forensic Anthropology',
  'Forensic Pathology and Autopsy',
]

export const professionalCourseTitles = [
  'Forensic Biology and Serology',
  'Forensic Chemistry and Toxicology',
  'The Comprehension of ESDA2: Components and Mechanism',
  'Forensic Ballistics',
  'Forensic Medicine and Crime Scene Investigation',
  'Forensic Questioned Document and Handwriting Examination',
  'Future Trends in Forensic Science in India',
  'Digital Forensic and Cyber Crime Prevention',
  'Fingerprint and Questioned Document Examination',
]

export const capsuleTrainingTitles = [
  'Forensic Audio and Video Authentication',
  'Fire and Arson Investigation',
  'Forensic Photography and Image/Video Analysis',
  'Forensic Examination of Suicide and Homicide Cases',
  'Forensic Examination of Sexual Assault cases in the light of BNSS',
  'Crime Scene Investigation and Reconstruction in Cyber crime cases',
  'Advanced Questioned Documents & Handwriting examination',
  'DNA Fingerprinting',
  'Forensic Audio Examination (15 Days)',
  'Bridging Psychology and Technology: Future Trends in Cyber Behavior Research',
  'Applied Forensic Ballistics: Foundation to Expert Courtroom Practice',
  'Forensic Chemistry and Nano-forensics',
  'Gait Analysis: Human Identification from Blurred CCTV Footages',
  'Imaging Hard Drives and RAM using FTK Imager',
  'Unmasking the Mind: Cognitive and Psychophysiological Techniques in Forensic Psychology',
  'Acid Attack (Vitriolage): A Multidisciplinary medico-socio-legal and Forensic perspective',
  'Crime Scene Investigation: From Scene to Courtroom',
  'Audio Forensics (6 Days)',
]

export const policeTrainingTitles = [
  'New Criminal Laws - 2023 for Forensic Officers',
  'New Criminal Laws - 2023 for Prosecution Officers',
  'NCORD-Prosecution Strategies for Drug Offences',
  'Social Media Investigation Course',
  'Women Atrocity and DNA Analysis',
  'Digital Evidence Collection and Representation in Courts',
  'Investigation of Asphyxial deaths',
  'Mobile Forensics CDR/IPDR Analysis',
  'Crime and Intoxication',
  'Computer system analysis',
  'Crime Scene Management and Medico legal',
  'Post Blast Investigation',
  'Investigation of NDPS Cases',
]

export const researchAreaTitles = [
  'Forensic Science (General Applications)',
  'Forensic Biology and Serology',
  'Forensic DNA',
  'Forensic Chemistry and Toxicology',
  'Forensic Physics and Ballistics',
  'Fingerprint',
  'Questioned Document and Handwriting',
  'Crime Scene Investigation and Management',
  'Forensic Photography and Videography',
  'Multimedia Forensics',
  'Digital and Cyber Forensics',
  'Artificial Intelligence (AI) & Machine Learning (ML)',
  'Voice Analysis / Speaker Identification',
]

export const labTrainingAreaTitles = [
  'Crime Scene Investigation & Evidence Management',
  'Fingerprint Examination & Identification',
  'Questioned Documents & Handwriting Examination',
  'Forensic Photography & Documentation',
  'Forensic Biology & Serology',
  'Digital & Cyber Forensics',
  'Audio, Video & Multimedia Forensics',
]

export const labInternshipExposureTitles = [
  'Laboratory orientation and forensic workflows',
  'Evidence identification and documentation',
  'Crime Scene Investigation',
  'Fingerprint development and examination',
  'Questioned Document & Handwriting Examination',
  'Forensic Photography',
  'Digital & Multimedia Forensics',
  'Case-based practical exercises',
  'Forensic documentation and report preparation',
]

export const labTrainingWhoCanApply = [
  'Undergraduate & postgraduate students',
  'Forensic Science graduates',
  'Law & Criminology students',
  'Research scholars',
  'Academicians & educators',
  'Laboratory professionals',
  'Investigation professionals',
  'Working professionals seeking specialised forensic skills',
]

export const researchMissionItems = [
  'Developing research-oriented thinking',
  'Enhancing scientific writing skills',
  'Understanding applied forensic methodologies',
  'Producing structured and quality dissertations',
]

export const dissertationSupportSteps = [
  'Research Topic Selection & Validation',
  'Proposal / Synopsis Development',
  'Literature Review Structuring',
  'Research Methodology Design',
  'Data Analysis Guidance',
  'Final Dissertation Formatting & Structuring',
]

export const academicResourceItems = [
  'Dissertation Synopsis Formats',
  'Research Proposal Templates',
  'Standard Referencing Styles (APA / MLA / IEEE)',
  'Academic Writing Guidelines',
  'Report Structuring Frameworks',
]

export const studentSupportItems = [
  'Online inquiry submission system',
  'Direct academic consultation support',
  'Quick response communication channels (WhatsApp / Email)',
  'Personalized topic selection assistance',
]

export const knowledgeUpdateItems = [
  'Emerging trends in forensic science',
  'Advancements in investigative technologies',
  'Research methodologies and innovations',
  'Career opportunities in forensic science field',
]

export const labTrainingOutcomes = [
  'Practical understanding of forensic examination workflows',
  'Awareness of evidence handling and documentation',
  'Familiarity with discipline-specific examination procedures',
  'Understanding of laboratory practices and professional standards',
  'Case-oriented analytical and problem-solving skills',
  'Technical documentation and reporting awareness',
]
