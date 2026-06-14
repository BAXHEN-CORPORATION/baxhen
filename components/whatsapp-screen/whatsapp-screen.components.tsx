"use client";

import { Play, Pause, CheckCheck } from "lucide-react";
import type { Message } from "@/hooks/model/useInvisibilityDossier";

// ---------------------------------------------------------------------------
// TextBubble
// ---------------------------------------------------------------------------

const TextBubble = ({ message }: { message: Message }) => {
  const isBaxhen = message.sender === "baxhen";

  return (
    <div className={isBaxhen ? "flex justify-start" : "flex justify-end"}>
      <div
        className={[
          "relative max-w-[80%] rounded-[8px] px-3 pb-1.5 pt-2 text-[15px] leading-[1.4] shadow-sm",
          isBaxhen
            ? "bg-white rounded-tl-[2px]"
            : "bg-[#DCF8C6] rounded-tr-[2px]",
        ].join(" ")}
        style={{ fontFamily: "inherit" }}
      >
        <p className="break-words hyphens-auto text-black pr-10">
          {message.text}
        </p>

        {/* Timestamp + checks inline (bottom-right of bubble) */}
        <span className="float-right -mb-1 ml-2 mt-1 flex items-center gap-0.5 text-[11px] text-[#667781]">
          {message.timestamp}
          {message.status === "read" && (
            <CheckCheck size={15} className="text-[#34B7F1]" />
          )}
        </span>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// AudioBubble — WhatsApp iOS voice note (authentic layout)
// ---------------------------------------------------------------------------

const WAVEFORM_BARS = [
  0.45, 0.65, 0.55, 0.9, 0.5, 0.7, 0.4, 0.85, 0.6, 0.75, 0.5, 0.95, 0.55, 0.7,
  0.45, 0.8, 0.5, 0.6, 0.35, 0.9, 0.55, 0.85, 0.4, 0.7, 0.5, 0.95, 0.6, 0.75,
  0.45, 0.8, 0.55, 0.65, 0.5, 0.9, 0.45, 0.7,
];

const AudioBubble = ({
  message,
  isPlaying,
  onToggle,
  progress,
}: {
  message: Message;
  isPlaying: boolean;
  onToggle: () => void;
  progress: number;
}) => (
  <div className="flex justify-start">
    <div
      className="relative flex w-[290px] max-w-[85%] flex-col rounded-[8px] bg-white px-3 pb-3 pt-2.5 shadow-sm"
      style={{ fontFamily: "inherit" }}
    >
      {/* Top row: play button + waveform + avatar */}
      <div className="flex items-center gap-2.5">
        {/* Triangular play button — light gray circle */}
        <button
          type="button"
          aria-label={
            isPlaying ? `Pause ${message.title}` : `Play ${message.title}`
          }
          onClick={onToggle}
          className="flex h-[32px] w-[32px] flex-shrink-0 items-center justify-center rounded-full bg-[#E8E8E8] transition hover:bg-[#DDD] focus:outline-none focus:ring-2 focus:ring-[#075E54]/40"
        >
          {isPlaying ? (
            <Pause size={14} className="text-[#667781]" />
          ) : (
            <Play size={14} className="ml-0.5 text-[#667781]" />
          )}
        </button>

        {/* Waveform area */}
        <div className="relative flex flex-1 items-center">
          {/* Blue progress dot — centered vertically and horizontally on waveform */}
          <div
            className="absolute top-1/2 z-10 h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#027EB5]"
            style={{ left: `${progress * 100}%` }}
          />

          {/* Waveform bars */}
          <div className="flex h-[32px] flex-1 items-center gap-[1px]">
            {WAVEFORM_BARS.map((h, i) => {
              const barProgress = i / WAVEFORM_BARS.length;
              const played = progress > 0 && barProgress <= progress;
              return (
                <div
                  key={i}
                  className="min-w-0 flex-1 rounded-full"
                  style={{
                    height: `${8 + h * 24}px`,
                    backgroundColor: played ? "#027EB5" : "#CCC",
                    transition: "background-color 0.3s",
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Avatar with mic overlay on bottom-right */}
        <div className="relative flex-shrink-0">
          <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-black overflow-hidden">
            <img
              src="/images/icon-no-bg.png"
              alt="Baxhen"
              className="h-full w-full object-cover"
            />
          </div>
          {/* Mic icon — positioned on bottom-right corner of avatar */}
          <div className="absolute -bottom-0.5 -left-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#027EB5]">
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="white"
              aria-hidden="true"
            >
              <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3z" />
              <path
                d="M19 10v1a7 7 0 0 1-14 0v-1"
                stroke="white"
                strokeWidth="2"
                fill="none"
              />
              <line
                x1="12"
                y1="19"
                x2="12"
                y2="23"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom row: duration + transcribe + timestamp */}
      <div className="mt-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-[500] text-[#667781]">
            {message.duration}
          </span>
          <span className="text-[12px] font-[500] text-[#027EB5]">
            Transcribe
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[11px] text-[#B0B3B8]">
            {message.timestamp}
          </span>
          {message.status === "read" && (
            <CheckCheck size={14} className="text-[#34B7F1]" />
          )}
        </div>
      </div>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// MessageBubble
// ---------------------------------------------------------------------------

export const MessageBubble = ({
  message,
  isPlaying,
  audioProgress,
  onAudioPlay,
}: {
  message: Message;
  isPlaying: boolean;
  audioProgress: number;
  onAudioPlay: (id: number) => void;
}) => {
  if (message.type === "text") {
    return <TextBubble message={message} />;
  }

  if (message.type === "audio") {
    return (
      <AudioBubble
        message={message}
        isPlaying={isPlaying}
        progress={audioProgress}
        onToggle={() => onAudioPlay(message.id)}
      />
    );
  }

  return null;
};
