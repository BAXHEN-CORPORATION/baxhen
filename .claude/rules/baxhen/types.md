# Baxhen TypeScript Type Conventions

## Type Placement

1. Types are CO-LOCATED with the code that uses them — no centralized `types/` folder
2. Component Props types go in `component-name.types.tsx`
3. Hook Model types go in `useHookName.types.ts`
4. Shared/cross-cutting types go in `lib/manifest/types.ts` or `interaction-types/types.ts`
5. Utility types local to a module stay in that module's `.types.ts` file

## Type Naming

1. Component Props: `{ComponentName}Props` (PascalCase)
2. Hook Model: `{HookName}Model` (PascalCase, e.g. `HijackedCallModel`)
3. State enums/discriminated unions: PascalCase (e.g. `CallState = "incoming" | "active" | "ended"`)
4. Message/event types: PascalCase with descriptive name (e.g. `Message`, `InteractionTypeDefinition`)
5. Config/constants types: PascalCase (e.g. `CallButton`, `PdfPageContent`)

## Type Patterns

1. Use discriminated unions for state machines:
   ```typescript
   type CallState = "incoming" | "active" | "ended";
   type MessageType = "text" | "audio" | "case-file" | "button" | "pdf-document";
   ```
2. Use `interface` for object shapes, `type` for unions/intersections
3. Always export types that are part of the public API (from barrel `index.ts`)
4. Use `import type` for type-only imports to avoid runtime cost
5. Avoid `any` — use `unknown` and narrow with type guards
6. Strict mode is ON — no implicit any, no implicit returns

## Manifest Types

- `ComponentManifest`, `HookManifest`, `FunnelManifest` live in `lib/manifest/types.ts`
- `InteractionTypeDefinition` lives in `interaction-types/types.ts`
- Registry types live in `lib/registry/types.ts`
- When adding a new manifest field, update the type definition FIRST, then update all implementors

## Props Conventions

1. Component receives a single Props object — no positional props
2. Optional props use `?` — required props have no modifier
3. Callback props are camelCase: `onAnswer`, `onClose`, `onToggleSpeaker`
4. Boolean props use `is` / `has` / `show` prefix: `isMuted`, `isSpeaker`, `showFallback`
5. Children props use `React.ReactNode` (from `react`), not `JSX.Element`
