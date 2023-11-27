import { GabrielCommand } from "@gabriel/shared";
import { RegisterBehavior } from "@sapphire/framework";
import { EmbedBuilder, GuildMember, InteractionResponse, SlashCommandBuilder, User } from "discord.js";

export class AvatarCommand extends GabrielCommand {
    public constructor(context: GabrielCommand.Context, options: GabrielCommand.Options) {
        super(context, {
            ...options,
            name: "avatar",
            description: "Display a user's avatar(s)",
        });
    }

    public override registerApplicationCommands(registry: GabrielCommand.Registry) {
        const command: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .addUserOption((option) =>
                option.setName("user").setDescription("Get a user's avatar(s)").setRequired(false)
            );

        registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            guildIds: [],
            idHints: [],
        });
    }

    public async chatInputRun(interaction: GabrielCommand.ChatInputCommandInteraction): Promise<InteractionResponse> {
        return this.showAvatar(interaction);
    }

    private async showAvatar(ctx: GabrielCommand.ChatInputCommandInteraction): Promise<InteractionResponse> {
        const user: User = ctx.options.getUser("user") || ctx.user;
        const userInGuild: GuildMember = await ctx.guild.members.fetch(user.id);

        const iconURL: string = user.displayAvatarURL({ size: 4096 });
        const userInGuildIconURL: string = userInGuild.displayAvatarURL({ size: 4096 });

        const avatarEmbed = [
            new EmbedBuilder().setImage(iconURL).setAuthor({ name: user.tag, iconURL }),
            new EmbedBuilder().setImage(userInGuildIconURL),
        ];

        if (user.displayAvatarURL() !== userInGuild.displayAvatarURL()) {
            return ctx.reply({ embeds: avatarEmbed });
        }

        return ctx.reply({ embeds: [avatarEmbed[0]] });
    }
}
