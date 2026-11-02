import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "edu_fee_tiers" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL,
      "amount" numeric NOT NULL,
      "currency" "public"."cur" DEFAULT 'INR' NOT NULL,
      "description" varchar
    );

    CREATE INDEX IF NOT EXISTS "edu_fee_tiers_order_idx"
      ON "edu_fee_tiers" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "edu_fee_tiers_parent_id_idx"
      ON "edu_fee_tiers" USING btree ("_parent_id");

    DO $$ BEGIN
      ALTER TABLE "edu_fee_tiers"
        ADD CONSTRAINT "edu_fee_tiers_parent_id_fk"
        FOREIGN KEY ("_parent_id")
        REFERENCES "public"."edu_progs"("id")
        ON DELETE cascade
        ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      IF EXISTS (SELECT 1 FROM "edu_fee_tiers") THEN
        RAISE EXCEPTION 'Cannot drop edu_fee_tiers while education fee-tier records exist.';
      END IF;
    END $$;

    DROP TABLE IF EXISTS "edu_fee_tiers" CASCADE;
  `)
}
