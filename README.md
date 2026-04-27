# farol.rio

### Feito por: João Pedro Cavalcante

## Descrição

O farol.rio é uma aplicação web para gerenciamento de crianças e alertas, construída com NestJS no backend e Next.js no frontend. A aplicação permite que os usuários visualizem um dashboard com resumos e gráficos, gerenciem crianças e seus alertas, e realizem login para acessar as funcionalidades. O backend é responsável por fornecer uma API RESTful para o frontend consumir, enquanto o frontend oferece uma interface de usuário moderna e responsiva.

## Tecnologias utilizadas

- **Backend**: NestJS (Node.js 20+), Prisma, Postgres 16, JWT, class-validator, Vitest
- **Frontend**: Next.js 16.2.4 com TypeScript (App Router), Tailwind CSS, Radix UI / shadcn/ui, React Query, react-hook-form + Zod, recharts, next-themes
- **Infra**: Docker, Vercel (frontend), Render (backend)

A escolha por NestJS e Next.js se deu pela familiaridade e rapidez de desenvolvimento, além da robustez e escalabilidade que ambos oferecem. O NestJS é um framework backend moderno e modular, que facilita a organização do código e a aplicação de boas práticas como injeção de dependência e separação de camadas, pontos importantes para um projeto que pretende crescer de forma sustentável. O Next.js, por sua vez, é uma das melhores opções para desenvolvimento frontend com React, oferecendo renderização híbrida (SSR/SSG), App Router e uma ótima experiência de desenvolvimento, o que ajuda tanto na produtividade quanto na qualidade final da entrega.

Para o armazenamento de dados, foi escolhido o Postgres 16 pela confiabilidade no manuseio de dados relacionais e por ser uma tecnologia madura e amplamente suportada, junto com ele, o Prisma é usado como ORM para acelerar o desenvolvimento e tipar as queries. Há também um arquivo de seed (`backend/prisma/seed/create.ts`) que popula o banco com dados utilizando o arquivo `backend/prisma/seed/data/seed.json`. No frontend, os componentes foram construídos com a ajuda do shadcn/ui, biblioteca baseada em Radix UI e Tailwind CSS, que oferece componentes pré-estilizados e acessíveis, o que acelerou a montagem da interface e garantiu uma boa experiência ao usuário final. Por fim, a aplicação foi containerizada com Docker para manter consistência entre ambientes; o backend ficou hospedado na Render e o frontend na Vercel, ambos serviços modernos e confiáveis para aplicações web.

## Decisões Técnicas e Trade-offs

- **Arquitetura do Backend**: Decidi seguir com uma arqutetura limpa (clean architecture) para o backend, organizando o código em módulos e separando as responsabilidades de cada camada:
  - **Controllers**: Responsáveis por lidar com as requisições HTTP e delegar as tarefas para os serviços.
  - **Services**: Contêm a lógica de negócio da aplicação, realizando operações e interagindo com os repositórios.
  - **Repositories**: Responsáveis por interagir com o banco de dados, utilizando o Prisma como ORM.
  - **Domain**: Contém as entidades e regras de negócio relacionadas ao domínio da aplicação, como as entidades de Child e Alert, além de erros específicos do domínio.

  Essa abordagem ajuda a manter o código organizado, modular e fácial de manter e escalar a aplicação a longo prazo.

  O trade-off, tenho consciência de que essa estrutura pode ser mais complexa e exigir mais tempo de desenvolvimento, especialmente para desenvolvedores que não estão familiarizados com esse tipo de arquitetura. Podendo ser considerada uma abordagem overkill para projetos menores ou com prazos muito apertados.

- **Gerenciamento de Estado no Frontend**: Optei pelo React Query para o estado relacionado a dados assíncronos no frontend, já que ele resolve cache, sincronização, revalidação e refetch de forma muito mais elegante do que uma solução manual com `useEffect`. Isso melhora a performance percebida e a experiência do usuário, principalmente em telas como o dashboard que dependem de várias chamadas. O trade-off é uma camada extra de complexidade e uma curva de aprendizado para quem não conhece a biblioteca, mas em uma aplicação que tende a crescer esse custo se paga rápido.

