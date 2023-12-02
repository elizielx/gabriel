import { TRPCError } from "@trpc/server";
import { db, usersEconomyTable } from "@gabriel/db";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { router, procedure } from "../../server";

export const userEconomyRouter = router({
    findOne: procedure
        .input(
            z.object({
                discordId: z.string(),
            })
        )
        .query(async (opts) => {
            const { discordId } = opts.input;

            const query = await db.select().from(usersEconomyTable).where(eq(usersEconomyTable.userId, discordId));
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
