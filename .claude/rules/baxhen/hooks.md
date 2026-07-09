# Baxhen Hook / ViewModel Standards

## Hook Types

**ViewModel hooks** — heavy hooks that own all state/logic for a funnel step:
- Located in `hooks/model/use{HookName}/`
- Follow multi-file slice: `index.ts`, `use{HookName}.ts`, `.types.ts`, `.const.ts`, `.utils.ts`

**Simple hooks** — lightweight, reusable building blocks:
- Located in `hooks/use{HookName}.ts` (single file)
- No multi-file slice needed

## ViewModel Hook Rules

1. Hooks return a single Model object — consumers spread it onto the component
2. Model type is the source of truth for what the component receives
3. All hooks declare `"use client"` at the top of the main file
4. Export a `hookManifest` of type `HookManifest` from `@/lib/manifest/types` from barrel
5. Audio playback MUST use `useCallAudio` from `@/hooks/useCallAudio` — never create raw Audio elements
6. State machines (call states, step progression) use `useState` with discriminated unions — no external state libraries unless truly needed
7. No `useEffect` for derived values — use `useMemo` or inline computation
8. Timer logic uses `useState` for display values, `setInterval`/`setTimeout` in `useEffect` with proper cleanup
9. Navigation routes are defined in `.const.ts` as `NEXT_ROUTE`
10. Audio asset paths are listed in `.const.ts` so manifest stays in sync

## Simple Hook Rules

1. Single-file, single responsibility
2. Generic enough to be reused across multiple components/funnels
3. Return value is an object (not tuple) for extensibility
4. Proper `useEffect` cleanup (clearInterval, clearTimeout, removeEventListener)
5. Accept an options object as parameter, not positional args

## Anti-Patterns

- Don't put business logic in page files — page files import hook + component, that's it
- Don't use external state libraries (Zustand, Redux) for funnel state — useState + custom hooks scale fine
- Don't create `new Audio()` directly — always use `useCallAudio`
- Don't export default from hooks
