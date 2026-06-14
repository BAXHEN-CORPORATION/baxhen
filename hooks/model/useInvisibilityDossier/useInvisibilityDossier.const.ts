import type { Message } from "./useInvisibilityDossier.types";

export const NEXT_ROUTE = "/";

export const EVIDENCE_AUDIO_PATH = "/audios/what-just-happened.mp3";

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
  t6: t(19, 44),
  t7: t(19, 45),
  t8: t(19, 46),
  t9: t(19, 47),
  t10: t(19, 47),
  t11: t(19, 48),
  t12: t(19, 49),
  t13: t(19, 50),
  t14: t(19, 51),
  t15: t(19, 52),
  t16: t(19, 53),
};

export const SCRIPT: Message[] = [
  {
    id: 1,
    type: "text",
    sender: "baxhen",
    text: "The report has been delivered.",
    timestamp: T.t1,
    status: "read",
  },
  {
    id: 2,
    type: "text",
    sender: "baxhen",
    text: "I've reviewed the findings.",
    timestamp: T.t2,
    status: "read",
  },
  {
    id: 3,
    type: "text",
    sender: "baxhen",
    text: "And honestly...",
    timestamp: T.t3,
    status: "read",
  },
  {
    id: 4,
    type: "text",
    sender: "baxhen",
    text: "The results were disturbing.",
    timestamp: T.t4,
    status: "read",
  },
  {
    id: 5,
    type: "text",
    sender: "baxhen",
    text: "I'm sending you the same evidence.",
    timestamp: T.t5,
    status: "read",
  },
  {
    id: 6,
    type: "text",
    sender: "baxhen",
    text: "Listen carefully.",
    timestamp: T.t6,
    status: "read",
  },
  {
    id: 7,
    type: "audio",
    sender: "baxhen",
    title: "WHAT JUST HAPPENED?",
    duration: "0:20",
    timestamp: T.t7,
    status: "read",
  },
  {
    id: 8,
    type: "text",
    sender: "baxhen",
    text: "This isn't an isolated case. It's an epidemic.",
    timestamp: T.t8,
    status: "read",
  },
  {
    id: 9,
    type: "audio",
    sender: "baxhen",
    title: "THE EPIDEMIC",
    duration: "1:00",
    timestamp: T.t9,
    status: "read",
  },
  {
    id: 10,
    type: "text",
    sender: "baxhen",
    text: "We found the pattern. The invisible mechanism behind it all.",
    timestamp: T.t10,
    status: "read",
  },
  {
    id: 11,
    type: "audio",
    sender: "baxhen",
    title: "THE DISCOVERY",
    duration: "1:00",
    timestamp: T.t11,
    status: "read",
  },
  {
    id: 12,
    type: "text",
    sender: "baxhen",
    text: "Look at this case file. It proves what we're talking about.",
    timestamp: T.t12,
    status: "read",
  },
  {
    id: 13,
    type: "case-file",
    sender: "baxhen",
    title: "CASE FILE #1 — THE MEMORY PROBLEM",
    timestamp: T.t13,
    status: "read",
  },
  {
    id: 14,
    type: "audio",
    sender: "baxhen",
    title: "THE REVEAL",
    duration: "1:15",
    timestamp: T.t14,
    status: "read",
  },
  {
    id: 15,
    type: "audio",
    sender: "baxhen",
    title: "THE DEMONSTRATION",
    duration: "1:30",
    timestamp: T.t15,
    status: "read",
  },
  {
    id: 16,
    type: "button",
    sender: "baxhen",
    text: "ACCESS THE REVELATION",
    timestamp: T.t16,
  },
];
