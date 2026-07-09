import type { InteractionTypeDefinition } from "./types";

export const pdfDocumentInteraction: InteractionTypeDefinition = {
  id: "pdf-document",
  displayName: "PDF Document",
  description:
    "An iOS-style PDF document preview bubble that opens a multi-page document viewer overlay",
  fields: [
    {
      name: "pages",
      type: "PdfPageContent[]",
      required: true,
      description: "Array of page contents (title, body, image)",
    },
    {
      name: "filename",
      type: "string",
      required: true,
      description: "Display filename in the bubble (e.g. 'evidence.pdf')",
    },
    {
      name: "sender",
      type: '"user" | "contact"',
      required: true,
      description: "Who sent this document",
    },
    {
      name: "timestamp",
      type: "Date",
      required: true,
      description: "When the document was sent",
    },
  ],
  defaultRendererComponentId: "whatsapp-screen",
  compatibleComponentIds: ["whatsapp-screen", "pdf-viewer"],
  icon: "FileText",
};
