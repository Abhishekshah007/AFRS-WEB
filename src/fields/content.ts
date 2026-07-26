import type { Field, TextareaField, TextField } from 'payload'

type SlugOptions = { required?: boolean }
type ExcerptOptions = { required?: boolean; description?: string }

export const slugField = ({ required = true }: SlugOptions = {}): TextField => ({
  name: 'slug',
  type: 'text',
  required,
  unique: true,
  index: true,
})

export const excerptField = ({
  required = false,
  description = 'Short summary shown in cards and listings.',
}: ExcerptOptions = {}): TextareaField => ({
  name: 'excerpt',
  type: 'textarea',
  required,
  admin: { description },
})

export const contentRichTextField = (name = 'content'): Field => ({
  name,
  type: 'richText',
})
