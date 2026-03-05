FROM node:20-alpine

RUN apk add --no-cache curl

WORKDIR /app

COPY package*.json tsconfig.base.json ./

COPY guardian-service/ ./guardian-service/

RUN npm install

WORKDIR /app/guardian-service

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]