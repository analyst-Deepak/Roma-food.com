import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Plus,
  ArrowRight,
  Droplets,
  Cake,
  Sparkles,
  Layers,
  Cookie,
  Heart,
  Flame,
  Wine,
  Repeat,
  Utensils,
  IceCream,
  Check,
  MessageCircle,
} from 'lucide-react';

interface Gr8rMenuProps {
  onSelectItem: (item: any) => void;
}

export interface ProductVariant {
  name: string;
  code: string;
}

export interface ApplicationItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface CategoryRange {
  id: string;
  name: string;
  cardImage: string;
  bannerImage: string;
  subtitle: string;
  variants: ProductVariant[];
  packSizes: string;
  applications: ApplicationItem[];
}

export const CATEGORY_RANGES: CategoryRange[] = [
  {
    id: 'compounds',
    name: 'COMPOUNDS',
    cardImage: '/assets/chocolate/romas_slab_cutout.png',
    bannerImage: '/assets/chocolate/romas_slab_cutout.png',
    subtitle: 'Effortless melting, enrobing, and mirror gloss for master patisserie.',
    packSizes: 'Pack sizes of 0.5 kg X 20 / 10kg / 25kg',
    variants: [
      { name: 'Dark Compound', code: 'CO-D15' },
      { name: 'Dark Compound Premium', code: 'CO-D16' },
      { name: 'Dark Compound Super', code: 'CO-D17' },
      { name: 'Dark Compound - No Added Sugar', code: 'CO-D15NS' },
      { name: 'Milk Compound', code: 'CO-M20' },
      { name: 'Milk Compound Premium', code: 'CO-M24' },
      { name: 'White Compound', code: 'CO-W33' },
      { name: 'White Compound Caramel', code: 'CO-WC9010' },
      { name: '2M Dark Chocolate Drops (Compound)', code: 'DR-2MD' },
      { name: '2M White Chocolate Drops (Compound)', code: 'DR-2MW' },
      { name: 'Chocolate Paste (Compound)', code: 'PA-D12' },
      { name: 'Ice Cream Dip', code: 'IC-D20' },
    ],
    applications: [
      { label: 'Bakery', icon: Cake },
      { label: 'Glazing / Coating', icon: Droplets },
      { label: 'Enrobing', icon: Layers },
      { label: 'Moulding', icon: Sparkles },
      { label: 'Decorations / Toppings', icon: Heart },
      { label: 'Flavouring / Mixing', icon: Utensils },
    ],
  },
  {
    id: 'couvertures',
    name: 'CHOCOLATE & COUVERTURES',
    cardImage: '/assets/categories/clean/card_couverture.jpg',
    bannerImage: '/assets/categories/clean/banner_couverture.jpg',
    subtitle: 'Pure cocoa butter real chocolate crafted for exquisite snaps, ganache, and bonbons.',
    packSizes: 'Pack sizes of 0.5 kg X 20 / 1kg / 10kg Slabs & Callets',
    variants: [
      { name: '45% Dark Couverture', code: 'CH-D45' },
      { name: '48% Dark Couverture', code: 'CH-D48' },
      { name: '50% Classic Dark Couverture', code: 'CH-D50' },
      { name: '55% Signature Dark Couverture', code: 'CH-D55' },
      { name: '70% Intense Single Origin Dark Couverture', code: 'CH-D70' },
      { name: 'Dark Chocolate - No Added Sugar', code: 'CH-D45NS' },
      { name: 'Pure Milk Couverture 30%', code: 'CH-M30' },
      { name: 'Pure Milk Couverture 34%', code: 'CH-M34' },
      { name: 'Pure White Couverture 28%', code: 'CH-W28' },
      { name: 'Pure White Couverture 32%', code: 'CH-W32' },
      { name: 'Real Chocolate Drops 2M / 4M', code: 'CH-DR2M' },
    ],
    applications: [
      { label: 'Moulding & Bonbons', icon: Sparkles },
      { label: 'Ganache & Truffles', icon: Wine },
      { label: 'Bakery', icon: Cake },
      { label: 'Glazing / Coating', icon: Droplets },
      { label: 'Mousses', icon: Layers },
      { label: 'Decorations / Toppings', icon: Heart },
    ],
  },
  {
    id: 'cocoa-products',
    name: 'COCOA PRODUCTS',
    cardImage: '/assets/categories/clean/card_cocoa.jpg',
    bannerImage: '/assets/categories/clean/banner_cocoa.jpg',
    subtitle: 'Classic or experimental - unlock a world of flavours with our premium cocoa products.',
    packSizes: 'Pack sizes of 25kg & 12 / 250gm',
    variants: [
      { name: 'Cocoa Mass Natural', code: 'CM-N' },
      { name: 'Cocoa Mass Alkalised', code: 'CM-A' },
      { name: 'Deodorised Cocoa Butter', code: 'CB-D' },
      { name: 'Underodorised Cocoa Butter', code: 'CB-N' },
      { name: 'Cocoa Nibs', code: 'CN-N' },
      { name: 'Cocoa Powder ALF', code: 'CP 1000' },
      { name: 'Cocoa Powder ALF', code: 'CP 2010' },
      { name: 'Cocoa Powder ALF', code: 'CP 3010' },
      { name: 'Cocoa Powder ALF', code: 'CP 4010' },
      { name: 'Cocoa Powder ALF', code: 'CP P905' },
      { name: 'Drinking Chocolate', code: 'DC-T2' },
      { name: 'Chocolate Sauce Powder', code: 'CS-P' },
    ],
    applications: [
      { label: 'Bakery', icon: Cake },
      { label: 'Glazing / Coating', icon: Droplets },
      { label: 'Flavouring / Mixing', icon: Utensils },
      { label: 'Inclusion', icon: Cookie },
      { label: 'Decorations / Toppings', icon: Heart },
    ],
  },
  {
    id: 'fillings',
    name: 'FILLINGS',
    cardImage: '/assets/categories/Fillings.jpeg',
    bannerImage: '/assets/images/chocolate_experience_flow_1793259578526.jpg',
    subtitle: 'Explore burst of flavour - from simple to sublime.',
    packSizes: 'Pack sizes of 10kg & 4',
    variants: [
      { name: 'Dark', code: 'FIL-D10' },
      { name: 'Milk', code: 'FIL-M20' },
      { name: 'White', code: 'FIL-W27' },
      { name: 'Choco Hazelnut', code: 'FIL-VF5' },
      { name: 'Caramel', code: 'FIL-C16' },
      { name: 'Butterscotch', code: 'FIL-B20' },
      { name: 'Coffee', code: 'FIL-CF8' },
      { name: 'Coconut Flavoured', code: 'FIL-VFLC50' },
      { name: 'Mango Flavoured', code: 'FIL-VFL-20' },
      { name: 'Strawberry Flavoured', code: 'FIL-VFLSB50' },
      { name: 'Raspberry Flavoured', code: 'FIL-VFL-RAG' },
      { name: 'Orange', code: 'FIL-OFCF40' },
      { name: 'Almond', code: 'FIL-AM-100' },
      { name: 'Cashew', code: 'FIL-CA0-100' },
      { name: 'Marzipan Almond', code: 'RM-MA1' },
      { name: 'Marzipan Cashew', code: 'RM-CAS' },
    ],
    applications: [
      { label: 'Ice-cream', icon: IceCream },
      { label: 'Donuts', icon: Repeat },
      { label: 'Spreads', icon: Layers },
      { label: 'Mousses', icon: Wine },
      { label: 'Cookies / Macarons', icon: Cookie },
      { label: 'Panning', icon: Sparkles },
    ],
  },
  {
    id: 'coated',
    name: 'COATED',
    cardImage: '/assets/categories/Coated.jpg',
    bannerImage: '/assets/categories/Coated.jpg',
    subtitle: 'Your snacks are now glazed to perfection.',
    packSizes: 'Pack sizes of 0.5 kg X 20',
    variants: [
      { name: 'Chocolate Coated Almonds', code: 'CDF-AL' },
      { name: 'Chocolate Coated Cashews', code: 'CDF-CA' },
      { name: 'Chocolate Coated Raisins', code: 'CDF-RA' },
      { name: 'Chocolate Coated Butterscotch', code: 'CDF-BS' },
      { name: 'Chocolate Coated Crispies', code: 'CDF-CR' },
      { name: 'Chocolate Coated Cranberries - Red', code: 'CDF-CBR25' },
      { name: 'Chocolate Coated Black Currant - White', code: 'CDF-BCW25' },
      { name: 'Chocolate Coated Coffee Beans - Milk', code: 'CDF-CRM25' },
      { name: 'Chocolate Coated Pista - Green', code: 'CDF-PSG25' },
      { name: 'Chocolate Coated Hazelnut - Dark', code: 'CDF-HKD55' },
      { name: 'Chocolate Coated Hazelnut - Milk', code: 'CDF-HKM28' },
    ],
    applications: [
      { label: 'Decorations / Toppings', icon: Heart },
      { label: 'Bakery', icon: Cake },
      { label: 'Gifting & Snacking', icon: Sparkles },
      { label: 'Plated Desserts', icon: Wine },
      { label: 'Inclusion', icon: Cookie },
    ],
  },
  {
    id: 'decorations',
    name: 'DECORATIONS & INCLUSIONS',
    cardImage: '/assets/categories/clean/card_decorations.jpg',
    bannerImage: '/assets/categories/clean/banner_decorations.jpg',
    subtitle: 'Add crunch, vibrant shine, and visual elegance to all your confectionery creations.',
    packSizes: 'Pack sizes of 1 kg X 10 / 500g Pouches',
    variants: [
      { name: 'Bake-Stable Dark Choco Chips', code: 'CHIP-D' },
      { name: 'Bake-Stable Milk Choco Chips', code: 'CHIP-M' },
      { name: 'Bake-Stable White Choco Chips', code: 'CHIP-W' },
      { name: 'Micro Dark Chocolate Drops', code: 'DR-MD' },
      { name: 'Chocolate Vermicelli / Strands', code: 'ST-D' },
      { name: 'Coloured Chocolate Vermicelli', code: 'ST-MF' },
      { name: 'Chocolate Curls & Shavings', code: 'CL-D' },
      { name: 'White Chocolate Curls', code: 'CL-W' },
      { name: 'Butterscotch Crunches', code: 'BS-188' },
      { name: 'Butterscotch Sprinkles', code: 'BS-25S' },
      { name: 'Coloured Crispies', code: 'CDF-MF' },
    ],
    applications: [
      { label: 'Bakery', icon: Cake },
      { label: 'Decorations / Toppings', icon: Heart },
      { label: 'Ice-cream', icon: IceCream },
      { label: 'Cookies / Cupcakes', icon: Cookie },
      { label: 'Mousses', icon: Layers },
    ],
  },
];

