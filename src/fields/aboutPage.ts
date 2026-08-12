import type { Field } from 'payload'

import { certificationFields, listItemFields, membershipPlanFields, textItemField } from './homePage'

/** About page section copy — used by the AboutPage global. */
export const aboutPageSectionFields = (): Field[] => [
  { name: 'aboutHeading', type: 'text', defaultValue: 'About AFRS' },
  {
    name: 'aboutDescription1',
    type: 'textarea',
    defaultValue:
      'Applied Forensic Research Sciences (AFRS) is a multidisciplinary organization dedicated to advancing forensic science through education, research, training, and professional development.',
  },
  {
    name: 'aboutDescription2',
    type: 'textarea',
    defaultValue:
      'AFRS engages with a diverse range of domains — including traditional forensic sciences, digital forensics, forensic medicine, psychology, criminology and legal studies.',
  },
  { name: 'heroEyebrow', type: 'text', defaultValue: 'About AFRS' },
  { name: 'heroCtaLabel', type: 'text', defaultValue: 'Download Society Profile' },
  { name: 'heroCtaHref', type: 'text', defaultValue: '#vision' },
  { name: 'heroImageAlt', type: 'text', defaultValue: 'AFRS forensic research laboratory' },
  { name: 'rakeshMessage', type: 'textarea' },
  { name: 'vijayMessage', type: 'textarea' },
  { name: 'founderMessage', type: 'textarea' },
  { name: 'visionBadge', type: 'text', defaultValue: 'Vision' },
  { name: 'visionTitle', type: 'text', defaultValue: 'Our Vision' },
  { name: 'visionBody', type: 'textarea' },
  {
    name: 'visionHighlight',
    type: 'text',
    defaultValue: 'Science-led justice through rigorous forensic methodology.',
  },
  { name: 'visionImageAlt', type: 'text', defaultValue: 'Digital forensic analysis concept' },
  { name: 'missionBadge', type: 'text', defaultValue: 'Mission' },
  { name: 'missionTitle', type: 'text', defaultValue: 'Our Mission' },
  { name: 'missionBody', type: 'textarea' },
  {
    name: 'missionHighlight',
    type: 'text',
    defaultValue: 'Practical training aligned with real investigation workflows.',
  },
  {
    name: 'missionImageAlt',
    type: 'text',
    defaultValue: 'Forensic investigators at a crime scene',
  },
  { name: 'purposeBadge', type: 'text', defaultValue: 'Purpose' },
  { name: 'purposeTitle', type: 'text', defaultValue: 'Our Purpose' },
  { name: 'purposeBody', type: 'textarea' },
  {
    name: 'purposeHighlight',
    type: 'text',
    defaultValue: 'Ethical practice and transparency in every examination.',
  },
  { name: 'purposeImageAlt', type: 'text', defaultValue: 'Forensic laboratory precision' },
  { name: 'leadershipTitle', type: 'text', defaultValue: 'Leadership Team' },
  {
    name: 'leadershipSubtitle',
    type: 'textarea',
    defaultValue:
      'Meet the visionaries shaping forensic education, research, and professional excellence at AFRS.',
  },
  { name: 'committeeTitle', type: 'text', defaultValue: 'Executive Committee & Members' },
  {
    name: 'committeeSubtitle',
    type: 'textarea',
    defaultValue:
      'The dedicated team driving operations, governance, and community initiatives.',
  },
  { name: 'certificationsTitle', type: 'text', defaultValue: 'Certification and Recognition' },
  {
    name: 'certificationsSubtitle',
    type: 'textarea',
    defaultValue:
      'AFRS maintains rigorous standards through accredited programmes, laboratory protocols, and professional memberships recognized across the forensic science community.',
  },
  { name: 'certifications', type: 'array', fields: certificationFields },
  { name: 'valuesTitle', type: 'text', defaultValue: 'What Sets AFRS Apart' },
  {
    name: 'valuesSubtitle',
    type: 'textarea',
    defaultValue:
      'Our unique strengths and core activities that define how we serve students, professionals, and institutions.',
  },
  { name: 'uniqueTitle', type: 'text', defaultValue: 'What Makes Us Unique' },
  {
    name: 'uniqueSubtitle',
    type: 'textarea',
    defaultValue: 'Differentiators that shape our forensic education and research ecosystem.',
  },
  { name: 'uniqueItems', type: 'array', fields: listItemFields },
  { name: 'activitiesTitle', type: 'text', defaultValue: 'Our Core Activities' },
  {
    name: 'activitiesSubtitle',
    type: 'textarea',
    defaultValue:
      'Programmes and services that translate forensic science into real-world impact.',
  },
  { name: 'activityItems', type: 'array', fields: listItemFields },
  { name: 'expertiseTitle', type: 'text', defaultValue: 'Our Expertise' },
  {
    name: 'expertiseSubtitle',
    type: 'textarea',
    defaultValue:
      'Multidisciplinary capabilities across forensic domains - from crime scene to courtroom.',
  },
  { name: 'expertiseItems', type: 'array', fields: [textItemField] },
  { name: 'whyChooseTitle', type: 'text', defaultValue: 'Why Choose AFRS' },
  {
    name: 'whyChooseSubtitle',
    type: 'textarea',
    defaultValue:
      'The practical, ethical, and research-driven advantage behind our programmes and consultancy.',
  },
  { name: 'whyChooseItems', type: 'array', fields: [textItemField] },
  { name: 'pillarsTitle', type: 'text', defaultValue: 'Research, Quality & Partnerships' },
  {
    name: 'pillarsSubtitle',
    type: 'textarea',
    defaultValue:
      'How AFRS strengthens forensic science through evidence-based research, ethical practice, and collaborative networks.',
  },
  { name: 'qualityEthicsTitle', type: 'text', defaultValue: 'Quality & Ethics' },
  { name: 'qualityEthicsEyebrow', type: 'text', defaultValue: 'Standards' },
  { name: 'qualityEthicsItems', type: 'array', fields: [textItemField] },
  { name: 'researchTitle', type: 'text', defaultValue: 'Research Focus' },
  { name: 'researchEyebrow', type: 'text', defaultValue: 'Innovation' },
  { name: 'researchItems', type: 'array', fields: [textItemField] },
  { name: 'partnershipsTitle', type: 'text', defaultValue: 'Partnerships' },
  { name: 'partnershipsEyebrow', type: 'text', defaultValue: 'Collaboration' },
  { name: 'partnershipItems', type: 'array', fields: [textItemField] },
  { name: 'pillarProofLabels', type: 'array', fields: [textItemField] },
  { name: 'membershipTitle', type: 'text', defaultValue: 'Membership Plans' },
  { name: 'membershipSubtitle', type: 'textarea' },
  { name: 'membershipPlans', type: 'array', fields: membershipPlanFields },
  { name: 'membershipCtaLabel', type: 'text', defaultValue: "Let's Talk 💬" },
  { name: 'membershipAdvantageEyebrow', type: 'text', defaultValue: 'Why AFRS?' },
  { name: 'membershipAdvantageTitle', type: 'text', defaultValue: 'The membership advantage' },
  { name: 'membershipReasons', type: 'array', fields: [textItemField] },
  { name: 'roadmapTitle', type: 'text', defaultValue: 'Future Roadmap' },
  {
    name: 'roadmapSubtitle',
    type: 'textarea',
    defaultValue:
      'What AFRS is building next for forensic education, research, and professional excellence.',
  },
  { name: 'roadmapEyebrow', type: 'text', defaultValue: '2026 & Beyond' },
  {
    name: 'roadmapCardTitle',
    type: 'text',
    defaultValue: 'Building the next generation of forensic science',
  },
  {
    name: 'roadmapCardBody',
    type: 'textarea',
    defaultValue:
      'Our roadmap focuses on research depth, international collaboration, and technology-led forensic capacity building across India.',
  },
  { name: 'futureRoadmapItems', type: 'array', fields: [textItemField] },
  { name: 'awardsTitle', type: 'text', defaultValue: 'Awards & Recognition' },
  {
    name: 'awardsSubtitle',
    type: 'textarea',
    defaultValue:
      'Celebrating excellence in forensic education, research, and community impact.',
  },
  {
    name: 'awardsCallout',
    type: 'text',
    defaultValue: 'Built for award-winning forensic research and training.',
  },
  { name: 'awardsImageAlt1', type: 'text', defaultValue: 'AFRS laboratory research' },
  { name: 'awardsImageAlt2', type: 'text', defaultValue: 'AFRS training session' },
  { name: 'awardsImageAlt3', type: 'text', defaultValue: 'AFRS team recognition' },
]
