import type { FunnelManifest } from "@/lib/manifest/types";

/**
 * Baxhen — Invisibility Investigation Funnel
 *
 * A simulated hijacked call followed by a WhatsApp evidence dossier.
 * The funnel exposes how companies make people "invisible" through
 * corporate structures, and then reveals the evidence.
 */
export const invisibilityInvestigationManifest: FunnelManifest = {
  kind: "funnel",
  id: "baxhen/invisibility-investigation",
  name: "Invisibility Investigation",
  description:
    "A simulated hijacked call followed by a WhatsApp evidence dossier revealing corporate invisibility structures",
  steps: [
    {
      id: "ready",
      name: "Ready Screen",
      route:
        "/funnels/baxhen/invisibility-investigation/variant-a/ready",
      hookId: "none",
      componentId: "none",
    },
    {
      id: "hijacked-call",
      name: "Hijacked Call",
      route:
        "/funnels/baxhen/invisibility-investigation/variant-a/hijacked-call",
      hookId: "useHijackedCall",
      componentId: "iphone-call-screen",
    },
    {
      id: "invisibility-dossier",
      name: "Invisibility Dossier",
      route:
        "/funnels/baxhen/invisibility-investigation/variant-a/invisibility-dossier",
      hookId: "useInvisibilityDossier",
      componentId: "whatsapp-screen",
    },
  ],
  variants: [
    {
      id: "variant-a",
      name: "Variant A — Original",
      description:
        "Linear flow: ready → hijacked call → invisibility dossier → CTA to home",
      steps: ["ready", "hijacked-call", "invisibility-dossier"],
    },
  ],
  totalAudioAssets: [
    "/audios/incoming-call-vibrate-single.mp3",
    "/audios/hijacked-call.mp3",
    "/audios/call-end-beep.mp3",
    "/audios/what-just-happened.mp3",
    "/audios/evidence-01.mp3",
    "/audios/the-epidemic.mp3",
    "/audios/the-discovery.mp3",
    "/audios/the-reveal.mp3",
    "/audios/the-demonstration.mp3",
  ],
};
