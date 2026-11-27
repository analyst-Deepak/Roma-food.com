import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Star,
  Heart,
  Share2,
  Tag,
  RotateCcw,
  ShoppingCart,
  Zap,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import { EcommerceProduct } from '../types/ecommerce';

interface EcommerceQuickViewModalProps {
  product: EcommerceProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

interface ProductVariantImages {
  id: string;
  label: string;
  frontImage: string;
  backImage: string;
}

// Exact Front & Back high-res packaging mapping per category and variant
const CATEGORY_VARIANTS: Record<string, ProductVariantImages[]> = {
  slabs: [
    {
      id: 'dark',
      label: 'Dark',
      frontImage: '/assets/official_products_png/slabs/dark_front.png',
      backImage: '/assets/official_products_png/slabs/dark_back.png',
    },
    {
      id: 'milk',
      label: 'Milk',
      frontImage: '/assets/official_products_png/slabs/milk_front.png',
      backImage: '/assets/official_products_png/slabs/milk_back.png',
    },
    {
      id: 'white',
      label: 'White',
      frontImage: '/assets/official_products_png/slabs/white_front.png',
      backImage: '/assets/official_products_png/slabs/white_back.png',
    },
  ],
  'choco-chips': [
    {
      id: 'dark',
      label: 'Dark',
      frontImage: '/assets/official_products_png/choco_chips/dark_front.png',
      backImage: '/assets/official_products_png/choco_chips/dark_back.png',
    },
    {
      id: 'milk',
      label: 'Milk',
      frontImage: '/assets/official_products_png/choco_chips/milk_front.png',
      backImage: '/assets/official_products_png/choco_chips/milk_back.png',
    },
    {
      id: 'white',
      label: 'White',
      frontImage: '/assets/official_products_png/choco_chips/white_front.png',
      backImage: '/assets/official_products_png/choco_chips/white_back.png',
    },
  ],
  buttons: [
    {
      id: 'dark',
      label: 'Dark',
      frontImage: '/assets/official_products_png/buttons/dark_front.png',
      backImage: '/assets/official_products_png/buttons/dark_back.png',
    },
    {
      id: 'milk',
      label: 'Milk',
      frontImage: '/assets/official_products_png/buttons/milk_front.png',
      backImage: '/assets/official_products_png/buttons/milk_back.png',
    },
    {
      id: 'white',
      label: 'White',
      frontImage: '/assets/official_products_png/buttons/white_front.png',
      backImage: '/assets/official_products_png/buttons/white_back.png',
    },
  ],
  paste: [
    {
      id: 'dark',
      label: 'Dark',
      frontImage: '/assets/official_products_png/paste/dark_front.png',
      backImage: '/assets/official_products_png/paste/dark_back.png',
    },
    {
      id: 'milk',
      label: 'Milk',
      frontImage: '/assets/official_products_png/paste/milk_front.png',
      backImage: '/assets/official_products_png/paste/milk_back.png',
    },
    {
      id: 'white',
      label: 'White',
      frontImage: '/assets/official_products_png/paste/white_front.png',
      backImage: '/assets/official_products_png/paste/white_back.png',
    },
  ],
  butterscotch: [
    {
      id: 'classic',
      label: 'Classic Crunch',
      frontImage: '/assets/official_products_png/butterscotch/front.png',
      backImage: '/assets/official_products_png/butterscotch/back.png',
    },
  ],
  tuttifrutti: [
    {
      id: 'mix',
      label: 'Tutti Frutti Mix',
      frontImage: '/assets/official_products_png/tutti_frutti/front.png',
      backImage: '/assets/official_products_png/tutti_frutti/back.png',
    },
  ],
};

export const EcommerceQuickViewModal: React.FC<EcommerceQuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [pincode, setPincode] = useState('492001');
  const [pincodeChecked, setPincodeChecked] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Category identification
  const categoryKey = useMemo(() => {
    if (!product) return 'slabs';
    const cat = product.category;
    if (CATEGORY_VARIANTS[cat]) return cat;
    const n = product.name.toLowerCase();
    if (n.includes('slab')) return 'slabs';
    if (n.includes('chip')) return 'choco-chips';
    if (n.includes('button') || n.includes('coin')) return 'buttons';
    if (n.includes('butterscotch')) return 'butterscotch';
    if (n.includes('tutti')) return 'tuttifrutti';
    if (n.includes('paste')) return 'paste';
    return 'slabs';
  }, [product]);

  const variants = useMemo(() => {
    return CATEGORY_VARIANTS[categoryKey] || CATEGORY_VARIANTS['slabs'];
  }, [categoryKey]);

