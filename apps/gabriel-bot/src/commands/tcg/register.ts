import { db, usersTable } from "@gabriel/db";
import { GabrielCommand } from "@gabriel/shared";
import { RegisterBehavior } from "@sapphire/framework";
import { Message, SlashCommandBuilder } from "discord.js";
import { eq } from "drizzle-orm";

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

        const testUser = await this.container.trpcClient.user.findUser.query(interaction.user.id);
        console.log(testUser);

        const user = await db.select().from(usersTable).where(eq(usersTable.discordId, interaction.user.id));
        if (user.length === 0) {
            await db.insert(usersTable).values({
                discordId: interaction.user.id,
            });

            return interaction.editReply("You have successfully registered your account.");
        }

        return interaction.editReply("You are already registered.");
    }
}
