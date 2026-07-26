import type { Field } from 'payload'

type PersonProfileOptions = {
  nameRequired?: boolean
  titleRequired?: boolean
  includeBio?: boolean
  photoFieldName?: string
}

/** Reusable person/profile field set for scientists, testimonials, achievers, etc. */
export const personProfileFields = ({
  nameRequired = true,
  titleRequired = false,
  includeBio = false,
  photoFieldName = 'photo',
}: PersonProfileOptions = {}): Field[] => [
  { name: 'name', type: 'text', required: nameRequired },
  { name: 'title', type: 'text', required: titleRequired },
  ...(includeBio ? [{ name: 'bio', type: 'textarea' } as Field] : []),
  { name: photoFieldName, type: 'upload', relationTo: 'media' },
]
