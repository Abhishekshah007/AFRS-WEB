import type { CollectionConfig } from 'payload'

import { editorManagedPublishedAccess } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'
import { isSafeHref } from '../lib/cms'
import { orderField, publishedField } from '../fields/publishing'
import { guardSitePopupCapacity } from '../hooks/guardHomePopupCapacity'

export const SitePopups: CollectionConfig = {
  slug: 'sitePopups',
  labels: {
    singular: 'Homepage popup',
    plural: 'Homepage popups',
  },
  access: editorManagedPublishedAccess,
  admin: {
    group: ADMIN_GROUPS.CONTENT,
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'published'],
    description:
      'Poster popups for the homepage sequence. At most 5 popups can be live at once, including events marked “Show in homepage popup”.',
  },
  hooks: {
    beforeChange: [guardSitePopupCapacity],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Read aloud as the poster description. It is not shown as a heading on the poster.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Poster',
    },
    {
      name: 'linkUrl',
      type: 'text',
      label: 'Optional link',
      admin: {
        description:
          'If set, the poster links here. Leave empty for a view-only poster. Close still dismisses the popup.',
      },
      validate: (value: unknown) => {
        if (value == null || value === '') return true
        if (typeof value === 'string' && isSafeHref(value.trim())) return true
        return 'Use a full URL (https://…) or a site path starting with /.'
      },
    },
    orderField({
      description: 'Lower numbers appear first. Posters play before event popups.',
    }),
    publishedField({
      description: 'Published posters count toward the 5-popup limit and appear on the homepage.',
    }),
  ],
}
