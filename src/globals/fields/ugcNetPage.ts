import type { Field } from 'payload'

import {
  defaultUgcNetAudienceItems,
  defaultUgcNetBatchDetails,
  defaultUgcNetBenefits,
  defaultUgcNetFaqs,
  defaultUgcNetFeatures,
  defaultUgcNetLearningSteps,
  defaultUgcNetPageContent,
  defaultUgcNetQuickNav,
  defaultUgcNetRegistrationSteps,
  defaultUgcNetResourceItems,
  defaultUgcNetWhyChooseItems,
} from '@/data/defaults/student-hub/ugc-net'

const textListField = (name: string, defaultValue: string[]): Field => ({
  name,
  type: 'array',
  defaultValue: defaultValue.map((text) => ({ text })),
  fields: [{ name: 'text', type: 'text', required: true }],
})

export const ugcNetPageFields: Field[] = [
  {
    name: 'ugcNetPage',
    type: 'group',
    admin: { description: 'UGC-NET / JRF page copy and structured content.' },
    fields: [
      { name: 'heroEyebrow', type: 'text', defaultValue: defaultUgcNetPageContent.heroEyebrow },
      {
        name: 'heroTitlePrefix',
        type: 'text',
        defaultValue: defaultUgcNetPageContent.heroTitlePrefix,
      },
      {
        name: 'heroTitleHighlight',
        type: 'text',
        defaultValue: defaultUgcNetPageContent.heroTitleHighlight,
      },
      {
        name: 'heroDescription',
        type: 'textarea',
        defaultValue: defaultUgcNetPageContent.heroDescription,
      },
      { name: 'heroCtaLabel', type: 'text', defaultValue: defaultUgcNetPageContent.heroCtaLabel },
      {
        name: 'heroMetricEyebrow',
        type: 'text',
        defaultValue: defaultUgcNetPageContent.heroMetricEyebrow,
      },
      {
        name: 'heroMetricValue',
        type: 'text',
        defaultValue: defaultUgcNetPageContent.heroMetricValue,
      },
      { name: 'overviewTitle', type: 'text', defaultValue: defaultUgcNetPageContent.overviewTitle },
      {
        name: 'overviewSubtitle',
        type: 'text',
        defaultValue: defaultUgcNetPageContent.overviewSubtitle,
      },
      {
        name: 'overviewDescription',
        type: 'textarea',
        defaultValue: defaultUgcNetPageContent.overviewDescription,
      },
      { name: 'overviewBody', type: 'textarea', defaultValue: defaultUgcNetPageContent.overviewBody },
      {
        name: 'whyChooseTitle',
        type: 'text',
        defaultValue: defaultUgcNetPageContent.whyChooseTitle,
      },
      textListField('whyChooseItems', defaultUgcNetWhyChooseItems),
      {
        name: 'programmeTitle',
        type: 'text',
        defaultValue: defaultUgcNetPageContent.programmeTitle,
      },
      { name: 'paperOneTitle', type: 'text', defaultValue: defaultUgcNetPageContent.paperOneTitle },
      {
        name: 'paperOneDescription',
        type: 'textarea',
        defaultValue: defaultUgcNetPageContent.paperOneDescription,
      },
      { name: 'paperTwoTitle', type: 'text', defaultValue: defaultUgcNetPageContent.paperTwoTitle },
      {
        name: 'paperTwoDescription',
        type: 'textarea',
        defaultValue: defaultUgcNetPageContent.paperTwoDescription,
      },
      { name: 'benefitsTitle', type: 'text', defaultValue: defaultUgcNetPageContent.benefitsTitle },
      {
        name: 'benefits',
        type: 'array',
        defaultValue: defaultUgcNetBenefits,
        fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'desc', type: 'textarea', required: true },
        ],
      },
      { name: 'learningTitle', type: 'text', defaultValue: defaultUgcNetPageContent.learningTitle },
      { name: 'learningFlow', type: 'text', defaultValue: defaultUgcNetPageContent.learningFlow },
      {
        name: 'learningSteps',
        type: 'array',
        defaultValue: defaultUgcNetLearningSteps,
        fields: [
          { name: 'label', type: 'text', required: true },
          { name: 'desc', type: 'textarea', required: true },
        ],
      },
      { name: 'audienceTitle', type: 'text', defaultValue: defaultUgcNetPageContent.audienceTitle },
      textListField('audienceItems', defaultUgcNetAudienceItems),
      { name: 'audienceNote', type: 'textarea', defaultValue: defaultUgcNetPageContent.audienceNote },
      { name: 'featuresTitle', type: 'text', defaultValue: defaultUgcNetPageContent.featuresTitle },
      {
        name: 'features',
        type: 'array',
        defaultValue: defaultUgcNetFeatures,
        fields: [
          { name: 'feature', type: 'text', required: true },
          { name: 'details', type: 'text', required: true },
        ],
      },
      { name: 'batchTitle', type: 'text', defaultValue: defaultUgcNetPageContent.batchTitle },
      {
        name: 'batchDetails',
        type: 'array',
        defaultValue: defaultUgcNetBatchDetails,
        fields: [
          { name: 'label', type: 'text', required: true },
          { name: 'value', type: 'text', required: true },
        ],
      },
      { name: 'batchCtaLabel', type: 'text', defaultValue: defaultUgcNetPageContent.batchCtaLabel },
      {
        name: 'registrationTitle',
        type: 'text',
        defaultValue: defaultUgcNetPageContent.registrationTitle,
      },
      textListField('registrationSteps', defaultUgcNetRegistrationSteps),
      { name: 'facultyTitle', type: 'text', defaultValue: defaultUgcNetPageContent.facultyTitle },
      {
        name: 'facultyDescription',
        type: 'textarea',
        defaultValue: defaultUgcNetPageContent.facultyDescription,
      },
      {
        name: 'resourcesTitle',
        type: 'text',
        defaultValue: defaultUgcNetPageContent.resourcesTitle,
      },
      textListField('resourceItems', defaultUgcNetResourceItems),
      { name: 'supportTitle', type: 'text', defaultValue: defaultUgcNetPageContent.supportTitle },
      {
        name: 'supportDescription',
        type: 'textarea',
        defaultValue: defaultUgcNetPageContent.supportDescription,
      },
      { name: 'faqTitle', type: 'text', defaultValue: defaultUgcNetPageContent.faqTitle },
      {
        name: 'faqs',
        type: 'array',
        defaultValue: defaultUgcNetFaqs,
        fields: [
          { name: 'question', type: 'text', required: true },
          { name: 'answer', type: 'textarea', required: true },
        ],
      },
      {
        name: 'bottomCtaTitle',
        type: 'text',
        defaultValue: defaultUgcNetPageContent.bottomCtaTitle,
      },
      {
        name: 'bottomCtaDescription',
        type: 'textarea',
        defaultValue: defaultUgcNetPageContent.bottomCtaDescription,
      },
      {
        name: 'bottomCtaTagline',
        type: 'text',
        defaultValue: defaultUgcNetPageContent.bottomCtaTagline,
      },
      {
        name: 'bottomCtaPrimaryLabel',
        type: 'text',
        defaultValue: defaultUgcNetPageContent.bottomCtaPrimaryLabel,
      },
      {
        name: 'bottomCtaSecondaryLabel',
        type: 'text',
        defaultValue: defaultUgcNetPageContent.bottomCtaSecondaryLabel,
      },
      {
        name: 'bottomCtaContactLabel',
        type: 'text',
        defaultValue: defaultUgcNetPageContent.bottomCtaContactLabel,
      },
      {
        name: 'achieversEyebrow',
        type: 'text',
        defaultValue: defaultUgcNetPageContent.achieversEyebrow,
      },
      {
        name: 'achieversTitle',
        type: 'text',
        defaultValue: defaultUgcNetPageContent.achieversTitle,
      },
      { name: 'statsValue', type: 'text', defaultValue: defaultUgcNetPageContent.statsValue },
      {
        name: 'statsDescription',
        type: 'text',
        defaultValue: defaultUgcNetPageContent.statsDescription,
      },
      {
        name: 'quickNav',
        type: 'array',
        defaultValue: defaultUgcNetQuickNav,
        fields: [
          { name: 'label', type: 'text', required: true },
          { name: 'href', type: 'text', required: true },
        ],
      },
    ],
  },
]
