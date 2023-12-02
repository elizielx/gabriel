import { TRPCError } from "@trpc/server";
import { db, usersRewardsTable } from "@gabriel/db";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { router, procedure } from "../../server";

export const userRewardsRouter = router({
    findOne: procedure
        .input(
            z.object({
                discordId: z.string(),
            })
        )
        .query(async (opts) => {
            const { discordId } = opts.input;

            const query = await db.select().from(usersRewardsTable).where(eq(usersRewardsTable.userId, discordId));
            if (query.length === 0) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "User not found.",
                    cause: query,
                });
            }

            return query[0];
        }),
});
