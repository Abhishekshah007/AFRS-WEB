import type { GlobalConfig } from 'payload'

import { editorManagedGlobalAccess } from '../access'
import {
  defaultAcademicResources,
  defaultExamPrep,
  defaultUgcNetAchievers,
} from '@/data/defaults/student-hub/content'
import { defaultCuetAchievers } from '@/data/defaults/student-hub/cuet'
import { defaultFactAchievers } from '@/data/defaults/student-hub/fact'
import { ADMIN_GROUPS } from '../config/adminGroups'
import { careerGuidancePageFields } from './fields/careerGuidancePage'
import { cuetPageFields } from './fields/cuetPage'
import { examAchieversField } from './fields/examAchievers'
import { factPageFields } from './fields/factPage'
import { ugcNetPageFields } from './fields/ugcNetPage'

export const StudentHubContent: GlobalConfig = {
  slug: 'studentHubContent',
  access: editorManagedGlobalAccess,
  admin: {
    group: ADMIN_GROUPS.STUDENT_HUB,
    description: 'Student hub resources, exam prep pages, cards, and achievers.',
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
    examAchieversField('ugcNetAchievers', 'UGC-NET Achievers', defaultUgcNetAchievers),
    examAchieversField('factAchievers', 'FACT Achievers', defaultFactAchievers),
    examAchieversField('cuetAchievers', 'CUET Achievers', defaultCuetAchievers),
    ...ugcNetPageFields,
    ...factPageFields,
    ...cuetPageFields,
    ...careerGuidancePageFields,
  ],
}
