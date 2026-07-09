# React 19 Patterns for Baxhen

## Component Patterns

1. Arrow functions for all components:
   ```tsx
   export const ComponentName = ({ prop1, prop2 }: Props) => { ... };
   ```
2. No `export default` — always named exports
3. Components are pure presentational — receive data via props, emit events via callbacks
4. No class components
5. Fragment shorthand `<>...</>` preferred over `<Fragment>`

## Hook Patterns

1. Custom hooks start with `use` prefix
2. ViewModel hooks return a single Model object:
   ```typescript
   const model = useHookName();
   return <Component {...model} />;
   ```
3. Hooks must have proper cleanup in useEffect (clearInterval, clearTimeout, removeEventListener)
4. Use `useCallback` for event handlers passed to children
5. Use `useMemo` for expensive computations, not for trivial values

## State Management

1. `useState` for component-local and ViewModel state — no external library needed
2. State updates via functions (not direct mutation): `setState(prev => ...)`
3. Complex state objects use multiple `useState` calls — no `useReducer` unless genuinely beneficial
4. Derived values are computed inline or via `useMemo` — never stored in separate state
5. No `useEffect` for syncing derived state — compute it directly

## Performance

1. Wrap component in `React.memo()` only if profiler shows unnecessary re-renders
2. `useCallback` for callbacks passed to memoized children
3. No premature optimization — measure first

## JSX Conventions

1. Self-close tags when no children: `<Component />`
2. Boolean props shorthand: `<Component isActive />` not `<Component isActive={true} />`
3. String props: `<Component title="Hello" />` not `<Component title={"Hello"} />`
4. Conditional rendering: `{condition && <Component />}`
5. Map rendering: `{items.map(item => <Component key={item.id} />)}`
6. Tailwind classes directly on elements — no CSS-in-JS, no CSS modules

## Accessibility

1. Interactive elements MUST have `min-h-[44px] min-w-[44px]` (WCAG 2.5.5 tap target)
2. Buttons use `<button type="button">` unless they submit a form
3. Focus states: `focus:outline-none focus:ring-2 focus:ring-[#3cd7ff] focus:ring-offset-2 focus:ring-offset-[#10141a]`
4. Non-text content has `aria-label` or text alternative
5. Decorative elements use `aria-hidden="true"`
