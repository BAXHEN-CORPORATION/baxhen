---
name: react-patterns
description: Enforces component, hook, state, styling, and Next.js App Router patterns for this project. Triggers when writing React components, custom hooks, Zustand stores, TanStack Query hooks, or any Next.js App Router file (layout, page, loading, route handler).
user-invocable: true
---

# React Patterns

You are an expert React/Next.js engineer on this project. Before writing any component, hook, or page — apply every rule below. No exceptions.

## Quick Dependency Setup

If any of these are missing from package.json, install them before writing code that uses them:

```bash
pnpm add zustand @tanstack/react-query clsx tailwind-merge
pnpm add -D @tanstack/react-query-devtools
```

Create `lib/utils.ts` with the `cn` utility if it doesn't exist:

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## 1. Component Patterns

### Rules
- Functional components only — never class components
- Named exports always — never `export default` from the component file
- Props as a TypeScript `interface`, never inline type
- Destructure props in the function signature
- Use `React.FC` only when the component accepts `children`

### Correct

```tsx
// components/Button/Button.tsx
interface ButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

export function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  )
}
```

```tsx
// With children
import type React from "react"

interface CardProps {
  title: string
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({ title, children }) => (
  <div>
    <h2>{title}</h2>
    {children}
  </div>
)
```

### Wrong

```tsx
// ❌ export default
export default function Button({ label }) { ... }

// ❌ inline type
export function Button({ label }: { label: string }) { ... }

// ❌ class component
class Button extends React.Component { ... }

// ❌ React.FC without children
export const Button: React.FC<ButtonProps> = ({ label }) => { ... }
```

---

## 2. File Structure

Every component gets its own folder:

```
components/
  Button/
    index.ts              ← re-export only
    Button.tsx            ← component
    Button.test.tsx       ← tests
    Button.module.css     ← scoped styles (only if Tailwind is insufficient)
```

`index.ts` barrel — re-export only, no logic:

```ts
export { Button } from "./Button"
export type { ButtonProps } from "./Button"  // if type is exported
```

Import via path alias:

```ts
import { Button } from "@/components/Button"
```

Project root directories (no `src/`):

```
app/          ← Next.js App Router pages/layouts
components/   ← shared UI components
hooks/        ← custom hooks
stores/       ← Zustand stores
lib/          ← utilities (cn, api client, etc.)
```

---

## 3. State Management

| Scope | Tool | Location |
|---|---|---|
| Local UI state (simple) | `useState` | inside component |
| Local complex state | `useReducer` | inside component |
| Global client state | Zustand | `stores/use[Feature]Store.ts` |
| Server / async data | TanStack Query | `hooks/use[Feature].ts` |

### Zustand store pattern

```ts
// stores/useAuthStore.ts
import { create } from "zustand"

interface AuthState {
  user: User | null
  token: string | null
  login: (user: User, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  login: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null }),
}))
```

### TanStack Query — client-side fetching

```ts
// hooks/useProducts.ts
import { useQuery } from "@tanstack/react-query"

interface UseProductsResult {
  products: Product[]
  isLoading: boolean
  error: Error | null
}

export function useProducts(): UseProductsResult {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetch("/api/products").then((r) => r.json()),
  })

  return {
    products: data ?? [],
    isLoading,
    error: error as Error | null,
  }
}
```

### Rules
- Never use Redux
- Never use Context API for server-cached data
- Never fetch inside a component body — always in a hook or server component

---

## 4. Styling

### Rules
- Tailwind CSS v4 utility classes — primary styling method
- No inline styles except truly dynamic values (e.g., `style={{ width: percent + "%" }}`)
- Use `cn()` from `@/lib/utils` for conditional class merging
- Design tokens live in `app/globals.css` under `@theme inline` — not in a config file (Tailwind v4)

### Correct

```tsx
import { cn } from "@/lib/utils"

interface BadgeProps {
  label: string
  variant?: "default" | "success" | "danger"
}

export function Badge({ label, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "success" && "bg-green-100 text-green-800",
        variant === "danger" && "bg-red-100 text-red-800",
        variant === "default" && "bg-gray-100 text-gray-800"
      )}
    >
      {label}
    </span>
  )
}
```

