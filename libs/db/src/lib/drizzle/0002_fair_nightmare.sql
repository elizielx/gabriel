CREATE TABLE IF NOT EXISTS "users_rewards" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"hourly" timestamp (6) with time zone,
	"daily" timestamp (6) with time zone,
	"weekly" timestamp (6) with time zone,
	CONSTRAINT "users_rewards_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_rewards" ADD CONSTRAINT "users_rewards_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
