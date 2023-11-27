import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: serial("id").primaryKey(),
    discordId: varchar("discord_id").unique(),
});
