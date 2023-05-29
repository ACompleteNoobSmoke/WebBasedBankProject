FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY  .  . 

EXPOSE 3002

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD [ "node", "server.js" ]