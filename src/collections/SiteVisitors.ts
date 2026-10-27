import type { Access, CollectionConfig } from 'payload'

const denyPublicAccess: Access = () => false

export const SiteVisitors: CollectionConfig = {
  slug: 'siteVisitors',
  labels: {
    singular: 'Tracked visitor',
    plural: 'Tracked visitors',
  },
  admin: {
    hidden: true,
    group: 'Accounts & files',
    useAsTitle: 'visitorHash',
  },
  access: {
    create: denyPublicAccess,
    read: denyPublicAccess,
    update: denyPublicAccess,
    delete: denyPublicAccess,
  },
  fields: [
    {
      name: 'visitorHash',
      type: 'text',
      required: true,
      unique: true,
      admin: { hidden: true },
    },
  ],
}
