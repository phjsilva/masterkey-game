# MasterKey — Catálogo de jogos

Aplicação full stack para descobrir, consultar e cadastrar jogos. O MasterKey reúne uma interface em português, busca por nome ou estúdio, filtros combinados e páginas de detalhes com informações sobre cada título.

O projeto utiliza Next.js no frontend, uma API REST com Express e PostgreSQL para persistência, com execução integrada pelo Docker Compose.

## Funcionalidades

- **Exploração do catálogo:** busca por nome ou estúdio, sem distinção de maiúsculas e acentos.
- **Filtros combinados:** seleção por gênero, plataforma e jogos em destaque.
- **Ordenação e paginação:** ordem alfabética ou por lançamento, com 12 jogos por página e parâmetros preservados na URL.
- **Detalhes do jogo:** capa, descrição, estúdio, lançamento, plataformas, gêneros e requisitos de sistema quando cadastrados.
- **Cadastro pela interface:** formulário com validação, mensagens em português e redirecionamento para a página do jogo criado.
- **Gerenciamento pela API:** criação, consulta, atualização e exclusão de jogos, incluindo destaques descritivos e requisitos.
- **Conteúdo demonstrativo:** seed opcional com sete jogos e imagens locais.

## Tecnologias

| Camada | Tecnologias |
| --- | --- |
| Interface | Next.js 15, React 18, TypeScript, Tailwind CSS e Lucide React |
| API | Node.js, Express e JavaScript com ES Modules |
| Persistência | PostgreSQL 17 e Prisma ORM 6 |
| Infraestrutura local | Docker e Docker Compose |
| Qualidade | ESLint, TypeScript e testes com o executor nativo do Node.js |

## Executar com Docker

Tenha o Docker com suporte ao Compose instalado e em execução. No Windows, utilize o Docker Desktop com containers Linux.

Na raiz do projeto:

```sh
docker compose up --build -d
```

O Compose inicia o banco, aplica as migrations, inicia a API e disponibiliza o frontend. Os serviços possuem verificações de saúde para coordenar a inicialização.

### Endereços de acesso

Sem personalização no `.env`, o Compose utiliza:

