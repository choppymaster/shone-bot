FROM node:alpine AS build

WORKDIR usr/sphynx

COPY package.json yarn.lock tsconfig.json ./
COPY src/ ./src

RUN yarn install && yarn build && rm -f dist/*.map

# second stage
FROM node:alpine

COPY --from=build usr/sphynx/dist/ ./src
COPY --from=build usr/sphynx/node_modules ./node_modules

RUN addgroup -S sphynx -g 50000 && \
    adduser -S -g sphynx -u 50000 sphynx && \
    mkdir /dat && chown sphynx:sphynx /dat/


USER sphynx

ENTRYPOINT [ "node", "src/index.js" ]
