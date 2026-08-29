import type { GlobalConfig } from 'payload'

import { editorManagedGlobalAccess } from '../access'
import {
  defaultAcademicResources,
  defaultExamPrep,
  defaultUgcNetAchievers,
} from '@/data/defaults/student-hub/content'
import { ADMIN_GROUPS } from '../config/adminGroups'
import { careerGuidancePageFields } from './fields/careerGuidancePage'
import { ugcNetPageFields } from './fields/ugcNetPage'

export const StudentHubContent: GlobalConfig = {
  slug: 'studentHubContent',
  access: editorManagedGlobalAccess,
  admin: {
    group: ADMIN_GROUPS.STUDENT_HUB,
    description: 'Student hub resources, exam prep cards, and achievers.',
  },
  fields: [
    {
      name: 'academicResources',
      type: 'array',
      defaultValue: defaultAcademicResources,
      fields: [
        { name: 'id', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'ctaLabel', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        { name: 'icon', type: 'text', required: true },
        { name: 'iconBg', type: 'text', required: true },
        { name: 'featured', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'examPrep',
      type: 'array',
      defaultValue: defaultExamPrep,
      fields: [
        { name: 'id', type: 'text', required: true },
        { name: 'badge', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'subtitle', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'ctaLabel', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        { name: 'watermark', type: 'text', required: true },
      ],
    },
    {
      name: 'ugcNetAchievers',
      type: 'array',
      defaultValue: defaultUgcNetAchievers,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'title', type: 'text' },
        { name: 'photo', type: 'upload', relationTo: 'media' },
      ],
    },
    ...ugcNetPageFields,
    ...careerGuidancePageFields,
  ],
}
