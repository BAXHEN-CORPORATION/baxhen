# Baxhen Funnel Architecture

> **How Baxhen funnels work, how to extend them, and how the platform scales.**

---

## Overview

Baxhen is a funnel platform built on Next.js 16, React 19, and Tailwind 4. Each funnel is a multi-step interactive experience — simulated phone calls, WhatsApp chats, PDF evidence dossiers — where every step is driven by a **ViewModel hook** and rendered by a **presentational component**.

The architecture is inspired by **[ECC](https://github.com/affaan-m/ECC)** (Everything Claude Code), an AI agent operating system. ECC's patterns — manifest registries, skill documentation, agent definitions, rules — are adapted to manage pluggable, documented, discoverable funnel components.

### Key Principles

| Principle | What It Means |
|-----------|---------------|
| **Pluggable** | Add a funnel by creating a directory and registering it. Components and hooks self-describe via manifests. |
| **Documented** | Every component, hook, and funnel exports a machine-readable manifest. A skill auto-generates human-readable docs. |
| **Discoverable** | Registries import all manifests. Query by interaction type, component, or funnel. |
| **Tested** | Playwright E2E specs for every funnel flow. Page Object Models encapsulate selectors. Clock API + audio mocks for speed. |
| **ViewModel Pattern** | Hooks own all state/logic. Components are pure presentational. Pages are thin connectors. |

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     FUNNEL FLOW                          │
│  ready → hijacked-call → invisibility-dossier → home     │
│    │           │                │                        │
│    ▼           ▼                ▼                        │
│  page.tsx   page.tsx         page.tsx                    │
│    │           │                │                        │
│    │    useHijackedCall   useInvisibilityDossier         │
│    │           │                │                        │
│    ▼           ▼                ▼                        │
│  (self)   IPhoneCallScreen  WhatsAppScreen              │
│            + PdfViewer                                   │
├─────────────────────────────────────────────────────────┤
│                     REGISTRIES                            │
│  component-registry  hook-registry                      │
│  interaction-registry  funnel-registry                  │
│         (import all manifests, provide lookup)           │
├─────────────────────────────────────────────────────────┤
│                     MANIFESTS                             │
│  componentManifest  hookManifest  funnelManifest         │
│         (exported by every component/hook/funnel)        │
├─────────────────────────────────────────────────────────┤
│              DOCUMENTATION & TOOLING                      │
│  Skills (SKILL.md)  Agents  Rules (.claude/)            │
│  Design tokens  E2E specs                                │
└─────────────────────────────────────────────────────────┘
```

---

## Directory Structure

```
baxhen/
├── app/
│   └── funnels/{client}/{funnel}/{variant}/{step}/
│       └── page.tsx                    # Thin page: hook + component
├── components/
│   └── {component-name}/
│       ├── index.tsx                   # Barrel: component + types + manifest
│       ├── {name}.tsx                  # Main component
│       ├── {name}.types.tsx            # Props + internal types
│       ├── {name}.const.tsx            # Constants, config
│       ├── {name}.components.tsx       # Sub-components
│       └── {name}.utils.ts             # Utilities
├── hooks/
│   ├── use{Utility}.ts                 # Simple reusable hooks
│   └── model/use{HookName}/
│       ├── index.ts                    # Barrel: hook + types + manifest
│       ├── use{HookName}.ts            # Main hook (ViewModel)
│       ├── use{HookName}.types.ts      # Model type, state unions
│       ├── use{HookName}.const.ts      # Audio paths, delays, script, NEXT_ROUTE
│       └── use{HookName}.utils.ts      # Helpers
├── lib/
│   ├── manifest/types.ts               # ComponentManifest, HookManifest, FunnelManifest
│   └── registry/
│       ├── types.ts                    # Registry interfaces
│       ├── component-registry.ts       # All component manifests
│       ├── hook-registry.ts            # All hook manifests
│       ├── interaction-registry.ts     # All interaction types
│       └── funnel-registry.ts          # All funnel manifests
├── interaction-types/
│   ├── types.ts                        # InteractionTypeDefinition
│   ├── index.ts                        # Barrel
│   ├── text.ts                         # Text message interaction
│   ├── audio.ts                        # Audio bubble interaction
│   ├── pdf-document.ts                 # PDF document interaction
│   ├── case-file.ts                    # Case file card interaction
│   ├── call-screen.ts                  # Call screen interaction
│   └── cta-button.ts                   # CTA button interaction
├── funnels/{client}/{funnel}/
│   └── funnel.ts                       # FunnelManifest: steps, variants, assets
├── design-tokens/
│   ├── colors.ts, typography.ts, spacing.ts
│   ├── rounded.ts, elevation.ts, index.ts
├── e2e/
│   ├── fixtures/pages/                 # Page Object Models
│   │   ├── ready-page.ts
│   │   ├── hijacked-call-page.ts
│   │   └── invisibility-dossier-page.ts
│   ├── specs/                          # Test specs
│   │   ├── invisibility-investigation-variant-a.spec.ts
│   │   ├── hijacked-call-states.spec.ts
│   │   ├── invisibility-dossier-interactions.spec.ts
│   │   ├── a11y-smoke.spec.ts
│   │   └── mobile-viewport.spec.ts
│   └── utils/                          # Test utilities
│       ├── audio-mock.ts
│       ├── time-fake.ts
│       ├── route-wait.ts
│       └── test-helpers.ts
├── .claude/
│   ├── rules/baxhen/                   # Coding standards
│   │   ├── components.md, hooks.md, funnels.md
│   │   ├── types.md, interactions.md, design-tokens.md, testing.md
│   ├── rules/nextjs/                   # Next.js 16 conventions
│   ├── rules/react/                    # React 19 patterns
│   ├── agents/                         # Specialized subagent definitions
│   │   ├── funnel-creator.md, component-builder.md
│   │   ├── hook-implementer.md, funnel-documenter.md, e2e-runner.md
│   └── skills/                         # User-invocable skills
│       ├── funnel-documenter/SKILL.md
│       ├── component-builder/SKILL.md
│       └── funnel-builder/SKILL.md
├── playwright.config.ts
├── DESIGN.md                           # Original design system spec
└── FUNNEL-ARCHITECTURE.md              # This file
```

---

## Component Pattern (Multi-File Slice)

Every component follows a consistent multi-file structure:

```
components/iphone-call-screen/
├── index.tsx                  # Barrel: exports component + types + manifest
├── iphone-call-screen.tsx     # Main component (arrow function, named export)
├── iphone-call-screen.types.tsx # Props interface + internal type definitions
├── iphone-call-screen.const.tsx # Constants (CALLER_NAME, RINGS, ACTION_BUTTONS)
├── iphone-call-screen.components.tsx # Sub-components (ActionButton, IncomingAvatar)
└── iphone-call-screen.utils.ts # Utility functions
```

### Rules

- **`index.tsx`** is a pure barrel — no logic, no React imports, only re-exports
- **Main component** is `"use client"`, arrow function, named export
- **Props interface** is `{ComponentName}Props`
- **Constants** are UPPER_SNAKE_CASE
- **Sub-components** go in `.components.tsx` if reused by the main component
- **Every barrel exports a `componentManifest`** — see Manifests section

---

## ViewModel Pattern

Hooks own all state and logic. Components are pure presentational. Pages are thin connectors:

```
┌──────────────┐     ┌──────────────────┐     ┌─────────────────────┐
│   page.tsx    │ ──▶ │  useHijackedCall  │ ──▶ │  IPhoneCallScreen   │
│  (thin glue) │     │  (ViewModel hook) │     │  (presentational)   │
└──────────────┘     └──────────────────┘     └─────────────────────┘
```

**Page file** — imports hook, imports component, spreads model:
```tsx
"use client";
import { useHijackedCall } from "@/hooks/model/useHijackedCall";
import { IPhoneCallScreen } from "@/components/iphone-call-screen";

export default function HijackedCallPage() {
  const model = useHijackedCall();
  return <IPhoneCallScreen {...model} />;
}
```

**ViewModel hook** — owns all state, audio, timers, navigation:
```typescript
"use client";
export const useHijackedCall = (): HijackedCallModel => {
  const [callState, setCallState] = useState<CallState>("incoming");
  // ... state, audio hooks, timers, navigation logic
  return { callState, formattedDuration, callButtons, onAnswer, ... };
};
```

**Hooks use `useCallAudio`** for all audio playback — never create raw `Audio` elements. This ensures audio mocking works in E2E tests.

---

## Manifests

Every component, hook, and funnel exports a machine-readable manifest. These enable:
- Auto-discovery via registries
- Funnel documentation generation (via `funnel-documenter` skill)
- Interaction type → component mapping
- Future no-code funnel builder

### ComponentManifest

```typescript
// components/iphone-call-screen/index.tsx
export const componentManifest: ComponentManifest = {
  kind: "component",
  id: "iphone-call-screen",
  description: "iOS-style incoming/active/ended call screen...",
  propsType: "@/components/iphone-call-screen/iphone-call-screen.types:IPhoneCallScreenProps",
  interactionTypes: ["call-screen"],
  audioAssets: ["/audios/incoming-call-vibrate-single.mp3", ...],
  dependencies: ["phone-top-bar"],
};
```

### HookManifest

```typescript
// hooks/model/useHijackedCall/index.ts
export const hookManifest: HookManifest = {
  kind: "hook",
  id: "useHijackedCall",
  description: "Manages the hijacked call flow...",
  modelType: "@/hooks/model/useHijackedCall/useHijackedCall.types:HijackedCallModel",
  drivesComponent: "iphone-call-screen",
  audioAssets: ["/audios/incoming-call-vibrate-single.mp3", ...],
  interactionTypes: ["call-screen"],
};
```

### FunnelManifest

```typescript
// funnels/baxhen/invisibility-investigation/funnel.ts
export const invisibilityInvestigationManifest: FunnelManifest = {
  kind: "funnel",
  id: "baxhen/invisibility-investigation",
  name: "Invisibility Investigation",
  description: "A simulated hijacked call followed by a WhatsApp evidence dossier...",
  steps: [
    { id: "ready", name: "Ready Screen", route: "/funnels/.../ready", ... },
    { id: "hijacked-call", name: "Hijacked Call", route: "/funnels/.../hijacked-call", ... },
    { id: "invisibility-dossier", name: "Invisibility Dossier", route: "/funnels/.../invisibility-dossier", ... },
  ],
  variants: [
    { id: "variant-a", name: "Variant A — Original", steps: ["ready", "hijacked-call", "invisibility-dossier"] },
  ],
  totalAudioAssets: ["/audios/..."],
};
```

---

## Interaction Types

Interaction types are the building blocks of funnel experiences. Each type formalizes a distinct user interaction — text messages, audio bubbles, call screens, PDF viewers, etc.

### Current Interaction Types

| ID            | Display Name   | Default Component     | Icon          |
|---------------|----------------|-----------------------|---------------|
| `text`        | Text Message   | whatsapp-screen       | MessageSquare |
| `audio`       | Audio Bubble   | whatsapp-screen       | AudioLines    |
| `pdf-document`| PDF Document   | whatsapp-screen       | FileText      |
| `case-file`   | Case File Card | whatsapp-screen       | FolderOpen    |
| `call-screen` | Call Screen    | iphone-call-screen    | Phone         |
| `cta-button`  | CTA Button     | whatsapp-screen       | ArrowRight    |

### Definition Format

```typescript
// interaction-types/call-screen.ts
export const callScreenInteraction: InteractionTypeDefinition = {
  id: "call-screen",
  displayName: "Call Screen",
  description: "An iOS-style incoming/active/ended call screen...",
  fields: [
    { name: "callState", type: '"incoming" | "active" | "ended"', required: true, ... },
    { name: "callerName", type: "string", required: true, ... },
  ],
  defaultRendererComponentId: "iphone-call-screen",
  compatibleComponentIds: ["iphone-call-screen"],
  icon: "Phone",
};
```

### Adding a New Interaction Type

1. Create `interaction-types/{name}.ts`
2. Register in `lib/registry/interaction-registry.ts`
3. Create/update the component that renders it
4. Update any hooks that produce it

---

## Registries

Registries are centralized barrels that import all manifests and provide typed lookup functions. They follow ECC's install manifest pattern.

```typescript
// lib/registry/component-registry.ts
import { componentManifest as iphoneCallScreen } from "@/components/iphone-call-screen";
// ... more imports

const COMPONENTS = [iphoneCallScreen, whatsappScreen, pdfViewer, phoneTopBar];

export function getComponentById(id: string) { ... }
export function getComponentsByInteractionType(type: string) { ... }
```

Queryable at runtime:
```typescript
import { getComponentById } from "@/lib/registry/component-registry";
const comp = getComponentById("iphone-call-screen"); // ComponentManifest | undefined
```

---

## E2E Testing

### Framework
- **Playwright** with Next.js 16 testmode
- 3 browsers: chromium, firefox, webkit + mobile-chrome (iPhone 12)
- Config: `playwright.config.ts`

### Test Patterns

**Full flow test** — traverse all funnel steps:
```typescript
test("complete funnel flow", async ({ page }) => {
  const ready = new ReadyPage(page);
  await ready.goto();
  await ready.clickBegin();

  const call = new HijackedCallPage(page);
  await call.waitForIncoming();
  await call.answer();
  await call.waitForEnded();
  await call.waitForRedirect();

  const dossier = new InvisibilityDossierPage(page);
  await dossier.waitForCta(45_000);
  await dossier.tapCta();
  await expect(page).toHaveURL("/");
});
```

**State machine test** — test each state transition:
```typescript
test("incoming → decline → ended", async ({ page }) => {
  const call = new HijackedCallPage(page);
  await call.goto();
  await call.decline();
  await call.waitForEnded();
});
```

### Key Utilities

| Utility | Purpose |
|---------|---------|
| `audio-mock.ts` | Patches `HTMLAudioElement` prototype — no real audio in CI |
| `time-fake.ts` | Playwright Clock API — skips script delays (20s script → <1s test) |
| `route-wait.ts` | Waits for Next.js client-side navigation |
| `test-helpers.ts` | Hermetic test context helpers |

### Running Tests

```bash
pnpm test:e2e              # Run all specs
pnpm test:e2e -- --ui      # Interactive UI mode
pnpm test:e2e:report       # Open HTML report
pnpm test:e2e -- --repeat-each=5  # Flake check
```

---

## Skills & Agents

### Skills (user-invocable via Claude Code)

| Skill | Trigger | What It Does |
|-------|---------|--------------|
| `/funnel-documenter` | "document the funnel", "analyze funnel" | Analyzes all funnel manifests, generates docs with Mermaid flow diagrams, component matrices, audio inventories |
| `/component-builder` | "create a component", "add a component" | Guides creation following multi-file slice, manifest export, design tokens |
| `/funnel-builder` | "create a funnel", "add a variant" | Guides creation of funnel manifests, step pages, registrations |

### Agents (specialized subagents)

| Agent | Purpose |
|-------|---------|
| `funnel-creator` | Creates new funnels, variants, step pages |
| `component-builder` | Creates components with multi-file slice + manifest |
| `hook-implementer` | Creates ViewModel hooks with proper audio/timer patterns |
| `funnel-documenter` | Analyzes funnel structure, generates documentation |
| `e2e-runner` | Runs/debugs E2E tests, writes new specs |

---

## Rules (Coding Standards)

Always-loaded guidelines in `.claude/rules/`:

| Rule File | Enforces |
|-----------|----------|
| `baxhen/components.md` | Multi-file slice, "use client", props-only, Tailwind 4, WCAG tap targets |
| `baxhen/hooks.md` | ViewModel pattern, useCallAudio for audio, single Model return, cleanup |
| `baxhen/funnels.md` | funnel.ts manifest required, route conventions, asset validation |
| `baxhen/types.md` | Co-located types, discriminated unions, strict mode, naming |
| `baxhen/interactions.md` | Interaction type definitions, registration, component mapping |
| `baxhen/design-tokens.md` | Colors (#10141a, #3cd7ff, #dfe2eb), typography, spacing, elevation |
| `baxhen/testing.md` | Playwright, POM, Clock API, audio mock, CI config |
| `nextjs/app-router.md` | App Router, "use client", path aliases, Turbopack |
| `react/patterns.md` | Arrow functions, named exports, hooks, state management, a11y |

---

## Design Tokens

Codified from DESIGN.md into TypeScript modules in `design-tokens/`:

```typescript
import { colors, typography, spacing, rounded, elevation } from "@/design-tokens";

colors.background          // "#10141a" (Void)
colors.primary             // "#a8e8ff" (Electric)
rounded.xl                 // "1.5rem" (conversational bubbles)
typography.displayXL       // { fontFamily: "Literata", fontSize: "64px", ... }
spacing.grid.containerMax  // "1200px"
elevation.levels[1]        // { background: "#181c22", border: "1px solid #3c494e" }
```

Tailwind 4 CSS `@theme` in `app/globals.css` is the runtime source of truth. Design tokens are for tooling, documentation, and programmatic use.

---

## Adding a New Funnel (Step-by-Step)

1. **Create funnel manifest**
   ```
   funnels/{client}/{funnel-name}/funnel.ts
   ```
   Export a `FunnelManifest` with steps, variants, and audio assets.

2. **Register in funnel registry**
   Add import to `lib/registry/funnel-registry.ts`.

3. **Create step pages**
   ```
   app/funnels/{client}/{funnel-name}/{variant}/{step}/page.tsx
   ```
   Each page imports a hook and spreads its model onto a component.

4. **Create or reuse hooks/components**
   - Check `lib/registry/component-registry.ts` — reuse existing components
   - Check `lib/registry/hook-registry.ts` — reuse existing hooks
   - Create new ones only when genuinely new interaction types are needed

5. **Write E2E specs**
   ```
   e2e/specs/{funnel-name}-{variant}.spec.ts
   ```
   At minimum: full flow test + state machine tests + interaction tests.

6. **Verify**
   ```bash
   npx tsc --noEmit     # No type errors
   pnpm build            # Production build succeeds
   pnpm test:e2e         # All specs pass
   ```

---

## Adding a New Component (Step-by-Step)

1. **Create component directory with multi-file slice**
   ```
   components/{kebab-case-name}/
     index.tsx, {name}.tsx, {name}.types.tsx,
     {name}.const.tsx, {name}.components.tsx, {name}.utils.ts
   ```

2. **Export `componentManifest` from barrel**

3. **If new interaction type, create `interaction-types/{name}.ts` and register it**

4. **Register component in `lib/registry/component-registry.ts`**

5. **Write POM + specs**

6. **Verify**

---

## Platform Evolution Path

### Current Stage: Manual Funnel Builder
- Funnels defined as code (TypeScript manifests + React components)
- New funnels added by developers following the patterns
- Skills and agents assist the development process
- E2E tests catch regressions

### Next Stage: Configurable Funnels
- Funnel definitions become JSON/YAML configs loaded at build time
- Step sequences, delays, and content configurable without code changes
- Component registry enables dynamic UIs: "step 3 uses call-screen interaction"

### Future Stage: No-Code Funnel Builder
- Visual editor where users drag interaction types into a flow
- Each interaction type renders in a compatible component
- Real-time preview of the funnel on mobile viewport
- Funnel definitions stored in a database, rendered by a generic funnel engine
- The registry system (manifests, interaction types, component mappings) is the foundation for this

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `lib/manifest/types.ts` | All manifest type definitions |
| `lib/registry/component-registry.ts` | Component lookup by id, interaction type |
| `lib/registry/funnel-registry.ts` | Funnel lookup by id, variant step resolution |
| `funnels/baxhen/invisibility-investigation/funnel.ts` | Reference funnel manifest |
| `interaction-types/types.ts` | Interaction type definition interface |
| `design-tokens/index.ts` | Codified DESIGN.md tokens |
| `playwright.config.ts` | E2E test configuration |
| `.claude/rules/baxhen/components.md` | Component coding standards |
| `.claude/skills/funnel-documenter/SKILL.md` | Auto-documentation skill |
| `.claude/agents/funnel-creator.md` | Funnel creation agent |
