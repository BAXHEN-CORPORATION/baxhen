"use client";

import { useInvisibilityDossier } from "@/hooks/model/useInvisibilityDossier";
import { WhatsAppScreen } from "@/components/whatsapp-screen";

export default function InvisibilityDossierPage() {
  const model = useInvisibilityDossier();
  return <WhatsAppScreen {...model} />;
}