| Serviço | Endereço |
| --- | --- |
| Aplicação | [localhost:3002](http://localhost:3002) |
| Catálogo da API | [localhost:3001/games/todos](http://localhost:3001/games/todos) |
| Saúde da API e do banco | [localhost:3001/health](http://localhost:3001/health) |
| PostgreSQL | `localhost:5434` |

As portas são publicadas apenas na máquina local. O banco e o usuário padrão são `masterkey`, com senha local padrão `masterkey_local`.

Para personalizar, crie um `.env` na raiz usando `.env.example` como referência. **O exemplo define `FRONTEND_PORT=3000`**; com esse valor, a aplicação fica em [localhost:3000](http://localhost:3000). Um `.env` existente também pode alterar os endereços acima.

| Variável na raiz | Finalidade | Padrão do Compose |
| --- | --- | --- |
| `FRONTEND_PORT` | Porta da aplicação no host | `3002` |
| `BACKEND_PORT` | Porta da API no host | `3001` |
| `DATABASE_PORT` | Porta do PostgreSQL no host | `5434` |
| `POSTGRES_PASSWORD` | Senha do banco local | `masterkey_local` |

A senha é usada na URL de conexão do backend e deve ser compatível com esse formato.

### Dados de demonstração

O banco inicia vazio. Depois que os serviços estiverem prontos, execute:

```sh
docker compose exec backend npm run db:seed
```

O seed adiciona sete jogos somente quando o catálogo está vazio. Se já houver jogos, o comando preserva o conteúdo existente.

### Comandos úteis

```sh
# Consultar o estado dos serviços
docker compose ps

# Acompanhar os logs
docker compose logs -f

# Reconstruir e iniciar após alterações no código
docker compose up --build -d

# Parar os serviços
docker compose down
```

Os dados permanecem no volume `postgres_data` após a parada. O comando `docker compose down -v` também remove o volume e apaga o banco local.

## Desenvolvimento local

Para executar frontend e backend fora dos containers, utilize Node.js 22.6 ou superior e npm. Os containers do projeto utilizam Node.js 22.

Inicie apenas o banco na raiz:

```sh
docker compose up -d database
```

Crie `backend/.env` com a configuração local:

```dotenv
DATABASE_URL=postgresql://masterkey:masterkey_local@localhost:5434/masterkey?schema=public
PORT=3001
CORS_ORIGIN=http://localhost:3002
```

Se tiver personalizado a porta ou a senha do banco, ajuste `DATABASE_URL` para corresponder à configuração do Compose.

Em um terminal, inicie a API:

```sh
cd backend
npm ci
npm run prisma:generate
npm run db:migrate
npm run dev
```

Crie `frontend/.env`:

```dotenv
API_URL=http://localhost:3001
```

Em outro terminal, a partir da raiz, inicie a interface:

```sh
cd frontend
npm ci
npm run dev -- --port 3002
```

Acesse [localhost:3002](http://localhost:3002). O frontend utiliza o modo de desenvolvimento do Next.js, e o backend reinicia com o `node --watch`.

Para preencher um banco vazio nesse modo, execute `npm run db:seed` na pasta `backend`.

## Organização do projeto

```text
masterkey-game-store/
├── frontend/
│   ├── src/
│   │   ├── app/                 # Páginas, layouts e ação de cadastro
│   │   ├── components/          # Catálogo, detalhes, formulário e interface
│   │   ├── lib/                 # Acesso à API e regras do catálogo
│   │   └── types/               # Tipos dos jogos
│   ├── public/                  # Imagens e arquivos estáticos
│   └── tests/                   # Testes do catálogo e do formulário
├── backend/
│   ├── src/
│   │   ├── routes/              # Rotas HTTP
│   │   ├── controllers/         # Entrada e saída das requisições
│   │   ├── services/            # Regras de negócio
│   │   ├── repositories/        # Consultas e persistência com Prisma
│   │   ├── validators/          # Validação dos dados recebidos
│   │   └── middlewares/         # Tratamento de requisições e erros
│   ├── prisma/                 # Schema, migrations e seed
│   ├── scripts/                # Utilitários de manutenção
│   └── test/                   # Testes da API
├── compose.yaml
└── package.json                # Atalhos para execução e verificação
```

O Next.js consulta a API no servidor e aplica busca, filtros, ordenação e paginação sobre os dados do catálogo. O cadastro utiliza uma Server Action para enviar o formulário à API e atualizar a interface. No backend, rotas, validação, regras de negócio e persistência ficam organizadas em camadas.

## API REST

URL base local: `http://localhost:3001`.

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/health` | Verifica a API e a conexão com o PostgreSQL |
| `GET` | `/games/todos` | Retorna todo o catálogo |
| `GET` | `/games?limit=9` | Retorna uma lista limitada de jogos |
| `GET` | `/games/destaques` | Lista jogos em destaque |
| `GET` | `/games/recentes` | Lista jogos por data de lançamento decrescente |
| `GET` | `/games/genero/:genre` | Filtra jogos pelo gênero informado |
| `GET` | `/games/:id` | Retorna um jogo com seus destaques e requisitos |
| `POST` | `/games` | Cadastra um jogo |
| `PATCH` | `/games/:id` | Atualiza um jogo |
| `DELETE` | `/games/:id` | Exclui um jogo e suas relações |

O parâmetro `limit`, nas listagens que o aceitam, deve ser um inteiro entre 1 e 100. A rota `/games/todos` retorna a coleção completa.

### Exemplo de cadastro

Envie uma requisição `POST /games` com `Content-Type: application/json` e o corpo:

```json
{
  "name": "Ecos do Amanhã",
  "description": "Explore um mundo de fantasia e descubra os segredos de uma civilização perdida.",
  "empresa": "Estúdio Horizonte",
  "genre": ["Aventura", "RPG"],
  "plataforma": ["PC"],
  "lancamento": "2026-10-06",
  "destaque": true
}
```

Os campos obrigatórios são `name`, `description`, `empresa`, `genre`, `plataforma` e `lancamento`. O exemplo usa dados fictícios.

Também são aceitos `title`, `destaque`, `size`, `rawgImageUrl`, `giantbombImageUrl`, `highlightsTitle`, `highlights`, `requirements`, `closingDescription` e `finalNote`. Campos desconhecidos são rejeitados. Ao enviar `highlights` ou `requirements` em uma atualização, a lista correspondente é substituída; um array vazio remove os itens dessa relação.

A criação retorna `201`, a exclusão retorna `204`, e as respostas de erro incluem mensagens em português. As operações de escrita estão disponíveis sem autenticação.

## Verificação e testes

Com as dependências locais instaladas e o cliente Prisma gerado, execute na raiz:

```sh
# Sintaxe do backend, lint e build do frontend
npm run check

# Busca, filtros, ordenação, paginação e tratamento do formulário
npm --prefix frontend test
```

Para executar os testes da API com os serviços Docker iniciados:

```sh
docker compose exec backend npm test
```

Os testes do backend verificam validação, respostas de erro e integração com PostgreSQL, incluindo CRUD, filtros, relações e exclusão em cascata. O teste de integração cria e remove um registro próprio e depende de `DATABASE_URL`; sem essa variável, ele é ignorado.

## Scripts da raiz

| Comando | Função |
| --- | --- |
| `npm run up` | Constrói as imagens e inicia os serviços em segundo plano |
| `npm run down` | Para os serviços preservando o volume do banco |
| `npm run logs` | Acompanha os logs dos serviços |
| `npm run seed` | Executa o seed no container do backend |
| `npm run check` | Verifica a sintaxe da API, executa lint e gera o build do frontend |
