import 'dotenv/config'

import type { UploadApiResponse } from 'cloudinary'
import fs from 'fs/promises'
import path from 'path'
import { getPayload } from 'payload'

import config from '../src/payload.config'
import type { Media } from '../src/payload-types'
import { getCloudinaryClient } from '../src/storage/cloudinary/client'
import {
  buildCloudinaryDeliveryUrl,
  buildCloudinaryPublicId,
  type CloudinaryMigrationMetadata,
  isCloudinaryConfigured,
  isCloudinaryUrl,
} from '../src/storage/cloudinary/shared'

type MediaSize = {
  filename?: string | null
}

type MigratableMedia = Media &
  CloudinaryMigrationMetadata & {
    sizes?: Record<string, MediaSize | undefined> | null
  }

type UploadResult = {
  publicId: string
  secureUrl: string
  version?: number
}

const mediaDir = path.resolve(process.cwd(), 'media')
const dryRun = process.argv.includes('--dry-run')
const force = process.argv.includes('--force')

// function getErrorMessage(error: unknown): string {
//   if (error instanceof Error) {
//     return error.message
//   }

//   return String(error)
// }

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function uploadIfNeeded(filename: string): Promise<UploadResult | null> {
  const localPath = path.join(mediaDir, filename)

  if (!(await fileExists(localPath))) {
    console.warn(`Missing local file, skipping: ${localPath}`)
    return null
  }

  const publicId = buildCloudinaryPublicId(filename)

  try {
    const uploaded: UploadApiResponse = await getCloudinaryClient().uploader.upload(localPath, {
      public_id: publicId,
      overwrite: true,
      invalidate: true,
      unique_filename: false,
      resource_type: 'image',
    })

    console.log(`✅ Uploaded ${filename} → ${uploaded.public_id}`)

    return {
      publicId: uploaded.public_id,
      secureUrl: uploaded.secure_url,
      version: uploaded.version,
    }
  } catch (error) {
    console.error(`❌ Failed to upload ${filename}`)

    console.dir(error, {
      depth: null,
      colors: true,
    })

    throw error
  }
}



function getSizeFilenames(media: MigratableMedia): string[] {
  if (!media.sizes) {
    return []
  }

  return Object.values(media.sizes)
    .map((size) => size?.filename)
    .filter((filename): filename is string => Boolean(filename))
}

async function run(): Promise<void> {
  console.log("1. Starting")
  if (!isCloudinaryConfigured()) {
    throw new Error(
      'Cloudinary credentials are required. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.',
    )
  }
  console.log("2. Config OK")

  const payload = await getPayload({ config })
  console.log("Payload loaded successfully")
  let page = 1
  let totalDocs = 0
  let migratedDocs = 0
  let skippedDocs = 0
  let missingFiles = 0

  do {
    console.log("3. Payload Loaded")
    const result = await payload.find({
      collection: 'media',
      depth: 0,
      limit: 50,
      page,
    })

    for (const media of result.docs as MigratableMedia[]) {
      totalDocs += 1

      if (!media.filename) {
        skippedDocs += 1
        console.warn(`Media ${media.id} has no filename, skipping.`)
        continue
      }

      const alreadyMigrated =
        !force &&
        media.cloudinaryPublicId &&
        media.cloudinaryUrl &&
        media.cloudinaryMigratedAt

      if (alreadyMigrated) {
        skippedDocs++
        console.log(`⏭️ Skipping ${media.filename}`)
        continue
      }

      const originalUpload = alreadyMigrated
        ? {
          publicId: media.cloudinaryPublicId || buildCloudinaryPublicId(media.filename),
          secureUrl: media.cloudinaryUrl || buildCloudinaryDeliveryUrl(media.filename),
          version: media.cloudinaryVersion || undefined,
        }
        : await uploadIfNeeded(media.filename)

      if (!originalUpload) {
        missingFiles += 1
        continue
      }

      const relatedFilenames = getSizeFilenames(media)

      for (const filename of relatedFilenames) {
        const uploadedSize = await uploadIfNeeded(filename)

        if (!uploadedSize) {
          missingFiles += 1
        }
      }

      if (alreadyMigrated) {
        skippedDocs += 1
        console.log(`Already migrated media ${media.id}: ${media.filename}`)
        continue
      }

      if (!dryRun) {
        await payload.update({
          id: media.id,
          collection: 'media',
          data: {
            cloudinaryMigratedAt: new Date().toISOString(),
            cloudinaryPublicId: originalUpload.publicId,
            cloudinaryResourceType: 'image',
            cloudinaryUrl: originalUpload.secureUrl,
            cloudinaryVersion: originalUpload.version,
          },
          depth: 0,
        })
      }

      migratedDocs += 1
      console.log(`${dryRun ? '[dry-run] ' : ''}Migrated media ${media.id}: ${media.filename}`)
    }

    if (!result.hasNextPage) {
      break
    }

    page += 1
  } while (true)

  console.log(
    `Cloudinary migration complete. scanned=${totalDocs} migrated=${migratedDocs} skipped=${skippedDocs} missingFiles=${missingFiles}`,
  )
}

run().catch((error) => {
  console.error("========== FULL ERROR ==========")

  console.dir(error, {
    depth: null,
    colors: true,
  })

  if (error instanceof Error) {
    console.error(error.stack)
  }

  process.exit(1)
})