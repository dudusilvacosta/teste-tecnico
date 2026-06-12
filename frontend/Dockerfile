FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g @quasar/cli
RUN npm install --ignore-scripts

COPY . .

RUN quasar prepare

EXPOSE 9000

CMD ["quasar", "dev", "--host", "0.0.0.0"]