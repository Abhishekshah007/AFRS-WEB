import type { Field } from 'payload'

/** Reusable array item fields for HomePage global content sections. */
export const textItemField: Field = { name: 'text', type: 'text', required: true }

export const listItemFields: Field[] = [
  textItemField,
  { name: 'description', type: 'textarea' },
]

export const certificationFields: Field[] = [
  { name: 'icon', type: 'text', defaultValue: '✓' },
  { name: 'title', type: 'text', required: true },
  { name: 'description', type: 'textarea', required: true },
]

export const membershipPlanFields: Field[] = [
  { name: 'title', type: 'text', required: true },
  { name: 'description', type: 'textarea', required: true },
  { name: 'href', type: 'text', defaultValue: '/contact' },
  { name: 'badge', type: 'text', defaultValue: 'Popular' },
  { name: 'dark', type: 'checkbox', defaultValue: false },
]
