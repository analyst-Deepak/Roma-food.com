import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Star,
  Heart,
  Share2,
  Tag,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  ShoppingCart,
  Zap,
  MapPin,
  ChevronRight,
  Info,
} from 'lucide-react';
import { EcommerceProduct } from '../types/ecommerce';
import { useCart } from '../context/CartContext';

interface EcommerceQuickViewModalProps {
  product: EcommerceProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EcommerceQuickViewModal: React.FC<EcommerceQuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('492001');
  const [pincodeChecked, setPincodeChecked] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product) return null;

  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const savings = (product.mrp - product.price) * quantity;

  // Alternate preview thumbnails
  const galleryImages = [
    product.image,
    '/assets/chocolate/romas_slab_cutout.png',
    '/assets/chocolate/branch_works.jpg',
  ];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
    }, 1200);
  };

  const handleBuyNowWhatsApp = () => {
    addToCart(product, quantity);
    const message = `*🛒 FLIPKART STYLE DIRECT ORDER - ROMAS CHOCOLATES*\n` +
      `─────────────────────────\n` +
      `*Product:* ${product.name}\n` +
      `*Pack Size:* ${product.weight}\n` +
      `*Quantity:* ${quantity}\n` +
      `*Price per unit:* ₹${product.price} (MRP: ₹${product.mrp})\n` +
      `*Total Amount:* ₹${product.price * quantity}\n` +
      `*Delivery Pincode:* ${pincode}\n` +
      `─────────────────────────\n` +
      `Please confirm my order and share UPI / QR payment link for dispatch from Kurod Works, Dhamtari.`;
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

          {/* Flipkart Style Product Details Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative w-full max-w-5xl rounded-xl bg-[#F1F3F6] border border-gray-200 shadow-2xl z-10 max-h-[92vh] overflow-hidden flex flex-col text-[#212121]"
          >
            {/* Flipkart Blue Top Bar with Breadcrumbs & Close Button */}
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
                    LEFT COLUMN: Product Gallery & Flipkart Action Buttons
                    ========================================================= */}
                <div className="md:col-span-5 p-4 sm:p-6 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex gap-3">
                      {/* Vertical Thumbnails (Flipkart style) */}
                      <div className="hidden sm:flex flex-col gap-2 shrink-0">
                        {galleryImages.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedImageIndex(idx)}
                            className={`w-14 h-16 rounded border p-1 transition-all bg-white flex items-center justify-center cursor-pointer ${
                              selectedImageIndex === idx
                                ? 'border-[#2874F0] ring-2 ring-[#2874F0]/30 shadow-sm'
                                : 'border-gray-200 hover:border-gray-400 opacity-80 hover:opacity-100'
                            }`}
                          >
                            <img
                              src={img}
                              alt={`Thumbnail ${idx + 1}`}
                              className="max-h-full max-w-full object-contain"
                            />
                          </button>
                        ))}
                      </div>

                      {/* Main Image Stage */}
                      <div className="relative flex-1 h-72 sm:h-84 flex items-center justify-center p-4 bg-white border border-gray-100 rounded-lg group">
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

                        {/* Tag Pill */}
                        {product.tag && (
                          <div className="absolute top-2 left-2 z-10">
                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#F9BD03] text-[#1C0E07] shadow-sm">
                              {product.tag}
                            </span>
                          </div>
                        )}

                        {/* Product Visual */}
                        <img
                          src={galleryImages[selectedImageIndex]}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain filter drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Flipkart's Iconic Dual Action Buttons: ADD TO CART & BUY NOW */}
                  <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-2.5">
                    {/* ADD TO CART - Flipkart Yellow #FF9F00 */}
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 py-3 px-4 rounded bg-[#FF9F00] hover:bg-[#F39700] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>{addedAnimation ? 'ADDED TO CART!' : 'ADD TO CART'}</span>
                    </button>

                    {/* BUY NOW - Flipkart Orange #FB641B */}
                    <button
                      onClick={handleBuyNowWhatsApp}
                      className="flex-1 py-3 px-4 rounded bg-[#FB641B] hover:bg-[#E85A14] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <Zap className="w-4 h-4 fill-white" />
                      <span>BUY NOW</span>
                    </button>
                  </div>
                </div>

                {/* =========================================================
                    RIGHT COLUMN: Flipkart Style Product Information
                    ========================================================= */}
                <div className="md:col-span-7 p-4 sm:p-6 flex flex-col space-y-4 bg-white">
                  
                  {/* Brand & Title */}
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                      ROMAS &bull; {product.categoryLabel}
                    </span>
                    <h1 className="text-lg sm:text-xl font-medium text-[#212121] leading-snug mt-0.5">
                      {product.name} ({product.weight})
                    </h1>
                    {product.hindiName && (
                      <p className="text-xs text-gray-600 font-normal mt-0.5">
                        {product.hindiName}
                      </p>
                    )}
                  </div>

                  {/* Ratings & Reviews Row with F-Assured Badge */}
                  <div className="flex items-center gap-2.5 flex-wrap">
                    {/* Flipkart Green Rating Pill */}
                    <div className="bg-[#388E3C] text-white text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow-sm">
                      <span>{product.rating}</span>
                      <Star className="w-3 h-3 fill-white text-white" />
                    </div>

                    <span className="text-xs font-medium text-[#878787]">
                      {product.reviewCount} Ratings & {Math.round(product.reviewCount * 0.28)} Reviews
                    </span>

                    {/* Flipkart Assured Style Badge */}
                    <div className="flex items-center gap-1 bg-[#F0F5FF] border border-[#2874F0]/30 px-2 py-0.5 rounded text-[11px] font-black italic text-[#2874F0]">
                      <span>✦</span>
                      <span>ROMAS Assured</span>
                    </div>
                  </div>

                  {/* Price Section (Flipkart Exact Styling) */}
                  <div className="border-y border-gray-100 py-3">
                    <span className="text-xs font-bold text-[#388E3C] block mb-0.5">
                      Special price
                    </span>
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl sm:text-3xl font-bold text-[#212121] font-sans">
                        ₹{product.price * quantity}
                      </span>
                      {product.mrp > product.price && (
                        <>
                          <span className="text-sm sm:text-base text-[#878787] line-through font-sans">
                            ₹{product.mrp * quantity}
                          </span>
                          <span className="text-sm sm:text-base font-bold text-[#388E3C]">
                            {discountPercent}% off
                          </span>
                        </>
                      )}
                    </div>
                    {savings > 0 && (
                      <p className="text-xs text-[#388E3C] font-semibold mt-1">
                        You will save ₹{savings} on this order
                      </p>
                    )}
                    <span className="text-[11px] text-gray-500 mt-1 block">
                      + ₹60 Insulated Cold-Pack Delivery (FREE on orders above ₹799)
                    </span>
                  </div>

                  {/* Available Offers (Flipkart Green Tag List) */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#212121]">
                      Available offers
                    </h3>
                    <ul className="space-y-1.5 text-xs text-[#212121]">
                      <li className="flex items-start gap-2">
                        <Tag className="w-3.5 h-3.5 text-[#388E3C] shrink-0 mt-0.5" />
                        <span>
                          <strong>Special Price:</strong> Get extra ₹{product.mrp - product.price} off on direct factory launch
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Tag className="w-3.5 h-3.5 text-[#388E3C] shrink-0 mt-0.5" />
                        <span>
                          <strong>Bank / UPI Offer:</strong> 5% Instant Cashback on WhatsApp UPI & Direct Transfers
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Tag className="w-3.5 h-3.5 text-[#388E3C] shrink-0 mt-0.5" />
                        <span>
                          <strong>Partner Offer:</strong> Complimentary Insulated Thermal Packing for 100% melt-free transit
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Tag className="w-3.5 h-3.5 text-[#388E3C] shrink-0 mt-0.5" />
                        <span>
                          <strong>Free Shipping:</strong> Add ₹{Math.max(0, 799 - product.price * quantity)} more to unlock FREE Pan-India delivery
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Delivery Pincode Checker (Flipkart Widget) */}
                  <div className="p-3 bg-[#FAF8F5] border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-gray-500 shrink-0" />
                      <span className="text-xs font-medium text-gray-600">Delivery to:</span>
                      <div className="flex items-center border border-gray-300 rounded bg-white px-2 py-0.5">
                        <input
                          type="text"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          className="w-20 text-xs font-bold text-gray-800 outline-none"
                        />
                        <button
                          onClick={() => setPincodeChecked(true)}
                          className="text-xs font-bold text-[#2874F0] hover:underline ml-1 cursor-pointer"
                        >
                          Check
                        </button>
                      </div>
                    </div>

                    {pincodeChecked && (
                      <div className="space-y-1 text-xs text-gray-700">
                        <div className="flex items-center gap-1.5 font-bold text-[#212121]">
                          <Truck className="w-3.5 h-3.5 text-[#388E3C]" />
                          <span>Delivery in 2 - 3 Days</span>
                          <span className="text-[#388E3C] ml-1">| Free ₹60</span>
                        </div>
                        <p className="text-[11px] text-gray-500">
                          Dispatched directly from Kurud Works, Dhamtari (493663)
                        </p>
                        <p className="text-[11px] text-gray-600 font-medium">
                          ✓ Cash on Delivery available &bull; 7 Days Replacement Policy
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Quantity & Pack Weight Selector */}
                  <div className="flex items-center gap-4 py-1">
                    <span className="text-xs font-medium text-gray-500">Quantity:</span>
                    <div className="flex items-center border border-gray-300 rounded bg-white">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-7 h-7 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
                        aria-label="Decrease"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-gray-900 font-mono">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-7 h-7 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
                        aria-label="Increase"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-xs text-gray-600">
                      Pack: <strong className="text-gray-900">{product.weight}</strong>
                    </div>
                  </div>

                  {/* Highlights (Flipkart Bullet Points) */}
                  <div className="border-t border-gray-100 pt-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#212121] mb-2">
                      Highlights
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-gray-700">
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#878787]" />
                        <span>Type: <strong>{product.categoryLabel}</strong></span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#878787]" />
                        <span>Pack: <strong>{product.weight}</strong></span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#878787]" />
                        <span>Dietary: <strong>100% Vegetarian</strong></span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#878787]" />
                        <span>Shelf Life: <strong>{product.shelfLife}</strong></span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#878787]" />
                        <span>Micro-Refining: <strong>Sub-20 Microns</strong></span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#878787]" />
                        <span>Cocoa: <strong>{product.cocoaContent || 'Pure Cocoa Butter'}</strong></span>
                      </li>
                    </ul>
                  </div>

                  {/* Services / Trust Strip */}
                  <div className="border-t border-gray-100 pt-3 grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded bg-gray-50 border border-gray-200">
                      <RotateCcw className="w-4 h-4 text-[#2874F0] mx-auto mb-1" />
                      <span className="text-[10px] font-bold text-gray-700 block">7 Days Return</span>
                      <span className="text-[9px] text-gray-500">Fresh Replacement</span>
                    </div>

                    <div className="p-2 rounded bg-gray-50 border border-gray-200">
                      <Truck className="w-4 h-4 text-[#388E3C] mx-auto mb-1" />
                      <span className="text-[10px] font-bold text-gray-700 block">Insulated Pack</span>
                      <span className="text-[9px] text-gray-500">Melt-Free Transit</span>
                    </div>

                    <div className="p-2 rounded bg-gray-50 border border-gray-200">
                      <ShieldCheck className="w-4 h-4 text-[#FF9F00] mx-auto mb-1" />
                      <span className="text-[10px] font-bold text-gray-700 block">FSSAI Certified</span>
                      <span className="text-[9px] text-gray-500">10526005000033</span>
                    </div>
                  </div>

                  {/* Specifications Table (Flipkart Two-Column Format) */}
                  <div className="border-t border-gray-100 pt-3">
                    <h3 className="text-sm font-bold text-[#212121] mb-2">
                      Specifications
                    </h3>

                    {/* Section: In The Box */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden mb-3">
                      <div className="bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-700 border-b border-gray-200">
                        In The Box
                      </div>
                      <table className="w-full text-xs text-left">
                        <tbody>
                          <tr className="border-b border-gray-100">
                            <td className="w-1/3 p-2 text-gray-500 font-medium bg-gray-50/50">Sales Package</td>
                            <td className="p-2 text-gray-900 font-medium">1 Retail Pack ({product.weight})</td>
                          </tr>
                          <tr>
                            <td className="w-1/3 p-2 text-gray-500 font-medium bg-gray-50/50">Pack of</td>
                            <td className="p-2 text-gray-900 font-medium">1</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Section: General */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-700 border-b border-gray-200">
                        General Details
                      </div>
                      <table className="w-full text-xs text-left">
                        <tbody>
                          <tr className="border-b border-gray-100">
                            <td className="w-1/3 p-2 text-gray-500 font-medium bg-gray-50/50">Brand</td>
                            <td className="p-2 text-gray-900 font-medium">ROMAS (Roma Foods)</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="w-1/3 p-2 text-gray-500 font-medium bg-gray-50/50">Model Name</td>
                            <td className="p-2 text-gray-900 font-medium">{product.name}</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="w-1/3 p-2 text-gray-500 font-medium bg-gray-50/50">Type</td>
                            <td className="p-2 text-gray-900 font-medium">{product.categoryLabel}</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="w-1/3 p-2 text-gray-500 font-medium bg-gray-50/50">Food Preference</td>
                            <td className="p-2 text-gray-900 font-medium flex items-center gap-1.5">
                              <span className="w-3.5 h-3.5 rounded border border-emerald-600 flex items-center justify-center p-0.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                              </span>
                              <span>100% Vegetarian</span>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="w-1/3 p-2 text-gray-500 font-medium bg-gray-50/50">Storage Condition</td>
                            <td className="p-2 text-gray-900 font-medium">{product.storage}</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="w-1/3 p-2 text-gray-500 font-medium bg-gray-50/50">Manufacturing Works</td>
                            <td className="p-2 text-gray-900 font-medium">KH No. 154/1, Village Darba, Block Kurud, Dhamtari - 493663 (C.G.)</td>
                          </tr>
                          <tr>
                            <td className="w-1/3 p-2 text-gray-500 font-medium bg-gray-50/50">Country of Origin</td>
                            <td className="p-2 text-gray-900 font-medium">India</td>
                          </tr>
                        </tbody>
                      </table>
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
