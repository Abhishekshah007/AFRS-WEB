import type { Field } from 'payload'

import type { UgcNetPageContent } from '@/components/student-hub/ugc-net/types'

const textListField = (name: string, defaultValue: string[]): Field => ({
  name,
  type: 'array',
  defaultValue: defaultValue.map((text) => ({ text })),
  fields: [{ name: 'text', type: 'text', required: true }],
})

export function examPrepPageGroupField(
  name: string,
  description: string,
  defaults: UgcNetPageContent,
): Field {
  return {
    name,
    type: 'group',
    admin: { description },
    fields: [
      { name: 'heroEyebrow', type: 'text', defaultValue: defaults.heroEyebrow },
      { name: 'heroTitlePrefix', type: 'text', defaultValue: defaults.heroTitlePrefix },
      { name: 'heroTitleHighlight', type: 'text', defaultValue: defaults.heroTitleHighlight },
      { name: 'heroDescription', type: 'textarea', defaultValue: defaults.heroDescription },
      { name: 'heroCtaLabel', type: 'text', defaultValue: defaults.heroCtaLabel },
      { name: 'heroMetricEyebrow', type: 'text', defaultValue: defaults.heroMetricEyebrow },
      { name: 'heroMetricValue', type: 'text', defaultValue: defaults.heroMetricValue },
      { name: 'overviewTitle', type: 'text', defaultValue: defaults.overviewTitle },
      { name: 'overviewSubtitle', type: 'text', defaultValue: defaults.overviewSubtitle },
      { name: 'overviewDescription', type: 'textarea', defaultValue: defaults.overviewDescription },
      { name: 'overviewBody', type: 'textarea', defaultValue: defaults.overviewBody },
      { name: 'whyChooseTitle', type: 'text', defaultValue: defaults.whyChooseTitle },
      textListField('whyChooseItems', defaults.whyChooseItems),
      { name: 'programmeTitle', type: 'text', defaultValue: defaults.programmeTitle },
      { name: 'paperOneTitle', type: 'text', defaultValue: defaults.paperOneTitle },
      { name: 'paperOneDescription', type: 'textarea', defaultValue: defaults.paperOneDescription },
      { name: 'paperTwoTitle', type: 'text', defaultValue: defaults.paperTwoTitle },
      { name: 'paperTwoDescription', type: 'textarea', defaultValue: defaults.paperTwoDescription },
      { name: 'benefitsTitle', type: 'text', defaultValue: defaults.benefitsTitle },
      {
        name: 'benefits',
        type: 'array',
        defaultValue: defaults.benefits,
        fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'desc', type: 'textarea', required: true },
        ],
      },
      { name: 'learningTitle', type: 'text', defaultValue: defaults.learningTitle },
      { name: 'learningFlow', type: 'text', defaultValue: defaults.learningFlow },
      {
        name: 'learningSteps',
        type: 'array',
        defaultValue: defaults.learningSteps,
        fields: [
          { name: 'label', type: 'text', required: true },
          { name: 'desc', type: 'textarea', required: true },
        ],
      },
      { name: 'audienceTitle', type: 'text', defaultValue: defaults.audienceTitle },
      textListField('audienceItems', defaults.audienceItems),
      { name: 'audienceNote', type: 'textarea', defaultValue: defaults.audienceNote },
      { name: 'featuresTitle', type: 'text', defaultValue: defaults.featuresTitle },
      {
        name: 'features',
        type: 'array',
        defaultValue: defaults.features,
        fields: [
          { name: 'feature', type: 'text', required: true },
          { name: 'details', type: 'text', required: true },
        ],
      },
      { name: 'batchTitle', type: 'text', defaultValue: defaults.batchTitle },
      {
        name: 'batchDetails',
        type: 'array',
        defaultValue: defaults.batchDetails,
        fields: [
          { name: 'label', type: 'text', required: true },
          { name: 'value', type: 'text', required: true },
        ],
      },
      { name: 'batchCtaLabel', type: 'text', defaultValue: defaults.batchCtaLabel },
      { name: 'registrationTitle', type: 'text', defaultValue: defaults.registrationTitle },
      textListField('registrationSteps', defaults.registrationSteps),
      { name: 'facultyTitle', type: 'text', defaultValue: defaults.facultyTitle },
      { name: 'facultyDescription', type: 'textarea', defaultValue: defaults.facultyDescription },
      { name: 'resourcesTitle', type: 'text', defaultValue: defaults.resourcesTitle },
      textListField('resourceItems', defaults.resourceItems),
      { name: 'supportTitle', type: 'text', defaultValue: defaults.supportTitle },
      { name: 'supportDescription', type: 'textarea', defaultValue: defaults.supportDescription },
      { name: 'faqTitle', type: 'text', defaultValue: defaults.faqTitle },
      {
        name: 'faqs',
        type: 'array',
        defaultValue: defaults.faqs,
        fields: [
          { name: 'question', type: 'text', required: true },
          { name: 'answer', type: 'textarea', required: true },
        ],
      },
      { name: 'bottomCtaTitle', type: 'text', defaultValue: defaults.bottomCtaTitle },
      { name: 'bottomCtaDescription', type: 'textarea', defaultValue: defaults.bottomCtaDescription },
      { name: 'bottomCtaTagline', type: 'text', defaultValue: defaults.bottomCtaTagline },
      { name: 'bottomCtaPrimaryLabel', type: 'text', defaultValue: defaults.bottomCtaPrimaryLabel },
      {
        name: 'bottomCtaSecondaryLabel',
        type: 'text',
        defaultValue: defaults.bottomCtaSecondaryLabel,
      },
      { name: 'bottomCtaContactLabel', type: 'text', defaultValue: defaults.bottomCtaContactLabel },
      { name: 'achieversEyebrow', type: 'text', defaultValue: defaults.achieversEyebrow },
      { name: 'achieversTitle', type: 'text', defaultValue: defaults.achieversTitle },
      { name: 'statsValue', type: 'text', defaultValue: defaults.statsValue },
      { name: 'statsDescription', type: 'text', defaultValue: defaults.statsDescription },
      {
        name: 'quickNav',
        type: 'array',
        defaultValue: defaults.quickNav,
        fields: [
          { name: 'label', type: 'text', required: true },
          { name: 'href', type: 'text', required: true },
        ],
      },
    ],
  }
}
