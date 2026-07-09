/**
 * Registry utility types.
 *
 * Registries are centralized barrels that import all manifests and
 * provide typed lookup functions. They mirror ECC's install manifest
 * pattern — a flat list of registered items with query methods.
 */

import type {
  ComponentManifest,
  HookManifest,
  FunnelManifest,
} from "@/lib/manifest/types";
import type { InteractionTypeDefinition } from "@/interaction-types/types";

// ── Component Registry ──────────────────────────────────────────────────────

export interface ComponentRegistry {
  components: ComponentManifest[];
  getById(id: string): ComponentManifest | undefined;
  getByInteractionType(type: string): ComponentManifest[];
  getAllIds(): string[];
}

// ── Hook Registry ───────────────────────────────────────────────────────────

export interface HookRegistry {
  hooks: HookManifest[];
  getById(id: string): HookManifest | undefined;
  getByComponent(componentId: string): HookManifest | undefined;
  getByInteractionType(type: string): HookManifest[];
  getAllIds(): string[];
}

// ── Interaction Registry ────────────────────────────────────────────────────

export interface InteractionRegistry {
  interactions: InteractionTypeDefinition[];
  getById(id: string): InteractionTypeDefinition | undefined;
  getRendererFor(type: string): string | undefined;
  getAllIds(): string[];
}

// ── Funnel Registry ─────────────────────────────────────────────────────────

export interface FunnelRegistry {
  funnels: FunnelManifest[];
  getById(id: string): FunnelManifest | undefined;
  getSteps(funnelId: string): FunnelManifest["steps"];
  getVariants(funnelId: string): FunnelManifest["variants"];
  getAllIds(): string[];
  getTotalAudioAssets(): string[];
}
