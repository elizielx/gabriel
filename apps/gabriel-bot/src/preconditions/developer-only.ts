import { Precondition } from "@sapphire/framework";
import { CommandInteraction } from "discord.js";

import { GabrielIdentifiers } from "@gabriel/shared";

export class DeveloperOnlyPrecondition extends Precondition {
    public constructor(context: Precondition.LoaderContext, options: Precondition.Options) {
        super(context, {
            ...options,
            name: "DeveloperOnly",
        });
    }

    public async chatInputRun(interaction: CommandInteraction) {
        const developers = ["327849142774923266"];

        if (developers.includes(interaction.user.id)) {
            return this.ok();
        } else {
            return this.error({
                message: "This command is only available to developers.",
                identifier: GabrielIdentifiers.DeveloperOnly,
            });
        }
    }
}

declare module "@sapphire/framework" {
    interface Preconditions {
        DeveloperOnly: never;
    }
}
