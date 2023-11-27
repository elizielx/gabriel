import "@sapphire/plugin-logger/register";
import { GabrielClient } from "@gabriel/shared";
import { client as trpcClient } from "./trpc-client";
import { GatewayIntentBits } from "discord.js";

console.log(process.env.DISCORD_TOKEN);

const client = new GabrielClient({
    overrideApplicationCommandsRegistries: true,
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    baseUserDirectory: __dirname,
    loadMessageCommandListeners: true,
    trpcClient: trpcClient,
});
client.login(process.env.NODE_ENV === "production" ? process.env.DISCORD_TOKEN : process.env.CANARY_DISCORD_TOKEN);
