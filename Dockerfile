FROM node:latest

WORKDIR /usr/src/bot

COPY package.json package-lock.json start.sh ./

COPY Bot-Source/ ./Bot-Source

RUN npm install 

ENTRYPOINT ["bash", "start.sh"]
