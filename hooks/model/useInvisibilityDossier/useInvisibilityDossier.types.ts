export interface Message {
  id: number;
  type: "text" | "audio" | "case-file" | "button";
  text?: string;
  title?: string;
  duration?: string;
  sender: "baxhen" | "user";
  timestamp: string;
  status?: "sent" | "delivered" | "read";
}

export interface InvisibilityDossierModel {
  messages: Message[];
  isTyping: boolean;
  isTransitioning: boolean;
  playingAudioId: number | null;
  audioProgress: number;
  onAudioPlay: (id: number) => void;
  onAccessRevelation: () => void;
}
