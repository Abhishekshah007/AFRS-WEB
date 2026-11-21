import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

import {
  defaultAfslSection,
  defaultAudienceSection,
  defaultImpactSection,
  defaultInternshipSection,
  defaultQuickLinksSection,
  defaultTrainingSection,
  defaultVideoSection,
} from '../data/defaults/home-sections'
import { defaultPrivacyPage, defaultTermsPage } from '../data/defaults/legal'
import { CMS_ICON_OPTIONS } from '../fields/cmsIconOptions'
import { DEFAULT_EVENTS_HUB_HERO, DEFAULT_EVENTS_PAGE_HERO } from '../data/defaults/events-pages'

/**
 * Moves the last hard-coded page content into the CMS:
 * - Home page: training cards, internship, intro video, impact cards, AFSL block, quick links
 * - About page: "Who it serves" table
 * - Course site settings: archive sidebar rows, /events and /courses/events hero copy
 * - Site identity: structured head-office address (for Google) and chatbot settings
 * - New "Legal pages" global for /privacy and /terms
 *
 * Schema first (idempotent DDL), then the CMS is pre-filled with the exact copy the site
 * shows today — only where the CMS is still empty — so editors start from real content.
 */

const cols = (table: string, columns: string[]) =>
  columns
    .map((column) => `ALTER TABLE "${table}" ADD COLUMN IF NOT EXISTS ${column};`)
    .join('\n')

/** Payload array table: (_order, _parent_id, id) + fields, cascade-deleted with its parent. */
function arrayTable(table: string, parent: string, fields: string[]): string {
  return `
    CREATE TABLE IF NOT EXISTS "${table}" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      ${fields.join(',\n      ')}
    );
    DO $$ BEGIN
      ALTER TABLE "${table}" ADD CONSTRAINT "${table}_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."${parent}"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    CREATE INDEX IF NOT EXISTS "${table}_order_idx" ON "${table}" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "${table}_parent_id_idx" ON "${table}" USING btree ("_parent_id");
  `
}

/** Upload/relationship column on a global or array table, with Payload's FK + index names. */
function relation(
  table: string,
  column: string,
  target: string,
  indexName: string,
): string {
  return `
    ALTER TABLE "${table}" ADD COLUMN IF NOT EXISTS "${column}" integer;
    DO $$ BEGIN
      ALTER TABLE "${table}" ADD CONSTRAINT "${table}_${column}_${target}_id_fk"
        FOREIGN KEY ("${column}") REFERENCES "public"."${target}"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    CREATE INDEX IF NOT EXISTS "${indexName}" ON "${table}" USING btree ("${column}");
  `
}

function createEnum(name: string, values: readonly string[]): string {
  return `
    DO $$ BEGIN
      CREATE TYPE "public"."${name}" AS ENUM(${values.map((v) => `'${v}'`).join(', ')});
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `
}

