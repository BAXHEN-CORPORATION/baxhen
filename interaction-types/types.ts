/**
 * Interaction type definitions.
 *
 * Each interaction type formalizes a user-facing interaction that a funnel
 * step can contain. Interaction types are the building blocks of funnel
 * experiences — text messages, audio bubbles, call screens, PDF viewers, etc.
 *
 * The registry maps each type to compatible components that can render it.
 */

/** A single field requirement for an interaction type's data schema */
export interface InteractionField {
  /** Field key name */
  name: string;
  /** TypeScript type for documentation */
  type: string;
  /** Whether this field MUST be present */
  required: boolean;
  /** Human-readable description */
  description: string;
}

/** Defines a reusable interaction type that funnel steps can use */
export interface InteractionTypeDefinition {
  /** Unique id (e.g. "text", "audio", "call-screen") */
  id: string;
  /** Human-readable display name */
  displayName: string;
  /** One-line description of what this interaction represents */
  description: string;
  /** Fields that a data object must provide for this interaction type */
  fields: InteractionField[];
  /** Component id that renders this interaction by default */
  defaultRendererComponentId: string;
  /** All component ids that can render this interaction type */
  compatibleComponentIds: string[];
  /** lucide-react icon name for UI tooling */
  icon: string;
}
