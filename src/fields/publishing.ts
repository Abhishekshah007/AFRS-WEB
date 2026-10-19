import type { CheckboxField, NumberField } from 'payload'

type PublishedOptions = { defaultValue?: boolean; description?: string }
type OrderOptions = { description?: string }
type FeaturedOptions = { description?: string; defaultValue?: boolean }

const DEFAULT_PUBLISHED_DESCRIPTION =
  'When unchecked, this entry is saved but hidden on the public website. Logged-in editors can still see it in the admin panel.'

export const publishedField = ({
  defaultValue = false,
  description,
}: PublishedOptions = {}): CheckboxField => ({
  name: 'published',
  type: 'checkbox',
  defaultValue,
  label: 'Published on website',
  admin: {
    position: 'sidebar',
    description: description ?? DEFAULT_PUBLISHED_DESCRIPTION,
  },
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
