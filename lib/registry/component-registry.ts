/**
 * Component Registry
 *
 * Central barrel that imports all component manifests and provides
 * typed lookup functions. Mirrors ECC's install manifest pattern —
 * a flat list of registered items.
 *
 * To register a new component:
 * 1. Create the component directory with index.tsx
 * 2. Export a `componentManifest` from the barrel
 * 3. Add the import to this file
 */

import type { ComponentManifest } from "@/lib/manifest/types";
import { componentManifest as iphoneCallScreen } from "@/components/iphone-call-screen";
import { componentManifest as whatsappScreen } from "@/components/whatsapp-screen";
import { componentManifest as pdfViewer } from "@/components/pdf-viewer";
import { componentManifest as phoneTopBar } from "@/components/ui/phone-top-bar";

const COMPONENTS: ComponentManifest[] = [
  iphoneCallScreen,
  whatsappScreen,
  pdfViewer,
  phoneTopBar,
];

/** Get a component manifest by its unique id */
export function getComponentById(
  id: string,
): ComponentManifest | undefined {
  return COMPONENTS.find((c) => c.id === id);
}

/** Get all components that support a given interaction type */
export function getComponentsByInteractionType(
  type: string,
): ComponentManifest[] {
  return COMPONENTS.filter((c) => c.interactionTypes.includes(type));
}

/** Get all registered component ids */
export function getAllComponentIds(): string[] {
  return COMPONENTS.map((c) => c.id);
}

/** Get all registered components */
export function getAllComponents(): ComponentManifest[] {
  return COMPONENTS;
}
