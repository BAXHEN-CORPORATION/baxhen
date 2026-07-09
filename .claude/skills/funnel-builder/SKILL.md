---
name: funnel-builder
description: |
  Guides the creation of new funnels, variants, and steps following Baxhen's
  funnel architecture. Triggers when the user asks to "create a funnel",
  "add a funnel", "add a variant", "new funnel step", "build a new funnel",
  or mentions expanding the funnel platform.
user-invocable: true
---

# Funnel Builder

## When to Activate

- User asks to create a new funnel
- User asks to add a variant to an existing funnel
- User asks to add a new step to a funnel
- User mentions "new client funnel", "add funnel flow", "build funnel"
- User asks about funnel architecture or how funnels work

## How It Works

1. Read `.claude/rules/baxhen/funnels.md` for conventions
2. Read existing funnel example: `funnels/baxhen/invisibility-investigation/funnel.ts`
3. Read existing step pages under `app/funnels/` for page patterns
4. Guide creation of funnel.ts manifest, step pages, and registrations

## Adding a New Funnel (Complete Guide)

### 1. Create funnel manifest
Create `funnels/{client}/{funnel-name}/funnel.ts`:
```typescript
import type { FunnelManifest } from "@/lib/manifest/types";

export const {name}Manifest: FunnelManifest = {
  kind: "funnel",
  id: "{client}/{funnel-name}",
  name: "{Funnel Display Name}",
  description: "One-line description",
  steps: [
    {
      id: "step-1",
      name: "Step One",
      route: "/funnels/{client}/{funnel-name}/{variant-id}/step-1",
      hookId: "useStepHook",
      componentId: "component-name",
    },
  ],
  variants: [
    {
      id: "variant-a",
      name: "Variant A",
      description: "Original flow",
      steps: ["step-1", "step-2"],
    },
  ],
  totalAudioAssets: ["/audios/..."],
};
```

### 2. Register in funnel registry
Add import to `lib/registry/funnel-registry.ts`:
```typescript
import { {name}Manifest } from "@/funnels/{client}/{funnel-name}/funnel";
const FUNNELS: FunnelManifest[] = [..., {name}Manifest];
```

### 3. Create step pages
For each step, create `app/funnels/{client}/{funnel-name}/{variant-id}/{step-id}/page.tsx`:
```tsx
"use client";

import { use{HookName} } from "@/hooks/model/use{HookName}";
import { {ComponentName} } from "@/components/{component-name}";

export default function {StepName}Page() {
  const model = use{HookName}();
  return <{ComponentName} {...model} />;
}
```

### 4. Create or reuse components and hooks
- Reuse existing components when possible (check `lib/registry/component-registry.ts`)
- Reuse existing hooks when the interaction logic is similar
- Create new components/hooks only when genuinely new interaction types are needed
- Follow the component-builder skill for new components

### 5. Verify
- `npx tsc --noEmit` — no type errors
- `pnpm build` — production build succeeds
- Run through the funnel flow manually — all steps render, navigation works, audio plays

## Adding a New Variant (to existing funnel)

1. Add variant to the funnel's `funnel.ts` `variants` array
2. Create variant directory: `app/funnels/{client}/{funnel-name}/{new-variant-id}/`
3. Create step pages — reuse existing hooks/components where possible
4. If variant needs different behavior, create a new hook (reuse the component)
5. Register the E2E spec for the new variant (see testing rules)

## Funnel Design Principles

1. **Steps flow linearly** — each step has one next route
2. **Hooks own logic** — components are pure presentational
3. **Variants share steps** — variants differ in step order, hook config, or content
4. **Interaction types drive rendering** — each step uses a registered interaction type
5. **Audio is managed by useCallAudio** — never create Audio elements directly
6. **Navigation is timeout-based** — auto-advance after delays defined in hook constants
