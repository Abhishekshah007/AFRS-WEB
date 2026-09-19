import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "services"
      ADD COLUMN IF NOT EXISTS "overview_image_id" integer;

    DO $$ BEGIN
      ALTER TABLE "services"
        ADD CONSTRAINT "services_overview_image_id_media_id_fk"
        FOREIGN KEY ("overview_image_id")
        REFERENCES "public"."media"("id")
        ON DELETE set null
        ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "services_overview_image_idx"
      ON "services" USING btree ("overview_image_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "services_overview_image_idx";

    ALTER TABLE "services"
      DROP CONSTRAINT IF EXISTS "services_overview_image_id_media_id_fk";

    ALTER TABLE "services"
      DROP COLUMN IF EXISTS "overview_image_id";
  `)
}
