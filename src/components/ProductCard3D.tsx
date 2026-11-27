import React, { useState } from 'react';
import { Search, MessageCircle, Heart, Zap, Check } from 'lucide-react';
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
  const [isAdding, setIsAdding] = useState(false);
  const isItemWishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 900);
  };

  const handleQuickWhatsAppInquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `*🍫 WHOLESALE / TRADE INQUIRY - ROMAS CHOCOLATES*\n` +
      `Product: ${product.name}\n` +
      `Category: ${product.categoryLabel}\n` +
      `Weight: ${product.weight}\n\n` +
      `Please share catalog, master case specifications & dispatch details from Kurud Works, Dhamtari.`;
    window.open(`https://wa.me/919098229454?text=${encodeURIComponent(text)}`, '_blank');
  };

  // =========================================================================
  // VIEW MODE: LIST (Horizontal Row - No Container Box, No Price)
  // =========================================================================
  if (viewMode === 'list') {
    return (
      <div
        onClick={() => onQuickView(product)}
        className="group relative select-none cursor-pointer bg-transparent border-b border-[#EADBCC]/80 pb-6 hover:border-[#8C4724]/80 transition-all duration-300 p-2 sm:p-4 flex flex-col sm:flex-row gap-5 items-center justify-between"
      >
        <div className="relative w-full sm:w-48 h-44 shrink-0 flex flex-col items-center justify-center p-2">
          {/* Subtle Botanical Sketch in background */}
          <div className="absolute top-0 left-0 w-28 h-28 pointer-events-none opacity-20 filter grayscale">
            <img
              src="/assets/textures/botanical_etching.svg"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>

          <div className="relative h-28 sm:h-32 flex items-end justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-24 sm:max-h-28 w-auto object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-105 z-10"
              loading="eager"
              decoding="async"
            />
          </div>
          {/* Mini 3D Marble Shelf */}
          <div className="w-28 sm:w-36 mx-auto mt-[-6px] pointer-events-none select-none z-10">
            <img
              src="/assets/textures/popat_marble_shelf_transparent.png"
              alt="3D Marble Shelf"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0 text-left">
          <span className="text-xs italic text-[#8C6D4C] block mb-1">
            {product.categoryLabel}
          </span>
          <h3 className="text-base font-bold text-[#1C0E07] group-hover:text-[#8C4724] transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2 mt-1 font-sans">
            {product.description}
          </p>
        </div>

        <div className="shrink-0 flex sm:flex-col gap-2 w-full sm:w-auto">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 text-center select-none">
            Shop: Coming Soon
          </span>
          <button
            onClick={handleQuickWhatsAppInquiry}
            className="flex-1 sm:flex-none px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[#25D366] hover:bg-[#1EBE5D] text-white transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Inquire Now</span>
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW MODE: GRID (Exact Popat Namkeen 3D Marble Shelf - NO CONTAINER BOX, NO AMOUNT)
  // =========================================================================
  return (
    <div
      className="group relative select-none cursor-pointer h-full bg-transparent p-0 transition-all duration-300 flex flex-col justify-between items-center text-center"
      onClick={() => onQuickView(product)}
    >
      <div className="w-full flex flex-col items-center relative">
        {/* Top-Right: Popat Namkeen Style Zoom / Quick View Icon Button */}
        <div className="w-full flex justify-end pr-1 sm:pr-2 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-[#F4F4F4] hover:bg-[#EAEAEA] text-[#666] hover:text-[#1C0E07] border border-[#E0E0E0] rounded-xs shadow-2xs transition-colors cursor-pointer"
            aria-label="Quick View"
            title="Inspect & Full Details"
          >
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Botanical Sketch Watermark (Faint floral botanical etching exactly like Popat Namkeen) */}
        <div className="absolute top-1 left-1 sm:top-2 sm:left-4 w-32 h-32 sm:w-44 sm:h-44 md:w-52 md:h-52 pointer-events-none select-none opacity-20 filter grayscale z-0">
          <img
            src="/assets/textures/botanical_etching.svg"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        {/* Product Packet Image Stage (Standing directly on shelf) */}
        <div className="relative w-full h-36 sm:h-48 md:h-56 flex items-end justify-center p-1 sm:p-2 z-10">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[125px] sm:max-h-[175px] md:max-h-[210px] w-auto h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-108 group-hover:-translate-y-2 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] z-10"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* The Signature 3D Marble / Granite Tile Shelf Pedestal (Exact Popat Namkeen Authentic Texture) */}
        <div className="relative w-full max-w-[155px] sm:max-w-[220px] md:max-w-[260px] mx-auto mt-[-8px] sm:mt-[-10px] pointer-events-none select-none z-10">
          <img
            src="/assets/textures/popat_marble_shelf_transparent.png"
            alt="3D Marble Shelf"
            className="w-full h-auto object-contain filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.2)]"
          />
        </div>

        {/* Category in Italics */}
        <span className="text-[10px] sm:text-xs md:text-sm font-normal italic text-[#7D6B58] block mt-2 sm:mt-4 tracking-wide z-10">
          {product.categoryLabel}
        </span>

        {/* Product Title in Bold */}
        <h3 className="text-xs sm:text-sm md:text-base font-bold text-[#1C0E07] group-hover:text-[#8C4724] transition-colors line-clamp-2 mt-0.5 sm:mt-1 leading-snug z-10 px-1">
          {product.name}
        </h3>

        {/* NOTE: Price/amount is hidden as requested by user ("amount show nahi kare abhi") */}
      </div>

      {/* Subtle Hover Action Pills: Shop Now (Coming Soon) & Inquire */}
      <div className="w-full mt-2.5 flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex-wrap">
        <span
          className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100/90 text-amber-900 border border-amber-300/80 shadow-2xs select-none"
          title="Online direct shopping is launching soon"
        >
          Shop: Coming Soon
        </span>
        <button
          onClick={handleQuickWhatsAppInquiry}
          className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#25D366] hover:bg-[#1EBE5D] text-white transition-colors cursor-pointer shadow-xs flex items-center gap-1"
          title="Direct WhatsApp wholesale inquiry"
        >
          <MessageCircle className="w-3 h-3" />
          <span>Inquire</span>
        </button>
      </div>
    </div>
  );
};
