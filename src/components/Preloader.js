import "../assets/css/Preloader.css";

/**
 * First-load / route loader: bride & groom with varmala (garland) motif.
 * Uses inline SVG only — avoids broken /images/loder/*.png paths.
 */
const Preloader = () => {
  return (
    <div className="dw-react-preloader" role="status" aria-live="polite" aria-busy="true">
      <div className="dw-preloader-inner">
        <svg
          className="dw-preloader-svg"
          viewBox="0 0 400 220"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="dwplSherwani" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2d4a7a" />
              <stop offset="100%" stopColor="#1a2f52" />
            </linearGradient>
            <linearGradient id="dwplLehenga" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c6285f" />
              <stop offset="100%" stopColor="#7b1238" />
            </linearGradient>
            <linearGradient id="dwplGarland" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff9800" />
              <stop offset="50%" stopColor="#ffc107" />
              <stop offset="100%" stopColor="#ff6f00" />
            </linearGradient>
          </defs>

          {/* Floor glow */}
          <ellipse cx="200" cy="198" rx="140" ry="14" fill="rgba(102,69,28,0.08)" />

          {/* Groom (left) */}
          <g transform="translate(88, 188)">
            <ellipse cx="0" cy="8" rx="26" ry="7" fill="rgba(26,47,82,0.15)" />
            <path
              d="M -26 -118 L 26 -118 L 22 -38 L -22 -38 Z"
              fill="url(#dwplSherwani)"
            />
            <rect x="-15" y="-132" width="30" height="22" rx="8" fill="#e8c4a0" />
            <path
              d="M -22 -148 Q 0 -162 22 -148 L 18 -132 L -18 -132 Z"
              fill="#1a2744"
            />
            <circle cx="0" cy="-122" r="3.5" fill="#c62828" opacity="0.85" />
          </g>

          {/* Bride (right) */}
          <g transform="translate(312, 188)">
            <ellipse cx="0" cy="8" rx="28" ry="7" fill="rgba(123,18,56,0.12)" />
            <path
              d="M -28 -118 Q 0 -108 28 -118 L 24 -36 L -24 -36 Z"
              fill="url(#dwplLehenga)"
            />
            <path
              d="M -32 -138 Q 0 -168 32 -138 Q 0 -150 -32 -138"
              fill="#ffe0ef"
              opacity="0.95"
            />
            <ellipse cx="0" cy="-128" rx="14" ry="15" fill="#f5d4c4" />
            <circle cx="-5" cy="-128" r="2" fill="#3e2723" opacity="0.35" />
            <circle cx="5" cy="-128" r="2" fill="#3e2723" opacity="0.35" />
            <path d="M -6 -120 Q 0 -116 6 -120" stroke="#c6285f" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          </g>

          {/* Varmala — two garlands meeting at centre */}
          <g className="dw-preloader-varmala-swing">
            <path
              d="M 100 78 Q 155 42 200 58 Q 245 74 300 82"
              fill="none"
              stroke="url(#dwplGarland)"
              strokeWidth="9"
              strokeLinecap="round"
              opacity="0.92"
            />
            <path
              d="M 100 92 Q 168 118 200 100 Q 232 82 300 94"
              fill="none"
              stroke="url(#dwplGarland)"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.85"
            />
            {/* Flower knots along garlands */}
            <g fill="#ffeb3b" stroke="#f57f17" strokeWidth="0.6">
              <circle cx="130" cy="62" r="5" />
              <circle cx="170" cy="52" r="5" />
              <circle cx="200" cy="56" r="5.5" />
              <circle cx="230" cy="64" r="5" />
              <circle cx="270" cy="78" r="5" />
              <circle cx="145" cy="102" r="4.5" />
              <circle cx="200" cy="98" r="5.5" />
              <circle cx="255" cy="96" r="4.5" />
            </g>
            {/* Small marigold petals */}
            <g fill="#ff9800" opacity="0.9">
              <circle cx="118" cy="72" r="3" />
              <circle cx="185" cy="48" r="2.8" />
              <circle cx="215" cy="52" r="3" />
              <circle cx="285" cy="86" r="3" />
              <circle cx="160" cy="108" r="2.8" />
              <circle cx="240" cy="92" r="3" />
            </g>
          </g>

          {/* Subtle heart hint between them */}
          <path
            d="M 200 128 c-12 -14 -28 -14 -28 0 c0 16 28 28 28 38 c0 -10 28 -22 28 -38 c0 -14 -16 -14 -28 0"
            fill="rgba(198,40,99,0.07)"
            stroke="rgba(212,160,18,0.25)"
            strokeWidth="0.8"
          />
        </svg>

        <p className="dw-preloader-title">Dewangan Links</p>
        <p className="dw-preloader-tag">Varmala · Blessings · New beginnings</p>
        <div className="dw-preloader-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
      <span className="dw-preloader-sr-only">Loading, please wait</span>
    </div>
  );
};

export default Preloader;
