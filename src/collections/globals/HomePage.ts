import type { GlobalConfig } from 'payload'
import { isAdminOrEditor, isPublic } from '../../access'

const textItemField = { name: 'text', type: 'text' as const, required: true }
const listItemFields = [textItemField, { name: 'description', type: 'textarea' as const }]
const certificationFields = [
  { name: 'icon', type: 'text' as const, defaultValue: '✓' },
  { name: 'title', type: 'text' as const, required: true },
  { name: 'description', type: 'textarea' as const, required: true },
]
const membershipPlanFields = [
  { name: 'title', type: 'text' as const, required: true },
  { name: 'description', type: 'textarea' as const, required: true },
  { name: 'href', type: 'text' as const, defaultValue: '/contact' },
  { name: 'badge', type: 'text' as const, defaultValue: 'Popular' },
  { name: 'dark', type: 'checkbox' as const, defaultValue: false },
]

export const HomePage: GlobalConfig = {
  slug: 'homePage',
  access: {
    read: isPublic,
    update: isAdminOrEditor,
  },
  admin: {
    group: 'Site',
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Where Evidence Speaks. Science Answers.',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue:
            "India's premier hub for forensic education, research & professional services",
        },
        { name: 'primaryCTALabel', type: 'text', defaultValue: 'Explore Now' },
        { name: 'primaryCTAUrl', type: 'text', defaultValue: '/courses' },
        { name: 'secondaryCTALabel', type: 'text', defaultValue: 'Learn More' },
        { name: 'secondaryCTAUrl', type: 'text', defaultValue: '/about' },
        { name: 'heroImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'sectionText',
      type: 'group',
      fields: [
        { name: 'featuredCardsHeading', type: 'text', defaultValue: 'Our Key Services & Programs' },
        { name: 'servicesHeading', type: 'text', defaultValue: 'Our Key Services & Programs' },
        {
          name: 'servicesDescription',
          type: 'text',
          defaultValue:
            'Comprehensive forensic solutions tailored for academic growth and professional expertise.',
        },
        { name: 'eventsHeading', type: 'text', defaultValue: 'Upcoming Events' },
        {
          name: 'eventsDescription',
          type: 'text',
          defaultValue: 'Join our forensic science training programs and workshops',
        },
        {
          name: 'aboutHeading',
          type: 'text',
          defaultValue: 'About Applied Forensic Research Sciences',
        },
        {
          name: 'aboutDescription1',
          type: 'textarea',
          defaultValue:
            'Applied Forensic Research Sciences (AFRS) is a dedicated platform committed to advancing education, research and professional development in the field of Forensic Science. Registered under the Madhya Pradesh Society Registration Act 1973, Ministry of Micro, Small & Medium Enterprises (MSME), NITI Aayog and accredited with ISO 9001:2015, Government of India, AFRS functions as a multidisciplinary organization focused on fostering collaboration, innovation and knowledge exchange.',
        },
        {
          name: 'aboutDescription2',
          type: 'textarea',
          defaultValue:
            'We bridge the gap between academic theory and practical application, providing students and professionals with the tools they need to excel in the field of forensic investigation.',
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
        { name: 'certificationsTitle', type: 'text', defaultValue: 'Professional Certifications' },
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
        { name: 'membershipCtaLabel', type: 'text', defaultValue: 'Get Started' },
        { name: 'membershipAdvantageEyebrow', type: 'text', defaultValue: 'Why AFRS?' },
        {
          name: 'membershipAdvantageTitle',
          type: 'text',
          defaultValue: 'The membership advantage',
        },
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
      ],
    },
  ],
}
