import type {
  CatalogItem,
  DirectorateMember,
  ServicesPageContent,
} from '@/components/services/types'

export { defaultServicesCatalog } from '@/data/defaults/services-catalog'

export const fallbackBanners = [
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
  'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=800&q=80',
  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
]

export const fallbackCatalog: CatalogItem[] = [
  {
    id: 'dna',
    title: 'DNA Analysis',
    slug: 'dna-analysis',
    desc: 'Advanced biological profiling for victim identification, paternity, and suspect elimination with court-admissible reporting.',
    banner: fallbackBanners[0],
  },
  {
    id: 'docs',
    title: 'Questioned Documents',
    slug: 'questioned-documents',
    desc: 'Handwriting, typeface, ink analysis, and alteration detection using standard forensic protocols.',
    banner: fallbackBanners[1],
  },
  {
    id: 'fp',
    title: 'Fingerprint Analysis',
    slug: 'fingerprint-analysis',
    desc: 'Latent print development, AFIS matching, and comparative examination for criminal investigations.',
    banner: fallbackBanners[2],
  },
]

export const fallbackDirectors: DirectorateMember[] = [
  {
    id: 'fallback-director-1',
    name: 'Mr. Rakesh Mia',
    designation:
      'Author || Forensic Expert || Trainer Designated Partner -AFSL Services India LLP Indore (MP) India.',
    initials: 'RM',
    status: 'active',
    photo:
      'https://res.cloudinary.com/drrzakkgo/image/upload/v1784833177/afrs/payload/media/WhatsApp_Image_2026-07-22_at_10.07.28_PM_rop83x.jpg',
    bio: 'Senior forensic scientist with expertise in analytical chemistry.',
  },
  {
    id: 'fallback-director-2',
    name: 'Mr. Vijay Panchal',
    designation: 'Designated Partner -AFSL Services India LLP Indore (MP) India.',
    initials: 'VP',
    status: 'active',
    photo:
      'https://res.cloudinary.com/drrzakkgo/image/upload/v1762258620/WhatsApp_Image_2025-11-04_at_12.33.03_AM_fywjbh.jpg',
    bio: 'Crime scene investigation and evidence documentation specialist.',
  },
]

export const fallbackTeam: DirectorateMember[] = [
  {
    id: 'fallback-member-1',
    name: 'Ms. Megha Jain',
    designation: 'Forensic Expert',
    initials: 'MJ',
    status: 'active',
    photo: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1763141455/xpvpfqfee6ppp875xdd5.jpg',
  },
  {
    id: 'fallback-member-2',
    name: 'Dr. Shrutika Singla',
    designation: 'Forensic Expert',
    initials: 'SS',
    status: 'active',
    photo:
      'https://res.cloudinary.com/drrzakkgo/image/upload/v1762258621/WhatsApp_Image_2025-11-04_at_12.37.51_AM_h1kedk.jpg',
  },
]

export const defaultCertificationStats = [
  { label: '11+', caption: 'Certifications' },
  { label: 'ISO', caption: 'ISO Certified' },
  { label: '24/7', caption: 'Forensic Access' },
]

export const defaultKitCards = [
  { title: 'Crime Scene Investigation Kit', icon: 'Box' },
  { title: 'Latent Fingerprint Development Kit', icon: 'Fingerprint' },
  { title: 'Fingerprint Collection Kit', icon: 'ClipboardList' },
  { title: 'Questioned Document Examination Kit', icon: 'FileSearch' },
  { title: 'Fire and Arson Investigation Kit', icon: 'FlaskConical' },
  { title: 'High Intensity Light Source Kit (ALS)', icon: 'Beaker' },
  { title: 'Biological Evidence Collection Kit', icon: 'Users' },
]

