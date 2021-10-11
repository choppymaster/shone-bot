FROM node:alpine AS build

WORKDIR usr/sphynx

COPY package.json yarn.lock ./

RUN yarn && \
    yarn global add pm2 


FROM node:alpine

WORKDIR usr/src/sphynx

COPY --from=build usr/sphynx/node_modules ./
COPY src/ ./

RUN addgroup -S sphynx -g 50000 && \
    adduser -S -g sphynx -u 50000 sphynx && \
    mkdir /data && chown sphynx:sphynx /data/


USER sphynx

CMD [ "pm2", "start", "index.js" ]
