import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrEventManager, isPublic } from '../access'
import { ADMIN_GROUPS } from '../config/adminGroups'
import { preventDeleteWhenInUse, slugFromLabel, taxonomyFields } from '../fields/taxonomy'

/** Editor-managed event types; drives the Event "Event type" dropdown and site filters. */
export const EventTypes: CollectionConfig = {
  slug: 'eventTypes',
  labels: {
    singular: 'Event type',
    plural: 'Event types',
  },
  defaultSort: 'order',
  access: {
    create: isAdminOrEventManager,
    read: isPublic,
    update: isAdminOrEventManager,
    delete: isAdmin,
  },
  admin: {
    group: ADMIN_GROUPS.EVENTS,
    useAsTitle: 'label',
    defaultColumns: ['label', 'shortLabel', 'slug', 'order'],
    listSearchableFields: ['label', 'slug'],
    description:
      'Kinds of events (workshop, conference, …). New types appear in the Event type dropdown and in the event filters on the website.',
  },
  hooks: {
    beforeValidate: [slugFromLabel],
    beforeDelete: [
      preventDeleteWhenInUse({ collection: 'events', field: 'eventType', label: 'event(s)' }),
    ],
  },
  fields: taxonomyFields({
    labelDescription: 'Full name, e.g. "Faculty Development Program".',
    extraFields: [
      {
        name: 'shortLabel',
        type: 'text',
        label: 'Badge label (optional)',
        admin: {
          position: 'sidebar',
          description: 'Shorter text for event card badges, e.g. "FDP". Defaults to the label.',
        },
      },
    ],
  }),
}
