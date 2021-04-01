FROM mhart/alpine-node:latest 

WORKDIR usr/src/shonebot

COPY . .

RUN sudo apt-get install python3.8

RUN yarn && \
    yarn global add pm2 
    
USER shonebot 

CMD [ "pm2", "start", "src/index.js" ]
