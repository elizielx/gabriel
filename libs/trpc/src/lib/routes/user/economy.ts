import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db, usersEconomyTable } from "@gabriel/db";

import { procedure, router } from "../../server";

export const userEconomyRouter = router({
    findOne: procedure
        .input(
            z.object({
                discordId: z.string(),
            })
        )
        .query(async (opts) => {
            const { discordId } = opts.input;

            const query = await db.select().from(usersEconomyTable).where(eq(usersEconomyTable.discordId, discordId));
            if (query.length === 0) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "User not found.",
                    cause: query,
                });
            }

            return query[0];
        }),
    updateCrystal: procedure.input(z.object({ discordId: z.string(), amount: z.number() })).mutation(async (opts) => {
        const { discordId, amount } = opts.input;

        await db.transaction(async (tx) => {
            const query = await tx.select().from(usersEconomyTable).where(eq(usersEconomyTable.discordId, discordId));
            if (query.length === 0) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "User not found.",
                    cause: query,
                });
            }

            const user = query[0];
            await tx
                .update(usersEconomyTable)
                .set({
                    crystals: amount + (user.crystals ?? 0),
                })
                .where(eq(usersEconomyTable.discordId, discordId));

            return { success: true };
        });
    }),
});
