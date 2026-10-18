import type { DynamicFormField, DynamicFormSection } from '@/lib/forms/dynamicFormTypes'
import {
  isStudyOrJobStatusField,
  STUDY_JOB_STATUS_OPTIONS,
} from '@/lib/forms/studyJobStatusOptions'
import { fieldKeyFromLabel } from '@/lib/utils/slugify'

export function normalizeDynamicField(field: DynamicFormField, index: number): DynamicFormField {
  const label = field.label?.trim() || `Field ${index + 1}`
  const name = field.name?.trim() || fieldKeyFromLabel(label, index)

  const enriched: DynamicFormField = {
    ...field,
    label,
    name,
  }

  if (field.fieldType === 'select' && isStudyOrJobStatusField(enriched)) {
    enriched.options = STUDY_JOB_STATUS_OPTIONS
  }

  return enriched
}

export function normalizeDynamicSections(
  sections?: DynamicFormSection[] | null,
): DynamicFormSection[] {
  if (!sections?.length) return []

  return sections.map((section) => ({
    ...section,
    title: section.title?.trim() || 'Registration details',
    fields: section.fields?.map((field, index) => normalizeDynamicField(field, index)) ?? [],
  }))
}
