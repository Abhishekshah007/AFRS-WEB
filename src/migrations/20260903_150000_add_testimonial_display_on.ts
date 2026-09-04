import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_testimonials_display_on" AS ENUM('afrs', 'afsl', 'both');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    ALTER TABLE "testimonials"
      ADD COLUMN IF NOT EXISTS "display_on" "public"."enum_testimonials_display_on" DEFAULT 'both';

    UPDATE "testimonials" SET "display_on" = 'both' WHERE "display_on" IS NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "testimonials"
      DROP COLUMN IF EXISTS "display_on";

    DROP TYPE IF EXISTS "public"."enum_testimonials_display_on";
  `)
}
