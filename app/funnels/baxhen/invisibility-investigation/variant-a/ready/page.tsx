"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ReadyPage() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    router.prefetch(
      "/funnels/baxhen/invisibility-investigation/variant-a/hijacked-call",
    );
  }, [router]);

  const enterFullscreen = async (): Promise<void> => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      await element.requestFullscreen();
    }
  };

  const handleBegin = async (): Promise<void> => {
    try {
      await enterFullscreen();
    } catch {
      // Ignore fullscreen errors
    }

    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    setIsTransitioning(true);

    window.setTimeout(() => {
      router.push(
        "/funnels/baxhen/invisibility-investigation/variant-a/hijacked-call",
      );
    }, 800);
  };

  return (
    <main className="relative flex min-h-screen max-w-[100vw] items-center justify-center overflow-x-hidden bg-[#10141a] px-4 text-[#dfe2eb] sm:px-6 md:px-8">
      <div className="flex w-full max-w-xl flex-col items-center justify-center gap-10 text-center">
        <h1 className="break-words text-4xl font-light tracking-tight md:text-6xl">
          Are you ready?
        </h1>

        <button
          type="button"
          onClick={handleBegin}
          disabled={isTransitioning}
          className="min-h-[44px] min-w-[44px] rounded-full bg-[#3cd7ff] px-10 py-4 font-medium tracking-wide text-[#001f27] transition duration-300 ease-out hover:scale-105 hover:brightness-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#3cd7ff] focus:ring-offset-2 focus:ring-offset-[#10141a]"
        >
          BEGIN
        </button>
      </div>

      {/* Fade-to-black overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black transition-opacity duration-700 ${
          isTransitioning ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      />
    </main>
  );
}
