---
name: nextjs-pattern
description: |
  Enforces Next.js 16 App Router patterns for this project: ViewModel hooks, component folder structure, TypeScript strict, Tailwind 4, framer-motion, lucide-react, arrow functions, mobile-first, WCAG AA.

  Triggers when writing or refactoring React components, custom hooks, Next.js pages, TypeScript types, or any file under app/ or components/. Also triggers when the user asks about project conventions, code structure, naming, or file organization.
user-invocable: true
---

# Next.js Patterns

Project conventions for the Baxhen codebase. These patterns exist so every file looks like it was written by the same person. Consistency makes bugs easier to find and refactoring safer.

## 1. File Structure

### Component Module

Every non-trivial component gets its own folder under `components/`. Files are split by role:

```
components/component-name/
  index.tsx                      ← barrel re-export (component + types)
  component-name.tsx             ← main component (named export)
  component-name.types.tsx       ← type definitions (Props interface)
  component-name.const.tsx       ← constants (labels, configs, icon refs)
  component-name.components.tsx  ← sub-components reused ONLY within this component
  component-name.utils.ts        ← utility hooks/functions specific to this component
```

**Rules:**
- `.components.tsx` contains ONLY sub-components that appear more than once in the main component (e.g., `ActionButton` rendered 6 times in a grid). Single-use sub-components stay inline in the main file.
- `index.tsx` is a pure barrel — re-exports only, no logic, no React imports.
- `components/ui/` is reserved for shared components reused across multiple feature components.

### ViewModel Hook Module

Complex hooks that drive a page get their own folder under `hooks/model/`:

```
hooks/model/useFeatureName/
  index.ts                    ← barrel re-export (hook + types)
  useFeatureName.ts           ← main hook (named export, returns model)
  useFeatureName.types.ts     ← type definitions (Model interface, state unions)
  useFeatureName.const.ts     ← constants (audio paths, route paths, timing values)
  useFeatureName.utils.ts     ← pure utility functions (formatTime, etc.)
```

### Simple Hooks

Hooks without page-level complexity are single files at `hooks/useHookName.ts`.

## 2. ViewModel Pattern

The hook owns all logic. The component only renders. This is the most important pattern in the project.

```tsx
// hooks/model/useFeatureName/useFeatureName.ts
"use client";

export const useFeatureName = (): FeatureNameModel => {
  const [state, setState] = useState<StateType>("initial");
  const router = useRouter();

  // Compose child hooks
  const audio = useCallAudio(src, options);

  // Side effects
  useEffect(() => {
    router.prefetch(nextRoute);
  }, [router]);

  // Event handlers wrapped in useCallback
  const handleAction = useCallback(() => { ... }, []);

  // Derived data via useMemo
  const derived = useMemo(() => { ... }, [deps]);

  // Return a flat model object — never a tuple
  return { state, derived, handleAction };
};
```

```tsx
// components/component-name/component-name.tsx
"use client";

export const ComponentName = ({ state, derived, onAction }: Props) => (
  <div>...</div>
);
```

```tsx
// app/funnels/.../page.tsx
"use client";

export default function PageName() {
  const model = useFeatureName();
  return <ComponentName {...model} />;
}
```

**Why:** When something looks wrong on screen, the bug is either in the ViewModel or the component. Never both. Testing is simplified — assert the ViewModel via unit tests. Refactoring is safe — change the ViewModel, component stays untouched, run tests, done.

## 3. Code Style

### Arrow Functions Only

Every component, hook, and utility uses arrow functions:

```tsx
// CORRECT
const StatusBar = ({ time }: { time: string }) => (...)
export const useHook = (): Model => { ... }
export const formatTime = (seconds: number): string => { ... }

// WRONG
function StatusBar({ time }: { time: string }) { ... }
export function useHook(): Model { ... }
```

**Exception:** `export default function PageName()` in page.tsx files follows Next.js convention. This is the ONLY place `function` is allowed.

### Semicolons

Required. Every statement ends with `;`.

### Quotes

Double quotes everywhere: `"use client"`, `import { Thing } from "@/...`.

### Trailing Commas

Present in all multi-line object/array/destructure expressions.

### Section Comments

