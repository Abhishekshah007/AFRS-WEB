import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor, isAdminOrEventManager, publishedRead } from '../access'

export const Events: CollectionConfig = {
  slug: 'events',
  access: {
    create: isAdminOrEventManager,
    read: publishedRead,
    update: isAdminOrEventManager,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'eventType', 'startDate', 'registrationOpen', 'published'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'banner', type: 'upload', relationTo: 'media' },
    { name: 'excerpt', type: 'textarea', admin: { description: 'Short summary shown in cards and listings.' } },
    { name: 'description', type: 'richText' },
    {
      name: 'eventType',
      type: 'select',
      options: [
        { label: 'Workshop', value: 'workshop' },
        { label: 'Webinar', value: 'webinar' },
        { label: 'Conference', value: 'conference' },
        { label: 'Training', value: 'training' },
      ],
    },
    {
      name: 'mode',
      type: 'select',
      options: [
        { label: 'Online', value: 'online' },
        { label: 'Offline', value: 'offline' },
        { label: 'Online & Offline', value: 'hybrid' },
      ],
    },
    { name: 'startDate', type: 'date', required: true },
    { name: 'endDate', type: 'date' },
    { name: 'startTime', type: 'text', admin: { placeholder: 'e.g. 10:00 AM' } },
    { name: 'venue', type: 'text' },
    {
      name: 'registrationCategories',
      type: 'array',
      fields: [
        { name: 'categoryName', type: 'text' },
        { name: 'price', type: 'number' },
        { name: 'description', type: 'text' },
      ],
    },
    { name: 'includeKitOption', type: 'checkbox', defaultValue: false },
    { name: 'kitPrice', type: 'number' },
    { name: 'registrationOpen', type: 'checkbox', defaultValue: true },
    { name: 'published', type: 'checkbox', defaultValue: false },
  ],
}
