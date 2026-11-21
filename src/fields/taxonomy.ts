import type {
  CollectionBeforeDeleteHook,
  CollectionBeforeValidateHook,
  CollectionSlug,
  Field,
} from 'payload'
import { APIError } from 'payload'

import { slugify } from '@/lib/utils/slugify'

const SLUG_PATTERN = /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/

/** Label, URL slug and order fields shared by editor-managed taxonomies. */
export function taxonomyFields({
  labelDescription,
  extraFields = [],
}: {
  labelDescription: string
  extraFields?: Field[]
}): Field[] {
  return [
    {
      name: 'label',
      type: 'text',
      required: true,
      admin: { description: labelDescription },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description:
          'Used in website filter links (e.g. ?topic=…). Generated from the label when left empty. Avoid changing it after the category is in use.',
      },
      validate: (value: unknown) =>
        (typeof value === 'string' && SLUG_PATTERN.test(value.trim())) ||
        'Use letters, numbers and hyphens only.',
    },
    ...extraFields,
    {
      name: 'order',
      type: 'number',
      defaultValue: 100,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first in website filters and admin dropdowns.',
      },
    },
  ]
}

/** Fill `slug` from `label` when an editor leaves it blank. */
export const slugFromLabel: CollectionBeforeValidateHook = ({ data, originalDoc }) => {
  if (!data) return data
  const current = String(data.slug ?? originalDoc?.slug ?? '').trim()
  if (current) {
    data.slug = current
    return data
  }
  const label = String(data.label ?? originalDoc?.label ?? '').trim()
  if (label) data.slug = slugify(label)
  return data
}

/**
 * Block deleting a taxonomy entry while documents still use it, so articles/events
 * never silently lose their category or type.
 */
export function preventDeleteWhenInUse(
  usedBy: { collection: CollectionSlug; field: string; label: string },
): CollectionBeforeDeleteHook {
  return async ({ id, req }) => {
    const { totalDocs } = await req.payload.count({
      collection: usedBy.collection,
      where: { [usedBy.field]: { equals: id } },
      overrideAccess: true,
      req,
    })
    if (totalDocs > 0) {
      throw new APIError(
        `This is still used by ${totalDocs} ${usedBy.label}. Move them to another option before deleting.`,
        400,
        undefined,
        true,
      )
    }
  }
}
