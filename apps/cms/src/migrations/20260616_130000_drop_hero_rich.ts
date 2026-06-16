import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// FEAT-011 (révision) : on remplace le richText du hero par un champ texte à tags simples
// (<i> <b> <small> <br/>). Les colonnes heading_rich / attribution (vides) sont retirées.
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero" DROP COLUMN IF EXISTS "heading_rich";
   ALTER TABLE "pages_blocks_hero" DROP COLUMN IF EXISTS "attribution";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero" ADD COLUMN IF NOT EXISTS "heading_rich" jsonb;
   ALTER TABLE "pages_blocks_hero" ADD COLUMN IF NOT EXISTS "attribution" varchar;`)
}
