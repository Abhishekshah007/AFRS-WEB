import { isOtherSelectValue } from '@/lib/forms/studyJobStatusOptions'

export type DynamicFormField = {
  name: string
  label: string
  fieldType: string
  required?: boolean | null
  placeholder?: string | null
  options?: string | null
  rows?: number | null
  accept?: string | null
}

export type DynamicFormSection = {
  title: string
  description?: string | null
  fields?: DynamicFormField[] | null
}

export function isEmailField(
  field: Pick<DynamicFormField, 'fieldType' | 'label' | 'name'>,
): boolean {
  return (
    field.fieldType === 'email' ||
    field.label.toLowerCase().replace(/[^a-z0-9]/g, '').includes('email') ||
    field.name.toLowerCase().replace(/[^a-z0-9]/g, '').includes('email')
  )
}

export function isValidEmailAddress(value: string): boolean {
  const email = value.trim()
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function hasEmailField(sections: DynamicFormSection[] | null | undefined): boolean {
  return flattenSections(sections).some(isEmailField)
}

export function getEmailResponseError(
  sections: DynamicFormSection[] | null | undefined,
  responses: Record<string, string>,
): string | null {
  const emailFields = flattenSections(sections).filter(isEmailField)
  if (!emailFields.length) {
    return 'Registration form is missing an email field. Please contact AFRS support before making a payment.'
  }

  const populatedField = emailFields.find((field) => responses[field.name]?.trim())
  if (!populatedField) return `${emailFields[0].label} is required.`
  if (!isValidEmailAddress(responses[populatedField.name])) {
    return `${populatedField.label} must be a valid email address.`
  }

  return null
}

export function parseOptions(value?: string | null): string[] {
  if (!value) return []
  return value
    .split(',')
    .map((option) => option.trim())
    .filter(Boolean)
}

export function flattenSections(sections?: DynamicFormSection[] | null): DynamicFormField[] {
  if (!sections?.length) return []
  return sections.flatMap((section) => section.fields ?? [])
}

export function otherFieldKey(fieldName: string): string {
  return `${fieldName}__other`
}

export function validateCustomResponses(
  sections: DynamicFormSection[] | null | undefined,
  responses: Record<string, string>,
  files: Record<string, File | null | undefined> = {},
): string | null {
  for (const field of flattenSections(sections)) {
    if (field.fieldType === 'file') {
      if (field.required && !files[field.name]) return `${field.label} is required.`
      continue
    }
    const value = responses[field.name]?.trim()
    if (!value) {
      if (field.required) return `${field.label} is required.`
      continue
    }
    if (isEmailField(field) && !isValidEmailAddress(value)) {
      return `${field.label} must be a valid email address.`
    }
    if (field.fieldType === 'select' && isOtherSelectValue(value)) {
      const other = responses[otherFieldKey(field.name)]?.trim()
      if (!other) return `Please specify your answer for ${field.label}.`
    }
  }
  return null
}
