import { nodeServerAdapter } from "@builder.io/qwik-city/adapters/node-server/vite";
import { extendConfig } from "@builder.io/qwik-city/vite";
import baseConfig from "../../../vite.config";
import path from "path";

const entryPath = path.resolve(__dirname, "../../entry.fastify.tsx");

export default extendConfig(baseConfig, () => {
    return {
        build: {
            ssr: true,
            rollupOptions: {
                input: [entryPath, "@qwik-city-plan"],
            },
        },
        plugins: [nodeServerAdapter({ name: "fastify" })],
    };
});
