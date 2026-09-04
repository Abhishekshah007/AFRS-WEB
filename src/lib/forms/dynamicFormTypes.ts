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

export function validateCustomResponses(
  sections: DynamicFormSection[] | null | undefined,
  responses: Record<string, string>,
): string | null {
  for (const field of flattenSections(sections)) {
    if (!field.required) continue
    const value = responses[field.name]?.trim()
    if (!value) return `${field.label} is required.`
  }
  return null
}
