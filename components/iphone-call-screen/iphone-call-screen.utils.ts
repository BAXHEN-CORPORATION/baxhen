"use client";

import { useState, useEffect } from "react";
import { REFRESH_INTERVAL } from "./iphone-call-screen.const";

const formatCurrentTime = (): string => {
  const now = new Date();
  return `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
};

export const useIphoneCallScreenUtils = (): { currentTime: string } => {
  const [currentTime, setCurrentTime] = useState(formatCurrentTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(formatCurrentTime());
    }, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return { currentTime };
};
