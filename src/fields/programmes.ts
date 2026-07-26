import type { Field } from 'payload'

/** Shared programme item schema used in education and training category arrays. */
export const programmeItemFields: Field[] = [
  { name: 'id', type: 'text', required: true },
  { name: 'title', type: 'text', required: true },
  { name: 'description', type: 'textarea', required: true },
  { name: 'duration', type: 'text', required: true },
  { name: 'mode', type: 'text', required: true },
  { name: 'level', type: 'text' },
]
