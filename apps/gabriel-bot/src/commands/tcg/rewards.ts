import { GabrielCommand } from "@gabriel/shared";
import { RegisterBehavior } from "@sapphire/framework";
import { InteractionResponse, Message, SlashCommandBuilder } from "discord.js";

export class RewardsCommand extends GabrielCommand {
    public constructor(context: GabrielCommand.Context, options: GabrielCommand.Options) {
        super(context, {
            ...options,
            name: "rewards",
            description: "See your available rewards and claim them.",
            preconditions: ["RegisteredUserOnly"],
            subcommands: [
                {
                    name: "cooldown",
                    chatInputRun: "chatInputCooldownRun",
                },
                {
                    name: "hourly",
                    chatInputRun: "chatInputHourlyRun",
                },
                {
                    name: "daily",
                    chatInputRun: "chatInputDailyRun",
                },
                {
                    name: "weekly",
                    chatInputRun: "chatInputWeeklyRun",
                },
            ],
        });
    }

    public override registerApplicationCommands(registry: GabrielCommand.Registry) {
        const command = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .addSubcommand((command) => command.setName("cooldown").setDescription("View your reward cooldowns."))
            .addSubcommand((command) => command.setName("hourly").setDescription("Claim your hourly reward."))
            .addSubcommand((command) => command.setName("daily").setDescription("Claim your daily reward."))
            .addSubcommand((command) => command.setName("weekly").setDescription("Claim your weekly reward."));

        registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            guildIds: [],
            idHints: [],
        });
    }

    public async chatInputCooldownRun(interaction: GabrielCommand.ChatInputCommandInteraction): Promise<Message> {
        await interaction.deferReply();

        return interaction.editReply("No commands are available yet.");
    }

    public async chatInputHourlyRun(
        interaction: GabrielCommand.ChatInputCommandInteraction
    ): Promise<InteractionResponse> {
        return interaction.reply("No commands are available yet.");
    }

    public async chatInputDailyRun(
        interaction: GabrielCommand.ChatInputCommandInteraction
    ): Promise<InteractionResponse> {
        return interaction.reply("No commands are available yet.");
    }

    public async chatInputWeeklyRun(
        interaction: GabrielCommand.ChatInputCommandInteraction
    ): Promise<InteractionResponse> {
        return interaction.reply("No commands are available yet.");
    }
}
