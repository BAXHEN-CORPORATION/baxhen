export { useHijackedCall } from "./useHijackedCall";
export type { HijackedCallModel, CallState, CallScreenLabels } from "./useHijackedCall.types";

import type { HookManifest } from "@/lib/manifest/types";

export type { HookManifest };

export const hookManifest: HookManifest = {
  kind: "hook",
  id: "useHijackedCall",
  description:
    "Manages the hijacked call flow: incoming ring → answer → active call audio → auto-end with beep cascade → redirect to dossier",
  modelType:
    "@/hooks/model/useHijackedCall/useHijackedCall.types:HijackedCallModel",
  drivesComponent: "iphone-call-screen",
  audioAssets: [
    "/audios/incoming-call-vibrate-single.mp3",
    "/audios/hijacked-call.mp3",
    "/audios/call-end-beep.mp3",
  ],
  interactionTypes: ["call-screen"],
};
