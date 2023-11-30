import { z } from "zod";
import { router, procedure } from "../server";
import { eq } from "drizzle-orm";
import { db, usersEconomyTable, usersTable } from "@gabriel/db";

export const userEconomyRouter = router({
    findOne: procedure.input(z.string()).query(async (opts) => {
        const discordId = opts.input;

        const user = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.discordId, discordId))
            .leftJoin(usersEconomyTable, eq(usersTable.id, usersEconomyTable.userId));

        if (!user[0].users_economy) {
            return null;
        }

        return user[0];
    }),
    create: procedure.input(z.object({ discordId: z.string() })).mutation(async (opts) => {
        const { discordId } = opts.input;

        const user = await db.select().from(usersTable).where(eq(usersTable.discordId, discordId));
        if (user.length === 0) {
            return null;
        }

        const economy = await db
            .insert(usersEconomyTable)
            .values({
                userId: user[0].id,
            })
            .returning();

        return economy[0];
    }),
    delete: procedure.input(z.string()).mutation(async (opts) => {
        const discordId = opts.input;

        const user = await db.select().from(usersTable).where(eq(usersTable.discordId, discordId));
        if (user.length === 0) {
            return null;
        }

        const economy = await db.delete(usersEconomyTable).where(eq(usersEconomyTable.userId, user[0].id)).returning();

        return economy[0];
    }),
});
