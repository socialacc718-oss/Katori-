import React from 'react';
import { ShoppingBag, Clock } from 'lucide-react';
import { KatoriLogo } from './KatoriLogo';
import { KatoriBrandIcon } from './KatoriBrandIcon';
import { WhatsAppIcon } from './WhatsAppIcon';
import { RESTAURANT_INFO } from '../data/menu';

interface HeaderProps {
  totalCartItems: number;
  cartSubtotal: number;
  onOpenCart: () => void;
  onOpenLocationModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalCartItems,
  cartSubtotal,
  onOpenCart,
}) => {
  const openWhatsApp = () => {
    const text = encodeURIComponent('Hello KATORI! I would like to inquire / place an order.');
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0f1115]/95 border-b border-stone-800/80 transition-all">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-amber-950/80 via-stone-900 to-amber-950/80 border-b border-amber-500/20 py-1.5 px-4 text-center text-xs text-amber-200/90 flex items-center justify-center gap-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-medium">Now Delivering Fresh</span>
        <span className="text-amber-500/60 hidden sm:inline">|</span>
        <span className="hidden sm:inline-flex items-center gap-1 text-stone-400">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          12:00 PM – 02:00 AM Daily
        </span>
        <span className="text-amber-500/60 hidden md:inline">|</span>
        <span className="hidden md:inline text-amber-300 font-semibold">
          ⚡ Free Delivery on orders over Rs. 2,500
        </span>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Side: Professional KATORI Brand Emblem (Replacing Google Maps) */}
        <div className="flex items-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            title="KATORI Restaurant"
            aria-label="KATORI Home"
            className="flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
          >
            <KatoriBrandIcon size={42} className="sm:w-11 sm:h-11" />
          </a>
        </div>

        {/* Center: Brand Logo (KAT [BOWL] RI with RICE • SALADS • FRIES) */}
        <div className="flex-1 flex justify-center py-1">
          <a href="#" className="hover:opacity-95 transition-opacity" title="KATORI - Home">
            <KatoriLogo size="md" showTagline={true} />
          </a>
        </div>

        {/* Right Side: WhatsApp Icon Button + Cart Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* WhatsApp Icon Button (No ugly text, pure sleek WhatsApp button as requested) */}
          <button
            onClick={openWhatsApp}
            title="Chat & Order directly on WhatsApp"
            aria-label="Contact us on WhatsApp"
            className="relative p-2.5 sm:px-3 sm:py-2.5 rounded-xl bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-500/30 hover:border-emerald-500/60 text-emerald-400 hover:text-emerald-300 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.15)] group active:scale-95"
          >
            <span className="relative flex">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-30"></span>
              <WhatsAppIcon className="w-5 h-5 sm:w-5 sm:h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            </span>
            <span className="hidden lg:inline text-xs font-semibold text-emerald-300">
              WhatsApp
            </span>
          </button>

          {/* Cart Trigger Button */}
          <button
            onClick={onOpenCart}
            aria-label={`View shopping cart with ${totalCartItems} items`}
            className="relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold transition-all shadow-[0_0_20px_rgba(217,119,6,0.3)] active:scale-95"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-stone-950" />
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-stone-950 text-amber-400 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-amber-400 animate-pulse">
                  {totalCartItems}
                </span>
              )}
            </div>

            <div className="hidden sm:flex flex-col text-left leading-none">
              <span className="text-[10px] uppercase font-semibold text-stone-900 tracking-wider">
                {totalCartItems === 0 ? 'My Cart' : `${totalCartItems} ${totalCartItems === 1 ? 'Item' : 'Items'}`}
              </span>
              <span className="text-xs font-black text-stone-950">
                {cartSubtotal > 0 ? `Rs. ${cartSubtotal.toLocaleString()}` : 'Rs. 0'}
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
