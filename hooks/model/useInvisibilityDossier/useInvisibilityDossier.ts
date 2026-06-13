"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCallAudio } from "@/hooks/useCallAudio";
import type { InvisibilityDossierModel } from "./useInvisibilityDossier.types";
import {
  SCRIPT,
  NEXT_ROUTE,
  EVIDENCE_AUDIO_PATH,
  SHORT_DELAY,
  AUDIO_DELAY,
  CASE_FILE_DELAY,
  TRANSITION_DURATION,
} from "./useInvisibilityDossier.const";

export const useInvisibilityDossier = (): InvisibilityDossierModel => {
  const router = useRouter();
  const [messages, setMessages] = useState(SCRIPT.slice(0, 0));
  const [isTyping, setIsTyping] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isWaitingForAudio, setIsWaitingForAudio] = useState(false);
  const [playingAudioId, setPlayingAudioId] = useState<number | null>(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const cancelledRef = useRef(false);

  // Prefetch next route
  useEffect(() => {
    router.prefetch(NEXT_ROUTE);
  }, [router]);

  // ── Audio: plays when user taps the bubble ──
  const advanceAfterAudio = useCallback(() => {
    setIsWaitingForAudio(false);
    setPlayingAudioId(null);
    setAudioProgress(0);
    setCurrentStep((prev) => prev + 1);
  }, []);

  useCallAudio(EVIDENCE_AUDIO_PATH, {
    enabled: isWaitingForAudio,
    onEnded: advanceAfterAudio,
  });

  // ── Progress tracker: advances 0→1 while audio plays ──
  useEffect(() => {
    if (!isWaitingForAudio || playingAudioId === null) {
      setAudioProgress(0);
      return;
    }

    // Get duration from the current audio message
    const msg = SCRIPT.find((m) => m.id === playingAudioId);
    const durationStr = msg?.duration ?? "0:45";
    const [min, sec] = durationStr.split(":").map(Number);
    const totalMs = (min * 60 + sec) * 1000;

    const tickRate = 100; // ms
    const interval = setInterval(() => {
      setAudioProgress((prev) => {
        const next = prev + tickRate / totalMs;
        return next >= 1 ? 1 : next;
      });
    }, tickRate);

    return () => clearInterval(interval);
  }, [isWaitingForAudio, playingAudioId]);

  // ── Step driver: shows messages one by one ──
  useEffect(() => {
    if (cancelledRef.current) return;
    if (currentStep >= SCRIPT.length) return;

    const msg = SCRIPT[currentStep];
    let timeout: number;

    const showMessage = () => {
      if (cancelledRef.current) return;
      setIsTyping(false);
      setMessages((prev) => [...prev, msg]);

      if (msg.type === "audio") {
        // Bubble appears — waits for user to tap play
        // onAudioPlay will set playingAudioId + isWaitingForAudio
        // advanceAfterAudio will fire when audio ends
      } else if (msg.type === "button") {
        // Final message — stop auto-advancing
      } else {
        // Text or case-file: advance after a short delay
        const after = msg.type === "case-file" ? CASE_FILE_DELAY + 400 : SHORT_DELAY;
        timeout = window.setTimeout(() => {
          if (!cancelledRef.current) {
            setCurrentStep((prev) => prev + 1);
          }
        }, after);
      }
    };

    // Show typing indicator first
    setIsTyping(true);
    const typingDuration =
      msg.type === "audio"
        ? AUDIO_DELAY
        : msg.type === "case-file"
          ? CASE_FILE_DELAY
          : SHORT_DELAY;

    timeout = window.setTimeout(showMessage, typingDuration);

    return () => {
      clearTimeout(timeout);
    };
  }, [currentStep]);

  // ── Cleanup on unmount ──
  useEffect(() => {
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  // ── Audio play/pause (user toggles the bubble) ──
  const onAudioPlay = useCallback(
    (id: number) => {
      if (playingAudioId === id && isWaitingForAudio) {
        // Currently playing — pause
        setIsWaitingForAudio(false);
      } else if (playingAudioId === id && !isWaitingForAudio) {
        // Currently paused — resume
        setIsWaitingForAudio(true);
      } else {
        // First tap on this bubble — start playback
        setAudioProgress(0);
        setPlayingAudioId(id);
        setIsWaitingForAudio(true);
      }
    },
    [playingAudioId, isWaitingForAudio],
  );

  // ── CTA: transition and navigate ──
  const onAccessRevelation = useCallback(() => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    setIsTransitioning(true);

    window.setTimeout(() => {
      router.push(NEXT_ROUTE);
    }, TRANSITION_DURATION);
  }, [router]);

  return {
    messages,
    isTyping,
    isTransitioning,
    playingAudioId,
    audioProgress,
    onAudioPlay,
    onAccessRevelation,
  };
};
