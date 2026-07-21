"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCallAudio } from "@/hooks/useCallAudio";
import type { CallButton } from "@/components/iphone-call-screen/iphone-call-screen.types";
import { ACTION_BUTTONS } from "@/components/iphone-call-screen/iphone-call-screen.const";
import type { CallState, HijackedCallModel } from "./useHijackedCall.types";
import {
  INCOMING_AUDIO_PATH,
  ACTIVE_AUDIO_PATH,
  CALL_END_BEEP_PATH,
  NEXT_ROUTE,
} from "./useHijackedCall.const";
import { formatTime } from "./useHijackedCall.utils";

export const useHijackedCall = (): HijackedCallModel => {
  const router = useRouter();
  const [callState, setCallState] = useState<CallState>("incoming");
  const [callSeconds, setCallSeconds] = useState(0);
  const [showRedirect, setShowRedirect] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);

  // Prefetch next route on mount
  useEffect(() => {
    router.prefetch(NEXT_ROUTE);
  }, [router]);

  // ── Incoming ring audio ──
  const incomingAudio = useCallAudio(INCOMING_AUDIO_PATH, {
    enabled: callState === "incoming",
    repeatInterval: 3000,
    vibrate: true,
    vibratePattern: [1000],
  });

  // ── Active call audio — auto-ends when finished ──
  const handleEndCall = useCallback(() => setCallState("ended"), []);

  const activeAudio = useCallAudio(ACTIVE_AUDIO_PATH, {
    enabled: callState === "active",
    onEnded: handleEndCall,
  });

  // Keep playNow stable across renders
  const playNowRef = useRef(activeAudio.playNow);
  playNowRef.current = activeAudio.playNow;

  // ── Call-end beep × 3 ──
  useEffect(() => {
    if (callState !== "ended") return;
    let cancelled = false;
    let count = 0;
    let current: HTMLAudioElement | null = null;

    const playNext = () => {
      if (cancelled || count >= 3) return;
      count++;
      const audio = new Audio(CALL_END_BEEP_PATH);
      current = audio;
      audio.addEventListener("ended", playNext, { once: true });
      audio.play().catch(() => {});
    };

    playNext();

    return () => {
      cancelled = true;
      current?.pause();
    };
  }, [callState]);

  // ── Timer ──
  useEffect(() => {
    if (callState !== "active") return;
    const interval = setInterval(() => setCallSeconds((p) => p + 1), 1000);
    return () => clearInterval(interval);
  }, [callState]);

  // ── Ended: show redirect, then navigate ──
  useEffect(() => {
    if (callState !== "ended") return;
    const t1 = setTimeout(() => setShowRedirect(true), 1500);
    const t2 = setTimeout(() => router.push(NEXT_ROUTE), 3500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [callState, router]);

  // ── Actions ──
  const onAnswer = useCallback(() => {
    // Play audio synchronously within user-gesture context
    playNowRef.current();
    setCallState("active");

    // Request fullscreen after audio starts
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  }, []);
  const onToggleMute = useCallback(() => setIsMuted((v) => !v), []);
  const onToggleSpeaker = useCallback(() => setIsSpeaker((v) => !v), []);

  // ── Derived ──
  const formattedDuration = formatTime(callSeconds);

  const callButtons: CallButton[] = useMemo(
    () => [
      { ...ACTION_BUTTONS[0], active: isMuted },
      ACTION_BUTTONS[1],
      { ...ACTION_BUTTONS[2], active: isSpeaker },
      ACTION_BUTTONS[3],
      ACTION_BUTTONS[4],
      ACTION_BUTTONS[5],
    ],
    [isMuted, isSpeaker],
  );

  const labels = useMemo(
    () => ({
      incomingCall: "Incoming call",
      volumeHint: "Turn up the volume to hear",
      decline: "Decline",
      answer: "Answer",
      callDisconnected: "Call disconnected",
      newMessage: "New message from BAXHEN",
      endCall: "End call",
    }),
    [],
  );

  return {
    callState,
    formattedDuration,
    showRedirect,
    callButtons,
    labels,
    onAnswer,
    onEndCall: handleEndCall,
    onToggleMute,
    onToggleSpeaker,
    onRetryIncomingAudio: incomingAudio.retryPlay,
  };
};
