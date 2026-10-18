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
    if (!field.required) continue
    if (field.fieldType === 'file') {
      if (!files[field.name]) return `${field.label} is required.`
      continue
    }
    const value = responses[field.name]?.trim()
    if (!value) return `${field.label} is required.`
    if (field.fieldType === 'select' && isOtherSelectValue(value)) {
      const other = responses[otherFieldKey(field.name)]?.trim()
      if (!other) return `Please specify your answer for ${field.label}.`
    }
  }
  return null
}
