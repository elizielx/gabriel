## Project Setup

This project is a [Nx](nx.dev/) monorepo. It contains the following projects:

- [gabriel-bot](apps/gabriel-bot/README.md) - Discord bot written in TypeScript using [Discord.js](https://discord.js.org/) and [Sapphire](sapphirejs.dev/).
- [gabriel-web](apps/gabriel-web/README.md) - Website or a dashboard for the bot written in TypeScript using [Qwik](https://qwik.dev/).
- [gabriel-api](apps/gabriel-api/README.md) - Unified API for the bot and the website written in TypeScript using [Fastify](https://www.fastify.io/) with [tRPC](https://trpc.io/).

and the following libraries:

- [shared](libs/shared/README.md) - Shared code between the projects.
- [db](libs/db/README.md) - Database definitions and migrations using [Drizzle](https://drizzle.dev/).
- [trpc](libs/trpc/README.md) - tRPC server for the API.
- [trpc-client](libs/trpc-client/README.md) - tRPC client for projects that use the API.

### Prerequisites

- [Node.js](https://nodejs.org/en/) >= 21.1.0 *(preferably with corepack enabled)*
- [Docker](https://www.docker.com/) >= 24.0.7 *(optional)*
- [pnpm](https://pnpm.io/) >= 8.10.0
- [PostgreSQL](https://www.postgresql.org/) >= 13.4 *(optional if Docker is used)*

### Initial Setup

> This is a step-by-step how to get a local development environment up and running. Just [R.T.F.M.](https://en.wikipedia.org/wiki/RTFM) if you know what you're doing.

- Make sure you have all the prerequisites installed.
- Clone the repository using [Git](https://git-scm.com/).
```bash
git clone https://github.com/elizielx/gabriel.git
```
- Install the dependencies using `pnpm install`.
- Copy `.env.example` to `.env` or `.env.local` and fill in the values.

### Running the Project

- Start the database using `docker-compose up -d` or a local PostgreSQL server.
- Migrate the database using `pnpm exec drizzle-kit generate:pg` or `pnpm nx migrate db`.
- You can run one of the following commands to start the project:
  - `pnpm exec nx serve gabriel-bot` - Run the bot.
  - `pnpm exec nx serve gabriel-web` - Run the website.
  - `pnpm exec nx serve gabriel-api` - Run the API.

### Leveraging Nx

- Refer to the [Nx documentation](https://nx.dev/) for more information about the project structure and the commands.