import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import {Users} from './collections/Users'
import {Media} from './collections/Media'
import {Services} from './collections/Services'
import {Events} from './collections/Events'
import {Testimonials} from './collections/Testimonials'
import {Scientists} from './collections/Scientists'
import {GalleryItems} from './collections/GalleryItems'
import {ImpactStats} from './collections/ImpactStats'
import {ContactMessages} from './collections/ContactMessages'
import {SiteSettings} from './collections/globals/SiteSettings'
import {HeaderSettings} from './collections/globals/HeaderSettings'
import {FooterSettings} from './collections/globals/FooterSettings'
import {HomePage} from './collections/globals/HomePage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users, Services, 
    Events, Testimonials,
    Scientists, GalleryItems, ImpactStats,
    ContactMessages,
    Media
    
  ],
  globals: [SiteSettings, HeaderSettings, FooterSettings, HomePage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})
