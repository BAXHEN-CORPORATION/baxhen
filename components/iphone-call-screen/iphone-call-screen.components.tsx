"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

// ---------------------------------------------------------------------------
// ActionButton — repeated 6× in the action grid
// ---------------------------------------------------------------------------

export const ActionButton = ({
  Icon,
  label,
  active,
  onClick,
  actionable,
}: {
  Icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick?: () => void;
  actionable?: boolean;
}) => (
  <motion.button
    onClick={onClick}
    className={[
      "flex flex-col items-center justify-center gap-1.5 rounded-2xl py-4",
      "focus:outline-none focus:ring-2 focus:ring-white/30",
      active ? "bg-white text-zinc-900" : "bg-white/[0.14] text-white",
      !actionable ? "cursor-default opacity-50" : "cursor-pointer",
    ]
      .filter(Boolean)
      .join(" ")}
    aria-label={label}
    aria-pressed={actionable ? active : undefined}
    whileTap={actionable ? { scale: 0.93 } : undefined}
  >
    <Icon size={28} />
    <span className="text-[11px] font-medium tracking-wide">{label}</span>
  </motion.button>
);
