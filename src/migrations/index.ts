import * as migration_20260717_000000_drop_cloudinary_media_metadata from './20260717_000000_drop_cloudinary_media_metadata';
import * as migration_20260726_202731_add_about_certifications from './20260726_202731_add_about_certifications';
import * as migration_20260817_184500_service_help_cards from './20260817_184500_service_help_cards';
import * as migration_20260820_142708_add_member_type_to_scientists from './20260820_142708_add_member_type_to_scientists';

export const migrations = [
  {
    up: migration_20260717_000000_drop_cloudinary_media_metadata.up,
    down: migration_20260717_000000_drop_cloudinary_media_metadata.down,
    name: '20260717_000000_drop_cloudinary_media_metadata',
  },
  {
    up: migration_20260726_202731_add_about_certifications.up,
    down: migration_20260726_202731_add_about_certifications.down,
    name: '20260726_202731_add_about_certifications',
  },
  {
    up: migration_20260817_184500_service_help_cards.up,
    down: migration_20260817_184500_service_help_cards.down,
    name: '20260817_184500_service_help_cards',
  },
  {
    up: migration_20260820_142708_add_member_type_to_scientists.up,
    down: migration_20260820_142708_add_member_type_to_scientists.down,
    name: '20260820_142708_add_member_type_to_scientists'
  },
];
