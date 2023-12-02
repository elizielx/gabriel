import { z } from "zod";
import { router, procedure } from "../server";
import { eq } from "drizzle-orm";
import { db, usersRewardsTable, usersTable } from "@gabriel/db";

export const userRewardsRouter = router({
    findOne: procedure.input(z.string()).query(async (opts) => {
        const discordId = opts.input;

        const user = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.discordId, discordId))
            .leftJoin(usersRewardsTable, eq(usersTable.id, usersRewardsTable.userId));

        if (!user[0].users_rewards) {
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

        const rewards = await db
            .insert(usersRewardsTable)
            .values({
                userId: user[0].id,
            })
            .returning();

        return rewards[0];
    }),
    delete: procedure.input(z.string()).mutation(async (opts) => {
        const discordId = opts.input;

        const user = await db.select().from(usersTable).where(eq(usersTable.discordId, discordId));
        if (user.length === 0) {
            return null;
        }

        const rewards = await db.delete(usersRewardsTable).where(eq(usersRewardsTable.userId, user[0].id)).returning();

        return rewards[0];
    }),
});
