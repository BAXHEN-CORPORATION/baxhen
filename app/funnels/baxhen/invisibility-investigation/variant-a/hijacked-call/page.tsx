"use client";

import { useHijackedCall } from "@/hooks/model/useHijackedCall";
import { IPhoneCallScreen } from "@/components/iphone-call-screen";

export default function HijackedCallPage() {
  const model = useHijackedCall();
  return <IPhoneCallScreen {...model} />;
}
