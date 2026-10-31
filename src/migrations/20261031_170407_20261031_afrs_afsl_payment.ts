import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_events_organization" AS ENUM('afrs', 'afsl');
  CREATE TYPE "public"."enum_progs_organization" AS ENUM('afrs', 'afsl');
  CREATE TYPE "public"."enum_registration_form_payment_methods_organization" AS ENUM('afrs', 'afsl');
  ALTER TABLE "events" ADD COLUMN "organization" "enum_events_organization" DEFAULT 'afrs' NOT NULL;
  ALTER TABLE "events" ADD COLUMN "registration_settings_payment_qr_code_id" integer;
  ALTER TABLE "progs" ADD COLUMN "organization" "enum_progs_organization" DEFAULT 'afrs' NOT NULL;
  ALTER TABLE "progs" ADD COLUMN "registration_payment_qr_code_id" integer;
  ALTER TABLE "registration_form_payment_methods" ADD COLUMN "organization" "enum_registration_form_payment_methods_organization" DEFAULT 'afrs' NOT NULL;
  ALTER TABLE "events" ADD CONSTRAINT "events_registration_settings_payment_qr_code_id_media_id_fk" FOREIGN KEY ("registration_settings_payment_qr_code_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "progs" ADD CONSTRAINT "progs_registration_payment_qr_code_id_media_id_fk" FOREIGN KEY ("registration_payment_qr_code_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "events_registration_settings_registration_settings_payme_idx" ON "events" USING btree ("registration_settings_payment_qr_code_id");
  CREATE INDEX "progs_registration_registration_payment_qr_code_1_idx" ON "progs" USING btree ("registration_payment_qr_code_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "events" DROP CONSTRAINT "events_registration_settings_payment_qr_code_id_media_id_fk";
  
  ALTER TABLE "progs" DROP CONSTRAINT "progs_registration_payment_qr_code_id_media_id_fk";
  
  DROP INDEX "events_registration_settings_registration_settings_payme_idx";
  DROP INDEX "progs_registration_registration_payment_qr_code_1_idx";
  ALTER TABLE "events" DROP COLUMN "organization";
  ALTER TABLE "events" DROP COLUMN "registration_settings_payment_qr_code_id";
  ALTER TABLE "progs" DROP COLUMN "organization";
  ALTER TABLE "progs" DROP COLUMN "registration_payment_qr_code_id";
  ALTER TABLE "registration_form_payment_methods" DROP COLUMN "organization";
  DROP TYPE "public"."enum_events_organization";
  DROP TYPE "public"."enum_progs_organization";
  DROP TYPE "public"."enum_registration_form_payment_methods_organization";`)
}
