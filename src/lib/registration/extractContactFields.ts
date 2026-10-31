import type { DynamicFormSection } from '@/lib/forms/dynamicFormTypes'
import { flattenSections } from '@/lib/forms/dynamicFormTypes'
import { isValidEmail } from '@/lib/email'

export type ExtractedContactFields = {
  fullName: string
  email: string
  countryCode: string
  mobileNumber: string
  organization: string
  designation: string
  areaOfInterest: string
}

const NAME_KEYS = new Set(['fullname', 'full_name', 'name', 'certificatename', 'studentname'])
const EMAIL_KEYS = new Set(['email', 'emailaddress', 'mail'])
const MOBILE_KEYS = new Set([
  'mobilenumber',
  'mobile',
  'phone',
  'whatsapp',
  'contactno',
  'contactnumber',
  'contact',
])
const ORG_KEYS = new Set(['organization', 'university', 'college', 'institute', 'institution'])
const DESIGNATION_KEYS = new Set(['designation', 'role', 'position', 'profession'])
const INTEREST_KEYS = new Set(['areaofinterest', 'interest', 'specialization', 'domain'])

function normalizeKey(key: string): string {
  return key.toLowerCase().replace(/[^a-z0-9]/g, '')
}

function isEmailField(field: { name: string; label: string; fieldType: string }): boolean {
  const fieldType = field.fieldType.toLowerCase()
  const name = normalizeKey(field.name)
  const label = normalizeKey(field.label)

  return (
    fieldType === 'email' ||
    EMAIL_KEYS.has(name) ||
    name.includes('email') ||
    EMAIL_KEYS.has(label) ||
    label.includes('email')
  )
}

function pickValue(
  responses: Record<string, string>,
  keys: Set<string>,
  labelIncludes: string[] = [],
  fieldType?: string,
): string {
  for (const [key, value] of Object.entries(responses)) {
    const trimmed = value?.trim()
    if (!trimmed) continue
    const normalized = normalizeKey(key)
    if (keys.has(normalized)) return trimmed
    if (fieldType === 'email' && key.toLowerCase().includes('email')) return trimmed
    if (fieldType === 'tel' && (normalized.includes('phone') || normalized.includes('mobile'))) {
      return trimmed
    }
  }

  for (const field of labelIncludes) {
    for (const [key, value] of Object.entries(responses)) {
      if (value?.trim() && normalizeKey(key).includes(field)) return value.trim()
    }
  }

  return ''
}

export function extractContactFields(
  sections: DynamicFormSection[],
  responses: Record<string, string>,
): ExtractedContactFields {
  const fields = flattenSections(sections)

  const configuredEmails = fields
    .filter(isEmailField)
    .map((field) => responses[field.name]?.trim() || '')
  const emailCandidates = [
    ...configuredEmails,
    pickValue(responses, EMAIL_KEYS, ['email'], 'email'),
    ...Object.values(responses),
  ]
    .map((value) => value?.trim() || '')
    .filter(Boolean)
  const email =
    emailCandidates.find(isValidEmail) || emailCandidates[0] || ''

  const telField = fields.find((f) => f.fieldType === 'tel')

  const fullNameField = fields.find((f) => normalizeKey(f.label).includes('fullname'))
  const fullName =
    pickValue(responses, NAME_KEYS, ['name']) ||
    (fullNameField ? responses[fullNameField.name]?.trim() || '' : '')

  const mobileNumber =
    (telField ? responses[telField.name]?.trim() : '') ||
    pickValue(responses, MOBILE_KEYS, ['whatsapp', 'mobile', 'contact'], 'tel')

  const organization = pickValue(responses, ORG_KEYS, ['university', 'college', 'organization'])
  const designation = pickValue(responses, DESIGNATION_KEYS, ['designation', 'student'])
  const areaOfInterest =
    pickValue(responses, INTEREST_KEYS, ['interest']) || designation || 'General'

  return {
    fullName,
    email,
    countryCode: responses.countryCode?.trim() || '+91',
    mobileNumber,
    organization: organization || 'Not provided',
    designation: designation || 'Participant',
    areaOfInterest,
  }
}

export function validateContactFields(contact: ExtractedContactFields): string | null {
  if (!contact.fullName)
    return 'Please enter your full name (as it should appear on the certificate).'
  if (!isValidEmail(contact.email)) {
    return 'Please enter a valid email address.'
  }
  if (!contact.mobileNumber) return 'Please enter your mobile / WhatsApp number.'
  return null
}
