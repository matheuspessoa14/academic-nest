# API Alunos e Disciplinas — NestJS, DTOs e MySQL

API RESTful desenvolvida durante a Unidade Curricular de **Programação Web 2 — Senac RJ**, utilizando **NestJS, TypeScript e MySQL** para gerenciamento de alunos e disciplinas.

---

# 1. Descrição

Este projeto consiste em uma API RESTful para gerenciamento de alunos e disciplinas.

A aplicação permite realizar operações de cadastro, consulta, atualização, atualização parcial e exclusão, utilizando persistência de dados em banco **MySQL**.

Nesta etapa do projeto foram adicionados recursos de validação, DTOs, tratamento de erros e novos endpoints.

A arquitetura da aplicação foi organizada utilizando as camadas:

```text
Request
    ↓
ValidationPipe
    ↓
DTO
    ↓
Controller
    ↓
Service
    ↓
Repository
    ↓
DatabaseService
    ↓
MySQL
```

Os alunos possuem os seguintes dados:

```text
id
nome
email
curso
```

As disciplinas possuem:

```text
id
nome
carga_horaria
```

---

# 2. Funcionalidades

## Alunos

A API possui as seguintes funcionalidades:

- Cadastro de alunos;
- Listagem de alunos;
- Consulta de aluno por ID;
- Atualização completa de alunos;
- Atualização parcial através de `PATCH`;
- Exclusão de alunos;
- Validação de nome;
- Validação de e-mail;
- Validação de curso;
- Tratamento de aluno inexistente;
- Persistência dos dados em MySQL.

## Disciplinas

A API possui as seguintes funcionalidades:

- Cadastro de disciplinas;
- Listagem de disciplinas;
- Consulta de disciplina por ID;
- Atualização de disciplinas;
- Exclusão de disciplinas;
- Validação de nome;
- Validação de carga horária;
- Tratamento de disciplina inexistente;
- Persistência dos dados em MySQL.

---

# 3. Tecnologias Utilizadas

- **Node.js**
- **NestJS**
- **TypeScript**
- **MySQL**
- **mysql2**
- **@nestjs/config**
- **class-validator**
- **class-transformer**
- **@nestjs/mapped-types**
- **npm**
- **Git**
- **GitHub**

---

# 4. Arquitetura e Organização do Projeto

A aplicação utiliza uma arquitetura em camadas:

```text
Cliente
    ↓
ValidationPipe
    ↓
DTO
    ↓
Controller
    ↓
Service
    ↓
Repository
    ↓
DatabaseService
    ↓
MySQL
```

Responsabilidades:

- `Controller` — recebe e trata as requisições HTTP;
- `DTO` — define e valida os dados recebidos;
- `ValidationPipe` — executa as validações antes do Controller;
- `Service` — coordena as regras da aplicação;
- `Repository` — realiza o acesso aos dados e contém as instruções SQL;
- `DatabaseService` — gerencia o pool de conexões com o MySQL;
- `MySQL` — realiza a persistência dos dados.

Estrutura principal:

```text
src/
├── app.module.ts
├── main.ts
│
├── database/
│   ├── database.module.ts
│   └── database.service.ts
│
├── alunos/
│   ├── dto/
│   │   ├── create-aluno.dto.ts
│   │   ├── update-aluno.dto.ts
│   │   └── patch-aluno.dto.ts
│   │
│   ├── alunos.module.ts
│   ├── alunos.controller.ts
│   ├── alunos.service.ts
│   └── alunos.repository.ts
│
└── disciplinas/
    ├── dto/
    │   ├── create-disciplina.dto.ts
    │   └── update-disciplina.dto.ts
    │
    ├── disciplinas.module.ts
    ├── disciplinas.controller.ts
    ├── disciplinas.service.ts
    └── disciplinas.repository.ts
```

---

# 5. Pré-requisitos

Antes de executar o projeto, é necessário possuir:

- Node.js;
- npm;
- Git;
- MySQL.

---

# 6. Instalação

## 6.1 Clone o repositório

```bash
git clone https://github.com/matheuspessoa14/api-alunos.git
```

## 6.2 Acesse a pasta do projeto

```bash
cd api-alunos
```

## 6.3 Instale as dependências

```bash
npm install
```

---

