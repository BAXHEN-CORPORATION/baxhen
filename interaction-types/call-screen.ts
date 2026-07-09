import type { InteractionTypeDefinition } from "./types";

export const callScreenInteraction: InteractionTypeDefinition = {
  id: "call-screen",
  displayName: "Call Screen",
  description:
    "An iOS-style incoming/active/ended call screen with answer, decline, mute, speaker, and hangup controls",
  fields: [
    {
      name: "callState",
      type: '"incoming" | "active" | "ended"',
      required: true,
      description: "Current state of the call",
    },
    {
      name: "callerName",
      type: "string",
      required: true,
      description: "Display name of the caller",
    },
    {
      name: "callerType",
      type: "string",
      required: false,
      description: "Label below caller name (e.g. 'mobile', 'WhatsApp Audio')",
    },
    {
      name: "callSeconds",
      type: "number",
      required: false,
      description: "Elapsed call time in seconds (active state)",
    },
    {
      name: "isMuted",
      type: "boolean",
      required: false,
      description: "Whether the call is muted",
    },
    {
      name: "isSpeaker",
      type: "boolean",
      required: false,
      description: "Whether speaker mode is active",
    },
  ],
  defaultRendererComponentId: "iphone-call-screen",
  compatibleComponentIds: ["iphone-call-screen"],
  icon: "Phone",
};
