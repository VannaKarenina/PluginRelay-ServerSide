FROM node:lts-alpine

WORKDIR /app

COPY ./dist/apps/user .

COPY package-lock.json ./

ENV DB_HOST pg
ENV DB_PORT 5432
ENV DB_PASSWORD vanna
ENV DB_USER postgres
ENV DB_DATABASE plugin_relay
ENV REDIS_HOST redis
ENV REDIS_PORT 6379

RUN npm ci

CMD node ./main.js
