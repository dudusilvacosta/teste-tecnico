Este projeto é uma aplicação full stack contendo:

Backend: AdonisJS (API REST)
Frontend: Quasar Framework (Vue.js)
Banco de dados: MySQL
Ambiente: Docker + Docker Compose
Tecnologias
AdonisJS
Quasar Framework
Node.js
MySQL
Docker & Docker Compose

Como rodar o projeto

Pré-requisitos

Antes de começar, você precisa ter instalado:

Docker
Docker Compose
Subindo o projeto

Na raiz do projeto, execute:
docker compose up --build -d

Acessos

Depois que subir, os serviços estarão disponíveis em:

Frontend (Quasar)
http://localhost:9000

Backend (API Adonis)
http://localhost:3333

Banco de dados (MySQL)
Host: localhost
Porta: 3306
Database: app_db

Banco de dados

O MySQL é criado automaticamente via Docker com:

DB_NAME=app_db
DB_USER=app_user
DB_PASSWORD=app_pass

Migrations

Para rodar as migrations manualmente:

docker exec -it adonis-api node ace migration:run

estando a API

Exemplo de endpoint:

GET http://localhost:3333

Estrutura do projeto
.
├── backend/        # API AdonisJS
├── frontend/       # Quasar App
├── docker-compose.yml
└── README.md

Parando o projeto
docker compose down