import { procedure, router } from "../server";
import { userRouter } from "./user/user";

export const appRouter = router({
    user: userRouter,
    health: procedure.query(() => {
        return { status: true };
    }),
});

export type AppRouter = typeof appRouter;
