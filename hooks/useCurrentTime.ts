"use client";

import { useState, useEffect } from "react";

const formatTime = (): string => {
  const now = new Date();
  return `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
};

export const useCurrentTime = (intervalMs = 10000): string => {
  const [time, setTime] = useState(formatTime);

  useEffect(() => {
    const interval = setInterval(() => setTime(formatTime()), intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs]);

  return time;
};
