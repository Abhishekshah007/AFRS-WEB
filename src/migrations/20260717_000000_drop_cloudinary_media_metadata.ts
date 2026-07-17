import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    ALTER TABLE "media"
      DROP COLUMN IF EXISTS "cloudinary_public_id",
      DROP COLUMN IF EXISTS "cloudinary_resource_type",
      DROP COLUMN IF EXISTS "cloudinary_version",
      DROP COLUMN IF EXISTS "cloudinary_url",
      DROP COLUMN IF EXISTS "cloudinary_migrated_at";

    DROP TYPE IF EXISTS "public"."enum_media_cloudinary_resource_type";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_media_cloudinary_resource_type" AS ENUM('image', 'video', 'raw');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    ALTER TABLE "media"
      ADD COLUMN IF NOT EXISTS "cloudinary_public_id" varchar,
      ADD COLUMN IF NOT EXISTS "cloudinary_resource_type" "public"."enum_media_cloudinary_resource_type",
      ADD COLUMN IF NOT EXISTS "cloudinary_version" numeric,
      ADD COLUMN IF NOT EXISTS "cloudinary_url" varchar,
      ADD COLUMN IF NOT EXISTS "cloudinary_migrated_at" timestamp(3) with time zone;
  `)
}
