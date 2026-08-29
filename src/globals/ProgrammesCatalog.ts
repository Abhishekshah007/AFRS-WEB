import type { GlobalConfig } from 'payload'

import { editorManagedGlobalAccess } from '../access'
import {
  defaultArchiveFilterLinks,
  defaultEducationCategories,
  defaultTrainingCategories,
} from '@/data/defaults/programmes/catalog'
import {
  defaultGallery,
  defaultHubEvents,
  defaultResourcePersons,
  defaultTrainingChecklist,
} from '@/data/defaults/programmes/content'
import { ADMIN_GROUPS } from '../config/adminGroups'
import { eventNatureField } from '../fields'
import { programmeItemFields } from '../fields/programmes'

export const ProgrammesCatalog: GlobalConfig = {
  slug: 'programmesCatalog',
  access: editorManagedGlobalAccess,
  admin: {
    group: ADMIN_GROUPS.PROGRAMMES,
    description: 'Education and training programme categories and fallbacks.',
  },
  fields: [
    {
      name: 'educationCategories',
      type: 'array',
      defaultValue: defaultEducationCategories,
      fields: [
        { name: 'slug', type: 'text', required: true },
        { name: 'icon', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'summary', type: 'textarea', required: true },
        { name: 'intro', type: 'textarea' },
        { name: 'programmes', type: 'array', fields: programmeItemFields },
      ],
    },
    {
      name: 'trainingCategories',
      type: 'array',
      defaultValue: defaultTrainingCategories.map((category) => ({
        ...category,
        whoCanApply: category.whoCanApply?.map((text) => ({ text })),
        outcomes: category.outcomes?.map((text) => ({ text })),
        missionItems: category.missionItems?.map((text) => ({ text })),
        extraSections: category.extraSections?.map((section) => ({
          title: section.title,
          note: section.note,
          items: section.items.map((text) => ({ text })),
        })),
      })),
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
          fields: [{ name: 'text', type: 'text', required: true }],
        },
        { name: 'outcomesTitle', type: 'text' },
        {
          name: 'outcomes',
          type: 'array',
          fields: [{ name: 'text', type: 'text', required: true }],
        },
        { name: 'ctaLabel', type: 'text' },
        { name: 'vision', type: 'textarea' },
        { name: 'missionTitle', type: 'text' },
        {
          name: 'missionItems',
          type: 'array',
          fields: [{ name: 'text', type: 'text', required: true }],
        },
        {
          name: 'extraSections',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            {
              name: 'items',
              type: 'array',
              fields: [{ name: 'text', type: 'text', required: true }],
            },
            { name: 'note', type: 'textarea' },
          ],
        },
        { name: 'disclaimer', type: 'textarea' },
        { name: 'programmes', type: 'array', fields: programmeItemFields },
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
          name: 'webinars',
          type: 'text',
          required: true,
          defaultValue: defaultArchiveFilterLinks.webinars,
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
