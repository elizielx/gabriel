import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";
import superjson from "superjson";

import { getApiBaseUrl } from "@gabriel/shared";
import type { AppRouter } from "@gabriel/trpc";

console.log("getApiBaseUrl", `${getApiBaseUrl()}/trpc`);
export const client = createTRPCProxyClient<AppRouter>({
    transformer: superjson,
    links: [
        loggerLink(),
        httpBatchLink({
            url: `${getApiBaseUrl()}/trpc`,
        }),
    ],
});
