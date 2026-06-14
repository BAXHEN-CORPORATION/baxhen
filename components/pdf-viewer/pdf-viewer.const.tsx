import type { PdfPageContent } from "./pdf-viewer.types";

export const PDF_PAGES: PdfPageContent[] = [
  {
    title: "Company A",
    lines: [
      "Better service",
      "Better product",
      "Better team",
      "",
      "Nobody remembers them.",
    ],
  },
  {
    title: "Company B",
    lines: [
      "Average service",
      "Average offer",
      "Average execution",
      "",
      "Everybody talks about them.",
    ],
  },
  {
    title: "",
    lines: ["Why?"],
  },
];

export const PDF_FILENAME = "The Memory Problem";
