import React from 'react';
import { MapPin, Clock, Phone, Heart, ExternalLink, ShieldCheck } from 'lucide-react';
import { KatoriLogo } from './KatoriLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { RESTAURANT_INFO } from '../data/menu';

interface FooterProps {
  onSelectCategory: (categoryId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const openWhatsApp = () => {
    const text = encodeURIComponent('Salam KATORI! I want to inquire about menu / branch timings.');
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <footer className="bg-[#0b0d10] border-t border-stone-800/80 text-stone-400 pt-12 pb-24 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex justify-start">
              <KatoriLogo size="sm" showTagline={true} />
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Serving gourmet signature rice bowls, succulent ocean shrimps, golden loaded fries, fresh crisp salads, and handcrafted dipping sauces.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Fresh & Premium Halal Ingredients</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Menu Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectCategory('chicken-bowls')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Chicken Rice Bowls
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('ocean-obsession')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Ocean Obsession (Shrimps)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('katori-special')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Katori Special (Beef Doner)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('fries')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Loaded Fries Supreme
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('dips')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Signature Dips & Sauces
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Timings & Service */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Kitchen Hours
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-300">Monday – Sunday</p>
                  <p className="text-stone-400">12:00 PM – 02:00 AM Midnight</p>
                </div>
              </div>
              <p className="text-stone-400 text-[11px] pt-1">
                Takeaway and Doorstep Delivery available throughout operating hours.
              </p>
            </div>
          </div>

          {/* Col 4: Location & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Location & Contact
            </h4>
            <div className="space-y-3 text-xs">
              <a
                href={RESTAURANT_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 text-stone-200 hover:text-amber-400 transition-all group"
              >
                <MapPin className="w-4 h-4 text-amber-500" />
                <span className="flex-1 truncate">Find us on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-400" />
              </a>

              {/* WhatsApp direct button with WhatsApp icon */}
              <button
                onClick={openWhatsApp}
                className="w-full flex items-center justify-center gap-2.5 p-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 font-semibold transition-all cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                <span>Instant WhatsApp Order</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} KATORI. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted for true food lovers with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