export const defaultLegalLinks = [
  {
    title: 'Forensic Expert Opinion',
    desc: 'Scientific expert opinion and technical reporting under Section 39, BSA 2023.',
  },
  {
    title: 'Forensic Evidence Assessment',
    desc: 'Scientific evaluation of physical, documentary, digital and multimedia evidence.',
  },
  {
    title: 'Electronic Evidence Certification',
    desc: 'Certification of electronic records in accordance with applicable legal requirements, including Section 63(4)(C), BSA 2023.',
  },
  {
    title: 'Forensic Case Consultation',
    desc: 'Case-specific scientific guidance on forensic evidence and examination findings.',
  },
  {
    title: 'Expert Cross-Examination Support',
    desc: 'Technical assistance for understanding forensic evidence and preparing scientifically relevant questions.',
  },
  {
    title: 'Internship & Professional Training',
    desc: 'Practical forensic training, internships and skill-development programmes for students and professionals.',
  },
]

export const defaultResearchItems = [
  {
    num: '01',
    title: 'Guidelines & Protocols',
    desc: 'Advanced evidence operations workbook and investigation protocols',
  },
  {
    num: '02',
    title: 'Research & Development',
    desc: 'Research-ready analytical workflows for students and professionals',
  },
  {
    num: '03',
    title: 'Case Reporting',
    desc: 'Case reporting guides and court submission documentation',
  },
]

export const defaultTrainingCards = [
  {
    title: 'Corporate Training',
    desc: 'Bespoke programs for law enforcement, insurance adjusters, and legal firms on evidence preservation and digital threat vectors.',
    cta: 'View Modules +',
    href: '/courses',
  },
  {
    title: 'Internship Program',
    desc: 'Hands-on laboratory experience for aspiring forensic scientists. Accredited programs covering 12 scientific disciplines.',
    cta: 'Apply Now +',
    href: '/courses',
  },
]

