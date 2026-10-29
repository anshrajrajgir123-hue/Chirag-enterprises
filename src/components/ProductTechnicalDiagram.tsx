import React from 'react';
import { ProductItem } from '../data/siteData';

interface ProductTechnicalDiagramProps {
  visualType: ProductItem['visualType'];
  code: string;
}

export const ProductTechnicalDiagram: React.FC<ProductTechnicalDiagramProps> = ({
  visualType,
  code,
}) => {
  return (
    <div className="relative w-full h-56 bg-slate-900 overflow-hidden flex items-center justify-center select-none border-b border-slate-200">
      {/* Subtle CAD engineering blueprint grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={`cad-grid-${visualType}`}
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 24 0 L 0 0 0 24"
              fill="none"
              stroke="#64748b"
              strokeWidth="0.6"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#cad-grid-${visualType})`} />
      </svg>

      {/* Centerline axis */}
      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 border-t border-dashed border-orange-500/40 pointer-events-none" />

      {/* Product SVG Cross-Section / Machined Steel Assembly */}
      <svg
        viewBox="0 0 360 160"
        className="relative z-10 w-11/12 h-40 transition-transform duration-300 group-hover:scale-105"
        role="img"
        aria-label={`${visualType} mechanical reinforcement splice diagram`}
      >
        <defs>
          <linearGradient id="rebarBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="45%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="couplerSteelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="30%" stopColor="#f8fafc" />
            <stop offset="55%" stopColor="#cbd5e1" />
            <stop offset="85%" stopColor="#475569" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <linearGradient id="orangeHighlightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>

        {visualType === 'p-bar' && (
          <g>
            {/* Left Rebar with Cold-Upset Parallel Thread */}
            <rect x="16" y="62" width="105" height="36" fill="url(#rebarBodyGrad)" rx="2" />
            {[28, 44, 60, 76, 92].map((x) => (
              <path
                key={x}
                d={`M${x} 60 L${x + 6} 100`}
                stroke="#cbd5e1"
                strokeWidth="3"
                strokeLinecap="round"
              />
            ))}
            {/* Right Rebar */}
            <rect x="239" y="62" width="105" height="36" fill="url(#rebarBodyGrad)" rx="2" />
            {[254, 270, 286, 302, 318].map((x) => (
              <path
                key={x}
                d={`M${x} 60 L${x + 6} 100`}
                stroke="#cbd5e1"
                strokeWidth="3"
                strokeLinecap="round"
              />
            ))}
            {/* Parallel Thread Engagement Zone */}
            <rect x="115" y="58" width="130" height="44" fill="#334155" />
            {[122, 130, 138, 146, 154, 162, 198, 206, 214, 222, 230, 238].map((x) => (
              <line
                key={x}
                x1={x}
                y1="58"
                x2={x}
                y2="102"
                stroke="#f97316"
                strokeWidth="1.5"
              />
            ))}
            {/* Heavy Machined Parallel Coupler Sleeve */}
            <rect
              x="118"
              y="46"
              width="124"
              height="68"
              rx="4"
              fill="url(#couplerSteelGrad)"
              stroke="#e2e8f0"
              strokeWidth="1.5"
            />
            {/* Cutaway Inspection Window showing parallel threads */}
            <rect
              x="142"
              y="55"
              width="76"
              height="50"
              rx="2"
              fill="#0f172a"
              stroke="#ea580c"
              strokeWidth="1.2"
            />
            {[148, 155, 162, 169, 176, 184, 191, 198, 205, 212].map((x) => (
              <path
                key={x}
                d={`M${x} 58 L${x + 3} 64 L${x} 70 M${x} 90 L${x + 3} 96 L${x} 102`}
                stroke="#f97316"
                strokeWidth="1.4"
                fill="none"
              />
            ))}
            <line x1="180" y1="56" x2="180" y2="104" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="3 2" />
          </g>
        )}

        {visualType === 't-bar' && (
          <g>
            {/* Left & Right Rebar */}
            <rect x="16" y="63" width="110" height="34" fill="url(#rebarBodyGrad)" />
            <rect x="234" y="63" width="110" height="34" fill="url(#rebarBodyGrad)" />
            {[30, 48, 66, 84, 256, 274, 292, 310].map((x) => (
              <path
                key={x}
                d={`M${x} 61 L${x + 5} 99`}
                stroke="#cbd5e1"
                strokeWidth="3"
              />
            ))}
            {/* Coupler Body */}
            <rect
              x="116"
              y="48"
              width="128"
              height="64"
              rx="5"
              fill="url(#couplerSteelGrad)"
              stroke="#f8fafc"
              strokeWidth="1.5"
            />
            {/* Tapered Thread Cutaway Cone */}
            <polygon
              points="126,58 178,66 178,94 126,102"
              fill="#0f172a"
              stroke="#f97316"
              strokeWidth="1.3"
            />
            <polygon
              points="234,58 182,66 182,94 234,102"
              fill="#0f172a"
              stroke="#f97316"
              strokeWidth="1.3"
            />
            {[134, 144, 154, 164, 196, 206, 216, 226].map((x) => (
              <line
                key={x}
                x1={x}
                y1="62"
                x2={x}
                y2="98"
                stroke="#fb923c"
                strokeWidth="1.3"
              />
            ))}
          </g>
        )}

        {visualType === 'r-b' && (
          <g>
            {/* Left & Right Rebar */}
            <rect x="16" y="62" width="108" height="36" fill="url(#rebarBodyGrad)" />
            <rect x="236" y="62" width="108" height="36" fill="url(#rebarBodyGrad)" />
            {[28, 44, 60, 76, 262, 278, 294, 310].map((x) => (
              <path key={x} d={`M${x} 60 L${x + 6} 100`} stroke="#cbd5e1" strokeWidth="3" />
            ))}
            {/* Rib-Peeled & Roll-Threaded Exposed Collar */}
            <rect x="98" y="63" width="26" height="34" fill="#e2e8f0" />
            <rect x="236" y="63" width="26" height="34" fill="#e2e8f0" />
            {[102, 107, 112, 117, 240, 245, 250, 255].map((x) => (
              <line key={x} x1={x} y1="63" x2={x} y2="97" stroke="#ea580c" strokeWidth="1.5" />
            ))}
            {/* R-B Cylindrical Sleeve with Wrench Flats */}
            <rect
              x="122"
              y="47"
              width="116"
              height="66"
              rx="3"
              fill="url(#couplerSteelGrad)"
              stroke="#f8fafc"
              strokeWidth="1.5"
            />
            <line x1="150" y1="47" x2="150" y2="113" stroke="#475569" strokeWidth="1.5" />
            <line x1="210" y1="47" x2="210" y2="113" stroke="#475569" strokeWidth="1.5" />
            <circle cx="180" cy="80" r="10" fill="#0f172a" stroke="#f97316" strokeWidth="1.5" />
          </g>
        )}
      </svg>

      {/* Subtle corner part number watermark */}
      <div className="absolute bottom-2.5 right-3.5 text-[11px] font-mono-tabular text-slate-400 tracking-wider">
        {code}
      </div>
    </div>
  );
};
