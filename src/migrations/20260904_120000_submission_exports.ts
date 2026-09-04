import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_contact_messages_form_type" AS ENUM('contact', 'labInquiry', 'serviceConsult', 'legalConsultancy');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    ALTER TABLE "contact_messages"
      ADD COLUMN IF NOT EXISTS "form_type" "public"."enum_contact_messages_form_type" DEFAULT 'contact',
      ADD COLUMN IF NOT EXISTS "case_type" varchar,
      ADD COLUMN IF NOT EXISTS "service_slug" varchar,
      ADD COLUMN IF NOT EXISTS "export_document_id" integer;

    UPDATE "contact_messages" SET "form_type" = 'contact' WHERE "form_type" IS NULL;

    ALTER TABLE "course_registrations"
      ADD COLUMN IF NOT EXISTS "export_document_id" integer;

    ALTER TABLE "event_registrations"
      ADD COLUMN IF NOT EXISTS "export_document_id" integer;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "contact_messages"
      DROP COLUMN IF EXISTS "form_type",
      DROP COLUMN IF EXISTS "case_type",
      DROP COLUMN IF EXISTS "service_slug",
      DROP COLUMN IF EXISTS "export_document_id";

    ALTER TABLE "course_registrations"
      DROP COLUMN IF EXISTS "export_document_id";

    ALTER TABLE "event_registrations"
      DROP COLUMN IF EXISTS "export_document_id";

    DROP TYPE IF EXISTS "public"."enum_contact_messages_form_type";
  `)
}
