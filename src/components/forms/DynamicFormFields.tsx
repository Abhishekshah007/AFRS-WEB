'use client'

import type { ChangeEvent } from 'react'
import type { DynamicFormField, DynamicFormSection } from '@/lib/forms/dynamicFormTypes'
import { parseOptions } from '@/lib/forms/dynamicFormTypes'

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100'

type DynamicFormFieldsProps = {
  sections: DynamicFormSection[]
  values: Record<string, string>
  files: Record<string, File | null>
  onChange: (name: string, value: string) => void
  onFileChange: (name: string, file: File | null) => void
  disabled?: boolean
}

function renderControlledField(
  field: DynamicFormField,
  value: string,
  file: File | null | undefined,
  onChange: (name: string, value: string) => void,
  onFileChange: (name: string, file: File | null) => void,
  disabled: boolean,
) {
  const shared = {
    disabled,
    placeholder: field.placeholder || undefined,
    required: field.required || undefined,
    className: inputClass,
    value,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      onChange(field.name, e.target.value),
  }

  switch (field.fieldType) {
    case 'textarea':
      return (
        <textarea
          {...shared}
          rows={field.rows ?? 4}
          className={`${inputClass} min-h-28 resize-y py-3`}
        />
      )
    case 'select':
      return (
        <select
          disabled={disabled}
          required={field.required || undefined}
          className={inputClass}
          value={value}
          onChange={(e) => onChange(field.name, e.target.value)}
        >
          <option value="" disabled hidden>
            Select {field.label}
          </option>
          {parseOptions(field.options).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )
    case 'file':
      return (
        <div className="space-y-2">
          <input
            type="file"
            disabled={disabled}
            required={field.required || undefined}
            accept={field.accept || 'image/*,.pdf'}
            className={inputClass}
            onChange={(e) => {
              const next = e.target.files?.[0] || null
              onFileChange(field.name, next)
              onChange(field.name, next?.name || '')
            }}
          />
          <p className="text-[11px] text-slate-400">
            {field.accept ? `Accepted: ${field.accept}` : 'Image or PDF, max 10MB'}
            {file?.name ? ` • Selected: ${file.name}` : ''}
          </p>
        </div>
      )
    case 'date':
    case 'time':
    case 'email':
    case 'tel':
    case 'number':
      return <input {...shared} type={field.fieldType} />
    default:
      return <input {...shared} type="text" />
  }
}

export function DynamicFormFields({
  sections,
  values,
  files,
  onChange,
  onFileChange,
  disabled = false,
}: DynamicFormFieldsProps) {
  if (!sections.length) return null

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <section
          key={section.title}
          className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div>
            <h3 className="font-extrabold text-slate-900">{section.title}</h3>
            {section.description ? (
              <p className="mt-1 text-sm text-slate-500">{section.description}</p>
            ) : null}
          </div>
          {section.fields?.length ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {section.fields.map((field) => (
                <label
                  key={field.name}
                  className={`text-xs font-bold uppercase tracking-[0.08em] text-slate-500 ${
                    field.fieldType === 'textarea' || field.fieldType === 'file'
                      ? 'sm:col-span-2'
                      : ''
                  }`}
                >
                  {field.label}
                  {field.required ? ' *' : ''}
                  <div className="mt-2 normal-case font-normal tracking-normal">
                    {renderControlledField(
                      field,
                      values[field.name] || '',
                      files[field.name],
                      onChange,
                      onFileChange,
                      disabled,
                    )}
                  </div>
                </label>
              ))}
            </div>
          ) : null}
        </section>
      ))}
    </div>
  )
}
