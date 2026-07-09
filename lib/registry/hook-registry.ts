/**
 * Hook Registry
 *
 * Central barrel that imports all ViewModel hook manifests and provides
 * typed lookup functions.
 *
 * To register a new hook:
 * 1. Create the hook directory with index.ts
 * 2. Export a `hookManifest` from the barrel
 * 3. Add the import to this file
 */

import type { HookManifest } from "@/lib/manifest/types";
import { hookManifest as useHijackedCall } from "@/hooks/model/useHijackedCall";
import { hookManifest as useInvisibilityDossier } from "@/hooks/model/useInvisibilityDossier";

const HOOKS: HookManifest[] = [useHijackedCall, useInvisibilityDossier];

/** Get a hook manifest by its unique id */
export function getHookById(id: string): HookManifest | undefined {
  return HOOKS.find((h) => h.id === id);
}

/** Get the hook that drives a specific component */
export function getHookByComponent(
  componentId: string,
): HookManifest | undefined {
  return HOOKS.find((h) => h.drivesComponent === componentId);
}

/** Get all hooks that manage a given interaction type */
export function getHooksByInteractionType(
  type: string,
): HookManifest[] {
  return HOOKS.filter((h) => h.interactionTypes.includes(type));
}

/** Get all registered hook ids */
export function getAllHookIds(): string[] {
  return HOOKS.map((h) => h.id);
}

/** Get all registered hooks */
export function getAllHooks(): HookManifest[] {
  return HOOKS;
}
