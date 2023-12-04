import { RegisterBehavior } from "@sapphire/framework";
import dayjs, { ManipulateType, OpUnitType, QUnitType } from "dayjs";
import duration from "dayjs/plugin/duration";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";

import { GabrielCommand, getRandomInt } from "@gabriel/shared";

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

        const userRewards = await this.container.api.user.rewards.findOne.query({
            discordId: interaction.user.id,
        });

        const hourlyCooldown = this.getTimeDifference(userRewards.hourly, "hour");
        const dailyCooldown = this.getTimeDifference(userRewards.daily, "day");
        const weeklyCooldown = this.getTimeDifference(userRewards.weekly, "week");

        return interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`Reward Cooldowns for ${interaction.user.tag}`)
                    .setDescription(
                        `> **Hourly:** ${hourlyCooldown}\n> **Daily:** ${dailyCooldown}\n> **Weekly:** ${weeklyCooldown}.`
                    ),
            ],
        });
    }

    public async chatInputHourlyRun(interaction: GabrielCommand.ChatInputCommandInteraction) {
        await interaction.deferReply();

        const userRewards = await this.container.api.user.rewards.findOne.query({
            discordId: interaction.user.id,
        });

        const now = dayjs();
        const lastClaim = dayjs(userRewards.hourly);
        const difference = now.diff(lastClaim, "hour");

        if (difference < 1) {
            const miliseconds = dayjs(userRewards.hourly).add(1, "hour").diff(now, "millisecond");
            return interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`Hourly Reward`)
                        .setDescription(`You can claim your hourly reward in ${this.getTimeDuration(miliseconds)}.`),
                ],
            });
        }

        const rewards = getRandomInt(100, 500);
        await this.container.api.user.economy.updateCrystal.mutate({
            discordId: interaction.user.id,
            amount: rewards,
        });
        await this.container.api.user.rewards.updateHourly.mutate({
            discordId: interaction.user.id,
            time: now.toDate(),
        });

        return interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`Hourly Reward`)
                    .setDescription(`You claimed your hourly reward and received ${rewards} crystals.`),
            ],
        });
    }

    public async chatInputDailyRun(interaction: GabrielCommand.ChatInputCommandInteraction) {
        await interaction.deferReply();

        const userRewards = await this.container.api.user.rewards.findOne.query({
            discordId: interaction.user.id,
        });

        const now = dayjs();
        const lastClaim = dayjs(userRewards.daily);
        const difference = now.diff(lastClaim, "day");

        if (difference < 1) {
            const miliseconds = dayjs(userRewards.hourly).add(1, "day").diff(now, "millisecond");
            return interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`Daily Reward`)
                        .setDescription(`You can claim your daily reward in ${this.getTimeDuration(miliseconds)}.`),
                ],
            });
        }

        const rewards = getRandomInt(500, 1000);
        await this.container.api.user.economy.updateCrystal.mutate({
            discordId: interaction.user.id,
            amount: rewards,
        });
        await this.container.api.user.rewards.updateDaily.mutate({
            discordId: interaction.user.id,
            time: now.toDate(),
        });

        return interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`Daily Reward`)
                    .setDescription(`You claimed your daily reward and received ${rewards} crystals.`),
            ],
        });
    }

    public async chatInputWeeklyRun(interaction: GabrielCommand.ChatInputCommandInteraction) {
        await interaction.deferReply();

        const userRewards = await this.container.api.user.rewards.findOne.query({
            discordId: interaction.user.id,
        });

        const now = dayjs();
        const lastClaim = dayjs(userRewards.weekly);
        const difference = now.diff(lastClaim, "week");

        if (difference < 1) {
            const miliseconds = dayjs(userRewards.hourly).add(1, "week").diff(now, "millisecond");
            return interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`Weekly Reward`)
                        .setDescription(`You can claim your weekly reward in ${this.getTimeDuration(miliseconds)}.`),
                ],
            });
        }

        const rewards = getRandomInt(1000, 5000);
        await this.container.api.user.economy.updateCrystal.mutate({
            discordId: interaction.user.id,
            amount: rewards,
        });
        await this.container.api.user.rewards.updateWeekly.mutate({
            discordId: interaction.user.id,
            time: now.toDate(),
        });

        return interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`Weekly Reward`)
                    .setDescription(`You claimed your weekly reward and received ${rewards} crystals.`),
            ],
        });
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
        if (lastClaimDate === null) return `You haven't claimed this reward yet.`;

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
