import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'enum_media_cloudinary_resource_type'
      ) THEN
        CREATE TYPE "public"."enum_media_cloudinary_resource_type" AS ENUM('image', 'video', 'raw');
      END IF;
    END
    $$;

    ALTER TABLE "media"
      ADD COLUMN IF NOT EXISTS "cloudinary_public_id" varchar,
      ADD COLUMN IF NOT EXISTS "cloudinary_resource_type" "public"."enum_media_cloudinary_resource_type",
      ADD COLUMN IF NOT EXISTS "cloudinary_version" numeric,
      ADD COLUMN IF NOT EXISTS "cloudinary_url" varchar,
      ADD COLUMN IF NOT EXISTS "cloudinary_migrated_at" timestamp(3) with time zone,
      ADD COLUMN IF NOT EXISTS "prefix" varchar DEFAULT '';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "media"
      DROP COLUMN IF EXISTS "cloudinary_public_id",
      DROP COLUMN IF EXISTS "cloudinary_resource_type",
      DROP COLUMN IF EXISTS "cloudinary_version",
      DROP COLUMN IF EXISTS "cloudinary_url",
      DROP COLUMN IF EXISTS "cloudinary_migrated_at",
      DROP COLUMN IF EXISTS "prefix";

    DROP TYPE IF EXISTS "public"."enum_media_cloudinary_resource_type";
  `)
}
