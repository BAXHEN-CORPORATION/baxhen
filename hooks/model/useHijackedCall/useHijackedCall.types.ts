import type { CallButton } from "@/components/iphone-call-screen/iphone-call-screen.types";

export type CallState = "incoming" | "active" | "ended";

export interface CallScreenLabels {
  incomingCall: string;
  volumeHint: string;
  decline: string;
  answer: string;
  callDisconnected: string;
  newMessage: string;
  endCall: string;
}

export interface HijackedCallModel {
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
