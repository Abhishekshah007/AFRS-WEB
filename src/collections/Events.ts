import type { CollectionConfig } from 'payload'

import { eventManagedPublishedAccess } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'
import { contentRichTextField, excerptField, slugField } from '../fields'
import { dynamicFormSectionsField } from '../fields/dynamicFormSections'
import { eventNatureField } from '../fields/options'
import { publishedField } from '../fields/publishing'

export const Events: CollectionConfig = {
  slug: 'events',
  access: eventManagedPublishedAccess,
  admin: {
    group: ADMIN_GROUPS.EVENTS,
    useAsTitle: 'title',
    defaultColumns: ['title', 'eventType', 'startDate', 'registrationOpen', 'published'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    { name: 'banner', type: 'upload', relationTo: 'media' },
    excerptField(),
    contentRichTextField('description'),
    eventNatureField(),
    {
      name: 'eventType',
      type: 'select',
      options: [
        { label: 'Workshop', value: 'workshop' },
        { label: 'Webinar', value: 'webinar' },
        { label: 'Conference', value: 'conference' },
        { label: 'Training', value: 'training' },
      ],
    },
    {
      name: 'mode',
      type: 'select',
      options: [
        { label: 'Online', value: 'online' },
        { label: 'Offline', value: 'offline' },
        { label: 'Online & Offline', value: 'hybrid' },
      ],
    },
    { name: 'startDate', type: 'date', required: true },
    { name: 'endDate', type: 'date' },
    { name: 'startTime', type: 'text', admin: { placeholder: 'e.g. 10:00 AM' } },
    { name: 'venue', type: 'text' },
    {
      name: 'registrationCategories',
      type: 'array',
      fields: [
        { name: 'categoryName', type: 'text' },
        { name: 'price', type: 'number' },
        { name: 'description', type: 'text' },
      ],
    },
    { name: 'includeKitOption', type: 'checkbox', defaultValue: false },
    { name: 'kitPrice', type: 'number' },
    { name: 'registrationOpen', type: 'checkbox', defaultValue: true },
    dynamicFormSectionsField({
      name: 'registrationSections',
      label: 'Custom registration fields',
      description:
        'Add event-specific questions (e.g. abstract title, nominee category). Shown on the registration form in addition to standard contact fields.',
    }),
    publishedField(),
  ],
}
