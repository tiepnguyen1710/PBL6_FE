FROM node:22-alpine3.19

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 7777

CMD [ "npm", "run", "dev"]