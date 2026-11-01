import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_events_event_type" ADD VALUE IF NOT EXISTS 'internship';
  ALTER TABLE "registration_form"
    ADD COLUMN IF NOT EXISTS "payment_instructions_a_f_s_l_title" varchar DEFAULT 'AFSL Payment Details',
    ADD COLUMN IF NOT EXISTS "payment_instructions_a_f_s_l_account_name" varchar DEFAULT 'AFSL SERVICES INDIA LLP',
    ADD COLUMN IF NOT EXISTS "payment_instructions_a_f_s_l_account_number" varchar,
    ADD COLUMN IF NOT EXISTS "payment_instructions_a_f_s_l_ifsc" varchar,
    ADD COLUMN IF NOT EXISTS "payment_instructions_a_f_s_l_swift" varchar,
    ADD COLUMN IF NOT EXISTS "payment_instructions_a_f_s_l_branch_address" varchar,
    ADD COLUMN IF NOT EXISTS "payment_instructions_a_f_s_l_upi_id" varchar DEFAULT 'afsl.llp09@kotak',
    ADD COLUMN IF NOT EXISTS "payment_instructions_a_f_s_l_paypal_link" varchar,
    ADD COLUMN IF NOT EXISTS "payment_instructions_a_f_s_l_note" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "registration_form"
      DROP COLUMN IF EXISTS "payment_instructions_a_f_s_l_title",
      DROP COLUMN IF EXISTS "payment_instructions_a_f_s_l_account_name",
      DROP COLUMN IF EXISTS "payment_instructions_a_f_s_l_account_number",
      DROP COLUMN IF EXISTS "payment_instructions_a_f_s_l_ifsc",
      DROP COLUMN IF EXISTS "payment_instructions_a_f_s_l_swift",
      DROP COLUMN IF EXISTS "payment_instructions_a_f_s_l_branch_address",
      DROP COLUMN IF EXISTS "payment_instructions_a_f_s_l_upi_id",
      DROP COLUMN IF EXISTS "payment_instructions_a_f_s_l_paypal_link",
      DROP COLUMN IF EXISTS "payment_instructions_a_f_s_l_note";
  `)
}
