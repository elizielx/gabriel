import { router } from "../server";
import { userEconomyRouter } from "./economy";
import { healthRouter } from "./health";
import { userProgressionRouter } from "./progression";
import { userRewardsRouter } from "./rewards";
import { userRouter } from "./user";

export const appRouter = router({
    health: healthRouter,
    user: userRouter,
    economy: userEconomyRouter,
    rewards: userRewardsRouter,
    progression: userProgressionRouter,
});

export type AppRouter = typeof appRouter;
