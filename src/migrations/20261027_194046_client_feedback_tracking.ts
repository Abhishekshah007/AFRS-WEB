import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "founders"
      ADD COLUMN IF NOT EXISTS "is_committee_member" boolean DEFAULT false;

    ALTER TABLE "progs"
      ADD COLUMN IF NOT EXISTS "event_slug" varchar;

    CREATE TABLE IF NOT EXISTS "site_visitors" (
      "id" serial PRIMARY KEY NOT NULL,
      "visitor_hash" varchar NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE UNIQUE INDEX IF NOT EXISTS "site_visitors_visitor_hash_idx"
      ON "site_visitors" USING btree ("visitor_hash");
    CREATE INDEX IF NOT EXISTS "site_visitors_updated_at_idx"
      ON "site_visitors" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "site_visitors_created_at_idx"
      ON "site_visitors" USING btree ("created_at");

    ALTER TABLE "payload_locked_documents_rels"
      ADD COLUMN IF NOT EXISTS "site_visitors_id" integer;

    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels"
        ADD CONSTRAINT "payload_locked_documents_rels_site_visitors_fk"
        FOREIGN KEY ("site_visitors_id")
        REFERENCES "public"."site_visitors"("id")
        ON DELETE cascade
        ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_site_visitors_id_idx"
      ON "payload_locked_documents_rels" USING btree ("site_visitors_id");

    INSERT INTO "founders" (
      "name", "designation", "bio", "is_committee_member", "published", "order"
    )
    SELECT member."name", member."designation", member."bio", true, true, member."order"
    FROM (VALUES
      ('Ms. Megha Jain', 'Secretary', 'Managing administrative excellence and organizational correspondence.', 0),
      ('Dr. Shrutika Singla', 'Joint Secretary', 'Supporting operations and coordinating departmental activities.', 1),
      ('Mr. Abhishek Shah', 'Treasurer', 'Overseeing financial health and resource allocation for projects.', 2),
      ('Ms. Ayushi Mittal', 'Member', 'Contributing to research initiatives and academic collaborations.', 3),
      ('Ms. Sanskriti Rani Sharma', 'Member', 'Engaging in community outreach and educational programme development.', 4)
    ) AS member("name", "designation", "bio", "order")
    WHERE NOT EXISTS (
      SELECT 1
      FROM "founders" existing
      WHERE existing."name" = member."name"
        AND existing."is_committee_member" = true
    );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "founders"
      SET "published" = false
      WHERE "is_committee_member" = true;

    ALTER TABLE "payload_locked_documents_rels"
      DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_site_visitors_fk";
    DROP INDEX IF EXISTS "payload_locked_documents_rels_site_visitors_id_idx";
    ALTER TABLE "payload_locked_documents_rels"
      DROP COLUMN IF EXISTS "site_visitors_id";

    DROP TABLE IF EXISTS "site_visitors";
    ALTER TABLE "progs"
      DROP COLUMN IF EXISTS "event_slug";
    ALTER TABLE "founders"
      DROP COLUMN IF EXISTS "is_committee_member";
  `)
}
