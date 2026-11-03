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
        {/* Left: 3D Product Image + Badges — 100% Containerless */}
        <div className="relative w-full sm:w-48 h-48 shrink-0 flex items-center justify-center p-2 select-none">
          {/* Subtle warm luxury spotlight */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,189,3,0.06)_0%,transparent_65%)] pointer-events-none" />

          {/* Floor Shadow */}
          <div className="absolute bottom-1 w-32 h-3 rounded-full bg-[#2A1308]/20 blur-md pointer-events-none" />

          <div className="absolute top-2 left-2 flex gap-1 z-10">
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
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/95 hover:bg-white shadow-xs border border-gray-200 hover:border-red-300 flex items-center justify-center text-gray-400 hover:text-red-500 z-10 transition-all cursor-pointer active:scale-90"
            aria-label="Wishlist"
            title={isItemWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart
              className={`w-3.5 h-3.5 transition-colors ${
                isItemWishlisted ? 'text-red-500 fill-red-500' : ''
              }`}
            />
          </button>

          <img
            src={product.image}
            alt={product.name}
            className="max-h-[92%] max-w-[92%] object-contain rounded-xl filter drop-shadow-[0_12px_22px_rgba(42,19,8,0.2)] transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
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
  // VIEW MODE: GRID (Flipkart Enhanced 3D Vertical Card)
  // =========================================================================
  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative select-none cursor-pointer h-full"
      style={{ perspective: 1000 }}
      onClick={() => onQuickView(product)}
    >
      {/* 3D Transform Container on Ultra-Premium Luxury Card */}
      <motion.div
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.02 : 1,
          y: isHovered ? -5 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 24,
        }}
        className="relative flex flex-col justify-between h-full p-4 rounded-2xl bg-white border border-[#EADBCC]/80 shadow-[0_2px_12px_rgba(42,19,8,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(42,19,8,0.18)] hover:border-[#D4AF37]/80 hover:ring-1 hover:ring-[#D4AF37]/30 transition-all duration-300"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Card Header: Tag Badges & Wishlist Heart */}
        <div
          className="w-full flex items-center justify-between z-10 mb-1"
          style={{ transform: 'translateZ(25px)' }}
        >
          <div className="flex items-center gap-1.5 flex-wrap">
            {discountPercent > 0 && (
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] border border-[#A5D6A7]/60 font-sans shadow-2xs">
                {discountPercent}% off
              </span>
            )}
            {product.tag && (
              <span
                className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-2xs ${
                  product.badgeColor || 'bg-[#1C0E07] text-[#F9BD03] border border-[#F9BD03]/35'
                }`}
              >
                {product.tag}
              </span>
            )}
          </div>

          {/* Wishlist Heart Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className="w-8 h-8 rounded-full bg-white/95 hover:bg-white border border-gray-200 hover:border-red-300 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all shadow-xs hover:shadow-md cursor-pointer active:scale-90"
            aria-label="Wishlist"
            title={isItemWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart
              className={`w-3.5 h-3.5 transition-colors ${
                isItemWishlisted ? 'text-red-500 fill-red-500' : ''
              }`}
            />
          </button>
        </div>

        {/* 3D Floating Product Image Stage — 100% Open & Containerless */}
        <div
          className="relative w-full h-44 sm:h-48 flex items-center justify-center my-1 select-none pointer-events-none"
          style={{ transform: 'translateZ(40px)' }}
        >
          {/* Subtle warm ambient radial glow on pure card white */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,189,3,0.06)_0%,transparent_65%)] pointer-events-none" />

          {/* Dynamic 3D Floor Shadow */}
          <motion.div
            animate={{
              scale: isHovered ? 1.15 : 0.9,
              opacity: isHovered ? 0.35 : 0.2,
              y: isHovered ? 12 : 6,
            }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-1 w-36 sm:w-44 h-4 rounded-full bg-[#2A1308]/25 blur-md pointer-events-none"
          />

          {/* Transparent 3D Chocolate Product Floating Freely */}
          <motion.img
            src={product.image}
            alt={product.name}
            className="relative max-h-full max-w-[95%] w-auto object-contain filter drop-shadow-[0_16px_25px_rgba(42,19,8,0.22)] transition-transform duration-300 group-hover:scale-108 group-hover:-translate-y-1.5"
            loading="lazy"
          />
        </div>

        {/* Product Details Section */}
        <div
          className="w-full text-left mt-1.5 z-10 flex flex-col flex-1 justify-between"
          style={{ transform: 'translateZ(20px)' }}
        >
          <div>
            {/* Category Subtitle & Ratings Row */}
            <div className="flex items-center justify-between text-xs mb-1 flex-wrap gap-1">
              <span className="text-[10px] font-black text-[#8C7A6B] uppercase tracking-widest">
                ROMAS &bull; {product.categoryLabel}
              </span>

              {/* Boutique Dark + Gold Rating Pill */}
              <div className="flex items-center gap-1.5">
                <span className="bg-[#1C0E07] text-[#F9BD03] text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow-2xs font-sans">
                  <span>{product.rating}</span>
                  <Star className="w-2.5 h-2.5 fill-[#F9BD03] text-[#F9BD03]" />
                </span>
                <span className="text-[11px] text-gray-400 font-medium">
                  ({product.reviewCount})
                </span>
              </div>
            </div>

            {/* Product Title */}
            <h3
              className="text-sm sm:text-base font-bold text-[#1C0E07] group-hover:text-[#8C4724] transition-colors leading-snug line-clamp-1"
              style={{ fontFamily: "'Cabin Condensed', sans-serif" }}
            >
              {product.name}
            </h3>

            {/* Subtitle / Cocoa Profile */}
            <p className="text-xs text-[#7A6B60] mt-0.5 line-clamp-1 font-normal">
              {product.subtitle}
            </p>

            {/* Weight & Quality Tag */}
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[10px] font-bold text-[#8C4724] bg-[#FAF0E4] px-2 py-0.5 rounded-full border border-[#EADBCC]">
                {product.weight}
              </span>
              <span className="text-[10px] text-gray-500 font-medium">
                100% Pure Cocoa Butter
              </span>
            </div>
          </div>

          {/* Pricing & Dual Action Buttons */}
          <div className="pt-2.5 mt-2 border-t border-[#EADBCC]/60">
            {/* Price Row */}
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-xl sm:text-2xl font-black font-sans text-[#1C0E07]">
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

            <span className="text-[10px] text-[#2E7D32] font-semibold block mb-2">
              ✓ Free Delivery over ₹799 &bull; Insulated Pack
            </span>

            {/* Dual Action Buttons: Add to Cart & Buy Now */}
            <div className="grid grid-cols-2 gap-2">
              {/* Yellow Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                aria-label={`Add ${product.name} to cart`}
                className={`py-2 px-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer ${
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
                    <span>Add</span>
                  </>
                )}
              </button>

              {/* Orange/Dark Buy Now Button */}
              <button
                onClick={handleQuickWhatsAppBuy}
                aria-label={`Buy ${product.name} now`}
                className="py-2 px-2.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#1C0E07] hover:bg-[#2E150A] text-[#FEE8B4] hover:text-[#F9BD03] border border-[#F9BD03]/30 transition-all duration-200 flex items-center justify-center gap-1 shadow-sm active:scale-95 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 fill-[#F9BD03] text-[#F9BD03]" />
                <span>Buy</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
