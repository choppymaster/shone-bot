FROM node:alpine AS build

WORKDIR usr/sphynx

COPY package.json yarn.lock ./

RUN yarn install

# second stage
FROM node:alpine

COPY --from=build usr/sphynx/node_modules ./node_modules

COPY /src ./src

RUN addgroup -S sphynx -g 50000 && \
    adduser -S -g sphynx -u 50000 sphynx && \
    mkdir /dat && chown sphynx:sphynx /dat/


USER sphynx

ENTRYPOINT [ "node", "src/index.js" ]