```tsx
// ── Incoming ring audio ──

// ── Active call audio — auto-ends when finished ──
```

Use em-dash separators to visually group related blocks of logic.

## 4. TypeScript Patterns

### Strict Mode

`tsconfig.json` has `"strict": true`. Every parameter and return type must be explicit. No `any`.

### Naming Conventions

| Category | Convention | Examples |
|---|---|---|
| Props | `[Name]Props` | `IPhoneCallScreenProps`, `ActionButtonProps` |
| Hook options | `Use[Hook]Options` | `UseCallAudioOptions` |
| Hook return | `[Hook]Model` or `Use[Hook]Return` | `HijackedCallModel`, `UseCallAudioReturn` |
| State unions | Descriptive strings | `CallState = "incoming" \| "active" \| "ended"` |
| Constants | `UPPER_SNAKE_CASE` | `CALLER_NAME`, `NEXT_ROUTE`, `REFRESH_INTERVAL` |
| Event props | `on[Action]` | `onAnswer`, `onEndCall`, `onToggleMute` |
| Internal handlers | `handle[Action]` | `handleEndCall`, `handleDisconnect` |

### Interfaces vs Types

- `interface` for object shapes (props, model returns)
- `type` for unions, intersections, and aliases

### Type Imports

Use `import type` for type-only imports:

```tsx
import type { CallState, CallButton } from "./useFeatureName.types";
import type { LucideIcon } from "lucide-react";
```

### Re-export Types

```ts
export type { CallState, HijackedCallModel } from "./useFeatureName.types";
```

## 5. Imports

### Order

1. React (`useState`, `useEffect`, etc.)
2. Next.js (`useRouter`, `next/navigation`)
3. External hooks (`@/hooks/...`)
4. External component types/constants (`@/components/...`)
5. Animation/library (`framer-motion`, `lucide-react`)
6. Relative type imports (`import type { ... } from "./..."`)
7. Relative value imports (`import { ... } from "./..."`)

### Path Alias

Use `@/` for cross-module imports. Use `./` for same-directory imports.

## 6. `"use client"` Directive

Required at the top of any file using: `useState`, `useEffect`, `useRef`, `useCallback`, `useMemo`, `motion`, event handlers, browser APIs (`document`, `navigator`, `window`).

NOT needed in: `.types.ts`, `.const.ts` (unless importing components), `.utils.ts` (pure functions only), `index.ts` barrel files.

In `.utils.ts` files that export hooks (like `useIphoneCallScreenUtils`), the directive IS required.

## 7. Tailwind CSS (v4)

### Configuration

No `tailwind.config.ts`. Uses `@import "tailwindcss"` in `globals.css`. Design tokens via `@theme inline`. Arbitrary values with `bg-[#hex]` syntax.

### Layout

- Full viewport: `h-[100dvh]` (not `h-screen`)
- Horizontal containment: `max-w-[100vw] overflow-x-hidden`
- Content max-width: `max-w-[430px]` for phone mockups, `max-w-xl` for centered content
- Flexbox stacking: `flex flex-col gap-*` (never `space-y-*`)

### Touch Targets

Every interactive element must have `min-h-[44px] min-w-[44px]`.

### Transitions

- Hover: `hover:scale-105 hover:brightness-110`
- Press: `active:scale-95`
- Opacity: `transition-opacity duration-700`
- Button base: `transition duration-300 ease-out`

### Conditional Classes

Use the array + `.filter(Boolean).join(" ")` pattern:

```tsx
className={[
  "base-class",
  active ? "bg-white text-zinc-900" : "bg-white/[0.14] text-white",
  !actionable ? "cursor-default opacity-50" : "cursor-pointer",
].filter(Boolean).join(" ")}
```

The `cn()` utility from `@/lib/utils` does not exist yet in this project. Use `.filter(Boolean).join(" ")` for now.

### Typography

- Headings: `text-4xl font-light tracking-tight` or `text-[28px] font-semibold tracking-tight`
- Timers/durations: `tabular-nums` for monospaced numerals
- Labels: `text-[11px] font-medium tracking-wide` or `text-xs uppercase tracking-[0.22em]`
- Body: `break-words hyphens-auto` for long text

### Colors (Project Palette)

