# Baxhen Component Standards

## File Structure

Every component follows the multi-file slice pattern:

```
component-name/
  index.tsx                      <- barrel re-export (component + types + manifest)
  component-name.tsx             <- main component implementation
  component-name.types.tsx       <- Props interface, internal type definitions
  component-name.const.tsx       <- constants, icon refs, config values
  component-name.components.tsx  <- sub-components reused by main component
  component-name.utils.ts        <- utility functions specific to this component
```

## Rules

1. All components are `"use client"` until server components are needed
2. Components receive all data via props (ViewModel pattern) — no useState for business logic
3. No useState/useEffect in presentational components — all state lives in hooks
4. Named exports only — no `export default` in components
5. Arrow functions for components and event handlers
6. Tailwind 4 classes only — no CSS modules, no inline styles (except dynamic values from props)
7. Mobile-first: max-width containers, responsive units, min-h-[44px] on interactive elements (WCAG tap target)
8. `index.tsx` is PURE barrel — no logic, no React imports, only re-exports
9. Every component barrel exports a `componentManifest` of type `ComponentManifest` from `@/lib/manifest/types`
10. Component directory name = kebab-case, component name = PascalCase, props type = PascalCase + `Props` suffix
11. Interaction types come from `@/interaction-types/` registry, referenced by string id in manifests

## Conventions

- Props interface: `{ComponentName}Props`
- Sub-components: PascalCase, exported from `.components.tsx`
- Constants: UPPER_SNAKE_CASE
- No magic strings in JSX — extract to `.const.tsx`
- Use `framer-motion` for animations, `lucide-react` for icons
