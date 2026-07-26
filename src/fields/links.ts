import type { ArrayField, Field } from 'payload'

export const linkItemFields: Field[] = [
  { name: 'label', type: 'text', required: true },
  { name: 'url', type: 'text', required: true },
]

type LinkArrayOptions = {
  name: string
  required?: boolean
  defaultValue?: Array<{ label: string; url: string }>
}

export const linkArrayField = ({
  name,
  required,
  defaultValue,
}: LinkArrayOptions): ArrayField => ({
  name,
  type: 'array',
  required,
  fields: linkItemFields,
  ...(defaultValue ? { defaultValue } : {}),
})
