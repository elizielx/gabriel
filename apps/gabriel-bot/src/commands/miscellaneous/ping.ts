import { GabrielCommand } from "@gabriel/shared";
import { RegisterBehavior } from "@sapphire/framework";
import { isMessageInstance } from "@sapphire/discord.js-utilities";
import { Message, SlashCommandBuilder } from "discord.js";

export class PingCommand extends GabrielCommand {
    public constructor(context: GabrielCommand.Context, options: GabrielCommand.Options) {
        super(context, {
            ...options,
            name: "ping",
            description: "Get the bot's ping.",
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
        const msg: Message = await interaction.deferReply({ ephemeral: true, fetchReply: true });

        if (isMessageInstance(msg)) {
            const diff: number = msg.createdTimestamp - interaction.createdTimestamp;
            const ping: number = Math.round(this.container.client.ws.ping);
            return interaction.editReply(`Pong 🏓! (Round trip took: ${diff}ms. Heartbeat: ${ping}ms.)`);
        }

        return interaction.editReply("Failed to retrieve ping :(");
    }
}
