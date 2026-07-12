"use client";

import { Suspense } from "react";
import { useInvisibilityDossier } from "@/hooks/model/useInvisibilityDossier";
import { WhatsAppScreen } from "@/components/whatsapp-screen";

function DossierContent() {
  const model = useInvisibilityDossier();
  return <WhatsAppScreen {...model} />;
}

export default function InvisibilityDossierPage() {
  return (
    <Suspense>
      <DossierContent />
    </Suspense>
  );
}
