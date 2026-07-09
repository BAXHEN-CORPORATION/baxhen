import type { InteractionTypeDefinition } from "./types";

export const caseFileInteraction: InteractionTypeDefinition = {
  id: "case-file",
  displayName: "Case File Card",
  description:
    "A rich media card showing a case file preview with title, subtitle, and page count — taps to open the PDF viewer",
  fields: [
    {
      name: "title",
      type: "string",
      required: true,
      description: "Case file title (e.g. 'Company A')",
    },
    {
      name: "subtitle",
      type: "string",
      required: true,
      description: "Subtitle or description line",
    },
    {
      name: "pages",
      type: "number",
      required: true,
      description: "Number of pages in the case file",
    },
    {
      name: "sender",
      type: '"user" | "contact"',
      required: true,
      description: "Who sent this case file",
    },
    {
      name: "timestamp",
      type: "Date",
      required: true,
      description: "When the case file was sent",
    },
  ],
  defaultRendererComponentId: "whatsapp-screen",
  compatibleComponentIds: ["whatsapp-screen", "pdf-viewer"],
  icon: "FolderOpen",
};
