---
name: component-builder
description: |
  Guides the creation of new UI components following Baxhen's multi-file slice
  structure. Triggers when the user asks to "create a component", "add a
  component", "build a new component", or mentions creating new UI elements
  for the funnel platform.
user-invocable: true
---

# Component Builder

## When to Activate

- User asks to create a new UI component
- User asks to build a new interaction type component
- User mentions "new screen", "new UI", "new page component"
- User asks about component file structure or conventions

## How It Works

1. Read `.claude/rules/baxhen/components.md` for current conventions
2. Read existing component examples (e.g., `components/iphone-call-screen/`) for patterns
3. Read `interaction-types/` to check if a new interaction type is needed
4. Guide creation following the multi-file slice pattern

## Component Creation Checklist

### 1. Create directory
```
components/{kebab-case-name}/
```

### 2. Create files (in order)

**`{name}.types.tsx`** — Props interface, internal types
```typescript
import type { ComponentManifest } from "@/lib/manifest/types";

export interface {Name}Props {
  // Props received from ViewModel hook
}
```

**`{name}.const.tsx`** — Constants, config, icon refs
```typescript
export const {NAME}_CONSTANTS = { ... };
```

**`{name}.tsx`** — Main component (arrow function, named export)
```typescript
"use client";

import type { {Name}Props } from "./{name}.types";

export const {Name} = ({ prop1, prop2 }: {Name}Props) => {
  return ( ... );
};
```

**`{name}.components.tsx`** — Sub-components (if needed)
```typescript
export const SubComponent = ({ ... }) => { ... };
```

**`{name}.utils.ts`** — Utility functions (if needed)

**`index.tsx`** — Barrel export + componentManifest
```typescript
export { {Name} } from "./{name}";
export type { {Name}Props } from "./{name}.types";

import type { ComponentManifest } from "@/lib/manifest/types";
export type { ComponentManifest };

export const componentManifest: ComponentManifest = {
  kind: "component",
  id: "{kebab-case-name}",
  description: "One-line description",
  propsType: "@/components/{name}/{name}.types:{Name}Props",
  interactionTypes: ["interaction-type-id"],
  audioAssets: [],
  dependencies: [],
};
```

### 3. Register
- If a new interaction type is needed, create it in `interaction-types/`
- Register the new interaction type in `lib/registry/interaction-registry.ts`
- Register the new component manifest in `lib/registry/component-registry.ts`

### 4. Verify
- `npx tsc --noEmit` — no type errors
- `pnpm build` — production build succeeds
- Component renders correctly in dev mode

## Design Conventions

- Mobile-first: `max-w-[100vw]`, `min-h-[44px]` on interactive elements
- Tailwind 4 classes only — no CSS modules, no inline styles
- Use design tokens from `.claude/rules/baxhen/design-tokens.md`
- `framer-motion` for animations, `lucide-react` for icons
- Match existing component patterns (phone-top-bar for status bars, etc.)
