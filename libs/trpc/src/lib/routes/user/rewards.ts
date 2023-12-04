import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db, usersRewardsTable } from "@gabriel/db";

import { procedure, router } from "../../server";

export const userRewardsRouter = router({
    findOne: procedure
        .input(
            z.object({
                discordId: z.string(),
            })
        )
        .query(async (opts) => {
            const { discordId } = opts.input;

            const query = await db.select().from(usersRewardsTable).where(eq(usersRewardsTable.discordId, discordId));
            if (query.length === 0) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "User not found.",
                    cause: query,
                });
            }

            return query[0];
        }),
    updateHourly: procedure.input(z.object({ discordId: z.string(), time: z.date() })).mutation(async (opts) => {
        const { discordId, time } = opts.input;

        await db.transaction(async (tx) => {
            const query = await tx.select().from(usersRewardsTable).where(eq(usersRewardsTable.discordId, discordId));
            if (query.length === 0) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "User not found.",
                    cause: query,
                });
            }

            await tx.update(usersRewardsTable).set({
                hourly: time,
            });

            return { success: true };
        });
    }),
    updateDaily: procedure.input(z.object({ discordId: z.string(), time: z.date() })).mutation(async (opts) => {
        const { discordId, time } = opts.input;

        await db.transaction(async (tx) => {
            const query = await tx.select().from(usersRewardsTable).where(eq(usersRewardsTable.discordId, discordId));
            if (query.length === 0) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "User not found.",
                    cause: query,
                });
            }

            await tx.update(usersRewardsTable).set({
                daily: time,
            });

            return { success: true };
        });
    }),
    updateWeekly: procedure.input(z.object({ discordId: z.string(), time: z.date() })).mutation(async (opts) => {
        const { discordId, time } = opts.input;

        await db.transaction(async (tx) => {
            const query = await tx.select().from(usersRewardsTable).where(eq(usersRewardsTable.discordId, discordId));
            if (query.length === 0) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "User not found.",
                    cause: query,
                });
            }

            await tx.update(usersRewardsTable).set({
                weekly: time,
            });

            return { success: true };
        });
    }),
    resetAll: procedure.input(z.object({ discordId: z.string() })).mutation(async (opts) => {
        const { discordId } = opts.input;

        await db.transaction(async (tx) => {
            const query = await tx.select().from(usersRewardsTable).where(eq(usersRewardsTable.discordId, discordId));
            if (query.length === 0) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "User not found.",
                    cause: query,
                });
            }

            await tx.update(usersRewardsTable).set({
                hourly: null,
                daily: null,
                weekly: null,
            });

            return { success: true };
        });
    }),
});
