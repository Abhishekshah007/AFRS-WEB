import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

import { CMS_ARTICLE_CATEGORY_OPTIONS, GENERAL_ARTICLE_CATEGORY } from '../data/article-categories'
import { DEFAULT_EVENT_TYPES } from '../data/event-types'

/**
 * Moves article categories and event types from hard-coded select options into
 * editor-managed collections (`articleCategories`, `eventTypes`):
 *
 * 1. Create both tables and seed them with every built-in option (same slugs).
 * 2. Add `articles.category_id` / `events.event_type_id`, fill them by matching the
 *    old enum value to the seeded slug, then drop the old enum columns and types.
 * 3. Register both collections for document locking and the Staff menu access list.
 *
 * Existing filter links (?topic=dna, ?type=workshop) keep working because slugs are
 * unchanged. Every statement is idempotent so a partially applied run can be retried.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "article_categories" (
      "id" serial PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "show_in_filters" boolean DEFAULT true,
      "order" numeric DEFAULT 100,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS "article_categories_slug_idx" ON "article_categories" USING btree ("slug");
    CREATE INDEX IF NOT EXISTS "article_categories_updated_at_idx" ON "article_categories" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "article_categories_created_at_idx" ON "article_categories" USING btree ("created_at");

    CREATE TABLE IF NOT EXISTS "event_types" (
      "id" serial PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "short_label" varchar,
      "order" numeric DEFAULT 100,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS "event_types_slug_idx" ON "event_types" USING btree ("slug");
    CREATE INDEX IF NOT EXISTS "event_types_updated_at_idx" ON "event_types" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "event_types_created_at_idx" ON "event_types" USING btree ("created_at");
  `)

  // Seed built-in options (order = list position × 10 so editors can slot new ones between).
  for (const [index, option] of CMS_ARTICLE_CATEGORY_OPTIONS.entries()) {
    const showInFilters = option.value !== GENERAL_ARTICLE_CATEGORY.value
    await db.execute(sql`
      INSERT INTO "article_categories" ("label", "slug", "show_in_filters", "order")
      VALUES (${option.label}, ${option.value}, ${showInFilters}, ${(index + 1) * 10})
      ON CONFLICT ("slug") DO NOTHING;
    `)
  }
  for (const [index, type] of DEFAULT_EVENT_TYPES.entries()) {
    const shortLabel = 'shortLabel' in type ? type.shortLabel : null
    await db.execute(sql`
      INSERT INTO "event_types" ("label", "slug", "short_label", "order")
      VALUES (${type.label}, ${type.slug}, ${shortLabel}, ${(index + 1) * 10})
      ON CONFLICT ("slug") DO NOTHING;
    `)
  }

  // Articles: enum column "category" -> relationship "category_id".
  await db.execute(sql`
    ALTER TABLE "articles" ADD COLUMN IF NOT EXISTS "category_id" integer;

    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'articles' AND column_name = 'category'
      ) THEN
        -- Any value not in the seed list (should not happen) is kept as its own category.
        INSERT INTO "article_categories" ("label", "slug", "order")
        SELECT DISTINCT initcap(replace(a."category"::text, '-', ' ')), a."category"::text, 1000
        FROM "articles" a
        WHERE a."category" IS NOT NULL
        ON CONFLICT ("slug") DO NOTHING;

        UPDATE "articles" a SET "category_id" = c."id"
        FROM "article_categories" c
        WHERE a."category_id" IS NULL AND c."slug" = a."category"::text;
      END IF;
    END $$;

    UPDATE "articles" SET "category_id" = (
      SELECT "id" FROM "article_categories" WHERE "slug" = 'general'
    ) WHERE "category_id" IS NULL;

    ALTER TABLE "articles" ALTER COLUMN "category_id" SET NOT NULL;
    ALTER TABLE "articles" DROP COLUMN IF EXISTS "category";
    DROP TYPE IF EXISTS "public"."enum_articles_category";

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'articles_category_id_article_categories_id_fk'
      ) THEN
        ALTER TABLE "articles" ADD CONSTRAINT "articles_category_id_article_categories_id_fk"
          FOREIGN KEY ("category_id") REFERENCES "public"."article_categories"("id")
          ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;
    CREATE INDEX IF NOT EXISTS "articles_category_idx" ON "articles" USING btree ("category_id");
  `)

  // Events: enum column "event_type" -> relationship "event_type_id" (optional field).
  await db.execute(sql`
    ALTER TABLE "events" ADD COLUMN IF NOT EXISTS "event_type_id" integer;

    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'events' AND column_name = 'event_type'
      ) THEN
        INSERT INTO "event_types" ("label", "slug", "order")
        SELECT DISTINCT initcap(replace(e."event_type"::text, '-', ' ')), e."event_type"::text, 1000
        FROM "events" e
        WHERE e."event_type" IS NOT NULL
        ON CONFLICT ("slug") DO NOTHING;

        UPDATE "events" e SET "event_type_id" = t."id"
        FROM "event_types" t
        WHERE e."event_type_id" IS NULL AND t."slug" = e."event_type"::text;
      END IF;
    END $$;

    ALTER TABLE "events" DROP COLUMN IF EXISTS "event_type";
    DROP TYPE IF EXISTS "public"."enum_events_event_type";

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'events_event_type_id_event_types_id_fk'
      ) THEN
        ALTER TABLE "events" ADD CONSTRAINT "events_event_type_id_event_types_id_fk"
          FOREIGN KEY ("event_type_id") REFERENCES "public"."event_types"("id")
          ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;
    CREATE INDEX IF NOT EXISTS "events_event_type_idx" ON "events" USING btree ("event_type_id");
  `)

  // Document locking relations for the two new collections.
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "article_categories_id" integer;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "event_types_id" integer;

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'payload_locked_documents_rels_article_categories_fk'
      ) THEN
        ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_article_categories_fk"
          FOREIGN KEY ("article_categories_id") REFERENCES "public"."article_categories"("id")
          ON DELETE cascade ON UPDATE no action;
      END IF;
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'payload_locked_documents_rels_event_types_fk'
      ) THEN
        ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_event_types_fk"
          FOREIGN KEY ("event_types_id") REFERENCES "public"."event_types"("id")
          ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_article_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("article_categories_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_event_types_id_idx" ON "payload_locked_documents_rels" USING btree ("event_types_id");
  `)

  // Staff menu access: allow hiding the new collections per role.
  await db.execute(sql`
    ALTER TYPE "public"."enum_admin_access_role_menus_hidden_collections_slug" ADD VALUE IF NOT EXISTS 'articleCategories';
    ALTER TYPE "public"."enum_admin_access_role_menus_hidden_collections_slug" ADD VALUE IF NOT EXISTS 'eventTypes';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Recreate the enum columns from the seeded slugs. Categories/types added in the CMS
  // after this migration are not representable as enum values and fall back to
  // 'general' (articles) or NULL (events).
  // Values come from our own constants (letters/digits/hyphens only), so inlining them is
  // safe — and required, because this multi-statement block cannot use bind parameters.
  const articleValues = CMS_ARTICLE_CATEGORY_OPTIONS.map((option) => `'${option.value}'`).join(', ')
  const eventValues = DEFAULT_EVENT_TYPES.map((type) => `'${type.slug}'`).join(', ')

  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_articles_category" AS ENUM (${sql.raw(articleValues)});
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_events_event_type" AS ENUM (${sql.raw(eventValues)});
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    ALTER TABLE "articles" ADD COLUMN IF NOT EXISTS "category" "public"."enum_articles_category" DEFAULT 'general';
    UPDATE "articles" a SET "category" = c."slug"::"public"."enum_articles_category"
    FROM "article_categories" c
    WHERE c."id" = a."category_id" AND c."slug" IN (${sql.raw(articleValues)});
    UPDATE "articles" SET "category" = 'general' WHERE "category" IS NULL;
    ALTER TABLE "articles" ALTER COLUMN "category" SET NOT NULL;

    ALTER TABLE "events" ADD COLUMN IF NOT EXISTS "event_type" "public"."enum_events_event_type";
    UPDATE "events" e SET "event_type" = t."slug"::"public"."enum_events_event_type"
    FROM "event_types" t
    WHERE t."id" = e."event_type_id" AND t."slug" IN (${sql.raw(eventValues)});

    ALTER TABLE "articles" DROP CONSTRAINT IF EXISTS "articles_category_id_article_categories_id_fk";
    DROP INDEX IF EXISTS "articles_category_idx";
    ALTER TABLE "articles" DROP COLUMN IF EXISTS "category_id";

    ALTER TABLE "events" DROP CONSTRAINT IF EXISTS "events_event_type_id_event_types_id_fk";
    DROP INDEX IF EXISTS "events_event_type_idx";
    ALTER TABLE "events" DROP COLUMN IF EXISTS "event_type_id";

    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_article_categories_fk";
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_event_types_fk";
    DROP INDEX IF EXISTS "payload_locked_documents_rels_article_categories_id_idx";
    DROP INDEX IF EXISTS "payload_locked_documents_rels_event_types_id_idx";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "article_categories_id";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "event_types_id";

    DROP TABLE IF EXISTS "article_categories" CASCADE;
    DROP TABLE IF EXISTS "event_types" CASCADE;
  `)
  // Postgres cannot remove enum values; the extra Staff-menu values are harmless.
}
