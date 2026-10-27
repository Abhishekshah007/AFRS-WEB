import type { Field } from 'payload'

import { registrationSettingsField } from './registrationSettings'

/** Shared programme item schema used in education and training category arrays. */
export const programmeItemFields: Field[] = [
  { name: 'id', type: 'text', required: true },
  { name: 'title', type: 'text', required: true },
  { name: 'description', type: 'textarea', required: true },
  { name: 'duration', type: 'text', required: true },
  { name: 'mode', type: 'text', required: true },
  { name: 'level', type: 'text' },
  {
    name: 'eventSlug',
    type: 'text',
    label: 'Scheduled event slug',
    admin: {
      description:
        'Optional. Enter the slug of a published Events record to send applicants to its event page.',
    },
    validate: (value: unknown) =>
      value == null ||
      value === '' ||
      (typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(value.trim())) ||
      'Enter an event slug using letters, numbers, and hyphens only.',
  },
  registrationSettingsField({
    includeFeeTiers: true,
    name: 'registration',
    dbName: 'reg',
    compactDbNames: true,
  }),
]
