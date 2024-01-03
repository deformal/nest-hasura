FROM node:20.10.0
WORKDIR /home/node/app
COPY ../dist/main.js ./main.js
COPY ../ecosystem.config.js ./ecosystem.config.js
COPY ../package.json ./package.json
COPY ../prisma ./prisma
RUN npm i -g prisma pm2
RUN prisma generate
CMD [ "pm2" ,"start", "ecosystem.config.js", "--env", "production", "--no-daemon" ]