import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Printer, Copy, Check, ArrowRight, Share2, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { KatoriLogo } from './KatoriLogo';
import { OrderDetails, RESTAURANT_INFO } from '../data/menu';

interface OrderSlipModalProps {
  order: OrderDetails | null;
  isOpen: boolean;
  onClose: () => void;
  onNewOrder: () => void;
}

export const OrderSlipModal: React.FC<OrderSlipModalProps> = ({
  order,
  isOpen,
  onClose,
  onNewOrder,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && order) {
      // Trigger festive confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#ffffff', '#caa45d'],
      });

      // Construct and trigger WhatsApp message
      sendToWhatsApp();
    }
  }, [isOpen, order]);

  if (!isOpen || !order) return null;

  const buildWhatsAppMessage = () => {
    let msg = `🍽️ *KATORI - ORDER SLIP* 🍽️\n`;
    msg += `*Order ID:* ${order.orderId}\n`;
    msg += `*Date & Time:* ${order.createdAt}\n`;
    msg += `----------------------------------------\n`;
    msg += `👤 *CUSTOMER DETAILS:*\n`;
    msg += `• Name: ${order.customerName}\n`;
    msg += `• Phone: ${order.customerPhone}\n`;
    msg += `• Order Type: ${order.orderType === 'delivery' ? '🛵 Home Delivery' : '🥡 Self Takeaway'}\n`;
    msg += `• Address: ${order.deliveryAddress}\n`;
    if (order.instructions) {
      msg += `• Note: ${order.instructions}\n`;
    }
    msg += `• Payment: ${order.paymentMethod}\n`;
    msg += `----------------------------------------\n`;
    msg += `📦 *ORDER ITEMS:*\n`;

    order.items.forEach((item, index) => {
      msg += `${index + 1}. *${item.item.name}* x ${item.quantity} = Rs. ${item.totalPrice.toLocaleString()}\n`;
      if (item.spiceLevel) {
        msg += `   • Spice: ${item.spiceLevel}\n`;
      }
      if (item.selectedDips && item.selectedDips.length > 0) {
        msg += `   • Dips: ${item.selectedDips.map((d) => d.name).join(', ')}\n`;
      }
      if (item.instruction) {
        msg += `   • Request: "${item.instruction}"\n`;
      }
    });

    msg += `----------------------------------------\n`;
    msg += `Subtotal: Rs. ${order.subtotal.toLocaleString()}\n`;
    msg += `Delivery: ${order.deliveryFee === 0 ? 'FREE' : `Rs. ${order.deliveryFee.toLocaleString()}`}\n`;
    msg += `💰 *TOTAL AMOUNT: Rs. ${order.total.toLocaleString()}*\n`;
    msg += `----------------------------------------\n`;
    msg += `Please confirm and prepare my order. Thank you! 🙏`;

    return msg;
  };

  const sendToWhatsApp = () => {
    const text = encodeURIComponent(buildWhatsAppMessage());
    const waUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${text}`;
    window.open(waUrl, '_blank');
  };

  const handleCopyText = async () => {
    const text = buildWhatsAppMessage();
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-stone-900 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col">
        {/* Top Celebration Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 p-4 text-center text-stone-950 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 font-black text-sm sm:text-base">
            <CheckCircle2 className="w-5 h-5 text-stone-950 stroke-[2.5]" />
            <span>Order Slip Generated Successfully!</span>
          </div>
          <p className="text-xs font-semibold text-emerald-950 mt-0.5">
            Slip sent to WhatsApp • Please confirm with restaurant
          </p>
        </div>

        {/* Paper Slip Section */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[60vh] bg-stone-900">
          <div
            id="printable-slip"
            className="receipt-paper rounded-2xl p-5 sm:p-6 text-stone-900 border border-stone-300 relative shadow-md"
          >
            {/* Watermark / Logo header */}
            <div className="text-center pb-4 border-b-2 border-dashed border-stone-400">
              <KatoriLogo size="sm" showTagline={true} />
              <p className="text-[10px] text-stone-600 tracking-wider uppercase mt-1">
                Official Customer Invoice Slip
              </p>
            </div>

            {/* Slip Meta */}
            <div className="py-3 border-b border-dashed border-stone-300 text-xs space-y-1 font-mono">
              <div className="flex justify-between">
                <span className="text-stone-500">Order ID:</span>
                <span className="font-bold text-stone-900">{order.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Date & Time:</span>
                <span>{order.createdAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Type:</span>
                <span className="uppercase font-bold text-amber-700">
                  {order.orderType === 'delivery' ? 'Home Delivery' : 'Self Takeaway'}
                </span>
              </div>
            </div>

            {/* Customer Details */}
            <div className="py-3 border-b border-dashed border-stone-300 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-stone-500">Customer:</span>
                <span className="font-bold">{order.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Phone:</span>
                <span>{order.customerPhone}</span>
              </div>
              <div className="flex justify-between text-left">
                <span className="text-stone-500 flex-shrink-0 mr-2">Address:</span>
                <span className="font-medium text-right">{order.deliveryAddress}</span>
              </div>
              {order.instructions && (
                <div className="flex justify-between text-left">
                  <span className="text-stone-500 flex-shrink-0 mr-2">Notes:</span>
                  <span className="italic text-right text-stone-700">"{order.instructions}"</span>
                </div>
              )}
            </div>

            {/* Items Table */}
            <div className="py-3 border-b-2 border-dashed border-stone-400">
              <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2">
                <span>Item & Details</span>
                <span>Amount</span>
              </div>

              <div className="space-y-2 text-xs">
                {order.items.map((cartItem) => (
                  <div key={cartItem.cartId} className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <p className="font-bold text-stone-900">
                        {cartItem.quantity}x {cartItem.item.name}
                      </p>
                      {cartItem.spiceLevel && (
                        <p className="text-[11px] text-stone-600">
                          • Spice: {cartItem.spiceLevel}
                        </p>
                      )}
                      {cartItem.selectedDips && cartItem.selectedDips.length > 0 && (
                        <p className="text-[11px] text-stone-600">
                          • Dips: {cartItem.selectedDips.map((d) => d.name).join(', ')}
                        </p>
                      )}
                      {cartItem.instruction && (
                        <p className="text-[10px] italic text-stone-500">
                          "{cartItem.instruction}"
                        </p>
                      )}
                    </div>
                    <span className="font-mono font-bold text-stone-900">
                      Rs. {cartItem.totalPrice.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bill Summary */}
            <div className="py-3 text-xs space-y-1 font-mono">
              <div className="flex justify-between">
                <span className="text-stone-600">Subtotal:</span>
                <span>Rs. {order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600">Delivery:</span>
                <span>{order.deliveryFee === 0 ? 'FREE' : `Rs. ${order.deliveryFee.toLocaleString()}`}</span>
              </div>
              <div className="pt-2 border-t border-stone-400 flex justify-between font-bold text-sm sm:text-base text-stone-950">
                <span>TOTAL:</span>
                <span className="font-black text-emerald-800">Rs. {order.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[11px] text-stone-500 pt-1">
                <span>Payment:</span>
                <span>{order.paymentMethod}</span>
              </div>
            </div>

            {/* Slip Footer Message */}
            <div className="pt-3 border-t border-dashed border-stone-400 text-center text-[10px] text-stone-500">
              <p>Thank you for choosing KATORI!</p>
              <p className="mt-0.5">Freshly Prepared With Love & Quality</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 sm:p-5 bg-stone-950 border-t border-stone-800 space-y-2.5">
          {/* Main WhatsApp Trigger Button */}
          <button
            onClick={sendToWhatsApp}
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-[0_4px_20px_rgba(16,185,129,0.35)] active:scale-98 transition-all cursor-pointer"
          >
            <WhatsAppIcon className="w-5 h-5 text-white" />
            <span>Send Slip Directly via WhatsApp</span>
          </button>

          {/* Secondary Action Row: Copy & Print */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleCopyText}
              className="py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Slip!' : 'Copy Slip'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / PDF</span>
            </button>
          </div>

          {/* Return to menu */}
          <button
            onClick={onNewOrder}
            className="w-full py-2.5 text-xs font-semibold text-stone-400 hover:text-amber-400 text-center transition-colors cursor-pointer"
          >
            Start Another Order
          </button>
        </div>
      </div>
    </div>
  );
};
