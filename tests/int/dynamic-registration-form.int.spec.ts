import { describe, expect, it } from 'vitest'
import { registrationSectionPresets } from '@/lib/forms/registrationSectionPresets'
import { normalizeSections } from '@/hooks/normalizeRegistrationSections'

describe('dynamic registration form presets', () => {
  it('provides personal and academic sections with the standard participant fields', () => {
    const personalInformation = registrationSectionPresets.find(
      (section) => section.title === 'Personal Information',
    )
    const academicInformation = registrationSectionPresets.find(
      (section) => section.title === 'Academic Info / Professional Info',
    )

    expect(personalInformation?.fields.map((field) => field.label)).toEqual([
      'Title (Mr / Ms / Dr)',
      'Full Name (mention in certificate)',
      'Email ID',
      'Address',
      'Contact No (WhatsApp)',
    ])
    expect(academicInformation?.fields[0]).toMatchObject({
      label: 'Current Study / Job Status',
      fieldType: 'select',
      required: true,
    })
    expect(academicInformation?.fields[0].options).toContain('School Student (10th / 12th)')
  })

  it('keeps generated response keys unique across added sections', () => {
    const sections = normalizeSections([
      { title: 'Personal Information', fields: [{ label: 'Email ID' }] },
      { title: 'Professional Information', fields: [{ label: 'Email ID' }] },
      { title: 'Other Details', fields: [{ label: 'Email ID', name: 'email2' }] },
    ])

    expect(sections?.flatMap((section) => section.fields?.map((field) => field.name))).toEqual([
      'emailId',
      'emailId2',
      'email2',
    ])
  })
})
