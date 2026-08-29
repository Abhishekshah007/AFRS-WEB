import type { UgcNetPageContent } from '@/components/student-hub/ugc-net/types'

export const defaultUgcNetWhyChooseItems = [
  'Live & Interactive Online Classes',
  'Paper I & Paper II Preparation',
  'Complete Forensic Science Syllabus Coverage',
  'Concept-Based & Examination-Oriented Teaching',
  'Previous Year Question (PYQ) Analysis',
  'Topic-Wise MCQ Practice',
  'Regular Mock Tests & Assessments',
  'Dedicated Revision Sessions',
  'Doubt Resolution & Academic Support',
  'Comprehensive Study Material',
  'JRF-Oriented Advanced Preparation',
  'Regular Academic Guidance',
]

export const defaultUgcNetBenefits = [
  {
    title: 'Live Online Classes',
    desc: 'Structured, interactive classes conducted by experienced faculty and subject experts.',
  },
  {
    title: 'Study Material',
    desc: 'Organised learning resources, topic-wise notes, presentations and revision material.',
  },
  {
    title: 'Previous Year Questions',
    desc: 'Practice and analysis of previous-year questions to understand examination trends and question patterns.',
  },
  {
    title: 'MCQ Practice',
    desc: 'Topic-wise and subject-wise objective questions with explanations and discussion.',
  },
  {
    title: 'Mock Test Series',
    desc: 'Regular practice tests and full-length mock examinations.',
  },
  {
    title: 'Revision Sessions',
    desc: 'Structured revision of important concepts and examination-oriented topics.',
  },
  {
    title: 'Doubt Resolution',
    desc: 'Academic support for clarification of subject concepts and preparation-related questions.',
  },
  {
    title: 'JRF-Oriented Preparation',
    desc: 'Advanced conceptual preparation, research aptitude and higher-order question practice.',
  },
]

export const defaultUgcNetLearningSteps = [
  {
    label: 'Learn',
    desc: 'Build strong conceptual foundations through live classes.',
  },
  {
    label: 'Practice',
    desc: 'Solve MCQs and previous-year questions regularly.',
  },
  {
    label: 'Analyse',
    desc: 'Identify important topics, question trends and areas requiring improvement.',
  },
  {
    label: 'Test',
    desc: 'Evaluate preparation through mock tests and assessments.',
  },
  {
    label: 'Revise',
    desc: 'Strengthen retention through systematic revision and examination-focused practice.',
  },
]

export const defaultUgcNetAudienceItems = [
  'UGC-NET Forensic Science Aspirants',
  'JRF Aspirants',
  'Forensic Science Graduates & Postgraduates',
  'Students preparing for academic and teaching careers',
  'Students seeking structured preparation for competitive examinations in Forensic Science',
  'Eligible candidates aiming to strengthen Paper I and Paper II preparation',
]

export const defaultUgcNetFeatures = [
  { feature: 'Programme', details: 'UGC-NET / JRF Forensic Science' },
  { feature: 'Organised By', details: 'Applied Forensic Research Sciences (AFRS)' },
  { feature: 'Mode', details: 'Online' },
  { feature: 'Papers Covered', details: 'Paper I & Paper II – Forensic Science' },
  { feature: 'Classes', details: 'Live & Interactive' },
  { feature: 'Study Material', details: 'Provided as per programme' },
  { feature: 'PYQ Practice', details: 'Yes' },
  { feature: 'MCQ Practice', details: 'Yes' },
  { feature: 'Mock Tests', details: 'Included as per batch plan' },
  { feature: 'Revision', details: 'Dedicated Revision Sessions' },
  { feature: 'Doubt Support', details: 'Available' },
  { feature: 'JRF Preparation', details: 'Advanced Preparation Support' },
  { feature: 'Batch', details: 'Upcoming Batch – See Current Schedule' },
]

export const defaultUgcNetBatchDetails = [
  { label: 'Starting Date', value: 'To be announced' },
  { label: 'Registration Deadline', value: 'To be announced' },
  { label: 'Class Days', value: 'To be announced' },
  { label: 'Class Timing', value: 'To be announced' },
  { label: 'Duration', value: 'To be announced' },
  { label: 'Mode', value: 'Online' },
  { label: 'Platform', value: 'Google Meet / Zoom' },
  { label: 'Course Fee', value: 'Contact AFRS for current fee details' },
]

export const defaultUgcNetRegistrationSteps = [
  'Complete the Online Registration Form',
  'Submit the applicable course fee',
  'Receive registration confirmation',
  'Receive class and programme details',
  'Join the scheduled online classes',
]

export const defaultUgcNetResourceItems = [
  'Study Notes',
  'Topic-Wise MCQs',
  'Previous Year Questions',
  'Mock Tests',
  'Revision Resources',
  'Class Presentations',
  'Recorded Sessions, where applicable',
]

export const defaultUgcNetFaqs = [
  {
    question: 'Is the programme completely online?',
    answer: 'Yes. The programme is conducted through online classes.',
  },
  {
    question: 'Are both Paper I and Paper II covered?',
    answer:
      'Yes. The programme is structured to cover Paper I and Paper II – Forensic Science, as specified for the respective batch.',
  },
  {
    question: 'Will I receive study material?',
    answer:
      'Study material and learning resources are provided according to the features included in the respective batch.',
  },
  {
    question: 'Are previous-year questions discussed?',
    answer:
      'Yes. Previous-year questions are incorporated into preparation to understand question patterns and important concepts.',
  },
  {
    question: 'Are mock tests included?',
    answer:
      'Mock tests and assessment activities are included according to the selected batch/programme plan.',
  },
  {
    question: 'Is the programme suitable for JRF aspirants?',
    answer:
      'Yes. The programme includes advanced conceptual preparation and JRF-oriented practice.',
  },
  {
    question: 'Will recorded classes be available?',
    answer: 'Recording availability depends on the specific batch and programme plan.',
  },
  {
    question: 'How can I register?',
    answer:
      'Click “Register Now”, complete the registration form and follow the payment and confirmation instructions.',
  },
  {
    question: 'Can I contact AFRS before registering?',
    answer:
      'Yes. Students may contact the AFRS academic/support team for programme-related queries before registration.',
  },
]

