export { PhoneTopBar } from "./phone-top-bar";
export type { PhoneTopBarProps } from "./phone-top-bar.types";

import type { ComponentManifest } from "@/lib/manifest/types";

export type { ComponentManifest };

export const componentManifest: ComponentManifest = {
  kind: "component",
  id: "phone-top-bar",
  description:
    "iOS-style status bar with time, signal, wifi, battery, and Dynamic Island — supports light and dark variants",
  propsType:
    "@/components/ui/phone-top-bar/phone-top-bar.types:PhoneTopBarProps",
  interactionTypes: [],
  audioAssets: [],
  dependencies: [],
};
