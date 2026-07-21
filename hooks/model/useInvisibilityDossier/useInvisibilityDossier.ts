"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCallAudio } from "@/hooks/useCallAudio";
import type { InvisibilityDossierModel, Message } from "./useInvisibilityDossier.types";
import {
  SCRIPT,
  NEXT_ROUTE,
  EVIDENCE_AUDIO_PATH,
  SHORT_DELAY,
  AUDIO_DELAY,
  CASE_FILE_DELAY,
  PDF_DOCUMENT_DELAY,
  TRANSITION_DURATION,
} from "./useInvisibilityDossier.const";

export const useInvisibilityDossier = (): InvisibilityDossierModel => {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const labels = useMemo(
    () => ({
      online: "Online",
      message: "Message",
      transcribe: "Transcribe",
      openingRevelation: "Opening the revelation...",
      accessRevelation: "ACCESS THE REVELATION",
    }),
    [],
  );
  const [isTyping, setIsTyping] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isWaitingForAudio, setIsWaitingForAudio] = useState(false);
  const [playingAudioId, setPlayingAudioId] = useState<number | null>(null);
  const [audioProgress, setAudioProgress] = useState<Record<number, number>>({});
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [pdfPage, setPdfPage] = useState(1);
  const cancelledRef = useRef(false);
  const showTimeoutRef = useRef<number | null>(null);
  const advanceTimeoutRef = useRef<number | null>(null);

  // Prefetch next route
  useEffect(() => {
    router.prefetch(NEXT_ROUTE);
  }, [router]);

  // ── Audio: plays when user taps the bubble ──
  const advanceAfterAudio = useCallback(() => {
    setAudioProgress((prev) => {
      if (playingAudioId === null) return prev;
      const next = { ...prev };
      next[playingAudioId] = 1;
      return next;
    });
    setIsWaitingForAudio(false);
    setPlayingAudioId(null);
    setCurrentStep((prev) => prev + 1);
  }, [playingAudioId]);

  const activeAudioSrc =
    playingAudioId !== null
      ? SCRIPT.find((m) => m.id === playingAudioId)?.audioSrc ?? EVIDENCE_AUDIO_PATH
      : EVIDENCE_AUDIO_PATH;

  useCallAudio(activeAudioSrc, {
    enabled: isWaitingForAudio,
    onEnded: advanceAfterAudio,
  });

  const pdfFilename = "The Memory Problem";

  // ── PDF viewer callbacks ──
  const onOpenPdf = useCallback(() => {
    setShowPdfViewer(true);
    setPdfPage(1);
  }, []);

  const onClosePdf = useCallback(() => {
    setShowPdfViewer(false);
    setCurrentStep((prev) => prev + 1);
  }, []);

  const onPdfNavigate = useCallback((page: number) => {
    setPdfPage(page);
  }, []);

  // ── Progress tracker: advances 0→1 while audio plays ──
  useEffect(() => {
    if (!isWaitingForAudio || playingAudioId === null) return;

    // Get duration from the current audio message
    const msg = SCRIPT.find((m) => m.id === playingAudioId);
    const durationStr = msg?.duration ?? "0:45";
    const [min, sec] = durationStr.split(":").map(Number);
    const totalMs = (min * 60 + sec) * 1000;

    const tickRate = 100; // ms
    const interval = setInterval(() => {
      setAudioProgress((prev) => {
        const current = prev[playingAudioId] ?? 0;
        const next = current + tickRate / totalMs;
        return { ...prev, [playingAudioId]: next >= 1 ? 1 : next };
      });
    }, tickRate);

    return () => clearInterval(interval);
  }, [isWaitingForAudio, playingAudioId]);

  // ── Step driver: shows messages one by one ──
  useEffect(() => {
    if (currentStep >= SCRIPT.length) return;

    const msg = SCRIPT[currentStep];
    if (!msg) return; // defensive: guard against out-of-bounds

    const showMessage = () => {
      setIsTyping(false);
      setMessages((prev) => [...prev, msg]);

      if (msg.type === "audio") {
        // Bubble appears — waits for user to tap play
        // onAudioPlay will set playingAudioId + isWaitingForAudio
        // advanceAfterAudio will fire when audio ends
      } else if (msg.type === "pdf-document") {
        // Bubble appears — waits for user to tap download, view PDF, and close
        // onClosePdf advances currentStep
      } else if (msg.type === "button") {
        // Final message — stop auto-advancing
      } else {
        // Text or case-file: advance after a short delay
        const after = msg.type === "case-file" ? CASE_FILE_DELAY + 400 : SHORT_DELAY;
        advanceTimeoutRef.current = window.setTimeout(() => {
          setCurrentStep((prev) => prev + 1);
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
          : msg.type === "pdf-document"
            ? PDF_DOCUMENT_DELAY
            : SHORT_DELAY;

    showTimeoutRef.current = window.setTimeout(showMessage, typingDuration);

    return () => {
      if (showTimeoutRef.current !== null) {
        clearTimeout(showTimeoutRef.current);
        showTimeoutRef.current = null;
      }
      if (advanceTimeoutRef.current !== null) {
        clearTimeout(advanceTimeoutRef.current);
        advanceTimeoutRef.current = null;
      }
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
        setAudioProgress((prev) => ({ ...prev, [id]: 0 }));
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
    labels,
    showPdfViewer,
    pdfPage,
    pdfFilename,
    onAudioPlay,
    onOpenPdf,
    onClosePdf,
    onPdfNavigate,
    onAccessRevelation,
  };
};
