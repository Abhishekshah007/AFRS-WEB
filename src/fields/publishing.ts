import type { CheckboxField, NumberField } from 'payload'

type PublishedOptions = { defaultValue?: boolean; description?: string }
type OrderOptions = { description?: string }
type FeaturedOptions = { description?: string; defaultValue?: boolean }

export const publishedField = ({
  defaultValue = false,
  description,
}: PublishedOptions = {}): CheckboxField => ({
  name: 'published',
  type: 'checkbox',
  defaultValue,
  ...(description ? { admin: { description } } : {}),
})

export const orderField = ({
  description = 'Lower numbers appear first.',
}: OrderOptions = {}): NumberField => ({
  name: 'order',
  type: 'number',
  defaultValue: 0,
  admin: { description },
})

export const featuredField = ({
  description,
  defaultValue = false,
}: FeaturedOptions = {}): CheckboxField => ({
  name: 'featured',
  type: 'checkbox',
  defaultValue,
  ...(description ? { admin: { description } } : {}),
})
