import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CustomerOrderDetails } from '../types/ecommerce';

interface CartDrawerProps {
  onNavigateToShop?: () => void;
  onNavigateCart?: () => void;
}

// Official ROMAS / Roma Foods WhatsApp business number (+91 70008 60127)
const WHATSAPP_NUMBER = '917000860127';

// Official Flipkart-style Empty Cart Illustration
const FlipkartEmptyCartIllustration: React.FC<{ className?: string }> = ({ className = 'w-44 h-32' }) => (
  <svg
    viewBox="0 0 220 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Floor ground shadow */}
    <ellipse cx="110" cy="142" rx="75" ry="4" fill="#EAEAEA" />
    <line x1="40" y1="140" x2="180" y2="140" stroke="#F0F0F0" strokeWidth="2" strokeLinecap="round" />

    {/* Blue product container sitting in the cart */}
    <rect x="100" y="62" width="24" height="26" rx="4" fill="#2874F0" />
    <rect x="104" y="58" width="16" height="6" rx="2" fill="#1C5EC7" />
    <circle cx="112" cy="73" r="3" fill="#60A5FA" />

    {/* Cart Handle Bar */}
    <rect x="68" y="65" width="16" height="6" rx="3" fill="#B0B7C3" />
    <path
      d="M74 68 L86 68 L96 98"
      stroke="#CBD5E1"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Cart Basket Body */}
    <path
      d="M92 78 L152 78 C155 78 157 80 156 83 L147 118 C146 121 143 123 140 123 L102 123 C99 123 96 121 95 118 L88 83 C87 80 89 78 92 78 Z"
      fill="#ECEFF3"
      stroke="#D5D9E2"
      strokeWidth="3"
      strokeLinejoin="round"
    />

    {/* Basket inner cute face */}
    <rect x="110" y="93" width="3.5" height="9" rx="1.75" fill="#9CA3AF" />
    <rect x="127" y="93" width="3.5" height="9" rx="1.75" fill="#9CA3AF" />
    <rect x="115" y="108" width="11" height="3" rx="1.5" fill="#9CA3AF" />

    {/* Left Wheel */}
    <circle cx="102" cy="133" r="8" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2.5" />
    <circle cx="102" cy="133" r="3" fill="#64748B" />

    {/* Right Wheel */}
    <circle cx="138" cy="133" r="8" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2.5" />
    <circle cx="138" cy="133" r="3" fill="#64748B" />
  </svg>
);

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigateToShop, onNavigateCart }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    cartTotal,
    freeShippingThreshold,
    amountUntilFreeShipping,
    shippingCost,
    grandTotal,
  } = useCart();

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState<CustomerOrderDetails>({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    state: 'Chhattisgarh',
    paymentMethod: 'whatsapp',
  });

  const progressPercent = Math.min(100, Math.round((cartTotal / freeShippingThreshold) * 100));

  // WhatsApp Order Link Generator
  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    let message = `*🛒 NEW ROMAS CHOCOLATES ORDER*\n`;
    message += `─────────────────────────\n`;
    cart.forEach((item, idx) => {
      message += `${idx + 1}. *${item.product.name}*\n`;
      message += `   Qty: ${item.quantity} × ₹${item.product.price} = ₹${item.quantity * item.product.price} (${item.product.weight})\n`;
    });
    message += `─────────────────────────\n`;
    message += `*Items Total:* ₹${cartTotal}\n`;
    message += `*Insulated Thermal Shipping:* ${shippingCost === 0 ? 'FREE (Unlocked)' : `₹${shippingCost}`}\n`;
    message += `*GRAND TOTAL:* ₹${grandTotal}\n\n`;

    if (orderDetails.name || orderDetails.address) {
      message += `*Customer Delivery Details:*\n`;
      message += `Name: ${orderDetails.name || 'Not provided'}\n`;
      message += `Phone: ${orderDetails.phone || 'Not provided'}\n`;
      message += `Address: ${orderDetails.address || ''}, ${orderDetails.city || ''} - ${orderDetails.pincode || ''}\n\n`;
    }

    message += `Please confirm my order and share UPI / payment link. Thank you!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
  };

  const handleDirectSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderDetails.name || !orderDetails.phone || !orderDetails.address) {
      alert('Please fill in your Name, Phone Number, and Delivery Address.');
      return;
    }
    setOrderPlaced(true);
  };

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Slide-over Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="relative w-full max-w-md h-full bg-white border-l border-[#E5E0D8] text-[#2A1308] flex flex-col shadow-2xl z-10"
            >
              {/* Drawer Header */}
              <div className="p-5 sm:p-6 border-b border-neutral-200 flex items-center justify-between bg-[#FAF8F5]">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🍫</span>
                  <div>
                    <h2
                      className="text-xl font-bold uppercase tracking-wider text-[#2A1308]"
                      style={{ fontFamily: "'Cabin Condensed', sans-serif" }}
                    >
                      Your Chocolate Bag
                    </h2>
                    <span className="text-xs text-[#8C4724] font-bold">
                      {cartCount} {cartCount === 1 ? 'item' : 'items'} selected
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-9 h-9 rounded-full bg-neutral-100 text-neutral-600 hover:text-black flex items-center justify-center transition-colors cursor-pointer border border-neutral-200"
                  aria-label="Close cart"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* View Full E-Commerce Cart Page Link */}
              {onNavigateCart && cart.length > 0 && (
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onNavigateCart();
                  }}
                  className="w-full py-2.5 px-5 bg-amber-50 hover:bg-amber-100 text-amber-950 border-b border-amber-200/80 text-xs font-bold flex items-center justify-between cursor-pointer transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-sm">⚡</span>
                    <span className="uppercase tracking-wider">Open Full-Screen Cart Page</span>
                  </span>
                  <span className="text-amber-800 font-bold">Details & Coupons →</span>
                </button>
              )}

              {/* Free Shipping Progress Indicator */}
              <div className="px-5 py-3 bg-[#FAF8F5] border-b border-neutral-200 text-xs">
                {cartTotal >= freeShippingThreshold ? (
                  <div className="flex items-center gap-2 text-emerald-700 font-bold">
                    <span>🎉</span>
                    <span>You've unlocked FREE Insulated Shipping across India!</span>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-1.5 text-neutral-700">
                      <span>Add <strong className="text-[#8C4724] font-mono">₹{amountUntilFreeShipping}</strong> more for FREE Shipping</span>
                      <span className="font-mono text-[11px] text-[#8C4724] font-bold">{progressPercent}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-neutral-200 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-[#F9BD03] transition-all duration-300 rounded-full"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-10 px-4">
                    <FlipkartEmptyCartIllustration className="w-44 h-32 mx-auto filter drop-shadow-2xs mb-2" />
                    <h3 className="text-lg font-medium text-neutral-800 mt-2 mb-1">
                      Your cart is empty!
                    </h3>
                    <p className="text-xs text-neutral-500 max-w-xs mb-6">
                      Explore our handcrafted chocolate slabs, couvertures & nut pralines.
                    </p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        if (onNavigateToShop) {
                          onNavigateToShop();
                        } else {
                          const el = document.getElementById('shop');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="px-12 py-2.5 rounded-xs bg-[#2874F0] hover:bg-[#1C5EC7] text-white font-medium text-xs uppercase tracking-wider transition-all shadow-xs cursor-pointer active:scale-98"
                    >
                      Shop now
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      key={item.product.id}
                      className="p-3.5 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-center gap-3.5"
                    >
                      {/* Product Thumbnail */}
                      <div className="w-16 h-20 rounded-xl bg-neutral-50 p-1 flex items-center justify-center shrink-0 border border-neutral-200">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="max-h-full w-auto object-contain filter drop-shadow-sm"
                        />
                      </div>

                      {/* Info & Quantity */}
                      <div className="flex-1 min-w-0">
                        <h4
                          className="text-sm font-bold text-[#2A1308] truncate"
                          style={{ fontFamily: "'Cabin Condensed', sans-serif" }}
                        >
                          {item.product.name}
                        </h4>
                        <span className="text-[11px] text-[#8C4724] font-semibold block mb-1.5">
                          {item.product.weight}
                        </span>

                        <div className="flex items-center justify-between">
                          {/* Stepper */}
                          <div className="flex items-center rounded-full bg-neutral-100 border border-neutral-300 px-1 py-0.5">
                            <button
                              onClick={() => updateQuantity(item.product.id, -1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-neutral-700 hover:bg-white cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="w-6 text-center font-mono font-bold text-xs text-neutral-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, 1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-neutral-700 hover:bg-white cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          {/* Line Price */}
                          <div className="text-right">
                            <span className="font-bold font-mono text-sm text-[#2A1308]">
                              ₹{item.product.price * item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-neutral-400 hover:text-red-500 p-1 transition-colors cursor-pointer"
                        title="Remove item"
                        aria-label="Remove item"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Drawer Footer & Actions */}
              {cart.length > 0 && (
                <div className="border-t border-neutral-200 bg-[#FAF8F5]">
                  {/* Bill Breakdown Card */}
                  <div className="p-5 pb-3">
                    <div className="rounded-2xl bg-white border border-neutral-200 shadow-sm p-4 space-y-2 text-xs text-neutral-600">
                      <div className="flex justify-between">
                        <span>Items Subtotal ({cartCount})</span>
                        <span className="font-mono text-[#2A1308] font-semibold">₹{cartTotal}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Insulated Thermal Packaging</span>
                        <span className="text-emerald-700 font-bold uppercase text-[10px]">Free</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Express Shipping (Pan-India)</span>
                        <span className="font-mono font-bold">
                          {shippingCost === 0 ? (
                            <span className="text-emerald-700 uppercase text-[10px]">Free</span>
                          ) : (
                            `₹${shippingCost}`
                          )}
                        </span>
                      </div>
                      <div className="pt-2.5 mt-0.5 border-t border-dashed border-neutral-300 flex justify-between items-end">
                        <div>
                          <span className="text-sm font-bold text-[#2A1308] block">Total to Pay</span>
                          <span className="text-[10px] text-neutral-400">Inclusive of all taxes</span>
                        </div>
                        <span className="text-2xl font-black text-[#2A1308] font-mono leading-none">
                          ₹{grandTotal}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="px-5 space-y-2.5">
                    {/* View Full Cart Page Button */}
                    {onNavigateCart && (
                      <button
                        onClick={() => {
                          setIsCartOpen(false);
                          onNavigateCart();
                        }}
                        className="w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-neutral-100 hover:bg-neutral-200 text-[#2A1308] border border-neutral-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Open Full-Screen Cart & Apply Coupons</span>
                        <span>→</span>
                      </button>
                    )}

                    {/* Primary Secure Checkout Button */}
                    <button
                      onClick={() => setIsCheckoutModalOpen(true)}
                      className="w-full py-3.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider bg-[#2A1308] hover:bg-[#3D1D0F] text-white shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                    >
                      <Lock className="w-4 h-4 text-[#F9BD03]" />
                      <span>Proceed to Secure Checkout · ₹{grandTotal}</span>
                    </button>

                    {/* Secondary WhatsApp Order Button */}
                    <button
                      onClick={handleWhatsAppCheckout}
                      className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.004.577 1.764.787 2.806.787 3.182 0 5.768-2.587 5.768-5.766.001-3.187-2.575-5.77-5.768-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.062-1.118-.073-.284-.09-.646-.226-1.114-.429-1.964-.848-3.238-2.822-3.336-2.952-.097-.13-.799-1.062-.799-2.025 0-.962.505-1.436.684-1.631.18-.195.392-.244.523-.244.131 0 .261.002.375.008.12.006.28-.046.438.334.162.388.553 1.349.602 1.448.049.098.082.213.016.343-.065.13-.098.21-.195.324-.098.115-.205.257-.293.345-.098.098-.2.205-.086.401.114.195.508.839 1.09 1.358.749.667 1.38.874 1.576.972.195.098.31.082.424-.049.115-.13.491-.571.622-.767.13-.195.261-.163.441-.098.18.065 1.144.54 1.34.638.196.098.327.147.376.229.049.082.049.475-.095.88z" />
                      </svg>
                      <span>Instant WhatsApp Order</span>
                    </button>
                  </div>

                  {/* Secure Payments Trust Strip */}
                  <div className="px-5 pt-3.5 pb-2">
                    <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-neutral-500 mb-2">
                      <Lock className="w-3 h-3 text-emerald-600" />
                      <span className="uppercase tracking-wider">100% Secure Payments</span>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 flex-wrap">
                      {['UPI', 'VISA', 'Mastercard', 'RuPay', 'COD'].map((pm) => (
                        <span
                          key={pm}
                          className="px-2 py-1 rounded-md bg-white border border-neutral-200 text-[9px] font-black uppercase tracking-wider text-neutral-600 shadow-2xs"
                        >
                          {pm}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Meta */}
                  <div className="px-5 pb-4 pt-1 flex items-center justify-between text-[10px] text-neutral-500">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#8C4724]" />
                      FSSAI Lic. 10526005000033
                    </span>
                    <button
                      onClick={clearCart}
                      className="hover:text-red-500 underline cursor-pointer"
                    >
                      Clear Bag
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Direct Checkout & Address Dialog */}
      <AnimatePresence>
        {isCheckoutModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCheckoutModalOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl bg-white border border-[#E5E0D8] p-6 sm:p-7 shadow-2xl text-[#2A1308] z-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsCheckoutModalOpen(false)}
                className="absolute top-5 right-5 text-neutral-400 hover:text-black cursor-pointer"
              >
                ✕
              </button>

              {orderPlaced ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center text-3xl border border-emerald-200">
                    ✓
                  </div>
                  <h3
                    className="text-2xl font-bold uppercase text-[#2A1308]"
                    style={{ fontFamily: "'Cabin Condensed', sans-serif" }}
                  >
                    Order Received!
                  </h3>
                  <p className="text-xs text-neutral-600 max-w-xs mx-auto">
                    Thank you, <strong>{orderDetails.name}</strong>! Your order for ₹{grandTotal} has been queued for temperature-controlled packing at Kurod Works.
                  </p>
                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-left space-y-1">
                    <p><strong>Shipping to:</strong> {orderDetails.address}, {orderDetails.city} - {orderDetails.pincode}</p>
                    <p><strong>Phone:</strong> {orderDetails.phone}</p>
                    <p><strong>Payment Mode:</strong> {orderDetails.paymentMethod.toUpperCase()}</p>
                  </div>
                  <button
                    onClick={() => {
                      handleWhatsAppCheckout();
                      setOrderPlaced(false);
                      setIsCheckoutModalOpen(false);
                      clearCart();
                      setIsCartOpen(false);
                    }}
                    className="w-full py-3 px-4 rounded-full font-black text-xs uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Receive Live Tracking on WhatsApp</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleDirectSubmitOrder} className="space-y-4">
                  <div className="border-b border-neutral-200 pb-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#8C4724]">
                      Direct Dispatch from Factory
                    </span>
                    <h3
                      className="text-2xl font-bold uppercase text-[#2A1308]"
                      style={{ fontFamily: "'Cabin Condensed', sans-serif" }}
                    >
                      Delivery Details
                    </h3>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={orderDetails.name}
                      onChange={(e) => setOrderDetails({ ...orderDetails, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-xs focus:outline-none focus:border-[#2A1308]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                        Phone (WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={orderDetails.phone}
                        onChange={(e) => setOrderDetails({ ...orderDetails, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-xs focus:outline-none focus:border-[#2A1308]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        required
                        value={orderDetails.pincode}
                        onChange={(e) => setOrderDetails({ ...orderDetails, pincode: e.target.value })}
                        placeholder="492001"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-xs focus:outline-none focus:border-[#2A1308]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                      Complete Delivery Address *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={orderDetails.address}
                      onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })}
                      placeholder="House/Flat No., Street, Landmark"
                      className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-xs focus:outline-none focus:border-[#2A1308]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={orderDetails.city}
                        onChange={(e) => setOrderDetails({ ...orderDetails, city: e.target.value })}
                        placeholder="e.g. Raipur / Dhamtari"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-xs focus:outline-none focus:border-[#2A1308]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        value={orderDetails.state}
                        onChange={(e) => setOrderDetails({ ...orderDetails, state: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-xs focus:outline-none focus:border-[#2A1308]"
                      />
                    </div>
                  </div>

                  {/* Payment Options */}
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block mb-1.5">
                      Payment Preference
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {[
                        { id: 'whatsapp', label: 'WhatsApp UPI', icon: '📱' },
                        { id: 'upi', label: 'Direct UPI Scan', icon: '⚡' },
                        { id: 'cod', label: 'Cash on Deliv.', icon: '💵' },
                      ].map((m) => (
                        <button
                          type="button"
                          key={m.id}
                          onClick={() => setOrderDetails({ ...orderDetails, paymentMethod: m.id as any })}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                            orderDetails.paymentMethod === m.id
                              ? 'bg-[#2A1308] text-white border-[#2A1308] font-bold shadow-sm'
                              : 'bg-neutral-50 border-neutral-200 text-neutral-700'
                          }`}
                        >
                          <div className="text-sm mb-0.5">{m.icon}</div>
                          <span className="text-[10px] block leading-tight">{m.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Summary & Submit */}
                  <div className="pt-2 space-y-2.5">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider bg-[#F9BD03] hover:bg-amber-400 text-[#1C0E07] transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Pay Securely &bull; ₹{grandTotal}</span>
                    </button>
                    <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-500">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>256-bit encrypted · UPI · Cards · RuPay · COD</span>
                    </div>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

