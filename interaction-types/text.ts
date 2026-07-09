import type { InteractionTypeDefinition } from "./types";

export const textInteraction: InteractionTypeDefinition = {
  id: "text",
  displayName: "Text Message",
  description:
    "A standard WhatsApp-style text bubble with sender label and timestamp",
  fields: [
    {
      name: "text",
      type: "string",
      required: true,
      description: "The message text content",
    },
    {
      name: "sender",
      type: '"user" | "contact"',
      required: true,
      description: "Who sent this message",
    },
    {
      name: "timestamp",
      type: "Date",
      required: true,
      description: "When the message was sent",
    },
    {
      name: "status",
      type: '"sent" | "delivered" | "read" | undefined',
      required: false,
      description: "Message delivery status (WhatsApp-style checks)",
    },
  ],
  defaultRendererComponentId: "whatsapp-screen",
  compatibleComponentIds: ["whatsapp-screen"],
  icon: "MessageSquare",
};
