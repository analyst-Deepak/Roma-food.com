import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Plus,
  ArrowRight,
  Droplets,
  Cake,
  Layers,
  Cookie,
  Heart,
  Wine,
  Repeat,
  Utensils,
  IceCream,
  Check,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Maximize2,
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
  cutoutImage: string;
  cardImage: string;
  bannerImage: string;
  subtitle: string;
  tag: string;
  countBadge: string;
  variants: ProductVariant[];
  packSizes: string;
  applications: ApplicationItem[];
}

export const CATEGORY_RANGES: CategoryRange[] = [
  {
    id: 'compounds',
    name: 'COMPOUND SLABS',
    cutoutImage: '/assets/ecommerce/pinterest_dark_slab_55_cutout.png',
    cardImage: '/assets/categories/clean/card_compounds.jpg',
    bannerImage: '/assets/categories/clean/banner_compounds.jpg',
    subtitle: 'Effortless melting, enrobing, and mirror gloss for master patisserie.',
    tag: 'Non-Temper Easy Melt',
    countBadge: '4 Formulations',
    packSizes: '500gm x 20packs',
    variants: [
      { name: 'Dark Compound', code: 'DC15, DC17, DC35' },
      { name: 'Milk Compound', code: 'MEC, MPC' },
      { name: 'White Compound', code: 'WPC' },
      { name: 'Flavoured Compound (Bulk orders)', code: 'Mango, Orange, Strawberry' },
    ],
    applications: [
      { label: 'Assorted Moulded Chocolates', icon: Cookie },
      { label: 'Bakery Products', icon: Cake },
      { label: 'Ice Cream (Coating & Filling)', icon: IceCream },
      { label: 'Moulding', icon: Layers },
      { label: 'Enrobing', icon: Layers },
      { label: 'Glazing / Coating', icon: Droplets },
    ],
  },
  {
    id: 'choco-paste',
    name: 'CHOCO PASTE',
    cutoutImage: '/assets/products_3d_png/fillings_3d.png',
    cardImage: '/assets/categories/clean/card_fillings.jpg',
    bannerImage: '/assets/categories/clean/banner_fillings.jpg',
    subtitle: 'Silky, rich chocolate pastes formulated for ice cream and bakery applications.',
    tag: 'Spreads & Fillings',
    countBadge: '3 Formulations',
    packSizes: '25kg / 20kg / 13kg / 1kg (Dark) · 25kg / 20kg (Milk, White)',
    variants: [
      { name: 'Dark Chocopaste', code: 'DPP, DPPX' },
      { name: 'Milk Chocopaste', code: 'MPP, MPPX' },
      { name: 'White Chocopaste', code: 'WPP' },
    ],
    applications: [
      { label: 'Ice Cream (Coating & Filling)', icon: IceCream },
      { label: 'Bakery (Truffle)', icon: Cake },
      { label: 'Spreads & Fillings', icon: Layers },
      { label: 'Toppings & Ganache', icon: Heart },
      { label: 'Pastries & Viennoiserie', icon: Repeat },
      { label: 'Flavouring / Mixing', icon: Utensils },
    ],
  },
  {
    id: 'chocodip',
    name: 'CHOCODIP',
    cutoutImage: '/assets/products_3d_png/chocodip_3d_cutout.png',
    cardImage: '/assets/categories/clean/card_chocodip.jpg',
    bannerImage: '/assets/categories/clean/banner_chocodip.jpg',
    subtitle: 'Instant crackling shell and mirror coating for artisan ice creams and popsicles.',
    tag: 'Hardening Ice Cream Dip',
    countBadge: '4 Formulations',
    packSizes: '25kg / 13kg',
    variants: [
      { name: 'Dark ChocoDip', code: 'Dark ChocoDip' },
      { name: 'Milk ChocoDip', code: 'Milk ChocoDip' },
      { name: 'White ChocoDip', code: 'White ChocoDip' },
      { name: 'Flavoured ChocoDip (Bulk orders)', code: 'Mango, Orange, Strawberry' },
    ],
    applications: [
      { label: 'Ice Cream (Coating & Dipping)', icon: IceCream },
      { label: 'Popsicles & Cones', icon: IceCream },
      { label: 'Quick Hardening Shells', icon: Droplets },
      { label: 'Artisan Gelato Bars', icon: Cake },
      { label: 'Glazing / Coating', icon: Layers },
      { label: 'Decorations / Drizzle', icon: Heart },
    ],
  },
  {
    id: 'pure-chocolate',
    name: 'PURE CHOCOLATE SLABS (Upcoming)',
    cutoutImage: '/assets/ecommerce/pinterest_milk_couverture_cutout.png',
    cardImage: '/assets/categories/clean/card_couverture.jpg',
    bannerImage: '/assets/categories/clean/banner_couverture.jpg',
    subtitle: 'Authentic pure cocoa butter chocolate slabs with exquisite snap, melt, and shine.',
    tag: 'Pure Cocoa Butter Couverture',
    countBadge: 'Upcoming Range',
    packSizes: '500gm x 20packs',
    variants: [
      { name: 'Dark Chocolate (45%, 55%, 70%)', code: 'Dark Chocolate' },
      { name: 'Milk Chocolate', code: 'Milk Chocolate' },
    ],
    applications: [
      { label: 'Assorted Moulded Chocolates', icon: Cookie },
      { label: 'Ice Cream (Coating & Filling)', icon: IceCream },
      { label: 'Bakery Products', icon: Cake },
      { label: 'Panning & Enrobing Products', icon: Layers },
      { label: 'Ganache & Truffles', icon: Wine },
      { label: 'Decorations / Toppings', icon: Heart },
    ],
  },
  {
    id: 'cocoa-products',
    name: 'COCOA PRODUCTS',
    cutoutImage: '/assets/products_3d_png/cocoa_cutout.png',
    cardImage: '/assets/categories/clean/card_cocoa.jpg',
    bannerImage: '/assets/categories/clean/banner_cocoa.jpg',
    subtitle: 'High-fat aromatic cocoa powders for baking, beverage, and confectionery enrichment.',
    tag: 'Alkalised & Natural',
    countBadge: 'Industrial & Bulk',
    packSizes: '1kg / 10kg / 25kg',
    variants: [
      { name: 'Cocoa Powder', code: '1kg / 25kg' },
      { name: 'Cocoa Powder', code: '1kg / 10kg' },
    ],
    applications: [
      { label: 'Flavoring', icon: Utensils },
      { label: 'Spreading', icon: Layers },
      { label: 'Decoration / Dusting', icon: Heart },
      { label: 'Colouring', icon: Droplets },
      { label: 'Bakery & Pastry', icon: Cake },
      { label: 'Beverages & Milkshakes', icon: Wine },
    ],
  },
];

