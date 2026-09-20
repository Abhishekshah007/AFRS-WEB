import type { CollectionConfig } from 'payload'

import { editorManagedPublishedAccess } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'
import { orderField, publishedField } from '../fields/publishing'

export const ResourcePersons: CollectionConfig = {
  slug: 'resourcePersons',
  labels: {
    singular: 'Resource Person',
    plural: 'Resource Persons',
  },
  access: editorManagedPublishedAccess,
  admin: {
    group: ADMIN_GROUPS.PROGRAMMES,
    description:
      'Experts and faculty shown in the Resource Persons section on the Courses / Programmes page.',
    useAsTitle: 'name',
    defaultColumns: ['name', 'title', 'published', 'order'],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Resource Person',
      admin: { description: 'Role or specialty shown under the name.' },
    },
    { name: 'bio', type: 'textarea' },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Square profile photo recommended.' },
    },
    publishedField({
      defaultValue: true,
      description: 'Unpublished people are hidden from the public site.',
    }),
    orderField({ description: 'Lower numbers appear first in the list and modal.' }),
  ],
}
