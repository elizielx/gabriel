import { z } from "zod";
import { router, procedure } from "../server";
import { eq } from "drizzle-orm";
import { db, usersProgressionTable, usersTable } from "@gabriel/db";

export const userProgressionRouter = router({
    findOne: procedure.input(z.string()).query(async (opts) => {
        const discordId = opts.input;

        const user = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.discordId, discordId))
            .leftJoin(usersProgressionTable, eq(usersTable.id, usersProgressionTable.userId));

        if (!user[0].users_progression) {
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

        const progression = await db
            .insert(usersProgressionTable)
            .values({
                userId: user[0].id,
            })
            .returning();

        return progression[0];
    }),
    delete: procedure.input(z.string()).mutation(async (opts) => {
        const discordId = opts.input;

        const user = await db.select().from(usersTable).where(eq(usersTable.discordId, discordId));
        if (user.length === 0) {
            return null;
        }

        const progression = await db
            .delete(usersProgressionTable)
            .where(eq(usersProgressionTable.userId, user[0].id))
            .returning();

        return progression[0];
    }),
});
