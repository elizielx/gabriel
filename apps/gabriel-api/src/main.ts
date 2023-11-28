import Fastify from "fastify";
import { app } from "./app";
const host = process.env.API_HOST ?? "localhost";
const port = process.env.API_PORT ? Number(process.env.API_PORT) : 3000;

// Instantiate Fastify with some config
const server = Fastify({
    logger: true,
});

// Register your application as a normal plugin.
server.register(app);

// Start listening.
server.listen({ port, host }, (err) => {
    if (err) {
        server.log.error(err);
        process.exit(1);
    } else {
        console.log(`[ ready ] http://${host}:${port}`);
    }
});
