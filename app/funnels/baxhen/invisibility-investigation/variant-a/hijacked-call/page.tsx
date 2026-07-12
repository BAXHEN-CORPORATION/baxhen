"use client";

import { Suspense } from "react";
import { useHijackedCall } from "@/hooks/model/useHijackedCall";
import { IPhoneCallScreen } from "@/components/iphone-call-screen";

function HijackedCallContent() {
  const model = useHijackedCall();
  return <IPhoneCallScreen {...model} />;
}

export default function HijackedCallPage() {
  return (
    <Suspense>
      <HijackedCallContent />
    </Suspense>
  );
}
