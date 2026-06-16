import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('fr', 'es', 'en', 'de');
  CREATE TYPE "public"."enum_pages_blocks_hero_variant" AS ENUM('cream', 'petrol', 'media');
  CREATE TYPE "public"."enum_pages_blocks_pullquote_variant" AS ENUM('cream', 'petrol');
  CREATE TYPE "public"."enum_pages_blocks_cta_variant" AS ENUM('petrol', 'inline');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_hero_variant" DEFAULT 'cream',
  	"eyebrow" varchar,
  	"heading" varchar NOT NULL,
  	"intro" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"image_id" integer,
  	"image_url" varchar,
  	"portrait_id" integer,
  	"portrait_url" varchar,
  	"portrait_caption" varchar,
  	"coming_soon" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"lead" varchar,
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_manifesto_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"term" varchar NOT NULL,
  	"caption" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_manifesto" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_values_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"term" varchar NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE "pages_blocks_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_service_detail_items_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_service_detail_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar,
  	"image_caption" varchar,
  	"image_url" varchar,
  	"coming_soon" varchar
  );
  
  CREATE TABLE "pages_blocks_service_detail" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_steps_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_milestones_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"title" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_milestones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_story" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"body" jsonb,
  	"signature_name" varchar,
  	"role" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"caption" varchar NOT NULL,
  	"tag" varchar,
  	"image_id" integer,
  	"image_url" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_founder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"quote" varchar NOT NULL,
  	"signature_name" varchar,
  	"role" varchar,
  	"portrait_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_prose" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_title" varchar,
  	"body" jsonb,
  	"note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pullquote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_pullquote_variant" DEFAULT 'cream',
  	"quote" varchar NOT NULL,
  	"attribution" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_cta_variant" DEFAULT 'petrol',
  	"heading" varchar NOT NULL,
  	"text" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form_project_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"name_label" varchar,
  	"email_label" varchar,
  	"project_label" varchar,
  	"message_label" varchar,
  	"message_placeholder" varchar,
  	"submit_label" varchar,
  	"write_label" varchar,
  	"meet_label" varchar,
  	"meet_location" varchar,
  	"meet_note" varchar,
  	"langs_label" varchar,
  	"langs_value" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"show_in_nav" boolean DEFAULT false,
  	"nav_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar NOT NULL,
  	"excerpt" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"contact_email" varchar,
  	"domain" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"site_name" varchar DEFAULT 'NOÊMA' NOT NULL,
  	"tagline" varchar,
  	"location" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_statement" ADD CONSTRAINT "pages_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_manifesto_items" ADD CONSTRAINT "pages_blocks_manifesto_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_manifesto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_manifesto" ADD CONSTRAINT "pages_blocks_manifesto_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_values_rows" ADD CONSTRAINT "pages_blocks_values_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_values" ADD CONSTRAINT "pages_blocks_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_items" ADD CONSTRAINT "pages_blocks_services_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services" ADD CONSTRAINT "pages_blocks_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_detail_items_tags" ADD CONSTRAINT "pages_blocks_service_detail_items_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_detail_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_detail_items" ADD CONSTRAINT "pages_blocks_service_detail_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_detail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_detail" ADD CONSTRAINT "pages_blocks_service_detail_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_steps_items" ADD CONSTRAINT "pages_blocks_steps_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_steps" ADD CONSTRAINT "pages_blocks_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_milestones_items" ADD CONSTRAINT "pages_blocks_milestones_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_milestones"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_milestones" ADD CONSTRAINT "pages_blocks_milestones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_story" ADD CONSTRAINT "pages_blocks_story_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_items" ADD CONSTRAINT "pages_blocks_gallery_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_items" ADD CONSTRAINT "pages_blocks_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery" ADD CONSTRAINT "pages_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_founder" ADD CONSTRAINT "pages_blocks_founder_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_founder" ADD CONSTRAINT "pages_blocks_founder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_prose" ADD CONSTRAINT "pages_blocks_prose_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pullquote" ADD CONSTRAINT "pages_blocks_pullquote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form_project_options" ADD CONSTRAINT "pages_blocks_contact_form_project_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form" ADD CONSTRAINT "pages_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_locale_idx" ON "pages_blocks_hero" USING btree ("_locale");
  CREATE INDEX "pages_blocks_hero_image_idx" ON "pages_blocks_hero" USING btree ("image_id");
  CREATE INDEX "pages_blocks_hero_portrait_idx" ON "pages_blocks_hero" USING btree ("portrait_id");
  CREATE INDEX "pages_blocks_statement_order_idx" ON "pages_blocks_statement" USING btree ("_order");
  CREATE INDEX "pages_blocks_statement_parent_id_idx" ON "pages_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_statement_path_idx" ON "pages_blocks_statement" USING btree ("_path");
  CREATE INDEX "pages_blocks_statement_locale_idx" ON "pages_blocks_statement" USING btree ("_locale");
  CREATE INDEX "pages_blocks_manifesto_items_order_idx" ON "pages_blocks_manifesto_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_manifesto_items_parent_id_idx" ON "pages_blocks_manifesto_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_manifesto_items_locale_idx" ON "pages_blocks_manifesto_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_manifesto_order_idx" ON "pages_blocks_manifesto" USING btree ("_order");
  CREATE INDEX "pages_blocks_manifesto_parent_id_idx" ON "pages_blocks_manifesto" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_manifesto_path_idx" ON "pages_blocks_manifesto" USING btree ("_path");
  CREATE INDEX "pages_blocks_manifesto_locale_idx" ON "pages_blocks_manifesto" USING btree ("_locale");
  CREATE INDEX "pages_blocks_values_rows_order_idx" ON "pages_blocks_values_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_values_rows_parent_id_idx" ON "pages_blocks_values_rows" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_values_rows_locale_idx" ON "pages_blocks_values_rows" USING btree ("_locale");
  CREATE INDEX "pages_blocks_values_order_idx" ON "pages_blocks_values" USING btree ("_order");
  CREATE INDEX "pages_blocks_values_parent_id_idx" ON "pages_blocks_values" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_values_path_idx" ON "pages_blocks_values" USING btree ("_path");
  CREATE INDEX "pages_blocks_values_locale_idx" ON "pages_blocks_values" USING btree ("_locale");
  CREATE INDEX "pages_blocks_services_items_order_idx" ON "pages_blocks_services_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_items_parent_id_idx" ON "pages_blocks_services_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_items_locale_idx" ON "pages_blocks_services_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_services_order_idx" ON "pages_blocks_services" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_parent_id_idx" ON "pages_blocks_services" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_path_idx" ON "pages_blocks_services" USING btree ("_path");
  CREATE INDEX "pages_blocks_services_locale_idx" ON "pages_blocks_services" USING btree ("_locale");
  CREATE INDEX "pages_blocks_service_detail_items_tags_order_idx" ON "pages_blocks_service_detail_items_tags" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_detail_items_tags_parent_id_idx" ON "pages_blocks_service_detail_items_tags" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_detail_items_tags_locale_idx" ON "pages_blocks_service_detail_items_tags" USING btree ("_locale");
  CREATE INDEX "pages_blocks_service_detail_items_order_idx" ON "pages_blocks_service_detail_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_detail_items_parent_id_idx" ON "pages_blocks_service_detail_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_detail_items_locale_idx" ON "pages_blocks_service_detail_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_service_detail_order_idx" ON "pages_blocks_service_detail" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_detail_parent_id_idx" ON "pages_blocks_service_detail" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_detail_path_idx" ON "pages_blocks_service_detail" USING btree ("_path");
  CREATE INDEX "pages_blocks_service_detail_locale_idx" ON "pages_blocks_service_detail" USING btree ("_locale");
  CREATE INDEX "pages_blocks_steps_items_order_idx" ON "pages_blocks_steps_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_steps_items_parent_id_idx" ON "pages_blocks_steps_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_steps_items_locale_idx" ON "pages_blocks_steps_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_steps_order_idx" ON "pages_blocks_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_steps_parent_id_idx" ON "pages_blocks_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_steps_path_idx" ON "pages_blocks_steps" USING btree ("_path");
  CREATE INDEX "pages_blocks_steps_locale_idx" ON "pages_blocks_steps" USING btree ("_locale");
  CREATE INDEX "pages_blocks_milestones_items_order_idx" ON "pages_blocks_milestones_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_milestones_items_parent_id_idx" ON "pages_blocks_milestones_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_milestones_items_locale_idx" ON "pages_blocks_milestones_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_milestones_order_idx" ON "pages_blocks_milestones" USING btree ("_order");
  CREATE INDEX "pages_blocks_milestones_parent_id_idx" ON "pages_blocks_milestones" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_milestones_path_idx" ON "pages_blocks_milestones" USING btree ("_path");
  CREATE INDEX "pages_blocks_milestones_locale_idx" ON "pages_blocks_milestones" USING btree ("_locale");
  CREATE INDEX "pages_blocks_story_order_idx" ON "pages_blocks_story" USING btree ("_order");
  CREATE INDEX "pages_blocks_story_parent_id_idx" ON "pages_blocks_story" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_story_path_idx" ON "pages_blocks_story" USING btree ("_path");
  CREATE INDEX "pages_blocks_story_locale_idx" ON "pages_blocks_story" USING btree ("_locale");
  CREATE INDEX "pages_blocks_gallery_items_order_idx" ON "pages_blocks_gallery_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_items_parent_id_idx" ON "pages_blocks_gallery_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_items_locale_idx" ON "pages_blocks_gallery_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_gallery_items_image_idx" ON "pages_blocks_gallery_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_gallery_order_idx" ON "pages_blocks_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_parent_id_idx" ON "pages_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_path_idx" ON "pages_blocks_gallery" USING btree ("_path");
  CREATE INDEX "pages_blocks_gallery_locale_idx" ON "pages_blocks_gallery" USING btree ("_locale");
  CREATE INDEX "pages_blocks_founder_order_idx" ON "pages_blocks_founder" USING btree ("_order");
  CREATE INDEX "pages_blocks_founder_parent_id_idx" ON "pages_blocks_founder" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_founder_path_idx" ON "pages_blocks_founder" USING btree ("_path");
  CREATE INDEX "pages_blocks_founder_locale_idx" ON "pages_blocks_founder" USING btree ("_locale");
  CREATE INDEX "pages_blocks_founder_portrait_idx" ON "pages_blocks_founder" USING btree ("portrait_id");
  CREATE INDEX "pages_blocks_prose_order_idx" ON "pages_blocks_prose" USING btree ("_order");
  CREATE INDEX "pages_blocks_prose_parent_id_idx" ON "pages_blocks_prose" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_prose_path_idx" ON "pages_blocks_prose" USING btree ("_path");
  CREATE INDEX "pages_blocks_prose_locale_idx" ON "pages_blocks_prose" USING btree ("_locale");
  CREATE INDEX "pages_blocks_pullquote_order_idx" ON "pages_blocks_pullquote" USING btree ("_order");
  CREATE INDEX "pages_blocks_pullquote_parent_id_idx" ON "pages_blocks_pullquote" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pullquote_path_idx" ON "pages_blocks_pullquote" USING btree ("_path");
  CREATE INDEX "pages_blocks_pullquote_locale_idx" ON "pages_blocks_pullquote" USING btree ("_locale");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_locale_idx" ON "pages_blocks_cta" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_form_project_options_order_idx" ON "pages_blocks_contact_form_project_options" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_project_options_parent_id_idx" ON "pages_blocks_contact_form_project_options" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_project_options_locale_idx" ON "pages_blocks_contact_form_project_options" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_form_order_idx" ON "pages_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_parent_id_idx" ON "pages_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_path_idx" ON "pages_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_form_locale_idx" ON "pages_blocks_contact_form" USING btree ("_locale");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_statement" CASCADE;
  DROP TABLE "pages_blocks_manifesto_items" CASCADE;
  DROP TABLE "pages_blocks_manifesto" CASCADE;
  DROP TABLE "pages_blocks_values_rows" CASCADE;
  DROP TABLE "pages_blocks_values" CASCADE;
  DROP TABLE "pages_blocks_services_items" CASCADE;
  DROP TABLE "pages_blocks_services" CASCADE;
  DROP TABLE "pages_blocks_service_detail_items_tags" CASCADE;
  DROP TABLE "pages_blocks_service_detail_items" CASCADE;
  DROP TABLE "pages_blocks_service_detail" CASCADE;
  DROP TABLE "pages_blocks_steps_items" CASCADE;
  DROP TABLE "pages_blocks_steps" CASCADE;
  DROP TABLE "pages_blocks_milestones_items" CASCADE;
  DROP TABLE "pages_blocks_milestones" CASCADE;
  DROP TABLE "pages_blocks_story" CASCADE;
  DROP TABLE "pages_blocks_gallery_items" CASCADE;
  DROP TABLE "pages_blocks_gallery" CASCADE;
  DROP TABLE "pages_blocks_founder" CASCADE;
  DROP TABLE "pages_blocks_prose" CASCADE;
  DROP TABLE "pages_blocks_pullquote" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_contact_form_project_options" CASCADE;
  DROP TABLE "pages_blocks_contact_form" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_pages_blocks_hero_variant";
  DROP TYPE "public"."enum_pages_blocks_pullquote_variant";
  DROP TYPE "public"."enum_pages_blocks_cta_variant";`)
}
