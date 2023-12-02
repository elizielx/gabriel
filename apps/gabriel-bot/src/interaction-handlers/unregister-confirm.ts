import { Constants } from "@gabriel/shared";
import { InteractionHandler, InteractionHandlerTypes } from "@sapphire/framework";
import { ButtonInteraction, EmbedBuilder } from "discord.js";

export enum UnregisterConfirmStatus {
    CONFIRMED = "confirmed",
    CANCELLED = "cancelled",
}

interface ParsedData {
    userId: string;
    status: UnregisterConfirmStatus;
}

export class UnregisterConfirmHandler extends InteractionHandler {
    public constructor(context: InteractionHandler.LoaderContext, options: InteractionHandler.Options) {
        super(context, {
            ...options,
            name: "unregister-confirm",
            interactionHandlerType: InteractionHandlerTypes.Button,
        });
    }

    public override parse(interaction: ButtonInteraction) {
        if (interaction.customId.startsWith(Constants.BUTTON_ID.UNREGISTER_CONFIRM)) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [_, userId, status] = interaction.customId.split("-");
            const currentStatus = status as UnregisterConfirmStatus;

            if (currentStatus === UnregisterConfirmStatus.CONFIRMED) {
                return this.some<ParsedData>({ userId, status: UnregisterConfirmStatus.CONFIRMED });
            } else if (currentStatus === UnregisterConfirmStatus.CANCELLED) {
                return this.some<ParsedData>({ userId, status: UnregisterConfirmStatus.CANCELLED });
            }
        }
    }

    public async run(interaction: ButtonInteraction, parsedData?: ParsedData) {
        await interaction.update({
            components: [],
        });

        if (parsedData?.status === UnregisterConfirmStatus.CANCELLED) {
            return interaction.editReply({
                embeds: [new EmbedBuilder().setDescription("You have cancelled your account deletion.")],
            });
        }

        await this.container.api.user.delete.mutate({
            discordId: parsedData?.userId,
        });

        return interaction.editReply({
            embeds: [new EmbedBuilder().setDescription("You have successfully deleted your account.")],
        });
    }
}
