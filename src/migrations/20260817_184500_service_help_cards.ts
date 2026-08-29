import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "services"
      ADD COLUMN IF NOT EXISTS "help_heading" varchar DEFAULT 'How We Can Help',
      ADD COLUMN IF NOT EXISTS "help_intro" varchar;

    ALTER TABLE "services_features"
      ADD COLUMN IF NOT EXISTS "feature_points" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "services"
      DROP COLUMN IF EXISTS "help_heading",
      DROP COLUMN IF EXISTS "help_intro";

    ALTER TABLE "services_features"
      DROP COLUMN IF EXISTS "feature_points";
  `)
}