export const Gr8rMenu: React.FC<Gr8rMenuProps> = ({ onSelectItem }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryRange | null>(null);
  const [addedVariants, setAddedVariants] = useState<Record<string, boolean>>({});

  const handleRequestVariant = (variant: ProductVariant, category: CategoryRange) => {
    setAddedVariants((prev) => ({ ...prev, [variant.code]: true }));
    onSelectItem({
      id: variant.code,
      name: `${variant.name} (${variant.code})`,
      category: category.id,
      packSize: category.packSizes,
      price: 'Trade Inquiry',
      image: category.cardImage,
    });
    setTimeout(() => {
      setAddedVariants((prev) => ({ ...prev, [variant.code]: false }));
    }, 2000);
  };

  const handleWhatsAppInquiry = (category: CategoryRange) => {
    const text = encodeURIComponent(
      `Hello ROMAS Chocolates! I am interested in trade pricing and specifications for your *${category.name}* range.\nPack Size: ${category.packSizes}\nPlease share the catalog.`
    );
    window.open(`https://wa.me/919098229454?text=${text}`, '_blank');
  };

  return (
    <section
      id="menu"
      className="py-20 sm:py-32 text-[#381A0E] select-none relative"
      style={{ backgroundColor: '#edecea' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header — premium staggered motion reveal */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ staggerChildren: 0.12, delayChildren: 0.05 }}
        >
          <motion.span
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs font-black tracking-[0.3em] uppercase text-[#8C4724] block mb-3"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            OUR SELECTION
          </motion.span>

          <motion.h2
            variants={{ hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-[#381A0E] leading-[0.92]"
            style={{ fontFamily: "'Cabin Condensed', 'Bayon', Impact, sans-serif" }}
          >
            OUR PRODUCT
            <br />
            RANGE
          </motion.h2>

          {/* Premium gold divider that draws in */}
          <motion.div
            variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1 } }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-6 h-[3px] w-24 origin-center rounded-full bg-gradient-to-r from-transparent via-[#C8912B] to-transparent"
            aria-hidden="true"
          />

          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 text-xs sm:text-sm text-[#381A0E]/70 max-w-xl mx-auto font-light leading-relaxed"
          >
            Crafted for master patisseries, chocolatiers, and fine bakeries. Tap any category to inspect available variants, packaging formats, and applications.
          </motion.p>
        </motion.div>

        {/* 6 Category Cards matching Morde style with red corner accents */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }}
        >
          {CATEGORY_RANGES.map((cat) => (
            <motion.div
              key={cat.id}
              variants={{
                hidden: { opacity: 0, y: 48, scale: 0.94 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedCategory(cat)}
              className="group relative aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 bg-[#2A0E04]"
            >
              {/* Signature Red Top-Left Accent Line */}
              <div
                className="absolute top-4 left-0 w-1.5 h-16 sm:h-20 bg-[#D11218] rounded-r-md z-20 pointer-events-none transition-all duration-300 group-hover:h-24 shadow-sm"
                aria-hidden="true"
              />

              {/* Signature Red Bottom-Right Accent Line */}
              <div
                className="absolute bottom-4 right-0 w-1.5 h-16 sm:h-20 bg-[#D11218] rounded-l-md z-20 pointer-events-none transition-all duration-300 group-hover:h-24 shadow-sm"
                aria-hidden="true"
              />

              {/* Product Background Image */}
              <img
                src={cat.cardImage}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                loading="lazy"
              />

              {/* Gradient Vignette Wash (stronger at bottom for crisp title readability) */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 pointer-events-none transition-opacity duration-300 group-hover:from-black/90"
                aria-hidden="true"
              />

              {/* Bottom Centered Title in Luxury Gold */}
              <div className="absolute bottom-6 inset-x-0 text-center px-6 z-10 pointer-events-none">
                <h3
                  className="text-xl sm:text-2xl font-bold uppercase tracking-[0.14em] text-[#FEE8B4] group-hover:text-[#F9BD03] transition-colors drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                  style={{ fontFamily: "'Cabin Condensed', 'Bayon', Impact, sans-serif" }}
                >
                  {cat.name}
                </h3>

                {/* Subtle Interactive Tap Hint */}
                <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest text-[#FEE8B4]/85 border border-[#FEE8B4]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>View Details & Specs</span>
                  <ArrowRight className="w-3 h-3 text-[#F9BD03]" />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Explore Full Trade Catalog CTA */}
        <div className="mt-16 text-center">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-9 py-4 rounded-full bg-[#381A0E] hover:bg-[#F9BD03] text-[#FEE8B4] hover:text-[#1C0E07] text-xs font-black uppercase tracking-wider transition-colors shadow-lg cursor-pointer border border-[#F9BD03]/30"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span>DOWNLOAD B2B TRADE CATALOG</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </div>

      {/* =========================================================================
          RICH PRODUCT SPECIFICATION MODAL (EXACTLY MATCHING MORDE POPUP DESIGN)
          ========================================================================= */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 34 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26, mass: 0.9 }}
              className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#FAF8F5] rounded-3xl overflow-hidden shadow-2xl border border-[#381A0E]/15 text-[#2A0E04]"
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedCategory.name} details and variants`}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCategory(null)}
                className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors cursor-pointer shadow-md"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Scrollable Container — premium staggered reveal */}
              <motion.div
                className="overflow-y-auto flex-1 scrollbar-thin"
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.18 } } }}
              >
                {/* 1. Header Banner */}
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
                  className="relative h-44 sm:h-60 w-full overflow-hidden bg-[#2A0E04]"
                >
                  <motion.img
                    src={selectedCategory.bannerImage}
                    alt={selectedCategory.name}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.18 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/30 flex items-center justify-center px-6 text-center">
                    <motion.h2
                      className="text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-widest text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
                      style={{ fontFamily: "'Cabin Condensed', 'Bayon', Impact, sans-serif" }}
                      initial={{ opacity: 0, y: 16, scale: 0.94 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {selectedCategory.name}
                    </motion.h2>
                  </div>
                </motion.div>

                {/* 2. Subtitle Strip */}
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } } }}
                  className="bg-[#FAF7F2] py-3 px-6 text-center border-b border-[#381A0E]/10"
                >
                  <p className="text-xs sm:text-sm text-[#381A0E]/80 italic font-serif">
                    {selectedCategory.subtitle}
                  </p>
                </motion.div>

                {/* 3. Two-Column Table Layout */}
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } }}
                  className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5"
                >
                  {/* Left Column: Product Details */}
                  <div className="flex flex-col rounded-xl overflow-hidden border border-[#E2C192]/60 bg-white shadow-sm">
                    {/* Header bar */}
                    <div className="bg-[#E2C192] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#2A0E04]">
                      Product Details
                    </div>

                    {/* Table content */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-[11px] font-bold text-[#8C4724] uppercase tracking-wider mb-2.5">
                          Available Variants
                        </div>

                        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                          {selectedCategory.variants.map((v) => (
                            <div
                              key={v.code}
                              className="flex items-center justify-between gap-3 py-1.5 px-2 rounded-lg hover:bg-[#FAF8F5] transition-colors border-b border-gray-100 last:border-0"
                            >
                              <span className="text-xs sm:text-sm font-medium text-[#2A0E04]">
                                {v.name}
                              </span>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="text-xs sm:text-sm font-bold text-[#D11218] font-mono">
                                  {v.code}
                                </span>
                                <button
                                  onClick={() => handleRequestVariant(v, selectedCategory)}
                                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                                    addedVariants[v.code]
                                      ? 'bg-emerald-600 text-white'
                                      : 'bg-[#381A0E] hover:bg-[#F9BD03] text-[#FEE8B4] hover:text-[#1C0E07]'
                                  }`}
                                  title={`Request sample for ${v.name}`}
                                >
                                  {addedVariants[v.code] ? (
                                    <Check className="w-3.5 h-3.5" />
                                  ) : (
                                    <Plus className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pack Sizes */}
                      <div className="mt-5 pt-3 border-t border-gray-200">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                          Pack Sizes
                        </div>
                        <div className="text-xs text-amber-800 font-semibold font-mono">
                          {selectedCategory.packSizes}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Applications */}
                  <div className="flex flex-col rounded-xl overflow-hidden border border-[#E2C192]/60 bg-white shadow-sm">
                    {/* Header bar */}
                    <div className="bg-[#E2C192] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#2A0E04] text-right">
                      Applications
                    </div>

                    {/* Applications List */}
                    <div className="p-4 flex-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {selectedCategory.applications.map((app, i) => {
                          const IconComp = app.icon;
                          return (
                            <div
                              key={i}
                              className="flex items-center gap-3 p-2.5 rounded-xl bg-[#FAF8F5] border border-gray-100 hover:border-[#D11218]/30 transition-colors"
                            >
                              <div className="w-8 h-8 rounded-lg bg-[#D11218]/10 text-[#D11218] flex items-center justify-center shrink-0">
                                <IconComp className="w-4 h-4" />
                              </div>
                              <span className="text-xs font-semibold text-[#2A0E04]">
                                {app.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Commercial Grade Note */}
                      <div className="mt-6 p-3 rounded-xl bg-amber-50/70 border border-amber-200/50 text-[11px] text-amber-900 leading-relaxed font-light">
                        <span className="font-bold">Master Chocolatier Assurance:</span> All items formulated under strict temperature and micro-refinement protocols at our Kurod works, Dhamtari.
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* 4. Action Footer */}
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
                  className="p-4 sm:p-6 bg-[#FAF7F2] border-t border-[#381A0E]/10 flex flex-col sm:flex-row items-center justify-between gap-3"
                >
                  <div className="text-xs text-[#381A0E]/70 text-center sm:text-left">
                    Commercial inquiries, bulk pallet orders & custom formulations available.
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => handleWhatsAppInquiry(selectedCategory)}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Inquiry</span>
                    </button>

                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="px-5 py-2.5 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
