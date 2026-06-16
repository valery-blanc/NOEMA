import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// FEAT-011 : titre mis en forme (richText) + attribution sur le bloc Hero.
// Migration incrémentale additive (aucune perte de données).
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero" ADD COLUMN IF NOT EXISTS "heading_rich" jsonb;
   ALTER TABLE "pages_blocks_hero" ADD COLUMN IF NOT EXISTS "attribution" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero" DROP COLUMN IF EXISTS "heading_rich";
   ALTER TABLE "pages_blocks_hero" DROP COLUMN IF EXISTS "attribution";`)
}
