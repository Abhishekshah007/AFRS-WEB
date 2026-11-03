import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$ BEGIN
    CREATE TYPE "public"."enum_programme_categories_kind" AS ENUM('education', 'training');
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;
  DO $$ BEGIN
    CREATE TYPE "public"."enum_programme_categories_tag_tone" AS ENUM('blue', 'green', 'purple', 'orange');
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;
  DO $$ BEGIN
    CREATE TYPE "public"."enum_programmes_organization" AS ENUM('afrs', 'afsl');
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;
  ALTER TYPE "public"."enum_admin_access_role_menus_hidden_collections_slug" ADD VALUE IF NOT EXISTS 'programmeCategories' BEFORE 'resourcePersons';
  ALTER TYPE "public"."enum_admin_access_role_menus_hidden_collections_slug" ADD VALUE IF NOT EXISTS 'programmes' BEFORE 'resourcePersons';
  CREATE TABLE IF NOT EXISTS "programme_categories_who_can_apply" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "programme_categories_outcomes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "programme_categories_mission_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "programme_categories_extra_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "programme_categories_extra_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"note" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "programme_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" "enum_programme_categories_kind" NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"icon" varchar NOT NULL,
  	"summary" varchar NOT NULL,
  	"intro" varchar,
  	"tag" varchar,
  	"tag_tone" "enum_programme_categories_tag_tone",
  	"sort_order" numeric DEFAULT 0,
  	"body" varchar,
  	"highlights_title" varchar,
  	"highlights_note" varchar,
  	"outcomes_title" varchar,
  	"cta_label" varchar,
  	"vision" varchar,
  	"mission_title" varchar,
  	"disclaimer" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "programmes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"category_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"duration" varchar NOT NULL,
  	"mode" varchar NOT NULL,
  	"level" varchar,
  	"organization" "enum_programmes_organization" DEFAULT 'afrs' NOT NULL,
  	"programme_id" varchar NOT NULL,
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
  	"registration_require_agreement" boolean DEFAULT true,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "programme_categories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "programmes_id" integer;
  DO $$ BEGIN
    ALTER TABLE "programme_categories_who_can_apply" ADD CONSTRAINT "programme_categories_who_can_apply_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programme_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;
  DO $$ BEGIN
    ALTER TABLE "programme_categories_outcomes" ADD CONSTRAINT "programme_categories_outcomes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programme_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;
  DO $$ BEGIN
    ALTER TABLE "programme_categories_mission_items" ADD CONSTRAINT "programme_categories_mission_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programme_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;
  DO $$ BEGIN
    ALTER TABLE "programme_categories_extra_sections_items" ADD CONSTRAINT "programme_categories_extra_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programme_categories_extra_sections"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;
  DO $$ BEGIN
    ALTER TABLE "programme_categories_extra_sections" ADD CONSTRAINT "programme_categories_extra_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programme_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;
  DO $$ BEGIN
    ALTER TABLE "programmes" ADD CONSTRAINT "programmes_category_id_programme_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."programme_categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;
  DO $$ BEGIN
    ALTER TABLE "programmes" ADD CONSTRAINT "programmes_registration_payment_qr_code_id_media_id_fk" FOREIGN KEY ("registration_payment_qr_code_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;
  CREATE INDEX IF NOT EXISTS "programme_categories_who_can_apply_order_idx" ON "programme_categories_who_can_apply" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "programme_categories_who_can_apply_parent_id_idx" ON "programme_categories_who_can_apply" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "programme_categories_outcomes_order_idx" ON "programme_categories_outcomes" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "programme_categories_outcomes_parent_id_idx" ON "programme_categories_outcomes" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "programme_categories_mission_items_order_idx" ON "programme_categories_mission_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "programme_categories_mission_items_parent_id_idx" ON "programme_categories_mission_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "programme_categories_extra_sections_items_order_idx" ON "programme_categories_extra_sections_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "programme_categories_extra_sections_items_parent_id_idx" ON "programme_categories_extra_sections_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "programme_categories_extra_sections_order_idx" ON "programme_categories_extra_sections" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "programme_categories_extra_sections_parent_id_idx" ON "programme_categories_extra_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "programme_categories_kind_slug_idx" ON "programme_categories" USING btree ("kind", "slug");
  CREATE INDEX IF NOT EXISTS "programme_categories_updated_at_idx" ON "programme_categories" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "programme_categories_created_at_idx" ON "programme_categories" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "programmes_category_idx" ON "programmes" USING btree ("category_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "programmes_programme_id_idx" ON "programmes" USING btree ("programme_id");
  CREATE INDEX IF NOT EXISTS "programmes_registration_registration_payment_qr_code_idx" ON "programmes" USING btree ("registration_payment_qr_code_id");
  CREATE INDEX IF NOT EXISTS "programmes_updated_at_idx" ON "programmes" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "programmes_created_at_idx" ON "programmes" USING btree ("created_at");
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_programme_categories_fk" FOREIGN KEY ("programme_categories_id") REFERENCES "public"."programme_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_programmes_fk" FOREIGN KEY ("programmes_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_programme_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("programme_categories_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_programmes_id_idx" ON "payload_locked_documents_rels" USING btree ("programmes_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "programme_categories_who_can_apply" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programme_categories_outcomes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programme_categories_mission_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programme_categories_extra_sections_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programme_categories_extra_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programme_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programmes" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "programme_categories_who_can_apply" CASCADE;
  DROP TABLE "programme_categories_outcomes" CASCADE;
  DROP TABLE "programme_categories_mission_items" CASCADE;
  DROP TABLE "programme_categories_extra_sections_items" CASCADE;
  DROP TABLE "programme_categories_extra_sections" CASCADE;
  DROP TABLE "programme_categories" CASCADE;
  DROP TABLE "programmes" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_programme_categories_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_programmes_fk";
  
  DROP INDEX "payload_locked_documents_rels_programme_categories_id_idx";
  DROP INDEX "payload_locked_documents_rels_programmes_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "programme_categories_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "programmes_id";
  DROP TYPE "public"."enum_programme_categories_kind";
  DROP TYPE "public"."enum_programme_categories_tag_tone";
  DROP TYPE "public"."enum_programmes_organization";`)
}
