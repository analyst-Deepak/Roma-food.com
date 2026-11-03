import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, ShoppingCart, Trash2, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { EcommerceProduct } from '../types/ecommerce';

interface WishlistDrawerProps {
  onNavigateToShop?: () => void;
  onSelectProduct?: (product: EcommerceProduct) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  onNavigateToShop,
  onSelectProduct,
}) => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    removeFromWishlist,
    moveToCart,
    wishlistCount,
  } = useCart();

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Slide-over Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-md h-full bg-white border-l border-gray-200 text-[#0F1111] flex flex-col shadow-2xl z-10"
          >
            {/* Header */}
            <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-[#FAFAFA]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-500">
                  <Heart className="w-4 h-4 fill-red-500" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900">
                    My Wishlist ({wishlistCount})
                  </h2>
                  <span className="text-xs text-gray-500">
                    Your saved favourite chocolates
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsWishlistOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
                  <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-3xl mb-3 text-red-400">
                    🤍
                  </div>
                  <h3 className="text-base font-bold text-gray-800 mb-1">
                    Your Wishlist is Empty
                  </h3>
                  <p className="text-xs text-gray-500 max-w-xs mb-6">
                    Tap the heart icon on any product in the shop to save it here for later.
                  </p>
                  <button
                    onClick={() => {
                      setIsWishlistOpen(false);
                      onNavigateToShop && onNavigateToShop();
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] text-black font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                  >
                    Explore 3D Chocolates
                  </button>
                </div>
              ) : (
                wishlist.map((prod) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    key={prod.id}
                    className="p-3.5 rounded-xl border border-gray-200 bg-white hover:border-gray-300 shadow-2xs flex gap-3.5 items-center group"
                  >
                    {/* Thumbnail */}
                    <div
                      onClick={() => {
                        setIsWishlistOpen(false);
                        onSelectProduct && onSelectProduct(prod);
                      }}
                      className="w-16 h-20 bg-gray-50 rounded-lg p-1 flex items-center justify-center shrink-0 border border-gray-100 cursor-pointer"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="max-h-full max-w-full object-contain filter drop-shadow-xs"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 text-left">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                        {prod.categoryLabel}
                      </span>
                      <h4
                        onClick={() => {
                          setIsWishlistOpen(false);
                          onSelectProduct && onSelectProduct(prod);
                        }}
                        className="text-xs sm:text-sm font-bold text-gray-900 truncate hover:text-[#007185] cursor-pointer"
                      >
                        {prod.name}
                      </h4>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-sm font-bold text-gray-900">
                          ₹{prod.price}
                        </span>
                        <span className="text-[11px] text-gray-400 line-through">
                          ₹{prod.mrp}
                        </span>
                      </div>

                      {/* Move to Cart button */}
                      <button
                        onClick={() => moveToCart(prod)}
                        className="mt-2 text-[11px] font-bold text-[#0F1111] bg-[#FFD814] hover:bg-[#F7CA00] px-3 py-1 rounded-full flex items-center gap-1 shadow-2xs cursor-pointer"
                      >
                        <ShoppingCart className="w-3 h-3" />
                        <span>Move to Cart</span>
                      </button>
                    </div>

                    {/* Trash remove button */}
                    <button
                      onClick={() => removeFromWishlist(prod.id)}
                      className="text-gray-400 hover:text-red-500 p-1.5 transition-colors cursor-pointer"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

