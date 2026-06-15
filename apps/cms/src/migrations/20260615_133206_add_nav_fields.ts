import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" ADD COLUMN "show_in_nav" boolean DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN "nav_order" numeric DEFAULT 0;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" DROP COLUMN "show_in_nav";
  ALTER TABLE "pages" DROP COLUMN "nav_order";`)
}
