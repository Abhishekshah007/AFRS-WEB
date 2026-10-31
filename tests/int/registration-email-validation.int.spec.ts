import { describe, expect, it } from 'vitest'
import {
  getEmailResponseError,
  validateCustomResponses,
  type DynamicFormSection,
} from '@/lib/forms/dynamicFormTypes'
import {
  extractContactFields,
  validateContactFields,
} from '@/lib/registration/extractContactFields'

const contactSections: DynamicFormSection[] = [
  {
    title: 'Contact details',
    fields: [
      { name: 'fullName', label: 'Full Name', fieldType: 'text', required: true },
      { name: 'primaryContact', label: 'Email ID', fieldType: 'text', required: true },
      { name: 'contactNumber', label: 'Contact Number', fieldType: 'tel', required: true },
    ],
  },
]

describe('registration email validation', () => {
  it('extracts email values by field metadata even when CMS field names are custom', () => {
    const contact = extractContactFields(contactSections, {
      fullName: 'Ada Lovelace',
      primaryContact: '  ada@example.org  ',
      contactNumber: '1234567890',
    })

    expect(contact.email).toBe('ada@example.org')
    expect(validateContactFields(contact)).toBeNull()
  })

  it('uses the first populated email field instead of rejecting an earlier blank field', () => {
    const sections: DynamicFormSection[] = [
      {
        title: 'Contact details',
        fields: [
          { name: 'fullName', label: 'Full Name', fieldType: 'text', required: true },
          { name: 'workEmail', label: 'Work Email', fieldType: 'email', required: false },
          { name: 'personal', label: 'Personal contact', fieldType: 'email', required: true },
          { name: 'contactNumber', label: 'Contact Number', fieldType: 'tel', required: true },
        ],
      },
    ]

    const contact = extractContactFields(sections, {
      fullName: 'Ada Lovelace',
      personal: 'person@example.org',
      contactNumber: '1234567890',
    })

    expect(contact.email).toBe('person@example.org')
    expect(validateContactFields(contact)).toBeNull()
  })

  it('rejects malformed email values during client-side custom form validation', () => {
    expect(
      validateCustomResponses(contactSections, {
        fullName: 'Ada Lovelace',
        primaryContact: 'not-an-email',
        contactNumber: '1234567890',
      }),
    ).toBe('Email ID must be a valid email address.')
  })

  it('prevents payment when the registration form has no email field', () => {
    expect(getEmailResponseError([], {})).toContain('missing an email field')
  })

  it('rejects malformed email values in the server contact validation path', () => {
    const contact = extractContactFields(contactSections, {
      fullName: 'Ada Lovelace',
      primaryContact: 'not-an-email',
      contactNumber: '1234567890',
    })

    expect(validateContactFields(contact)).toBe('Please enter a valid email address.')
  })
})