const ICON_VALUES = CMS_ICON_OPTIONS.map((option) => option.value)

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // ---------- Schema ----------
  await db.execute(
    sql.raw(`
    ${createEnum('enum_home_page_impact_items_icon', ICON_VALUES)}
    ${createEnum('enum_home_page_quick_links_items_icon', ICON_VALUES)}
    ${createEnum('enum_programmes_catalog_archive_rows_nature', ['any', 'national', 'international'])}

    ${cols('home_page', [
      '"training_eyebrow" varchar',
      '"training_title" varchar',
      '"training_subtitle" varchar',
      '"training_cta_label" varchar',
      '"training_cta_href" varchar',
      '"internship_eyebrow" varchar',
      '"internship_title" varchar',
      '"internship_description" varchar',
      '"internship_cta_label" varchar',
      '"internship_cta_href" varchar',
      '"video_title" varchar',
      '"video_body" varchar',
      '"video_cta_label" varchar',
      '"video_cta_href" varchar',
      '"video_video_url" varchar',
      '"video_poster_url" varchar',
      '"impact_title" varchar',
      '"impact_subtitle" varchar',
      '"afsl_title" varchar',
      '"afsl_tagline" varchar',
      '"afsl_description" varchar',
      '"afsl_offers_title" varchar',
      '"afsl_offers_description" varchar',
      '"afsl_offers_primary_label" varchar',
      '"afsl_offers_primary_href" varchar',
      '"afsl_offers_secondary_label" varchar',
      '"afsl_offers_secondary_href" varchar',
      '"afsl_contact_eyebrow" varchar',
      '"afsl_contact_description" varchar',
      '"afsl_contact_primary_label" varchar',
      '"afsl_contact_primary_href" varchar',
      '"afsl_contact_secondary_label" varchar',
      '"afsl_contact_secondary_href" varchar',
      '"quick_links_title" varchar',
      '"quick_links_subtitle" varchar',
    ])}
    ${relation('home_page', 'internship_image_id', 'media', 'home_page_internship_internship_image_idx')}
    ${relation('home_page', 'afsl_offers_image_id', 'media', 'home_page_afsl_afsl_offers_image_idx')}
    ${relation('home_page', 'afsl_contact_image_id', 'media', 'home_page_afsl_afsl_contact_image_idx')}

    ${arrayTable('home_page_training_items', 'home_page', ['"icon" varchar', '"title" varchar NOT NULL'])}
    ${arrayTable('home_page_internship_features', 'home_page', ['"text" varchar NOT NULL'])}
    ${arrayTable('home_page_impact_items', 'home_page', [
      `"icon" "enum_home_page_impact_items_icon" DEFAULT 'badge'`,
      '"title" varchar NOT NULL',
      '"description" varchar NOT NULL',
    ])}
    ${arrayTable('home_page_afsl_cards', 'home_page', ['"icon" varchar', '"title" varchar NOT NULL'])}
    ${arrayTable('home_page_quick_links_items', 'home_page', [
      `"icon" "enum_home_page_quick_links_items_icon" DEFAULT 'link'`,
      '"label" varchar NOT NULL',
      '"href" varchar NOT NULL',
    ])}

    ${cols('about_page', [
      '"section_text_audience_eyebrow" varchar',
      '"section_text_audience_title" varchar',
      '"section_text_audience_badge" varchar',
    ])}
    ${arrayTable('about_page_section_text_audience_rows', 'about_page', [
      '"audience" varchar NOT NULL',
      '"why" varchar NOT NULL',
    ])}

    ${cols('programmes_catalog', [
      '"events_page_eyebrow" varchar',
      '"events_page_title" varchar',
      '"events_page_subtitle" varchar',
      '"events_page_primary_label" varchar',
      '"events_page_primary_href" varchar',
      '"events_page_secondary_label" varchar',
      '"events_page_secondary_href" varchar',
      '"events_hub_eyebrow" varchar',
      '"events_hub_title" varchar',
      '"events_hub_description" varchar',
    ])}
    ${arrayTable('programmes_catalog_archive_rows', 'programmes_catalog', [
      '"label" varchar NOT NULL',
      `"nature" "enum_programmes_catalog_archive_rows_nature" DEFAULT 'any'`,
    ])}
    ${relation(
      'programmes_catalog_archive_rows',
      'event_type_id',
      'event_types',
      'programmes_catalog_archive_rows_event_type_idx',
    )}

    ${cols('site_settings', [
      '"postal_address_street_address" varchar',
      '"postal_address_locality" varchar',
      '"postal_address_region" varchar',
      '"postal_address_postal_code" varchar',
      '"chatbot_extra_knowledge" varchar',
    ])}
    ${arrayTable('site_settings_chatbot_suggestions', 'site_settings', ['"text" varchar NOT NULL'])}

    CREATE TABLE IF NOT EXISTS "legal_pages" (
      "id" serial PRIMARY KEY NOT NULL,
      "privacy_title" varchar,
      "privacy_last_updated" varchar,
      "privacy_intro" varchar,
      "terms_title" varchar,
      "terms_last_updated" varchar,
      "terms_intro" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );
    ${arrayTable('legal_pages_privacy_sections', 'legal_pages', [
      '"title" varchar NOT NULL',
      '"body" varchar NOT NULL',
    ])}
    ${arrayTable('legal_pages_terms_sections', 'legal_pages', [
      '"title" varchar NOT NULL',
      '"body" varchar NOT NULL',
    ])}
  `),
  )

  await db.execute(sql`
    ALTER TYPE "public"."enum_admin_access_role_menus_hidden_globals_slug" ADD VALUE IF NOT EXISTS 'legalPages';
  `)

  // ---------- Pre-fill the CMS with today's copy (only empty parts) ----------
  const home = await payload.findGlobal({ slug: 'homePage', depth: 0, req, overrideAccess: true })
  const homeData: Record<string, unknown> = {}
  if (!home.training?.title && !home.training?.items?.length) homeData.training = defaultTrainingSection
  if (!home.internship?.title && !home.internship?.features?.length) {
    const { imageUrl: _imageUrl, imageAlt: _imageAlt, features, ...rest } = defaultInternshipSection
    homeData.internship = { ...rest, features: features.map((text) => ({ text })) }
  }
  if (!home.video?.title) homeData.video = defaultVideoSection
  if (!home.impact?.title && !home.impact?.items?.length) homeData.impact = defaultImpactSection
  if (!home.afsl?.title && !home.afsl?.cards?.length) {
    const {
      offersImageUrl: _o,
      offersImageAlt: _oa,
      contactImageUrl: _c,
      contactImageAlt: _ca,
      ...rest
    } = defaultAfslSection
    homeData.afsl = rest
  }
  if (!home.quickLinks?.title && !home.quickLinks?.items?.length) {
    homeData.quickLinks = defaultQuickLinksSection
  }
  if (Object.keys(homeData).length) {
    await payload.updateGlobal({ slug: 'homePage', data: homeData, req, overrideAccess: true })
  }

  const about = await payload.findGlobal({ slug: 'aboutPage', depth: 0, req, overrideAccess: true })
  if (!about.sectionText?.audienceRows?.length) {
    await payload.updateGlobal({
      slug: 'aboutPage',
      data: {
        sectionText: {
          ...about.sectionText,
          audienceEyebrow: about.sectionText?.audienceEyebrow || defaultAudienceSection.eyebrow,
          audienceTitle: about.sectionText?.audienceTitle || defaultAudienceSection.title,
          audienceBadge: about.sectionText?.audienceBadge || defaultAudienceSection.badge,
          audienceRows: defaultAudienceSection.rows,
        },
      },
      req,
      overrideAccess: true,
    })
  }

  const catalog = await payload.findGlobal({
    slug: 'programmesCatalog',
    depth: 0,
    req,
    overrideAccess: true,
  })
  const catalogData: Record<string, unknown> = {}
  if (!catalog.eventsPage?.title) catalogData.eventsPage = DEFAULT_EVENTS_PAGE_HERO
  if (!catalog.eventsHub?.title) catalogData.eventsHub = DEFAULT_EVENTS_HUB_HERO
  if (Object.keys(catalogData).length) {
    await payload.updateGlobal({
      slug: 'programmesCatalog',
      data: catalogData,
      req,
      overrideAccess: true,
    })
  }

  const site = await payload.findGlobal({ slug: 'siteSettings', depth: 0, req, overrideAccess: true })
  if (!site.postalAddress?.streetAddress) {
    await payload.updateGlobal({
      slug: 'siteSettings',
      data: {
        postalAddress: {
          streetAddress: '2nd Floor, 8/1, Moti Tabela, Near Collectorate Office',
          locality: 'Indore',
          region: 'Madhya Pradesh',
          postalCode: '452007',
        },
      },
      req,
      overrideAccess: true,
    })
  }

  const legal = await payload.findGlobal({ slug: 'legalPages', depth: 0, req, overrideAccess: true })
  if (!legal.privacy?.sections?.length && !legal.terms?.sections?.length) {
    await payload.updateGlobal({
      slug: 'legalPages',
      data: { privacy: defaultPrivacyPage, terms: defaultTermsPage },
      req,
      overrideAccess: true,
    })
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  const dropCols = (table: string, columns: string[]) =>
    columns.map((c) => `ALTER TABLE "${table}" DROP COLUMN IF EXISTS "${c}";`).join('\n')

  await db.execute(
    sql.raw(`
    DROP TABLE IF EXISTS "home_page_training_items" CASCADE;
    DROP TABLE IF EXISTS "home_page_internship_features" CASCADE;
    DROP TABLE IF EXISTS "home_page_impact_items" CASCADE;
    DROP TABLE IF EXISTS "home_page_afsl_cards" CASCADE;
    DROP TABLE IF EXISTS "home_page_quick_links_items" CASCADE;
    DROP TABLE IF EXISTS "about_page_section_text_audience_rows" CASCADE;
    DROP TABLE IF EXISTS "programmes_catalog_archive_rows" CASCADE;
    DROP TABLE IF EXISTS "site_settings_chatbot_suggestions" CASCADE;
    DROP TABLE IF EXISTS "legal_pages_privacy_sections" CASCADE;
    DROP TABLE IF EXISTS "legal_pages_terms_sections" CASCADE;
    DROP TABLE IF EXISTS "legal_pages" CASCADE;

    ${dropCols('home_page', [
      'training_eyebrow', 'training_title', 'training_subtitle', 'training_cta_label',
      'training_cta_href', 'internship_eyebrow', 'internship_title', 'internship_description',
      'internship_cta_label', 'internship_cta_href', 'internship_image_id', 'video_title',
      'video_body', 'video_cta_label', 'video_cta_href', 'video_video_url', 'video_poster_url',
      'impact_title', 'impact_subtitle', 'afsl_title', 'afsl_tagline', 'afsl_description',
      'afsl_offers_title', 'afsl_offers_description', 'afsl_offers_primary_label',
      'afsl_offers_primary_href', 'afsl_offers_secondary_label', 'afsl_offers_secondary_href',
      'afsl_offers_image_id', 'afsl_contact_eyebrow', 'afsl_contact_description',
      'afsl_contact_primary_label', 'afsl_contact_primary_href', 'afsl_contact_secondary_label',
      'afsl_contact_secondary_href', 'afsl_contact_image_id', 'quick_links_title',
      'quick_links_subtitle',
    ])}
    ${dropCols('about_page', [
      'section_text_audience_eyebrow', 'section_text_audience_title', 'section_text_audience_badge',
    ])}
    ${dropCols('programmes_catalog', [
      'events_page_eyebrow', 'events_page_title', 'events_page_subtitle',
      'events_page_primary_label', 'events_page_primary_href', 'events_page_secondary_label',
      'events_page_secondary_href', 'events_hub_eyebrow', 'events_hub_title',
      'events_hub_description',
    ])}
    ${dropCols('site_settings', [
      'postal_address_street_address', 'postal_address_locality', 'postal_address_region',
      'postal_address_postal_code', 'chatbot_extra_knowledge',
    ])}

    DROP TYPE IF EXISTS "public"."enum_home_page_impact_items_icon";
    DROP TYPE IF EXISTS "public"."enum_home_page_quick_links_items_icon";
    DROP TYPE IF EXISTS "public"."enum_programmes_catalog_archive_rows_nature";
  `),
  )
  // Postgres cannot drop the 'legalPages' Staff-menu enum value; it is harmless.
}
