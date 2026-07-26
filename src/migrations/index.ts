import * as migration_20260717_000000_drop_cloudinary_media_metadata from './20260717_000000_drop_cloudinary_media_metadata';
import * as migration_20260726_202731_add_about_certifications from './20260726_202731_add_about_certifications';

export const migrations = [
  {
    up: migration_20260717_000000_drop_cloudinary_media_metadata.up,
    down: migration_20260717_000000_drop_cloudinary_media_metadata.down,
    name: '20260717_000000_drop_cloudinary_media_metadata',
  },
  {
    up: migration_20260726_202731_add_about_certifications.up,
    down: migration_20260726_202731_add_about_certifications.down,
    name: '20260726_202731_add_about_certifications'
  },
];
