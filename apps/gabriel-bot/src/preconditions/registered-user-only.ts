import { GabrielIdentifiers } from "@gabriel/shared";
import { Precondition } from "@sapphire/framework";
import { CommandInteraction } from "discord.js";

export class RegistedUserOnlyPrecondition extends Precondition {
    public constructor(context: Precondition.LoaderContext, options: Precondition.Options) {
        super(context, {
            ...options,
            name: "RegisteredUserOnly",
        });
    }

    public async chatInputRun(interaction: CommandInteraction) {
        const user = await this.container.trpcClient.user.findOne.query(interaction.user.id);
        return user
            ? this.ok()
            : this.error({ message: "You are not registered.", identifier: GabrielIdentifiers.RegisteredUserOnly });
    }
}

declare module "@sapphire/framework" {
    interface Preconditions {
        RegistedUserOnly: never;
    }
}
