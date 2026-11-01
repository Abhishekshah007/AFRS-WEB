import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$ BEGIN
    CREATE TYPE "public"."enum_edu_progs_organization" AS ENUM('afrs', 'afsl');
   EXCEPTION
    WHEN duplicate_object THEN NULL;
   END $$;

  CREATE TABLE IF NOT EXISTS "edu_progs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"organization" "enum_edu_progs_organization" DEFAULT 'afrs' NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"duration" varchar NOT NULL,
  	"mode" varchar NOT NULL,
  	"level" varchar,
  	"event_slug" varchar,
  	"registration_registration_type" "reg_type" DEFAULT 'paid_manual',
  	"registration_participant_region" "part_rgn" DEFAULT 'both',
  	"registration_require_payment_proof" boolean DEFAULT true,
  	"registration_use_global_payment_details" boolean DEFAULT true,
  	"registration_payment_instructions_title" varchar,
  	"registration_payment_instructions_account_name" varchar,
  	"registration_payment_instructions_account_number" varchar,
  	"registration_payment_instructions_ifsc" varchar,
  	"registration_payment_instructions_swift" varchar,
  	"registration_payment_instructions_branch_address" varchar,
  	"registration_payment_instructions_upi_id" varchar,
  	"registration_payment_instructions_paypal_link" varchar,
  	"registration_payment_instructions_note" varchar,
  	"registration_payment_qr_code_id" integer,
  	"registration_use_global_instructions" boolean DEFAULT true,
  	"registration_instructions" varchar,
  	"registration_require_agreement" boolean DEFAULT true
  );
  
  DROP INDEX IF EXISTS "progs_registration_registration_payment_qr_code_1_idx";
  DO $$ BEGIN
    ALTER TABLE "edu_progs" ADD CONSTRAINT "edu_progs_registration_payment_qr_code_id_media_id_fk" FOREIGN KEY ("registration_payment_qr_code_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END $$;
  DO $$ BEGIN
    ALTER TABLE "edu_progs" ADD CONSTRAINT "edu_progs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."edu_cats"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END $$;
  CREATE INDEX IF NOT EXISTS "edu_progs_order_idx" ON "edu_progs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "edu_progs_parent_id_idx" ON "edu_progs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "edu_progs_registration_registration_payment_qr_code_idx" ON "edu_progs" USING btree ("registration_payment_qr_code_id");
  CREATE INDEX IF NOT EXISTS "progs_registration_registration_payment_qr_code_idx" ON "progs" USING btree ("registration_payment_qr_code_id");

  WITH education_rows AS (
    DELETE FROM "progs" AS programme
    WHERE EXISTS (
      SELECT 1 FROM "edu_cats" AS category
      WHERE category."id" = programme."_parent_id"
    )
    AND NOT EXISTS (
      SELECT 1 FROM "train_cats" AS category
      WHERE category."id" = programme."_parent_id"
    )
    RETURNING *
  )
  INSERT INTO "edu_progs" (
    "_order", "_parent_id", "id", "organization", "title", "description", "duration",
    "mode", "level", "event_slug", "registration_registration_type",
    "registration_participant_region", "registration_require_payment_proof",
    "registration_use_global_payment_details", "registration_payment_instructions_title",
    "registration_payment_instructions_account_name", "registration_payment_instructions_account_number",
    "registration_payment_instructions_ifsc", "registration_payment_instructions_swift",
    "registration_payment_instructions_branch_address", "registration_payment_instructions_upi_id",
    "registration_payment_instructions_paypal_link", "registration_payment_instructions_note",
    "registration_payment_qr_code_id", "registration_use_global_instructions",
    "registration_instructions", "registration_require_agreement"
  )
  SELECT
    "_order", "_parent_id", "id", "organization"::text::"public"."enum_edu_progs_organization",
    "title", "description", "duration",
    "mode", "level", "event_slug", "registration_registration_type",
    "registration_participant_region", "registration_require_payment_proof",
    "registration_use_global_payment_details", "registration_payment_instructions_title",
    "registration_payment_instructions_account_name", "registration_payment_instructions_account_number",
    "registration_payment_instructions_ifsc", "registration_payment_instructions_swift",
    "registration_payment_instructions_branch_address", "registration_payment_instructions_upi_id",
    "registration_payment_instructions_paypal_link", "registration_payment_instructions_note",
    "registration_payment_qr_code_id", "registration_use_global_instructions",
    "registration_instructions", "registration_require_agreement"
  FROM education_rows;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DO $$ BEGIN
    IF to_regclass('public.edu_progs') IS NOT NULL AND EXISTS (SELECT 1 FROM "edu_progs") THEN
      RAISE EXCEPTION 'Cannot roll back split_education_programme_table while Education programme records exist.';
    END IF;
   END $$;

   ALTER TABLE IF EXISTS "edu_progs" DISABLE ROW LEVEL SECURITY;
  DROP TABLE IF EXISTS "edu_progs" CASCADE;
  DROP INDEX IF EXISTS "progs_registration_registration_payment_qr_code_idx";
  CREATE INDEX IF NOT EXISTS "progs_registration_registration_payment_qr_code_1_idx" ON "progs" USING btree ("registration_payment_qr_code_id");
  DROP TYPE IF EXISTS "public"."enum_edu_progs_organization";`)
}
