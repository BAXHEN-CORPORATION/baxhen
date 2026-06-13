import type { Message } from "./useInvisibilityDossier.types";

export const NEXT_ROUTE =
  "/funnels/baxhen/invisibility-investigation/variant-a/revelation";

export const EVIDENCE_AUDIO_PATH = "/audios/evidence-01.mp3";

export const SHORT_DELAY = 800;
export const AUDIO_DELAY = 1000;
export const CASE_FILE_DELAY = 1200;
export const TRANSITION_DURATION = 600;

const padTime = (n: number): string => String(n).padStart(2, "0");

const t = (h: number, m: number): string => `${padTime(h)}:${padTime(m)}`;

// NOTE: create a realistic timeline make a hook for it later;
const T = {
  t1: t(19, 42),
  t2: t(19, 42),
  t3: t(19, 43),
  t4: t(19, 43),
  t5: t(19, 44),
  t6: t(19, 45),
  t7: t(19, 45),
  t8: t(19, 46),
  t9: t(19, 47),
  t10: t(19, 48),
  t11: t(19, 49),
  t12: t(19, 50),
};

export const SCRIPT: Message[] = [
  {
    id: 1,
    type: "text",
    sender: "baxhen",
    text: "Leonardo, it's Baxhen.",
    timestamp: T.t1,
    status: "read",
  },
  {
    id: 2,
    type: "text",
    sender: "baxhen",
    text: "We've been investigating something. Something that explains why great companies stay invisible — no matter how good they are.",
    timestamp: T.t2,
    status: "read",
  },
  {
    id: 3,
    type: "audio",
    sender: "baxhen",
    title: "WHAT JUST HAPPENED?",
    duration: "1:21",
    timestamp: T.t3,
    status: "read",
  },
  {
    id: 4,
    type: "text",
    sender: "baxhen",
    text: "This isn't an isolated case. It's an epidemic.",
    timestamp: T.t4,
    status: "read",
  },
  {
    id: 5,
    type: "audio",
    sender: "baxhen",
    title: "THE EPIDEMIC",
    duration: "1:00",
    timestamp: T.t5,
    status: "read",
  },
  {
    id: 6,
    type: "text",
    sender: "baxhen",
    text: "We found the pattern. The invisible mechanism behind it all.",
    timestamp: T.t6,
    status: "read",
  },
  {
    id: 7,
    type: "audio",
    sender: "baxhen",
    title: "THE DISCOVERY",
    duration: "1:00",
    timestamp: T.t7,
    status: "read",
  },
  {
    id: 8,
    type: "text",
    sender: "baxhen",
    text: "Look at this case file. It proves what we're talking about.",
    timestamp: T.t8,
    status: "read",
  },
  {
    id: 9,
    type: "case-file",
    sender: "baxhen",
    title: "CASE FILE #1 — THE MEMORY PROBLEM",
    timestamp: T.t9,
    status: "read",
  },
  {
    id: 10,
    type: "audio",
    sender: "baxhen",
    title: "THE REVEAL",
    duration: "1:15",
    timestamp: T.t10,
    status: "read",
  },
  {
    id: 11,
    type: "audio",
    sender: "baxhen",
    title: "THE DEMONSTRATION",
    duration: "1:30",
    timestamp: T.t11,
    status: "read",
  },
  {
    id: 12,
    type: "button",
    sender: "baxhen",
    text: "ACCESS THE REVELATION",
    timestamp: T.t12,
  },
];
