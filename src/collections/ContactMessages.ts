import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrEditor, isPublic } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'
import { SUBMISSION_FORM_TYPES, submissionExportField } from '../fields/submissionExport'
import { contactSubmissionExportHook } from '../lib/submissions/attachSubmissionExport'

export const ContactMessages: CollectionConfig = {
  slug: 'contactMessages',
  admin: {
    group: ADMIN_GROUPS.INBOX,
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'formType', 'email', 'status', 'createdAt'],
  },
  access: {
    create: isPublic,
    read: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  hooks: {
    afterChange: [contactSubmissionExportHook()],
  },
  fields: [
    {
      name: 'formType',
      type: 'select',
      required: true,
      defaultValue: 'contact',
      options: [...SUBMISSION_FORM_TYPES],
      admin: {
        position: 'sidebar',
        description: 'Which form submitted this message.',
      },
    },
    { name: 'fullName', type: 'text', required: true },
    { name: 'mobile', type: 'text' },
    { name: 'email', type: 'email', required: true },
    { name: 'subject', type: 'text' },
    { name: 'caseType', type: 'text', admin: { description: 'Service or legal case type selected in the form.' } },
    { name: 'serviceSlug', type: 'text', index: true },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In progress', value: 'inProgress' },
        { label: 'Resolved', value: 'resolved' },
      ],
    },
    submissionExportField(),
  ],
  timestamps: true,
}