# 7. Configuração das Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=escola
```

O arquivo `.env` contém informações específicas do ambiente e não deve ser enviado ao repositório.

Ele deve estar incluído no `.gitignore`:

```gitignore
.env
```

---

# 8. Banco de Dados

Crie o banco:

```sql
CREATE DATABASE IF NOT EXISTS escola;
```

Selecione o banco:

```sql
USE escola;
```

Crie a tabela de alunos:

```sql
CREATE TABLE alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    curso VARCHAR(100) NOT NULL
);
```

Crie a tabela de disciplinas:

```sql
CREATE TABLE disciplinas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    carga_horaria INT NOT NULL
);
```

As estruturas utilizadas pela aplicação são:

```text
Aluno
├── id
├── nome
├── email
└── curso
```

```text
Disciplina
├── id
├── nome
└── carga_horaria
```

---

# 9. Execução do Projeto

## Ambiente de desenvolvimento

```bash
npm run start:dev
```

A API estará disponível em:

```text
http://localhost:3000
```

## Build

Para verificar a compilação do projeto:

```bash
npm run build
```

## Ambiente de produção

```bash
npm run start:prod
```

---

# 10. Endpoints da API

## Alunos

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `GET` | `/alunos` | Lista todos os alunos |
| `GET` | `/alunos/:id` | Busca um aluno pelo ID |
| `POST` | `/alunos` | Cadastra um novo aluno |
| `PUT` | `/alunos/:id` | Atualiza completamente um aluno |
| `PATCH` | `/alunos/:id` | Atualiza parcialmente um aluno |
| `DELETE` | `/alunos/:id` | Exclui um aluno |

## Disciplinas

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `GET` | `/disciplinas` | Lista todas as disciplinas |
| `GET` | `/disciplinas/:id` | Busca uma disciplina pelo ID |
| `POST` | `/disciplinas` | Cadastra uma nova disciplina |
| `PUT` | `/disciplinas/:id` | Atualiza uma disciplina |
| `DELETE` | `/disciplinas/:id` | Exclui uma disciplina |

---

# 11. Exemplos de Requisição e Resposta

## Criar aluno

```http
POST /alunos
Content-Type: application/json
```

```json
{
  "nome": "Matheus",
  "email": "matheus@email.com",
  "curso": "ADS"
}
```

Exemplo de resposta:

```json
{
  "id": 1,
  "nome": "Matheus",
  "email": "matheus@email.com",
  "curso": "ADS"
}
```

## Atualizar aluno

```http
PUT /alunos/1
Content-Type: application/json
```

```json
{
  "nome": "Matheus Pessoa",
  "email": "matheus.pessoa@email.com",
  "curso": "Análise e Desenvolvimento de Sistemas"
}
```

## Atualização parcial

```http
PATCH /alunos/1
Content-Type: application/json
```

```json
{
  "curso": "Engenharia de Software"
}
```

## Criar disciplina

```http
POST /disciplinas
Content-Type: application/json
```

```json
{
  "nome": "Programação Web 2",
  "carga_horaria": 80
}
```

Exemplo de resposta:

```json
{
  "id": 1,
  "nome": "Programação Web 2",
  "carga_horaria": 80
}
```

---

# 12. Validação e Tratamento de Erros

A aplicação utiliza `class-validator` e `ValidationPipe` para validar os dados recebidos.

O `ValidationPipe` foi configurado globalmente com:

```ts
whitelist: true,
forbidNonWhitelisted: true,
transform: true
```

São utilizados validadores como:

```text
@IsString()
@IsNotEmpty()
@MaxLength()
@IsEmail()
@IsInt()
@Min()
```

Exemplo de e-mail inválido:

```json
{
  "nome": "João",
  "email": "abc",
  "curso": "ADS"
}
```

A API retorna:

```text
400 Bad Request
```

Para recursos inexistentes é utilizado:

```text
NotFoundException
```

Exemplo:

```http
GET /alunos/99999
```

Resposta esperada:

```json
{
  "statusCode": 404,
  "message": "Aluno não encontrado"
}
```

Principais códigos HTTP utilizados:

- `200` — operação realizada com sucesso;
- `201` — recurso criado;
- `204` — operação realizada sem conteúdo de resposta;
- `400` — requisição inválida;
- `404` — recurso não encontrado;
- `500` — erro interno do servidor.

---

# 13. DTOs

Os DTOs são responsáveis por definir e validar os dados recebidos pela aplicação.

Para alunos:

```text
CreateAlunoDto
UpdateAlunoDto
PatchAlunoDto
```

O `CreateAlunoDto` valida:

```text
nome
email
curso
```

O campo de e-mail utiliza:

```ts
@IsEmail()
```

O `UpdateAlunoDto` é utilizado no `PUT`.

O `PatchAlunoDto` utiliza:

```ts
PartialType
```

permitindo que apenas os campos que serão modificados sejam enviados.

Para disciplinas:

```text
CreateDisciplinaDto
UpdateDisciplinaDto
```

Os DTOs de disciplinas validam:

```text
nome
carga_horaria
```

---

# 14. Persistência com MySQL

A aplicação utiliza o pacote `mysql2` para comunicação com o banco de dados.

O acesso ao banco é realizado através de um **pool de conexões**, permitindo que a aplicação reutilize conexões em vez de criar uma nova conexão para cada requisição.

O `DatabaseService` é responsável por gerenciar essa infraestrutura.

```text
Repository
    ↓
