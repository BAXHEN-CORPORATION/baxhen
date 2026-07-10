"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const NEXT_ROUTE =
  "/funnels/baxhen/invisibility-investigation/variant-a/hijacked-call";

export default function ReadyPage() {
  const router = useRouter();
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    router.prefetch(NEXT_ROUTE);

    const t = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(() => router.push(NEXT_ROUTE), 400);
    }, 200);

    return () => clearTimeout(t);
  }, [router]);

  return (
    <main className="relative flex min-h-screen max-w-[100vw] items-center justify-center overflow-x-hidden bg-[#10141a]">
      <div
        className={`fixed inset-0 z-50 bg-black transition-opacity duration-400 ${
          isLeaving ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />
    </main>
  );
}
