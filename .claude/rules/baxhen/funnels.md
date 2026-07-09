# Baxhen Funnel Standards

## Funnel Definition

Every funnel has a `funnel.ts` manifest at:
```
funnels/{client}/{funnel-name}/funnel.ts
```

The manifest exports a `FunnelManifest` from `@/lib/manifest/types`.

## Funnel Rules

1. Every funnel MUST have a `funnel.ts` manifest declaring all steps, variants, and audio assets
2. Funnel page routes follow convention:
   `app/funnels/{client}/{funnel-name}/{variant-id}/{step-id}/page.tsx`
3. Each step page is THIN — import ViewModel hook, import component, spread model:
   ```tsx
   "use client";
   import { useHookName } from "@/hooks/model/useHookName";
   import { ComponentName } from "@/components/component-name";
   export default function StepPage() {
     const model = useHookName();
     return <ComponentName {...model} />;
   }
   ```
4. Self-contained steps (no hook/component) are fine — document with `hookId: "none"`, `componentId: "none"` in manifest
5. Navigation routes are defined in hook constants (`NEXT_ROUTE`), not hardcoded in pages
6. Audio assets referenced in manifest MUST exist in `public/audios/`
7. Each variant gets its own directory under the funnel route
8. Variants share steps but can have different step ordering or additional steps

## Adding a New Funnel

1. Create `funnels/{client}/{funnel-name}/funnel.ts` with `FunnelManifest`
2. Create step pages under `app/funnels/{client}/{funnel-name}/{variant-id}/{step-id}/page.tsx`
3. If new components needed, create under `components/` with full multi-file slice + manifest
4. If new hooks needed, create under `hooks/model/` with full multi-file slice + manifest
5. Register in `lib/registry/funnel-registry.ts`

## Adding a New Variant

1. Add variant definition to the funnel's `funnel.ts`
2. Create variant directory under `app/funnels/{client}/{funnel-name}/{new-variant-id}/`
3. Create/modify step pages — reuse existing hooks/components where possible
4. If variant needs different behavior, create a new hook (no need to duplicate component)
