FROM docker.io/node:lts-alpine

WORKDIR /app

RUN corepack enable
RUN addgroup --system gabriel-bot && \
    adduser --system -G gabriel-bot gabriel-bot

COPY dist/apps/gabriel-bot gabriel-bot
RUN chown -R gabriel-bot:gabriel-bot .

RUN pnpm --prefix gabriel-bot --prod -f install

CMD [ "node", "gabriel-bot" ]