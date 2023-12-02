import "@sapphire/plugin-logger/register";
import { GabrielClient } from "@gabriel/shared";
import { client as trpcClient } from "@gabriel/trpc-client";
import { GatewayIntentBits } from "discord.js";

const client = new GabrielClient({
    overrideApplicationCommandsRegistries: true,
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    baseUserDirectory: __dirname,
    loadMessageCommandListeners: true,
    api: trpcClient,
});

client.login(process.env.NODE_ENV === "production" ? process.env.DISCORD_TOKEN : process.env.CANARY_DISCORD_TOKEN);
