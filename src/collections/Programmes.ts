import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminEditorOrEventManager, isPublic } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'
import { registrationSettingsField } from '../fields/registrationSettings'
import { ensureProgrammeId } from '../hooks/ensureProgrammeId'

export const Programmes: CollectionConfig = {
  slug: 'programmes',
  defaultSort: 'title',
  labels: {
    singular: 'Programme',
    plural: 'Programmes',
  },
  access: {
    create: isAdminEditorOrEventManager,
    read: isPublic,
    update: isAdminEditorOrEventManager,
    delete: isAdmin,
  },
  hooks: {
    beforeValidate: [ensureProgrammeId],
  },
  admin: {
    group: ADMIN_GROUPS.PROGRAMMES,
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'organization', 'duration'],
    listSearchableFields: ['title', 'programmeId'],
    description:
      'Each course is a separate record. Search or filter the list, then edit only the selected programme.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Programme details',
          fields: [
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'programmeCategories',
              required: true,
              admin: { description: 'Choose the category where this programme appears.' },
            },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
            { name: 'duration', type: 'text', required: true },
            { name: 'mode', type: 'text', required: true },
            { name: 'level', type: 'text' },
            {
              name: 'organization',
              type: 'select',
              label: 'Organization',
              required: true,
              defaultValue: 'afrs',
              options: [
                { label: 'AFRS', value: 'afrs' },
                { label: 'AFSL', value: 'afsl' },
              ],
              admin: {
                description:
                  'Choose AFRS or AFSL. This controls the payment details and QR code shown to participants.',
              },
            },
          ],
        },
        {
          label: 'Registration',
          fields: [
            {
              name: 'programmeId',
              type: 'text',
              required: true,
              unique: true,
              admin: {
                readOnly: true,
                description:
                  'Generated from the programme title. This stable identifier connects registration links and existing submissions.',
              },
            },
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
              feeTiersDbName: 'programme_fee_tiers',
              name: 'registration',
              dbName: 'reg',
              compactDbNames: true,
            }),
            {
              name: 'sortOrder',
              type: 'number',
              admin: { description: 'Lower numbers appear first within the category.' },
            },
          ],
        },
      ],
    },
  ],
}
