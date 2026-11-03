import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  Heart,
  Share2,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  ChevronRight,
  ArrowLeft,
  MapPin,
  Lock,
  Tag,
  ShoppingCart,
  Zap,
  Info,
} from 'lucide-react';
import { EcommerceProduct } from '../types/ecommerce';
import { ECOMMERCE_PRODUCTS } from '../data/ecommerceProducts';
import { useCart } from '../context/CartContext';
import { Gr8rFooter } from './Gr8rFooter';
import { LegalTabType } from './LegalPage';

interface ProductDetailsPageProps {
  product: EcommerceProduct;
  onBack: () => void;
  onNavigateHome: (sectionId?: string) => void;
  onNavigateShop: () => void;
  onSelectProduct?: (product: EcommerceProduct) => void;
  onOpenReservation?: () => void;
  onOpenBrandGuide?: () => void;
  onOpenLegal?: (tab: LegalTabType) => void;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  product,
  onBack,
  onNavigateHome,
  onNavigateShop,
  onSelectProduct,
  onOpenReservation,
  onOpenBrandGuide,
  onOpenLegal,
}) => {
  const { addToCart, setIsCartOpen, isWishlisted, toggleWishlist, setIsWishlistOpen } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.weight);
  const [couponApplied, setCouponApplied] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const isCurrentWishlisted = isWishlisted(product.id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = `${product.name} | ROMAS Chocolates`;
  }, [product]);

  // Gallery of high-resolution images
  const galleryImages = [
    product.image,
    '/assets/chocolate/romas_slab_cutout.png',
    '/assets/chocolate/branch_works.jpg',
    '/assets/chocolate/roma_slab_official.jpg',
  ];

  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const unitPrice = couponApplied ? Math.round(product.price * 0.95) : product.price;
  const totalPrice = unitPrice * quantity;
  const savings = (product.mrp - unitPrice) * quantity;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
    }, 1500);
  };

  const handleBuyNowWhatsApp = () => {
    addToCart(product, quantity);
    const message = `*🛒 DIRECT FULL SCREEN ORDER - ROMAS CHOCOLATES*\n` +
      `─────────────────────────\n` +
      `*Product:* ${product.name}\n` +
      `*Pack Size:* ${selectedSize}\n` +
      `*Quantity:* ${quantity}\n` +
      `*Unit Price:* ₹${unitPrice} (M.R.P. ₹${product.mrp})\n` +
      `*Grand Total:* ₹${totalPrice}\n` +
      `*Discount Saved:* ₹${savings}\n` +
      `*Delivery Guarantee:* Insulated Cold-Pack Pan-India\n` +
      `─────────────────────────\n` +
      `Please confirm my order and share UPI QR / payment link for dispatch from Kurud Works, Dhamtari.`;
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

  // Other related products for the bottom carousel
  const relatedProducts = ECOMMERCE_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-white text-[#0F1111] flex flex-col font-sans pt-24 sm:pt-28">
      {/* Top Breadcrumbs & Back Navigation Bar */}
      <div className="border-b border-gray-200 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={onNavigateShop}
              className="text-[#007185] hover:underline font-medium cursor-pointer"
            >
              Shop
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <button
              onClick={onNavigateShop}
              className="text-[#007185] hover:underline font-medium cursor-pointer"
            >
              {product.categoryLabel}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span className="text-gray-800 font-medium truncate max-w-xs sm:max-w-md">
              {product.name}
            </span>
          </div>

          <button
            onClick={onBack}
            className="inline-flex items-center gap-1 px-3 py-1 rounded border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium transition-colors shadow-sm cursor-pointer shrink-0 ml-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Products</span>
          </button>
        </div>
      </div>

      {/* Main Full-Screen Product Details View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* =========================================================================
              COLUMN 1 (Left, 5 Cols): Gallery Thumbnails & High-Res Product Image
              ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col-reverse sm:flex-row gap-4 sticky top-28">
            {/* Vertical Thumbnail Strip */}
            <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onMouseEnter={() => setSelectedImageIndex(idx)}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-14 h-16 sm:w-16 sm:h-20 rounded border p-1 bg-white flex items-center justify-center transition-all cursor-pointer ${
                    selectedImageIndex === idx
                      ? 'border-[#E77600] ring-2 ring-[#E77600]/40 shadow-sm'
                      : 'border-gray-300 hover:border-gray-500 opacity-80 hover:opacity-100'
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
            <div className="relative flex-1 rounded-lg border border-gray-200 p-6 bg-white flex items-center justify-center min-h-[360px] sm:min-h-[460px] group shadow-sm">
              {/* Wishlist & Share Buttons */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                <button
                  onClick={() => toggleWishlist(product)}
                  className="w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors cursor-pointer active:scale-90"
                  title={isCurrentWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  aria-label="Wishlist"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isCurrentWishlisted ? 'text-red-500 fill-red-500' : ''
                    }`}
                  />
                </button>
                <button
                  onClick={handleShare}
                  className="w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#007185] transition-colors cursor-pointer"
                  title="Share"
                  aria-label="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Tag Badge */}
              {product.tag && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-[#F9BD03] text-[#1C0E07] shadow-sm">
                    {product.tag}
                  </span>
                </div>
              )}

              {/* Large Product Image */}
              <motion.img
                key={selectedImageIndex}
                initial={{ opacity: 0.8, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                src={galleryImages[selectedImageIndex]}
                alt={product.name}
                className="max-h-[380px] sm:max-h-[440px] w-auto object-contain filter drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
              />

              <span className="absolute bottom-3 text-[11px] text-gray-400 font-medium">
                Roll over image to zoom in
              </span>
            </div>
          </div>

          {/* =========================================================================
              COLUMN 2 (Center, 4 Cols): Product Information, Offers & Specifications
              ========================================================================= */}
          <div className="lg:col-span-4 space-y-4">
            {/* Title & Brand Link */}
            <div>
              <button
                onClick={onNavigateShop}
                className="text-xs font-semibold text-[#007185] hover:underline hover:text-[#C7511F] transition-colors block mb-1 text-left"
              >
                Visit the ROMAS Chocolates Store
              </button>
              <h1 className="text-xl sm:text-2xl font-bold text-[#0F1111] leading-tight">
                {product.name} ({product.weight})
              </h1>
              {product.hindiName && (
                <p className="text-sm text-gray-600 font-medium mt-1">
                  {product.hindiName}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                {product.subtitle}
              </p>
            </div>

            {/* Ratings, Choice Badge & Social Proof */}
            <div className="flex items-center gap-2 flex-wrap text-xs border-b border-gray-200 pb-3">
              <div className="flex items-center gap-1 text-[#DE7921]">
                <span className="font-bold">{product.rating}</span>
                <div className="flex text-amber-500">
                  {'★★★★★'.slice(0, Math.floor(product.rating))}
                </div>
              </div>
              <span className="text-[#007185] hover:underline cursor-pointer">
                {product.reviewCount} ratings
              </span>
              <span className="text-gray-300">|</span>
              <div className="bg-[#232F3E] text-white text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                <span>ROMAS's</span>
                <span className="text-[#F9BD03]">Choice</span>
              </div>
              <span className="text-gray-500 text-[11px]">800+ bought in past month</span>
            </div>

            {/* Pricing Section */}
            <div className="space-y-1">
              <div className="inline-block bg-[#CC0C39] text-white text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded mb-1">
                Mega Festival Deal
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-light text-[#CC0C39]">
                  -{discountPercent}%
                </span>
                <span className="text-3xl font-bold text-[#0F1111]">
                  ₹{unitPrice}
                </span>
              </div>

              <div className="text-xs text-gray-500 flex items-center gap-2">
                <span>M.R.P.: <del className="text-gray-500">₹{product.mrp}</del></span>
                <span>(₹{Math.round(unitPrice / 5)} / 100 g)</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#007185] pt-0.5">
                <span className="text-[#007600] font-bold">✓ ROMAS Assured</span>
                <span>&bull; Inclusive of all taxes</span>
              </div>

              {/* Instant Coupon Checkbox */}
              <div className="pt-2">
                <label className="inline-flex items-center gap-2 text-xs text-gray-800 bg-[#F0F2F2] p-2 rounded border border-gray-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={couponApplied}
                    onChange={(e) => setCouponApplied(e.target.checked)}
                    className="w-4 h-4 text-[#007185] rounded cursor-pointer"
                  />
                  <span>
                    Apply <strong>5% coupon</strong> on first factory order (Save ₹{Math.round(product.price * 0.05)})
                  </span>
                </label>
              </div>
            </div>

            {/* Offers Cards (Horizontal Amazon/Flipkart Cards) */}
            <div className="space-y-2 border-y border-gray-200 py-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F1111]">
                <Tag className="w-3.5 h-3.5 text-[#007185]" />
                <span>Offers</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {/* Offer 1 */}
                <div className="p-2.5 rounded border border-gray-200 bg-[#FAFAFA] text-xs">
                  <strong className="block text-[#0F1111] mb-0.5">Cashback</strong>
                  <p className="text-[11px] text-gray-600 line-clamp-2">
                    Upto ₹25 cashback on WhatsApp UPI / Direct QR.
                  </p>
                  <span className="text-[10px] text-[#007185] font-semibold mt-1 block">1 offer &gt;</span>
                </div>

                {/* Offer 2 */}
                <div className="p-2.5 rounded border border-gray-200 bg-[#FAFAFA] text-xs">
                  <strong className="block text-[#0F1111] mb-0.5">Bank Offer</strong>
                  <p className="text-[11px] text-gray-600 line-clamp-2">
                    Flat 5% instant discount on UPI prepaid orders.
                  </p>
                  <span className="text-[10px] text-[#007185] font-semibold mt-1 block">2 offers &gt;</span>
                </div>

                {/* Offer 3 */}
                <div className="p-2.5 rounded border border-gray-200 bg-[#FAFAFA] text-xs">
                  <strong className="block text-[#0F1111] mb-0.5">Partner Offer</strong>
                  <p className="text-[11px] text-gray-600 line-clamp-2">
                    Free Insulated Cold-Pack on orders above ₹799.
                  </p>
                  <span className="text-[10px] text-[#007185] font-semibold mt-1 block">1 offer &gt;</span>
                </div>
              </div>
            </div>

            {/* Trust Strip (Circular Badges Row) */}
            <div className="grid grid-cols-4 gap-2 text-center py-2 text-xs">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#007185] mb-1">
                  <Truck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-medium text-gray-700">Free Delivery</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#007185] mb-1">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-medium text-gray-700">7 Days Return</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#007185] mb-1">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-medium text-gray-700">FSSAI Certified</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#007185] mb-1">
                  <Lock className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-medium text-gray-700">Secure Payment</span>
              </div>
            </div>

            {/* Pack Size / Variant Selector */}
            <div className="border-t border-gray-200 pt-3">
              <span className="text-xs text-gray-600 block mb-1.5 font-medium">
                Size: <strong className="text-gray-900">{selectedSize}</strong>
              </span>
              <div className="flex gap-2">
                {['250g Pack', '500g Slab', '1kg Luxury Box'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 rounded border text-xs font-medium cursor-pointer transition-all ${
                      selectedSize === size
                        ? 'border-[#E77600] bg-[#FFF8F0] text-[#0F1111] font-bold shadow-sm'
                        : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* About This Item (Bullet Points) */}
            <div className="border-t border-gray-200 pt-3">
              <h3 className="text-sm font-bold text-[#0F1111] mb-2">
                About this item
              </h3>
              <ul className="space-y-1.5 text-xs text-gray-700">
                {product.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-gray-400 font-bold">&bull;</span>
                    <span>{h}</span>
                  </li>
                ))}
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 font-bold">&bull;</span>
                  <span><strong>100% Vegetarian standard</strong> manufactured under State License 10526005000033.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 font-bold">&bull;</span>
                  <span><strong>Storage:</strong> {product.storage}. Shelf life of {product.shelfLife}.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* =========================================================================
              COLUMN 3 (Right, 3 Cols): The Famous Sticky Buy Box
              ========================================================================= */}
          <div className="lg:col-span-3 sticky top-28">
            <div className="rounded-xl border border-[#D5D9D9] p-4 bg-white shadow-sm space-y-3">
              {/* Box Price */}
              <div>
                <span className="text-2xl font-bold text-[#0F1111]">
                  ₹{totalPrice}
                </span>
                <span className="text-xs text-gray-500 block">
                  (₹{Math.round(unitPrice / 5)} / 100 g)
                </span>
              </div>

              {/* Delivery Details */}
              <div className="text-xs text-gray-700 space-y-1">
                <p>
                  <strong>FREE delivery</strong> for orders above ₹799. Dispatched in insulated cold-pack within 24 hours.
                </p>
                <div className="flex items-center gap-1 text-[#007185] pt-0.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Delivering to Raipur / Dhamtari 492001</span>
                </div>
              </div>

              {/* Stock Status */}
              <div>
                <span className="text-base font-bold text-[#007600] block">
                  In stock
                </span>
                <span className="text-xs text-gray-500">
                  Fresh batch tempered at Kurud Works
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between text-xs border-y border-gray-200 py-2">
                <span className="font-medium text-gray-600">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-7 h-7 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold text-gray-900 font-mono">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-7 h-7 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons: Add to Cart & Buy Now */}
              <div className="space-y-2 pt-1">
                {/* Yellow Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full py-2.5 px-4 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] font-semibold text-xs transition-all shadow-sm active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{addedAnimation ? 'Item Added to Cart!' : 'Add to Cart'}</span>
                </button>

                {/* Orange Buy Now Button */}
                <button
                  onClick={handleBuyNowWhatsApp}
                  className="w-full py-2.5 px-4 rounded-full bg-[#FFA41C] hover:bg-[#FA8900] text-[#0F1111] font-semibold text-xs transition-all shadow-sm active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-black" />
                  <span>Buy Now (Instant WhatsApp)</span>
                </button>

                {/* Amazon-style Add to Wish List Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`w-full py-2 px-4 rounded-lg border text-xs font-semibold transition-all shadow-2xs cursor-pointer flex items-center justify-center gap-2 ${
                    isCurrentWishlisted
                      ? 'bg-red-50 border-red-300 text-red-600'
                      : 'bg-[#F0F2F2] hover:bg-[#E3E6E6] border-[#D5D9D9] text-[#0F1111]'
                  }`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 transition-colors ${
                      isCurrentWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
                    }`}
                  />
                  <span>{isCurrentWishlisted ? 'Saved to Wishlist' : 'Add to Wish List'}</span>
                </button>
              </div>

              {/* Seller & Dispatch Details */}
              <div className="text-[11px] text-gray-600 space-y-1 pt-2 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-500">Ships from:</span>
                  <span className="font-medium text-gray-900">ROMAS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Sold by:</span>
                  <span className="font-medium text-gray-900">Roma Foods Pvt. Ltd.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Packaging:</span>
                  <span className="font-medium text-[#007600]">Insulated Thermal Box</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment:</span>
                  <span className="font-medium text-gray-900">Secure transaction</span>
                </div>
              </div>

              {/* Add to Wishlist Button */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="w-full py-2 px-4 rounded-lg bg-[#E7E9EC] hover:bg-[#D5D9D9] border border-[#D5D9D9] text-[#0F1111] text-xs font-medium transition-colors cursor-pointer"
              >
                {isWishlisted ? '✓ Added to Wish List' : 'Add to Wish List'}
              </button>
            </div>
          </div>

        </div>

        {/* =========================================================================
            SECTION: Technical Specifications Table (Amazon / Flipkart Full Width)
            ========================================================================= */}
        <div className="mt-14 pt-10 border-t border-gray-200">
          <h2 className="text-lg font-bold text-[#0F1111] mb-4">
            Technical Details & Specifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* General Specs */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-100 px-4 py-2 font-bold text-xs text-gray-700">
                General Product Details
              </div>
              <table className="w-full text-xs text-left">
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="w-1/3 p-2.5 text-gray-500 bg-gray-50/50 font-medium">Brand</td>
                    <td className="p-2.5 text-gray-900 font-semibold">ROMAS (Roma Foods)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="w-1/3 p-2.5 text-gray-500 bg-gray-50/50 font-medium">Item Model Number</td>
                    <td className="p-2.5 text-gray-900">{product.id.toUpperCase()}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="w-1/3 p-2.5 text-gray-500 bg-gray-50/50 font-medium">Form</td>
                    <td className="p-2.5 text-gray-900">{product.categoryLabel}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="w-1/3 p-2.5 text-gray-500 bg-gray-50/50 font-medium">Diet Type</td>
                    <td className="p-2.5 text-gray-900 flex items-center gap-1.5 font-semibold text-emerald-700">
                      <span className="w-3.5 h-3.5 rounded border border-emerald-600 flex items-center justify-center p-0.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      </span>
                      <span>100% Vegetarian</span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="w-1/3 p-2.5 text-gray-500 bg-gray-50/50 font-medium">Speciality</td>
                    <td className="p-2.5 text-gray-900">Zero Palm Oil, 100% Pure Cocoa Butter</td>
                  </tr>
                  <tr>
                    <td className="w-1/3 p-2.5 text-gray-500 bg-gray-50/50 font-medium">Net Quantity</td>
                    <td className="p-2.5 text-gray-900 font-medium">{product.weight}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Manufacturer & Compliance */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-100 px-4 py-2 font-bold text-xs text-gray-700">
                Manufacturing & Regulatory Information
              </div>
              <table className="w-full text-xs text-left">
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="w-1/3 p-2.5 text-gray-500 bg-gray-50/50 font-medium">Manufacturer</td>
                    <td className="p-2.5 text-gray-900">ROMA FOODS PRIVATE LIMITED</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="w-1/3 p-2.5 text-gray-500 bg-gray-50/50 font-medium">Registered Works</td>
                    <td className="p-2.5 text-gray-900 leading-snug">
                      KH No. 154/1, Village Darba, Block Kurud, Dhamtari - 493663, Chhattisgarh
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="w-1/3 p-2.5 text-gray-500 bg-gray-50/50 font-medium">FSSAI License No.</td>
                    <td className="p-2.5 text-gray-900 font-mono font-bold">10526005000033</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="w-1/3 p-2.5 text-gray-500 bg-gray-50/50 font-medium">GST Registration</td>
                    <td className="p-2.5 text-gray-900 font-mono">22ABAFR5939G2Z8</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="w-1/3 p-2.5 text-gray-500 bg-gray-50/50 font-medium">Customer Support</td>
                    <td className="p-2.5 text-gray-900 font-mono">+91 9098229454</td>
                  </tr>
                  <tr>
                    <td className="w-1/3 p-2.5 text-gray-500 bg-gray-50/50 font-medium">Country of Origin</td>
                    <td className="p-2.5 text-gray-900 font-semibold">India</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION: Related ROMAS Chocolates
            ========================================================================= */}
        <div className="mt-14 pt-10 border-t border-gray-200">
          <h2 className="text-lg font-bold text-[#0F1111] mb-6">
            Customers who viewed this item also viewed
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectProduct && onSelectProduct(rel)}
                className="p-4 rounded-xl border border-gray-200 hover:border-gray-400 bg-white shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="h-44 flex items-center justify-center p-2 mb-2">
                  <img
                    src={rel.image}
                    alt={rel.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform"
                  />
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-500 block">
                    {rel.categoryLabel}
                  </span>
                  <h4 className="text-xs font-bold text-[#0F1111] line-clamp-1 group-hover:text-[#007185] transition-colors">
                    {rel.name}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-amber-500 mt-1">
                    <span>★ {rel.rating}</span>
                    <span className="text-gray-400">({rel.reviewCount})</span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-sm font-bold text-[#0F1111]">₹{rel.price}</span>
                    <span className="text-[11px] text-gray-400 line-through">₹{rel.mrp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Gr8rFooter
        onOpenReservation={onOpenReservation}
        onOpenBrandGuide={onOpenBrandGuide}
        onNavigate={(id) => onNavigateHome(id)}
        onOpenLegal={onOpenLegal}
      />
    </div>
  );
};

