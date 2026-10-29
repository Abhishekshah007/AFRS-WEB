'use client'

import { useForm } from '@payloadcms/ui'
import type { ArrayFieldDescriptionClientComponent, FormState, Row } from 'payload'
import { registrationSectionPresets } from '@/lib/forms/registrationSectionPresets'
import { fieldKeyFromLabel } from '@/lib/utils/slugify'

type PresetField = (typeof registrationSectionPresets)[number]['fields'][number]
type PresetSection = (typeof registrationSectionPresets)[number]

function toFieldState(value: unknown) {
  return { initialValue: value, valid: true, value }
}

function buildSectionState(section: PresetSection): FormState {
  const rows: Row[] = section.fields.map(() => ({ id: crypto.randomUUID() }))
  const state: FormState = {
    title: toFieldState(section.title),
    description: toFieldState(section.description),
    fields: {
      ...toFieldState(rows.length),
      rows,
    },
  }

  section.fields.forEach((field: PresetField, index) => {
    const rowPath = `fields.${index}`
    const values: Record<string, unknown> = {
      id: rows[index].id,
      name: fieldKeyFromLabel(field.label, index),
      label: field.label,
      fieldType: field.fieldType,
      required: field.required,
      placeholder: '',
      options: field.options ?? '',
      rows: field.rows ?? null,
      accept: 'image/*,.pdf',
    }

    Object.entries(values).forEach(([key, value]) => {
      state[`${rowPath}.${key}`] = toFieldState(value)
    })
  })

  return state
}

function normalizeTitle(title: string): string {
  return title.trim().toLocaleLowerCase()
}

export const RegistrationSectionPresets: ArrayFieldDescriptionClientComponent = ({
  field,
  path,
}) => {
  const { addFieldRow, disabled, getDataByPath } = useForm()

  function addSections(presets: PresetSection[]) {
    const currentSections = getDataByPath<unknown>(path)
    const sections = Array.isArray(currentSections) ? currentSections : []
    const existingTitles = new Set(
      sections
        .map((section) => {
          if (!section || typeof section !== 'object' || !('title' in section)) return ''
          return typeof section.title === 'string' ? normalizeTitle(section.title) : ''
        })
        .filter(Boolean),
    )
    let rowIndex = sections.length

    for (const preset of presets) {
      if (existingTitles.has(normalizeTitle(preset.title))) continue
      addFieldRow({
        path,
        rowIndex,
        schemaPath: field.name,
        subFieldState: buildSectionState(preset),
      })
      existingTitles.add(normalizeTitle(preset.title))
      rowIndex += 1
    }
  }

  const existingSections = getDataByPath<unknown>(path)
  const existingTitles = new Set<string>()
  if (Array.isArray(existingSections)) {
    for (const section of existingSections) {
      if (!section || typeof section !== 'object' || !('title' in section)) continue
      if (typeof section.title === 'string') existingTitles.add(normalizeTitle(section.title))
    }
  }

  return (
    <div className="registration-section-presets">
      <p className="registration-section-presets__heading">Quick-start sections</p>
      <p className="registration-section-presets__description">
        Add a ready-made section, then edit, remove, or reorder its questions below.
      </p>
      <div className="registration-section-presets__actions">
        {registrationSectionPresets.map((preset) => {
          const alreadyAdded = existingTitles.has(normalizeTitle(preset.title))

          return (
            <button
              key={preset.title}
              type="button"
              className="registration-section-presets__button"
              disabled={disabled || alreadyAdded}
              onClick={() => addSections([preset])}
            >
              {alreadyAdded ? `Added: ${preset.title}` : `+ ${preset.title}`}
            </button>
          )
        })}
        <button
          type="button"
          className="registration-section-presets__button registration-section-presets__button--primary"
          disabled={
            disabled ||
            registrationSectionPresets.every((preset) =>
              existingTitles.has(normalizeTitle(preset.title)),
            )
          }
          onClick={() => addSections(registrationSectionPresets)}
        >
          + Add AFRS standard form
        </button>
      </div>
    </div>
  )
}
