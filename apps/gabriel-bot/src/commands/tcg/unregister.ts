import { db, usersTable } from "@gabriel/db";
import { Constants, GabrielCommand } from "@gabriel/shared";
import { RegisterBehavior } from "@sapphire/framework";
import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    Message,
    SlashCommandBuilder,
    bold,
} from "discord.js";
import { eq } from "drizzle-orm";
import { UnregisterConfirmStatus } from "../../interaction-handlers/unregister-confirm";

export class RegisterCommand extends GabrielCommand {
    public constructor(context: GabrielCommand.Context, options: GabrielCommand.Options) {
        super(context, {
            ...options,
            name: "unregister",
            description: "Unregister your account from Gabriel and deletes all your data.",
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

        const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
                .setCustomId(
                    `${Constants.BUTTON_ID.UNREGISTER_CONFIRM}-${interaction.user.id}-${UnregisterConfirmStatus.CONFIRMED}`
                )
                .setLabel("Confirm")
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId(
                    `${Constants.BUTTON_ID.UNREGISTER_CONFIRM}-${interaction.user.id}-${UnregisterConfirmStatus.CANCELLED}`
                )
                .setLabel("Cancel")
                .setStyle(ButtonStyle.Danger)
        );

        const user = await db.select().from(usersTable).where(eq(usersTable.discordId, interaction.user.id));
        if (user.length === 0) {
            return interaction.editReply("You are not registered.");
        }

        return interaction.editReply({
            embeds: [
                new EmbedBuilder().setDescription(
                    `Are you sure you want to proceed with deleting your account and associated data? This action is irreversible, and all your information will be permanently removed from our system.\n\nPlease Note:\n- You will lose access to your account.\n- Any saved preferences, history, and personalized settings will be lost.\n- Your data cannot be recovered once deleted.\n\nIf you're certain about this decision, please click ${bold(
                        "Confirm"
                    )} below. If you have any concerns or would like assistance, contact our support team.`
                ),
            ],
            components: [buttons],
        });
    }
}
