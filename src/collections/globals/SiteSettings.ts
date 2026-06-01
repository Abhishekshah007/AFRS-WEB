import type { GlobalConfig } from 'payload'
import { isAdminOrEditor, isPublic } from '../../access'

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  access: {
    read: isPublic,
    update: isAdminOrEditor,
  },
  admin: {
    group: 'Site',
  },
  fields: [
    { name: 'siteName', type: 'text', defaultValue: 'Applied Forensic Research Sciences Institute' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'phone', type: 'text', defaultValue: '+91-0000000000' },
    { name: 'email', type: 'text', defaultValue: 'info@afrs.org.in' },
    { name: 'address', type: 'textarea', defaultValue: '123, Forensic Lane, Vijay Nagar, Indore, Madhya Pradesh 452010' },
    { name: 'totalVisitors', type: 'number', defaultValue: 0, admin: { description: 'Manually updated visitor count shown in the visitor bar.' } },
    { name: 'mapEmbedUrl', type: 'text', admin: { description: 'Google Maps embed src URL for the footer and contact page.' } },
    {
      name: 'socialLinks',
      type: 'group',
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
