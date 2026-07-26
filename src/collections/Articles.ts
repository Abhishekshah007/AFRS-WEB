import type { CollectionConfig } from 'payload'

import { editorManagedPublishedAccess } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'
import { contentRichTextField, excerptField, slugField } from '../fields'
import { featuredField, publishedField } from '../fields/publishing'

export const Articles: CollectionConfig = {
  slug: 'articles',
  access: editorManagedPublishedAccess,
  admin: {
    group: ADMIN_GROUPS.CONTENT,
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', 'published', 'publishedDate'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    excerptField({ required: true }),
    contentRichTextField(),
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Toxicology', value: 'toxicology' },
        { label: 'Ballistics', value: 'ballistics' },
        { label: 'Psychology', value: 'psychology' },
        { label: 'DNA', value: 'dna' },
        { label: 'Digital Forensics', value: 'digitalForensics' },
        { label: 'Forensic Odontology', value: 'odontology' },
        { label: 'General', value: 'general' },
      ],
      defaultValue: 'general',
    },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'authorName', type: 'text', required: true },
    { name: 'authorTitle', type: 'text' },
    { name: 'authorAvatar', type: 'upload', relationTo: 'media' },
    { name: 'readTimeMinutes', type: 'number', defaultValue: 10, min: 1 },
    { name: 'publishedDate', type: 'date' },
    {
      name: 'secondaryTag',
      type: 'text',
      admin: { description: 'Optional second category pill (e.g. AI in Forensics).' },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text', required: true }],
    },
    {
      name: 'pullQuote',
      type: 'group',
      fields: [
        { name: 'text', type: 'textarea' },
        { name: 'attribution', type: 'text' },
      ],
    },
    { name: 'authorBio', type: 'textarea' },
    featuredField({ description: "Show as Editor's Choice" }),
    publishedField(),
  ],
  timestamps: true,
}
