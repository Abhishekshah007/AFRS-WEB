'use client'

export function ForensicBackground() {
  return (
    <>
      <style jsx>{`
        @keyframes fingerprintPulse {
          0%,
          100% {
            opacity: 0.05;
            transform: scale(1);
          }
          50% {
            opacity: 0.1;
            transform: scale(1.03);
          }
        }

        @keyframes dnaFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes markerFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes footprintFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(6px);
          }
        }

        @keyframes bulletFloat {
          0%,
          100% {
            transform: rotate(-4deg);
          }
          50% {
            transform: rotate(4deg);
          }
        }

        @keyframes scan {
          0% {
            transform: translateX(-12px);
            opacity: 0;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            transform: translateX(12px);
            opacity: 0;
          }
        }

        .fingerprint {
          animation: fingerprintPulse 8s ease-in-out infinite;
        }

        .dna {
          animation: dnaFloat 10s ease-in-out infinite;
        }

        .marker {
          animation: markerFloat 7s ease-in-out infinite;
        }

        .footprint {
          animation: footprintFloat 9s ease-in-out infinite;
        }

        .bullet {
          animation: bulletFloat 12s ease-in-out infinite;
          transform-origin: center;
        }

        .scan-line {
          animation: scan 5s linear infinite;
        }
      `}</style>

      <div
        aria-hidden="true"
        className="absolute inset-0 h-3/4 z-0 overflow-hidden pointer-events-none select-none"
      >
        {/* GRID */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* FINGERPRINT */}
        <svg
          className="fingerprint absolute -top-16 -left-16 w-[280px] h-[280px]"
          viewBox="0 0 160 160"
          fill="none"
          stroke="white"
          strokeLinecap="round"
        >
          {[8, 16, 24, 32, 40, 48, 56, 64, 72].map((r, i) => (
            <ellipse
              key={r}
              cx="80"
              cy="80"
              rx={r}
              ry={Math.round(r * 0.86)}
              strokeWidth={1.4 - i * 0.05}
            />
          ))}
        </svg>

        {/* DNA */}
        <svg
          className="dna absolute top-0 right-0 w-[90px] h-full opacity-[0.07]"
          viewBox="0 0 72 500"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          preserveAspectRatio="none"
        >
          <path d="M18 0 C36 30,54 60,36 90 C18 120,54 150,36 180 C18 210,54 240,36 270 C18 300,54 330,36 360 C18 390,54 420,36 450 C18 480,54 510,36 540" />
          <path d="M54 0 C36 30,18 60,36 90 C54 120,18 150,36 180 C54 210,18 240,36 270 C54 300,18 330,36 360 C54 390,18 420,36 450 C54 480,18 510,36 540" />

          {Array.from({ length: 14 }).map((_, i) => (
            <line key={i} x1="22" y1={30 + i * 30} x2="50" y2={30 + i * 30} />
          ))}
        </svg>

        {/* MAGNIFYING GLASS */}
        <svg
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[180px] h-[180px] opacity-[0.08]"
          viewBox="0 0 100 100"
          fill="none"
          stroke="white"
        >
          <circle cx="42" cy="42" r="32" strokeWidth="2.5" />

          <line x1="28" y1="28" x2="56" y2="56" strokeWidth="1" className="scan-line" />

          <line x1="66" y1="66" x2="94" y2="94" strokeWidth="7" strokeLinecap="round" />
        </svg>

        {/* EVIDENCE MARKER */}
        <svg
          className="marker absolute top-10 right-24 w-[50px] h-[70px] opacity-[0.09]"
          viewBox="0 0 50 70"
        >
          <path d="M5 5 H45 V35 H5 Z" fill="white" fillOpacity="0.08" stroke="white" />
          <text x="25" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
            01
          </text>
          <line x1="25" y1="35" x2="25" y2="68" stroke="white" strokeWidth="1.5" />
        </svg>

        {/* FOOTPRINT */}
        <svg
          className="footprint absolute left-[12%] bottom-16 w-[90px] h-[150px] opacity-[0.06]"
          viewBox="0 0 60 120"
          fill="none"
          stroke="white"
        >
          <ellipse cx="30" cy="70" rx="16" ry="34" />
          <circle cx="18" cy="20" r="5" />
          <circle cx="26" cy="12" r="6" />
          <circle cx="35" cy="10" r="6" />
          <circle cx="44" cy="15" r="5" />
        </svg>

        {/* BULLET CASING */}
        <svg
          className="bullet absolute bottom-28 right-[22%] w-[90px] h-[90px] opacity-[0.05]"
          viewBox="0 0 100 100"
          fill="none"
          stroke="white"
          strokeWidth="2"
        >
          <rect x="40" y="20" width="20" height="45" rx="3" />
          <path d="M40 20 Q50 5 60 20" />
          <circle cx="50" cy="75" r="10" />
        </svg>

        {/* FORENSIC DATA PANEL */}
        <svg
          className="absolute top-24 left-[38%] w-[140px] h-[90px] opacity-[0.04]"
          viewBox="0 0 140 90"
          fill="none"
          stroke="white"
        >
          <rect x="1" y="1" width="138" height="88" rx="4" />
          <line x1="15" y1="20" x2="125" y2="20" />
          <line x1="15" y1="35" x2="90" y2="35" />
          <line x1="15" y1="50" x2="110" y2="50" />
          <line x1="15" y1="65" x2="80" y2="65" />
        </svg>

        {/* PARTIAL PRINT */}
        <svg
          className="absolute top-1/3 -left-5 w-[120px] h-[200px] opacity-[0.05]"
          viewBox="0 0 80 140"
          fill="none"
          stroke="white"
        >
          <path d="M0 20 Q40 28 58 50 Q68 70 58 90 Q40 112 0 120" />
          <path d="M0 30 Q32 36 48 52 Q56 68 48 84 Q32 100 0 106" />
          <path d="M0 40 Q24 44 38 54 Q44 66 38 78 Q24 88 0 92" />
        </svg>
      </div>
    </>
  )
}
