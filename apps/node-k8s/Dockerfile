FROM node:20-alpine3.19
COPY ../dist dist
COPY ./package.json package.json
COPY ./.env .env
RUN npm i -c