  const [selectedVariantId, setSelectedVariantId] = useState<string>('dark');
  const [selectedSide, setSelectedSide] = useState<'front' | 'back'>('front');

  // Sync initial variant when product opens
  useEffect(() => {
    if (product) {
      const n = product.name.toLowerCase();
      const img = (product.image || '').toLowerCase();
      if (n.includes('milk') || img.includes('milk')) {
        setSelectedVariantId('milk');
      } else if (n.includes('white') || img.includes('white')) {
        setSelectedVariantId('white');
      } else if (variants.some((v) => v.id === 'dark')) {
        setSelectedVariantId('dark');
      } else {
        setSelectedVariantId(variants[0]?.id || 'classic');
      }
      setSelectedSide('front');
    }
  }, [product, variants]);

  if (!product) return null;

  const activeVariant = variants.find((v) => v.id === selectedVariantId) || variants[0];
  const frontImage = activeVariant.frontImage;
  const backImage = activeVariant.backImage;
  const currentDisplayImage = selectedSide === 'front' ? frontImage : backImage;

  const handleBuyNowWhatsApp = () => {
    const message = `*🍫 FACTORY INQUIRY - ROMAS CHOCOLATES*\n` +
      `─────────────────────────\n` +
      `*Product:* ${product.name}\n` +
      `*Category:* ${product.categoryLabel}\n` +
      `*Selected Variant:* ${activeVariant.label}\n` +
      `*Pack Size:* ${product.weight}\n` +
      `*Delivery Pincode:* ${pincode}\n` +
      `─────────────────────────\n` +
      `Please share catalog, master case specifications & dispatch details from Kurud Works, Dhamtari.`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919098229454?text=${encoded}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on ROMAS Chocolates!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Product Details Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative w-full max-w-5xl rounded-xl bg-[#F1F3F6] border border-gray-200 shadow-2xl z-10 max-h-[92vh] overflow-hidden flex flex-col text-[#212121]"
          >
            {/* Top Bar with Breadcrumbs & Close Button */}
            <div className="bg-[#2874F0] px-4 sm:px-6 py-2.5 text-white flex items-center justify-between shadow-sm select-none">
              <div className="flex items-center gap-1.5 text-xs text-white/90 overflow-hidden truncate">
                <span className="font-semibold hover:underline cursor-pointer" onClick={onClose}>Home</span>
                <ChevronRight className="w-3.5 h-3.5 text-white/70 shrink-0" />
                <span className="font-semibold hover:underline cursor-pointer" onClick={onClose}>Chocolates</span>
                <ChevronRight className="w-3.5 h-3.5 text-white/70 shrink-0" />
                <span className="text-white/80 shrink-0">{product.categoryLabel}</span>
                <ChevronRight className="w-3.5 h-3.5 text-white/70 shrink-0" />
                <span className="text-white font-bold truncate">{product.name}</span>
              </div>

              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#2874F0] flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-3"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main Modal Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto bg-[#F1F3F6] p-2 sm:p-4">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden">
                
                {/* =========================================================
                    LEFT COLUMN: Product Gallery (2 Thumbnails: FRONT & BACK)
                    ========================================================= */}
                <div className="md:col-span-5 p-4 sm:p-6 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex flex-col-reverse sm:flex-row gap-3">
                      
                      {/* Vertical Thumbnails: EXACTLY 2 (FRONT & BACK) */}
                      <div className="flex sm:flex-col gap-2 shrink-0 justify-center">
                        {/* 1. FRONT SIDE THUMBNAIL */}
                        <button
                          onClick={() => setSelectedSide('front')}
                          className={`w-16 h-20 rounded-lg border-2 p-1 transition-all bg-[#FAF8F5] flex flex-col items-center justify-between cursor-pointer ${
                            selectedSide === 'front'
                              ? 'border-[#2874F0] ring-2 ring-[#2874F0]/30 shadow-sm scale-102'
                              : 'border-gray-200 hover:border-gray-400 opacity-80 hover:opacity-100'
                          }`}
                        >
                          <div className="flex-1 w-full flex items-center justify-center overflow-hidden">
                            <img
                              src={frontImage}
                              alt="Front View"
                              className="max-h-12 w-auto object-contain"
                            />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-gray-700 bg-white/90 px-1.5 py-0.5 rounded w-full text-center">
                            Front
                          </span>
                        </button>

                        {/* 2. BACK SIDE THUMBNAIL */}
                        <button
                          onClick={() => setSelectedSide('back')}
                          className={`w-16 h-20 rounded-lg border-2 p-1 transition-all bg-[#FAF8F5] flex flex-col items-center justify-between cursor-pointer ${
                            selectedSide === 'back'
                              ? 'border-[#2874F0] ring-2 ring-[#2874F0]/30 shadow-sm scale-102'
                              : 'border-gray-200 hover:border-gray-400 opacity-80 hover:opacity-100'
                          }`}
                        >
                          <div className="flex-1 w-full flex items-center justify-center overflow-hidden">
                            <img
                              src={backImage}
                              alt="Back View"
                              className="max-h-12 w-auto object-contain"
                            />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-gray-700 bg-white/90 px-1.5 py-0.5 rounded w-full text-center">
                            Back
                          </span>
                        </button>
                      </div>

                      {/* Main Image Stage */}
                      <div className="relative flex-1 h-72 sm:h-84 flex items-center justify-center p-4 bg-[#FAF8F5] border border-gray-100 rounded-lg group select-none">
                        
                        {/* Wishlist & Share Action Icons */}
                        <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
                          <button
                            onClick={() => setIsWishlisted(!isWishlisted)}
                            className="w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                            title="Add to Wishlist"
                            aria-label="Wishlist"
                          >
                            <Heart
                              className={`w-4 h-4 transition-colors ${
                                isWishlisted ? 'text-red-500 fill-red-500' : ''
                              }`}
                            />
                          </button>
                          <button
                            onClick={handleShare}
                            className="w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#2874F0] transition-colors cursor-pointer"
                            title="Share Product"
                            aria-label="Share"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Front / Back Flip Button Badge */}
                        <button
                          onClick={() => setSelectedSide((prev) => (prev === 'front' ? 'back' : 'front'))}
                          className="absolute bottom-2 left-2 px-3 py-1 rounded-full bg-black/75 hover:bg-black text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs flex items-center gap-1.5 z-10 transition-all cursor-pointer shadow-md active:scale-95"
                          title="Click to flip packaging"
                        >
                          <RotateCcw className="w-3 h-3 text-[#F9BD03]" />
                          <span>{selectedSide === 'front' ? 'Flip to Back' : 'Flip to Front'}</span>
                        </button>

                        {/* Tag Pill */}
                        {product.tag && (
                          <div className="absolute top-2 left-2 z-10">
                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#F9BD03] text-[#1C0E07] shadow-sm">
                              {product.tag}
                            </span>
                          </div>
                        )}

                        {/* Main Product Visual (Active Front or Back) */}
                        <img
                          src={currentDisplayImage}
                          alt={`${product.name} - ${selectedSide === 'front' ? 'Front Side' : 'Back Side'}`}
                          className="max-h-full max-w-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons: Shop Now (Coming Soon) & WhatsApp Inquiry */}
                  <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-2.5">
                    {/* SHOP NOW - COMING SOON */}
                    <button
                      disabled
                      className="flex-1 py-3 px-4 rounded bg-amber-50 border border-amber-300 text-amber-900 font-bold text-xs uppercase tracking-wider shadow-2xs flex items-center justify-center gap-2 cursor-not-allowed select-none"
                    >
                      <ShoppingCart className="w-4 h-4 text-amber-600" />
                      <span>SHOP NOW (COMING SOON)</span>
                    </button>

                    {/* DIRECT FACTORY INQUIRY */}
                    <button
                      onClick={handleBuyNowWhatsApp}
                      className="flex-1 py-3 px-4 rounded bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <Zap className="w-4 h-4 fill-white" />
                      <span>INQUIRE VIA WHATSAPP</span>
                    </button>
                  </div>
                </div>

                {/* =========================================================
                    RIGHT COLUMN: Product Details, Variants & Specs
                    ========================================================= */}
                <div className="md:col-span-7 p-4 sm:p-6 flex flex-col space-y-4 bg-white">
                  
                  {/* Brand & Title */}
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                      ROMAS &bull; {product.categoryLabel}
                    </span>
                    <h1 className="text-lg sm:text-xl font-bold text-[#212121] leading-snug mt-0.5">
                      {product.name} ({product.weight})
                    </h1>
                    {product.hindiName && (
                      <p className="text-xs text-gray-600 font-normal mt-0.5">
                        {product.hindiName}
                      </p>
                    )}
                  </div>

                  {/* Category-Specific Variant Selector (e.g. Dark, Milk, White) */}
                  {variants.length > 1 && (
                    <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#EADBCC]/80">
                      <span className="text-xs font-bold text-[#1C0E07] uppercase tracking-wider block mb-2">
                        Select Flavour / Variant: <span className="text-[#8C4724] font-black">{activeVariant.label}</span>
                      </span>
                      <div className="flex items-center gap-2 flex-wrap">
                        {variants.map((v) => {
                          const isCurrent = v.id === selectedVariantId;
                          return (
                            <button
                              key={v.id}
                              onClick={() => {
                                setSelectedVariantId(v.id);
                                setSelectedSide('front');
                              }}
                              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                                isCurrent
                                  ? 'bg-[#1C0E07] text-[#F9BD03] border-[#1C0E07] shadow-sm scale-102'
                                  : 'bg-white text-gray-700 border-gray-300 hover:border-[#8C4724]'
                              }`}
                            >
                              {v.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Ratings & Reviews Row with F-Assured Badge */}
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <div className="bg-[#388E3C] text-white text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow-sm">
                      <span>{product.rating}</span>
                      <Star className="w-3 h-3 fill-white text-white" />
                    </div>

                    <span className="text-xs font-medium text-[#878787]">
                      {product.reviewCount} Ratings & {Math.round(product.reviewCount * 0.28)} Reviews
                    </span>

                    <div className="flex items-center gap-1 bg-[#F0F5FF] border border-[#2874F0]/30 px-2 py-0.5 rounded text-[11px] font-black italic text-[#2874F0]">
                      <span>✦</span>
                      <span>ROMAS Assured</span>
                    </div>
                  </div>

                  {/* Online Shopping Coming Soon Notice (Display Showcase Mode) */}
                  <div className="border-y border-amber-200/80 bg-gradient-to-r from-amber-50/90 to-[#FAF8F5] p-3.5 rounded-lg my-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wide">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      <span>Online Shopping Coming Soon</span>
                    </div>
                    <p className="text-xs text-amber-800/90 mt-1 font-sans leading-relaxed">
                      Online consumer direct checkout is launching soon. Products are currently for master catalogue display and direct factory trade inquiries from Kurud Works, Dhamtari.
                    </p>
                  </div>

                  {/* Highlights / Technical Specifications */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#212121]">
                      Product Highlights & Craft
                    </h3>
                    <ul className="space-y-1.5 text-xs text-[#212121]">
                      <li className="flex items-start gap-2">
                        <Tag className="w-3.5 h-3.5 text-[#388E3C] shrink-0 mt-0.5" />
                        <span>
                          <strong>Factory Direct:</strong> Authentic patisserie grade formulation from Kurud, Dhamtari
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Tag className="w-3.5 h-3.5 text-[#388E3C] shrink-0 mt-0.5" />
                        <span>
                          <strong>100% Vegetarian:</strong> Pure vegetarian certification, zero animal fats or gelatin
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Tag className="w-3.5 h-3.5 text-[#388E3C] shrink-0 mt-0.5" />
                        <span>
                          <strong>Bulk / Wholesale Inquiries:</strong> Master corrugated cartons & pallet dispatches available
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Delivery Pincode Checker */}
                  <div className="p-3 bg-[#FAF8F5] border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-gray-500 shrink-0" />
                      <span className="text-xs font-medium text-gray-600">Delivery to:</span>
                      <div className="flex items-center border border-gray-300 rounded bg-white px-2 py-0.5">
                        <input
                          type="text"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          maxLength={6}
                          className="w-18 text-xs font-bold text-gray-800 focus:outline-none"
                        />
                        <button
                          onClick={() => setPincodeChecked(true)}
                          className="text-xs text-[#2874F0] font-bold hover:underline ml-1"
                        >
                          Check
                        </button>
                      </div>
                    </div>
                    {pincodeChecked && (
                      <div className="text-xs space-y-0.5">
                        <div className="text-gray-800 font-semibold flex items-center gap-2">
                          <span>Delivery in 2 - 3 Days</span>
                          <span className="text-[#388E3C] font-bold">Pan-India Dispatch</span>
                        </div>
                        <p className="text-gray-500 text-[11px]">
                          Dispatched directly from Kurud Works, Dhamtari (493663)
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Technical Packaging Specs */}
                  <div className="pt-2 border-t border-gray-200 text-xs space-y-1">
                    <h3 className="font-bold text-gray-800 uppercase tracking-wider mb-2">
                      Packaging Specifications
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-gray-600">
                      <div>
                        <span className="text-gray-400 block text-[11px]">Category</span>
                        <span className="font-semibold text-gray-800">{product.categoryLabel}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[11px]">Active Variant</span>
                        <span className="font-semibold text-[#8C4724]">{activeVariant.label}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[11px]">Pack Size</span>
                        <span className="font-semibold text-gray-800">{product.weight}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[11px]">Inspection</span>
                        <span className="font-semibold text-[#007600]">Front & Back Packaging</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
