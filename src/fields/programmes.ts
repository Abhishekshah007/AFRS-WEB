import type { Field } from 'payload'

import { ORGANIZATION_OPTIONS } from './options'
import { registrationSettingsField } from './registrationSettings'

/** Programme item schema; the caller can select the fee-tier table for its parent table. */
function createProgrammeItemFields(feeTiersDbName?: string): Field[] {
  return [
    { name: 'id', type: 'text', required: true },
    {
      name: 'organization',
      type: 'select',
      label: 'Organization',
      required: true,
      defaultValue: 'afrs',
      options: [...ORGANIZATION_OPTIONS],
      admin: {
        description:
          'Choose AFRS or AFSL. This controls the payment details and QR code shown to participants.',
      },
    },
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
      feeTiersDbName,
      name: 'registration',
      dbName: 'reg',
      compactDbNames: true,
    }),
  ]
}

/** Programme item schema used in the training category array. */
export const programmeItemFields: Field[] = createProgrammeItemFields()

/** Education programmes need a fee-tier table referencing edu_progs, not training progs. */
export const educationProgrammeItemFields: Field[] = createProgrammeItemFields('edu_fee_tiers')
