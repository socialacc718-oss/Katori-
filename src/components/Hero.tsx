import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Flame, HeartHandshake } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { RESTAURANT_INFO } from '../data/menu';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenOrder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu }) => {
  const openWhatsApp = () => {
    const text = encodeURIComponent('Salam KATORI! I want to check out your today special deals & place an order.');
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#14171d] via-[#111317] to-[#0f1115] pt-4 pb-8 sm:py-10 border-b border-stone-800/80">
      {/* Subtle background ambient lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-4 sm:space-y-6">
            {/* Quiet text kicker - zero pill discipline */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-amber-400/90">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Finest Quality Rice Bowls & Gourmet Street Kitchen</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-cinzel tracking-tight text-stone-100 leading-tight">
              Savor The Iconic <br />
              <span className="katori-gold-text">Flavor of KATORI</span>
            </h1>

            <p className="text-stone-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Indulge in our famous <strong className="text-amber-300 font-semibold">Mexican Fiesta</strong>, tender <strong className="text-amber-300 font-semibold">Arabian Chicken</strong>, juicy <strong className="text-amber-300 font-semibold">Dynamite Shrimps</strong>, and crunchy <strong className="text-amber-300 font-semibold">Loaded Fries Supreme</strong> with signature dips.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={onExploreMenu}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm sm:text-base flex items-center gap-2 shadow-[0_4px_25px_rgba(217,119,6,0.35)] transition-all active:scale-95 cursor-pointer"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={openWhatsApp}
                title="Chat directly on WhatsApp"
                className="px-5 py-3.5 rounded-xl bg-stone-900/90 hover:bg-stone-800 border border-emerald-500/40 hover:border-emerald-500 text-emerald-400 font-semibold text-sm sm:text-base flex items-center gap-2.5 transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5 text-emerald-400" />
                <span>Instant WhatsApp</span>
              </button>
            </div>

            {/* Features Row */}
            <div className="pt-2 sm:pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-stone-400">
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>Freshly Cooked To Order</span>
              </div>
              <span className="text-stone-700 hidden sm:inline">|</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Halal & Hygienic</span>
              </div>
              <span className="text-stone-700 hidden sm:inline">|</span>
              <div className="flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-amber-400" />
                <span>Direct WhatsApp Slip Confirmation</span>
              </div>
            </div>
          </div>

          {/* Right Showcase Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-sm sm:max-w-md">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-500/30 via-emerald-500/20 to-amber-600/30 blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 bg-stone-900/90 shadow-2xl p-3">
                <img
                  src={RESTAURANT_INFO.logoBowlImg}
                  alt="KATORI Signature Rice Bowl"
                  className="w-full h-64 sm:h-72 object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="mt-3 p-2 text-center bg-stone-950/60 rounded-lg border border-stone-800/80">
                  <div className="flex items-center justify-between text-xs px-2">
                    <span className="text-amber-300 font-semibold">⭐ Signature Bowl Collection</span>
                    <span className="text-stone-400 font-mono">From Rs. 749</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