const DEFAULT_CATEGORY_ID = 'compounds';
const DEFAULT_ACTIVE_INDEX = Math.max(
  0,
  CATEGORY_RANGES.findIndex((cat) => cat.id === DEFAULT_CATEGORY_ID)
);

export const Gr8rMenu: React.FC<Gr8rMenuProps> = ({ onSelectItem }) => {
  const [activeIndex, setActiveIndex] = useState(DEFAULT_ACTIVE_INDEX);
  const [selectedCategory, setSelectedCategory] = useState<CategoryRange | null>(null);
  const [addedVariants, setAddedVariants] = useState<Record<string, boolean>>({});
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [autoplayProgress, setAutoplayProgress] = useState(0);

  const dragStartXRef = useRef(0);
  const isWheelThrottled = useRef(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const total = CATEGORY_RANGES.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
    setAutoplayProgress(0);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
    setAutoplayProgress(0);
  }, [total]);

  // Smooth Horizontal Trackpad / Mouse Wheel Side-Scroll
  const handleWheel = (e: React.WheelEvent) => {
    if (selectedCategory) return;
    const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    const delta = isHorizontal ? e.deltaX : (e.shiftKey ? e.deltaY : 0);

    if (Math.abs(delta) > 16 && !isWheelThrottled.current) {
      isWheelThrottled.current = true;
      if (delta > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setTimeout(() => {
        isWheelThrottled.current = false;
      }, 420);
    }
  };

  // Autoplay with Real-Time Progress Bar & Pause on Hover (Framer Depth Carousel Pro signature)
  useEffect(() => {
    if (isHovered || selectedCategory) return;
    const intervalMs = 50;
    const totalDurationMs = 1800;
    const step = (intervalMs / totalDurationMs) * 100;

    const timer = setInterval(() => {
      setAutoplayProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + step;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isHovered, selectedCategory, nextSlide]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedCategory) return;
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide, selectedCategory]);

  // Lock body scroll when specification modal is open
  useEffect(() => {
    if (selectedCategory) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [selectedCategory]);

  const handleRequestVariant = (variant: ProductVariant, category: CategoryRange) => {
    setAddedVariants((prev) => ({ ...prev, [variant.code]: true }));
    onSelectItem({
      id: variant.code,
      name: `${variant.name} (${variant.code})`,
      category: category.id,
      packSize: category.packSizes,
      price: 'Bulk Inquiry',
      image: category.cardImage,
    });
    setTimeout(() => {
      setAddedVariants((prev) => ({ ...prev, [variant.code]: false }));
    }, 2000);
  };

  const handleWhatsAppInquiry = (category: CategoryRange) => {
    const text = encodeURIComponent(
      `Hello ROMAS Chocolates! I am interested in wholesale pricing and specifications for your *${category.name}* range.
Pack Size: ${category.packSizes}
Please share the catalog.`
    );
    window.open(`https://wa.me/919098229454?text=${text}`, '_blank');
  };

  // Responsive 3D Geometry Calculation (Framer Depth Carousel Pro Spatial Engine)
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const getCardTransform = (diff: number) => {
    // 1. Center Hero Card (Elevated in Sharp Focus)
    if (diff === 0) {
      return {
        x: 0,
        y: 0,
        z: isMobile ? 50 : 100,
        rotateY: 0,
        scale: 1,
        opacity: 1,
        zIndex: 50,
        filter: 'blur(0px) brightness(1)',
        pointerEvents: 'auto' as const,
      };
    }

    const sign = Math.sign(diff);
    const abs = Math.abs(diff);

    // 2. Immediate Neighbors (Diff ±1) - Tilted 3D Wings with Optical Depth
    if (abs === 1) {
      const xOffset = isMobile ? 185 : isTablet ? 280 : 365;
      return {
        x: sign * xOffset,
        y: 0,
        z: isMobile ? -85 : -140,
        rotateY: -sign * (isMobile ? 24 : 34),
        scale: isMobile ? 0.88 : 0.90,
        opacity: isMobile ? 0.65 : 0.86,
        zIndex: 40,
        filter: 'blur(0.8px) brightness(0.86)',
        pointerEvents: 'auto' as const,
      };
    }

    // 3. Distant Cards (Diff ±2) - Deep Background Curves
    if (abs === 2) {
      const xOffset = isMobile ? 260 : isTablet ? 480 : 630;
      return {
        x: sign * xOffset,
        y: 0,
        z: isMobile ? -180 : -280,
        rotateY: -sign * (isMobile ? 36 : 46),
        scale: isMobile ? 0.72 : 0.76,
        opacity: isMobile ? 0 : 0.45,
        zIndex: 30,
        filter: 'blur(2.2px) brightness(0.68)',
        pointerEvents: isMobile ? ('none' as const) : ('auto' as const),
      };
    }

    // 4. Hidden Behind (Diff >= 3)
    return {
      x: sign * (isMobile ? 320 : 760),
      y: 0,
      z: -450,
      rotateY: -sign * 55,
      scale: 0.6,
      opacity: 0,
      zIndex: 10,
      filter: 'blur(4px) brightness(0.5)',
      pointerEvents: 'none' as const,
    };
  };

  const activeCategory = CATEGORY_RANGES[activeIndex];

  return (
    <section
      id="menu"
      className="scroll-mt-24 sm:scroll-mt-28 py-16 sm:py-24 text-[#381A0E] select-none relative overflow-hidden"
      style={{ backgroundColor: '#edecea' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.05 }}
        >
          <motion.span
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs font-black tracking-[0.3em] uppercase text-[#8C4724] block mb-3"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            OUR SELECTION
          </motion.span>

          <motion.h2
            variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-[#381A0E] leading-[0.92]"
            style={{ fontFamily: "'Cabin Condensed', 'Bayon', Impact, sans-serif" }}
          >
            OUR PRODUCT
            <br />
            RANGE
          </motion.h2>

          {/* Luxury gold divider line */}
          <motion.div
            variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1 } }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-5 h-[3px] w-24 origin-center rounded-full bg-gradient-to-r from-transparent via-[#C8912B] to-transparent"
            aria-hidden="true"
          />

          <motion.p
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-xs sm:text-sm text-[#381A0E]/75 max-w-xl mx-auto font-light leading-relaxed"
          >
            Engineered for master chocolatiers, fine patisseries, and culinary institutions across India.
            Swipe or click side cards to navigate through 3D space.
          </motion.p>
        </motion.div>

        {/* =========================================================================
            TRUE 3D UNBOXED PRODUCT SHOWCASE (NO RECTANGULAR CONTAINERS)
            ========================================================================= */}
        <div
          className="relative w-full py-4 select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onWheel={handleWheel}
        >
          {/* 3D Perspective Stage Container */}
          <div
            className="relative w-full h-[400px] sm:h-[480px] lg:h-[540px] flex items-center justify-center overflow-visible"
            style={{
              perspective: 1200,
              perspectiveOrigin: '50% 50%',
            }}
          >
            {/* Ambient Warm Golden Halo Spotlight behind active center 3D product */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[300px] bg-[#F9BD03]/15 rounded-full blur-[120px] pointer-events-none" />

            {/* Gesture Dragging Surface with Preserve-3D & Silky Smooth Physics */}
            <motion.div
              className="relative w-full h-full flex items-center justify-center touch-pan-y cursor-grab active:cursor-grabbing"
              style={{ transformStyle: 'preserve-3d' }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.24}
              onDragStart={(_e, info) => {
                setIsDragging(true);
                dragStartXRef.current = info.point.x;
              }}
              onDragEnd={(_e, info) => {
                setTimeout(() => setIsDragging(false), 60);
                const diffX = info.offset.x;
                const velocityX = info.velocity.x;
                if (diffX > 22 || velocityX > 160) {
                  prevSlide();
                } else if (diffX < -22 || velocityX < -160) {
                  nextSlide();
                }
              }}
            >
              {CATEGORY_RANGES.map((cat, idx) => {
                let diff = (idx - activeIndex) % total;
                if (diff > total / 2) diff -= total;
                if (diff < -total / 2) diff += total;

                const isCurrent = diff === 0;
                const transform = getCardTransform(diff);

                return (
                  <motion.div
                    key={cat.id}
                    animate={transform}
                    transition={{
                      type: 'spring',
                      stiffness: 220,
                      damping: 26,
                      mass: 0.75,
                    }}
                    onClick={() => {
                      if (isDragging) return;
                      if (isCurrent) {
                        setSelectedCategory(cat);
                      } else {
                        setActiveIndex(idx);
                        setAutoplayProgress(0);
                      }
                    }}
                    whileHover={!isCurrent ? { scale: isMobile ? 0.9 : 0.95, opacity: 0.95 } : {}}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center cursor-pointer select-none"
                    style={{
                      transformOrigin: '50% 50%',
                      willChange: 'transform, opacity, filter',
                    }}
                  >
                    {/* Unboxed 3D Floating Product Image (No Rectangular Card Containers) */}
                    <motion.div
                      animate={isCurrent ? { y: [0, -12, 0] } : { y: 0 }}
                      transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                      className="relative flex flex-col items-center justify-center group"
                    >
                      <img
                        src={cat.cutoutImage}
                        alt={cat.name}
                        className={`object-contain pointer-events-none transition-transform duration-500 group-hover:scale-105 ${
                          isCurrent
                            ? 'w-[280px] sm:w-[350px] lg:w-[420px] max-h-[300px] sm:max-h-[380px] lg:max-h-[440px] drop-shadow-[0_30px_35px_rgba(40,15,5,0.45)]'
                            : 'w-[200px] sm:w-[250px] lg:w-[300px] max-h-[220px] sm:max-h-[280px] lg:max-h-[330px] drop-shadow-[0_20px_25px_rgba(0,0,0,0.3)]'
                        }`}
                        loading="lazy"
                        draggable={false}
                      />

                      {/* Realistic Soft Elliptical Ground Shadow */}
                      <div
                        className={`mt-4 w-44 sm:w-60 h-6 rounded-[100%] bg-black/25 blur-md pointer-events-none transition-all duration-500 ${
                          isCurrent ? 'opacity-80 scale-100' : 'opacity-40 scale-75'
                        }`}
                      />

                      {/* Category Label directly beneath the product image for every card, including the active one */}
                      <span
                        className={
                          isCurrent
                            ? 'mt-4 text-sm sm:text-base font-black uppercase tracking-widest text-gr8r-brown'
                            : 'mt-3 text-[11px] font-bold uppercase tracking-widest text-gr8r-brown/60 group-hover:text-gr8r-brown transition-colors'
                        }
                      >
                        {cat.name}
                      </span>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Left and Right Navigation Buttons (Floating Glassmorphism) */}
            <div className="absolute inset-x-2 sm:inset-x-6 lg:inset-x-8 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none z-50">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                aria-label="Previous category"
                className="pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/80 hover:bg-[#F9BD03] text-[#1C0E07] shadow-xl backdrop-blur-xl border border-white/60 hover:border-[#F9BD03] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group"
              >
                <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                aria-label="Next category"
                className="pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/80 hover:bg-[#F9BD03] text-[#1C0E07] shadow-xl backdrop-blur-xl border border-white/60 hover:border-[#F9BD03] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group"
              >
                <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>

          {/* =========================================================================
              BOTTOM CONTROL DECK (PROGRESS BAR CAPSULES + MONOSPACE COUNTER)
              ========================================================================= */}
          <div className="flex flex-col items-center justify-center mt-4 sm:mt-6 gap-3.5">
            {/* Segmented Dots with Animated Active Fill Capsule */}
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#381A0E]/8 backdrop-blur-md border border-[#381A0E]/12 shadow-inner">
              {CATEGORY_RANGES.map((cat, i) => {
                const isActive = activeIndex === i;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveIndex(i);
                      setAutoplayProgress(0);
                    }}
                    aria-label={`Go to ${cat.name}`}
                    className={`relative overflow-hidden transition-all duration-300 rounded-full cursor-pointer ${
                      isActive
                        ? 'w-10 sm:w-12 h-2.5 bg-[#381A0E]/20'
                        : 'w-2.5 h-2.5 bg-[#381A0E]/25 hover:bg-[#381A0E]/50'
                    }`}
                  >
                    {isActive && (
                      <div
                        className="h-full bg-[#381A0E] rounded-full transition-all duration-75"
                        style={{ width: `${autoplayProgress}%` }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Counter & Hint */}
            <div className="flex items-center gap-2 text-xs tracking-widest uppercase font-mono text-[#8C4724]">
              <span className="font-bold text-[#381A0E] text-sm font-mono">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-[#8C4724]/40 font-mono">/</span>
              <span className="text-[#8C4724]/70 font-mono">
                {String(total).padStart(2, '0')}
              </span>
              <span className="text-[10px] tracking-normal font-sans text-[#381A0E]/50 ml-2 hidden sm:inline">
                • Drag horizontally or click side products to rotate
              </span>
            </div>
          </div>

          {/* =========================================================================
              ACTIVE CATEGORY SPOTLIGHT PANEL (UNBOXED CLEAN PRESENTATION)
              ========================================================================= */}
          <motion.div
            key={activeCategory.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mx-auto mt-6 text-center px-4"
          >
            {/* Badges */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="px-3.5 py-1 rounded-full bg-white border border-[#381A0E]/15 shadow-sm text-[10px] font-bold uppercase tracking-wider text-[#8C4724] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27] animate-pulse" />
                <span>{activeCategory.tag}</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-white border border-[#381A0E]/15 shadow-sm text-[10px] font-semibold text-[#381A0E]/80 font-mono">
                {activeCategory.countBadge}
              </span>
            </div>

            {/* Main Category Title */}
            <h3
              className="text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#381A0E] leading-none mb-3"
              style={{ fontFamily: "'Cabin Condensed', 'Bayon', Impact, sans-serif" }}
            >
              {activeCategory.name}
            </h3>

            <p className="text-xs sm:text-sm text-[#381A0E]/80 font-light leading-relaxed max-w-lg mx-auto mb-6">
              {activeCategory.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setSelectedCategory(activeCategory)}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#381A0E] hover:bg-[#8C4724] text-[#FEE8B4] text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-103 cursor-pointer"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <Maximize2 className="w-4 h-4 text-[#F9BD03]" />
                <span>Inspect Specifications & Formulations</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleWhatsAppInquiry(activeCategory)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Inquiry</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Explore Full Product Catalog CTA */}
        <div className="mt-12 sm:mt-14 text-center">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#381A0E] hover:bg-[#F9BD03] text-[#FEE8B4] hover:text-[#1C0E07] text-xs font-black uppercase tracking-wider transition-colors shadow-lg cursor-pointer border border-[#F9BD03]/30"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span>DOWNLOAD B2B PRODUCT CATALOG</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </div>

      {/* =========================================================================
          RICH PRODUCT SPECIFICATION MODAL (FIXED FRAME - ONLY VARIANTS TABLE SCROLLS)
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
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: 'spring', stiffness: 280, damping: 28, mass: 0.85 }}
              className="relative w-full max-w-4xl h-[92vh] max-h-[760px] flex flex-col bg-[#FAF8F5] rounded-3xl overflow-hidden shadow-2xl border border-[#381A0E]/15 text-[#2A0E04]"
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedCategory.name} details and variants`}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCategory(null)}
                className="absolute top-3.5 right-3.5 z-30 p-2 rounded-full bg-black/55 hover:bg-black/85 text-white transition-colors cursor-pointer shadow-md"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* 1. Header Banner (Fixed, never scrolls) */}
              <div className="relative h-36 sm:h-44 w-full overflow-hidden bg-[#2A0E04] shrink-0">
                <motion.img
                  src={selectedCategory.bannerImage}
                  alt={selectedCategory.name}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30 flex items-center justify-center px-6 text-center">
                  <motion.h2
                    className="text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-widest text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
                    style={{ fontFamily: "'Cabin Condensed', 'Bayon', Impact, sans-serif" }}
                    initial={{ opacity: 0, y: 14, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {selectedCategory.name}
                  </motion.h2>
                </div>
              </div>

              {/* 2. Subtitle Strip (Fixed, never scrolls) */}
              <div className="bg-[#FAF7F2] py-2 px-6 text-center border-b border-[#381A0E]/10 shrink-0">
                <p className="text-xs sm:text-sm text-[#381A0E]/80 italic font-serif">
                  {selectedCategory.subtitle}
                </p>
              </div>

              {/* 3. Two-Column Table Layout (Flex contained - only tables scroll) */}
              <div className="p-3.5 sm:p-5 flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
                {/* Left Column: Product Details (ONLY THIS TABLE SCROLLS) */}
                <div className="flex flex-col rounded-xl overflow-hidden border border-[#E2C192]/60 bg-white shadow-sm h-full min-h-0">
                  {/* Header bar */}
                  <div className="bg-[#E2C192] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#2A0E04] shrink-0">
                    Product Details
                  </div>

                  {/* Table Content Container */}
                  <div className="p-3.5 flex-1 min-h-0 flex flex-col justify-between overflow-hidden">
                    <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
                      <div className="text-[11px] font-bold text-[#8C4724] uppercase tracking-wider mb-2 shrink-0">
                        Available Variants
                      </div>

                      {/* ONLY THIS VARIANTS LIST SCROLLS */}
                      <div
                        className="flex-1 min-h-0 overflow-y-auto pr-1.5 space-y-1.5"
                        style={{
                          scrollbarWidth: 'thin',
                          scrollbarColor: '#C8912B #FAF7F2',
                        }}
                      >
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

                    {/* Pack Sizes (Fixed at bottom of column) */}
                    <div className="mt-2.5 pt-2 border-t border-gray-200 shrink-0">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-0.5">
                        Pack Sizes
                      </div>
                      <div className="text-xs text-amber-800 font-semibold font-mono">
                        {selectedCategory.packSizes}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Applications */}
                <div className="flex flex-col rounded-xl overflow-hidden border border-[#E2C192]/60 bg-white shadow-sm h-full min-h-0">
                  {/* Header bar */}
                  <div className="bg-[#E2C192] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#2A0E04] text-right shrink-0">
                    Applications
                  </div>

                  {/* Applications List */}
                  <div
                    className="p-3.5 flex-1 min-h-0 flex flex-col justify-between overflow-y-auto pr-1"
                    style={{
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#C8912B #FAF7F2',
                    }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedCategory.applications.map((app, i) => {
                        const IconComp = app.icon;
                        return (
                          <div
                            key={i}
                            className="flex items-center gap-2.5 p-2 rounded-xl bg-[#FAF8F5] border border-gray-100 hover:border-[#D11218]/30 transition-colors"
                          >
                            <div className="w-7 h-7 rounded-lg bg-[#D11218]/10 text-[#D11218] flex items-center justify-center shrink-0">
                              <IconComp className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-semibold text-[#2A0E04]">
                              {app.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Commercial Grade Note */}
                    <div className="mt-3 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/50 text-[11px] text-amber-900 leading-snug font-light shrink-0">
                      <span className="font-bold">Master Chocolatier Assurance:</span> All items formulated under strict temperature and micro-refinement protocols at our Kurod works, Dhamtari.
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Action Footer (Fixed at bottom of modal) */}
              <div className="p-3 sm:p-4 bg-[#FAF7F2] border-t border-[#381A0E]/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <div className="text-xs text-[#381A0E]/70 text-center sm:text-left">
                  Commercial inquiries, bulk pallet orders & custom formulations available.
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => handleWhatsAppInquiry(selectedCategory)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Inquiry</span>
                  </button>

                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="px-5 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
