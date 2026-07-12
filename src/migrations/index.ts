import * as migration_20260712_154700_cloudinary_media_fields from './20260712_154700_cloudinary_media_fields';

export const migrations = [
  {
    up: migration_20260712_154700_cloudinary_media_fields.up,
    down: migration_20260712_154700_cloudinary_media_fields.down,
    name: '20260712_154700_cloudinary_media_fields'
  },
];
