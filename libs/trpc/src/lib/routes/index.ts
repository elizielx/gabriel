import { router } from "../server";
import { userEconomyRouter } from "./economy";
import { healthRouter } from "./health";
import { userRouter } from "./user";

export const appRouter = router({
    health: healthRouter,
    user: userRouter,
    economy: userEconomyRouter,
});

export type AppRouter = typeof appRouter;
