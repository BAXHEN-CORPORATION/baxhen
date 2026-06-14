import { MicOff, Grid3X3, Volume2, Plus, Video, User } from "lucide-react";

export const CALLER_NAME = "Invisible Business";
export const CALLER_TYPE = "mobile";
export const REFRESH_INTERVAL = 30_000;

export const RINGS = [
  { delay: "0s", opacity: 0.55 },
  { delay: "0.65s", opacity: 0.4 },
  { delay: "1.3s", opacity: 0.25 },
] as const;

export const ACTION_BUTTONS = [
  { Icon: MicOff, label: "Mute" },
  { Icon: Grid3X3, label: "Keypad" },
  { Icon: Volume2, label: "Speaker" },
  { Icon: Plus, label: "Add" },
  { Icon: Video, label: "FaceTime" },
  { Icon: User, label: "Contacts" },
] as const;
