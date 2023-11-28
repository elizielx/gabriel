import { getApiBaseUrl } from "@gabriel/shared";
import type { AppRouter } from "@gabriel/trpc";
import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";
import superjson from "superjson";

export const client = createTRPCProxyClient<AppRouter>({
    transformer: superjson,
    links: [
        loggerLink(),
        httpBatchLink({
            url: `${getApiBaseUrl()}/trpc`,
        }),
    ],
});
