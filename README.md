# API Alunos — NestJS e MySQL

API RESTful desenvolvida durante a Unidade Curricular de **Programação Web 2 — Senac RJ**, utilizando **NestJS, TypeScript e MySQL** para gerenciamento de alunos.

---

# 1. Descrição

Este projeto consiste em uma API RESTful para gerenciamento de alunos.

A aplicação permite realizar operações de cadastro, consulta, atualização e exclusão de alunos, utilizando persistência de dados em banco **MySQL**.

Nesta etapa do projeto, os dados anteriormente armazenados em memória passaram a ser persistidos no banco de dados.

Cada aluno possui os seguintes dados:

```text
id
nome
email
curso
```

A aplicação foi organizada utilizando as camadas:

```text
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

---

# 2. Funcionalidades

A API possui as seguintes funcionalidades:

- Cadastro de alunos;
- Listagem de alunos;
- Consulta de aluno por ID;
- Atualização de alunos;
- Exclusão de alunos;
- Persistência dos dados em MySQL;
- Utilização de pool de conexões;
- Configuração do banco através de variáveis de ambiente;
- Encerramento adequado do pool de conexões através do ciclo de vida do NestJS.

---

# 3. Tecnologias Utilizadas

- **Node.js**
- **NestJS**
- **TypeScript**
- **MySQL**
- **mysql2**
- **@nestjs/config**
- **npm**
- **Git**
- **GitHub**

---

# 4. Arquitetura e Organização do Projeto

A aplicação utiliza uma arquitetura em camadas:

```text
Cliente
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
- `Service` — coordena as operações da aplicação;
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
└── alunos/
    ├── alunos.module.ts
    ├── alunos.controller.ts
    ├── alunos.service.ts
    └── alunos.repository.ts
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
CREATE DATABASE escola;
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
    email VARCHAR(150),
    curso VARCHAR(100) NOT NULL
);
```

A estrutura utilizada pela aplicação é:

```text
Aluno
├── id
├── nome
├── email
└── curso
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

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `GET` | `/alunos` | Lista todos os alunos |
| `GET` | `/alunos/:id` | Busca um aluno pelo ID |
| `POST` | `/alunos` | Cadastra um novo aluno |
| `PUT` | `/alunos/:id` | Atualiza um aluno |
| `DELETE` | `/alunos/:id` | Exclui um aluno |

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
  "curso": "Análise e Desenvolvimento de Sistemas"
}
```

Exemplo de resposta:

```json
{
  "id": 1,
  "nome": "Matheus",
  "email": "matheus@email.com",
  "curso": "Análise e Desenvolvimento de Sistemas"
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
  "curso": "ADS"
}
```

---

# 12. Persistência com MySQL

A aplicação utiliza o pacote `mysql2` para comunicação com o banco de dados.

O acesso ao banco é realizado através de um **pool de conexões**, permitindo que a aplicação reutilize conexões em vez de criar uma nova conexão para cada requisição.

O `DatabaseService` é responsável por gerenciar essa infraestrutura.

```text
AlunosRepository
       ↓
DatabaseService
       ↓
Connection Pool
       ↓
MySQL
```

O limite configurado para o pool é de 10 conexões.

---

# 13. Injeção de Dependência

O NestJS é responsável pela criação e injeção das dependências da aplicação.

O fluxo utilizado é:

```text
AlunosController
      ↓
AlunosService
      ↓
AlunosRepository
      ↓
DatabaseService
```

O `DatabaseModule` disponibiliza o `DatabaseService` para o `AlunosModule`.

O `AlunosModule`, por sua vez, registra:

```text
AlunosController
AlunosService
AlunosRepository
```

---

# 14. Encerramento do Pool

O `DatabaseService` implementa o lifecycle hook:

```text
OnModuleDestroy
```

Quando a aplicação é encerrada adequadamente, o pool de conexões também é finalizado.

O projeto utiliza:

```ts
app.enableShutdownHooks();
```

permitindo que o NestJS execute os lifecycle hooks durante o encerramento da aplicação.

---

# 15. Modelo de Dados

A entidade utilizada é:

```text
Aluno
├── id: number
├── nome: string
├── email: string
└── curso: string
```

No banco MySQL:

```text
alunos
├── id INT AUTO_INCREMENT PRIMARY KEY
├── nome VARCHAR(100) NOT NULL
├── email VARCHAR(150)
└── curso VARCHAR(100) NOT NULL
```

---

# 16. Testes Realizados

As operações da API foram testadas através de requisições HTTP.

Foram verificadas as seguintes operações:

```text
POST   /alunos
GET    /alunos
GET    /alunos/:id
PUT    /alunos/:id
DELETE /alunos/:id
```

Também foi realizada a compilação do projeto através de:

```bash
npm run build
```

---

# 17. Extras — Programação Web 2

Nesta etapa foram implementados:

- Persistência de dados com MySQL;
- Camada Repository;
- `DatabaseModule`;
- `DatabaseService`;
- Pool de conexões;
- Configuração através de `ConfigModule` e `ConfigService`;
- Variáveis de ambiente;
- Injeção de dependência entre módulos e providers;
- Lifecycle hook para encerramento do pool;
- Campo `email` na entidade aluno.

---

# 18. Versionamento e Organização das Branches

O projeto utiliza branches para separar as atividades desenvolvidas durante as aulas.

A atividade desta etapa foi desenvolvida na branch:

```text
branch_20260925_extra
```

Esta branch representa uma continuação da atividade anterior desenvolvida na:

```text
branch_20260922
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

---

# 20. Licença e Uso Acadêmico

Projeto desenvolvido para fins acadêmicos na Unidade Curricular de **Programação Web 2 — Senac RJ**.

O código poderá ser utilizado para avaliação e acompanhamento acadêmico durante o curso.