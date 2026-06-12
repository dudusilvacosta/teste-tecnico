FROM node:22-alpine

WORKDIR /app

# Copia dependências primeiro (melhor cache)
COPY package*.json ./

RUN npm install

# Copia o restante do projeto
COPY . .

# Expõe a porta da API
EXPOSE 3333

# Adonis em modo dev (watch)
CMD ["npm", "run", "dev"]
