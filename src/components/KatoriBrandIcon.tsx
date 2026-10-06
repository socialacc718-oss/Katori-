import React from 'react';

interface KatoriBrandIconProps {
  className?: string;
  size?: number;
}

export const KatoriBrandIcon: React.FC<KatoriBrandIconProps> = ({
  className = 'w-10 h-10',
  size = 40,
}) => {
  return (
    <div
      className={`relative rounded-2xl p-0.5 bg-gradient-to-br from-[#f3e1b0] via-[#caa45d] to-[#6b4712] shadow-[0_2px_12px_rgba(202,164,93,0.35)] flex items-center justify-center flex-shrink-0 group hover:shadow-[0_0_18px_rgba(202,164,93,0.6)] transition-all duration-300 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Inner dark badge */}
      <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-[#1c1917] via-[#12100e] to-[#0c0a09] flex items-center justify-center p-1.5 relative overflow-hidden">
        {/* Subtle radial sheen */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,212,143,0.2),transparent_70%)] pointer-events-none" />

        {/* Professional KATORI Bowl & Steam Vector Emblem */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="katoriGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="40%" stopColor="#d97706" />
              <stop offset="80%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
            <linearGradient id="katoriShine" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Steam / Aroma curves */}
          <path
            d="M36 28C34 23 37 18 35 13"
            stroke="url(#katoriGold)"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="opacity-80"
          />
          <path
            d="M50 25C48 19 52 14 50 8"
            stroke="url(#katoriGold)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M64 28C62 23 65 18 63 13"
            stroke="url(#katoriGold)"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="opacity-80"
          />

          {/* Food Mound / Rice dome */}
          <ellipse
            cx="50"
            cy="44"
            rx="33"
            ry="11"
            fill="url(#katoriGold)"
            opacity="0.9"
          />
          
          {/* Main KATORI Bowl body */}
          <path
            d="M17 44C17 65 31 78 50 78C69 78 83 65 83 44H17Z"
            fill="url(#katoriGold)"
          />

          {/* Bowl Rim highlight */}
          <ellipse
            cx="50"
            cy="44"
            rx="33"
            ry="7.5"
            stroke="#fef08a"
            strokeWidth="2.5"
            fill="none"
          />

          {/* Bowl Pedestal Base */}
          <path
            d="M37 77H63L67 86H33L37 77Z"
            fill="url(#katoriGold)"
          />
          <rect
            x="32"
            y="85"
            width="36"
            height="3.5"
            rx="1.75"
            fill="#fef08a"
            opacity="0.9"
          />

          {/* Letter 'K' subtle watermark on bowl */}
          <text
            x="50"
            y="65"
            fontSize="15"
            fontWeight="900"
            fontFamily="'Cinzel', serif"
            textAnchor="middle"
            fill="#451a03"
            letterSpacing="1"
            opacity="0.85"
          >
            K
          </text>
        </svg>
      </div>
    </div>
  );
};
