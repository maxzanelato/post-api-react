# Postly — React + Vite + TypeScript

Aplicação de exemplo para listar, consultar e criar posts usando a API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com).

## Começar

Requer Node.js 20.19+ ou 22.12+ (compatível com Vite 7).

```bash
npm install
npm run dev
```

Outros comandos:

```bash
npm run typecheck
npm run build
npm run preview
```

## Rotas

- `/` — lista virtualizada de posts, busca local e navegação para detalhes.
- `/posts/:postId` — detalhe de um post.
- `/posts/new` — formulário de criação validado com Zod.

## Estrutura

```text
src/
├── components/       # Componentes reutilizáveis e estilos por CSS Modules
├── hooks/            # Hooks de queries, mutation, formulário e erros
├── interfaces/       # Contratos TypeScript compartilhados
├── pages/            # Componentes de rota carregados sob demanda
├── schemas/          # Schemas e validação Zod
├── services/         # Chamadas HTTP feitas com fetch + async/await
├── styles/           # Estilos globais e tokens visuais
├── utils/            # Helpers sem responsabilidade de UI
├── App.tsx
└── main.tsx
```

## Decisões técnicas

- **TanStack Query** controla cache, loading, erros, deduplicação e a mutation de criação.
- **TanStack Virtual (`useWindowVirtualizer`)** renderiza somente os cards visíveis durante o scroll da página.
- **Zod** valida tanto o formulário quanto os dados retornados pela API. Respostas incompatíveis geram erro em vez de entrar no cache como dados válidos.
- **React Router + `React.lazy`/`Suspense`** divide as páginas em chunks carregados sob demanda.
- **React Hook Form não foi adicionado**: o formulário é pequeno e seu estado controlado fica em um custom hook, evitando dependências e mantendo a lógica fora da página.
- **Não há Zustand/Context extra**: o cache compartilhado já é gerido pelo TanStack Query e não existe outro estado global que justifique uma store.
- **`useDeferredValue`** ajuda a manter a digitação responsiva quando a filtragem da lista fica mais custosa.
- **`AbortSignal`** do TanStack Query é repassado ao `fetch`, permitindo cancelar requisições obsoletas.
- A aplicação não carrega imagens externas; o lazy loading relevante aqui é o das páginas/rotas. Não foi adicionada mídia artificial apenas para aplicar lazy loading.

## Nota sobre POST no JSONPlaceholder

O `POST /posts` responde com um post criado ficticiamente (normalmente com `id: 101`), mas o JSONPlaceholder **não persiste** esse dado no servidor. Para que a experiência continue coerente, a mutation insere a resposta no cache da lista durante a sessão. Ao recarregar a página, o item criado pode desaparecer porque o servidor de demonstração não o armazenou.
