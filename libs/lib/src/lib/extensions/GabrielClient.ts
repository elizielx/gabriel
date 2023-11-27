import {
    ApplicationCommandRegistries,
    RegisterBehavior,
    SapphireClient,
    SapphireClientOptions,
} from "@sapphire/framework";
import { ClientOptions } from "discord.js";

export interface GabrielClientOptions extends SapphireClientOptions, ClientOptions {
    overrideApplicationCommandsRegistries?: boolean;
}

export class GabrielClient extends SapphireClient {
    public constructor(options: GabrielClientOptions) {
        super(options);

        if (options.overrideApplicationCommandsRegistries) {
            ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.BulkOverwrite);
        }
    }
}
