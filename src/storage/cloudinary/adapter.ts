import type { Adapter } from '@payloadcms/plugin-cloud-storage/types'
import type { UploadApiResponse } from 'cloudinary'
import type { FileData, TypeWithID } from 'payload'
import { Readable } from 'stream'

import { getCloudinaryClient } from './client'
import type { CloudinaryMigrationMetadata } from './shared'
import { buildCloudinaryDeliveryUrl, buildCloudinaryPublicId } from './shared'

type UploadData = {
  filename?: string | null
}

function uploadBuffer(buffer: Buffer, publicId: string): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const uploadStream = getCloudinaryClient().uploader.upload_stream(
      {
        invalidate: true,
        overwrite: true,
        public_id: publicId,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          reject(error)
          return
        }

        if (!result) {
          reject(new Error(`Cloudinary upload did not return a result for ${publicId}.`))
          return
        }

        resolve(result)
      },
    )

    Readable.from(buffer).pipe(uploadStream)
  })
}

export const cloudinaryStorageAdapter: Adapter = ({ prefix }) => ({
  name: 'cloudinary',
  generateURL: ({ filename }) => buildCloudinaryDeliveryUrl(filename, prefix),
  handleDelete: async ({ filename }) => {
    const publicId = buildCloudinaryPublicId(filename, prefix)

    await getCloudinaryClient().uploader.destroy(publicId, {
      invalidate: true,
      resource_type: 'image',
    })
  },
  handleUpload: async ({ data, file }) => {
    const publicId = buildCloudinaryPublicId(file.filename, prefix)
    const result = await uploadBuffer(file.buffer, publicId)
    const uploadData = data as UploadData

    if (uploadData.filename !== file.filename) {
      return {}
    }

    const metadata: Partial<FileData & TypeWithID> & CloudinaryMigrationMetadata = {
      cloudinaryMigratedAt: new Date().toISOString(),
      cloudinaryPublicId: result.public_id,
      cloudinaryResourceType: 'image',
      cloudinaryUrl: result.secure_url,
      cloudinaryVersion: result.version,
    }

    return metadata
  },
  staticHandler: async (_req, { params }) => {
    return Response.redirect(buildCloudinaryDeliveryUrl(params.filename, params.prefix), 302)
  },
})
