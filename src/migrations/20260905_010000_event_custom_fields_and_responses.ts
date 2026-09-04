import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "events"
      ADD COLUMN IF NOT EXISTS "registration_sections" jsonb;

    ALTER TABLE "event_registrations"
      ADD COLUMN IF NOT EXISTS "custom_responses" jsonb;

    ALTER TABLE "course_registrations"
      ADD COLUMN IF NOT EXISTS "custom_responses" jsonb;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "events"
      DROP COLUMN IF EXISTS "registration_sections";

    ALTER TABLE "event_registrations"
      DROP COLUMN IF EXISTS "custom_responses";

    ALTER TABLE "course_registrations"
      DROP COLUMN IF EXISTS "custom_responses";
  `)
}
