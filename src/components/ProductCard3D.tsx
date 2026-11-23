import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, ShoppingCart, Zap, Check } from 'lucide-react';
import { EcommerceProduct } from '../types/ecommerce';
import { useCart } from '../context/CartContext';

interface ProductCard3DProps {
  product: EcommerceProduct;
  onQuickView: (product: EcommerceProduct) => void;
  viewMode?: 'grid' | 'list';
}

export const ProductCard3D: React.FC<ProductCard3DProps> = ({
  product,
  onQuickView,
  viewMode = 'grid',
}) => {
  const { addToCart, isWishlisted, toggleWishlist } = useCart();
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const isItemWishlisted = isWishlisted(product.id);

  // Smooth mouse tilt tracking for authentic 3D interactive depth
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || viewMode === 'list') return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 9;
    const rotY = ((x - centerX) / centerX) * 9;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 900);
  };

  const handleQuickWhatsAppBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    const text = `*🛒 INSTANT ORDER - ROMAS CHOCOLATES*\n` +
      `Product: ${product.name}\n` +
      `Weight: ${product.weight}\n` +
      `Price: ₹${product.price}\n\n` +
      `Please confirm my order and send UPI link for dispatch from Kurud Works, Dhamtari.`;
    window.open(`https://wa.me/919098229454?text=${encodeURIComponent(text)}`, '_blank');
  };

  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  // =========================================================================
  // VIEW MODE: LIST (Flipkart Horizontal Card Row Style)
  // =========================================================================
  if (viewMode === 'list') {
    return (
      <div
        onClick={() => onQuickView(product)}
        className="group relative select-none cursor-pointer bg-white rounded-2xl border border-[#EADBCC]/80 hover:border-[#D4AF37]/70 shadow-[0_4px_20px_-4px_rgba(42,19,8,0.06)] hover:shadow-[0_20px_40px_-12px_rgba(42,19,8,0.18)] transition-all duration-300 p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-center justify-between"
      >
        {/* Left: 3D Product Image + Badges — Seamless Flipkart Style without Container Border */}
        <div className="relative w-full sm:w-52 h-52 shrink-0 flex items-center justify-center p-2 select-none">
          <div className="absolute top-1 left-1 flex gap-1 z-10">
            {discountPercent > 0 && (
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] border border-[#A5D6A7]/60 font-sans shadow-2xs">
                {discountPercent}% off
              </span>
            )}
            {product.tag && (
              <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#1C0E07] text-[#F9BD03] border border-[#F9BD03]/30 shadow-2xs">
                {product.tag}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className="absolute top-1 right-1 w-8 h-8 rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-neutral-50 z-10 transition-all cursor-pointer active:scale-90"
            aria-label="Wishlist"
            title={isItemWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isItemWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-300 fill-gray-200/40 hover:text-red-400'
              }`}
            />
          </button>

          <img
            src={product.image}
            alt={product.name}
            className="relative max-h-full max-w-[95%] w-auto h-auto object-contain filter drop-shadow-[0_12px_20px_rgba(42,19,8,0.18)] transition-transform duration-300 group-hover:scale-106"
            loading="lazy"
          />

          <div className="absolute bottom-1 w-32 h-3 rounded-full bg-[#2A1308]/15 blur-sm pointer-events-none" />
        </div>

        {/* Center: Details & Highlights */}
        <div className="flex-1 min-w-0 space-y-2 text-left w-full">
          <div>
            <span className="text-[10px] font-black text-[#8C7A6B] uppercase tracking-widest block">
              ROMAS &bull; {product.categoryLabel}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#1C0E07] group-hover:text-[#8C4724] transition-colors leading-snug">
              {product.name} ({product.weight})
            </h3>
          </div>

          {/* Ratings & Assured */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-[#1C0E07] text-[#F9BD03] text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-2xs font-sans">
              <span>{product.rating}</span>
              <Star className="w-2.5 h-2.5 fill-[#F9BD03] text-[#F9BD03]" />
            </span>
            <span className="text-xs text-gray-500 font-medium">
              ({product.reviewCount} Ratings & {Math.round(product.reviewCount * 0.28)} Reviews)
            </span>
            <span className="bg-[#FAF0E4] text-[#8C4724] border border-[#8C4724]/30 px-2 py-0.5 rounded-full text-[10px] font-black italic">
              ✦ ROMAS Assured
            </span>
          </div>

          {/* Highlights Bullets */}
          <ul className="text-xs text-gray-600 space-y-1 pt-1">
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span>100% Pure Cocoa Butter (Zero Palm Oil)</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span>Sub-20µ Micro-Refining for silky palate melt</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span>100% Vegetarian standard (FSSAI Lic. 10526005000033)</span>
            </li>
          </ul>
        </div>

        {/* Right: Price & Buttons */}
        <div className="w-full sm:w-56 shrink-0 flex flex-col justify-between space-y-3 pt-3 sm:pt-0 sm:border-l sm:border-[#EADBCC]/60 sm:pl-5 text-left">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black font-sans text-[#1C0E07]">
                ₹{product.price}
              </span>
              {product.mrp > product.price && (
                <span className="text-xs text-gray-400 line-through font-sans">
                  ₹{product.mrp}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="text-xs font-bold text-[#2E7D32] bg-emerald-50 px-1.5 py-0.5 rounded font-sans">
                  {discountPercent}% off
                </span>
              )}
            </div>

            <span className="text-[11px] text-[#2E7D32] font-semibold block mt-1">
              ✓ Free Delivery over ₹799
            </span>
            <span className="text-[10px] text-gray-400 block">
              Dispatched from Kurud Works, Dhamtari
            </span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={handleAddToCart}
              className={`w-full py-2.5 px-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer ${
                isAdding
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#F9BD03] hover:bg-[#E5AA00] text-[#1C0E07]'
              }`}
            >
              {isAdding ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <button
              onClick={handleQuickWhatsAppBuy}
              className="w-full py-2.5 px-3 rounded-full font-bold text-xs uppercase tracking-wider bg-[#1C0E07] hover:bg-[#2E150A] text-[#FEE8B4] hover:text-[#F9BD03] border border-[#F9BD03]/30 transition-all flex items-center justify-center gap-1 shadow-sm active:scale-95 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-[#F9BD03] text-[#F9BD03]" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW MODE: GRID (Authentic Flipkart Style Product Card)
  // =========================================================================
  return (
    <div
      ref={cardRef}
      className="group relative select-none cursor-pointer h-full bg-white p-3 sm:p-4 border border-transparent hover:border-gray-200 hover:shadow-[0_3px_16px_0_rgba(0,0,0,0.11)] transition-all duration-200 flex flex-col justify-between"
      onClick={() => onQuickView(product)}
    >
      <div>
        {/* Wishlist Heart Button (Flipkart Style subtle top-right heart) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-2.5 right-2.5 z-10 p-1 text-[#c2c2c2] hover:text-[#ff4343] transition-colors cursor-pointer"
          aria-label="Wishlist"
          title={isItemWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isItemWishlisted ? 'text-[#ff4343] fill-[#ff4343]' : 'fill-transparent text-[#c2c2c2]'
            }`}
          />
        </button>

        {/* Product Image Stage */}
        <div className="relative w-full aspect-square flex items-center justify-center p-2 mb-2 bg-white overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[180px] sm:max-h-[210px] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Brand / Sponsored Tag (Flipkart Style) */}
        <span className="text-[11px] font-normal text-[#878787] block leading-none mb-1">
          {product.tag ? product.tag : 'ROMAS'}
        </span>

        {/* Product Title */}
        <h3 className="text-[13px] sm:text-sm font-normal text-[#212121] group-hover:text-[#2874f0] line-clamp-2 h-9 leading-tight cursor-pointer">
          {product.name}
        </h3>

        {/* Weight / Variant */}
        <span className="text-xs text-[#878787] mt-1 block font-normal">
          {product.weight}
        </span>

        {/* Rating Pill (Flipkart Signature Green Pill) */}
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="bg-[#388e3c] text-white text-[11px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 leading-none shadow-2xs font-sans">
            <span>{product.rating}</span>
            <Star className="w-2.5 h-2.5 fill-white text-white" />
          </span>
          <span className="text-xs font-semibold text-[#878787]">
            ({product.reviewCount})
          </span>
        </div>

        {/* Pricing Section (Flipkart Bold Black Price + Strike MRP + Green Off) */}
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-base sm:text-lg font-bold font-sans text-[#212121]">
            ₹{product.price}
          </span>
          {product.mrp > product.price && (
            <span className="text-xs text-[#878787] line-through font-sans">
              ₹{product.mrp}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="text-xs font-bold text-[#388e3c] font-sans">
              {discountPercent}% off
            </span>
          )}
        </div>

        {/* Stock / Urgency Note (Flipkart Pink Status) */}
        <span className="text-[11px] font-bold text-[#c2185b] mt-1 block">
          Only few left
        </span>
      </div>

      {/* Flipkart Styled Action Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-gray-100">
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`py-1.5 px-2 rounded-xs font-bold text-xs uppercase tracking-wide transition-all duration-200 flex items-center justify-center gap-1 shadow-2xs active:scale-95 cursor-pointer ${
            isAdding
              ? 'bg-emerald-600 text-white'
              : 'bg-[#ff9f00] hover:bg-[#f39700] text-white'
          }`}
        >
          {isAdding ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add</span>
            </>
          )}
        </button>

        <button
          onClick={handleQuickWhatsAppBuy}
          className="py-1.5 px-2 rounded-xs font-bold text-xs uppercase tracking-wide bg-[#fb641b] hover:bg-[#e85b17] text-white transition-all duration-200 flex items-center justify-center gap-1 shadow-2xs active:scale-95 cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5 fill-white text-white" />
          <span>Buy</span>
        </button>
      </div>
    </div>
  );
};
