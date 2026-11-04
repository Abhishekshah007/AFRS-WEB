import type { CollectionConfig } from 'payload'

import { eventManagedPublishedAccess } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'
import { contentRichTextField, excerptField, slugField } from '../fields'
import { dynamicFormSectionsField } from '../fields/dynamicFormSections'
import { registrationSettingsField } from '../fields/registrationSettings'
import { eventNatureField, ORGANIZATION_OPTIONS } from '../fields/options'
import { publishedField } from '../fields/publishing'
import { autoSlugFromTitle } from '../hooks/autoSlugFromTitle'
import { guardEventPopupCapacity } from '../hooks/guardHomePopupCapacity'
import { normalizeRegistrationSectionsData } from '../hooks/normalizeRegistrationSections'

export const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'Event',
    plural: 'Events',
  },
  access: eventManagedPublishedAccess,
  admin: {
    group: ADMIN_GROUPS.EVENTS,
    useAsTitle: 'title',
    defaultColumns: ['title', 'eventType', 'startDate', 'registrationOpen', 'published'],
    description:
      'Create workshops, conferences, faculty development programmes, internships, and certification programmes. The event title auto-generates the URL slug — no technical formatting needed.',
  },
  hooks: {
    beforeValidate: [autoSlugFromTitle],
    beforeChange: [normalizeRegistrationSectionsData, guardEventPopupCapacity],
  },
  fields: [
    {
      name: 'organization',
      type: 'select',
      label: 'Organization',
      required: true,
      defaultValue: 'afrs',
      options: [...ORGANIZATION_OPTIONS],
      admin: {
        description:
          'Choose AFRS or AFSL. This controls the payment details and QR code shown to participants.',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Public event name shown on the website.',
      },
    },
    {
      ...slugField({ required: false }),
      admin: {
        hidden: true,
        description: 'Auto-generated from the event title when you save.',
      },
    },
    { name: 'banner', type: 'upload', relationTo: 'media', label: 'Event poster / banner' },
    excerptField(),
    contentRichTextField('description'),
    eventNatureField(),
    {
      name: 'eventType',
      type: 'select',
      label: 'Event type',
      options: [
        { label: 'Workshop', value: 'workshop' },
        { label: 'Conference', value: 'conference' },
        { label: 'Training', value: 'training' },
        { label: 'Faculty Development Program', value: 'fdp' },
        { label: 'Internship', value: 'internship' },
        { label: 'Professional Training Program', value: 'professional-training-program' },
        { label: 'Professional Internship Program', value: 'professional-internship-program' },
        { label: 'Professional Workshop Program', value: 'professional-workshop-program' },
        { label: 'Capsule Training Program', value: 'capsule-training-program' },
        { label: 'Police Training Program', value: 'police-training-program' },
        { label: 'Certificate Course', value: 'certificate-course' },
        { label: 'Foundation Certificate Course', value: 'foundation-certificate-course' },
      ],
    },
    {
      name: 'mode',
      type: 'select',
      label: 'Online or offline',
      options: [
        { label: 'Online', value: 'online' },
        { label: 'Offline', value: 'offline' },
        { label: 'Online & Offline', value: 'hybrid' },
      ],
    },
    { name: 'startDate', type: 'date', required: true, label: 'Start date' },
    {
      name: 'endDate',
      type: 'date',
      label: 'End date',
      admin: {
        description:
          'Recommended. The website moves events from Upcoming → Ongoing → Completed automatically using start and end dates.',
      },
    },
    {
      name: 'startTime',
      type: 'text',
      label: 'Start time',
      admin: { placeholder: 'e.g. 6:00 PM' },
    },
    {
      name: 'venue',
      type: 'text',
      label: 'Venue / platform',
      admin: { placeholder: 'e.g. Zoom link or AFRS Campus, Indore' },
    },
    {
      name: 'registrationCategories',
      type: 'array',
      label: 'Indian participant fees',
      defaultValue: [
        { categoryName: 'Students', price: 0, currency: 'INR' },
        { categoryName: 'Research & Professional', price: 0, currency: 'INR' },
      ],
      admin: {
        description:
          'Starter categories are provided. Update the default ₹0 fees before publishing paid registration, or keep 0 for free entry.',
      },
      fields: [
        {
          name: 'categoryName',
          type: 'text',
          label: 'Category name',
          admin: { placeholder: 'Students' },
        },
        { name: 'price', type: 'number', label: 'Price' },
        {
          name: 'currency',
          type: 'select',
          defaultValue: 'INR',
          options: [
            { label: 'INR (₹)', value: 'INR' },
            { label: 'USD ($)', value: 'USD' },
          ],
        },
        { name: 'description', type: 'text', label: 'Short note (optional)' },
      ],
    },
    {
      name: 'internationalRegistrationCategories',
      type: 'array',
      label: 'International participant fees',
      defaultValue: [
        { categoryName: 'Students', price: 0, currency: 'USD' },
        { categoryName: 'Research & Professional', price: 0, currency: 'USD' },
      ],
      admin: {
        description:
          'Starter categories are provided. Update the default $0 fees before publishing paid registration, or keep 0 for free entry.',
      },
      fields: [
        {
          name: 'categoryName',
          type: 'text',
          label: 'Category name',
          admin: { placeholder: 'Students' },
        },
        { name: 'price', type: 'number', label: 'Price' },
        {
          name: 'currency',
          type: 'select',
          defaultValue: 'USD',
          options: [
            { label: 'USD ($)', value: 'USD' },
            { label: 'INR (₹)', value: 'INR' },
          ],
        },
        { name: 'description', type: 'text', label: 'Short note (optional)' },
      ],
    },
    registrationSettingsField({ includeFeeTiers: false, dbName: 'reg_cfg', compactDbNames: true }),
    {
      name: 'includeKitOption',
      type: 'checkbox',
      defaultValue: false,
      label: 'Offer workshop kit add-on',
    },
    { name: 'kitPrice', type: 'number', label: 'Kit price (INR)' },
    {
      name: 'registrationOpen',
      type: 'checkbox',
      defaultValue: true,
      label: 'Registration open',
    },
    dynamicFormSectionsField({
      name: 'registrationSections',
      label: 'Registration form',
      description:
        'This is the full registration form participants fill in — name, email, WhatsApp, file uploads, etc. Add one or more sections with questions.',
    }),
    {
      name: 'showInHomePopup',
      type: 'checkbox',
      defaultValue: false,
      label: 'Show in homepage popup',
      admin: {
        position: 'sidebar',
        description:
          'Off by default. When checked, this event joins the homepage popup sequence only while it is upcoming or ongoing, with an Apply button. It counts toward the 5-popup limit.',
      },
    },
    publishedField(),
  ],
}
