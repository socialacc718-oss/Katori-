import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryNav } from './components/CategoryNav';
import { MenuItemCard } from './components/MenuItemCard';
import { ItemCustomizeModal } from './components/ItemCustomizeModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSlipModal } from './components/OrderSlipModal';
import { FloatingMobileCart } from './components/FloatingMobileCart';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { MENU_ITEMS, CATEGORIES, MenuItem, CartItem, OrderDetails } from './data/menu';
import { Utensils, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway'>('delivery');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSlipOpen, setIsOrderSlipOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Quick direct add (without modal for dips/drinks or standard bowls)
  const handleQuickAddToCart = (item: MenuItem) => {
    const existingIndex = cartItems.findIndex(
      (c) => c.item.id === item.id && !c.spiceLevel && (!c.selectedDips || c.selectedDips.length === 0) && !c.instruction
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      updated[existingIndex].totalPrice = updated[existingIndex].quantity * item.price;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        cartId: `${item.id}-${Date.now()}`,
        item,
        quantity: 1,
        totalPrice: item.price,
      };
      setCartItems([...cartItems, newItem]);
    }
    showToast(`Added ${item.name} to cart!`);
  };

  // Customized add (from modal)
  const handleCustomizedAddToCart = (
    item: MenuItem,
    quantity: number,
    spiceLevel: string,
    selectedDips: { name: string; price: number }[],
    instruction: string
  ) => {
    const extraDipPrice = selectedDips.reduce((sum, d) => sum + d.price, 0);
    const unitPrice = item.price + extraDipPrice;
    const totalPrice = unitPrice * quantity;

    const newItem: CartItem = {
      cartId: `${item.id}-${Date.now()}`,
      item,
      quantity,
      spiceLevel,
      selectedDips,
      instruction,
      totalPrice,
    };

    setCartItems([...cartItems, newItem]);
    showToast(`Added ${quantity}x ${item.name} to cart!`);
  };

  const handleUpdateQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(cartId);
      return;
    }

    setCartItems((prev) =>
      prev.map((it) => {
        if (it.cartId === cartId) {
          const unitPrice = it.totalPrice / it.quantity;
          return {
            ...it,
            quantity,
            totalPrice: unitPrice * quantity,
          };
        }
        return it;
      })
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((it) => it.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderConfirmed = (order: OrderDetails) => {
    setCompletedOrder(order);
    setIsCheckoutOpen(false);
    setIsOrderSlipOpen(true);
    setCartItems([]); // Clear cart once order slip is generated
  };

  const handleStartNewOrder = () => {
    setIsOrderSlipOpen(false);
    setCompletedOrder(null);
  };

  // Filtered Items
  const filteredItems = useMemo(() => {
    let items = MENU_ITEMS;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (it) =>
          it.name.toLowerCase().includes(q) ||
          it.description.toLowerCase().includes(q) ||
          it.categoryLabel.toLowerCase().includes(q)
      );
    } else if (selectedCategory !== 'all') {
      items = items.filter((it) => it.category === selectedCategory);
    }

    return items;
  }, [selectedCategory, searchQuery]);

  // Grouped Categories for "All" view
  const categorySections = useMemo(() => {
    if (selectedCategory !== 'all' || searchQuery.trim()) {
      return null;
    }

    const groups: { [key: string]: MenuItem[] } = {};
    MENU_ITEMS.forEach((item) => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });

    return CATEGORIES.filter((c) => c.id !== 'all').map((cat) => ({
      id: cat.id,
      label: cat.label,
      items: groups[cat.id] || [],
    }));
  }, [selectedCategory, searchQuery]);

  const totalCartCount = cartItems.reduce((sum, it) => sum + it.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, it) => sum + it.totalPrice, 0);

  return (
    <div className="min-h-screen bg-[#0f1115] text-stone-100 flex flex-col font-sans selection:bg-amber-600 selection:text-white antialiased overflow-x-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-stone-900/95 border border-amber-500/50 text-stone-100 text-xs sm:text-sm font-semibold shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        totalCartItems={totalCartCount}
        cartSubtotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        onExploreMenu={() => {
          const menuElem = document.getElementById('menu-section');
          if (menuElem) {
            menuElem.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onOpenOrder={() => setIsCartOpen(true)}
      />

      {/* Sticky Category Navigation & Search */}
      <div id="menu-section">
        <CategoryNav
          selectedCategory={selectedCategory}
          onSelectCategory={(id) => {
            setSelectedCategory(id);
            setSearchQuery('');
          }}
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
        />
      </div>

      {/* Menu Items Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          {categorySections ? (
            /* Render by Category Sections when "All" is active */
            <motion.div
              key="all-categories"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-12 sm:space-y-16"
            >
              {categorySections.map((section) => {
                if (section.items.length === 0) return null;
                return (
                  <section key={section.id} id={section.id} className="scroll-mt-40">
                    {/* Category Title Header */}
                    <div className="flex items-center justify-between pb-3 mb-6 border-b border-stone-800">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2.5 h-6 rounded-full bg-gradient-to-b from-amber-400 to-amber-600" />
                        <h2 className="text-xl sm:text-2xl font-black font-cinzel text-stone-100">
                          {section.label}
                        </h2>
                      </div>
                      <span className="text-xs font-mono text-stone-400">
                        {section.items.length} {section.items.length === 1 ? 'item' : 'items'}
                      </span>
                    </div>

                    {/* Grid of Dishes with Framer Motion fade-in-up animation */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
                      {section.items.map((item, index) => {
                        const countInCart = cartItems
                          .filter((c) => c.item.id === item.id)
                          .reduce((sum, c) => sum + c.quantity, 0);

                        return (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-20px' }}
                            transition={{
                              duration: 0.45,
                              ease: [0.22, 1, 0.36, 1],
                              delay: (index % 4) * 0.08,
                            }}
                          >
                            <MenuItemCard
                              item={item}
                              onAddToCart={handleQuickAddToCart}
                              onCustomize={(it) => setCustomizingItem(it)}
                              quantityInCart={countInCart}
                            />
                          </motion.div>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </motion.div>
          ) : (
            /* Filtered or Searched Items View with Framer Motion fade-in-up */
            <motion.div
              key={selectedCategory + searchQuery}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-between pb-3 mb-6 border-b border-stone-800">
                <h2 className="text-xl sm:text-2xl font-black font-cinzel text-stone-100 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  {searchQuery ? `Search results for "${searchQuery}"` : CATEGORIES.find(c => c.id === selectedCategory)?.label || 'Menu Items'}
                </h2>
                <span className="text-xs font-mono text-stone-400">
                  {filteredItems.length} items found
                </span>
              </div>

              {filteredItems.length === 0 ? (
                <div className="py-20 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center mx-auto text-stone-500">
                    <Utensils className="w-8 h-8 text-stone-400" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-200">No dishes found</h3>
                  <p className="text-xs text-stone-400 max-w-sm mx-auto">
                    We couldn't find any dishes matching your search. Try another keyword like "bowl", "fries", "chicken", or "shrimps".
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs hover:bg-amber-400 transition-colors"
                  >
                    View All Menu
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
                  {filteredItems.map((item, index) => {
                    const countInCart = cartItems
                      .filter((c) => c.item.id === item.id)
                      .reduce((sum, c) => sum + c.quantity, 0);

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.45,
                          ease: [0.22, 1, 0.36, 1],
                          delay: index * 0.05,
                        }}
                      >
                        <MenuItemCard
                          item={item}
                          onAddToCart={handleQuickAddToCart}
                          onCustomize={(it) => setCustomizingItem(it)}
                          quantityInCart={countInCart}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Item Customization Modal */}
      <ItemCustomizeModal
        item={customizingItem}
        isOpen={!!customizingItem}
        onClose={() => setCustomizingItem(null)}
        onConfirm={handleCustomizedAddToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        orderType={orderType}
        onOrderTypeChange={(type) => setOrderType(type)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        orderType={orderType}
        onOrderConfirmed={handleOrderConfirmed}
      />

      {/* Order Slip Modal with WhatsApp Auto-Trigger & Printing */}
      <OrderSlipModal
        order={completedOrder}
        isOpen={isOrderSlipOpen}
        onClose={() => setIsOrderSlipOpen(false)}
        onNewOrder={handleStartNewOrder}
      />

      {/* Mobile Floating Sticky Cart Bar */}
      <FloatingMobileCart
        items={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp hasCartItems={cartItems.length > 0} />

      {/* Footer */}
      <Footer
        onSelectCategory={(id) => {
          setSelectedCategory(id);
          const menuElem = document.getElementById('menu-section');
          if (menuElem) {
            menuElem.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />
    </div>
  );
}
