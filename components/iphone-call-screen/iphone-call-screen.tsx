"use client";

import { motion } from "framer-motion";
import { Phone, PhoneOff, Volume2, User } from "lucide-react";
import type { IPhoneCallScreenProps } from "./iphone-call-screen.types";
import { ActionButton } from "./iphone-call-screen.components";
import { PhoneTopBar } from "@/components/ui/phone-top-bar";
import { CALLER_NAME, CALLER_TYPE, RINGS } from "./iphone-call-screen.const";

// ---------------------------------------------------------------------------
// IncomingAvatar
// ---------------------------------------------------------------------------

const IncomingAvatar = () => (
  <div
    className="relative flex items-center justify-center"
    style={{ width: 112, height: 112 }}
  >
    {RINGS.map((ring, i) => (
      <span
        key={i}
        className="absolute inset-0 animate-ping rounded-full border border-white"
        style={{
          animationDelay: ring.delay,
          animationDuration: "2s",
          opacity: ring.opacity,
        }}
        aria-hidden="true"
      />
    ))}
    <div
      className="relative z-10 flex h-28 w-28 flex-shrink-0 items-center justify-center rounded-full"
      style={{
        background:
          "linear-gradient(135deg, #48484A 0%, #2C2C2E 50%, #1C1C1E 100%)",
      }}
    >
      <User size={48} className="text-[#A0A0A0]" />
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// IncomingCallerInfo
// ---------------------------------------------------------------------------

const IncomingCallerInfo = () => (
  <div className="flex flex-col items-center gap-1">
    <h1 className="text-[28px] font-semibold tracking-tight text-white">
      {CALLER_NAME}
    </h1>
    <p className="text-sm text-white/40">{CALLER_TYPE}</p>
  </div>
);

// ---------------------------------------------------------------------------
// ActiveCallerInfo
// ---------------------------------------------------------------------------

const ActiveCallerInfo = ({
  formattedDuration,
}: {
  formattedDuration: string;
}) => (
  <div className="flex flex-shrink-0 flex-col items-center gap-2 pt-8">
    <div
      className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full"
      style={{
        background:
          "linear-gradient(135deg, #48484A 0%, #2C2C2E 50%, #1C1C1E 100%)",
      }}
    >
      <div className="flex h-full w-full items-center justify-center">
        <User size={28} className="text-[#A0A0A0]" />
      </div>
    </div>
    <div className="flex flex-col items-center gap-0.5">
      <h2 className="text-2xl font-semibold tracking-tight text-white">
        {CALLER_NAME}
      </h2>
      <p className="text-sm tabular-nums text-white/50">{formattedDuration}</p>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// ActionGrid
// ---------------------------------------------------------------------------

const ActionGrid = ({
  callButtons,
  onToggleMute,
  onToggleSpeaker,
}: {
  callButtons: IPhoneCallScreenProps["callButtons"];
  onToggleMute: () => void;
  onToggleSpeaker: () => void;
}) => {
  const handlers = [
    onToggleMute,
    undefined,
    onToggleSpeaker,
    undefined,
    undefined,
    undefined,
  ];

  return (
    <div className="flex-shrink-0 px-8 pb-8">
      <div className="grid grid-cols-3 gap-5">
        {callButtons.map((btn, i) => (
          <ActionButton
            key={btn.label}
            Icon={btn.Icon}
            label={btn.label}
            active={btn.active}
            onClick={handlers[i]}
            actionable={i === 0 || i === 2}
          />
        ))}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// HangupButton
// ---------------------------------------------------------------------------

const HangupButton = ({ onClick, ariaLabel }: { onClick?: () => void; ariaLabel: string }) => (
  <div className="flex flex-shrink-0 flex-col items-center pb-12">
    <motion.button
      onClick={onClick}
      className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#FF3B30] focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-black"
      aria-label={ariaLabel}
      whileTap={{ scale: 0.88 }}
      style={{ cursor: "pointer" }}
    >
      <PhoneOff size={32} className="text-white" aria-hidden="true" />
    </motion.button>
  </div>
);

// ---------------------------------------------------------------------------
// AtmosphericBg
// ---------------------------------------------------------------------------

const AtmosphericBg = () => (
  <>
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-900 via-black to-black" />
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 80% 45% at 50% 18%, rgba(55,55,55,0.55) 0%, transparent 70%)",
      }}
    />
  </>
);

// ---------------------------------------------------------------------------
// IPhoneCallScreen (main exported component)
// ---------------------------------------------------------------------------

export const IPhoneCallScreen = ({
  callState,
  formattedDuration,
  showRedirect,
  callButtons,
  labels,
  onAnswer,
  onEndCall,
  onToggleMute,
  onToggleSpeaker,
  onRetryIncomingAudio,
}: IPhoneCallScreenProps) => (
  <main
    className="w-full max-w-[100vw] overflow-x-hidden bg-black"
    style={{ height: "100dvh" }}
  >
    <div
      className="relative mx-auto flex w-full max-w-[430px] flex-col overflow-hidden bg-black"
      style={{ height: "100dvh" }}
    >
      <AtmosphericBg />
      <PhoneTopBar variant="dark" />

      {/* ── INCOMING ── */}
      {callState === "incoming" && (
        <div
          className="relative z-10 flex flex-1 flex-col items-center overflow-hidden"
          onClick={onRetryIncomingAudio}
        >
          {/* TOP */}
          <div className="flex flex-col items-center gap-5 pt-10">
            <p className="text-xs uppercase tracking-[0.22em] text-white/50">
              {labels.incomingCall}
            </p>
            <IncomingAvatar />
            <IncomingCallerInfo />
          </div>

          {/* MIDDLE */}
          <div className="flex flex-1 flex-col items-center justify-center gap-2">
            <Volume2 className="h-5 w-5 text-white/30" aria-hidden="true" />
            <p className="max-w-[180px] break-words text-center text-xs hyphens-auto text-white/30">
              {labels.volumeHint}
            </p>
          </div>

          {/* BOTTOM: Decline / Answer */}
          <div className="flex w-full max-w-[300px] items-center justify-between px-4 pb-16">
            {/* Decline */}
            <div className="flex flex-col items-center gap-2.5">
              <motion.button
                onClick={onEndCall}
                className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#FF3B30] focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-black"
                aria-label={labels.endCall}
                whileTap={{ scale: 0.88 }}
                style={{ cursor: "pointer" }}
              >
                <PhoneOff size={32} className="text-white" aria-hidden="true" />
              </motion.button>
              <span className="text-xs font-light tracking-wide text-white/50">
                {labels.decline}
              </span>
            </div>

            {/* Answer */}
            <div className="flex flex-col items-center gap-2.5">
              <div className="relative flex items-center justify-center">
                <span
                  className="absolute animate-ping rounded-full bg-[#34C759]"
                  style={{
                    inset: -10,
                    opacity: 0.22,
                    animationDuration: "1.3s",
                  }}
                  aria-hidden="true"
                />
                <span
                  className="absolute animate-ping rounded-full bg-[#34C759]"
                  style={{
                    inset: -5,
                    opacity: 0.32,
                    animationDuration: "1.3s",
                    animationDelay: "0.35s",
                  }}
                  aria-hidden="true"
                />
                <motion.button
                  onClick={onAnswer}
                  className="relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#34C759] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-black"
                  aria-label={labels.answer}
                  whileTap={{ scale: 0.88 }}
                  style={{
                    boxShadow: "0 0 28px rgba(52,199,89,0.5)",
                    cursor: "pointer",
                  }}
                >
                  <Phone size={32} className="text-white" aria-hidden="true" />
                </motion.button>
              </div>
              <span className="text-xs font-light tracking-wide text-white/50">
                {labels.answer}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── ACTIVE ── */}
      {callState === "active" && (
        <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
          <ActiveCallerInfo formattedDuration={formattedDuration} />
          <div className="flex-1" />
          <ActionGrid
            callButtons={callButtons}
            onToggleMute={onToggleMute}
            onToggleSpeaker={onToggleSpeaker}
          />
          <HangupButton onClick={onEndCall} ariaLabel={labels.endCall} />
        </div>
      )}

      {/* ── ENDED ── */}
      {callState === "ended" && (
        <div
          className="relative z-10 flex flex-1 flex-col items-center justify-center gap-5 px-10"
          aria-live="assertive"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
            <PhoneOff size={28} className="text-zinc-500" aria-hidden="true" />
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-lg font-medium text-white/65">
              {labels.callDisconnected}
            </p>
            <p className="text-sm tabular-nums text-zinc-600">
              {formattedDuration}
            </p>
          </div>

          {showRedirect && (
            <div className="mt-4 flex flex-col items-center gap-3">
              <div className="flex gap-1.5" aria-hidden="true">
                {([0, 1, 2] as number[]).map((i) => (
                  <motion.div
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-[#34C759]"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.22,
                    }}
                  />
                ))}
              </div>
              <p className="text-center text-sm text-white/40">
                {labels.newMessage}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  </main>
);
