import type { Message } from "@/hooks/model/useInvisibilityDossier";

export interface WhatsAppScreenProps {
  messages: Message[];
  isTyping: boolean;
  isTransitioning: boolean;
  playingAudioId: number | null;
  audioProgress: number;
  onAudioPlay: (id: number) => void;
  onAccessRevelation: () => void;
}
