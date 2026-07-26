import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "about_certifications" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "issuer" varchar,
      "logo_id" integer NOT NULL,
      "description" varchar,
      "certificate_url" varchar,
      "published" boolean DEFAULT true,
      "order" numeric DEFAULT 0,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    DO $$ BEGIN
      ALTER TABLE "about_certifications"
        ADD CONSTRAINT "about_certifications_logo_id_media_id_fk"
        FOREIGN KEY ("logo_id")
        REFERENCES "public"."media"("id")
        ON DELETE set null
        ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "about_certifications_logo_idx"
      ON "about_certifications" USING btree ("logo_id");
    CREATE INDEX IF NOT EXISTS "about_certifications_updated_at_idx"
      ON "about_certifications" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "about_certifications_created_at_idx"
      ON "about_certifications" USING btree ("created_at");

    ALTER TABLE "payload_locked_documents_rels"
      ADD COLUMN IF NOT EXISTS "about_certifications_id" integer;

    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels"
        ADD CONSTRAINT "payload_locked_documents_rels_about_certifications_fk"
        FOREIGN KEY ("about_certifications_id")
        REFERENCES "public"."about_certifications"("id")
        ON DELETE cascade
        ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_about_certifications_id_idx"
      ON "payload_locked_documents_rels" USING btree ("about_certifications_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "payload_locked_documents_rels_about_certifications_id_idx";

    ALTER TABLE "payload_locked_documents_rels"
      DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_about_certifications_fk";

    ALTER TABLE "payload_locked_documents_rels"
      DROP COLUMN IF EXISTS "about_certifications_id";

    DROP INDEX IF EXISTS "about_certifications_created_at_idx";
    DROP INDEX IF EXISTS "about_certifications_updated_at_idx";
    DROP INDEX IF EXISTS "about_certifications_logo_idx";

    ALTER TABLE "about_certifications"
      DROP CONSTRAINT IF EXISTS "about_certifications_logo_id_media_id_fk";

    DROP TABLE IF EXISTS "about_certifications";
  `)
}
