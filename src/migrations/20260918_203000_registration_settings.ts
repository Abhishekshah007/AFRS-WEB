import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

/**
 * Registration settings columns use short dbName prefixes (reg_cfg) to stay within
 * Postgres 63-char identifier limits. Payment instruction groups are flattened
 * onto parent tables, not separate registration_form_payment_instructions tables.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "events"
      ADD COLUMN IF NOT EXISTS "reg_cfg_reg_type" varchar,
      ADD COLUMN IF NOT EXISTS "reg_cfg_part_rgn" varchar,
      ADD COLUMN IF NOT EXISTS "reg_cfg_require_payment_proof" boolean DEFAULT true,
      ADD COLUMN IF NOT EXISTS "reg_cfg_use_global_payment_details" boolean DEFAULT true,
      ADD COLUMN IF NOT EXISTS "reg_cfg_use_global_instructions" boolean DEFAULT true,
      ADD COLUMN IF NOT EXISTS "reg_cfg_instructions" varchar,
      ADD COLUMN IF NOT EXISTS "reg_cfg_require_agreement" boolean DEFAULT true,
      ADD COLUMN IF NOT EXISTS "reg_cfg_pay_inst_title" varchar,
      ADD COLUMN IF NOT EXISTS "reg_cfg_pay_inst_account_name" varchar,
      ADD COLUMN IF NOT EXISTS "reg_cfg_pay_inst_account_number" varchar,
      ADD COLUMN IF NOT EXISTS "reg_cfg_pay_inst_ifsc" varchar,
      ADD COLUMN IF NOT EXISTS "reg_cfg_pay_inst_swift" varchar,
      ADD COLUMN IF NOT EXISTS "reg_cfg_pay_inst_branch_address" varchar,
      ADD COLUMN IF NOT EXISTS "reg_cfg_pay_inst_upi_id" varchar,
      ADD COLUMN IF NOT EXISTS "reg_cfg_pay_inst_paypal_link" varchar,
      ADD COLUMN IF NOT EXISTS "reg_cfg_pay_inst_note" varchar;

    ALTER TABLE "registration_form"
      ADD COLUMN IF NOT EXISTS "default_instructions" varchar,
      ADD COLUMN IF NOT EXISTS "require_agreement" boolean DEFAULT true,
      ADD COLUMN IF NOT EXISTS "payment_instructions_paypal_link" varchar;

    ALTER TABLE "events_registration_categories"
      ADD COLUMN IF NOT EXISTS "currency" varchar DEFAULT 'INR';

    ALTER TABLE "course_registrations"
      ADD COLUMN IF NOT EXISTS "fee_tier_label" varchar,
      ADD COLUMN IF NOT EXISTS "fee_tier_currency" varchar,
      ADD COLUMN IF NOT EXISTS "participant_region" varchar,
      ADD COLUMN IF NOT EXISTS "payment_mode" varchar,
      ADD COLUMN IF NOT EXISTS "agreed_to_terms" boolean DEFAULT false;

    ALTER TABLE "event_registrations"
      ADD COLUMN IF NOT EXISTS "fee_tier_label" varchar,
      ADD COLUMN IF NOT EXISTS "fee_tier_currency" varchar,
      ADD COLUMN IF NOT EXISTS "participant_region" varchar,
      ADD COLUMN IF NOT EXISTS "payment_mode" varchar,
      ADD COLUMN IF NOT EXISTS "agreed_to_terms" boolean DEFAULT false;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "events"
      DROP COLUMN IF EXISTS "reg_cfg_reg_type",
      DROP COLUMN IF EXISTS "reg_cfg_part_rgn",
      DROP COLUMN IF EXISTS "reg_cfg_require_payment_proof",
      DROP COLUMN IF EXISTS "reg_cfg_use_global_payment_details",
      DROP COLUMN IF EXISTS "reg_cfg_use_global_instructions",
      DROP COLUMN IF EXISTS "reg_cfg_instructions",
      DROP COLUMN IF EXISTS "reg_cfg_require_agreement",
      DROP COLUMN IF EXISTS "reg_cfg_pay_inst_title",
      DROP COLUMN IF EXISTS "reg_cfg_pay_inst_account_name",
      DROP COLUMN IF EXISTS "reg_cfg_pay_inst_account_number",
      DROP COLUMN IF EXISTS "reg_cfg_pay_inst_ifsc",
      DROP COLUMN IF EXISTS "reg_cfg_pay_inst_swift",
      DROP COLUMN IF EXISTS "reg_cfg_pay_inst_branch_address",
      DROP COLUMN IF EXISTS "reg_cfg_pay_inst_upi_id",
      DROP COLUMN IF EXISTS "reg_cfg_pay_inst_paypal_link",
      DROP COLUMN IF EXISTS "reg_cfg_pay_inst_note";

    ALTER TABLE "registration_form"
      DROP COLUMN IF EXISTS "default_instructions",
      DROP COLUMN IF EXISTS "require_agreement",
      DROP COLUMN IF EXISTS "payment_instructions_paypal_link";

    ALTER TABLE "events_registration_categories"
      DROP COLUMN IF EXISTS "currency";

    ALTER TABLE "course_registrations"
      DROP COLUMN IF EXISTS "fee_tier_label",
      DROP COLUMN IF EXISTS "fee_tier_currency",
      DROP COLUMN IF EXISTS "participant_region",
      DROP COLUMN IF EXISTS "payment_mode",
      DROP COLUMN IF EXISTS "agreed_to_terms";

    ALTER TABLE "event_registrations"
      DROP COLUMN IF EXISTS "fee_tier_label",
      DROP COLUMN IF EXISTS "fee_tier_currency",
      DROP COLUMN IF EXISTS "participant_region",
      DROP COLUMN IF EXISTS "payment_mode",
      DROP COLUMN IF EXISTS "agreed_to_terms";
  `)
}
