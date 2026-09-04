import type { CollectionConfig } from 'payload'

import { eventRegistrationAccess } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'
import { registrationContactFields, registrationPaymentFields, registrationPaymentProofFields } from '../fields'
import { submissionExportField } from '../fields/submissionExport'
import { registrationSubmissionExportHook } from '../lib/submissions/attachSubmissionExport'

export const EventRegistrations: CollectionConfig = {
  slug: 'eventRegistrations',
  access: eventRegistrationAccess,
  admin: {
    group: ADMIN_GROUPS.EVENTS,
    useAsTitle: 'fullName',
    defaultColumns: [
      'fullName',
      'email',
      'eventSlug',
      'totalAmount',
      'paymentStatus',
      'registrationStatus',
    ],
  },
  hooks: {
    afterChange: [registrationSubmissionExportHook('eventRegistrations')],
  },
  fields: [
    { name: 'event', type: 'relationship', relationTo: 'events', required: true },
    { name: 'eventSlug', type: 'text', required: true, index: true },
    { name: 'eventTitle', type: 'text', required: true },

    ...registrationContactFields({ organizationRequired: true, designationRequired: true }),

    { name: 'areaOfInterest', type: 'text', required: true },
    { name: 'idProofFileName', type: 'text' },
    { name: 'idProofFileSize', type: 'number' },

    { name: 'registrationCategoryId', type: 'text', required: true },
    { name: 'registrationCategoryName', type: 'text', required: true },
    { name: 'registrationCategoryPrice', type: 'number', required: true },
    { name: 'includeKit', type: 'checkbox', defaultValue: false },
    { name: 'kitPrice', type: 'number', defaultValue: 0 },

    {
      name: 'customResponses',
      type: 'json',
      admin: {
        description: 'Answers to event-specific custom fields configured on the event.',
      },
    },

    ...registrationPaymentProofFields,

    ...registrationPaymentFields.map((field) =>
      'name' in field && field.name === 'totalAmount'
        ? { ...field, required: true, defaultValue: undefined }
        : field,
    ),
    submissionExportField(),
  ],
}
