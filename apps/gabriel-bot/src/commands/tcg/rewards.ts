import { GabrielCommand } from "@gabriel/shared";
import { RegisterBehavior } from "@sapphire/framework";
import { InteractionResponse, SlashCommandBuilder } from "discord.js";

export class RewardsCommand extends GabrielCommand {
    public constructor(context: GabrielCommand.Context, options: GabrielCommand.Options) {
        super(context, {
            ...options,
            name: "rewards",
            description: "See your available rewards and claim them.",
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

    public async chatInputRun(interaction: GabrielCommand.ChatInputCommandInteraction): Promise<InteractionResponse> {
        return interaction.reply("No commands are available yet.");
    }
}