export const defaultUgcNetQuickNav = [
  { label: 'Overview', href: '#overview' },
  { label: 'Course', href: '#course' },
  { label: 'Approach', href: '#approach' },
  { label: 'Batch', href: '#batch' },
  { label: 'Resources', href: '#resources' },
  { label: 'Faculty', href: '#faculty' },
  { label: 'FAQs', href: '#faqs' },
  { label: 'Register', href: '#register' },
]

export const defaultUgcNetPageContent: UgcNetPageContent = {
  heroEyebrow: 'Providing Knowledge Since 2022',
  heroTitlePrefix: 'Master Paper 1 & 2 of',
  heroTitleHighlight: 'UGC NET Forensic Science',
  heroDescription:
    'Join our expert-led online training programmes, mock tests, and personalised guidance for forensic science aspirants.',
  heroCtaLabel: 'Register Now',
  heroMetricEyebrow: 'Upcoming Batch',
  heroMetricValue: 'Online Coaching',
  overviewTitle: 'UGC-NET / JRF Forensic Science Online Coaching',
  overviewSubtitle: 'Comprehensive Online Preparation for UGC-NET & JRF in Forensic Science',
  overviewDescription:
    'Applied Forensic Research Sciences (AFRS) offers a structured UGC-NET/JRF Forensic Science Online Coaching Programme designed to provide systematic, concept-driven and examination-oriented preparation for aspirants seeking to qualify for UGC-NET and pursue JRF opportunities in Forensic Science.',
  overviewBody:
    'The programme combines live online classes, comprehensive study resources, previous-year question analysis, MCQ practice, mock tests, revision sessions and academic support to help students prepare effectively for both Paper I and Paper II (Forensic Science).',
  whyChooseTitle: 'Why Choose AFRS for UGC-NET/JRF Preparation?',
  whyChooseItems: defaultUgcNetWhyChooseItems,
  programmeTitle: 'Programme Structure',
  paperOneTitle: 'Paper I – General Paper',
  paperOneDescription:
    'Systematic preparation for the common UGC-NET Paper I syllabus, including Teaching Aptitude, Research Aptitude, Reading Comprehension, Communication, Reasoning Ability, Data Interpretation, Information & Communication Technology (ICT), People, Development & Environment, Higher Education System and other prescribed areas of Paper I.',
  paperTwoTitle: 'Paper II – Forensic Science',
  paperTwoDescription:
    'Comprehensive preparation covering the prescribed UGC-NET Forensic Science syllabus, with subject-wise and unit-wise conceptual learning, important topics, PYQs and examination-oriented practice.',
  benefitsTitle: 'What You Get With the Programme',
  benefits: defaultUgcNetBenefits,
  learningTitle: 'How Our Learning Approach Works',
  learningFlow: 'LEARN → PRACTICE → ANALYSE → TEST → REVISE',
  learningSteps: defaultUgcNetLearningSteps,
  audienceTitle: 'Who Can Join?',
  audienceItems: defaultUgcNetAudienceItems,
  audienceNote:
    'Eligibility should be checked as per the latest official UGC-NET/NTA notification and applicable rules.',
  featuresTitle: 'Course Features at a Glance',
  features: defaultUgcNetFeatures,
  batchTitle: 'Upcoming UGC-NET/JRF Forensic Science Batch',
  batchDetails: defaultUgcNetBatchDetails,
  batchCtaLabel: 'Register Now',
  registrationTitle: 'Registration Process',
  registrationSteps: defaultUgcNetRegistrationSteps,
  facultyTitle: 'Faculty & Academic Guidance',
  facultyDescription:
    'The programme is supported by experienced faculty, forensic science professionals and subject experts with a focus on conceptual teaching, practical understanding and examination-oriented preparation.',
  resourcesTitle: 'Student Learning Resources',
  resourceItems: defaultUgcNetResourceItems,
  supportTitle: 'Student Support',
  supportDescription:
    'Live Classes | Doubt Resolution | Practice Sessions | Mock Assessments | Revision Support | Academic Guidance',
  faqTitle: 'Frequently Asked Questions',
  faqs: defaultUgcNetFaqs,
  bottomCtaTitle: 'Start Your UGC-NET/JRF Preparation With AFRS',
  bottomCtaDescription:
    'Build your preparation with a structured learning approach focused on conceptual clarity, consistent practice, scientific understanding and examination readiness.',
  bottomCtaTagline: 'Your Preparation. Your Goal. Your Forensic Science Journey.',
  bottomCtaPrimaryLabel: 'Register Now',
  bottomCtaSecondaryLabel: 'View Batch Details',
  bottomCtaContactLabel: 'Contact AFRS',
  achieversEyebrow: 'The Hall of Fame',
  achieversTitle: 'Our Qualified Achievers',
  statsValue: '2+',
  statsDescription: 'Batches every year with consistent results',
  quickNav: defaultUgcNetQuickNav,
}
