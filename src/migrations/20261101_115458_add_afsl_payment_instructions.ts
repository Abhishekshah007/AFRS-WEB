import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_events_event_type" ADD VALUE IF NOT EXISTS 'internship';
  ALTER TABLE "registration_form" ADD COLUMN "payment_instructions_a_f_s_l_title" varchar DEFAULT 'AFSL Payment Details';
  ALTER TABLE "registration_form" ADD COLUMN "payment_instructions_a_f_s_l_account_name" varchar DEFAULT 'AFSL SERVICES INDIA LLP';
  ALTER TABLE "registration_form" ADD COLUMN "payment_instructions_a_f_s_l_account_number" varchar;
  ALTER TABLE "registration_form" ADD COLUMN "payment_instructions_a_f_s_l_ifsc" varchar;
  ALTER TABLE "registration_form" ADD COLUMN "payment_instructions_a_f_s_l_swift" varchar;
  ALTER TABLE "registration_form" ADD COLUMN "payment_instructions_a_f_s_l_branch_address" varchar;
  ALTER TABLE "registration_form" ADD COLUMN "payment_instructions_a_f_s_l_upi_id" varchar DEFAULT 'afsl.llp09@kotak';
  ALTER TABLE "registration_form" ADD COLUMN "payment_instructions_a_f_s_l_paypal_link" varchar;
  ALTER TABLE "registration_form" ADD COLUMN "payment_instructions_a_f_s_l_note" varchar;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "registration_form" DROP COLUMN "payment_instructions_a_f_s_l_title";
  ALTER TABLE "registration_form" DROP COLUMN "payment_instructions_a_f_s_l_account_name";
  ALTER TABLE "registration_form" DROP COLUMN "payment_instructions_a_f_s_l_account_number";
  ALTER TABLE "registration_form" DROP COLUMN "payment_instructions_a_f_s_l_ifsc";
  ALTER TABLE "registration_form" DROP COLUMN "payment_instructions_a_f_s_l_swift";
  ALTER TABLE "registration_form" DROP COLUMN "payment_instructions_a_f_s_l_branch_address";
  ALTER TABLE "registration_form" DROP COLUMN "payment_instructions_a_f_s_l_upi_id";
  ALTER TABLE "registration_form" DROP COLUMN "payment_instructions_a_f_s_l_paypal_link";
  ALTER TABLE "registration_form" DROP COLUMN "payment_instructions_a_f_s_l_note";`)
}
