export { useInvisibilityDossier } from "./useInvisibilityDossier";
export type {
  Message,
  InvisibilityDossierModel,
} from "./useInvisibilityDossier.types";

import type { HookManifest } from "@/lib/manifest/types";

export type { HookManifest };

export const hookManifest: HookManifest = {
  kind: "hook",
  id: "useInvisibilityDossier",
  description:
    "Drives the WhatsApp dossier experience: scripted message sequence with typing indicators, audio evidence playback, PDF document viewer, and CTA transition",
  modelType:
    "@/hooks/model/useInvisibilityDossier/useInvisibilityDossier.types:InvisibilityDossierModel",
  drivesComponent: "whatsapp-screen",
  audioAssets: [
    "/audios/what-just-happened.mp3",
    "/audios/evidence-01.mp3",
    "/audios/the-epidemic.mp3",
    "/audios/the-discovery.mp3",
    "/audios/the-reveal.mp3",
    "/audios/the-demonstration.mp3",
  ],
  interactionTypes: [
    "text",
    "audio",
    "pdf-document",
    "case-file",
    "cta-button",
  ],
};
