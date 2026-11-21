import type { Field } from 'payload'

import { CMS_ICON_OPTIONS } from './cmsIconOptions'

/**
 * Home page sections that used to be hard-coded (training cards, internship, video,
 * impact cards, AFSL block, quick links). Each is a group on the Home page global.
 * Empty fields fall back to the built-in copy in src/data/defaults/home-sections.ts.
 */

const LINK_PATTERN = /^(\/|https?:\/\/|mailto:|tel:|#)/

export const hrefField = (name: string, label: string): Field => ({
  name,
  type: 'text',
  label,
  validate: (value: unknown) =>
    !value ||
    (typeof value === 'string' && LINK_PATTERN.test(value.trim())) ||
    'Use a site path like /courses or a full https:// link.',
})

const httpsUrlField = (name: string, label: string, description: string): Field => ({
  name,
  type: 'text',
  label,
  admin: { description },
  validate: (value: unknown) =>
    !value ||
    (typeof value === 'string' && /^https:\/\//.test(value.trim())) ||
    'Use a full https:// link.',
})

const emojiIconField: Field = {
  name: 'icon',
  type: 'text',
  label: 'Icon (emoji)',
  admin: { description: 'One emoji, e.g. 🔍', width: '30%' },
}

const iconSelectField = (defaultValue: string): Field => ({
  name: 'icon',
  type: 'select',
  defaultValue,
  options: [...CMS_ICON_OPTIONS],
})

export const homeTrainingSectionField: Field = {
  name: 'training',
  type: 'group',
  label: 'Forensic Training Programs',
  admin: { description: 'Card grid below the hero ("Specialized Courses").' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text' },
    { name: 'subtitle', type: 'textarea' },
    {
      name: 'items',
      type: 'array',
      label: 'Programme cards',
      admin: { description: 'Shown in rows of three; the button fills the last slot.' },
      fields: [emojiIconField, { name: 'title', type: 'text', required: true }],
    },
    { name: 'ctaLabel', type: 'text', label: 'Button label' },
    hrefField('ctaHref', 'Button link'),
  ],
}

export const homeInternshipSectionField: Field = {
  name: 'internship',
  type: 'group',
  label: 'Internship Program',
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text' },
    { name: 'description', type: 'textarea' },
    {
      name: 'features',
      type: 'array',
      label: 'Highlights (tick list)',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    { name: 'ctaLabel', type: 'text', label: 'Button label' },
    hrefField('ctaHref', 'Button link'),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Square image on the right. Leave empty to keep the current one.' },
    },
  ],
}

export const homeVideoSectionField: Field = {
  name: 'video',
  type: 'group',
  label: 'Intro video',
  admin: { description: '"Exploring the Future of Forensics" video block.' },
  fields: [
    { name: 'title', type: 'text' },
    {
      name: 'body',
      type: 'textarea',
      admin: { description: 'Leave a blank line between paragraphs.' },
    },
    { name: 'ctaLabel', type: 'text', label: 'Button label' },
    hrefField('ctaHref', 'Button link'),
    httpsUrlField('videoUrl', 'Video file URL (.mp4)', 'Upload the video to Cloudinary and paste its https link.'),
    httpsUrlField('posterUrl', 'Poster image URL', 'Still image shown before the video plays.'),
  ],
}

export const homeImpactSectionField: Field = {
  name: 'impact',
  type: 'group',
  label: 'The AFRS Impact',
  fields: [
    { name: 'title', type: 'text' },
    { name: 'subtitle', type: 'textarea' },
    {
      name: 'items',
      type: 'array',
      label: 'Impact cards',
      fields: [
        iconSelectField('badge'),
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
  ],
}

export const homeAfslSectionField: Field = {
  name: 'afsl',
  type: 'group',
  label: 'AFSL laboratory block',
  fields: [
    { name: 'title', type: 'text' },
    { name: 'tagline', type: 'text' },
    { name: 'description', type: 'textarea' },
    {
      name: 'cards',
      type: 'array',
      label: 'Service cards',
      fields: [emojiIconField, { name: 'title', type: 'text', required: true }],
    },
    {
      type: 'collapsible',
      label: 'Training & internship panel',
      fields: [
        { name: 'offersTitle', type: 'text', label: 'Title' },
        { name: 'offersDescription', type: 'textarea', label: 'Description' },
        { name: 'offersPrimaryLabel', type: 'text', label: 'First button label' },
        hrefField('offersPrimaryHref', 'First button link'),
        { name: 'offersSecondaryLabel', type: 'text', label: 'Second button label' },
        hrefField('offersSecondaryHref', 'Second button link'),
        { name: 'offersImage', type: 'upload', relationTo: 'media', label: 'Image' },
      ],
    },
    {
      type: 'collapsible',
      label: 'Get in touch panel',
      fields: [
        { name: 'contactEyebrow', type: 'text', label: 'Eyebrow' },
        { name: 'contactDescription', type: 'textarea', label: 'Description' },
        { name: 'contactPrimaryLabel', type: 'text', label: 'First button label' },
        hrefField('contactPrimaryHref', 'First button link'),
        { name: 'contactSecondaryLabel', type: 'text', label: 'Second button label' },
        hrefField('contactSecondaryHref', 'Second button link'),
        { name: 'contactImage', type: 'upload', relationTo: 'media', label: 'Image' },
      ],
    },
  ],
}

export const homeQuickLinksSectionField: Field = {
  name: 'quickLinks',
  type: 'group',
  label: 'Quick Links',
  fields: [
    { name: 'title', type: 'text' },
    { name: 'subtitle', type: 'text' },
    {
      name: 'items',
      type: 'array',
      label: 'Links',
      fields: [
        iconSelectField('link'),
        { name: 'label', type: 'text', required: true },
        { ...hrefField('href', 'Link'), required: true } as Field,
      ],
    },
  ],
}
