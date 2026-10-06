import React from 'react';
import { Plus, Flame, Sparkles } from 'lucide-react';
import { MenuItem } from '../data/menu';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  onCustomize: (item: MenuItem) => void;
  quantityInCart: number;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  onAddToCart,
  onCustomize,
  quantityInCart,
}) => {
  const isCustomizable = item.category === 'chicken-bowls' || item.category === 'ocean-obsession' || item.category === 'katori-special' || item.category === 'fries';

  return (
    <div className="group relative rounded-2xl bg-stone-900/90 border border-stone-800/90 hover:border-amber-500/50 transition-all duration-300 flex flex-col overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1">
      {/* Food Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-950">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-black/30 pointer-events-none" />

        {/* Badge */}
        {item.badge && (
          <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-stone-950/80 backdrop-blur-md border border-amber-500/40 text-[11px] font-semibold text-amber-300 flex items-center gap-1 shadow-md">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>{item.badge}</span>
          </div>
        )}

        {/* Spice Level Indicator */}
        {item.spiceLevel !== undefined && item.spiceLevel > 0 && (
          <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded-lg bg-stone-950/80 backdrop-blur-md border border-rose-500/30 text-[11px] font-semibold text-rose-400 flex items-center gap-0.5">
            {Array.from({ length: item.spiceLevel }).map((_, i) => (
              <Flame key={i} className="w-3 h-3 fill-rose-500 text-rose-500" />
            ))}
          </div>
        )}

        {/* In-cart count bubble */}
        {quantityInCart > 0 && (
          <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-amber-500 text-stone-950 text-xs font-black shadow-lg border border-amber-300">
            {quantityInCart} in cart
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category kicker */}
          <p className="text-[11px] font-medium uppercase tracking-wider text-amber-400/80 mb-1">
            {item.categoryLabel}
          </p>

          {/* Dish Name */}
          <h3 className="text-base sm:text-lg font-bold text-stone-100 group-hover:text-amber-400 transition-colors leading-snug">
            {item.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-stone-400 line-clamp-2 mt-1.5 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Price & Action Button */}
        <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-semibold text-stone-400">Price</span>
            <span className="text-base sm:text-lg font-black font-mono text-amber-400">
              Rs. {item.price.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {isCustomizable ? (
              <button
                onClick={() => onCustomize(item)}
                className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                title="Customize & Add"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            ) : (
              <button
                onClick={() => onAddToCart(item)}
                className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                title="Add to order"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
