import { TRPCError } from "@trpc/server";
import { db, usersEconomyTable, usersProgressionTable, usersRewardsTable, usersTable } from "@gabriel/db";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { router, procedure } from "../../server";
import { userEconomyRouter } from "./economy";

export const userRouter = router({
    findOne: procedure
        .input(
            z.object({
                discordId: z.string(),
            })
        )
        .query(async (opts) => {
            const { discordId } = opts.input;

            const query = await db.select().from(usersTable).where(eq(usersTable.discordId, discordId));
            if (query.length === 0) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "User not found.",
                    cause: query,
                });
            }

            return query[0];
        }),
    create: procedure.input(z.object({ discordId: z.string() })).mutation(async (opts) => {
        const { discordId } = opts.input;

        await db.transaction(async (tx) => {
            if ((await tx.select().from(usersTable).where(eq(usersTable.discordId, discordId))).length > 0) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "User already exists.",
                });
            }

            const user = await tx
                .insert(usersTable)
                .values({
                    discordId: discordId,
                })
                .returning();

            await tx.insert(usersEconomyTable).values({
                userId: user[0].id,
            });
            await tx.insert(usersProgressionTable).values({
                userId: user[0].id,
            });
            await tx.insert(usersRewardsTable).values({
                userId: user[0].id,
            });
        });

        return { success: true };
    }),
    delete: procedure.input(z.object({ discordId: z.string() })).mutation(async (opts) => {
        const { discordId } = opts.input;

        await db.transaction(async (tx) => {
            if ((await tx.select().from(usersTable).where(eq(usersTable.discordId, discordId))).length === 0) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "User not found.",
                });
            }

            await tx.delete(usersTable).where(eq(usersTable.discordId, discordId));
        });

        return { success: true };
    }),

    economy: userEconomyRouter,
});
