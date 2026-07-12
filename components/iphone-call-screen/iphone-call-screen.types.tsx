import type { LucideIcon } from "lucide-react";
import type { CallState, CallScreenLabels } from "@/hooks/model/useHijackedCall";

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
  labels: CallScreenLabels;
  onAnswer: () => void;
  onEndCall: () => void;
  onToggleMute: () => void;
  onToggleSpeaker: () => void;
  onRetryIncomingAudio: () => void;
}
