import { getApiBaseUrl } from "@gabriel/shared";
import type { AppRouter } from "@gabriel/trpc";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";

export const client = createTRPCProxyClient<AppRouter>({
    transformer: superjson,
    links: [
        httpBatchLink({
            url: `${getApiBaseUrl()}/trpc`,
        }),
    ],
});
