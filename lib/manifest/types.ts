/**
 * Manifest type definitions for component, hook, and funnel registration.
 *
 * Every component exports a ComponentManifest from its index.tsx barrel.
 * Every ViewModel hook exports a HookManifest from its index.ts barrel.
 * Every funnel exports a FunnelManifest from its funnel.ts definition.
 *
 * These manifests enable auto-discovery via registries, funnel documentation,
 * and (eventually) a no-code funnel builder where users assemble steps from
 * registered components and interaction types.
 */

// ── Component Manifest ──────────────────────────────────────────────────────

export interface ComponentManifest {
  kind: "component";
  /** Unique kebab-case id matching the component directory name */
  id: string;
  /** Human-readable one-line description */
  description: string;
  /** Import path to the component's Props type (for documentation tooling) */
  propsType: string;
  /** Which interaction types this component can render */
  interactionTypes: string[];
  /** Paths to audio assets this component requires (under public/) */
  audioAssets: string[];
  /** IDs of other components this component depends on */
  dependencies: string[];
}

// ── Hook Manifest ───────────────────────────────────────────────────────────

export interface HookManifest {
  kind: "hook";
  /** Unique kebab-case id matching the hook directory name (e.g. "useHijackedCall") */
  id: string;
  /** Human-readable one-line description of what the hook manages */
  description: string;
  /** Import path to the Model type returned by the hook */
  modelType: string;
  /** Component id that this hook connects to */
  drivesComponent: string;
  /** Paths to audio assets this hook plays (under public/) */
  audioAssets: string[];
  /** Interaction types this hook produces or manages */
  interactionTypes: string[];
}

// ── Funnel Manifest ─────────────────────────────────────────────────────────

export interface StepDefinition {
  /** Unique step id within the funnel (e.g. "ready", "hijacked-call") */
  id: string;
  /** Human-readable step name */
  name: string;
  /** Next.js app directory route for this step */
  route: string;
  /** Hook id that drives this step ("none" if self-contained) */
  hookId: string;
  /** Component id that renders this step ("none" if self-contained) */
  componentId: string;
}

export interface VariantDefinition {
  /** Unique variant id (e.g. "variant-a", "variant-b") */
  id: string;
  /** Human-readable variant name */
  name: string;
  /** One-line description of what makes this variant different */
  description: string;
  /** Ordered list of step ids that make up this variant's flow */
  steps: string[];
}

export interface FunnelManifest {
  kind: "funnel";
  /** Unique funnel id: "{client}/{funnel-name}" */
  id: string;
  /** Human-readable funnel name */
  name: string;
  /** One-line description of the funnel experience */
  description: string;
  /** All steps available in this funnel */
  steps: StepDefinition[];
  /** All variants of this funnel */
  variants: VariantDefinition[];
  /** All audio assets used across all steps and variants */
  totalAudioAssets: string[];
}
