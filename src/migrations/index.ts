import * as migration_20260717_000000_drop_cloudinary_media_metadata from './20260717_000000_drop_cloudinary_media_metadata';
import * as migration_20260726_202731_add_about_certifications from './20260726_202731_add_about_certifications';
import * as migration_20260817_184500_service_help_cards from './20260817_184500_service_help_cards';
import * as migration_20260820_142708_add_member_type_to_scientists from './20260820_142708_add_member_type_to_scientists';
import * as migration_20260903_150000_add_testimonial_display_on from './20260903_150000_add_testimonial_display_on';
import * as migration_20260904_120000_submission_exports from './20260904_120000_submission_exports';
import * as migration_20260905_010000_event_custom_fields_and_responses from './20260905_010000_event_custom_fields_and_responses';

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
  {
    up: migration_20260903_150000_add_testimonial_display_on.up,
    down: migration_20260903_150000_add_testimonial_display_on.down,
    name: '20260903_150000_add_testimonial_display_on',
  },
  {
    up: migration_20260904_120000_submission_exports.up,
    down: migration_20260904_120000_submission_exports.down,
    name: '20260904_120000_submission_exports',
  },
  {
    up: migration_20260905_010000_event_custom_fields_and_responses.up,
    down: migration_20260905_010000_event_custom_fields_and_responses.down,
    name: '20260905_010000_event_custom_fields_and_responses',
  },
];
