import { Client } from "discord.js";

import { GabrielEvents } from "@gabriel/shared";

import { Listener } from "@sapphire/framework";

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
        this.container.logger.info(`Successfully logged in as ${username} (${id})`);

        const health = await this.container.api.health.query();
        if (!health) {
            this.container.logger.warn(
                "API responded with an unhealthy status, some features may not work as expected or at all."
            );
        }
        this.container.logger.info("Successfully connected to the API.");
    }
}
