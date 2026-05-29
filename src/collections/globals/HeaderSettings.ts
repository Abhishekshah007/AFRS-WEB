import type { GlobalConfig } from 'payload'
import { isAdminOrEditor, isPublic } from '../../access'

export const HeaderSettings: GlobalConfig = {
  slug: 'headerSettings',
  access: {
    read: isPublic,
    update: isAdminOrEditor,
  },
  admin: {
    group: 'Site',
  },
  fields: [
    {
      name: 'topBarEnabled',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'topBarLeftText',
      type: 'text',
      defaultValue: '+91-9926692487',
    },
    {
      name: 'topBarLeftText2',
      type: 'text',
      defaultValue: 'afrsciences@gmail.com',
    },
    {
      name: 'topBarLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
      defaultValue: [
        { label: 'Events', url: '/events' },
        { label: 'Language', url: '#' },
        { label: 'Notification', url: '#' },
      ],
    },
    {
      name: 'brandTitle',
      type: 'text',
      defaultValue: 'Applied Forensic Research Sciences',
      required: true,
    },
    {
      name: 'brandSubtitle',
      type: 'text',
      defaultValue: 'Forensic Education Institute',
      required: true,
    },
    {
      name: 'navItems',
      type: 'array',
      required: true,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
      defaultValue: [
        { label: 'Home', url: '/' },
        { label: 'About AFRS', url: '/about' },
        { label: 'Forensic Service AFSL', url: '/services' },
        { label: 'Student Corner', url: '/student-hub' },
        { label: 'Forensic Education & Training', url: '/courses' },
        { label: 'Reach Us', url: '/contact' },
      ],
    },
  ],
}
