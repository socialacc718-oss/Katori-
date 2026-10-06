import React, { useState } from 'react';
import { X, User, Phone, MapPin, FileText, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { CartItem, OrderDetails, RESTAURANT_INFO } from '../data/menu';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  orderType: 'delivery' | 'takeaway';
  onOrderConfirmed: (orderDetails: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  orderType,
  onOrderConfirmed,
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [instructions, setInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'JazzCash / EasyPaisa / Bank Transfer'>('Cash on Delivery');
  const [errorMsg, setErrorMsg] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const isFreeDelivery = subtotal >= RESTAURANT_INFO.freeDeliveryThreshold;
  const deliveryFee = orderType === 'takeaway' ? 0 : isFreeDelivery ? 0 : RESTAURANT_INFO.deliveryFee;
  const grandTotal = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!customerPhone.trim() || customerPhone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid active phone number (at least 10 digits)');
      return;
    }
    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      setErrorMsg('Please provide your complete delivery address (House/Flat, Street, Area)');
      return;
    }

    const orderId = `KT-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    const formattedTime = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const newOrder: OrderDetails = {
      orderId,
      createdAt: `${formattedDate}, ${formattedTime}`,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      orderType,
      deliveryAddress: orderType === 'delivery' ? deliveryAddress.trim() : 'Self Pick-up at KATORI Branch',
      instructions: instructions.trim(),
      paymentMethod,
      items,
      subtotal,
      deliveryFee,
      discount: 0,
      total: grandTotal,
    };

    onOrderConfirmed(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-800 bg-stone-950 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h2 className="text-base sm:text-lg font-bold text-stone-100 font-cinzel">
              Customer Details & Delivery
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
              {errorMsg}
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="e.g. Ali Khan"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              Contact / WhatsApp Phone Number *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => {
                  setCustomerPhone(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="e.g. 0342-1234567"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Delivery Address (only if delivery) */}
          {orderType === 'delivery' ? (
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                Complete Delivery Address *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <textarea
                  required
                  rows={2}
                  value={deliveryAddress}
                  onChange={(e) => {
                    setDeliveryAddress(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="House #, Street, Near landmark, Sector/Area..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
              <p className="font-semibold">Takeaway Order Selected</p>
              <p className="text-stone-300 mt-1">
                Your order will be prepared fresh for self pick-up at KATORI Restaurant.
              </p>
            </div>
          )}

          {/* Special Instructions */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              Order Notes / Delivery Instructions (Optional)
            </label>
            <div className="relative">
              <FileText className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <textarea
                rows={2}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="e.g. Call before arrival, extra tissues, ring doorbell..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-2">
              Payment Method
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('Cash on Delivery')}
                className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                  paymentMethod === 'Cash on Delivery'
                    ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                    : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-700'
                }`}
              >
                <p className="font-bold">Cash on Delivery</p>
                <p className="text-[10px] text-stone-400 mt-0.5">Pay in cash when food arrives</p>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('JazzCash / EasyPaisa / Bank Transfer')}
                className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                  paymentMethod === 'JazzCash / EasyPaisa / Bank Transfer'
                    ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                    : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-700'
                }`}
              >
                <p className="font-bold">Online / Mobile Wallet</p>
                <p className="text-[10px] text-stone-400 mt-0.5">JazzCash, EasyPaisa, Bank</p>
              </button>
            </div>
          </div>

          {/* Summary Box */}
          <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1 text-xs">
            <div className="flex justify-between text-stone-400">
              <span>Items Total ({items.reduce((a, b) => a + b.quantity, 0)} items)</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-stone-400">
              <span>{orderType === 'delivery' ? 'Delivery Fee' : 'Takeaway'}</span>
              <span>{deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}</span>
            </div>
            <div className="pt-1.5 border-t border-stone-800 flex justify-between font-bold text-stone-100 text-sm">
              <span>Total Payable</span>
              <span className="font-mono text-amber-400">Rs. {grandTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-sm flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(217,119,6,0.35)] active:scale-98 transition-all cursor-pointer"
          >
            <span>Generate Order Slip & Open WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
