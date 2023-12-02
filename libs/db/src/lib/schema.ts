import { integer, pgTable, timestamp, varchar, uuid } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    discordId: varchar("discord_id").unique().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const usersRewardsTable = pgTable("users_rewards", {
    id: uuid("id").primaryKey().defaultRandom(),
    discordId: varchar("discord_id")
        .references(() => usersTable.discordId, {
            onDelete: "cascade",
            onUpdate: "cascade",
        })
        .unique(),
    hourly: timestamp("hourly", { precision: 6, withTimezone: true }),
    daily: timestamp("daily", { precision: 6, withTimezone: true }),
    weekly: timestamp("weekly", { precision: 6, withTimezone: true }),
});

export const usersEconomyTable = pgTable("users_economy", {
    id: uuid("id").primaryKey().defaultRandom(),
    discordId: varchar("discord_id")
        .references(() => usersTable.discordId, {
            onDelete: "cascade",
            onUpdate: "cascade",
        })
        .unique(),
    crystals: integer("crystals").default(0),
    fates: integer("fates").default(0),
});

export const usersProgressionTable = pgTable("users_progression", {
    id: uuid("id").primaryKey().defaultRandom(),
    discordId: varchar("discord_id")
        .references(() => usersTable.discordId, {
            onDelete: "cascade",
            onUpdate: "cascade",
        })
        .unique(),
    level: integer("level").default(1),
    xp: integer("xp").default(0),
});
