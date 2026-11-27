import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  RotateCcw,
  Sparkles,
  PackageCheck,
  Check,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface PackSlide {
  id: string;
  categoryName: string;
  shortLabel: string;
  slogan: string;
  subSlogan: string;
  description: string;
  packSize: string;
  bgGradient: string;
  glowColor: string;
  textColor: string;
  subTextColor: string;
  badgeBg: string;
  badgeText: string;
  buttonBg: string;
  buttonText: string;
  variants: {
    id: string;
    label: string;
    frontImage: string;
    backImage: string;
  }[];
}

const PACK_SLIDES: PackSlide[] = [
  {
    id: 'choco_chips',
    categoryName: 'CHOCO CHIPS',
    shortLabel: 'CHIPS',
    slogan: 'SPREADING HAPPINESS',
    subSlogan: 'Bake-Stable Teardrop Choco Chips',
    description:
      'Engineered to hold flawless peak shape up to 200°C oven baking. Gives signature glossy bite to premium artisan cookies, muffins, cakes, and sundaes.',
    packSize: '1kg Zipper Metallic Pouch · 10kg Corrugated Carton',
    bgGradient: 'from-[#F5BA13] via-[#F4CA38] to-[#E3A706]',
    glowColor: 'rgba(255, 235, 150, 0.45)',
    textColor: '#1A0C03',
    subTextColor: '#3D1F08',
    badgeBg: '#1A0C03',
    badgeText: '#F5BA13',
    buttonBg: '#1A0C03',
    buttonText: '#FFFFFF',
    variants: [
      {
        id: 'milk',
        label: 'Milk',
        frontImage: '/assets/official_products_png/choco_chips/milk_front.png',
        backImage: '/assets/official_products_png/choco_chips/milk_back.png',
      },
      {
        id: 'dark',
        label: 'Dark',
        frontImage: '/assets/official_products_png/choco_chips/dark_front.png',
        backImage: '/assets/official_products_png/choco_chips/dark_back.png',
      },
      {
        id: 'white',
        label: 'White',
        frontImage: '/assets/official_products_png/choco_chips/white_front.png',
        backImage: '/assets/official_products_png/choco_chips/white_back.png',
      },
    ],
  },
  {
    id: 'slabs',
    categoryName: 'COMPOUND SLAB',
    shortLabel: 'SLABS',
    slogan: "THE MASTER'S GLOSS & CRACK",
    subSlogan: 'Non-Temper Easy Melt Formula',
    description:
      'Silky fluid melt with mirror gloss enrobing and instant clean snap. Formulated for bakeries, patisseries, confectionery, and ice cream coatings.',
    packSize: '500gm Centre Sealed Metallic · 10kg Carton (0.5kg × 20)',
    bgGradient: 'from-[#251006] via-[#381A0E] to-[#1A0A03]',
    glowColor: 'rgba(249, 189, 3, 0.25)',
    textColor: '#FEE8B4',
    subTextColor: '#EADBCC',
    badgeBg: '#F9BD03',
    badgeText: '#1C0E07',
    buttonBg: '#F9BD03',
    buttonText: '#1C0E07',
    variants: [
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
  },
  {
    id: 'buttons',
    categoryName: 'BUTTONS / COINS',
    shortLabel: 'BUTTONS',
    slogan: 'EFFORTLESS MELTING COINS',
    subSlogan: 'Artisan Callets & Uniform Drops',
    description:
      'Perfect disc geometry melts evenly and rapidly without chopping. Ideal for silk ganache, velvet moulding, enrobing, and dessert toppings.',
    packSize: '1kg Zipper Metallic Pouch · 10kg Carton (1kg × 10)',
    bgGradient: 'from-[#421F0F] via-[#5C2D16] to-[#301609]',
    glowColor: 'rgba(230, 160, 60, 0.3)',
    textColor: '#FFF2DB',
    subTextColor: '#E6D3B8',
    badgeBg: '#E5A23C',
    badgeText: '#1C0E07',
    buttonBg: '#E5A23C',
    buttonText: '#1C0E07',
    variants: [
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
  },
  {
    id: 'butterscotch',
    categoryName: 'BUTTERSCOTCH',
    shortLabel: 'CRUNCH',
    slogan: 'GOLDEN CARAMEL CRUNCH',
    subSlogan: 'Caramelized Roasted Nuts & Crispy Inclusions',
    description:
      'Delivers an irresistible crunch in ice creams, butterscotch cakes, kulfis, and praline fillings that stays crisp even in freezing conditions.',
    packSize: '250gm, 1kg Centre Sealed Pouches · 15kg Corrugated Carton',
    bgGradient: 'from-[#C46808] via-[#DD7E12] to-[#A04E04]',
    glowColor: 'rgba(255, 200, 80, 0.35)',
    textColor: '#FFF9E6',
    subTextColor: '#FDE6B8',
    badgeBg: '#FFE58F',
    badgeText: '#683300',
    buttonBg: '#FFE58F',
    buttonText: '#542600',
    variants: [
      {
        id: 'classic',
        label: 'Classic',
        frontImage: '/assets/official_products_png/butterscotch/front.png',
        backImage: '/assets/official_products_png/butterscotch/back.png',
      },
    ],
  },
  {
    id: 'paste',
    categoryName: 'CHOCO PASTE & DIP',
    shortLabel: 'PASTE',
    slogan: 'SILKY TRUFFLE & SPREAD',
    subSlogan: 'Ultra-Rich Ice Cream Dip & Bakery Truffles',
    description:
      'Formulated for instant crackling shell dip on ice cream bars and ultra-smooth, spreadable truffle filling inside bakery croissants and pastries.',
    packSize: '20kg Plastic Bucket · 25kg Industrial Container',
    bgGradient: 'from-[#2C150B] via-[#452212] to-[#1F0D05]',
    glowColor: 'rgba(245, 175, 75, 0.25)',
    textColor: '#FEE8B4',
    subTextColor: '#EADBCC',
    badgeBg: '#F9BD03',
    badgeText: '#1C0E07',
    buttonBg: '#F9BD03',
    buttonText: '#1C0E07',
    variants: [
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
  },
  {
    id: 'tutti_frutti',
    categoryName: 'TUTTI FRUTTI',
    shortLabel: 'FRUTTI',
    slogan: 'BURST OF CANDIED JOY',
    subSlogan: 'Succulent Candied Papaya Inclusions',
    description:
      'Vibrant ruby, emerald, and citrus cubes made from fresh candied papaya. Tender chew in plum cakes, sweet buns, cookies, and fruit ice creams.',
    packSize: '500gm Bucket · 1000gm Pouch · 10kg / 15kg Corrugated Carton',
    bgGradient: 'from-[#9F1239] via-[#BE123C] to-[#800F2E]',
    glowColor: 'rgba(255, 150, 180, 0.3)',
    textColor: '#FFF1F2',
    subTextColor: '#FECDD3',
    badgeBg: '#FFE4E6',
    badgeText: '#881337',
    buttonBg: '#FFE4E6',
    buttonText: '#881337',
    variants: [
      {
        id: 'multi',
        label: 'Multi-Color',
        frontImage: '/assets/official_products_png/tutti_frutti/front.png',
        backImage: '/assets/official_products_png/tutti_frutti/back.png',
      },
    ],
  },
];

interface PopatStyleMotionBannerProps {
  onExploreAllProducts?: (categoryId?: string) => void;
}

export const PopatStyleMotionBanner: React.FC<PopatStyleMotionBannerProps> = ({
  onExploreAllProducts,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeVariants, setActiveVariants] = useState<Record<string, string>>({
    choco_chips: 'milk',
    slabs: 'dark',
    buttons: 'dark',
    butterscotch: 'classic',
    paste: 'dark',
    tutti_frutti: 'multi',
  });
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isHovered, setIsHovered] = useState(false);

  const activeSlide = PACK_SLIDES[currentIndex];
  const activeVariantId = activeVariants[activeSlide.id] || activeSlide.variants[0].id;
  const activeVariant =
    activeSlide.variants.find((v) => v.id === activeVariantId) || activeSlide.variants[0];

  const currentImage = isFlipped ? activeVariant.backImage : activeVariant.frontImage;

  // Track the timestamp of the last manual action and last slide swap
  const lastManualActionTimeRef = useRef(0);
  const lastSlideChangeTimeRef = useRef(Date.now());

  // Called whenever user manually clicks, flips, or touches
  const handleManualAction = useCallback(() => {
    lastManualActionTimeRef.current = Date.now();
  }, []);

  const nextSlide = useCallback((isManual = false) => {
    if (isManual) {
      handleManualAction();
    }
    lastSlideChangeTimeRef.current = Date.now();
    setDirection('next');
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % PACK_SLIDES.length);
  }, [handleManualAction]);

  const prevSlide = useCallback((isManual = false) => {
    if (isManual) {
      handleManualAction();
    }
    lastSlideChangeTimeRef.current = Date.now();
    setDirection('prev');
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + PACK_SLIDES.length) % PACK_SLIDES.length);
  }, [handleManualAction]);

  // Master Auto-Scroll Loop:
  // - Default: Auto-scroll every 3 seconds (3000ms).
  // - If user manually touches/clicks/flips: Pause for 10 seconds (10000ms).
  // - Once 10 seconds have elapsed with no manual interaction: Resume auto-scrolling every 3 seconds!
  useEffect(() => {
    const timer = setInterval(() => {
      if (isHovered) return;

      const now = Date.now();
      const timeSinceManual = now - lastManualActionTimeRef.current;
      const timeSinceLastSlide = now - lastSlideChangeTimeRef.current;

      // If user recently interacted manually, wait at least 10 seconds
      if (timeSinceManual < 10000) {
        return;
      }

      // After 10 seconds of no manual interaction (or in default mode), swap every 3 seconds
      if (timeSinceLastSlide >= 3000) {
        lastSlideChangeTimeRef.current = now;
        setDirection('next');
        setIsFlipped(false);
        setCurrentIndex((prev) => (prev + 1) % PACK_SLIDES.length);
      }
    }, 200);

    return () => clearInterval(timer);
  }, [isHovered]);

  // Trackpad / Scroll Wheel Swipe
  const wheelLockRef = useRef(false);
  const handleWheel = (e: React.WheelEvent) => {
    handleManualAction();
    if (wheelLockRef.current) return;
    if (Math.abs(e.deltaX) > 30 || Math.abs(e.deltaY) > 50) {
      wheelLockRef.current = true;
      if (e.deltaX > 0 || e.deltaY > 0) {
        nextSlide(true);
      } else {
        prevSlide(true);
      }
      setTimeout(() => {
        wheelLockRef.current = false;
      }, 500);
    }
  };

  const handleWhatsAppInquiry = () => {
    handleManualAction();
    const text = encodeURIComponent(
      `Hello ROMAS Chocolates! I am interested in wholesale order for:
*${activeSlide.categoryName}* (${activeVariant.label} Variant)
Pack Size: ${activeSlide.packSize}
Please share wholesale pricing & catalog.`
    );
    window.open(`https://wa.me/919098229454?text=${text}`, '_blank');
  };

  return (
    <section
      id="product-motion-banner"
      onWheel={handleWheel}
      onMouseEnter={() => {
        setIsHovered(true);
        handleManualAction();
      }}
      onMouseMove={handleManualAction}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onTouchStart={handleManualAction}
      onTouchMove={handleManualAction}
      className="relative w-full bg-[#1C0E07] text-[#FEE8B4] overflow-hidden select-none scroll-mt-14 sm:scroll-mt-16"
    >
      {/* 1. TOP CIRCULAR CATEGORY BUTTONS (Exact Popat Namkeen Style - Fully responsive, 0 cropping) */}
      <div className="w-full bg-[#FAF8F5] border-b border-[#EADBCC]/60 py-2 sm:py-3.5 px-1 sm:px-4 shadow-sm z-30 relative">
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-1.5 min-[360px]:gap-2 min-[400px]:gap-3 sm:gap-6 lg:gap-8 px-1">
          {PACK_SLIDES.map((slide, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={slide.id}
                onClick={() => {
                  handleManualAction();
                  setDirection(idx > currentIndex ? 'next' : 'prev');
                  setIsFlipped(false);
                  setCurrentIndex(idx);
                }}
                className="group flex flex-col items-center shrink-0 cursor-pointer active:scale-95"
              >
                {/* 3D Flipping Coin Badge with Perspective on Hover */}
                <div className="relative w-11 h-11 min-[360px]:w-12 min-[360px]:h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 [perspective:800px]">
                  <div
                    className={`w-full h-full relative [transform-style:preserve-3d] transition-transform duration-500 ease-out group-hover:[transform:rotateY(180deg)] ${
                      isActive ? 'scale-105' : 'hover:scale-105'
                    }`}
                  >
                    {/* FRONT FACE: Popat-Style Gold Concentric Circle with Category Label */}
                    <div
                      className={`absolute inset-0 w-full h-full rounded-full [backface-visibility:hidden] flex items-center justify-center transition-all duration-300 border-2 ${
                        isActive
                          ? 'border-[#F9BD03] shadow-[0_0_14px_rgba(249,189,3,0.65)] bg-[#F9BD03]/15'
                          : 'border-[#F9BD03]/40 bg-white hover:border-[#F9BD03] shadow-xs'
                      }`}
                    >
                      {/* Inner Concentric Circle Accent */}
                      <div
                        className={`w-8.5 h-8.5 min-[360px]:w-9.5 min-[360px]:h-9.5 sm:w-13 sm:h-13 lg:w-16 lg:h-16 rounded-full flex items-center justify-center transition-colors ${
                          isActive
                            ? 'bg-[#F9BD03] text-[#1C0E07] shadow-sm'
                            : 'bg-transparent text-[#7A5832] group-hover:text-[#F9BD03]'
                        }`}
                      >
                        <span className="text-[7.5px] min-[360px]:text-[8.5px] min-[400px]:text-[9.5px] sm:text-xs lg:text-sm font-black tracking-wider uppercase text-center leading-none px-0.5">
                          {slide.shortLabel}
                        </span>
                      </div>
                    </div>

                    {/* BACK FACE: 3D Product Pouch Floating on Gold Coin */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-full [backface-visibility:hidden] [transform:rotateY(180deg)] flex items-center justify-center p-1 sm:p-2 border-2 border-[#F9BD03] bg-gradient-to-br from-[#FFF8E7] via-[#FDF0D0] to-[#F5D88E] shadow-[0_4px_14px_rgba(249,189,3,0.45)] overflow-hidden"
                    >
                      {/* Subtle golden shimmer overlay */}
                      <div className="absolute inset-0 bg-radial from-white/40 via-transparent to-transparent pointer-events-none" />

                      <img
                        src={slide.variants[0].frontImage}
                        alt={slide.categoryName}
                        className="w-full h-full object-contain filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)] transform transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. DYNAMIC FULL-WIDTH HERO STAGE WITH COLOR-ADAPTING BACKGROUND & ARTISAN TEXTURE */}
      <div
        className={`relative w-full min-h-[340px] min-[360px]:min-h-[360px] sm:min-h-[500px] lg:min-h-[560px] bg-gradient-to-br ${activeSlide.bgGradient} transition-colors duration-700 flex items-center justify-center px-2 sm:px-12 lg:px-20 py-3 sm:py-9 lg:py-12 overflow-hidden`}
      >
        {/* Ambient Radial Luxury Glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700"
          style={{
            background: `radial-gradient(circle at 35% 50%, ${activeSlide.glowColor} 0%, transparent 70%)`,
          }}
        />

        {/* 1. Organic Artisan Mottled Parchment & Watercolor Cloud Wash (Popat Namkeen Style Texture) */}
        <div
          className="absolute inset-0 opacity-35 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: "url('/assets/textures/artisan_botanical_overlay.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* 2. Delicate Botanical Floral & Cacao Leaf Line-Art Etchings (Pencil Sketch Artwork) */}
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage: "url('/assets/textures/botanical_etching.svg')",
            backgroundSize: '540px 540px',
            backgroundRepeat: 'repeat',
            mixBlendMode: 'soft-light',
          }}
        />

        {/* 3. Subtle Paper Grain / Micro Texture */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-6 lg:gap-12 items-center relative z-10 pb-5 sm:pb-0">
          
          {/* =========================================================================
              LEFT: PRODUCT PACKET (PROMINENT PREMIUM SIZING)
             ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-[210px] min-[360px]:max-w-[230px] sm:max-w-[380px] md:max-w-[430px] lg:max-w-[480px] flex items-center justify-center">
              
              {/* Pedestal Glow Shadow on Floor */}
              <div className="absolute bottom-1 sm:bottom-2 inset-x-4 sm:inset-x-6 h-6 sm:h-12 bg-black/45 rounded-full blur-md sm:blur-2xl transform scale-95 pointer-events-none" />

              {/* Rotating Packet with 3D Spin-in Animation ("ghumke aye") */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeSlide.id}-${activeVariant.id}-${isFlipped ? 'back' : 'front'}`}
                  initial={{
                    opacity: 0,
                    scale: 0.75,
                    rotate: direction === 'next' ? -22 : 22,
                    rotateY: isFlipped ? 180 : 0,
                    x: direction === 'next' ? -70 : 70,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    rotateY: isFlipped ? 180 : 0,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.75,
                    rotate: direction === 'next' ? 22 : -22,
                    x: direction === 'next' ? 70 : -70,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 22,
                    mass: 0.8,
                  }}
                  className="relative w-full flex items-center justify-center select-none"
                >
                  {/* Subtle Floating / Levitation Physics */}
                  <motion.div
                    animate={{
                      y: [-4, 4, -4],
                      rotate: [-0.8, 0.8, -0.8],
                    }}
                    transition={{
                      duration: 3.6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="relative w-full flex items-center justify-center p-1 sm:p-2"
                  >
                    <img
                      src={currentImage}
                      alt={`${activeSlide.categoryName} ${activeVariant.label}`}
                      className="max-h-[170px] min-[360px]:max-h-[190px] min-[400px]:max-h-[210px] sm:max-h-[400px] md:max-h-[450px] lg:max-h-[490px] w-auto object-contain filter drop-shadow-[0_16px_30px_rgba(0,0,0,0.5)] cursor-pointer"
                      onClick={() => {
                        handleManualAction();
                        setIsFlipped((prev) => !prev);
                      }}
                      title="Click to flip front / back"
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Clean Controls below packet: Flip Button, Full Details Button & Flavour Switcher */}
            <div className="mt-1.5 sm:mt-3 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 z-20">
              <button
                onClick={() => {
                  handleManualAction();
                  setIsFlipped((prev) => !prev);
                }}
                className="flex items-center gap-1 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md text-[9px] sm:text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md active:scale-95"
              >
                <RotateCcw className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#F9BD03]" />
                <span>{isFlipped ? 'Front' : 'Reverse'}</span>
              </button>

              {/* View Full Details Button */}
              <button
                onClick={() => {
                  handleManualAction();
                  if (onExploreAllProducts) onExploreAllProducts(activeSlide.id);
                }}
                className="flex items-center gap-1 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#F9BD03] hover:bg-[#E5AA00] text-[#1C0E07] text-[9px] sm:text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-md active:scale-95"
              >
                <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#1C0E07]" />
                <span>Full Details</span>
              </button>

              {activeSlide.variants.length > 1 && (
                <div className="flex items-center gap-0.5 sm:gap-1 bg-black/40 backdrop-blur-md px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full border border-white/20">
                  {activeSlide.variants.map((v) => {
                    const isSelected = activeVariant.id === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => {
                          handleManualAction();
                          setIsFlipped(false);
                          setActiveVariants((prev) => ({ ...prev, [activeSlide.id]: v.id }));
                        }}
                        className={`text-[8px] sm:text-[10px] font-black uppercase px-2 sm:px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#F9BD03] text-[#1C0E07] shadow-sm font-black'
                            : 'text-white/80 hover:text-white'
                        }`}
                      >
                        {v.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* =========================================================================
              RIGHT: BIG BOLD SLOGAN & "VIEW ALL PRODUCTS" ACTION BUTTON
             ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col justify-center items-center lg:items-start text-center lg:text-left mt-0.5 sm:mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="max-w-2xl px-2"
              >
                {/* Giant Bold Slogan matching "CHAI KA BEST FRIEND" */}
                <h2
                  className="text-lg min-[360px]:text-xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight sm:leading-[1.05] drop-shadow-sm select-none"
                  style={{
                    color: activeSlide.textColor,
                    fontFamily: "'Playfair Display', 'Inter', sans-serif",
                  }}
                >
                  {activeSlide.slogan}
                </h2>

                {/* Direct Action: View Full Details & All Products */}
                <div className="mt-2.5 sm:mt-5 flex items-center gap-3">
                  <button
                    onClick={() => {
                      handleManualAction();
                      if (onExploreAllProducts) onExploreAllProducts(activeSlide.id);
                    }}
                    className="inline-flex items-center gap-2 px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-black uppercase tracking-wider bg-[#1C0E07] hover:bg-black text-[#FEE8B4] border border-[#F9BD03]/40 hover:border-[#F9BD03] transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                  >
                    <span>View All Products & Full Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#F9BD03]" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 3. ARROW CONTROLS (Left & Right - Scaled for Mobile) */}
        <button
          onClick={() => prevSlide(true)}
          aria-label="Previous Product"
          className="absolute left-1 sm:left-6 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all backdrop-blur-md cursor-pointer z-20 shadow-md active:scale-90"
        >
          <ChevronLeft className="w-3.5 h-3.5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={() => nextSlide(true)}
          aria-label="Next Product"
          className="absolute right-1 sm:right-6 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all backdrop-blur-md cursor-pointer z-20 shadow-md active:scale-90"
        >
          <ChevronRight className="w-3.5 h-3.5 sm:w-6 sm:h-6" />
        </button>

        {/* 4. SLIDE DOTS / PROGRESS INDICATOR */}
        <div className="absolute bottom-1 sm:bottom-3 inset-x-0 flex items-center justify-center gap-1.5 sm:gap-2 z-20">
          {PACK_SLIDES.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => {
                handleManualAction();
                setDirection(dotIdx > currentIndex ? 'next' : 'prev');
                setIsFlipped(false);
                setCurrentIndex(dotIdx);
              }}
              aria-label={`Go to slide ${dotIdx + 1}`}
              className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === dotIdx
                  ? 'w-5 sm:w-7 bg-black/80 shadow-xs'
                  : 'w-1 sm:w-1.5 bg-black/25 hover:bg-black/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