export const defaultServicesPageContent: ServicesPageContent = {
  heroEyebrow: 'Scientific Assistance Towards Justice',
  heroTitle: 'Future-Ready',
  heroHighlight: 'Forensic',
  heroDescription:
    'The Applied Forensic Science Laboratory (AFSL) integrates high-tech analytical methodologies with investigative excellence to serve the modern justice system.',
  heroCtaLabel: 'Laboratory Catalog +',
  labStatusLabel: 'Lab Status',
  labStatusValue: 'Operational & Certified',
  labCardCtaLabel: 'Our Service Catalog',
  infrastructureEyebrow: 'Scientific Infrastructure',
  infrastructureTitle: 'About AFSL Laboratory',
  infrastructureBody1:
    'AFSL Services India LLP is a Forensic Science laboratory registered as an LLP under the Ministry of Corporate Affairs (MCA), Government of India, Registered under the MSME/Udyam framework, and is an ISO 9001:2015 certified Laboratory.',
  infrastructureBody2:
    'AFSL is engaged in providing forensic examination services, scientific analysis, practical training, and internship programs in various disciplines of forensic science. Our laboratory undertakes the examination of forensic evidence and case related materials using appropriate scientific methods, established examination procedures and professional documentation practices.',
  infrastructureBody3:
    'Our disciplines of forensic work include Fingerprint Examination, Questioned Document Examination, Handwriting & Signature Examination, Multimedia Forensics, Trace Evidence Analysis, and other Specialised Forensic examinations, depending on the nature and requirements of a case.',
  infrastructureBody4:
    'In addition to forensic services, AFSL places strong emphasis on practical and experiential learning. Our training and internship programs provide students, researchers and professionals with exposure to laboratory procedures, forensic instruments, evidence handling, examination techniques, case documentation and scientific report preparation.',
  infrastructureBody5:
    'To strengthen practical understanding, AFSL also facilitates field visits, simulated crime scene exercises, autopsy visits and supervised crime scene exposure, wherever permitted and subject to applicable rules and professional requirements. These experiences help learners understand how forensic principles are applied beyond the classroom and laboratory.',
  infrastructureBody6:
    'At AFSL, we believe that forensic science is best understood through a combination of scientific knowledge, practical experience and professional discipline. Our objective is to provide reliable forensic services while creating meaningful learning opportunities that contribute to the development of competent, skilled and responsible forensic professionals.',
  visionTitle: 'Laboratory Vision',
  visionBody:
    'Our vision is to establish a leading hands-on training facility where forensic science is brought to life through practical, real-world applications. We aim to equip students and professionals with essential operational skills, a scientific mindset, and a strong ethical foundation necessary for contemporary forensic practice. Our objective is to bridge the gap between theoretical education and field application by providing immersive experiences, including laboratory work, autopsy visits, and actual crime scene investigations. By fostering curiosity, critical thinking, and professional discipline, we seek to cultivate the next generation of forensic experts capable of making meaningful contributions to the justice system. We aspire to serve as a national centre for experiential forensic education, emphasising learning rooted in reality and driven by purpose.',
  missionTitle: 'Our Mission',
  missionBody:
    'The mission of Applied Forensic Science Laboratory (AFSL) is to provide reliable, scientific, and practical forensic services that support investigations, organisations, legal professionals, and other stakeholders. We undertake forensic work across areas such as Fingerprint Examination, Questioned Documents, Crime Scene Investigation, Digital and Cyber Forensics, and other forensic disciplines, with a focus on accurate examination, proper evidence handling, objective analysis, and clear reporting. We also provide practical forensic training and internship opportunities for students, interns, and professionals through laboratory work, field visits, autopsy visits, crime scene exposure, case-based learning, and expert guidance. We are committed to creating a professional environment where forensic services and practical learning go hand in hand, strengthening forensic skills, promoting scientific and ethical practices, and contributing to evidence-based investigation and the effective delivery of justice.',
  directorateEyebrow: 'Leadership & Expertise',
  directorateTitle: 'Laboratory Directorate',
  directorateSubtitle:
    "Meet the visionary leaders and scientific experts directing the laboratory's operations and research initiatives.",
  teamEyebrow: 'Scientific Team',
  teamTitle: 'Laboratory Members',
  teamSubtitle:
    'Dedicated forensic scientists and specialists committed to advancing forensic science and justice.',
  catalogEyebrow: 'Core Competence',
  catalogTitle: 'Forensic Service Catalog',
  legalTitle: 'Forensic & Legal Consultancy',
  legalSubtitle: 'Scientific & Technical Forensic Support for Legal Proceedings',
  legalDescription:
    'AFSL provides independent forensic consultation and technical support to advocates, law firms, corporates, investigators and authorised individuals in matters involving scientific and forensic evidence.',
  legalCtaLabel: 'Book a Consultation',
  legalCtaSubtext: 'Online & Offline Consultation | Prior Appointment Required',
  kitsEyebrow: 'Proprietary Equipment',
  kitsTitle: 'AFSL Professional Kits',
  kitsDescription:
    'Engineered for field professionals and academic researchers. Each kit conforms to international forensic standards and is ready for deployment.',
  trainingTitle: 'Training & Internship',
  researchTitle: 'Research and Projects',
  inquiryEyebrow: 'Case Registration',
  inquiryTitle: 'Laboratory Intake & Case Enquiry',
  inquiryDescription:
    'Registered agencies and legal professionals can submit evidence and initiate case files through this portal. For emergency forensic support, please use our priority helpline.',
  priorityHelplineLabel: 'Priority Helpline',
  reportVerificationLabel: 'Report Verification',
  certificationStats: defaultCertificationStats,
  kitCards: defaultKitCards,
  legalLinks: defaultLegalLinks,
  researchItems: defaultResearchItems,
  trainingCards: defaultTrainingCards,
}

export const defaultSiteContact = {
  phone: '+91-9926692487',
  email: 'afslforensicservices@gmail.com',
  address: `8/1 2nd floor, Moti Tabela,
Near Collectorate office, Indore,
Madhya Pradesh, India`,
}
