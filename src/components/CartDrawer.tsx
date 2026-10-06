import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Bike, Store, Sparkles } from 'lucide-react';
import { CartItem, RESTAURANT_INFO } from '../data/menu';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  orderType: 'delivery' | 'takeaway';
  onOrderTypeChange: (type: 'delivery' | 'takeaway') => void;
  onUpdateQuantity: (cartId: string, quantity: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  orderType,
  onOrderTypeChange,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const isFreeDelivery = subtotal >= RESTAURANT_INFO.freeDeliveryThreshold;
  const deliveryFee = orderType === 'takeaway' ? 0 : isFreeDelivery ? 0 : RESTAURANT_INFO.deliveryFee;
  const grandTotal = subtotal + deliveryFee;

  const freeDeliveryRemaining = Math.max(0, RESTAURANT_INFO.freeDeliveryThreshold - subtotal);
  const freeDeliveryPercent = Math.min(100, Math.round((subtotal / RESTAURANT_INFO.freeDeliveryThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over panel - strictly 100dvh and w-full sm:max-w-md */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-stone-900 border-l border-stone-800 flex flex-col h-[100dvh] max-h-[100dvh] shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex-shrink-0 px-4 sm:px-6 py-4 border-b border-stone-800 bg-stone-950/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-500" />
              <h2 className="text-base sm:text-lg font-bold text-stone-100 font-cinzel">
                Your Order
              </h2>
              <span className="text-xs bg-stone-800 text-stone-300 px-2 py-0.5 rounded-full font-mono">
                {items.reduce((acc, it) => acc + it.quantity, 0)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="text-stone-400 hover:text-rose-400 text-xs px-2 py-1 rounded transition-colors"
                  title="Clear all items"
                >
                  Clear
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Delivery or Takeaway Toggle */}
          <div className="flex-shrink-0 px-4 sm:px-6 py-3 bg-stone-950/40 border-b border-stone-800">
            <div className="grid grid-cols-2 gap-2 bg-stone-950 p-1 rounded-xl border border-stone-800">
              <button
                type="button"
                onClick={() => onOrderTypeChange('delivery')}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  orderType === 'delivery'
                    ? 'bg-amber-500 text-stone-950 shadow-md'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Bike className="w-4 h-4" />
                <span>Delivery</span>
              </button>

              <button
                type="button"
                onClick={() => onOrderTypeChange('takeaway')}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  orderType === 'takeaway'
                    ? 'bg-amber-500 text-stone-950 shadow-md'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>Takeaway</span>
              </button>
            </div>

            {/* Free Delivery Bar */}
            {orderType === 'delivery' && (
              <div className="mt-2.5">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-stone-400">
                    {isFreeDelivery ? (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Free Delivery Unlocked!
                      </span>
                    ) : (
                      <span>Add <strong className="text-amber-400 font-mono">Rs. {freeDeliveryRemaining}</strong> for Free Delivery</span>
                    )}
                  </span>
                  <span className="font-mono text-stone-400">{freeDeliveryPercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
                    style={{ width: `${freeDeliveryPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-stone-800/80 flex items-center justify-center text-stone-500">
                  <ShoppingBag className="w-8 h-8 text-stone-400" />
                </div>
                <h3 className="text-base font-bold text-stone-200 font-cinzel">Your cart is empty</h3>
                <p className="text-xs text-stone-400 max-w-xs">
                  Discover our delicious Mexican Fiesta, Arabian Chicken, Dynamite Shrimps, or Loaded Fries and add them to your order!
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs shadow-md hover:bg-amber-400 transition-all cursor-pointer"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              items.map((cartItem) => (
                <div
                  key={cartItem.cartId}
                  className="p-3 rounded-2xl bg-stone-950/60 border border-stone-800/80 flex gap-3 items-start"
                >
                  {/* Thumbnail */}
                  <img
                    src={cartItem.item.image}
                    alt={cartItem.item.name}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0 border border-stone-800"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs sm:text-sm font-bold text-stone-100 truncate">
                        {cartItem.item.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(cartItem.cartId)}
                        className="text-stone-400 hover:text-rose-400 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Custom details */}
                    <div className="text-[11px] text-stone-400 space-y-0.5 mt-0.5">
                      {cartItem.spiceLevel && (
                        <p className="text-amber-400/90 font-medium">
                          Spice: {cartItem.spiceLevel}
                        </p>
                      )}
                      {cartItem.selectedDips && cartItem.selectedDips.length > 0 && (
                        <p className="text-stone-400">
                          + {cartItem.selectedDips.map((d) => d.name).join(', ')}
                        </p>
                      )}
                      {cartItem.instruction && (
                        <p className="italic text-stone-400 line-clamp-1">
                          "{cartItem.instruction}"
                        </p>
                      )}
                    </div>

                    {/* Quantity & Item Total */}
                    <div className="mt-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 px-2 py-1 rounded-lg">
                        <button
                          onClick={() => onUpdateQuantity(cartItem.cartId, cartItem.quantity - 1)}
                          className="text-stone-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs font-bold text-stone-200 min-w-4 text-center">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(cartItem.cartId, cartItem.quantity + 1)}
                          className="text-stone-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-mono font-bold text-xs sm:text-sm text-amber-400">
                        Rs. {cartItem.totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer - Order Summary & Proceed Button */}
          {items.length > 0 && (
            <div className="flex-shrink-0 p-4 sm:p-6 bg-stone-950/90 border-t border-stone-800 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-stone-200">Rs. {subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-stone-400">
                  <span>
                    {orderType === 'delivery' ? 'Delivery Fee' : 'Takeaway'}
                  </span>
                  <span className="font-mono text-stone-200">
                    {orderType === 'takeaway'
                      ? 'Free'
                      : isFreeDelivery
                      ? 'FREE'
                      : `Rs. ${deliveryFee}`}
                  </span>
                </div>

                <div className="pt-2 border-t border-stone-800/80 flex justify-between text-stone-100 font-bold text-sm sm:text-base">
                  <span>Grand Total</span>
                  <span className="font-mono text-amber-400 font-black text-base sm:text-lg">
                    Rs. {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-sm flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(217,119,6,0.35)] active:scale-98 transition-all cursor-pointer"
              >
                <span>Generate Order Slip & Order via WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