- **Autenticação na API**: Implementei autenticação JWT em todas as rotas da API, com exceção da rota de login. Como a aplicação lida com dados sensíveis relacionados a crianças e alertas, achei importante garantir que apenas usuários autenticados consigam acessar as funcionalidades. No frontend, optei por armazenar o token no `localStorage` por simplicidade e por facilitar o acesso em diferentes partes da aplicação. Embora seja conveniente, essa abordagem expõe o token a possíveis ataques XSS, em um cenário de produção real, o ideal seria armazená-lo em `HttpOnly cookies`, possivelmente combinados com refresh tokens, para mitigar esse risco.

- **Banco de Dados**: Optei pelo Postgres 16 pela robustez e confiabilidade no trato de dados relacionais, com o Prisma como ORM para acelerar o desenvolvimento e ganhar tipagem de ponta a ponta nas queries. Devido ao tempo limitado e ao escopo do teste técnico, não foi implementada uma camada de cache, o que poderia ajudar em cenários de carga maior. Além disso, a modelagem do banco poderia ser mais normalizada: optei por colocar os alertas (saúde, educação e assistência social) diretamente na tabela de crianças como colunas `JSON`. Não é a melhor abordagem para um cenário real de produção, mas foi uma decisão pragmática para entregar dentro do prazo, mantendo flexibilidade na estrutura dos alertas.

- **Context para o backend**: Optei por utilizar Context com a lib `async_hooks` (via `AsyncLocalStorage`) para gerenciar informações do usuário autenticado e outros dados relevantes ao longo da execução de uma request. Isso permite acessar essas informações em qualquer camada da aplicação sem precisar passá-las manualmente como parâmetro entre services e repositories, mantendo as assinaturas mais limpas. Para isso, criei um serviço de Context injetado no backend que expõe os dados da request de forma segura. É uma abordagem que algumas pessoas podem considerar avançada, especialmente quem não conhece `async_hooks`, mas acredito que os ganhos em organização compensam a curva de aprendizado.

- **Testes Unitários**: Implementei testes unitários para as services e entities do backend usando Vitest, o que ajuda a garantir a qualidade do código, prevenir regressões e facilitar a manutenção a longo prazo. Pela limitação de tempo, não foi possível adicionar testes de componentes no frontend, o que seria uma melhoria importante para garantir a confiabilidade da interface, fica como uma das principais evoluções pendentes. Entendo que o ideal seria ter uma cobertura de testes mais abrangente, incluindo testes de integração e end-to-end, mas optei por focar nos testes unitários do backend para garantir a estabilidade da lógica de negócio.

- **Visualizações no Dashboard**: O dashboard inclui gráficos e resumos para fornecer uma visão geral dos dados de crianças e alertas. Utilizei a biblioteca `recharts` para criar gráficos interativos e responsivos, que ajudam o usuário a entender melhor as informações apresentadas. Por questão de tempo, não foi possível implementar um mapa de calor, que daria uma análise geográfica mais detalhada dos alertas por bairro.

- **Validação de Dados**: A validação acontece tanto no backend quanto no frontend para garantir consistência dos dados. No backend, uso `class-validator` nos DTOs para validar os payloads das requisições. No frontend, uso `react-hook-form` em conjunto com `zod` (via `@hookform/resolvers`) para gerenciar os formulários e validar os campos com schemas tipados. Mesmo com apenas o formulário de login, optei por já deixar essa estrutura pronta para padronizar futuros formulários e evitar problemas de integridade.

-**Tratamento de Erros**: No backend, implementei um tratamento de erros consistente, utilizando classes de erro personalizadas para diferentes cenários (ex: `UserNotFoundError`, `WrongPasswordError`, `ChildAlreadyReviewedError`). Isso ajuda a manter o código mais organizado e facilita a identificação e resolução de problemas. No frontend, os erros são tratados de forma simples, exibindo mensagens de feedback para o usuário quando algo dá errado, como falha no login ou problemas ao carregar os dados do dashboard.

## URL de Deploy

- frontend: https://farol-rio.vercel.app/
- backend: https://farol-rio.onrender.com/

**Credenciais para login:**

- Email: tecnico@prefeitura.rio
- Senha: painel@2024

## Como executar o projeto localmente

**Tudo em Docker (recomendado):**

```
cp .env.example .env
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
