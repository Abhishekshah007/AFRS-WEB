import type { Field } from 'payload'

import {
  defaultAcademicSteps,
  defaultCareerBottomCtas,
  defaultCareerExamLinks,
  defaultCareerExams,
  defaultCareerFaqs,
  defaultCareerGuidancePageContent,
  defaultCareerInternships,
  defaultCareerJourneySteps,
  defaultCareerPathways,
  defaultCareerQuickNav,
  defaultCareerResearchItems,
  defaultCareerResources,
  defaultCareerSkills,
  defaultCareerSpecialisations,
  defaultConsultationDetails,
  defaultConsultationTopics,
} from '@/data/defaults/student-hub/career-guidance'

const textListField = (name: string, defaultValue: string[]): Field => ({
  name,
  type: 'array',
  defaultValue: defaultValue.map((text) => ({ text })),
  fields: [{ name: 'text', type: 'text', required: true }],
})

const linkListField = (name: string, defaultValue: { label: string; href: string }[]): Field => ({
  name,
  type: 'array',
  defaultValue,
  fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'href', type: 'text', required: true },
  ],
})

export const careerGuidancePageFields: Field[] = [
  {
    name: 'careerGuidancePage',
    type: 'group',
    admin: { description: 'Student Career Guidance page copy and structured content.' },
    fields: [
      { name: 'heroEyebrow', type: 'text', defaultValue: defaultCareerGuidancePageContent.heroEyebrow },
      { name: 'heroTitle', type: 'text', defaultValue: defaultCareerGuidancePageContent.heroTitle },
      {
        name: 'heroHighlight',
        type: 'text',
        defaultValue: defaultCareerGuidancePageContent.heroHighlight,
      },
      {
        name: 'heroDescription',
        type: 'textarea',
        defaultValue: defaultCareerGuidancePageContent.heroDescription,
      },
      { name: 'heroBody', type: 'textarea', defaultValue: defaultCareerGuidancePageContent.heroBody },
      { name: 'heroNote', type: 'textarea', defaultValue: defaultCareerGuidancePageContent.heroNote },
      { name: 'heroCtaLabel', type: 'text', defaultValue: defaultCareerGuidancePageContent.heroCtaLabel },
      { name: 'heroCtaHref', type: 'text', defaultValue: defaultCareerGuidancePageContent.heroCtaHref },
      {
        name: 'careersTitle',
        type: 'text',
        defaultValue: defaultCareerGuidancePageContent.careersTitle,
      },
      {
        name: 'careersDescription',
        type: 'textarea',
        defaultValue: defaultCareerGuidancePageContent.careersDescription,
      },
      textListField('careerPathways', defaultCareerPathways),
      {
        name: 'careersCtaLabel',
        type: 'text',
        defaultValue: defaultCareerGuidancePageContent.careersCtaLabel,
      },
      {
        name: 'careersCtaHref',
        type: 'text',
        defaultValue: defaultCareerGuidancePageContent.careersCtaHref,
      },
      {
        name: 'specialisationTitle',
        type: 'text',
        defaultValue: defaultCareerGuidancePageContent.specialisationTitle,
      },
      {
        name: 'specialisationDescription',
        type: 'textarea',
        defaultValue: defaultCareerGuidancePageContent.specialisationDescription,
      },
      textListField('specialisations', defaultCareerSpecialisations),
      {
        name: 'specialisationPrimaryCtaLabel',
        type: 'text',
        defaultValue: defaultCareerGuidancePageContent.specialisationPrimaryCtaLabel,
      },
      {
        name: 'specialisationPrimaryCtaHref',
        type: 'text',
        defaultValue: defaultCareerGuidancePageContent.specialisationPrimaryCtaHref,
      },
      {
        name: 'specialisationSecondaryCtaLabel',
        type: 'text',
        defaultValue: defaultCareerGuidancePageContent.specialisationSecondaryCtaLabel,
      },
      {
        name: 'specialisationSecondaryCtaHref',
        type: 'text',
        defaultValue: defaultCareerGuidancePageContent.specialisationSecondaryCtaHref,
      },
      {
        name: 'academicTitle',
        type: 'text',
        defaultValue: defaultCareerGuidancePageContent.academicTitle,
      },
      {
        name: 'academicDescription',
        type: 'textarea',
        defaultValue: defaultCareerGuidancePageContent.academicDescription,
      },
      textListField('academicSteps', defaultAcademicSteps),
      {
        name: 'academicNote',
        type: 'textarea',
        defaultValue: defaultCareerGuidancePageContent.academicNote,
      },
      { name: 'skillsTitle', type: 'text', defaultValue: defaultCareerGuidancePageContent.skillsTitle },
      { name: 'skillsIntro', type: 'textarea', defaultValue: defaultCareerGuidancePageContent.skillsIntro },
      {
        name: 'skillsDescription',
        type: 'text',
        defaultValue: defaultCareerGuidancePageContent.skillsDescription,
      },
      textListField('skills', defaultCareerSkills),
      {
        name: 'skillsCtaLabel',
        type: 'text',
        defaultValue: defaultCareerGuidancePageContent.skillsCtaLabel,
      },
      { name: 'skillsCtaHref', type: 'text', defaultValue: defaultCareerGuidancePageContent.skillsCtaHref },
      {
        name: 'internshipsTitle',
        type: 'text',
        defaultValue: defaultCareerGuidancePageContent.internshipsTitle,
      },
      {
        name: 'internshipsIntro',
        type: 'textarea',
        defaultValue: defaultCareerGuidancePageContent.internshipsIntro,
      },
      {
        name: 'internshipsDescription',
        type: 'textarea',
        defaultValue: defaultCareerGuidancePageContent.internshipsDescription,
      },
      textListField('internships', defaultCareerInternships),
      {
        name: 'internshipsNote',
        type: 'textarea',
        defaultValue: defaultCareerGuidancePageContent.internshipsNote,
      },
      {
        name: 'internshipsCtaLabel',
        type: 'text',
        defaultValue: defaultCareerGuidancePageContent.internshipsCtaLabel,
      },
      {
        name: 'internshipsCtaHref',
        type: 'text',
        defaultValue: defaultCareerGuidancePageContent.internshipsCtaHref,
      },
      { name: 'examsTitle', type: 'text', defaultValue: defaultCareerGuidancePageContent.examsTitle },
      {
        name: 'examsDescription',
        type: 'textarea',
        defaultValue: defaultCareerGuidancePageContent.examsDescription,
      },
      textListField('exams', defaultCareerExams),
      { name: 'examsNote', type: 'textarea', defaultValue: defaultCareerGuidancePageContent.examsNote },
      linkListField('examLinks', defaultCareerExamLinks),
      {
        name: 'researchTitle',
        type: 'text',
        defaultValue: defaultCareerGuidancePageContent.researchTitle,
      },
      {
        name: 'researchDescription',
        type: 'textarea',
        defaultValue: defaultCareerGuidancePageContent.researchDescription,
      },
      textListField('researchItems', defaultCareerResearchItems),
      {
        name: 'researchCtaLabel',
        type: 'text',
        defaultValue: defaultCareerGuidancePageContent.researchCtaLabel,
      },
      {
        name: 'researchCtaHref',
        type: 'text',
        defaultValue: defaultCareerGuidancePageContent.researchCtaHref,
      },
      { name: 'finderTitle', type: 'text', defaultValue: defaultCareerGuidancePageContent.finderTitle },
      { name: 'finderIntro', type: 'textarea', defaultValue: defaultCareerGuidancePageContent.finderIntro },
      {
        name: 'finderDescription',
        type: 'textarea',
        defaultValue: defaultCareerGuidancePageContent.finderDescription,
      },
      {
        name: 'finderFormula',
        type: 'text',
        defaultValue: defaultCareerGuidancePageContent.finderFormula,
      },
      {
        name: 'finderDisclaimer',
        type: 'textarea',
        defaultValue: defaultCareerGuidancePageContent.finderDisclaimer,
      },
      {
        name: 'consultationTitle',
        type: 'text',
        defaultValue: defaultCareerGuidancePageContent.consultationTitle,
      },
      {
        name: 'consultationDescription',
        type: 'textarea',
        defaultValue: defaultCareerGuidancePageContent.consultationDescription,
      },
      textListField('consultationTopics', defaultConsultationTopics),
      {
        name: 'consultationDetails',
        type: 'array',
        defaultValue: defaultConsultationDetails,
        fields: [
          { name: 'label', type: 'text', required: true },
          { name: 'value', type: 'text', required: true },
        ],
      },
      {
        name: 'consultationCtaLabel',
        type: 'text',
        defaultValue: defaultCareerGuidancePageContent.consultationCtaLabel,
      },
      {
        name: 'consultationCtaHref',
        type: 'text',
        defaultValue: defaultCareerGuidancePageContent.consultationCtaHref,
      },
      {
        name: 'journeyTitle',
        type: 'text',
        defaultValue: defaultCareerGuidancePageContent.journeyTitle,
      },
      {
        name: 'journeySteps',
        type: 'array',
        defaultValue: defaultCareerJourneySteps,
        fields: [
          { name: 'label', type: 'text', required: true },
          { name: 'desc', type: 'textarea', required: true },
        ],
      },
      {
        name: 'resourcesTitle',
        type: 'text',
        defaultValue: defaultCareerGuidancePageContent.resourcesTitle,
      },
      {
        name: 'resourcesDescription',
        type: 'textarea',
        defaultValue: defaultCareerGuidancePageContent.resourcesDescription,
      },
      textListField('resources', defaultCareerResources),
      {
        name: 'resourcesCtaLabel',
        type: 'text',
        defaultValue: defaultCareerGuidancePageContent.resourcesCtaLabel,
      },
      {
        name: 'resourcesCtaHref',
        type: 'text',
        defaultValue: defaultCareerGuidancePageContent.resourcesCtaHref,
      },
      { name: 'faqTitle', type: 'text', defaultValue: defaultCareerGuidancePageContent.faqTitle },
      {
        name: 'faqs',
        type: 'array',
        defaultValue: defaultCareerFaqs,
        fields: [
          { name: 'question', type: 'text', required: true },
          { name: 'answer', type: 'textarea', required: true },
        ],
      },
      {
        name: 'bottomCtaTitle',
        type: 'text',
        defaultValue: defaultCareerGuidancePageContent.bottomCtaTitle,
      },
      {
        name: 'bottomCtaIntro',
        type: 'text',
        defaultValue: defaultCareerGuidancePageContent.bottomCtaIntro,
      },
      {
        name: 'bottomCtaDescription',
        type: 'textarea',
        defaultValue: defaultCareerGuidancePageContent.bottomCtaDescription,
      },
      linkListField('bottomCtas', defaultCareerBottomCtas),
      {
        name: 'disclaimer',
        type: 'textarea',
        defaultValue: defaultCareerGuidancePageContent.disclaimer,
      },
      linkListField('quickNav', defaultCareerQuickNav),
    ],
  },
]
