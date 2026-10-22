import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "founders" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "designation" varchar NOT NULL,
      "photo_id" integer,
      "message" varchar,
      "bio" varchar,
      "linkedin" varchar,
      "instagram" varchar,
      "facebook" varchar,
      "published" boolean DEFAULT true,
      "order" numeric DEFAULT 0,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    DO $$ BEGIN
      ALTER TABLE "founders"
        ADD CONSTRAINT "founders_photo_id_media_id_fk"
        FOREIGN KEY ("photo_id")
        REFERENCES "public"."media"("id")
        ON DELETE set null
        ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "founders_photo_idx" ON "founders" USING btree ("photo_id");
    CREATE INDEX IF NOT EXISTS "founders_updated_at_idx" ON "founders" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "founders_created_at_idx" ON "founders" USING btree ("created_at");

    ALTER TABLE "payload_locked_documents_rels"
      ADD COLUMN IF NOT EXISTS "founders_id" integer;

    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels"
        ADD CONSTRAINT "payload_locked_documents_rels_founders_fk"
        FOREIGN KEY ("founders_id")
        REFERENCES "public"."founders"("id")
        ON DELETE cascade
        ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_founders_id_idx"
      ON "payload_locked_documents_rels" USING btree ("founders_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "payload_locked_documents_rels_founders_id_idx";
    ALTER TABLE "payload_locked_documents_rels"
      DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_founders_fk";
    ALTER TABLE "payload_locked_documents_rels"
      DROP COLUMN IF EXISTS "founders_id";

    DROP INDEX IF EXISTS "founders_created_at_idx";
    DROP INDEX IF EXISTS "founders_updated_at_idx";
    DROP INDEX IF EXISTS "founders_photo_idx";
    ALTER TABLE "founders" DROP CONSTRAINT IF EXISTS "founders_photo_id_media_id_fk";
    DROP TABLE IF EXISTS "founders";
  `)
}
