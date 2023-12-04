import { RegisterBehavior } from "@sapphire/framework";
import { Message, SlashCommandBuilder } from "discord.js";

import { GabrielCommand } from "@gabriel/shared";

export class RegisterCommand extends GabrielCommand {
    public constructor(context: GabrielCommand.Context, options: GabrielCommand.Options) {
        super(context, {
            ...options,
            name: "register",
            description: "Register an account and begin your journey on Gabriel.",
        });
    }

    public override registerApplicationCommands(registry: GabrielCommand.Registry) {
        const command: SlashCommandBuilder = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description);

        registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            guildIds: [],
            idHints: [],
        });
    }

    public async chatInputRun(interaction: GabrielCommand.ChatInputCommandInteraction): Promise<Message> {
        await interaction.deferReply({ ephemeral: true });

        try {
            await this.container.api.user.create.mutate({ discordId: interaction.user.id });

            return interaction.editReply({
                content: `You have been registered!`,
            });
        } catch (error) {
            return interaction.editReply({
                content: `Seems like there was an error fetching or creating your account. Please contact a developer for assistance.`,
            });
        }
    }
}
