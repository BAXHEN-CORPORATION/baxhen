export { PdfViewer } from "./pdf-viewer";
export type { PdfViewerProps, PdfPageContent } from "./pdf-viewer.types";
export { PDF_PAGES, PDF_FILENAME } from "./pdf-viewer.const";

import type { ComponentManifest } from "@/lib/manifest/types";

export type { ComponentManifest };

export const componentManifest: ComponentManifest = {
  kind: "component",
  id: "pdf-viewer",
  description:
    "iOS-style PDF document viewer overlay with page navigation, three simulated pages, and close button",
  propsType: "@/components/pdf-viewer/pdf-viewer.types:PdfViewerProps",
  interactionTypes: ["pdf-document"],
  audioAssets: [],
  dependencies: [],
};
