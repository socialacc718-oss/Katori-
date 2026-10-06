import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../data/menu';

interface FloatingMobileCartProps {
  items: CartItem[];
  onOpenCart: () => void;
}

export const FloatingMobileCart: React.FC<FloatingMobileCartProps> = ({
  items,
  onOpenCart,
}) => {
  if (items.length === 0) return null;

  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.totalPrice, 0);

  return (
    <div className="fixed bottom-4 left-4 right-4 z-30 sm:hidden">
      <button
        onClick={onOpenCart}
        className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-stone-950 font-bold flex items-center justify-between shadow-[0_8px_30px_rgba(245,158,11,0.45)] border border-amber-300/40 active:scale-98 transition-all cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-stone-950 text-amber-400 font-extrabold text-xs flex items-center justify-center">
            {totalQuantity}
          </div>
          <div className="text-left">
            <p className="text-[10px] uppercase font-bold text-stone-900 leading-tight">View Cart</p>
            <p className="text-sm font-black text-stone-950 font-mono leading-tight">
              Rs. {subtotal.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-black bg-stone-950/15 px-3 py-1.5 rounded-xl">
          <span>Checkout</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </button>
    </div>
  );
};
