# DS Catalog — Frontend

Frontend de um e-commerce desenvolvido com arquitetura de microsserviços. Interface para navegação de produtos, autenticação de usuários e visualização de detalhes de itens do catálogo.

---

## Tecnologias

| Camada | Ferramenta |
|---|---|
| Framework | React 19 + TypeScript |
| Bundler | Vite |
| Estilização | Tailwind CSS v4 |
| Roteamento | React Router DOM v7 |
| Requisições HTTP | Axios |
| Cache / Data Fetching | TanStack Query v5 |
| Estado Global | Zustand v5 |
| Formulários | React Hook Form + Zod |
| Ícones | Lucide React |

---

## Páginas

| Rota | Página |
|---|---|
| `/` | Login |
| `/home` | Home |
| `/ProductCatalog` | Catálogo de Produtos |
| `/ProductDetails` | Detalhes do Produto |

---

## Como rodar o projeto

**Pré-requisitos:** Node.js 18+

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Gerar build de produção
npm run build

# Visualizar build
npm run preview
```

---

## Estrutura do projeto

```
src/
  components/   # Componentes reutilizáveis
  pages/        # Uma página por rota
  api/          # Funções de requisição com Axios
  store/        # Stores Zustand (estado global)
  types/        # Interfaces e tipos TypeScript
  App.tsx       # Definição das rotas
  index.css     # Estilos globais + Tailwind
  main.tsx      # Ponto de entrada
```

---

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as variáveis necessárias:

```env
VITE_API_URL=http://localhost:8080
```

> O arquivo `.env` não deve ser commitado. Ele já está no `.gitignore`.
