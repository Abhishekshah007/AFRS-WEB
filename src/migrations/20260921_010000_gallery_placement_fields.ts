import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_gallery_items_brand" AS ENUM('afrs', 'afsl', 'both');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_gallery_items_exam_program" AS ENUM('ugc-net', 'fact', 'cuet');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    ALTER TABLE "gallery_items"
      ADD COLUMN IF NOT EXISTS "brand" "public"."enum_gallery_items_brand" DEFAULT 'afrs';

    ALTER TABLE "gallery_items"
      ADD COLUMN IF NOT EXISTS "exam_program" "public"."enum_gallery_items_exam_program";

    ALTER TABLE "gallery_items"
      ADD COLUMN IF NOT EXISTS "service_id" integer;

    DO $$ BEGIN
      ALTER TABLE "gallery_items"
        ADD CONSTRAINT "gallery_items_service_id_services_id_fk"
        FOREIGN KEY ("service_id") REFERENCES "public"."services"("id")
        ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      IF EXISTS (
        SELECT 1
        FROM pg_enum
        JOIN pg_type ON pg_type.oid = pg_enum.enumtypid
        JOIN pg_namespace ON pg_namespace.oid = pg_type.typnamespace
        WHERE pg_namespace.nspname = 'public'
          AND pg_type.typname = 'enum_gallery_items_category'
          AND pg_enum.enumlabel = 'tech'
      ) THEN
        UPDATE "gallery_items"
          SET "category" = 'training'
          WHERE "category"::text = 'tech';
      END IF;
    END $$;
    UPDATE "gallery_items" SET "brand" = 'afrs' WHERE "brand" IS NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "gallery_items"
      DROP CONSTRAINT IF EXISTS "gallery_items_service_id_services_id_fk";

    ALTER TABLE "gallery_items"
      DROP COLUMN IF EXISTS "service_id";

    ALTER TABLE "gallery_items"
      DROP COLUMN IF EXISTS "exam_program";

    ALTER TABLE "gallery_items"
      DROP COLUMN IF EXISTS "brand";

    DROP TYPE IF EXISTS "public"."enum_gallery_items_exam_program";
    DROP TYPE IF EXISTS "public"."enum_gallery_items_brand";
  `)
}
