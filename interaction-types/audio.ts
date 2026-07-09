import type { InteractionTypeDefinition } from "./types";

export const audioInteraction: InteractionTypeDefinition = {
  id: "audio",
  displayName: "Audio Bubble",
  description:
    "A playable audio message bubble with waveform visualization and progress indicator",
  fields: [
    {
      name: "audioSrc",
      type: "string",
      required: true,
      description: "Path to the audio file under public/",
    },
    {
      name: "duration",
      type: "string",
      required: false,
      description: "Formatted duration string (e.g. '2:14')",
    },
    {
      name: "sender",
      type: '"user" | "contact"',
      required: true,
      description: "Who sent this audio message",
    },
    {
      name: "timestamp",
      type: "Date",
      required: true,
      description: "When the message was sent",
    },
  ],
  defaultRendererComponentId: "whatsapp-screen",
  compatibleComponentIds: ["whatsapp-screen"],
  icon: "AudioLines",
};
