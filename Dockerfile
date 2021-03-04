FROM mhart/alpine-node:latest

WORKDIR usr/src/bot

COPY package.json yarn.lock ./

RUN yarn && yarn add pm2

COPY src/ ./src

COPY --from=build /usr/src/bot/dist/ ./
COPY --from=build /usr/src/bot/node_modules ./node_modules


RUN addgroup -S bot -g 50000 && \
    adduser -S -g bot -u 50000 bot && \
    mkdir /data && chown bot:bot /data/

USER bot 

CMD [ "pm2", "start", "src/index.js" ]
