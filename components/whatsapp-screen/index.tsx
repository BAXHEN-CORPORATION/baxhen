export { WhatsAppScreen } from "./whatsapp-screen";
export type { WhatsAppScreenProps } from "./whatsapp-screen.types";

import type { ComponentManifest } from "@/lib/manifest/types";

export type { ComponentManifest };

export const componentManifest: ComponentManifest = {
  kind: "component",
  id: "whatsapp-screen",
  description:
    "WhatsApp-style chat screen with text bubbles, audio bubbles, PDF document previews, case file cards, typing indicator, and CTA button",
  propsType:
    "@/components/whatsapp-screen/whatsapp-screen.types:WhatsAppScreenProps",
  interactionTypes: [
    "text",
    "audio",
    "pdf-document",
    "case-file",
    "cta-button",
  ],
  audioAssets: [
    "/audios/what-just-happened.mp3",
    "/audios/evidence-01.mp3",
    "/audios/the-epidemic.mp3",
    "/audios/the-discovery.mp3",
    "/audios/the-reveal.mp3",
    "/audios/the-demonstration.mp3",
  ],
  dependencies: ["pdf-viewer", "phone-top-bar"],
};
