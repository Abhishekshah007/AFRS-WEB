import type { GlobalConfig } from 'payload'

import { editorManagedGlobalAccess } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  access: editorManagedGlobalAccess,
  admin: {
    group: ADMIN_GROUPS.SITE_SETTINGS,
    description: 'Core site identity, contact details, and social links.',
  },
  fields: [
    { name: 'siteName', type: 'text', defaultValue: 'Applied Forensic Research Sciences Institute' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'phone', type: 'text', defaultValue: '+91-9926692487' },
    { name: 'email', type: 'text', defaultValue: 'afrsciences@gmail.com' },
    {
      name: 'address',
      type: 'textarea',
      defaultValue: `8/1 2nd floor, Moti Tabela,
Near Collectorate office, Indore,`,
    },
    {
      name: 'totalVisitors',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Manually updated visitor count shown in the visitor bar.' },
    },
    {
      name: 'mapEmbedUrl',
      type: 'text',
      admin: { description: 'Google Maps embed src URL for the footer and contact page.' },
    },
    {
      name: 'socialLinks',
      type: 'group',
      admin: { description: 'Social profile URLs — used across footer and contact page.' },
      fields: [
        { name: 'facebook', type: 'text' },
        { name: 'instagram', type: 'text' },
        { name: 'linkedin', type: 'text' },
        { name: 'twitter', type: 'text' },
        { name: 'youtube', type: 'text' },
        { name: 'whatsapp', type: 'text' },
        { name: 'telegram', type: 'text' },
      ],
    },
  ],
}
