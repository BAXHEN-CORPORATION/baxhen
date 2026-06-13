import type { CallButton } from "@/components/iphone-call-screen/iphone-call-screen.types";

export type CallState = "incoming" | "active" | "ended";

export interface HijackedCallModel {
  callState: CallState;
  formattedDuration: string;
  showRedirect: boolean;
  currentTime: string;
  callButtons: CallButton[];
  onAnswer: () => void;
  onEndCall: () => void;
  onToggleMute: () => void;
  onToggleSpeaker: () => void;
  onRetryIncomingAudio: () => void;
}
