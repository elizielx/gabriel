import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@gabriel/trpc";
import superjson from "superjson";

export const getBaseUrl = (): string => {
    if (typeof window !== "undefined") {
        return "";
    }
    return `http://localhost:${process.env.API_PORT ?? 3001}`;
};

export const client = createTRPCProxyClient<AppRouter>({
    transformer: superjson,
    links: [
        httpBatchLink({
            url: `${getBaseUrl()}/trpc`,
        }),
    ],
});
