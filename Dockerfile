FROM mhart/alpine-node:latest

WORKDIR usr/src/bot

COPY package.json yarn.lock index.js .env ./

COPY shone.all.source ./shone.all.source

RUN yarn && yarn add pm2

COPY --from=build /usr/src/bot/dist/ ./
COPY --from=build /usr/src/bot/node_modules ./node_modules


RUN addgroup -S app -g 50000 && \
    adduser -S -g app -u 50000 app && \
    mkdir /data && chown app:app /data/

USER bot 

CMD [ "pm2", "start", "index.js" ]