### Wrong

```tsx
// ❌ inline styles for static values
<div style={{ display: "flex", gap: "8px" }}>

// ❌ string concatenation for conditional classes
<div className={"base " + (active ? "active" : "")}>

// ❌ tailwind.config.ts — doesn't exist in this project (Tailwind v4)
```

### Adding theme tokens (Tailwind v4)

Edit `app/globals.css`:

```css
@theme inline {
  --color-brand: #6366f1;
  --spacing-section: 4rem;
}
```

Then use as `text-brand`, `py-section`, etc.

---

## 5. Custom Hooks

### Rules
- Live in `hooks/` at project root
- Naming: `use[Feature]` — e.g., `useAuth`, `useProducts`, `useModal`
- Return a typed **object**, never a tuple (unless mimicking useState exactly)
- Always expose `isLoading`, `error`, `data` when async

### Correct

```ts
// hooks/useModal.ts
import { useState, useCallback } from "react"

interface UseModalResult {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

export function useModal(initialState = false): UseModalResult {
  const [isOpen, setIsOpen] = useState(initialState)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((s) => !s), [])
  return { isOpen, open, close, toggle }
}
```

### Wrong

```ts
// ❌ returns array (unless it's a direct useState wrapper)
export function useModal() {
  return [isOpen, setIsOpen]
}

// ❌ lives inside component file
// ❌ missing loading/error for async hooks
```

---

## 6. Next.js App Router

### Server vs Client Components

```
Server Component (default — no directive needed):
  - Data fetching, DB queries, secret env vars
  - No useState, useEffect, event handlers
  - Can be async

Client Component ("use client" at top):
  - useState, useEffect, useReducer, custom hooks
  - Event handlers (onClick, onChange)
  - Browser APIs (window, localStorage)
  - TanStack Query hooks
```

### When to add "use client"

```tsx
// ✅ needs "use client" — has state + event handler
"use client"

import { useState } from "react"

export function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

```tsx
// ✅ stays server component — just renders data
// app/products/page.tsx
import { db } from "@/lib/db"

export default async function ProductsPage() {
  const products = await db.product.findMany()
  return <ProductList products={products} />
}
```

### App Router file conventions

```
app/
  layout.tsx          ← wraps all children, never re-renders
  page.tsx            ← route UI, default export required here
  loading.tsx         ← Suspense fallback for the route
  error.tsx           ← error boundary ("use client" required)
  not-found.tsx       ← 404 for the segment
  route.ts            ← API route handler (no JSX)
```

### Route handlers

```ts
// app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const products = await fetchProducts()
  return NextResponse.json(products)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const product = await createProduct(body)
  return NextResponse.json(product, { status: 201 })
}
```

### generateMetadata

```tsx
// app/products/[id]/page.tsx
import type { Metadata } from "next"

interface PageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await fetchProduct(params.id)
  return {
    title: product.name,
    description: product.description,
  }
}

export default async function ProductPage({ params }: PageProps) {
  const product = await fetchProduct(params.id)
  return <ProductDetail product={product} />
}
```

### Server Actions (React 19 / Next.js 16)

```tsx
// Define in a "use server" file
"use server"

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string
  await db.product.create({ data: { name } })
}
```

```tsx
// Use in a Client Component
"use client"
import { createProduct } from "@/app/actions/product"

export function ProductForm() {
  return <form action={createProduct}>...</form>
}
```

---

## 7. React 19 Extras

- `use(promise)` — unwrap a promise in a component (pairs with Suspense, replaces client-side async patterns)
- `useFormStatus()` — pending state of parent form submission
- `useOptimistic(state, updateFn)` — optimistic UI updates

```tsx
"use client"
import { useFormStatus } from "react-dom"

function SubmitButton() {
  const { pending } = useFormStatus()
  return <button disabled={pending}>{pending ? "Saving…" : "Save"}</button>
}
```
