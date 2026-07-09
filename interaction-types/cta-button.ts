import type { InteractionTypeDefinition } from "./types";

export const ctaButtonInteraction: InteractionTypeDefinition = {
  id: "cta-button",
  displayName: "CTA Button",
  description:
    "A call-to-action button that triggers navigation or an external link — typically the final funnel step action",
  fields: [
    {
      name: "label",
      type: "string",
      required: true,
      description: "Button display text (e.g. 'Start Conversation')",
    },
    {
      name: "href",
      type: "string",
      required: true,
      description: "Navigation target URL or route",
    },
    {
      name: "external",
      type: "boolean",
      required: false,
      description:
        "If true, opens in a new tab (for WhatsApp links, external sites)",
    },
    {
      name: "sender",
      type: '"user" | "contact"',
      required: false,
      description: "Who the CTA appears to come from (usually 'contact')",
    },
  ],
  defaultRendererComponentId: "whatsapp-screen",
  compatibleComponentIds: ["whatsapp-screen"],
  icon: "ArrowRight",
};
