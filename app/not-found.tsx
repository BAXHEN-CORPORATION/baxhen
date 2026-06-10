import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "404 — Baxhen",
}

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "#0a0a0a", color: "#fff" }}
    >
      <p
        className="text-[11px] font-semibold tracking-widest uppercase mb-6"
        style={{ color: "#333" }}
      >
        404
      </p>

      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight lowercase mb-4">
        this page doesn't{" "}
        <span style={{ color: "#00e5ff" }}>exist</span>
      </h1>

      <p className="text-sm mb-10" style={{ color: "#555" }}>
        wrong turn. no funnels here.
      </p>

      <Link
        href="/"
        className="text-[11px] font-bold tracking-widest uppercase px-6 py-3.5 rounded-full transition-opacity hover:opacity-80"
        style={{ background: "#00e5ff", color: "#000" }}
      >
        back to home
      </Link>
    </div>
  )
}
