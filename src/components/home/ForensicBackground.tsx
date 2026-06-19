'use client'

export function ForensicBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
    >
      {/* ── FINGERPRINT — Top-left corner, half off-screen ── */}
      <svg
        className="absolute -top-16 -left-16 w-[260px] h-[260px] opacity-[0.08]"
        viewBox="0 0 160 160"
        fill="none"
        stroke="white"
        strokeLinecap="round"
      >
        <ellipse cx="80" cy="80" rx="8" ry="6" strokeWidth="1.4" />
        <ellipse cx="80" cy="80" rx="16" ry="13" strokeWidth="1.3" />
        <ellipse cx="80" cy="80" rx="24" ry="20" strokeWidth="1.2" />
        <ellipse cx="80" cy="80" rx="32" ry="27" strokeWidth="1.2" />
        <ellipse cx="80" cy="80" rx="40" ry="34" strokeWidth="1.1" />
        <ellipse cx="80" cy="80" rx="48" ry="41" strokeWidth="1.1" />
        <ellipse cx="80" cy="80" rx="56" ry="48" strokeWidth="1.0" />
        <ellipse cx="80" cy="80" rx="64" ry="55" strokeWidth="1.0" />
        <ellipse cx="80" cy="80" rx="72" ry="62" strokeWidth="0.9" />
        {/* Ridge breaks */}
        <line x1="80" y1="8" x2="80" y2="18" stroke="white" strokeWidth="5" />
        <line x1="80" y1="21" x2="80" y2="29" stroke="white" strokeWidth="5" />
        <line x1="128" y1="52" x2="122" y2="60" stroke="white" strokeWidth="5" />
        <line x1="36" y1="130" x2="42" y2="122" stroke="white" strokeWidth="5" />
        <line x1="18" y1="80" x2="28" y2="80" stroke="white" strokeWidth="4" />
      </svg>

      {/* ── DNA DOUBLE HELIX — Pinned perfectly to the right edge ── */}
      <svg
        className="absolute top-0 right-0 w-[72px] h-full opacity-[0.07]"
        viewBox="0 0 72 500"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeWidth="1.4"
        preserveAspectRatio="none"
      >
        <path d="M18 0 C36 30, 54 60, 36 90 C18 120, 54 150, 36 180 C18 210, 54 240, 36 270 C18 300, 54 330, 36 360 C18 390, 54 420, 36 450 C18 480, 54 510, 36 540" />
        <path d="M54 0 C36 30, 18 60, 36 90 C54 120, 18 150, 36 180 C54 210, 18 240, 36 270 C54 300, 18 330, 36 360 C54 390, 18 420, 36 450 C54 480, 18 510, 36 540" />
        <line x1="24" y1="28" x2="48" y2="28" />
        <line x1="22" y1="56" x2="50" y2="56" />
        <line x1="24" y1="90" x2="48" y2="90" />
        <line x1="22" y1="118" x2="50" y2="118" />
        <line x1="24" y1="152" x2="48" y2="152" />
        <line x1="22" y1="180" x2="50" y2="180" />
        <line x1="24" y1="212" x2="48" y2="212" />
        <line x1="22" y1="242" x2="50" y2="242" />
        <line x1="24" y1="272" x2="48" y2="272" />
        <line x1="22" y1="302" x2="50" y2="302" />
        <line x1="24" y1="332" x2="48" y2="332" />
        <line x1="22" y1="362" x2="50" y2="362" />
        <line x1="24" y1="392" x2="48" y2="392" />
        <line x1="22" y1="422" x2="50" y2="422" />
      </svg>

      {/* ── MAGNIFYING GLASS — Bottom-center, precisely calculated ── */}
      <svg
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[160px] h-[160px] opacity-[0.07]"
        viewBox="0 0 100 100"
        fill="none"
        stroke="white"
        strokeLinecap="round"
      >
        <circle cx="42" cy="42" r="32" strokeWidth="2.5" />
        <circle cx="42" cy="42" r="22" strokeWidth="1.2" opacity="0.6" />
        <circle cx="42" cy="42" r="12" strokeWidth="1" opacity="0.4" />
        <path d="M26 26 Q30 22, 36 22" strokeWidth="1.8" opacity="0.5" />
        <line x1="66" y1="66" x2="94" y2="94" strokeWidth="7" strokeLinecap="round" />
        <line x1="70" y1="74" x2="76" y2="68" strokeWidth="1" opacity="0.4" />
        <line x1="76" y1="80" x2="82" y2="74" strokeWidth="1" opacity="0.4" />
        <line x1="82" y1="86" x2="88" y2="80" strokeWidth="1" opacity="0.4" />
      </svg>

      {/* ── EVIDENCE MARKER — Anchored top-right within content bounds ── */}
      <svg
        className="absolute top-8 right-20 w-[28px] h-[42px] opacity-10"
        viewBox="0 0 28 42"
        fill="none"
        stroke="white"
        strokeLinecap="round"
      >
        <rect
          x="1"
          y="1"
          width="26"
          height="22"
          rx="2"
          fill="white"
          fillOpacity="0.12"
          strokeWidth="1.4"
        />
        <text
          x="14"
          y="17"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill="white"
          stroke="none"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
        >
          1
        </text>
        <line x1="14" y1="23" x2="14" y2="41" strokeWidth="1.4" />
      </svg>

      {/* ── PARTIAL FINGERPRINT ARCS — Vertically centered on left edge ── */}
      <svg
        className="absolute top-1/3 -left-5 w-[120px] h-[200px] opacity-[0.065]"
        viewBox="0 0 80 140"
        fill="none"
        stroke="white"
        strokeLinecap="round"
      >
        <path d="M0 20  Q 40 28, 58 50  Q 68 70, 58 90  Q 40 112, 0 120" strokeWidth="1.4" />
        <path d="M0 30  Q 32 36, 48 52  Q 56 68, 48 84  Q 32 100, 0 106" strokeWidth="1.3" />
        <path d="M0 40  Q 24 44, 38 54  Q 44 66, 38 78  Q 24  88, 0  92" strokeWidth="1.2" />
        <path d="M0 50  Q 16 52, 28 58  Q 32 66, 28 74  Q 16  78, 0  80" strokeWidth="1.1" />
        <path d="M0 60  Q  8 61, 18 64  Q 20 67, 18 70  Q  8  72, 0  72" strokeWidth="1.0" />
      </svg>

      {/* ── MICROSCOPE SLIDE — Bottom-left proportional anchor ── */}
      <svg
        className="absolute -bottom-2 left-[6%] w-[130px] h-[78px] opacity-[0.065]"
        viewBox="0 0 130 78"
        fill="none"
        stroke="white"
        strokeLinecap="round"
      >
        <rect x="1" y="1" width="128" height="76" rx="3" strokeWidth="1.6" />
        <rect
          x="10"
          y="8"
          width="110"
          height="52"
          rx="2"
          strokeWidth="1"
          fill="white"
          fillOpacity="0.04"
        />
        <circle cx="65" cy="34" r="20" strokeWidth="1.4" />
        <circle cx="65" cy="34" r="13" strokeWidth="1.1" opacity="0.7" />
        <circle cx="65" cy="34" r="7" strokeWidth="1.0" opacity="0.5" />
        <circle
          cx="65"
          cy="34"
          r="3"
          strokeWidth="0.9"
          opacity="0.4"
          fill="white"
          fillOpacity="0.08"
        />
        <rect
          x="10"
          y="64"
          width="110"
          height="8"
          rx="1"
          fill="white"
          fillOpacity="0.07"
          stroke="none"
        />
        <line x1="18" y1="68" x2="60" y2="68" strokeWidth="0.8" opacity="0.5" />
      </svg>

      {/* ── BENZENE / CHEMICAL RING — True vertical center on right ── */}
      <svg
        className="absolute top-1/2 right-4 -translate-y-1/2 w-[64px] h-[64px] opacity-[0.07]"
        viewBox="0 0 64 64"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeWidth="1.3"
      >
        <polygon points="32,4 56,18 56,46 32,60 8,46 8,18" />
        <circle cx="32" cy="32" r="12" strokeWidth="1" opacity="0.6" />
        <line x1="32" y1="4" x2="32" y2="0" />
        <line x1="56" y1="18" x2="62" y2="14" />
        <line x1="56" y1="46" x2="62" y2="50" />
        <line x1="32" y1="60" x2="32" y2="64" />
        <line x1="8" y1="46" x2="2" y2="50" />
        <line x1="8" y1="18" x2="2" y2="14" />
      </svg>
    </div>
  )
}
