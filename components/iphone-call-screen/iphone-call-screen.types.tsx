import type { LucideIcon } from "lucide-react";
import type { CallState } from "@/hooks/model/useHijackedCall";

export type { CallState };

export interface CallButton {
  Icon: LucideIcon;
  label: string;
  active?: boolean;
}

export interface IPhoneCallScreenProps {
  callState: CallState;
  formattedDuration: string;
  showRedirect: boolean;
  callButtons: CallButton[];
  onAnswer: () => void;
  onEndCall?: () => void;
  onToggleMute: () => void;
  onToggleSpeaker: () => void;
  onRetryIncomingAudio: () => void;
}
