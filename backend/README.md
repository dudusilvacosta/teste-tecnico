# API de Gerenciamento de Usuários

API REST desenvolvida com AdonisJS e PostgreSQL (Supabase) para gerenciamento de usuários com autenticação baseada em Access Tokens.

## Tecnologias Utilizadas

* AdonisJS 6
* TypeScript
* PostgreSQL
* Supabase
* Lucid ORM
* VineJS Validation

## Funcionalidades

* Cadastro de usuários
* Login com geração de token
* Autenticação via Bearer Token
* Listagem de usuários
* Atualização de usuários
* Exclusão de usuários

## Pré-requisitos

* Node.js 24+
* NPM

## Instalação

Clone o repositório:

```bash
git clone https://github.com/dudusilvacosta/api-adonisjs.git
```

Instale as dependências:

```bash
npm install
```

## Configuração

Crie o arquivo `.env` na raiz do projeto:

```env
DB_HOST=seu-host-supabase
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua-senha
DB_DATABASE=postgres
```

## Executando as migrations

```bash
node ace migration:run
```

## Executando o projeto

```bash
node ace serve --watch
```

A API estará disponível em:

```text
http://localhost:3333
```

## Rotas

### Autenticação

#### Cadastro

```http
POST /api/v1/auth/signup
```

Body:

```json
{
  "email": "usuario@email.com",
  "password": "123456",
  "passwordConfirmation": "123456"
}
```

#### Login

```http
POST /api/v1/auth/login
```

Body:

```json
{
  "email": "usuario@email.com",
  "password": "123456"
}
```

### Usuários

Todas as rotas abaixo exigem autenticação.

Header:

```http
Authorization: Bearer TOKEN
```

#### Listar usuários

```http
GET /api/v1/users
```

#### Atualizar usuário

```http
PUT /api/v1/users/:id
```

Body:

```json
{
  "email": "novoemail@email.com"
}
```

#### Excluir usuário

```http
DELETE /api/v1/users/:id
```

## Estrutura do Projeto

```text
app/
├── controllers/
│   └── users_controller.ts
├── models/
│   └── user.ts
├── validators/

database/
├── migrations/

start/
└── routes.ts
```

## Autor

Eduardo Silva Costa
