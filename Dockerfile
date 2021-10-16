FROM node:alpine AS build

WORKDIR usr/sphynx

COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

RUN addgroup -S sphynx -g 50000 && \
    adduser -S -g sphynx -u 50000 sphynx && \
    mkdir /data && chown sphynx:sphynx /data/


USER sphynx

CMD [ "node", "src/index.js" ]
