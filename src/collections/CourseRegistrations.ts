import type { CollectionConfig } from 'payload'

import { eventRegistrationAccess } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'
import { registrationContactFields, registrationPaymentFields } from '../fields'

export const CourseRegistrations: CollectionConfig = {
  slug: 'courseRegistrations',
  access: eventRegistrationAccess,
  admin: {
    group: ADMIN_GROUPS.EVENTS,
    useAsTitle: 'fullName',
    defaultColumns: [
      'fullName',
      'email',
      'programmeTitle',
      'totalAmount',
      'paymentStatus',
      'registrationStatus',
    ],
  },
  fields: [
    {
      name: 'programmeType',
      type: 'select',
      required: true,
      options: [
        { label: 'Education', value: 'education' },
        { label: 'Training', value: 'training' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'categorySlug', type: 'text' },
    { name: 'categoryTitle', type: 'text' },
    { name: 'programmeId', type: 'text' },
    { name: 'programmeTitle', type: 'text', required: true },
    { name: 'programmeDuration', type: 'text' },
    { name: 'programmeMode', type: 'text' },

    ...registrationContactFields(),

    { name: 'qualification', type: 'text' },
    {
      name: 'experienceLevel',
      type: 'select',
      options: [
        { label: 'Student', value: 'student' },
        { label: 'Beginner', value: 'beginner' },
        { label: 'Working Professional', value: 'professional' },
        { label: 'Faculty / Researcher', value: 'faculty' },
      ],
    },
    { name: 'preferredBatch', type: 'text' },
    { name: 'message', type: 'textarea' },

    ...registrationPaymentFields.map((field) => {
      if ('name' in field && field.name === 'paymentStatus' && field.type === 'select') {
        return {
          ...field,
          options: [
            ...(field.options ?? []),
            { label: 'Not Required', value: 'notRequired' },
          ],
        }
      }
      if ('name' in field && field.name === 'registrationStatus' && field.type === 'select') {
        return {
          ...field,
          options: [
            ...(field.options ?? []),
            { label: 'Contacted', value: 'contacted' },
          ],
        }
      }
      return field
    }),
  ],
}
