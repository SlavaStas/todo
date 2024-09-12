FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install --only=dev

COPY . .

RUN npm run build
RUN npm run typeorm migration:run -- -d /app/src/config/database.ts

EXPOSE 3000

CMD ["npm", "run", "start:docker"]
