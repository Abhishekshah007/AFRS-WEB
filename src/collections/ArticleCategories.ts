import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrEditor, isPublic } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'
import { preventDeleteWhenInUse, slugFromLabel, taxonomyFields } from '../fields/taxonomy'

/** Editor-managed article topics; drives the Article "Category" dropdown and site filters. */
export const ArticleCategories: CollectionConfig = {
  slug: 'articleCategories',
  labels: {
    singular: 'Article category',
    plural: 'Article categories',
  },
  defaultSort: 'order',
  access: {
    create: isAdminOrEditor,
    read: isPublic,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  admin: {
    group: ADMIN_GROUPS.CONTENT,
    useAsTitle: 'label',
    defaultColumns: ['label', 'slug', 'showInFilters', 'order'],
    listSearchableFields: ['label', 'slug'],
    description:
      'Topics for Student Hub articles. New categories appear in the article Category dropdown and in the topic filters on the Articles page.',
  },
  hooks: {
    beforeValidate: [slugFromLabel],
    beforeDelete: [
      preventDeleteWhenInUse({ collection: 'articles', field: 'category', label: 'article(s)' }),
    ],
  },
  fields: taxonomyFields({
    labelDescription: 'Name shown on article cards and in the topic filters.',
    extraFields: [
      {
        name: 'showInFilters',
        type: 'checkbox',
        defaultValue: true,
        label: 'Show in Articles topic filter',
        admin: {
          position: 'sidebar',
          description: 'Turn off for catch-all topics such as "General".',
        },
      },
    ],
  }),
}
