import { TRPCError } from "@trpc/server";
import { db, usersProgressionTable } from "@gabriel/db";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { router, procedure } from "../../server";

export const userProgressionRouter = router({
    findOne: procedure
        .input(
            z.object({
                discordId: z.string(),
            })
        )
        .query(async (opts) => {
            const { discordId } = opts.input;

            const query = await db
                .select()
                .from(usersProgressionTable)
                .where(eq(usersProgressionTable.discordId, discordId));
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
