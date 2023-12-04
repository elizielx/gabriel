FROM docker.io/node:lts-alpine

WORKDIR /app

RUN corepack enable
RUN addgroup --system gabriel-api && \
    adduser --system -G gabriel-api gabriel-api

COPY libs/db/src/lib/drizzle gabriel-api/libs/db/src/lib/drizzle
COPY dist/apps/gabriel-api gabriel-api
RUN chown -R gabriel-api:gabriel-api .

RUN pnpm --prefix gabriel-api --prod -f install

CMD [ "node", "gabriel-api" ]