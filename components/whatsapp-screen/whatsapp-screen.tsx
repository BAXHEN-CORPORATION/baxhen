"use client";

import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  MoreVertical,
  Mic,
  Camera,
  Phone,
} from "lucide-react";
import type { WhatsAppScreenProps } from "./whatsapp-screen.types";
import { MessageBubble } from "./whatsapp-screen.components";
import {
  CONTACT_NAME,
  CONTACT_STATUS,
  CASE_FILE_PAGES,
} from "./whatsapp-screen.const";

// ---------------------------------------------------------------------------
// iOS 17 StatusBar (iPhone 15 Pro Max — Dynamic Island)
// ---------------------------------------------------------------------------

const StatusBar = () => (
  <div className="flex h-[54px] flex-shrink-0 items-end justify-between px-6 pb-2">
    <span
      className="text-[15px] font-[600] tabular-nums text-black"
      style={{ fontFamily: "inherit" }}
    >
      9:41
    </span>
    {/* Dynamic Island pill */}
    <div className="absolute left-1/2 top-2 h-[32px] w-[126px] -translate-x-1/2 rounded-full bg-black" />
    <div className="flex items-center gap-1.5 text-black">
      {/* Signal bars */}
      <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor" aria-hidden="true">
        <rect x="0" y="8" width="3" height="4" rx="0.5" />
        <rect x="5" y="5" width="3" height="7" rx="0.5" />
        <rect x="10" y="2" width="3" height="10" rx="0.5" />
        <rect x="15" y="0" width="3" height="12" rx="0.5" />
      </svg>
      {/* Wifi */}
      <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" aria-hidden="true">
        <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
        <path d="M9.97 7.47a4 4 0 0 0-3.94 0l1.06 1.06a2.5 2.5 0 0 1 1.82 0l1.06-1.06z" />
        <path d="M11.94 5.03a6.5 6.5 0 0 0-7.88 0l1.06 1.06a5 5 0 0 1 5.76 0l1.06-1.06z" />
      </svg>
      {/* Battery */}
      <svg width="27" height="13" viewBox="0 0 27 13" fill="none" aria-hidden="true">
        <rect x="0.5" y="0.5" width="23" height="12" rx="3" stroke="currentColor" strokeWidth="1" />
        <rect x="2" y="2" width="20" height="9" rx="1.5" fill="currentColor" />
        <rect x="24.5" y="3.5" width="2" height="6" rx="1" fill="currentColor" opacity="0.4" />
      </svg>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

const Header = () => (
  <div className="flex h-[44px] flex-shrink-0 items-center gap-1 border-b border-[#E0E0E0] bg-white px-2">
    {/* iOS back arrow — blue */}
    <button
      type="button"
      aria-label="Back"
      className="flex h-[44px] w-[44px] items-center justify-center text-[#007AFF] transition hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#007AFF]/40"
    >
      <ArrowLeft size={24} strokeWidth={2.5} />
    </button>

    {/* Avatar */}
    <div className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full bg-black">
      <span className="text-[13px] font-bold text-white">BX</span>
    </div>

    {/* Name + status */}
    <div
      className="flex flex-1 flex-col justify-center leading-tight"
      style={{ fontFamily: "inherit" }}
    >
      <span className="text-[16.5px] font-[600] text-black">
        {CONTACT_NAME}
      </span>
      <span className="text-[12px] font-[400] text-[#8E8E93]">
        {CONTACT_STATUS}
      </span>
    </div>

    {/* Video call — blue */}
    <button
      type="button"
      aria-label="Video call"
      className="flex h-[44px] w-[44px] items-center justify-center text-[#007AFF] transition hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#007AFF]/40"
    >
      <Camera size={22} strokeWidth={2} />
    </button>

    {/* Voice call — blue */}
    <button
      type="button"
      aria-label="Voice call"
      className="flex h-[44px] w-[44px] items-center justify-center text-[#007AFF] transition hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#007AFF]/40"
    >
      <Phone size={21} strokeWidth={2} />
    </button>
  </div>
);

// ---------------------------------------------------------------------------
// TypingIndicator
// ---------------------------------------------------------------------------

const TypingIndicator = () => (
  <div className="flex items-start px-4 py-1">
    <div
      className="flex items-center gap-1 rounded-[18px] rounded-bl-[4px] bg-white px-4 py-3 shadow-sm"
      style={{ fontFamily: "inherit" }}
    >
      {([0, 1, 2] as number[]).map((i) => (
        <div
          key={i}
          className={`h-[7px] w-[7px] rounded-full bg-[#667781]/50 dot-${i + 1}`}
        />
      ))}
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// CaseFileCard
// ---------------------------------------------------------------------------

const CaseFileCard = ({ title }: { title: string }) => (
  <div className="flex flex-col self-start">
    <div
      className="w-[280px] max-w-[85%] overflow-hidden rounded-[8px] border border-[#E5E5EA] bg-white"
      style={{ fontFamily: "inherit" }}
    >
      <div className="border-b border-[#E5E5EA] px-4 py-3">
        <span className="text-[12px] font-[700] uppercase tracking-[0.06em] text-[#667781]">
          {title}
        </span>
      </div>
      <div className="flex flex-col divide-y divide-[#E5E5EA]/60">
        {CASE_FILE_PAGES.map((page, i) => (
          <div key={i} className="flex items-start gap-3 px-4 py-3">
            <div className="flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-full bg-[#075E54]/10 text-[10px] font-[700] text-[#075E54]">
              {i + 1}
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[13px] font-[600] text-black">
                {page.title}
              </span>
              <p className="whitespace-pre-line text-[13px] leading-[1.5] text-[#3B3B3B]">
                {page.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <span className="mt-0.5 self-start pl-1 text-[11px] text-[#667781]">
      19:49
    </span>
  </div>
);

// ---------------------------------------------------------------------------
// CTAButton
// ---------------------------------------------------------------------------

const CTAButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => (
  <div className="flex flex-col self-start">
    <button
      type="button"
      onClick={onClick}
      className="min-h-[44px] min-w-[44px] rounded-[18px] rounded-bl-[4px] bg-[#075E54] px-6 py-3 text-[15px] font-[600] text-white shadow-sm transition duration-200 ease-out hover:brightness-110 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#075E54] focus:ring-offset-2 focus:ring-offset-white"
      style={{ fontFamily: "inherit" }}
    >
      {text}
    </button>
    <span className="mt-0.5 self-start pl-1 text-[11px] text-[#667781]">
      19:50
    </span>
  </div>
);

// ---------------------------------------------------------------------------
// InputBar
// ---------------------------------------------------------------------------

const InputBar = () => (
  <div className="flex h-[48px] flex-shrink-0 items-center gap-1 bg-[#F6F6F6] px-2">
    <button
      type="button"
      aria-label="Add attachment"
      className="flex h-[36px] w-[36px] items-center justify-center rounded-full text-[#075E54] transition hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#075E54]/40"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    </button>
    <div className="flex flex-1 items-center rounded-full bg-white px-4 py-2 shadow-sm">
      <span
        className="text-[15px] text-[#9AA0A6]"
        style={{ fontFamily: "inherit" }}
      >
        Message
      </span>
    </div>
    <button
      type="button"
      aria-label="Record voice message"
      className="flex h-[36px] w-[36px] items-center justify-center rounded-full text-[#075E54] transition hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#075E54]/40"
    >
      <Mic size={22} />
    </button>
  </div>
);

// ---------------------------------------------------------------------------
// TransitionOverlay
// ---------------------------------------------------------------------------

const TransitionOverlay = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 transition-opacity duration-500">
    <p
      className="animate-pulse text-[18px] font-light text-white"
      style={{ fontFamily: "inherit" }}
    >
      Opening the revelation...
    </p>
  </div>
);

// ---------------------------------------------------------------------------
// WhatsAppScreen
// ---------------------------------------------------------------------------

const REAL_WP_BG =
  "url(\"data:image/svg+xml,%3Csvg width='240' height='240' viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd' opacity='.12'%3E%3Ccircle cx='40' cy='40' r='2' fill='%23888'/%3E%3Ccircle cx='120' cy='30' r='1.5' fill='%23888'/%3E%3Ccircle cx='200' cy='50' r='2.5' fill='%23888'/%3E%3Ccircle cx='70' cy='100' r='1.5' fill='%23888'/%3E%3Ccircle cx='160' cy='110' r='2' fill='%23888'/%3E%3Ccircle cx='30' cy='170' r='1' fill='%23888'/%3E%3Ccircle cx='100' cy='180' r='2' fill='%23888'/%3E%3Ccircle cx='180' cy='160' r='1.5' fill='%23888'/%3E%3Ccircle cx='50' cy='210' r='2' fill='%23888'/%3E%3Ccircle cx='140' cy='220' r='1' fill='%23888'/%3E%3Ccircle cx='220' cy='200' r='2.5' fill='%23888'/%3E%3Ccircle cx='90' cy='55' r='1' fill='%23888'/%3E%3Ccircle cx='210' cy='90' r='2' fill='%23888'/%3E%3Ccircle cx='15' cy='130' r='1.5' fill='%23888'/%3E%3Ccircle cx='150' cy='65' r='2' fill='%23888'/%3E%3Ccircle cx='60' cy='150' r='1' fill='%23888'/%3E%3Ccircle cx='190' cy='230' r='1.5' fill='%23888'/%3E%3C/g%3E%3C/svg%3E\")";

export const WhatsAppScreen = ({
  messages,
  isTyping,
  isTransitioning,
  playingAudioId,
  audioProgress,
  onAudioPlay,
  onAccessRevelation,
}: WhatsAppScreenProps) => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <main className="max-w-[100vw] overflow-x-hidden bg-black">
      <div
        className="relative mx-auto flex h-[100dvh] w-full max-w-[480px] flex-col overflow-hidden bg-[#E8E2D9]"
        style={{
          backgroundImage: REAL_WP_BG,
          backgroundRepeat: "repeat",
          backgroundSize: "240px 240px",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
        }}
      >
        {/* Top bar: StatusBar + Header combined */}
        <div className="flex-shrink-0 bg-white">
          <StatusBar />
          <Header />
        </div>

        {/* Chat area */}
        <div className="flex-1 overflow-y-auto px-3 scrollbar-hide">
          <div className="flex flex-col gap-1.5 pt-2 pb-2">
            {messages.map((msg) => {
              if (msg.type === "case-file") {
                return (
                  <CaseFileCard key={msg.id} title={msg.title ?? ""} />
                );
              }

              if (msg.type === "button") {
                return (
                  <CTAButton
                    key={msg.id}
                    text={msg.text ?? ""}
                    onClick={onAccessRevelation}
                  />
                );
              }

              return (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isPlaying={playingAudioId === msg.id}
                  audioProgress={audioProgress}
                  onAudioPlay={onAudioPlay}
                />
              );
            })}

            {isTyping && <TypingIndicator />}
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Footer: input bar */}
        <div className="flex-shrink-0 border-t border-[#E0E0E0]">
          <InputBar />
        </div>

        {isTransitioning && <TransitionOverlay />}
      </div>
    </main>
  );
};
