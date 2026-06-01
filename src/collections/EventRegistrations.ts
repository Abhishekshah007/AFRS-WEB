import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEventManager, isPublic } from '../access'

export const EventRegistrations: CollectionConfig = {
  slug: 'eventRegistrations',
  access: {
    create: isPublic,
    read: isAdminOrEventManager,
    update: isAdminOrEventManager,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'eventSlug', 'totalAmount', 'paymentStatus', 'registrationStatus'],
  },
  fields: [
    { name: 'event', type: 'relationship', relationTo: 'events', required: true },
    { name: 'eventSlug', type: 'text', required: true, index: true },
    { name: 'eventTitle', type: 'text', required: true },

    { name: 'fullName', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'countryCode', type: 'text', defaultValue: '+91' },
    { name: 'mobileNumber', type: 'text', required: true },
    { name: 'organization', type: 'text', required: true },

    { name: 'designation', type: 'text', required: true },
    { name: 'areaOfInterest', type: 'text', required: true },
    { name: 'idProofFileName', type: 'text' },
    { name: 'idProofFileSize', type: 'number' },

    { name: 'registrationCategoryId', type: 'text', required: true },
    { name: 'registrationCategoryName', type: 'text', required: true },
    { name: 'registrationCategoryPrice', type: 'number', required: true },
    { name: 'includeKit', type: 'checkbox', defaultValue: false },
    { name: 'kitPrice', type: 'number', defaultValue: 0 },
    { name: 'totalAmount', type: 'number', required: true },

    {
      name: 'paymentStatus',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Failed', value: 'failed' },
      ],
      required: true,
    },
    {
      name: 'registrationStatus',
      type: 'select',
      defaultValue: 'initiated',
      options: [
        { label: 'Initiated', value: 'initiated' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      required: true,
    },
    { name: 'paymentReference', type: 'text' },
    { name: 'paymentConfirmedAt', type: 'date' },
  ],
}
