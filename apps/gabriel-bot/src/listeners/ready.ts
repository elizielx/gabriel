import { GabrielEvents } from "@gabriel/shared";
import { Listener } from "@sapphire/framework";
import { Client } from "discord.js";

export class ReadyListener extends Listener {
    public constructor(context: Listener.LoaderContext, options: Listener.Options) {
        super(context, {
            ...options,
            once: true,
            event: GabrielEvents.ClientReady,
        });
    }

    public async run(client: Client) {
        const { username, id } = client.user;
        const health = await this.container.trpcClient.health.health.query();
        this.container.logger.info(`Successfully logged in as ${username} (${id})`);

        if (!health) {
            this.container.logger.warn("Failed to connect to API, some features may not work.");
        }

        this.container.logger.info("Successfully connected to API.");
    }
}
