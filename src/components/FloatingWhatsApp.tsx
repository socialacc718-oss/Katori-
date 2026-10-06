import React, { useState } from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { RESTAURANT_INFO } from '../data/menu';

interface FloatingWhatsAppProps {
  hasCartItems: boolean;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ hasCartItems }) => {
  const [isHovered, setIsHovered] = useState(false);

  const openWhatsApp = () => {
    const text = encodeURIComponent('Salam KATORI! I want to inquire about menu / place an order.');
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div
      className={`fixed right-4 z-30 transition-all duration-300 ${
        hasCartItems ? 'bottom-20 sm:bottom-6' : 'bottom-6'
      }`}
    >
      <div className="relative group flex items-center">
        {/* Tooltip on hover */}
        {isHovered && (
          <div className="hidden sm:block absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-stone-900 border border-emerald-500/30 text-stone-200 text-xs font-semibold whitespace-nowrap shadow-xl">
            <span>Order / Chat on WhatsApp</span>
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-stone-900 border-r border-t border-emerald-500/30 rotate-45" />
          </div>
        )}

        <button
          onClick={openWhatsApp}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          title="Chat with KATORI on WhatsApp"
          aria-label="Chat on WhatsApp"
          className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-[0_4px_25px_rgba(16,185,129,0.5)] border-2 border-emerald-300/40 active:scale-90 transition-all cursor-pointer"
        >
          {/* Subtle pulse ripple */}
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-25" />
          <WhatsAppIcon className="w-7 h-7 text-white" />
        </button>
      </div>
    </div>
  );
};
