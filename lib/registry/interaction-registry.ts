/**
 * Interaction Type Registry
 *
 * Central barrel that imports all interaction type definitions and
 * provides typed lookup functions.
 *
 * To register a new interaction type:
 * 1. Create the definition file under interaction-types/
 * 2. Add the import to this file
 */

import type { InteractionTypeDefinition } from "@/interaction-types/types";
import { textInteraction } from "@/interaction-types/text";
import { audioInteraction } from "@/interaction-types/audio";
import { pdfDocumentInteraction } from "@/interaction-types/pdf-document";
import { caseFileInteraction } from "@/interaction-types/case-file";
import { callScreenInteraction } from "@/interaction-types/call-screen";
import { ctaButtonInteraction } from "@/interaction-types/cta-button";

const INTERACTIONS: InteractionTypeDefinition[] = [
  textInteraction,
  audioInteraction,
  pdfDocumentInteraction,
  caseFileInteraction,
  callScreenInteraction,
  ctaButtonInteraction,
];

/** Get an interaction type definition by its unique id */
export function getInteractionType(
  id: string,
): InteractionTypeDefinition | undefined {
  return INTERACTIONS.find((i) => i.id === id);
}

/** Get the default component that renders a given interaction type */
export function getDefaultRenderer(type: string): string | undefined {
  const interaction = getInteractionType(type);
  return interaction?.defaultRendererComponentId;
}

/** Get all component ids that can render a given interaction type */
export function getCompatibleComponents(type: string): string[] {
  const interaction = getInteractionType(type);
  return interaction?.compatibleComponentIds ?? [];
}

/** Get all registered interaction type ids */
export function getAllInteractionTypeIds(): string[] {
  return INTERACTIONS.map((i) => i.id);
}

/** Get all registered interaction types */
export function getAllInteractionTypes(): InteractionTypeDefinition[] {
  return INTERACTIONS;
}
