import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "site_popups" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "image_id" integer NOT NULL,
      "link_url" varchar,
      "published" boolean DEFAULT false,
      "order" numeric DEFAULT 0,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    DO $$ BEGIN
      ALTER TABLE "site_popups"
        ADD CONSTRAINT "site_popups_image_id_media_id_fk"
        FOREIGN KEY ("image_id")
        REFERENCES "public"."media"("id")
        ON DELETE set null
        ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "site_popups_image_idx"
      ON "site_popups" USING btree ("image_id");
    CREATE INDEX IF NOT EXISTS "site_popups_updated_at_idx"
      ON "site_popups" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "site_popups_created_at_idx"
      ON "site_popups" USING btree ("created_at");

    ALTER TABLE "events"
      ADD COLUMN IF NOT EXISTS "show_in_home_popup" boolean DEFAULT false;

    ALTER TABLE "payload_locked_documents_rels"
      ADD COLUMN IF NOT EXISTS "site_popups_id" integer;

    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels"
        ADD CONSTRAINT "payload_locked_documents_rels_site_popups_fk"
        FOREIGN KEY ("site_popups_id")
        REFERENCES "public"."site_popups"("id")
        ON DELETE cascade
        ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_site_popups_id_idx"
      ON "payload_locked_documents_rels" USING btree ("site_popups_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "payload_locked_documents_rels_site_popups_id_idx";

    ALTER TABLE "payload_locked_documents_rels"
      DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_site_popups_fk";

    ALTER TABLE "payload_locked_documents_rels"
      DROP COLUMN IF EXISTS "site_popups_id";

    ALTER TABLE "events"
      DROP COLUMN IF EXISTS "show_in_home_popup";

    DROP INDEX IF EXISTS "site_popups_created_at_idx";
    DROP INDEX IF EXISTS "site_popups_updated_at_idx";
    DROP INDEX IF EXISTS "site_popups_image_idx";

    ALTER TABLE "site_popups"
      DROP CONSTRAINT IF EXISTS "site_popups_image_id_media_id_fk";

    DROP TABLE IF EXISTS "site_popups";
  `)
}
