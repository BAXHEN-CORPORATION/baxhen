# Next.js 16 App Router Conventions

> This project uses Next.js 16 with breaking changes from previous versions.
> Consult `node_modules/next/dist/docs/` for the authoritative reference.

## Routing

1. All pages use App Router (`app/` directory), not Pages Router
2. File-based routing: `app/funnels/{client}/{funnel}/{variant}/{step}/page.tsx`
3. No `pages/` directory — it does not exist in this project
4. Layouts at `layout.tsx`, not-founds at `not-found.tsx`

## Client/Server

1. All funnel pages are `"use client"` — they use browser APIs (audio, fullscreen, vibration)
2. The root layout (`app/layout.tsx`) is a Server Component by default
3. Prefer `router.prefetch()` for known next routes in funnel flows

## Conventions

1. `useRouter` from `next/navigation` (not `next/router`)
2. `next/font` for font loading (used in root layout)
3. Path alias `@/*` maps to project root (configured in `tsconfig.json`)
4. No `getServerSideProps`, `getStaticProps`, `getInitialProps` — these are Pages Router APIs

## Next.js 16 Specific

1. Turbopack is the default dev bundler
2. React 19 features available (use(), Server Components by default)
3. `next/experimental/testmode/playwright` for E2E testing
4. Tailwind 4 via `@tailwindcss/postcss` PostCSS plugin (no `tailwind.config.ts`)
