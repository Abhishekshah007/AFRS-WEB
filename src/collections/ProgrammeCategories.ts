import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminEditorOrEventManager, isPublic } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'
import { ensureProgrammeCategoryOrder } from '../hooks/ensureProgrammeCategoryOrder'

const textItemsField = (name: string, label: string) => ({
  name,
  type: 'array' as const,
  label,
  admin: { initCollapsed: true },
  fields: [{ name: 'text', type: 'text' as const, required: true }],
})

export const ProgrammeCategories: CollectionConfig = {
  slug: 'programmeCategories',
  defaultSort: 'sortOrder',
  labels: {
    singular: 'Programme category',
    plural: 'Programme categories',
  },
  access: {
    create: isAdminEditorOrEventManager,
    read: isPublic,
    update: isAdminEditorOrEventManager,
    delete: isAdmin,
  },
  admin: {
    group: ADMIN_GROUPS.PROGRAMMES,
    useAsTitle: 'title',
    defaultColumns: ['title', 'kind', 'slug', 'sortOrder'],
    listSearchableFields: ['title', 'slug'],
    description:
      'Manage category titles and page copy here. Edit individual courses from Programmes; each course is a separate record.',
  },
  hooks: {
    beforeValidate: [ensureProgrammeCategoryOrder],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Category details',
          fields: [
            {
              name: 'kind',
              type: 'select',
              required: true,
              options: [
                { label: 'Education', value: 'education' },
                { label: 'Training', value: 'training' },
              ],
            },
            { name: 'title', type: 'text', required: true },
            {
              name: 'slug',
              type: 'text',
              required: true,
              admin: {
                description:
                  'Permanent URL identifier. Avoid changing it after sharing the category link.',
              },
            },
            { name: 'icon', type: 'text', required: true },
            { name: 'summary', type: 'textarea', required: true },
            { name: 'intro', type: 'textarea' },
            {
              name: 'tag',
              type: 'text',
              admin: { condition: (_, siblingData) => siblingData?.kind === 'training' },
            },
            {
              name: 'tagTone',
              type: 'select',
              options: [
                { label: 'Blue', value: 'blue' },
                { label: 'Green', value: 'green' },
                { label: 'Purple', value: 'purple' },
                { label: 'Orange', value: 'orange' },
              ],
              admin: { condition: (_, siblingData) => siblingData?.kind === 'training' },
            },
            {
              name: 'sortOrder',
              type: 'number',
              admin: { description: 'Lower numbers appear first on the website.' },
            },
          ],
        },
        {
          label: 'Page content',
          fields: [
            { name: 'body', type: 'textarea' },
            { name: 'highlightsTitle', type: 'text' },
            { name: 'highlightsNote', type: 'textarea' },
            textItemsField('whoCanApply', 'Who can apply'),
            { name: 'outcomesTitle', type: 'text' },
            textItemsField('outcomes', 'Learning outcomes'),
            { name: 'ctaLabel', type: 'text' },
            { name: 'vision', type: 'textarea' },
            { name: 'missionTitle', type: 'text' },
            textItemsField('missionItems', 'Mission items'),
            {
              name: 'extraSections',
              type: 'array',
              admin: { initCollapsed: true },
              fields: [
                { name: 'title', type: 'text', required: true },
                {
                  name: 'items',
                  type: 'array',
                  admin: { initCollapsed: true },
                  fields: [{ name: 'text', type: 'text', required: true }],
                },
                { name: 'note', type: 'textarea' },
              ],
            },
            { name: 'disclaimer', type: 'textarea' },
          ],
        },
      ],
    },
  ],
  indexes: [{ fields: ['kind', 'slug'], unique: true }],
}
