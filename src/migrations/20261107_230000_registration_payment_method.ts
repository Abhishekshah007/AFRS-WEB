import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "event_registrations"
      ADD COLUMN IF NOT EXISTS "payment_method" varchar;
    ALTER TABLE "course_registrations"
      ADD COLUMN IF NOT EXISTS "payment_method" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "event_registrations"
      DROP COLUMN IF EXISTS "payment_method";
    ALTER TABLE "course_registrations"
      DROP COLUMN IF EXISTS "payment_method";
  `)
}
