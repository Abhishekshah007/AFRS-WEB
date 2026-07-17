import * as migration_20260717_000000_drop_cloudinary_media_metadata from './20260717_000000_drop_cloudinary_media_metadata'

export const migrations = [
  {
    up: migration_20260717_000000_drop_cloudinary_media_metadata.up,
    down: migration_20260717_000000_drop_cloudinary_media_metadata.down,
    name: '20260717_000000_drop_cloudinary_media_metadata',
  },
]
