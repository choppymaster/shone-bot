FROM node:latest

RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

COPY package.json package-lock.json /usr/src/bot

RUN npm install 

COPY . /usr/src/bot

ENTRYPOINT ["bash", "start.sh"]
