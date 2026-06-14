export interface PdfViewerProps {
  filename: string;
  currentPage: number;
  onClose: () => void;
  onNavigate: (page: number) => void;
}

export interface PdfPageContent {
  title?: string;
  lines: string[];
}
