FROM node:lts-alpine

WORKDIR /app

COPY ./dist/apps/mailer .

COPY package-lock.json ./

ENV DB_HOST pg
ENV DB_PORT 5432
ENV DB_PASSWORD vOn4Ho4pJEGFcFB
ENV DB_USER postgres
ENV DB_DATABASE plugin_relay
ENV REDIS_HOST redis
ENV REDIS_PORT 6379
ENV NODEMAILER_HOST=smtp.mail.ru
ENV NODEMAILER_PORT 465
ENV NODEMAILER_SECURE true
ENV NODEMAILER_USER noreply@zonezero.dev
ENV NODEMAILER_USER_PASSWORD c0vmUmw5BQBYXA7RXh8a
ENV NODEMAILER_SENDER noreply@zonezero.dev

RUN npm ci

CMD node ./main.js
