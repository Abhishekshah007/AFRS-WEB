import type { GlobalConfig } from 'payload'
import { isAdminOrEditor, isPublic } from '../../access'
import {
  defaultArchiveFilterLinks,
  defaultEducationCategories,
  defaultTrainingCategories,
} from '../../components/programmes/catalog.defaults'
import {
  defaultGallery,
  defaultHubEvents,
  defaultResourcePersons,
  defaultTrainingChecklist,
} from '../../components/programmes/content.defaults'

export const ProgrammesCatalog: GlobalConfig = {
  slug: 'programmesCatalog',
  access: { read: isPublic, update: isAdminOrEditor },
  admin: { group: 'Site' },
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
        {
          name: 'programmes',
          type: 'array',
          fields: [
            { name: 'id', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
            { name: 'duration', type: 'text', required: true },
            { name: 'mode', type: 'text', required: true },
            { name: 'level', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'trainingCategories',
      type: 'array',
      defaultValue: defaultTrainingCategories,
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
        {
          name: 'programmes',
          type: 'array',
          fields: [
            { name: 'id', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
            { name: 'duration', type: 'text', required: true },
            { name: 'mode', type: 'text', required: true },
            { name: 'level', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'archiveFilterLinks',
      type: 'group',
      fields: [
        { name: 'nationalEvents', type: 'text', required: true, defaultValue: defaultArchiveFilterLinks.nationalEvents },
        { name: 'internationalEvents', type: 'text', required: true, defaultValue: defaultArchiveFilterLinks.internationalEvents },
        { name: 'workshops', type: 'text', required: true, defaultValue: defaultArchiveFilterLinks.workshops },
        { name: 'webinars', type: 'text', required: true, defaultValue: defaultArchiveFilterLinks.webinars },
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
        { name: 'eventNature', type: 'select', required: true, options: [{ label: 'National', value: 'national' }, { label: 'International', value: 'international' }] },
        { name: 'startDate', type: 'date', required: true },
        { name: 'visualTone', type: 'select', required: true, options: [{ label: 'Blue', value: 'blue' }, { label: 'Orange', value: 'orange' }, { label: 'Purple', value: 'purple' }] },
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
