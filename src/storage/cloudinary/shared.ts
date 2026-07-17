import path from 'path'

export const CLOUDINARY_MEDIA_PREFIX = process.env.CLOUDINARY_MEDIA_PREFIX || 'afrs/payload/media'

export function isCloudinaryConfigured(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET,
  )
}

export function getCloudinaryCloudName(): string {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME

  if (!cloudName) {
    throw new Error('CLOUDINARY_CLOUD_NAME is required for Cloudinary media storage.')
  }

  return cloudName
}

export function buildCloudinaryPublicId(
  filename: string,
  prefix = CLOUDINARY_MEDIA_PREFIX,
): string {
  const parsed = path.posix.parse(filename.replace(/\\/g, '/'))
  const safeName = parsed.name.replace(/[^a-zA-Z0-9/_-]+/g, '-').replace(/-+/g, '-')

  return path.posix.join(prefix, safeName)
}

export function buildCloudinaryDeliveryUrl(
  filename: string,
  prefix = CLOUDINARY_MEDIA_PREFIX,
): string {
  const cloudName = getCloudinaryCloudName()
  const publicId = buildCloudinaryPublicId(filename, prefix)
  const extension = path.posix.extname(filename)

  return `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}${extension}`
}

export function isCloudinaryUrl(value: string | null | undefined): boolean {
  return Boolean(value?.startsWith('https://res.cloudinary.com/'))
}
