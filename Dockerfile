FROM mhart/alpine-node:latest

WORKDIR usr/src/bot

COPY package.json yarn.lock ./

RUN yarn install && yarn add pm2

COPY index.js ./
COPY shone.all.source ./shone.all.source

COPY --from=build /usr/src/bot/dist/ ./
COPY --from=build /usr/src/bot/node_modules ./node_modules


RUN addgroup -S app -g 50000 && \
    adduser -S -g app -u 50000 app && \
    mkdir /data && chown app:app /data/

USER bot 

CMD [ "pm2", "start", "index.js" ]
