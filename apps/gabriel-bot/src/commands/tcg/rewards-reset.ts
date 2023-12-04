import { RegisterBehavior } from "@sapphire/framework";
import { EmbedBuilder, Message, SlashCommandBuilder, User } from "discord.js";

import { GabrielCommand } from "@gabriel/shared";

export class RegisterCommand extends GabrielCommand {
    public constructor(context: GabrielCommand.Context, options: GabrielCommand.Options) {
        super(context, {
            ...options,
            name: "rewards-reset",
            description: "[DEVELOPER] Resets all rewards cooldowns for the current or specified user.",
            preconditions: ["RegisteredUserOnly", "DeveloperOnly"],
        });
    }

    public override registerApplicationCommands(registry: GabrielCommand.Registry) {
        const command = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .addUserOption((option) => option.setName("user").setDescription("The specified user.").setRequired(false));

        registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            guildIds: ["1181208555710328882"],
            idHints: [],
        });
    }

    public async chatInputRun(interaction: GabrielCommand.ChatInputCommandInteraction): Promise<Message> {
        await interaction.deferReply({ ephemeral: true });
        const user: User = interaction.options.getUser("user") || interaction.user;

        await this.container.api.user.rewards.resetAll.mutate({
            discordId: user.id,
        });

        return interaction.editReply({
            embeds: [
                new EmbedBuilder().setTitle("Rewards Reset").setDescription(`All rewards for ${user} have been reset.`),
            ],
        });
    }
}
