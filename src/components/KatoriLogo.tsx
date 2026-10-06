import React from 'react';
import { RESTAURANT_INFO } from '../data/menu';

interface KatoriLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const KatoriLogo: React.FC<KatoriLogoProps> = ({
  size = 'md',
  showTagline = true,
  className = '',
}) => {
  const sizeStyles = {
    sm: {
      text: 'text-2xl sm:text-3xl font-extrabold tracking-widest',
      bowl: 'w-7 h-7 sm:w-8 sm:h-8',
      tagline: 'text-[9px] tracking-[0.25em]',
      gap: 'gap-0.5 sm:gap-1',
    },
    md: {
      text: 'text-3xl sm:text-4xl md:text-5xl font-black tracking-wider',
      bowl: 'w-9 h-9 sm:w-11 sm:h-11 md:w-13 md:h-13',
      tagline: 'text-[10px] sm:text-xs tracking-[0.28em] sm:tracking-[0.35em]',
      gap: 'gap-1 sm:gap-1.5',
    },
    lg: {
      text: 'text-4xl sm:text-6xl md:text-7xl font-black tracking-wider',
      bowl: 'w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20',
      tagline: 'text-xs sm:text-sm md:text-base tracking-[0.3em] sm:tracking-[0.45em]',
      gap: 'gap-1.5 sm:gap-2',
    },
  };

  const current = sizeStyles[size];

  return (
    <div className={`flex flex-col items-center select-none text-center ${className}`}>
      {/* KAT [BOWL] RI */}
      <div className={`flex items-center justify-center font-cinzel ${current.gap}`}>
        <span className={`${current.text} katori-gold-text leading-none`}>
          KAT
        </span>

        {/* Circular Bowl Emblem that acts as the 'O' */}
        <div className={`relative ${current.bowl} rounded-full overflow-hidden border-2 border-amber-500/80 shadow-[0_0_15px_rgba(202,164,93,0.4)] flex-shrink-0 mx-0.5 transform -translate-y-0.5`}>
          <img
            src={RESTAURANT_INFO.logoBowlImg}
            alt="Katori Signature Bowl"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>

        <span className={`${current.text} katori-gold-text leading-none`}>
          RI
        </span>
      </div>

      {/* Tagline: RICE • SALADS • FRIES */}
      {showTagline && (
        <div className={`mt-1 font-semibold uppercase text-amber-200/90 ${current.tagline} font-sans flex items-center justify-center gap-1.5`}>
          <span>RICE</span>
          <span className="text-amber-500">●</span>
          <span>SALADS</span>
          <span className="text-amber-500">●</span>
          <span>FRIES</span>
        </div>
      )}
    </div>
  );
};
