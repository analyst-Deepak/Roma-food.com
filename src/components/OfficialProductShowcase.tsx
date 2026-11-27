import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RotateCcw,
  Sparkles,
  Maximize2,
  X,
  MessageCircle,
  PackageCheck,
} from 'lucide-react';
import {
  OFFICIAL_PRODUCTS,
  OfficialProduct,
  OfficialProductVariant,
} from '../data/officialProducts';

interface OfficialProductShowcaseProps {
  onSelectItem?: (item: any) => void;
}

export const OfficialProductShowcase: React.FC<OfficialProductShowcaseProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeVariants, setActiveVariants] = useState<Record<string, string>>({
    slabs: 'dark',
    choco_chips: 'milk',
    buttons: 'dark',
    paste: 'dark',
    butterscotch: 'classic',
    tutti_frutti: 'multi',
  });
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [inspectModal, setInspectModal] = useState<{
    product: OfficialProduct;
    variant: OfficialProductVariant;
    isBack: boolean;
  } | null>(null);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'slabs', label: 'Compound Slab' },
    { id: 'choco_chips', label: 'Choco Chips' },
    { id: 'buttons', label: 'Buttons (Coins)' },
    { id: 'paste', label: 'Choco Paste' },
    { id: 'butterscotch', label: 'Butterscotch' },
    { id: 'tutti_frutti', label: 'Tutti Frutti' },
  ];

  const filteredProducts =
    selectedCategory === 'all'
      ? OFFICIAL_PRODUCTS
      : OFFICIAL_PRODUCTS.filter((p) => p.category === selectedCategory);

  const handleToggleFlip = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlippedCards((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

  const handleSelectVariant = (productId: string, variantId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveVariants((prev) => ({ ...prev, [productId]: variantId }));
  };

  const handleWhatsAppInquiry = (product: OfficialProduct, variant: OfficialProductVariant) => {
    const text = encodeURIComponent(
      `Hello ROMAS Chocolates! I am interested in wholesale inquiry for:
*${product.name}* (${variant.label} Variant)
Pack Size: ${product.packSize}
Please share wholesale rate & sample dispatch details.`
    );
    window.open(`https://wa.me/919098229454?text=${text}`, '_blank');
  };

  return (
    <section id="products-showcase" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#2A140A] via-[#1C0E07] to-[#2A140A] text-[#FEE8B4] overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#F9BD03]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F9BD03]/10 border border-[#F9BD03]/30 text-[#F9BD03] text-xs font-black tracking-widest uppercase mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Official Packaging Motion Showcase
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#FEE8B4] drop-shadow-sm mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Authentic ROMAS Products
          </h2>
          <p className="text-sm sm:text-base text-[#EADBCC]/80 font-sans leading-relaxed">
            Experience our master patisserie & industrial ranges with interactive motion, front & back packaging inspection, and multi-flavour variants.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer select-none ${
                    isActive
                      ? 'text-[#1C0E07] shadow-[0_4px_16px_rgba(249,189,3,0.35)]'
                      : 'text-[#EADBCC] hover:text-[#F9BD03] bg-[#381A0E]/60 border border-[#FEE8B4]/10 hover:border-[#F9BD03]/40'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-[#F9BD03] rounded-full z-0"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              const activeVariantId = activeVariants[product.id] || product.variants[0].id;
              const activeVariant =
                product.variants.find((v) => v.id === activeVariantId) || product.variants[0];
              const isFlipped = !!flippedCards[product.id];
              const currentImage = isFlipped ? activeVariant.backImage : activeVariant.frontImage;

              return (
                <ProductCardItem
                  key={product.id}
                  product={product}
                  activeVariant={activeVariant}
                  isFlipped={isFlipped}
                  currentImage={currentImage}
                  onToggleFlip={(e) => handleToggleFlip(product.id, e)}
                  onSelectVariant={(variantId, e) =>
                    handleSelectVariant(product.id, variantId, e)
                  }
                  onInspect={() =>
                    setInspectModal({
                      product,
                      variant: activeVariant,
                      isBack: isFlipped,
                    })
                  }
                  onWhatsApp={() => handleWhatsAppInquiry(product, activeVariant)}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {inspectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-[#1C0E07] border border-[#F9BD03]/30 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row gap-8 items-center"
            >
              <button
                onClick={() => setInspectModal(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#381A0E] text-[#FEE8B4] hover:bg-[#F9BD03] hover:text-[#1C0E07] flex items-center justify-center transition-all cursor-pointer z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full md:w-1/2 aspect-square flex items-center justify-center bg-radial from-[#381A0E] to-[#120804] rounded-2xl p-4 border border-[#FEE8B4]/10 overflow-hidden">
                <img
                  src={inspectModal.isBack ? inspectModal.variant.backImage : inspectModal.variant.frontImage}
                  alt={`${inspectModal.product.name} ${inspectModal.isBack ? 'Back' : 'Front'}`}
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
                />
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/60 text-[10px] font-bold uppercase tracking-wider text-[#F9BD03] backdrop-blur-sm">
                  {inspectModal.isBack ? 'Reverse / Nutrition Side' : 'Front Brand Packaging'}
                </div>
              </div>

              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <span className="text-xs font-black tracking-widest text-[#F9BD03] uppercase">
                  {inspectModal.product.categoryLabel}
                </span>
                <h3
                  className="text-2xl sm:text-3xl font-black text-[#FEE8B4] mt-1 mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {inspectModal.product.name}
                </h3>
                <p className="text-xs font-bold text-[#F9BD03]/90 tracking-wider uppercase mb-3">
                  {inspectModal.variant.label} Variant · {inspectModal.variant.badge}
                </p>
                <p className="text-xs sm:text-sm text-[#EADBCC]/80 font-sans leading-relaxed mb-4">
                  {inspectModal.product.description}
                </p>

                <div className="bg-[#381A0E]/60 border border-[#FEE8B4]/10 rounded-xl p-3.5 mb-5 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-[#EADBCC]">
                    <span className="font-semibold text-[#F9BD03]">Packaging Standard:</span>
                    <span className="font-mono text-right">{inspectModal.product.packSize}</span>
                  </div>
                  <div className="flex items-center justify-between text-[#EADBCC]">
                    <span className="font-semibold text-[#F9BD03]">Applications:</span>
                    <span>{inspectModal.product.applications.join(', ')}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() =>
                      setInspectModal((prev) =>
                        prev ? { ...prev, isBack: !prev.isBack } : null
                      )
                    }
                    className="flex-1 py-3 px-4 rounded-xl bg-[#381A0E] text-[#FEE8B4] hover:bg-[#4E2413] border border-[#FEE8B4]/20 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 text-[#F9BD03]" />
                    Flip to {inspectModal.isBack ? 'Front' : 'Back'}
                  </button>
                  <button
                    onClick={() => {
                      handleWhatsAppInquiry(inspectModal.product, inspectModal.variant);
                      setInspectModal(null);
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] text-[#0B3A1C] hover:bg-[#20BA5A] flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider shadow-lg transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    Inquire on WhatsApp
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

interface ProductCardItemProps {
  product: OfficialProduct;
  activeVariant: OfficialProductVariant;
  isFlipped: boolean;
  currentImage: string;
  onToggleFlip: (e: React.MouseEvent) => void;
  onSelectVariant: (variantId: string, e: React.MouseEvent) => void;
  onInspect: () => void;
  onWhatsApp: () => void;
}

const ProductCardItem: React.FC<ProductCardItemProps> = ({
  product,
  activeVariant,
  isFlipped,
  currentImage,
  onToggleFlip,
  onSelectVariant,
  onInspect,
  onWhatsApp,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 10;
    const rotY = ((x - centerX) / centerX) * 10;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="perspective-1000"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${
            isHovered ? 1.02 : 1
          })`,
          transition: isHovered
            ? 'transform 0.1s ease-out'
            : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="group relative bg-[#23120A] rounded-3xl border border-[#FEE8B4]/15 hover:border-[#F9BD03]/60 shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_50px_rgba(249,189,3,0.15)] transition-shadow duration-300 overflow-hidden flex flex-col justify-between"
      >
        <div className="p-5 pb-0 flex items-center justify-between relative z-20">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#F9BD03] text-[#1C0E07] shadow-xs">
              {product.categoryLabel}
            </span>
            {activeVariant.badge && (
              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#381A0E] text-[#FEE8B4] border border-[#FEE8B4]/20">
                {activeVariant.badge}
              </span>
            )}
          </div>

          <button
            onClick={onToggleFlip}
            title={isFlipped ? 'Show Front Packaging' : 'Show Reverse Side'}
            className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#381A0E]/80 hover:bg-[#F9BD03] text-[#FEE8B4] hover:text-[#1C0E07] border border-[#FEE8B4]/20 transition-all cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{isFlipped ? 'Front' : 'Back'}</span>
          </button>
        </div>

        <div className="relative w-full aspect-square p-6 flex items-center justify-center select-none overflow-hidden">
          <div className="absolute inset-x-8 bottom-4 h-12 bg-[#F9BD03]/10 rounded-full blur-xl transform group-hover:scale-110 transition-transform duration-500" />

          <motion.div
            animate={{
              y: isHovered ? 0 : [-5, 5, -5],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <img
              src={currentImage}
              alt={`${product.name} ${activeVariant.label}`}
              className="max-h-full max-w-full object-contain filter drop-shadow-[0_16px_28px_rgba(0,0,0,0.55)] transition-transform duration-500 group-hover:scale-105"
            />
          </motion.div>

          <button
            onClick={onInspect}
            className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-[#1C0E07]/80 hover:bg-[#F9BD03] text-[#FEE8B4] hover:text-[#1C0E07] border border-[#FEE8B4]/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer shadow-lg z-20"
            title="Inspect Full Packaging"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 pt-0 flex flex-col flex-1 justify-between relative z-20">
          <div>
            <h3
              className="text-lg font-black uppercase text-[#FEE8B4] tracking-tight group-hover:text-[#F9BD03] transition-colors"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {product.name}
            </h3>
            <p className="text-xs text-[#EADBCC]/75 line-clamp-2 mt-1 mb-3">
              {product.description}
            </p>

            <div className="flex items-center gap-1.5 text-[11px] text-[#F9BD03] font-mono bg-[#1C0E07]/70 px-3 py-1.5 rounded-lg border border-[#FEE8B4]/10 mb-3.5">
              <PackageCheck className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{product.packSize}</span>
            </div>

            {product.variants.length > 1 && (
              <div className="mb-4">
                <span className="text-[10px] font-bold text-[#EADBCC]/60 uppercase tracking-wider block mb-1.5">
                  Select Variant:
                </span>
                <div className="flex items-center gap-1.5">
                  {product.variants.map((v) => {
                    const isSelected = activeVariant.id === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={(e) => onSelectVariant(v.id, e)}
                        className={`text-xs font-bold px-3 py-1 rounded-full border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#F9BD03] text-[#1C0E07] border-[#F9BD03] shadow-xs'
                            : 'bg-[#381A0E]/70 text-[#EADBCC] border-[#FEE8B4]/15 hover:border-[#F9BD03]/40'
                        }`}
                      >
                        {v.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-[#FEE8B4]/10 flex items-center gap-2">
            <button
              onClick={onWhatsApp}
              className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-[#0B3A1C] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Wholesale Inquiry</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

