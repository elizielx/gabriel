import { GabrielCommand } from "@gabriel/shared";
import { RegisterBehavior } from "@sapphire/framework";
import { InteractionResponse, SlashCommandBuilder } from "discord.js";

// TODO: Move this somewhere else more appropriately.
import dayjs, { ManipulateType, OpUnitType, QUnitType } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import duration from "dayjs/plugin/duration";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.tz.setDefault("Asia/Makassar");

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

    public async chatInputCooldownRun(interaction: GabrielCommand.ChatInputCommandInteraction) {
        await interaction.deferReply();
    }

    public async chatInputHourlyRun(interaction: GabrielCommand.ChatInputCommandInteraction) {
        await interaction.deferReply();
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

    private getTimeDuration(milliseconds: number): string {
        const durationObj = dayjs.duration(milliseconds);

        const days = durationObj.days();
        const hours = durationObj.hours();
        const minutes = durationObj.minutes();
        const seconds = durationObj.seconds();

        let formattedTime = "";
        if (days > 0) {
            formattedTime += `${days} day${days > 1 ? "s" : ""}, `;
        }
        if (hours > 0 || days > 0) {
            formattedTime += `${hours} hour${hours > 1 ? "s" : ""}, `;
        }
        if (minutes > 0 || hours > 0 || days > 0) {
            formattedTime += `${minutes} minute${minutes > 1 ? "s" : ""}, `;
        }
        formattedTime += `${seconds} second${seconds > 1 ? "s" : ""}`;

        return formattedTime;
    }

    private getTimeDifference(lastClaimDate: Date, timeBenchmark: QUnitType | OpUnitType): number | string | boolean {
        const lastClaim = dayjs(lastClaimDate);
        const now = dayjs();

        const difference = now.diff(lastClaim, timeBenchmark);

        if (difference < 1) {
            const miliseconds = dayjs(lastClaimDate)
                .add(1, timeBenchmark as ManipulateType)
                .diff(now, "millisecond");
            return `${this.getTimeDuration(miliseconds)}`;
        }
        return `Ready to claim.`;
    }
}
