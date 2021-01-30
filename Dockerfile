FROM node:latest

RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

COPY package.json package-lock.json /usr/src/bot

COPY . /usr/src/bot

RUN npm install 

ENTRYPOINT ["pm2 start", "index.js"]
