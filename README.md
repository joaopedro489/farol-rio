# farol.rio

### Feito por: João Pedro Cavalcante

## Descrição

O farol.rio é uma aplicação web para gerenciamento de crianças e alertas, construída com NestJS no backend e Next.js no frontend. A aplicação permite que os usuários visualizem um dashboard com resumos e gráficos, gerenciem crianças e seus alertas, e realizem login para acessar as funcionalidades. O backend é responsável por fornecer uma API RESTful para o frontend consumir, enquanto o frontend oferece uma interface de usuário moderna e responsiva.

## Tecnologias utilizadas

- **Backend**: NestJS (Node.js 20+), Prisma, Postgres 16, JWT, class-validator, Vitest
- **Frontend**: Next.js 16.2.4 com TypeScript (App Router), Tailwind CSS, Radix UI / shadcn/ui, React Query, react-hook-form + Zod, recharts, next-themes
- **Infra**: Docker, Vercel (frontend), Render (backend)

Eu escolhi trabalhar com NestJs para o backend por conta da sua estrutura modular e também por uma familiaridade prévia, o que me permitiu ser mais produtivo e focar nas regras de negócio.

No frontend optei por trabalhar com os componentes do shadcn/ui, para acelerar a construção da UI da aplicação.

E optei por trabalhar com um banco de dados relacional, sendo ele o Postgres, para facilitar a modelagem das entidades e relações, além de ser uma tecnologia madura e confiável para esse tipo de aplicação. O Prisma foi escolhido como ORM para acelerar o desenvolvimento e garantir tipagem de ponta a ponta nas queries.

## Decisões Técnicas e Trade-offs

- **Arquitetura do Backend**: Decidi seguir com uma arqutetura limpa (clean architecture) para o backend, organizando o código em módulos e separando as responsabilidades de cada camada:
  - **Controllers**: Responsáveis por lidar com as requisições HTTP e delegar as tarefas para os serviços.
  - **Services**: Contêm a lógica de negócio da aplicação, realizando operações e interagindo com os repositórios.
  - **Repositories**: Responsáveis por interagir com o banco de dados, utilizando o Prisma como ORM.
  - **Domain**: Contém as entidades e regras de negócio relacionadas ao domínio da aplicação, como as entidades de Child e Alert, além de erros específicos do domínio.

  Essa abordagem ajuda a manter o código organizado, modular e fácial de manter e escalar a aplicação a longo prazo.

  O trade-off, tenho consciência de que essa estrutura pode ser mais complexa e exigir mais tempo de desenvolvimento, especialmente para desenvolvedores que não estão familiarizados com esse tipo de arquitetura. Podendo ser considerada uma abordagem overkill para projetos menores ou com prazos muito apertados.

- **Gerenciamento de Estado no Frontend**: Optei pelo React Query para lidar com os dados assíncronos do frontend, já que ele resolve cache, sincronização e revalidação de forma muito mais elegante do que uma solução manual com `useEffect`. O trade-off é uma curva de aprendizado para quem não conhece a biblioteca, mas em uma aplicação que tende a crescer esse custo se paga rápido.

- **Autenticação na API**: Implementei JWT em todas as rotas, exceto a de login, já que a aplicação lida com dados sensíveis de crianças e alertas. No frontend optei por guardar o token no `localStorage` pela simplicidade de acesso. O trade-off é a exposição a XSS, em produção, o ideal seria usar `HttpOnly cookies` com refresh tokens.

- **Banco de Dados**: Optei pelo Postgres 16 pela robustez no trato de dados relacionais, com Prisma como ORM para ganhar tipagem ponta a ponta. Pelo prazo, coloquei os alertas (saúde, educação e assistência social) como colunas `JSON` direto na tabela de crianças e não implementei cache. O trade-off é uma modelagem menos normalizada, mas que ganhou flexibilidade e velocidade de entrega.

- **Context para o backend**: Optei por usar `AsyncLocalStorage` (via `async_hooks`) para propagar informações do usuário autenticado entre as camadas, sem precisar passá-las manualmente entre services e repositories. O trade-off é ser uma abordagem menos comum, que pode confundir quem não conhece `async_hooks`, mas ganha bastante em organização.

