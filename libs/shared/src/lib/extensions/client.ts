import { AppRouter } from "@gabriel/trpc";
import {
    ApplicationCommandRegistries,
    RegisterBehavior,
    SapphireClient,
    SapphireClientOptions,
    container,
} from "@sapphire/framework";
import { CreateTRPCProxyClient } from "@trpc/client";
import { ClientOptions } from "discord.js";

declare module "@sapphire/pieces" {
    interface Container {
        trpcClient: CreateTRPCProxyClient<AppRouter>;
    }
}

export interface GabrielClientOptions extends SapphireClientOptions, ClientOptions {
    overrideApplicationCommandsRegistries?: boolean;
    trpcClient: CreateTRPCProxyClient<AppRouter>;
}

export class GabrielClient extends SapphireClient {
    public constructor(options: GabrielClientOptions) {
        super(options);

        if (options.overrideApplicationCommandsRegistries) {
            ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.BulkOverwrite);
        }

        container.trpcClient = options.trpcClient;
    }
}
