import type { ArrayField } from 'payload'

type AchieverDefault = {
  name: string
  title?: string
}

export function examAchieversField(
  name: string,
  label: string,
  defaultValue: AchieverDefault[],
): ArrayField {
  return {
    name,
    type: 'array',
    label,
    defaultValue,
    admin: {
      description: `Achiever cards shown on the ${label.replace(/ Achievers$/, '')} exam prep page.`,
    },
    fields: [
      { name: 'name', type: 'text', required: true },
      { name: 'title', type: 'text' },
      { name: 'photo', type: 'upload', relationTo: 'media' },
    ],
  }
}
