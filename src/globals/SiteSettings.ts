import type { GlobalConfig } from 'payload'

import { editorManagedGlobalAccess } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'
import { DEFAULT_SITE_ADDRESS } from '../data/defaults/siteContact'

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  label: 'Site identity',
  access: editorManagedGlobalAccess,
  admin: {
    group: ADMIN_GROUPS.SITE_SETTINGS,
    description:
      'Institute name, logo, phone, email, address, visitor count, and social links used across the site.',
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'Applied Forensic Research Sciences Institute',
    },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'phone', type: 'text', defaultValue: '+91-9926692487' },
    { name: 'email', type: 'text', defaultValue: 'afrsciences@gmail.com' },
    {
      name: 'labEmail',
      type: 'text',
      defaultValue: 'afslindore23@gmail.com',
      admin: { description: 'AFSL laboratory inquiries — footer and contact page.' },
    },
    {
      name: 'address',
      type: 'textarea',
      defaultValue: DEFAULT_SITE_ADDRESS,
      admin: {
        description: 'Shown in footer and contact page. Include head office and regional offices.',
      },
    },
    {
      name: 'totalVisitors',
      type: 'number',
      defaultValue: 0,
      admin: {
        description:
          'Optional historical starting total. New unique browser visitors are counted automatically in addition to this number.',
      },
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
