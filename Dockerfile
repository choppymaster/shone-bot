FROM mhart/alpine-node:latest AS depsinstall

WORKDIR usr/src/sphynx

COPY package.json yarn.lock ./

RUN yarn && \
    yarn global add pm2 


FROM mhart/alpine-node:latest

WORKDIR usr/src/sphynx

COPY --from=depsinstall usr/src/sphynx/node_modules ./
COPY src/ ./

RUN addgroup -S sphynx -g 44444 && \
    adduser -S -g sphynx -u 44444 sphynx && \
    mkdir /data && chown sphynx:sphynx /data/


USER sphynx

CMD [ "pm2", "start", "index.js" ]