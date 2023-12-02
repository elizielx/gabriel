import { CommandInteraction } from "discord.js";

import { GabrielIdentifiers } from "@gabriel/shared";

import { Precondition } from "@sapphire/framework";

export class RegisteredUserOnlyPrecondition extends Precondition {
    public constructor(context: Precondition.LoaderContext, options: Precondition.Options) {
        super(context, {
            ...options,
            name: "RegisteredUserOnly",
        });
    }

    public async chatInputRun(interaction: CommandInteraction) {
        try {
            await this.container.api.user.findOne.query({
                discordId: interaction.user.id,
            });

            return this.ok();
        } catch (error) {
            return this.error({
                message: "This command is only available to registered users, please register first.",
                identifier: GabrielIdentifiers.RegisteredUserOnly,
            });
        }
    }
}

declare module "@sapphire/framework" {
    interface Preconditions {
        RegisteredUserOnly: never;
    }
}
