FROM mhart/alpine-node:latest 

WORKDIR usr/src/shonebot

COPY . .

RUN yarn && \
    yarn global add pm2 && \
    sudo apt-get install python3.8 # needed for quick.db
    
USER shonebot 

CMD [ "pm2", "start", "src/index.js" ]
