"use client";

import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import type { PdfViewerProps } from "./pdf-viewer.types";
import { PDF_PAGES } from "./pdf-viewer.const";

export const PdfViewer = ({
  filename,
  currentPage,
  onClose,
  onNavigate,
}: PdfViewerProps) => {
  const totalPages = PDF_PAGES.length;
  const page = PDF_PAGES[currentPage - 1];
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;
  const isWhyPage = currentPage === 3;

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <div
        className="relative mx-auto flex h-[100dvh] w-full max-w-[480px] flex-col bg-[#F2F2F7] overflow-hidden"
        style={{ fontFamily: "inherit" }}
      >
        {/* ── Top navigation bar ── */}
        <div className="flex h-[44px] flex-shrink-0 items-center gap-3 border-b border-[#D1D1D6] bg-white px-2">
          <button
            type="button"
            aria-label="Close PDF viewer"
            onClick={onClose}
            className="flex items-center gap-0.5 text-[#007AFF] transition hover:bg-black/5 rounded px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-[#007AFF]/40"
          >
            <ArrowLeft size={20} strokeWidth={2.5} />
            <span className="text-[15px] font-[400]">Back</span>
          </button>

          <span className="flex-1 text-center text-[15px] font-[600] text-black truncate">
            {filename}
          </span>

          {/* Placeholder action icons */}
          <div className="flex items-center gap-2 text-[#007AFF]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="4" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </div>
        </div>

        {/* ── Document page area ── */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="mx-auto max-w-[400px] rounded-[4px] bg-white shadow-md">
            <div className="px-6 py-8">
              {/* Title */}
              {page.title && (
                <h2
                  className="mb-6 text-center text-[17px] font-[600] text-black"
                  style={{ fontFamily: "inherit" }}
                >
                  {page.title}
                </h2>
              )}

              {/* Content lines */}
              {isWhyPage ? (
                <p
                  className="text-center text-[36px] font-[700] leading-tight text-black"
                  style={{ fontFamily: "inherit" }}
                >
                  {page.lines[0]}
                </p>
              ) : (
                <div className="flex flex-col gap-3">
                  {page.lines.map((line, i) =>
                    line === "" ? (
                      <div key={i} className="h-3" />
                    ) : (
                      <p
                        key={i}
                        className="text-[15px] leading-[1.6] text-[#3B3B3B]"
                        style={{ fontFamily: "inherit" }}
                      >
                        {line}
                      </p>
                    ),
                  )}
                </div>
              )}

              {/* Simulated form underline fields for pages 1-2 */}
              {!isWhyPage && (
                <div className="mt-8 space-y-3">
                  <div className="h-px bg-[#D1D1D6]" />
                  <div className="h-px bg-[#D1D1D6]" />
                  <div className="h-px w-2/3 bg-[#D1D1D6]" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Bottom navigation bar ── */}
        <div className="flex h-[48px] flex-shrink-0 items-center justify-between border-t border-[#D1D1D6] bg-white px-4">
          <button
            type="button"
            disabled={isFirst}
            onClick={() => onNavigate(currentPage - 1)}
            className={`flex items-center gap-1 text-[15px] font-[400] transition focus:outline-none focus:ring-2 focus:ring-[#007AFF]/40 rounded ${
              isFirst
                ? "text-[#C7C7CC]"
                : "text-[#007AFF] hover:bg-black/5"
            }`}
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
            Previous
          </button>

          <span
            className="text-[13px] text-[#8E8E93]"
            style={{ fontFamily: "inherit" }}
          >
            Page {currentPage} of {totalPages}
          </span>

          {isLast ? (
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1 text-[15px] font-[500] text-[#007AFF] transition hover:bg-black/5 rounded focus:outline-none focus:ring-2 focus:ring-[#007AFF]/40"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onNavigate(currentPage + 1)}
              className="flex items-center gap-1 text-[15px] font-[400] text-[#007AFF] transition hover:bg-black/5 rounded focus:outline-none focus:ring-2 focus:ring-[#007AFF]/40"
            >
              Next
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
