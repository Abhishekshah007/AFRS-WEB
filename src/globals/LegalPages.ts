import type { Field, GlobalConfig } from 'payload'

import { editorManagedGlobalAccess } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'

const legalPageGroup = (name: string, label: string): Field => ({
  name,
  type: 'group',
  label,
  fields: [
    { name: 'title', type: 'text' },
    {
      name: 'lastUpdated',
      type: 'text',
      label: 'Last updated',
      admin: { description: 'Shown under the title, e.g. "January 2026".' },
    },
    { name: 'intro', type: 'textarea', label: 'Introduction' },
    {
      name: 'sections',
      type: 'array',
      admin: { description: 'Numbered sections. Leave a blank line between paragraphs.' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
  ],
})

/** Privacy Policy and Terms of Service page text (previously hard-coded). */
export const LegalPages: GlobalConfig = {
  slug: 'legalPages',
  label: 'Legal pages',
  access: editorManagedGlobalAccess,
  admin: {
    group: ADMIN_GROUPS.PAGES,
    description:
      'Privacy Policy (/privacy) and Terms of Service (/terms). Empty fields show the built-in text.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        { label: 'Privacy Policy', fields: [legalPageGroup('privacy', 'Privacy Policy')] },
        { label: 'Terms of Service', fields: [legalPageGroup('terms', 'Terms of Service')] },
      ],
    },
  ],
}
