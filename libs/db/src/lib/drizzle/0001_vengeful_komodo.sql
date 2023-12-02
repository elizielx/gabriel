ALTER TABLE "users_economy" DROP CONSTRAINT "users_economy_user_id_unique";--> statement-breakpoint
ALTER TABLE "users_progression" DROP CONSTRAINT "users_progression_user_id_unique";--> statement-breakpoint
ALTER TABLE "users_rewards" DROP CONSTRAINT "users_rewards_user_id_unique";--> statement-breakpoint
ALTER TABLE "users_economy" DROP CONSTRAINT "users_economy_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users_progression" DROP CONSTRAINT "users_progression_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users_rewards" DROP CONSTRAINT "users_rewards_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users_economy" ADD COLUMN "discord_id" varchar;--> statement-breakpoint
ALTER TABLE "users_progression" ADD COLUMN "discord_id" varchar;--> statement-breakpoint
ALTER TABLE "users_rewards" ADD COLUMN "discord_id" varchar;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_economy" ADD CONSTRAINT "users_economy_discord_id_users_discord_id_fk" FOREIGN KEY ("discord_id") REFERENCES "users"("discord_id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_progression" ADD CONSTRAINT "users_progression_discord_id_users_discord_id_fk" FOREIGN KEY ("discord_id") REFERENCES "users"("discord_id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_rewards" ADD CONSTRAINT "users_rewards_discord_id_users_discord_id_fk" FOREIGN KEY ("discord_id") REFERENCES "users"("discord_id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users_economy" DROP COLUMN IF EXISTS "user_id";--> statement-breakpoint
ALTER TABLE "users_progression" DROP COLUMN IF EXISTS "user_id";--> statement-breakpoint
ALTER TABLE "users_rewards" DROP COLUMN IF EXISTS "user_id";--> statement-breakpoint
ALTER TABLE "users_economy" ADD CONSTRAINT "users_economy_discord_id_unique" UNIQUE("discord_id");--> statement-breakpoint
ALTER TABLE "users_progression" ADD CONSTRAINT "users_progression_discord_id_unique" UNIQUE("discord_id");--> statement-breakpoint
ALTER TABLE "users_rewards" ADD CONSTRAINT "users_rewards_discord_id_unique" UNIQUE("discord_id");