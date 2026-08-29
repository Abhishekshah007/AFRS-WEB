import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_scientists_member_type" AS ENUM('director', 'member');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_scientists_status" AS ENUM('active', 'inactive');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    ALTER TABLE "scientists"
      ADD COLUMN IF NOT EXISTS "member_type" "public"."enum_scientists_member_type" DEFAULT 'member';

    ALTER TABLE "scientists"
      ADD COLUMN IF NOT EXISTS "status" "public"."enum_scientists_status" DEFAULT 'active';

    UPDATE "scientists" SET "member_type" = 'member' WHERE "member_type" IS NULL;
    UPDATE "scientists" SET "status" = 'active' WHERE "status" IS NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "scientists"
      DROP COLUMN IF EXISTS "status";

    ALTER TABLE "scientists"
      DROP COLUMN IF EXISTS "member_type";

    DROP TYPE IF EXISTS "public"."enum_scientists_status";
    DROP TYPE IF EXISTS "public"."enum_scientists_member_type";
  `)
}
