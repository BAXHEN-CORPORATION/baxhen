/**
 * Funnel Registry
 *
 * Central barrel that imports all funnel manifests and provides
 * typed lookup functions.
 *
 * To register a new funnel:
 * 1. Create funnel.ts under funnels/{client}/{funnel-name}/
 * 2. Export a FunnelManifest
 * 3. Add the import to this file
 */

import type { FunnelManifest, StepDefinition, VariantDefinition } from "@/lib/manifest/types";
import { invisibilityInvestigationManifest } from "@/funnels/baxhen/invisibility-investigation/funnel";

const FUNNELS: FunnelManifest[] = [invisibilityInvestigationManifest];

/** Get a funnel manifest by its unique id */
export function getFunnelById(id: string): FunnelManifest | undefined {
  return FUNNELS.find((f) => f.id === id);
}

/** Get all steps for a given funnel */
export function getFunnelSteps(funnelId: string): StepDefinition[] {
  const funnel = getFunnelById(funnelId);
  return funnel?.steps ?? [];
}

/** Get all variants for a given funnel */
export function getFunnelVariants(funnelId: string): VariantDefinition[] {
  const funnel = getFunnelById(funnelId);
  return funnel?.variants ?? [];
}

/** Get a specific variant by id */
export function getVariant(
  funnelId: string,
  variantId: string,
): VariantDefinition | undefined {
  const funnel = getFunnelById(funnelId);
  return funnel?.variants.find((v) => v.id === variantId);
}

/** Get steps for a specific variant (resolves step ids to definitions) */
export function getVariantSteps(
  funnelId: string,
  variantId: string,
): StepDefinition[] {
  const funnel = getFunnelById(funnelId);
  const variant = funnel?.variants.find((v) => v.id === variantId);
  if (!variant || !funnel) return [];
  return variant.steps
    .map((stepId) => funnel.steps.find((s) => s.id === stepId))
    .filter((s): s is StepDefinition => s !== undefined);
}

/** Get all registered funnel ids */
export function getAllFunnelIds(): string[] {
  return FUNNELS.map((f) => f.id);
}

/** Get all unique audio assets across all funnels */
export function getTotalAudioAssets(): string[] {
  const assets = new Set<string>();
  for (const funnel of FUNNELS) {
    for (const asset of funnel.totalAudioAssets) {
      assets.add(asset);
    }
  }
  return Array.from(assets);
}

/** Get all registered funnels */
export function getAllFunnels(): FunnelManifest[] {
  return FUNNELS;
}
