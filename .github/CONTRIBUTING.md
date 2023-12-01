## Project Setup

This project is a [Nx](nx.dev/) monorepo. Refer to the [Nx documentation](https://nx.dev/) for more information about the project structure and the commands or to leverage the full power of Nx.

### Prerequisites

-   [Node.js](https://nodejs.org/en/) >= 21.1.0 _(preferably with corepack enabled)_
-   [Docker](https://www.docker.com/) >= 24.0.7 _(optional)_
-   [pnpm](https://pnpm.io/) >= 8.10.0
-   [PostgreSQL](https://www.postgresql.org/) >= 13.4 _(optional if Docker is used)_

### Initial Setup

> This is a step-by-step how to get a local development environment up and running. Just [R.T.F.M.](https://en.wikipedia.org/wiki/RTFM) if you know what you're doing.

-   Make sure you have all the prerequisites installed.
-   Clone the repository using [Git](https://git-scm.com/).

```bash
git clone https://github.com/elizielx/gabriel.git
```

-   Install the dependencies using `pnpm install`.
-   Copy `.env.example` to `.env` or `.env.local` and fill in the values.

### Running the Project

-   Start the database using `docker-compose up -d` or a local PostgreSQL server.
-   Migrate the database using `pnpm exec drizzle-kit generate:pg` or `pnpm nx migrate db`.
-   You can run one of the following commands to start the project:
    -   `pnpm exec nx serve gabriel-bot` - Run the Discord bot.
    -   `pnpm exec nx serve gabriel-web` - Run the website/dashboard.
    -   `pnpm exec nx serve gabriel-api` - Run the API.
