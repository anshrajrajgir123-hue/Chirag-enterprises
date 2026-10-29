import React from 'react';
import { IndustryApplication } from '../data/siteData';

export const IndustryVisualCard: React.FC<{ item: IndustryApplication }> = ({
  item,
}) => {
  return (
    <article className="group relative h-80 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex flex-col justify-end p-6">
      {/* Architectural / Civil Structural Background SVG Illustration */}
      <div className="absolute inset-0 opacity-65 group-hover:scale-105 transition-transform duration-500">
        <svg
          viewBox="0 0 400 320"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`bg-${item.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="60%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>
          <rect width="400" height="320" fill={`url(#bg-${item.id})`} />

          {/* Structural grid lines */}
          {[40, 80, 120, 160, 200, 240, 280, 320, 360].map((x) => (
            <line
              key={x}
              x1={x}
              y1="0"
              x2={x}
              y2="320"
              stroke="#334155"
              strokeWidth="0.7"
            />
          ))}

          {item.visualType === 'high-rise' && (
            <g stroke="#94a3b8" strokeWidth="1.5" fill="none">
              <rect x="130" y="30" width="140" height="290" stroke="#cbd5e1" strokeWidth="2" />
              {[60, 95, 130, 165, 200, 235, 270].map((y) => (
                <line key={y} x1="130" y1={y} x2="270" y2={y} stroke="#64748b" />
              ))}
              <line x1="165" y1="30" x2="165" y2="320" stroke="#f97316" strokeWidth="2" />
              <line x1="235" y1="30" x2="235" y2="320" stroke="#f97316" strokeWidth="2" />
              <path d="M235 30 L320 10 L320 30" stroke="#f97316" strokeWidth="1.5" />
            </g>
          )}

          {item.visualType === 'bridges' && (
            <g fill="none">
              <path d="M0 190 L400 190" stroke="#e2e8f0" strokeWidth="5" />
              <rect x="110" y="60" width="24" height="240" stroke="#cbd5e1" strokeWidth="2" />
              <rect x="266" y="60" width="24" height="240" stroke="#cbd5e1" strokeWidth="2" />
              {[20, 50, 80].map((offset) => (
                <g key={offset} stroke="#f97316" strokeWidth="1.2">
                  <line x1="122" y1={65 + offset} x2={40} y2="190" />
                  <line x1="122" y1={65 + offset} x2={200} y2="190" />
                  <line x1="278" y1={65 + offset} x2={200} y2="190" />
                  <line x1="278" y1={65 + offset} x2={360} y2="190" />
                </g>
              ))}
            </g>
          )}

          {item.visualType === 'metro' && (
            <g fill="none">
              <path d="M0 130 L400 130 L400 158 L0 158 Z" stroke="#cbd5e1" strokeWidth="2" />
              <path d="M90 158 L110 290 M150 158 L130 290" stroke="#f97316" strokeWidth="3" />
              <path d="M250 158 L270 290 M310 158 L290 290" stroke="#f97316" strokeWidth="3" />
              <line x1="20" y1="122" x2="380" y2="122" stroke="#38bdf8" strokeWidth="2" strokeDasharray="12 6" />
            </g>
          )}

          {item.visualType === 'tunnels' && (
            <g fill="none">
              <circle cx="200" cy="170" r="115" stroke="#94a3b8" strokeWidth="3" />
              <circle cx="200" cy="170" r="95" stroke="#f97316" strokeWidth="2" strokeDasharray="10 6" />
              <line x1="115" y1="220" x2="285" y2="220" stroke="#cbd5e1" strokeWidth="3" />
            </g>
          )}

          {item.visualType === 'industrial' && (
            <g fill="none" stroke="#cbd5e1" strokeWidth="2">
              <polygon points="50,280 50,120 140,80 230,120 230,280" />
              <rect x="260" y="70" width="40" height="210" stroke="#f97316" />
              <rect x="315" y="95" width="40" height="185" stroke="#94a3b8" />
              <line x1="50" y1="160" x2="230" y2="160" stroke="#f97316" strokeWidth="1.5" />
            </g>
          )}

          {item.visualType === 'infrastructure' && (
            <g fill="none">
              <path d="M30 70 L130 280 L270 280 L370 70" stroke="#cbd5e1" strokeWidth="2.5" />
              {[105, 145, 185, 225, 265].map((y) => (
                <line key={y} x1="60" y1={y} x2="340" y2={y} stroke="#f97316" strokeWidth="1.5" />
              ))}
            </g>
          )}
        </svg>
      </div>

      {/* Measured Scrim Overlay for High-Contrast Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-transparent" />

      {/* Content */}
      <div className="relative z-10 space-y-2">
        <div className="text-xs font-mono-tabular text-orange-400">
          {item.category}
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight">
          {item.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {item.summary}
        </p>
        <div className="pt-2 border-t border-slate-800/90 text-[11px] font-mono-tabular text-slate-400">
          {item.typicalComponents}
        </div>
      </div>
    </article>
  );
};
