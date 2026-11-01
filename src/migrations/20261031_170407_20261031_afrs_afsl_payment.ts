import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_events_organization" AS ENUM('afrs', 'afsl');
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_progs_organization" AS ENUM('afrs', 'afsl');
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_registration_form_payment_methods_organization" AS ENUM('afrs', 'afsl');
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    ALTER TABLE "events"
      ADD COLUMN IF NOT EXISTS "organization" "enum_events_organization" DEFAULT 'afrs' NOT NULL,
      ADD COLUMN IF NOT EXISTS "registration_settings_payment_qr_code_id" integer;

    ALTER TABLE "progs"
      ADD COLUMN IF NOT EXISTS "organization" "enum_progs_organization" DEFAULT 'afrs' NOT NULL,
      ADD COLUMN IF NOT EXISTS "registration_payment_qr_code_id" integer;

    ALTER TABLE "registration_form_payment_methods"
      ADD COLUMN IF NOT EXISTS "organization" "enum_registration_form_payment_methods_organization" DEFAULT 'afrs' NOT NULL;

    DO $$ BEGIN
      ALTER TABLE "events"
        ADD CONSTRAINT "events_registration_settings_payment_qr_code_id_media_id_fk"
        FOREIGN KEY ("registration_settings_payment_qr_code_id") REFERENCES "public"."media"("id")
        ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "progs"
        ADD CONSTRAINT "progs_registration_payment_qr_code_id_media_id_fk"
        FOREIGN KEY ("registration_payment_qr_code_id") REFERENCES "public"."media"("id")
        ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    CREATE INDEX IF NOT EXISTS "events_registration_settings_registration_settings_payme_idx"
      ON "events" USING btree ("registration_settings_payment_qr_code_id");
    CREATE INDEX IF NOT EXISTS "progs_registration_registration_payment_qr_code_1_idx"
      ON "progs" USING btree ("registration_payment_qr_code_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "events"
      DROP CONSTRAINT IF EXISTS "events_registration_settings_payment_qr_code_id_media_id_fk",
      DROP COLUMN IF EXISTS "organization",
      DROP COLUMN IF EXISTS "registration_settings_payment_qr_code_id";

    ALTER TABLE "progs"
      DROP CONSTRAINT IF EXISTS "progs_registration_payment_qr_code_id_media_id_fk",
      DROP COLUMN IF EXISTS "organization",
      DROP COLUMN IF EXISTS "registration_payment_qr_code_id";

    ALTER TABLE "registration_form_payment_methods"
      DROP COLUMN IF EXISTS "organization";

    DROP INDEX IF EXISTS "events_registration_settings_registration_settings_payme_idx";
    DROP INDEX IF EXISTS "progs_registration_registration_payment_qr_code_1_idx";
    DROP TYPE IF EXISTS "public"."enum_events_organization";
    DROP TYPE IF EXISTS "public"."enum_progs_organization";
    DROP TYPE IF EXISTS "public"."enum_registration_form_payment_methods_organization";
  `)
}
