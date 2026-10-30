import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Plus, Check, ArrowRight, Droplets, Flame, Search, MessageSquare, Sparkles } from 'lucide-react';
import { Product, AudienceSegment } from '../types';
import { PRODUCTS, PRODUCT_CATEGORIES, AUDIENCE_SEGMENTS } from '../data/products';
import { ProductQuickViewModal } from './ProductQuickViewModal';
import { MotionReveal } from './MotionReveal';

interface ProductCatalogueProps {
  onRequestSample: (product: Product) => void;
  requestedSampleIds: string[];
}

export const ProductCatalogue: React.FC<ProductCatalogueProps> = ({
  onRequestSample,
  requestedSampleIds,
}) => {
  const [selectedSegment, setSelectedSegment] = useState<AudienceSegment>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  const framerEase = [0.16, 1, 0.3, 1] as const;

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSegment =
      selectedSegment === 'all' || product.segments.includes(selectedSegment as any);
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.applications.some((app) => app.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSegment && matchesCategory && matchesSearch;
  });

  return (
    <section id="chocolates" className="py-24 sm:py-36 bg-[#FAF8F5] text-[#2A0E04] relative overflow-hidden border-t border-[#381305]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Editorial Header */}
        <MotionReveal className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-[#8C4724] mb-4">
            <span className="w-8 h-[1px] bg-[#C59B27]" />
            <span>The ROMAS Atelier</span>
            <span className="w-8 h-[1px] bg-[#C59B27]" />
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-[#2A0E04] leading-tight text-balance">
            Haute Confectionery & Couverture Portfolio
          </h2>
          <p className="mt-5 text-sm sm:text-base text-[#2A0E04]/75 text-balance leading-relaxed font-light">
            Engineered for high-output commercial patisseries and luxury chocolatiers. Discover our
            complete range of non-temper compounds, pure cocoa butter couvertures, bake-stable fillings,
            and vibrant inclusions.
          </p>
        </MotionReveal>

        {/* 1. Industry Audience Segment Navigator (Framer Spring Tabs) */}
        <MotionReveal delay={0.1} className="mt-12 sm:mt-16 bg-white p-2 sm:p-2.5 rounded-2xl sm:rounded-full border border-[#381305]/10 shadow-sm max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 relative">
            {AUDIENCE_SEGMENTS.map((seg) => {
              const isSelected = selectedSegment === seg.id;
              return (
                <button
                  key={seg.id}
                  onClick={() => setSelectedSegment(seg.id as AudienceSegment)}
                  className={`relative py-3 px-3 rounded-xl sm:rounded-full text-center transition-colors cursor-pointer ${
                    isSelected ? 'text-[#140602] font-bold' : 'text-[#2A0E04]/70 hover:text-[#2A0E04]'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeAudienceSegmentPill"
                      className="absolute inset-0 rounded-xl sm:rounded-full bg-gradient-to-r from-[#FAD674] via-[#E6C280] to-[#C59B27] shadow-md shadow-[#C59B27]/20"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 text-[11px] uppercase tracking-[0.15em] block truncate font-semibold">
                    {seg.label.split('(')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </MotionReveal>

        {/* 2. Category Filters & Search Bar with Sliding Capsule Layout */}
        <MotionReveal delay={0.15} className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#381305]/10 pb-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-2 md:pb-0 scrollbar-none relative">
            {PRODUCT_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? PRODUCTS.length
                  : PRODUCTS.filter((p) => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative px-4 py-2 rounded-full text-xs whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 ${
                    isSelected ? 'text-[#FAD674] font-bold' : 'text-[#2A0E04]/70 hover:text-[#2A0E04]'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeCategoryFilterPill"
                      className="absolute inset-0 rounded-full bg-[#381305] shadow-sm"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                  {count > 0 && (
                    <span
                      className={`relative z-10 text-[10px] px-1.5 py-0.2 rounded-full font-mono transition-colors ${
                        isSelected
                          ? 'bg-[#FAD674] text-[#381305] font-bold'
                          : 'bg-black/5 text-[#2A0E04]/60'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72 shrink-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cocoa %, application..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-full bg-white border border-[#381305]/15 focus:outline-none focus:border-[#C59B27] text-[#2A0E04] placeholder-[#2A0E04]/40 transition-colors shadow-sm"
            />
            <Search className="w-3.5 h-3.5 text-[#C59B27] absolute left-3.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 hover:text-black"
              >
                Clear
              </button>
            )}
          </div>
        </MotionReveal>

        {/* Product Count Strip */}
        <div className="mt-4 flex items-center justify-between text-xs text-[#2A0E04]/60">
          <span>
            Curated <strong className="text-[#381305] font-semibold">{filteredProducts.length}</strong> creations
          </span>
          {(selectedSegment !== 'all' || selectedCategory !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedSegment('all');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-[11px] text-[#C59B27] hover:underline cursor-pointer"
            >
              Reset Selection
            </button>
          )}
        </div>

        {/* Product Showcase Grid with Smooth Layout Motion */}
        <motion.div
          layout
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 items-stretch"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => {
              const isRequested = requestedSampleIds.includes(product.id);
              const cardWaMsg = encodeURIComponent(
                `Hello Roma Foods, I am interested in commercial pricing and sample of "${product.name}" (${product.packSize}) for my bakery/business.`
              );

              return (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4, ease: framerEase }}
                  className="group flex flex-col justify-between bg-white rounded-3xl overflow-hidden border border-[#381305]/10 hover:border-[#C59B27] shadow-sm hover:shadow-2xl transition-shadow duration-300"
                >
                  <div>
                    {/* Product Photography Container */}
                    <div className="relative aspect-[4/3] bg-[#FAF8F5] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Quick View Round Button */}
                      <motion.button
                        onClick={() => setActiveModalProduct(product)}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.92 }}
                        className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-white/95 text-[#381305] border border-[#C59B27]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xl cursor-pointer"
                        title="Inspect Technical Dossier"
                        aria-label={`Inspect ${product.name}`}
                      >
                        <Eye className="w-5 h-5" />
                      </motion.button>

                      {/* Top Status Tags */}
                      <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                        {product.badge && (
                          <div className="px-2.5 py-0.5 rounded-full bg-[#FAD674] text-[#2A0E04] text-[9px] font-bold uppercase tracking-[0.2em] shadow-sm border border-[#D4AF37]/50">
                            {product.badge}
                          </div>
                        )}
                        {product.temperNeeded ? (
                          <div className="px-2.5 py-0.5 rounded-full bg-[#381305]/90 text-[#FAD674] text-[9px] font-semibold uppercase tracking-wider backdrop-blur-md border border-[#C59B27]/30">
                            Couverture
                          </div>
                        ) : (
                          <div className="px-2.5 py-0.5 rounded-full bg-emerald-800/90 text-white text-[9px] font-semibold uppercase tracking-wider backdrop-blur-md">
                            Non-Temper
                          </div>
                        )}
                      </div>

                      {/* Fluidity Drops */}
                      {product.fluidity && (
                        <div className="absolute bottom-3 right-4 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] text-[#381305] flex items-center gap-1.5 border border-[#381305]/10 shadow-sm">
                          <Droplets className="w-3 h-3 text-[#C59B27]" />
                          <span className="font-mono text-[11px] font-bold">
                            Fluidity {product.fluidity}/5
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-6 sm:p-7">
                      <div className="flex items-center justify-between text-[11px] text-[#8C4724] uppercase tracking-[0.2em] mb-2 font-mono font-semibold">
                        <span>{product.categoryLabel}</span>
                        <span>{product.packSize}</span>
                      </div>

                      <h3 className="font-serif text-2xl font-bold text-[#2A0E04] group-hover:text-[#8C4724] transition-colors leading-snug">
                        {product.name}
                      </h3>

                      <p className="mt-2.5 text-xs sm:text-sm text-[#2A0E04]/75 line-clamp-2 leading-relaxed font-light">
                        {product.description}
                      </p>

                      {/* Technical Profile Strip */}
                      <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap gap-2 text-[11px]">
                        {product.cocoaContent && (
                          <span className="font-mono text-[#381305] bg-[#FAF8F5] px-2.5 py-0.5 rounded-full border border-[#381305]/10">
                            {product.cocoaContent}
                          </span>
                        )}
                        {product.bakeStable && (
                          <span className="text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-medium">
                            <Flame className="w-2.5 h-2.5 text-emerald-600" />
                            Oven-Proof
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer with WhatsApp & Sample Bag */}
                  <div className="p-6 sm:p-7 pt-0 flex items-center gap-2.5">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setActiveModalProduct(product)}
                      className="flex-1 py-3 px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#381305] hover:text-[#C59B27] bg-[#FAF8F5] hover:bg-white border border-[#381305]/15 rounded-full transition-colors text-center cursor-pointer"
                    >
                      Dossier
                    </motion.button>

                    <motion.a
                      href={`https://wa.me/919098229454?text=${cardWaMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.94 }}
                      className="p-3 text-emerald-700 bg-emerald-50 hover:bg-emerald-600 hover:text-white border border-emerald-200 rounded-full transition-colors cursor-pointer"
                      title="Inquire on WhatsApp"
                      aria-label={`Inquire about ${product.name} on WhatsApp`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </motion.a>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => onRequestSample(product)}
                      className={`py-3 px-4 text-[11px] font-bold uppercase tracking-[0.16em] rounded-full flex items-center gap-1.5 cursor-pointer relative overflow-hidden group ${
                        isRequested
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gradient-to-r from-[#FAD674] via-[#E6C280] to-[#C59B27] text-[#140602] shadow-md'
                      }`}
                      title={isRequested ? 'Sample added' : 'Add sample to tasting bag'}
                    >
                      <div className="absolute inset-0 w-1/2 h-full bg-white/30 transform -skew-x-12 animate-shimmer pointer-events-none" />
                      {isRequested ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>In Bag</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Sample</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Industrial Atelier Concierge Strip with Motion */}
        <MotionReveal delay={0.2} className="mt-16 p-8 sm:p-12 rounded-3xl bg-white border border-[#381305]/15 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center md:text-left">
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#8C4724] block mb-2 font-mono">
              Industrial B2B Supply · Tanker Dispatch · Private Label
            </span>
            <h4 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A0E04]">
              Custom Tonnage Formulations & Bulk Cartons
            </h4>
            <p className="mt-3 text-xs sm:text-sm text-[#2A0E04]/70 font-light leading-relaxed">
              We engineer custom melting curves, cocoa percentages, and bulk palletized orders in 10kg master cartons or liquid tankers for industrial bakeries and dessert manufacturers.
            </p>
          </div>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="shrink-0 px-8 py-4 rounded-full bg-gradient-to-r from-[#FAD674] to-[#C59B27] text-[#140602] text-xs font-bold uppercase tracking-[0.2em] shadow-lg hover:brightness-105 cursor-pointer"
          >
            Connect With Plant Head
          </motion.a>
        </MotionReveal>

      </div>

      {/* Product Quick View Modal */}
      {activeModalProduct && (
        <ProductQuickViewModal
          product={activeModalProduct}
          onClose={() => setActiveModalProduct(null)}
          onRequestSample={onRequestSample}
        />
      )}
    </section>
  );
};
