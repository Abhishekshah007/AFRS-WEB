import { describe, expect, it } from 'vitest'
import type { DynamicFormSection } from '@/lib/forms/dynamicFormTypes'
import {
  extractContactFields,
  validateContactFields,
} from '@/lib/registration/extractContactFields'

const requiredContactFields: DynamicFormSection[] = [
  {
    title: 'Participant details',
    fields: [
      { name: 'fullName', label: 'Full name', fieldType: 'text', required: true },
      { name: 'mobileNumber', label: 'Mobile number', fieldType: 'tel', required: true },
    ],
  },
]

describe('event registration contact extraction', () => {
  it('extracts an email field with a custom field name', () => {
    const contact = extractContactFields(
      [
        {
          ...requiredContactFields[0],
          fields: [
            ...requiredContactFields[0].fields!,
            { name: 'participantEmail', label: 'Email address', fieldType: 'text' },
          ],
        },
      ],
      {
        fullName: 'Ada Lovelace',
        mobileNumber: '1234567890',
        participantEmail: 'ada@example.org',
      },
    )

    expect(contact.email).toBe('ada@example.org')
    expect(validateContactFields(contact)).toBeNull()
  })

  it('finds a valid email response when the CMS field has a generic name and label', () => {
    const contact = extractContactFields(
      [
        {
          ...requiredContactFields[0],
          fields: [
            ...requiredContactFields[0].fields!,
            { name: 'field3', label: 'Additional details', fieldType: 'text' },
          ],
        },
      ],
      {
        fullName: 'Ada Lovelace',
        mobileNumber: '1234567890',
        field3: 'ada@example.org',
      },
    )

    expect(contact.email).toBe('ada@example.org')
    expect(validateContactFields(contact)).toBeNull()
  })

  it('finds a populated email input when an earlier configured email field is empty', () => {
    const contact = extractContactFields(
      [
        {
          ...requiredContactFields[0],
          fields: [
            ...requiredContactFields[0].fields!,
            { name: 'primaryContact', label: 'Contact email', fieldType: 'email' },
            { name: 'emailAddress', label: 'Email address', fieldType: 'email' },
          ],
        },
      ],
      {
        fullName: 'Ada Lovelace',
        mobileNumber: '1234567890',
        primaryContact: '',
        emailAddress: 'ada@example.org',
      },
    )

    expect(contact.email).toBe('ada@example.org')
    expect(validateContactFields(contact)).toBeNull()
  })

  it('does not let an invalid configured email hide another valid email response', () => {
    const contact = extractContactFields(
      [
        {
          ...requiredContactFields[0],
          fields: [
            ...requiredContactFields[0].fields!,
            { name: 'primaryEmail', label: 'Primary email', fieldType: 'email' },
            { name: 'backupEmail', label: 'Backup email', fieldType: 'email' },
          ],
        },
      ],
      {
        fullName: 'Ada Lovelace',
        mobileNumber: '1234567890',
        primaryEmail: 'not-an-email',
        backupEmail: 'ada@example.org',
      },
    )

    expect(contact.email).toBe('ada@example.org')
    expect(validateContactFields(contact)).toBeNull()
  })
})
