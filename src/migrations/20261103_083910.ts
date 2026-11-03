import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

import {
  migrateProgrammeCatalogToCollections,
  restoreProgrammeCatalogGlobal,
} from '../lib/migrations/programmeCatalogDataMigration'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "programme_fee_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"amount" numeric NOT NULL,
  	"currency" "cur" DEFAULT 'INR' NOT NULL,
  	"description" varchar
  );
  
  DO $$ BEGIN
    ALTER TABLE "programme_fee_tiers" ADD CONSTRAINT "programme_fee_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;
  CREATE INDEX IF NOT EXISTS "programme_fee_tiers_order_idx" ON "programme_fee_tiers" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "programme_fee_tiers_parent_id_idx" ON "programme_fee_tiers" USING btree ("_parent_id");`)

  await migrateProgrammeCatalogToCollections(payload, req)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await restoreProgrammeCatalogGlobal(payload, req)

  await db.execute(sql`
   DROP TABLE "programme_fee_tiers" CASCADE;`)
}
