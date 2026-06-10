// ── Icons ────────────────────────────────────────────────────────────────────

function IconWhatsApp() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function IconPhone() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.61 5.61l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function IconSms() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="2 8 12 14 22 8" />
    </svg>
  )
}

function IconLoyalty() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function IconChat() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

// ── Data ─────────────────────────────────────────────────────────────────────

const features = [
  {
    Icon: IconWhatsApp,
    title: "WhatsApp narratives",
    description:
      "Narrative chat flows that feel like real conversations, built for massive scale.",
  },
  {
    Icon: IconPhone,
    title: "Simulated calls",
    description:
      "Interactive voice-style experiences that build deep trust without a single dial.",
  },
  {
    Icon: IconSms,
    title: "SMS journeys",
    description:
      "Text-message journeys that build progressive trust and close the deal automatically.",
  },
  {
    Icon: IconLoyalty,
    title: "Lifetime loyalty",
    description:
      "Progress, choices, and rewards built into every single step of the funnel.",
  },
] as const

const stats = [
  { value: "3x",   label: "Conversion Lift" },
  { value: "68%",  label: "More Engagement" },
  { value: "100%", label: "Custom-Built"    },
  { value: "0",    label: "Templates"       },
] as const

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const experienceFunnelUrl   = process.env.NEXT_PUBLIC_EXPERIENCE_FUNNEL_URL   ?? "#"
  const startExperienceUrl    = process.env.NEXT_PUBLIC_START_EXPERIENCE_URL    ?? "#"
  const startConversationUrl  = process.env.NEXT_PUBLIC_START_CONVERSATION_URL  ?? "#"

  return (
    <div style={{ background: "#0a0a0a" }} className="text-white min-h-screen overflow-x-hidden">

      {/* ── NAV ─────────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
        style={{
          borderBottom: "1px solid #141414",
          backdropFilter: "blur(14px)",
          background: "rgba(10,10,10,0.75)",
        }}
      >
        <a href="/" className="flex items-center">
          <span className="text-base font-semibold tracking-tight">
            baxh<span style={{ color: "#00e5ff" }}>e</span>n
          </span>
        </a>

        <a
          href={startExperienceUrl}
          className="text-xs font-semibold tracking-wide px-5 py-2.5 rounded-full transition-opacity hover:opacity-80"
          style={{ background: "#00e5ff", color: "#000" }}
        >
          start the experience ↗
        </a>
      </header>

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 px-6 md:px-12 overflow-hidden">
        {/* subtle radial glow behind phone */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 60% at 75% 50%, rgba(0,229,255,0.05) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">

          {/* Left */}
          <div className="flex flex-col gap-7">
            <div
              className="hero-badge inline-flex items-center gap-2 w-fit text-[11px] font-medium tracking-widest uppercase px-4 py-2 rounded-full"
              style={{ border: "1px solid #1e1e1e", color: "#666" }}
            >
              <span style={{ color: "#00e5ff", fontSize: "6px" }}>●</span>
              Gamified Sales Experiences
            </div>

            <h1 className="hero-headline text-5xl md:text-6xl lg:text-[64px] font-semibold leading-[1.06] tracking-tight lowercase">
              your ads should feel like a{" "}
              <span style={{ color: "#00e5ff" }}>conversation</span>
            </h1>

            <p className="hero-body text-sm md:text-base leading-relaxed max-w-sm" style={{ color: "#777" }}>
              We build interactive sales experiences — simulated calls, WhatsApp
              threads, SMS narratives — that guide your prospect to a yes,
              without feeling like a pitch.
            </p>

            <a
              href={experienceFunnelUrl}
              className="hero-cta inline-flex w-fit items-center text-[11px] font-bold tracking-widest uppercase px-6 py-3.5 rounded-sm transition-all duration-200 hover:bg-[#00e5ff] hover:text-black"
              style={{ border: "1px solid #00e5ff", color: "#00e5ff" }}
            >
              Experience a Funnel
            </a>
          </div>

          {/* Right — Phone mockup */}
          <div className="hero-phone flex justify-center lg:justify-end">
            <div
              className="relative flex flex-col rounded-[2.4rem] overflow-hidden"
              style={{
                width: "272px",
                background: "#101010",
                border: "1px solid #222",
                boxShadow:
                  "0 0 0 1px #1a1a1a inset, 0 50px 100px rgba(0,0,0,0.7), 0 0 60px rgba(0,229,255,0.06)",
              }}
            >
              {/* Notch pill */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-16 h-[5px] rounded-full" style={{ background: "#2a2a2a" }} />
              </div>

              {/* Chat header */}
              <div
                className="flex items-center gap-3 px-4 py-3"
                style={{ borderBottom: "1px solid #1a1a1a" }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ background: "#00e5ff", color: "#000" }}
                >
                  L
                </div>
                <div>
                  <div className="text-[11px] font-semibold">Leonardo · Baxhen</div>
                  <div className="text-[10px] font-medium" style={{ color: "#4ade80" }}>
                    online
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex flex-col gap-3 px-4 pt-4 pb-2">
                <div
                  className="text-[11px] px-3.5 py-2.5 rounded-2xl rounded-tl-sm leading-relaxed max-w-[88%]"
                  style={{ background: "#1e1e1e", color: "#ccc" }}
                >
                  hey! saw you checked out our page 🤙
                </div>

                <div
                  className="text-[11px] px-3.5 py-2.5 rounded-2xl rounded-tr-sm leading-relaxed max-w-[76%] self-end"
                  style={{ background: "#00e5ff", color: "#000" }}
                >
                  yeah, curious about the funnels
                </div>

                <div
                  className="text-[11px] px-3.5 py-2.5 rounded-2xl rounded-tl-sm leading-relaxed max-w-[92%]"
                  style={{ background: "#1e1e1e", color: "#ccc" }}
                >
                  cool — what's your main challenge right now, getting leads or
                  converting them?
                </div>
              </div>

              {/* Typing dots */}
              <div className="flex items-center gap-1.5 px-4 py-4">
                <span className="dot-1 w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#555" }} />
                <span className="dot-2 w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#555" }} />
                <span className="dot-3 w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#555" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid #161616", borderBottom: "1px solid #161616" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(({ value, label }) => (
            <div key={label} className="flex flex-col gap-2 items-center">
              <span
                className="text-[40px] font-bold leading-none tracking-tight"
                style={{ color: "#00e5ff" }}
              >
                {value}
              </span>
              <span
                className="text-[10px] uppercase tracking-widest font-semibold"
                style={{ color: "#555" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col gap-5 p-6 rounded-2xl transition-colors duration-200 hover:border-[#2a2a2a]"
              style={{ background: "#111", border: "1px solid #1a1a1a" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "#1a1a1a", color: "#00e5ff" }}
              >
                <Icon />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-sm">{title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#666" }}>
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-5">
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight lowercase">
            let's talk about your customers
          </h2>
          <p className="text-base font-medium" style={{ color: "#00e5ff" }}>
            let's work together
          </p>
          <p className="text-sm" style={{ color: "#555" }}>
            no forms. no commitments. just a real conversation.
          </p>
          <a
            href={startConversationUrl}
            className="inline-flex items-center gap-2.5 mt-3 text-[11px] font-bold tracking-widest uppercase px-7 py-4 rounded-full transition-opacity duration-200 hover:opacity-85"
            style={{ background: "#00e676", color: "#000" }}
          >
            <IconChat />
            Start a Conversation
          </a>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer
        className="px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-5"
        style={{ borderTop: "1px solid #161616" }}
      >
        <a href="/" className="flex items-center">
          <span className="font-semibold text-sm">baxh<span style={{ color: "#00e5ff" }}>e</span>n</span>
        </a>

        <nav className="flex items-center gap-6">
          {(["privacy policy", "terms of service", "security"] as const).map(
            (link) => (
              <a
                key={link}
                href="#"
                className="text-xs transition-colors duration-150 hover:text-white"
                style={{ color: "#444" }}
              >
                {link}
              </a>
            )
          )}
        </nav>

        <p className="text-[11px]" style={{ color: "#333" }}>
          © 2026 Baxhen. All rights reserved. Built for selling experiences.
        </p>
      </footer>
    </div>
  )
}