- **Testes Unitários**: Escrevi testes unitários das services e entities do backend com Vitest para garantir a estabilidade da lógica de negócio. Em contra partida é não ter cobertura de testes de componentes no frontend nem testes de integração/e2e, que ficaram de fora pelo prazo.

- **Visualizações no Dashboard**: Usei `recharts` para os gráficos do dashboard por ser uma lib leve, responsiva e fácil de integrar com componentes do React. Porém não foi possível implementar um mapa de calor para uma análise geográfica dos alertas por bairro devido ao prazo, o que seria um complemento interessante para a leitura dos dados.

- **Validação de Dados**: Validei os dados nas duas pontas: `class-validator` nos DTOs do backend e `react-hook-form` + `zod` no frontend. Mesmo com só o formulário de login, optei por já deixar a estrutura pronta para padronizar formulários futuros.

- **Tratamento de Erros**: No backend criei classes de erro personalizadas (ex: `UserNotFoundError`, `WrongPasswordError`, `ChildAlreadyReviewedError`) para deixar cada cenário explícito e fácil de mapear. No frontend, os erros são tratados de forma simples, com mensagens de feedback ao usuário quando algo dá errado.

- **Dockerfile no backend**: Optei por deixar o comando `npx prisma migrate reset --force` no `Dockerfile` para limpar o banco a cada build, garantindo um ambiente consistente para desenvolvimento e testes. Sei que isso não é ideal para produção, onde perderíamos os dados a cada deploy, e eu não optaria em manter esse comando em um Dockerfile de um projeto real mas para o contexto do desafio e desenvolvimento local, achei que valia a pena pela praticidade.

## URL de Deploy

- frontend: https://farol-rio.vercel.app/
- backend: https://farol-rio.onrender.com/

**Credenciais para login:**

- Email: tecnico@prefeitura.rio
- Senha: painel@2024

## Como executar o projeto localmente

**Tudo em Docker (recomendado):**

```
cd backend
cp .env.example .env
cd ../frontend
cp .env.example .env
cd ..
docker compose up -d --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:4000

**Dev sem Docker para os apps:**

```
docker compose up -d postgres

cd backend
yarn install
cp .env.example .env
yarn prisma:migrate
yarn seed
yarn start:dev

cd ../frontend
yarn install
cp .env.example .env
yarn dev
```

OBS.: para rodar o backend localmente, é necessário se atentar para a variável `DATABASE_URL` do `.env`, que deve apontar para o banco Postgres rodando no Docker (ex: `postgresql://root:password@localhost:5432/farol`).

## O que faria diferente com mais tempo

Com mais tempo, a primeira frente seria fechar as lacunas de qualidade e visualização: adicionar testes de componentes no frontend para cobrir os fluxos principais da interface (e não apenas a lógica do backend), e implementar um mapa de calor no dashboard para dar uma leitura geográfica dos alertas por bairro, complementando os gráficos atuais.

Também investiria em segurança e organização: trocaria o armazenamento do token de autenticação do `localStorage` por `HttpOnly cookies`, mitigando riscos de XSS, e reorganizaria os componentes do frontend em uma estrutura mais próxima do Atomic Design, o que facilitaria a manutenção e a escalabilidade da interface conforme o produto crescesse.

## Requisitos não obrigatórios implementados

- [x] **shadcn/ui** ([frontend/src/components/ui](frontend/src/components/ui)), acelerou a construção da UI com componentes acessíveis baseados em Radix UI e Tailwind CSS.
- [x] **Testes unitários no backend**, Vitest cobrindo services e entities (`yarn test` no diretório do backend).
- [ ] Testes de componentes no frontend (não implementado por falta de tempo).
- [x] **Deploy publicado**, frontend na Vercel e backend na Render.
- [x] **Visualizações**, gráficos e resumos no dashboard com `recharts`.
- [ ] Visualizações (mapa de calor), não implementado por falta de tempo.
- [x] **Dark mode**, Tailwind CSS + `next-themes`.
