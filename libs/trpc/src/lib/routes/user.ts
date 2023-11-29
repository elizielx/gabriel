import { z } from "zod";
import { router, procedure } from "../server";
import { eq } from "drizzle-orm";
import { db, usersTable } from "@gabriel/db";

export const userRouter = router({
    findUser: procedure.input(z.string()).query(async (opts) => {
        const discordId = opts.input;

        const user = await db.select().from(usersTable).where(eq(usersTable.discordId, discordId));
        if (user.length === 0) {
            return null;
        }

        return user[0];
    }),
});
