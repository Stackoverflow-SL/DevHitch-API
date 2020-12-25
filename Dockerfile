FROM node:10-slim

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

RUN npm i -g ts-node typescript

RUN npm install ts-nats@next

RUN npm i -g nodemon

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 4000

RUN npm run build

CMD [ "npm", "run", "prod" ]
