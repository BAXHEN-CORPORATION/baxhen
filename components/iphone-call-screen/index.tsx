export { IPhoneCallScreen } from "./iphone-call-screen";
export type {
  IPhoneCallScreenProps,
  CallState,
  CallButton,
} from "./iphone-call-screen.types";

import type { ComponentManifest } from "@/lib/manifest/types";

export type { ComponentManifest };

export const componentManifest: ComponentManifest = {
  kind: "component",
  id: "iphone-call-screen",
  description:
    "iOS-style incoming/active/ended call screen with answer/decline, mute, speaker, and action grid controls",
  propsType:
    "@/components/iphone-call-screen/iphone-call-screen.types:IPhoneCallScreenProps",
  interactionTypes: ["call-screen"],
  audioAssets: [
    "/audios/incoming-call-vibrate-single.mp3",
    "/audios/hijacked-call.mp3",
    "/audios/call-end-beep.mp3",
  ],
  dependencies: ["phone-top-bar"],
};
