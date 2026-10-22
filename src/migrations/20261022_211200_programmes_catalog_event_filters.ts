import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TYPE "public"."enum_events_event_type" ADD VALUE IF NOT EXISTS 'fdp';

    UPDATE "events"
      SET "event_type" = 'conference'
      WHERE "event_type"::text = 'webinar';

    ALTER TABLE "programmes_catalog"
      ADD COLUMN IF NOT EXISTS "archive_filter_links_conferences" varchar;
    ALTER TABLE "programmes_catalog"
      ADD COLUMN IF NOT EXISTS "archive_filter_links_fdp" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "programmes_catalog"
      DROP COLUMN IF EXISTS "archive_filter_links_fdp";
    ALTER TABLE "programmes_catalog"
      DROP COLUMN IF EXISTS "archive_filter_links_conferences";
  `)
}
