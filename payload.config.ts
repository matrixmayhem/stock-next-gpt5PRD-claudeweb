import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { fileURLToPath } from 'url'

// Collections
import { Users } from './src/collections/Users'
import { Articles } from './src/collections/Articles'
import { Sectors } from './src/collections/Sectors'
import { PortfolioEntries } from './src/collections/PortfolioEntries'
import { Comments } from './src/collections/Comments'
import { Testimonials } from './src/collections/Testimonials'
import { KYCRequests } from './src/collections/KYCRequests'
import { Media } from './src/collections/Media'
import { ZoomRecordings } from './src/collections/ZoomRecordings'

// Globals
import { SiteSettings } from './src/globals/SiteSettings'
import { LegalPages } from './src/globals/LegalPages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',

  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- TransparentLogbook',
      favicon: '/favicon.ico',
    },
  },

  collections: [
    Users,
    Articles,
    Sectors,
    PortfolioEntries,
    Comments,
    Testimonials,
    KYCRequests,
    Media,
    ZoomRecordings,
  ],

  globals: [
    SiteSettings,
    LegalPages,
  ],

  editor: lexicalEditor({}),

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  plugins: [
    s3Storage({
      collections: {
        media: true,
        'zoom-recordings': true,
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || 'ap-south-1',
      },
    }),
  ],

  secret: process.env.PAYLOAD_SECRET || '',

  cors: [
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  ].filter(Boolean),

  csrf: [
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  ].filter(Boolean),
})
