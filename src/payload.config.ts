import { postgresAdapter } from '@payloadcms/db-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { collections } from './config/collections'
import { globals } from './config/globals'
import { Users } from './collections/Users'
import { cloudinaryStorageAdapter } from './storage/cloudinary/adapter'
import { resolveResendFrom } from './lib/email/resendFrom'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const { defaultFromAddress, defaultFromName } = resolveResendFrom()

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — AFRS Content Studio',
      description: 'Manage the Applied Forensic Research Sciences public website.',
      icons: [
        {
          rel: 'icon',
          type: 'image/png',
          url: '/assets/logo.png',
        },
      ],
    },
    components: {
      graphics: {
        Logo: '/components/admin/graphics/Logo',
        Icon: '/components/admin/graphics/Icon',
      },
      beforeLogin: ['/components/admin/AdminLoginIntro'],
      actions: ['/components/admin/AdminViewSite'],
      views: {
        dashboard: {
          Component: '/components/admin/dashboard/AdminDashboard',
        },
      },
    },
  },
  collections,
  globals,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  email: resendAdapter({
    defaultFromAddress,
    defaultFromName,
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    cloudStoragePlugin({
      collections: {
        media: {
          adapter: cloudinaryStorageAdapter,
          disableLocalStorage: true,
          disablePayloadAccessControl: true,
        },
      },
    }),
  ],
})
