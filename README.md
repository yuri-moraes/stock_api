### README Back-End

# Projeto Stock API

O projeto "Stock API" tem como objetivo ser uma aplicação web para controle de estoque de itens, implementando métodos CRUD para entidades de usuários e itens. O administrador é responsável por gerenciar contas de usuários e atualizar os itens, enquanto um usuário comum pode apenas realizar login, alterar a senha, criar e visualizar itens.

Acesse a aplicação através do seguinte link: [Clique aqui](https://react-stock-jph97vote-yurimoraes-projects.vercel.app/#/)

## Endpoints da API

A API foi desenvolvida com Node.js e Express, utilizando PostgreSQL como banco de dados. Abaixo estão os principais endpoints da API para gerenciar usuários e itens de estoque:

### **Usuários**

- **POST /users/register**: Registra um novo usuário.  
- **POST /users/login**: Realiza o login do usuário e retorna um token JWT.  
- **GET /users/**: (Protegido) Lista todos os usuários cadastrados.  
- **GET /users/:id**: (Protegido) Busca um usuário pelo ID.  
- **PUT /users/edit/:id**: (Protegido) Atualiza as informações de um usuário.  
- **DELETE /users/:id**: (Protegido) Deleta um usuário pelo ID.  

### **Itens de Estoque**

- **POST /items/new**: Cria um novo item de estoque.  
- **GET /items/**: Lista todos os itens disponíveis no estoque.  
- **GET /items/:id**: Busca um item pelo ID.  
- **PUT /items/:id/update**: (Protegido) Atualiza as informações de um item de estoque.  
- **DELETE /items/:id**: (Protegido) Deleta um item pelo ID.  
- **PATCH /items/:id/add**: (Protegido) Adiciona quantidade ao estoque de um item.  
- **PATCH /items/:id/subt**: Remove quantidade do estoque de um item.  

## Tecnologias Utilizadas

- **Node.js**: Plataforma para execução de JavaScript no servidor.
- **Express**: Framework web para Node.js.
- **Sequelize**: ORM para Node.js utilizado para interagir com o banco de dados PostgreSQL.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.
- **JWT (JSON Web Token)**: Utilizado para autenticação e autorização de usuários.

## Instalação e Configuração

1. **Clone o repositório**:

```bash
git clone https://github.com/yuri-moraes/stock_api.git
```

2. **Instale as dependências**:

```bash
npm install
```

3. **Configuração do Banco de Dados**:

   Configure suas variáveis de ambiente no arquivo `.env` com os detalhes de conexão do PostgreSQL:

   ```env
   POSTGRES_URL=postgres://usuario:senha@host:porta/database
   JWT_SECRET=sua_chave_secreta
   ```

4. **Execute as migrações do banco de dados**:

```bash
npx sequelize-cli db:migrate
```

5. **Inicie a aplicação**:

```bash
npm run api
```

## Autores

- [@yuri-moraes](https://www.github.com/yuri-moraes)
- [@marcos90s](https://github.com/marcos90s/stock_api)

## Contribuindo

Contribuições são sempre bem-vindas!

Como temos poucas contribuições, todos os `pull-requests` serão analisados e, se sua `contribuição` for impactante, tenha certeza de que a adotaremos.

Por favor, siga o `Objetivo` deste projeto conforme descrito na seção `Título`.
