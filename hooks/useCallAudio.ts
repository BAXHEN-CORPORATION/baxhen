"use client";

import { useEffect, useRef, useCallback, useState } from "react";

interface UseCallAudioOptions {
  loop?: boolean;
  repeatInterval?: number;
  enabled?: boolean;
  vibrate?: boolean;
  vibratePattern?: number | number[];
  onEnded?: () => void;
}

interface UseCallAudioReturn {
  retryPlay: () => void;
  hasStarted: boolean;
  showFallback: boolean;
  isActive: boolean;
}

export function useCallAudio(
  src: string,
  {
    loop = false,
    repeatInterval,
    enabled = true,
    vibrate = false,
    vibratePattern = [400, 200, 400],
    onEnded,
  }: UseCallAudioOptions = {},
): UseCallAudioReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Refs keep callbacks stable — no new array/boolean reference on each render
  const vibrateRef = useRef(vibrate);
  const vibratePatternRef = useRef(vibratePattern);
  const onEndedRef = useRef(onEnded);
  vibrateRef.current = vibrate;
  vibratePatternRef.current = vibratePattern;
  onEndedRef.current = onEnded;

  const playAudio = useCallback((): HTMLAudioElement => {
    const audio = new Audio(src);
    audio.loop = loop;

    audio.addEventListener(
      "play",
      () => {
        setHasStarted(true);
        setShowFallback(false);
        setIsActive(true);
        if (
          vibrateRef.current &&
          typeof navigator !== "undefined" &&
          "vibrate" in navigator
        ) {
          navigator.vibrate(vibratePatternRef.current);
        }
      },
      { once: true },
    );

    audio.addEventListener("pause", () => {
      setIsActive(false);
    });

    audio.addEventListener("ended", () => {
      setIsActive(false);
      onEndedRef.current?.();
    });

    audio.play().catch(() => {
      setShowFallback(true);
    });

    return audio;
  }, [src, loop]);

  useEffect(() => {
    if (!enabled || !src) return;

    const audio = playAudio();
    audioRef.current = audio;

    if (!repeatInterval) {
      return () => {
        audio.pause();
        audio.currentTime = 0;
        audioRef.current = null;
      };
    }

    const interval = setInterval(() => {
      audioRef.current?.pause();
      audioRef.current = playAudio();
    }, repeatInterval);

    return () => {
      clearInterval(interval);
      audioRef.current?.pause();
      audioRef.current = null;
      if (
        vibrateRef.current &&
        typeof navigator !== "undefined" &&
        "vibrate" in navigator
      ) {
        navigator.vibrate(0);
      }
    };
  }, [enabled, src, loop, repeatInterval, playAudio]);

  const retryPlay = useCallback(() => {
    if (!audioRef.current || !audioRef.current.paused) return;

    audioRef.current
      .play()
      .then(() => {
        setHasStarted(true);
        setShowFallback(false);
        setIsActive(true);
      })
      .catch(() => {
        setShowFallback(true);
      });
  }, []);

  return { retryPlay, hasStarted, showFallback, isActive };
}
