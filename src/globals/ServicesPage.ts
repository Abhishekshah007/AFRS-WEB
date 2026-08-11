import type { GlobalConfig } from 'payload'

import { editorManagedGlobalAccess } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'
import {
  defaultCertificationStats,
  defaultKitCards,
  defaultLegalLinks,
  defaultResearchItems,
  defaultServicesPageContent,
  defaultTrainingCards,
} from '@/data/defaults/services'

const textItemField = { name: 'text', type: 'text' as const, required: true }

export const ServicesPage: GlobalConfig = {
  slug: 'servicesPage',
  access: editorManagedGlobalAccess,
  admin: {
    group: ADMIN_GROUPS.PAGES,
    description: 'Services (AFSL) page section copy and static lists.',
  },
  fields: [
    {
      name: 'sectionText',
      type: 'group',
      admin: { description: 'Headings and body copy for the Services page.' },
      fields: [
        { name: 'heroEyebrow', type: 'text', defaultValue: defaultServicesPageContent.heroEyebrow },
        { name: 'heroTitle', type: 'text', defaultValue: defaultServicesPageContent.heroTitle },
        {
          name: 'heroHighlight',
          type: 'text',
          defaultValue: defaultServicesPageContent.heroHighlight,
        },
        {
          name: 'heroDescription',
          type: 'textarea',
          defaultValue: defaultServicesPageContent.heroDescription,
        },
        { name: 'heroCtaLabel', type: 'text', defaultValue: defaultServicesPageContent.heroCtaLabel },
        {
          name: 'labStatusLabel',
          type: 'text',
          defaultValue: defaultServicesPageContent.labStatusLabel,
        },
        {
          name: 'labStatusValue',
          type: 'text',
          defaultValue: defaultServicesPageContent.labStatusValue,
        },
        {
          name: 'labCardCtaLabel',
          type: 'text',
          defaultValue: defaultServicesPageContent.labCardCtaLabel,
        },
        {
          name: 'infrastructureEyebrow',
          type: 'text',
          defaultValue: defaultServicesPageContent.infrastructureEyebrow,
        },
        {
          name: 'infrastructureTitle',
          type: 'text',
          defaultValue: defaultServicesPageContent.infrastructureTitle,
        },
        {
          name: 'infrastructureBody1',
          type: 'textarea',
          defaultValue: defaultServicesPageContent.infrastructureBody1,
        },
        {
          name: 'infrastructureBody2',
          type: 'textarea',
          defaultValue: defaultServicesPageContent.infrastructureBody2,
        },
        { name: 'visionTitle', type: 'text', defaultValue: defaultServicesPageContent.visionTitle },
        { name: 'visionBody', type: 'textarea', defaultValue: defaultServicesPageContent.visionBody },
        { name: 'missionTitle', type: 'text', defaultValue: defaultServicesPageContent.missionTitle },
        {
          name: 'missionBody',
          type: 'textarea',
          defaultValue: defaultServicesPageContent.missionBody,
        },
        {
          name: 'directorateEyebrow',
          type: 'text',
          defaultValue: defaultServicesPageContent.directorateEyebrow,
        },
        {
          name: 'directorateTitle',
          type: 'text',
          defaultValue: defaultServicesPageContent.directorateTitle,
        },
        {
          name: 'directorateSubtitle',
          type: 'textarea',
          defaultValue: defaultServicesPageContent.directorateSubtitle,
        },
        { name: 'teamEyebrow', type: 'text', defaultValue: defaultServicesPageContent.teamEyebrow },
        { name: 'teamTitle', type: 'text', defaultValue: defaultServicesPageContent.teamTitle },
        {
          name: 'teamSubtitle',
          type: 'textarea',
          defaultValue: defaultServicesPageContent.teamSubtitle,
        },
        {
          name: 'catalogEyebrow',
          type: 'text',
          defaultValue: defaultServicesPageContent.catalogEyebrow,
        },
        { name: 'catalogTitle', type: 'text', defaultValue: defaultServicesPageContent.catalogTitle },
        { name: 'legalTitle', type: 'text', defaultValue: defaultServicesPageContent.legalTitle },
        {
          name: 'legalDescription',
          type: 'textarea',
          defaultValue: defaultServicesPageContent.legalDescription,
        },
        { name: 'legalCtaLabel', type: 'text', defaultValue: defaultServicesPageContent.legalCtaLabel },
        { name: 'kitsEyebrow', type: 'text', defaultValue: defaultServicesPageContent.kitsEyebrow },
        { name: 'kitsTitle', type: 'text', defaultValue: defaultServicesPageContent.kitsTitle },
        {
          name: 'kitsDescription',
          type: 'textarea',
          defaultValue: defaultServicesPageContent.kitsDescription,
        },
        {
          name: 'trainingTitle',
          type: 'text',
          defaultValue: defaultServicesPageContent.trainingTitle,
        },
        {
          name: 'researchTitle',
          type: 'text',
          defaultValue: defaultServicesPageContent.researchTitle,
        },
        {
          name: 'inquiryEyebrow',
          type: 'text',
          defaultValue: defaultServicesPageContent.inquiryEyebrow,
        },
        { name: 'inquiryTitle', type: 'text', defaultValue: defaultServicesPageContent.inquiryTitle },
        {
          name: 'inquiryDescription',
          type: 'textarea',
          defaultValue: defaultServicesPageContent.inquiryDescription,
        },
        {
          name: 'priorityHelplineLabel',
          type: 'text',
          defaultValue: defaultServicesPageContent.priorityHelplineLabel,
        },
        {
          name: 'reportVerificationLabel',
          type: 'text',
          defaultValue: defaultServicesPageContent.reportVerificationLabel,
        },
        {
          name: 'certificationStats',
          type: 'array',
          defaultValue: defaultCertificationStats,
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'caption', type: 'text', required: true },
          ],
        },
        {
          name: 'kitCards',
          type: 'array',
          defaultValue: defaultKitCards,
          fields: [
            { name: 'title', type: 'text', required: true },
            {
              name: 'icon',
              type: 'select',
              options: [
                'Box',
                'Fingerprint',
                'ClipboardList',
                'FileSearch',
                'FlaskConical',
                'Beaker',
                'Users',
              ],
              defaultValue: 'Box',
            },
          ],
        },
        {
          name: 'legalLinks',
          type: 'array',
          defaultValue: defaultLegalLinks.map((text) => ({ text })),
          fields: [textItemField],
        },
        {
          name: 'researchItems',
          type: 'array',
          defaultValue: defaultResearchItems,
          fields: [
            { name: 'num', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
            { name: 'desc', type: 'textarea', required: true },
          ],
        },
        {
          name: 'trainingCards',
          type: 'array',
          defaultValue: defaultTrainingCards,
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'desc', type: 'textarea', required: true },
            { name: 'cta', type: 'text', required: true },
            { name: 'href', type: 'text', defaultValue: '/courses' },
          ],
        },
      ],
    },
  ],
}
