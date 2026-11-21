import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

/**
 * Adds `media.is_private` so participant uploads (payment proofs, ID documents)
 * and generated registration exports are hidden from the public media API,
 * then flags the files that already exist.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "media"
      ADD COLUMN IF NOT EXISTS "is_private" boolean DEFAULT false;
    UPDATE "media" SET "is_private" = false WHERE "is_private" IS NULL;
    CREATE INDEX IF NOT EXISTS "media_is_private_idx" ON "media" USING btree ("is_private");
  `)

  // Payment proofs and generated DOCX exports linked from submissions.
  await db.execute(sql`
    UPDATE "media" SET "is_private" = true
    WHERE "id" IN (
      SELECT "transaction_proof_id" FROM "event_registrations" WHERE "transaction_proof_id" IS NOT NULL
      UNION SELECT "export_document_id" FROM "event_registrations" WHERE "export_document_id" IS NOT NULL
      UNION SELECT "transaction_proof_id" FROM "course_registrations" WHERE "transaction_proof_id" IS NOT NULL
      UNION SELECT "export_document_id" FROM "course_registrations" WHERE "export_document_id" IS NOT NULL
      UNION SELECT "export_document_id" FROM "contact_messages" WHERE "export_document_id" IS NOT NULL
    );
  `)

  // Custom file-field uploads store the media id as a string inside custom_responses.
  // Match on both the id and the "<event title> — <field label>" alt text the upload
  // route writes, so ordinary numeric answers never flag an unrelated image.
  await db.execute(sql`
    UPDATE "media" m SET "is_private" = true
    FROM "event_registrations" er,
         LATERAL jsonb_each_text(
           CASE WHEN jsonb_typeof(er."custom_responses"::jsonb) = 'object'
                THEN er."custom_responses"::jsonb ELSE '{}'::jsonb END
         ) AS cr(key, value)
    WHERE cr.value ~ '^[0-9]+$'
      -- Compare as text: answers like phone numbers overflow an integer cast.
      AND m."id"::text = cr.value
      -- chr(8212) is the em dash; kept out of the SQL literal to avoid encoding issues.
      AND m."alt" LIKE er."event_title" || ' ' || chr(8212) || ' %';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "media_is_private_idx";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "is_private";
  `)
}
