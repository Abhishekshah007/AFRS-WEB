import type { CollectionBeforeChangeHook, GlobalBeforeChangeHook } from 'payload'
import { fieldKeyFromLabel } from '@/lib/utils/slugify'

type RegistrationField = {
  name?: string | null
  label?: string | null
  fieldType?: string | null
}

type RegistrationSection = {
  title?: string | null
  description?: string | null
  fields?: RegistrationField[] | null
}

export function normalizeSections(sections?: RegistrationSection[] | null) {
  if (!sections?.length) return sections

  return sections.map((section) => {
    const usedNames = new Set<string>()
    return {
      ...section,
      fields: section.fields?.map((field, index) => {
        const label = field.label?.trim() || `Question ${index + 1}`
        let name = field.name?.trim() || fieldKeyFromLabel(label, index)
        while (usedNames.has(name)) name = `${name}${index + 1}`
        usedNames.add(name)
        return { ...field, label, name }
      }),
    }
  })
}

export const normalizeRegistrationSectionsData: CollectionBeforeChangeHook = ({ data }) => {
  if (!data) return data

  if (Array.isArray(data.registrationSections)) {
    data.registrationSections = normalizeSections(
      data.registrationSections as RegistrationSection[],
    )
  }

  return data
}

export const normalizeRegistrationFormSectionsData: GlobalBeforeChangeHook = ({ data }) => {
  if (!data) return data

  if (Array.isArray(data.sections)) {
    data.sections = normalizeSections(data.sections as RegistrationSection[])
  }

  return data
}
