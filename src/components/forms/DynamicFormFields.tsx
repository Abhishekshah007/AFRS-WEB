'use client'

import type { ChangeEvent } from 'react'
import type { DynamicFormField, DynamicFormSection } from '@/lib/forms/dynamicFormTypes'
import { parseOptions } from '@/lib/forms/dynamicFormTypes'

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100'

type DynamicFormFieldsProps = {
  sections: DynamicFormSection[]
  values: Record<string, string>
  onChange: (name: string, value: string) => void
  disabled?: boolean
}

function renderControlledField(
  field: DynamicFormField,
  value: string,
  onChange: (name: string, value: string) => void,
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
      return <textarea {...shared} rows={field.rows ?? 4} className={`${inputClass} min-h-28 resize-y py-3`} />
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
        <input
          type="file"
          disabled={disabled}
          accept={field.accept || undefined}
          className={inputClass}
          onChange={(e) => onChange(field.name, e.target.files?.[0]?.name || '')}
        />
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

export function DynamicFormFields({ sections, values, onChange, disabled = false }: DynamicFormFieldsProps) {
  if (!sections.length) return null

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <section key={section.title} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
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
                    field.fieldType === 'textarea' ? 'sm:col-span-2' : ''
                  }`}
                >
                  {field.label}
                  {field.required ? ' *' : ''}
                  <div className="mt-2">
                    {renderControlledField(field, values[field.name] || '', onChange, disabled)}
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
