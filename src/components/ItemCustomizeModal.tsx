import React, { useState } from 'react';
import { X, Plus, Minus, Check, Flame } from 'lucide-react';
import { MenuItem, AVAILABLE_DIPS_ADDON } from '../data/menu';

interface ItemCustomizeModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    item: MenuItem,
    quantity: number,
    spiceLevel: string,
    selectedDips: { name: string; price: number }[],
    instruction: string
  ) => void;
}

const SPICE_OPTIONS = [
  { id: 'Mild', label: 'Mild (Kids friendly)' },
  { id: 'Medium', label: 'Medium (Standard flavor)' },
  { id: 'Spicy', label: 'Spicy (Fiery kick)' },
  { id: 'Extra Spicy', label: 'Extra Spicy (Extreme hot)' },
];

export const ItemCustomizeModal: React.FC<ItemCustomizeModalProps> = ({
  item,
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !item) return null;

  const [quantity, setQuantity] = useState(1);
  const [spiceLevel, setSpiceLevel] = useState('Medium');
  const [selectedDips, setSelectedDips] = useState<{ name: string; price: number }[]>([]);
  const [instruction, setInstruction] = useState('');

  const toggleDip = (dip: { name: string; price: number }) => {
    if (selectedDips.some((d) => d.name === dip.name)) {
      setSelectedDips(selectedDips.filter((d) => d.name !== dip.name));
    } else {
      setSelectedDips([...selectedDips, dip]);
    }
  };

  const dipCost = selectedDips.reduce((sum, d) => sum + d.price, 0);
  const totalCost = (item.price + dipCost) * quantity;

  const handleAddToCart = () => {
    onConfirm(item, quantity, spiceLevel, selectedDips, instruction);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header with image */}
        <div className="relative h-44 sm:h-52 w-full bg-stone-950">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-black/60" />
          
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-4 right-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              {item.categoryLabel}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white font-cinzel">
              {item.name}
            </h2>
            <p className="text-xs text-stone-300 line-clamp-1">{item.description}</p>
          </div>
        </div>

        {/* Scrollable Customization options */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Spice Level (for bowls / fries) */}
          {(item.category === 'chicken-bowls' || item.category === 'ocean-obsession' || item.category === 'katori-special' || item.category === 'fries') && (
            <div>
              <div className="flex items-center gap-1.5 mb-2.5">
                <Flame className="w-4 h-4 text-amber-500" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300">
                  Select Spice Level
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {SPICE_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSpiceLevel(opt.id)}
                    className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all border cursor-pointer ${
                      spiceLevel === opt.id
                        ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                        : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{opt.label}</span>
                      {spiceLevel === opt.id && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add extra dips */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300">
                Add Signature Dips (Optional)
              </h4>
              <span className="text-[11px] text-amber-400 font-mono">+Rs. 99 each</span>
            </div>
            <div className="space-y-1.5">
              {AVAILABLE_DIPS_ADDON.map((dip) => {
                const isSelected = selectedDips.some((d) => d.name === dip.name);
                return (
                  <div
                    key={dip.name}
                    onClick={() => toggleDip(dip)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/80 text-amber-200'
                        : 'bg-stone-950/50 border-stone-800 text-stone-300 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? 'bg-amber-500 border-amber-500 text-stone-950' : 'border-stone-600'}`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="font-medium">{dip.name}</span>
                    </div>
                    <span className="font-mono text-stone-400">+Rs. {dip.price}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
              Special Kitchen Note
            </h4>
            <input
              type="text"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="e.g. Extra sauce on side, no raw onion, fork required..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Footer controls: Quantity + Add Button */}
        <div className="p-4 sm:p-5 border-t border-stone-800/80 bg-stone-950/80 flex items-center justify-between gap-3">
          {/* Quantity Selector */}
          <div className="flex items-center gap-3 bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-xl">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="text-stone-400 hover:text-white transition-colors"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-mono font-bold text-sm text-stone-100 min-w-5 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="text-stone-400 hover:text-white transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleAddToCart}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm flex items-center justify-between shadow-lg active:scale-95 transition-all cursor-pointer"
          >
            <span>Add to Cart</span>
            <span className="font-mono font-black">Rs. {totalCost.toLocaleString()}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
