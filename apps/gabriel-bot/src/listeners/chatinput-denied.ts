import { GabrielEvents } from "@gabriel/shared";

import { ChatInputCommandDeniedPayload, Listener, UserError } from "@sapphire/framework";

export class ChatInputCommandDeniedListener extends Listener {
    public constructor(context: Listener.LoaderContext, options: Listener.Options) {
        super(context, {
            ...options,
            once: false,
            event: GabrielEvents.ChatInputCommandDenied,
        });
    }

    public run(error: UserError, { interaction }: ChatInputCommandDeniedPayload) {
        if (interaction.deferred || interaction.replied) {
            return interaction.editReply({
                content: error.message,
            });
        }

        return interaction.reply({
            content: error.message,
            ephemeral: true,
        });
    }
}
