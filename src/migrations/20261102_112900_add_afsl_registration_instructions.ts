import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "registration_form"
      ADD COLUMN IF NOT EXISTS "default_instructions_a_f_s_l" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "registration_form"
      DROP COLUMN IF EXISTS "default_instructions_a_f_s_l";
  `)
}
