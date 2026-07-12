export interface Message {
  id: number;
  type: "text" | "audio" | "case-file" | "button" | "pdf-document";
  text?: string;
  title?: string;
  duration?: string;
  audioSrc?: string;
  pdfFilename?: string;
  pdfPageCount?: string;
  pdfFileSize?: string;
  sender: "baxhen" | "user";
  timestamp: string;
  status?: "sent" | "delivered" | "read";
}

export interface DossierLabels {
  online: string;
  message: string;
  transcribe: string;
  openingRevelation: string;
  accessRevelation: string;
}

export interface InvisibilityDossierModel {
  messages: Message[];
  isTyping: boolean;
  isTransitioning: boolean;
  playingAudioId: number | null;
  audioProgress: Record<number, number>;
  showPdfViewer: boolean;
  pdfPage: number;
  pdfFilename: string;
  labels: DossierLabels;
  onAudioPlay: (id: number) => void;
  onOpenPdf: () => void;
  onClosePdf: () => void;
  onPdfNavigate: (page: number) => void;
  onAccessRevelation: () => void;
}
