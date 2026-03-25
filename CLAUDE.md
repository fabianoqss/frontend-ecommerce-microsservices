# Design System Rules — frontend-microsservice-ecommerce

These rules guide implementation of Figma designs into this codebase. Follow them on every Figma-driven change.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 19 + TypeScript (strict) |
| Bundler | Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router DOM v7 |
| Data Fetching | TanStack Query v5 + Axios |
| State | Zustand v5 |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |

---

## Project Structure

```
src/
  components/   # Reusable UI components (PascalCase.tsx)
  pages/        # One component per route (e.g. LoginPage.tsx)
  api/          # Axios API functions, one file per domain
  store/        # Zustand stores, one file per domain
  types/        # Shared TypeScript interfaces and types
  App.tsx       # Route definitions
  index.css     # Global styles + Tailwind import
  main.tsx      # Entry point
```

---

## Component Rules

- Place reusable UI components in `src/components/`
- Place page-level components in `src/pages/` — one file per route
- Use PascalCase for file and component names (`ProductCard.tsx`, not `product-card.tsx`)
- Export components as `export default ComponentName`
- Define prop types as a TypeScript `interface` directly above the component

```tsx
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'ghost';
  onClick?: () => void;
}

const Button = ({ label, variant = 'primary', onClick }: ButtonProps) => { ... }

export default Button;
```

---

## Styling Rules

- IMPORTANT: Use Tailwind CSS utility classes for ALL styling — no inline styles, no CSS modules
- The project uses Tailwind CSS v4; do NOT use `tailwind.config.js` for custom tokens — extend via CSS in `src/index.css` using `@theme` if needed
- Base theme is **dark**: `bg-slate-950` background, `text-slate-50` text
- Color palette conventions:
  - Backgrounds: `slate-950`, `slate-900`, `slate-800`
  - Borders: `slate-800`, `slate-700`, `white/10`
  - Primary actions (buttons, links, focus rings): `sky-600` / `sky-500` or `blue-600` / `blue-500`
  - Muted text: `slate-400`
  - Accent / labels: `blue-400`, `sky-400`
- IMPORTANT: Never hardcode hex color values — always use Tailwind color utilities
- Use `transition`, `hover:`, `focus:`, `active:` variants for interactive states
- Use `focus:outline-none focus:ring-2 focus:ring-sky-500/40` pattern for accessible focus rings

---

## Icon Rules

- IMPORTANT: Use only icons from `lucide-react` — do NOT install other icon libraries
- Import icons by name: `import { ShoppingCart, User } from 'lucide-react'`
- Control size with the `size` prop: `<ShoppingCart size={18} />`

---

## Routing

- Routes are defined in `src/App.tsx` using React Router DOM v7
- Use `<BrowserRouter>` + `<Routes>` + `<Route>` pattern
- Page components are imported from `src/pages/`
- Route paths use PascalCase for page names: `/ProductCatalog`

---

## Data Fetching

- HTTP calls go in `src/api/` using Axios
- Wrap API calls with TanStack Query (`useQuery`, `useMutation`) inside page or component hooks
- Do NOT fetch data directly inside components — use custom hooks or query hooks

---

## State Management

- Global state goes in `src/store/` using Zustand
- One store file per domain (e.g. `cartStore.ts`, `authStore.ts`)

---

## Forms

- Use React Hook Form + Zod for all user-input forms
- Define Zod schemas alongside the form component
- Use `@hookform/resolvers/zod` for schema integration

---

## Asset Handling

- IMPORTANT: If the Figma MCP server returns a `localhost` source for an image or SVG, use that source directly — do NOT create placeholders
- IMPORTANT: Do NOT import or install new icon packages — use Lucide React
- Store static assets in `public/`

---

## Figma MCP Integration — Required Flow

Follow these steps for every Figma-driven implementation. Do not skip.

1. **`get_design_context`** — fetch the structured representation for the exact node(s) using the `fileKey` and `nodeId` from the Figma URL
2. If the response is too large, use **`get_metadata`** to get the node map first, then re-fetch only the needed nodes
3. **`get_screenshot`** — get the visual reference for the variant being implemented
4. Only after both steps above, begin implementation
5. Translate the MCP output (React + Tailwind) into this project's conventions:
   - Replace any hardcoded hex values with Tailwind slate/sky/blue utilities
   - Reuse existing components from `src/components/` instead of creating duplicates
   - Replace any `styled-components` or CSS Modules patterns with Tailwind classes
   - Replace any icon library other than Lucide React
   - Adapt data-fetching to use TanStack Query + Axios pattern
   - Adapt any global state to use Zustand
6. **Validate visually** against the Figma screenshot for 1:1 parity before marking complete

---

## TypeScript Rules

- Strict mode is enabled — no `any`, no unused variables/parameters
- Use `interface` for component props, `type` for unions and utility types
- Use `import type` for type-only imports

---

## Accessibility

- All interactive elements must have accessible labels (`aria-label`, `htmlFor`, etc.)
- Use semantic HTML elements (`<main>`, `<section>`, `<header>`, `<form>`, `<button>`)
- Focus rings must be visible — use `focus:ring-2 focus:ring-sky-500/40`