DatabaseService
    ↓
Connection Pool
    ↓
MySQL
```

O SQL permanece concentrado nos repositories.

---

# 15. Injeção de Dependência

O NestJS é responsável pela criação e injeção das dependências da aplicação.

Fluxo de alunos:

```text
AlunosController
      ↓
AlunosService
      ↓
AlunosRepository
      ↓
DatabaseService
```

Fluxo de disciplinas:

```text
DisciplinasController
        ↓
DisciplinasService
        ↓
DisciplinasRepository
        ↓
DatabaseService
```

O `DatabaseModule` disponibiliza o `DatabaseService` para os módulos que precisam acessar o banco.

---

# 16. Testes Realizados

As operações da API foram testadas através de requisições HTTP.

## Alunos

Foram verificadas as seguintes operações:

```text
POST   /alunos
GET    /alunos
GET    /alunos/:id
PUT    /alunos/:id
PATCH  /alunos/:id
DELETE /alunos/:id
```

Também foram testados:

```text
e-mail inválido
campos obrigatórios ausentes
campos extras
ID inválido
aluno inexistente
atualização parcial
204 No Content
```

## Disciplinas

Foram verificadas:

```text
POST   /disciplinas
GET    /disciplinas
GET    /disciplinas/:id
PUT    /disciplinas/:id
DELETE /disciplinas/:id
```

Também foram testados:

```text
nome inválido
carga horária inválida
disciplina inexistente
204 No Content
```

Também foi realizada a compilação do projeto através de:

```bash
npm run build
```

---

# 17. Extras — Programação Web 2

Nesta etapa foram implementados:

- DTOs;
- `CreateAlunoDto`;
- `UpdateAlunoDto`;
- `PatchAlunoDto`;
- `CreateDisciplinaDto`;
- `UpdateDisciplinaDto`;
- Validação com `class-validator`;
- Transformação com `class-transformer`;
- `ValidationPipe` global;
- `whitelist`;
- `forbidNonWhitelisted`;
- `transform`;
- Validação de e-mail com `@IsEmail()`;
- `ParseIntPipe`;
- `NotFoundException`;
- Tratamento de `400 Bad Request`;
- Tratamento de `404 Not Found`;
- Resposta `204 No Content`;
- Atualização parcial com `PATCH`;
- `PartialType`;
- Camada Repository;
- `DatabaseModule`;
- `DatabaseService`;
- Pool de conexões;
- Persistência com MySQL;
- CRUD completo de disciplinas;
- Validação de nome e carga horária.

---

# 18. Versionamento e Organização das Branches

O projeto utiliza branches para separar as atividades desenvolvidas durante as aulas.

A atividade desta etapa foi desenvolvida na branch:

```text
branch_20260929
```

Esta branch foi criada a partir da:

```text
main
```

Fluxo utilizado:

```text
main
  │
  └── branch_20260929
          │
          ├── DTOs
          ├── validações
          ├── tratamento de erros
          ├── PATCH
          ├── Repository
          ├── MySQL
          ├── CRUD de disciplinas
          └── testes
```

O desenvolvimento utiliza Git para controle de versão e GitHub como repositório remoto.

---

# 19. Autor

**Nome:** Matheus Pessoa Telles de Oliveira  
**Unidade Curricular:** Programação Web 2  
**Instituição:** Senac RJ

GitHub:

```text
https://github.com/matheuspessoa14
```

LinkedIn:

```text
https://linkedin.com/in/matheuspessoa1816
```

---

# 20. Licença e Uso Acadêmico

Projeto desenvolvido para fins acadêmicos na Unidade Curricular de **Programação Web 2 — Senac RJ**.

O código poderá ser utilizado para avaliação e acompanhamento acadêmico durante o curso.