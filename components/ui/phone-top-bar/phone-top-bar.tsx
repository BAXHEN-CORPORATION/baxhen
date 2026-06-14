"use client";

import { useCurrentTime } from "@/hooks/useCurrentTime";
import type { PhoneTopBarProps } from "./phone-top-bar.types";

export const PhoneTopBar = ({
  variant,
  time,
  showDynamicIsland,
}: PhoneTopBarProps) => {
  const isLight = variant === "light";
  const island = showDynamicIsland ?? isLight;
  const textColor = isLight ? "text-black" : "text-white";
  const height = isLight ? "h-[54px]" : "h-[44px]";

  const liveTime = useCurrentTime();
  const displayTime = time ?? liveTime;

  return (
    <div
      className={`flex flex-shrink-0 items-end justify-between px-6 pb-2 ${height} relative`}
      style={{ fontFamily: "inherit" }}
    >
      <span className={`text-[15px] font-[600] tabular-nums ${textColor}`}>
        {displayTime}
      </span>

      {/* Dynamic Island — visible only in light mode (iPhone 15 Pro Max) */}
      {island && (
        <div className="absolute left-1/2 top-2 h-[32px] w-[126px] -translate-x-1/2 rounded-full bg-black" />
      )}

      <div className={`flex items-center gap-1.5 ${textColor}`}>
        {/* Signal bars */}
        <svg
          width="18"
          height="12"
          viewBox="0 0 18 12"
          fill="currentColor"
          aria-hidden="true"
        >
          <rect x="0" y="8" width="3" height="4" rx="0.5" />
          <rect x="5" y="5" width="3" height="7" rx="0.5" />
          <rect x="10" y="2" width="3" height="10" rx="0.5" />
          <rect x="15" y="0" width="3" height="12" rx="0.5" />
        </svg>

        {/* Wifi */}
        <svg
          width="16"
          height="12"
          viewBox="0 0 16 12"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
          <path d="M9.97 7.47a4 4 0 0 0-3.94 0l1.06 1.06a2.5 2.5 0 0 1 1.82 0l1.06-1.06z" />
          <path d="M11.94 5.03a6.5 6.5 0 0 0-7.88 0l1.06 1.06a5 5 0 0 1 5.76 0l1.06-1.06z" />
        </svg>

        {/* Battery */}
        <svg
          width="27"
          height="13"
          viewBox="0 0 27 13"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="0.5"
            y="0.5"
            width="23"
            height="12"
            rx="3"
            stroke="currentColor"
            strokeWidth="1"
          />
          <rect x="2" y="2" width="20" height="9" rx="1.5" fill="currentColor" />
          <rect
            x="24.5"
            y="3.5"
            width="2"
            height="6"
            rx="1"
            fill="currentColor"
            opacity="0.4"
          />
        </svg>
      </div>
    </div>
  );
};