| Role | Hex |
|---|---|
| Background (Void) | `#10141a` |
| Surface (Deep Navy) | `#1C1C1E` |
| Text primary | `#dfe2eb` or `white` |
| Text secondary | `white/50`, `white/40`, `#A0A0A0` |
| Accent (Electric) | `#3cd7ff` |
| Danger | `#FF3B30` |
| Success | `#34C759` |
| Button bg | `#48484A` or `white/0.14` |

## 8. Framer Motion

### Import

```tsx
import { motion } from "framer-motion";
```

### Patterns

- Animated buttons: `<motion.button whileTap={{ scale: 0.88 }}>`
- Mount animation: `<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>`
- Keyframe loops: `animate={{ opacity: [0.3, 1, 0.3] }}` with `transition={{ duration: 1, repeat: Infinity, delay: i * 0.22 }}`
- Conditional animation: `whileTap={actionable ? { scale: 0.93 } : undefined}`

Use CSS `animate-ping` for ripple/ring effects — prefer Tailwind's built-in animations over `motion` for simple loops.

## 9. Lucide React Icons

```tsx
import { Phone, PhoneOff, User, Wifi, Battery } from "lucide-react";
```

- Use directly as JSX: `<Phone size={32} className="text-white" />`
- Decorative icons: `aria-hidden="true"`
- Icon size: `size={28}` for action buttons, `size={32}` for primary buttons, `size={40}` for avatars
- Prefer `PhoneOff` over rotated `Phone` for "end call" actions

## 10. Accessibility (WCAG AA)

### Focus States

Always pair:
```
focus:outline-none focus:ring-2 focus:ring-white/60
```

For colored buttons, adjust ring color to match:
```
focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-black
```

### Labels

Every icon-only button needs `aria-label`:
```tsx
<button aria-label="End call">...</button>
```

### Decorative Elements

Add `aria-hidden="true"` to: icons, animated rings, background overlays, transition effects.

### Live Regions

Dynamic content that updates after interaction needs `aria-live`:
```tsx
<div aria-live="assertive">{message}</div>
```

### Toggle State

```tsx
aria-pressed={actionable ? active : undefined}
```

## 11. Anti-Patterns

### Never

- ❌ `function` declarations (except page default exports)
- ❌ Default exports (except page.tsx)
- ❌ `React.FC` type
- ❌ `any` type — use `unknown` if truly unknown
- ❌ Inline styles unless the value is truly dynamic (CSS gradient stops, animation-delay, box-shadow)
- ❌ `space-y-*` — use `flex flex-col gap-*` instead
- ❌ Hardcoded transcripts/captions in audio-driven pages
- ❌ `framer-motion` for simple loops — use Tailwind's `animate-ping`
- ❌ Images when CSS gradients suffice for placeholders
- ❌ Horizontal scroll — always `max-w-[100vw] overflow-x-hidden`
- ❌ New dependencies without explicit approval

### Avoid

- ⚠️ Single files over 300 lines — extract sub-components or utilities
- ⚠️ Hooks that return tuples — return objects so destructuring is order-independent
- ⚠️ Nested ternaries in JSX — use conditional `&&` or extract to a function
- ⚠️ `setTimeout` without cleanup — always `clearTimeout` in the return of `useEffect`

## 12. Quick Reference

### Template: New Page

```tsx
"use client";

import { useFeatureName } from "@/hooks/model/useFeatureName";
import { FeatureComponent } from "@/components/feature-name";

export default function FeaturePage() {
  const model = useFeatureName();
  return <FeatureComponent {...model} />;
}
```

### Template: New ViewModel Hook

```
hooks/model/useFeatureName/
  index.ts                    ← barrel
  useFeatureName.ts           ← hook
  useFeatureName.types.ts     ← model interface + state types
  useFeatureName.const.ts     ← paths, timing values
  useFeatureName.utils.ts     ← pure helpers
```

### Template: New Component

```
components/feature-name/
  index.tsx                      ← barrel
  feature-name.tsx               ← main component + inline sub-components
  feature-name.types.tsx         ← Props interface
  feature-name.const.tsx         ← labels, configs
  feature-name.components.tsx    ← repeated sub-components only
  feature-name.utils.ts          ← utility hooks
```
