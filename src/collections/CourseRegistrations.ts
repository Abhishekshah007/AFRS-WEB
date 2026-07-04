import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEventManager, isPublic } from '../access'

export const CourseRegistrations: CollectionConfig = {
  slug: 'courseRegistrations',
  access: {
    create: isPublic,
    read: isAdminOrEventManager,
    update: isAdminOrEventManager,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: [
      'fullName',
      'email',
      'programmeTitle',
      'totalAmount',
      'paymentStatus',
      'registrationStatus',
    ],
  },
  fields: [
    {
      name: 'programmeType',
      type: 'select',
      required: true,
      options: [
        { label: 'Education', value: 'education' },
        { label: 'Training', value: 'training' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'categorySlug', type: 'text' },
    { name: 'categoryTitle', type: 'text' },
    { name: 'programmeId', type: 'text' },
    { name: 'programmeTitle', type: 'text', required: true },
    { name: 'programmeDuration', type: 'text' },
    { name: 'programmeMode', type: 'text' },

    { name: 'fullName', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'countryCode', type: 'text', defaultValue: '+91' },
    { name: 'mobileNumber', type: 'text', required: true },
    { name: 'organization', type: 'text' },

    { name: 'designation', type: 'text' },
    { name: 'qualification', type: 'text' },
    {
      name: 'experienceLevel',
      type: 'select',
      options: [
        { label: 'Student', value: 'student' },
        { label: 'Beginner', value: 'beginner' },
        { label: 'Working Professional', value: 'professional' },
        { label: 'Faculty / Researcher', value: 'faculty' },
      ],
    },
    { name: 'preferredBatch', type: 'text' },
    { name: 'message', type: 'textarea' },

    { name: 'totalAmount', type: 'number', defaultValue: 0 },
    {
      name: 'paymentProvider',
      type: 'select',
      defaultValue: 'stripe',
      options: [
        { label: 'Stripe', value: 'stripe' },
        { label: 'Manual / Offline', value: 'manual' },
      ],
    },
    {
      name: 'paymentStatus',
      type: 'select',
      defaultValue: 'pending',
      required: true,
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Failed', value: 'failed' },
        { label: 'Not Required', value: 'notRequired' },
      ],
    },
    {
      name: 'registrationStatus',
      type: 'select',
      defaultValue: 'initiated',
      required: true,
      options: [
        { label: 'Initiated', value: 'initiated' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
    },
    { name: 'paymentReference', type: 'text' },
    { name: 'stripeCheckoutSessionId', type: 'text' },
    { name: 'stripePaymentIntentId', type: 'text' },
    { name: 'paymentConfirmedAt', type: 'date' },
  ],
}
