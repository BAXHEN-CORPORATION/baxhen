import type { Message } from "@/hooks/model/useInvisibilityDossier";

export interface WhatsAppScreenProps {
  messages: Message[];
  isTyping: boolean;
  isTransitioning: boolean;
  playingAudioId: number | null;
  audioProgress: Record<number, number>;
  showPdfViewer: boolean;
  pdfPage: number;
  pdfFilename: string;
  onAudioPlay: (id: number) => void;
  onOpenPdf: () => void;
  onClosePdf: () => void;
  onPdfNavigate: (page: number) => void;
  onAccessRevelation: () => void;
}
