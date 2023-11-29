CREATE TABLE IF NOT EXISTS "users_economy" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"crystals" integer DEFAULT 0,
	"fates" integer DEFAULT 0,
	CONSTRAINT "users_economy_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_progression" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"level" integer DEFAULT 1,
	"xp" integer DEFAULT 0,
	CONSTRAINT "users_progression_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_economy" ADD CONSTRAINT "users_economy_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_progression" ADD CONSTRAINT "users_progression_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
