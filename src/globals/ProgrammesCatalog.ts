import type { GlobalConfig } from 'payload'

import { isAdminEditorOrEventManager, isPublic } from '../access'
import { defaultArchiveFilterLinks } from '@/data/defaults/programmes/catalog'
import {
  defaultGallery,
  defaultHubEvents,
  defaultResourcePersons,
  defaultTrainingChecklist,
} from '@/data/defaults/programmes/content'
import { ADMIN_GROUPS } from '../config/adminGroups'
import { eventNatureField } from '../fields'
import { educationProgrammeItemFields, programmeItemFields } from '../fields/programmes'

export const ProgrammesCatalog: GlobalConfig = {
  slug: 'programmesCatalog',
  label: 'Course site settings',
  access: {
    read: isPublic,
    update: isAdminEditorOrEventManager,
  },
  admin: {
    group: ADMIN_GROUPS.PROGRAMMES,
    description:
      'Course archive links and fallback content. Edit category copy in Programme categories and individual courses in Programmes.',
  },
  fields: [
    {
      name: 'educationCategories',
      type: 'array',
      dbName: 'edu_cats',
      admin: { hidden: true },
      fields: [
        { name: 'slug', type: 'text', required: true },
        { name: 'icon', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'summary', type: 'textarea', required: true },
        { name: 'intro', type: 'textarea' },
        {
          name: 'programmes',
          type: 'array',
          dbName: 'edu_progs',
          admin: { hidden: true },
          fields: educationProgrammeItemFields,
        },
      ],
    },
    {
      name: 'trainingCategories',
      type: 'array',
      dbName: 'train_cats',
      admin: { hidden: true },
      fields: [
        { name: 'slug', type: 'text', required: true },
        { name: 'icon', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'tag', type: 'text', required: true },
        {
          name: 'tagTone',
          type: 'select',
          required: true,
          options: [
            { label: 'Blue', value: 'blue' },
            { label: 'Green', value: 'green' },
            { label: 'Purple', value: 'purple' },
            { label: 'Orange', value: 'orange' },
          ],
        },
        { name: 'summary', type: 'textarea', required: true },
        { name: 'intro', type: 'textarea' },
        { name: 'body', type: 'textarea' },
        { name: 'highlightsTitle', type: 'text' },
        { name: 'highlightsNote', type: 'textarea' },
        {
          name: 'whoCanApply',
          type: 'array',
          admin: { hidden: true },
          fields: [{ name: 'text', type: 'text', required: true }],
        },
        { name: 'outcomesTitle', type: 'text' },
        {
          name: 'outcomes',
          type: 'array',
          admin: { hidden: true },
          fields: [{ name: 'text', type: 'text', required: true }],
        },
        { name: 'ctaLabel', type: 'text' },
        { name: 'vision', type: 'textarea' },
        { name: 'missionTitle', type: 'text' },
        {
          name: 'missionItems',
          type: 'array',
          admin: { hidden: true },
          fields: [{ name: 'text', type: 'text', required: true }],
        },
        {
          name: 'extraSections',
          type: 'array',
          admin: { hidden: true },
          fields: [
            { name: 'title', type: 'text', required: true },
            {
              name: 'items',
              type: 'array',
              admin: { hidden: true },
              fields: [{ name: 'text', type: 'text', required: true }],
            },
            { name: 'note', type: 'textarea' },
          ],
        },
        { name: 'disclaimer', type: 'textarea' },
        {
          name: 'programmes',
          type: 'array',
          dbName: 'progs',
          admin: { hidden: true },
          fields: programmeItemFields,
        },
      ],
    },
    {
      name: 'archiveFilterLinks',
      type: 'group',
      fields: [
        {
          name: 'nationalEvents',
          type: 'text',
          required: true,
          defaultValue: defaultArchiveFilterLinks.nationalEvents,
        },
        {
          name: 'internationalEvents',
          type: 'text',
          required: true,
          defaultValue: defaultArchiveFilterLinks.internationalEvents,
        },
        {
          name: 'workshops',
          type: 'text',
          required: true,
          defaultValue: defaultArchiveFilterLinks.workshops,
        },
        {
          name: 'conferences',
          type: 'text',
          required: true,
          defaultValue: defaultArchiveFilterLinks.conferences,
        },
        {
          name: 'fdp',
          type: 'text',
          required: true,
          defaultValue: defaultArchiveFilterLinks.fdp,
        },
      ],
    },
    {
      name: 'trainingChecklist',
      type: 'array',
      defaultValue: defaultTrainingChecklist.map((item) => ({ item })),
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'fallbackHubEvents',
      type: 'array',
      defaultValue: defaultHubEvents,
      fields: [
        { name: 'id', type: 'text', required: true },
        { name: 'slug', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'eventType', type: 'text', required: true },
        { name: 'eventTypeLabel', type: 'text', required: true },
        eventNatureField({ required: true }),
        { name: 'startDate', type: 'date', required: true },
        {
          name: 'visualTone',
          type: 'select',
          required: true,
          options: [
            { label: 'Blue', value: 'blue' },
            { label: 'Orange', value: 'orange' },
            { label: 'Purple', value: 'purple' },
          ],
        },
        { name: 'visualIcon', type: 'text', required: true },
      ],
    },
    {
      name: 'fallbackResourcePersons',
      type: 'array',
      defaultValue: defaultResourcePersons,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'initials', type: 'text', required: true },
      ],
    },
    {
      name: 'fallbackGallery',
      type: 'array',
      defaultValue: defaultGallery.map((item) => ({ alt: item.alt })),
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'alt', type: 'text', required: true },
      ],
    },
  ],
}
