'use client'

export function ForensicBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
    >
      {/* Dot grid — adds technical texture without harsh lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dot-grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="white" fillOpacity="0.12" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </svg>

      {/* Top-left fingerprint — large, ghosted */}
      <svg
        className="absolute -top-16 -left-16 w-72 h-72"
        viewBox="0 0 200 200"
        fill="none"
        stroke="white"
        strokeWidth="1"
        opacity="0.07"
      >
        <ellipse cx="100" cy="100" rx="88" ry="88" />
        <ellipse cx="100" cy="100" rx="72" ry="72" />
        <ellipse cx="100" cy="100" rx="56" ry="56" />
        <ellipse cx="100" cy="100" rx="40" ry="40" />
        <ellipse cx="100" cy="100" rx="24" ry="24" />
        <ellipse cx="100" cy="100" rx="10" ry="10" />
        {/* ridge breaks */}
        <line x1="100" y1="12" x2="100" y2="28" stroke="white" strokeWidth="3" />
        <line x1="155" y1="45" x2="148" y2="57" stroke="white" strokeWidth="3" />
        <line x1="45" y1="155" x2="52" y2="143" stroke="white" strokeWidth="3" />
      </svg>

      {/* Bottom-right fingerprint — partial, rotated */}
      <svg
        className="absolute -bottom-24 -right-24 w-96 h-96"
        viewBox="0 0 200 200"
        fill="none"
        stroke="white"
        strokeWidth="1"
        opacity="0.05"
        style={{ transform: 'rotate(35deg)' }}
      >
        <ellipse cx="100" cy="100" rx="88" ry="88" />
        <ellipse cx="100" cy="100" rx="72" ry="72" />
        <ellipse cx="100" cy="100" rx="56" ry="56" />
        <ellipse cx="100" cy="100" rx="40" ry="40" />
        <ellipse cx="100" cy="100" rx="24" ry="24" />
        <ellipse cx="100" cy="100" rx="10" ry="10" />
      </svg>

      {/* Top-right: DNA helix */}
      <svg
        className="absolute top-0 right-0 w-40 h-64"
        viewBox="0 0 100 200"
        fill="none"
        stroke="white"
        strokeWidth="1.2"
        opacity="0.08"
      >
        <path
          d="M30 10 C50 30, 70 50, 50 70 C30 90, 70 110, 50 130 C30 150, 70 170, 50 190"
          strokeLinecap="round"
        />
        <path
          d="M70 10 C50 30, 30 50, 50 70 C70 90, 30 110, 50 130 C70 150, 30 170, 50 190"
          strokeLinecap="round"
        />
        <line x1="38" y1="38" x2="62" y2="38" />
        <line x1="35" y1="68" x2="65" y2="68" />
        <line x1="38" y1="100" x2="62" y2="100" />
        <line x1="35" y1="132" x2="65" y2="132" />
        <line x1="38" y1="162" x2="62" y2="162" />
      </svg>

      {/* Left-center: magnifying glass */}
      <svg
        className="absolute top-1/2 -left-8 w-36 h-36 -translate-y-1/2"
        viewBox="0 0 100 100"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        opacity="0.06"
      >
        <circle cx="42" cy="42" r="30" />
        <circle cx="42" cy="42" r="20" opacity="0.5" />
        <line x1="64" y1="64" x2="88" y2="88" strokeWidth="4" strokeLinecap="round" />
      </svg>

      {/* Evidence marker — top center-right */}
      <svg
        className="absolute top-6 right-1/3 w-10 h-14"
        viewBox="0 0 40 60"
        fill="none"
        stroke="white"
        opacity="0.09"
      >
        <rect
          x="2"
          y="2"
          width="36"
          height="26"
          rx="2"
          fill="white"
          fillOpacity="0.1"
          strokeWidth="1.5"
        />
        <text
          x="20"
          y="21"
          textAnchor="middle"
          fontSize="16"
          fontWeight="bold"
          fill="white"
          stroke="none"
        >
          1
        </text>
        <line x1="20" y1="28" x2="20" y2="58" strokeWidth="1.5" />
      </svg>

      {/* Bottom-left: microscope slide outline */}
      <svg
        className="absolute bottom-4 left-1/4 w-24 h-16"
        viewBox="0 0 120 80"
        fill="none"
        stroke="white"
        strokeWidth="1.2"
        opacity="0.07"
      >
        <rect x="4" y="4" width="112" height="72" rx="3" />
        <rect x="14" y="14" width="92" height="52" rx="2" fill="white" fillOpacity="0.05" />
        <circle cx="60" cy="40" r="18" opacity="0.5" />
        <circle cx="60" cy="40" r="10" opacity="0.3" />
        <circle cx="60" cy="40" r="4" opacity="0.2" />
      </svg>

      {/* Subtle radial vignette to darken edges slightly */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 30% 50%, transparent 40%, rgba(30,20,80,0.18) 100%)',
        }}
      />
    </div>
  )
}
