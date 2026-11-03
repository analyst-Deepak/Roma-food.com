import re

file_path = r'src/components/Gr8rMenu.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update CategoryRange interface to include cutoutImage
content = content.replace(
    """export interface CategoryRange {
  id: string;
  name: string;
  cardImage: string;
  bannerImage: string;""",
    """export interface CategoryRange {
  id: string;
  name: string;
  cutoutImage: string;
  cardImage: string;
  bannerImage: string;"""
)

# 2. Add cutoutImage to each item in CATEGORY_RANGES
content = content.replace(
    """    id: 'compounds',
    name: 'COMPOUNDS',
    cardImage: '/assets/categories/clean/card_compounds.jpg',""",
    """    id: 'compounds',
    name: 'COMPOUNDS',
    cutoutImage: '/assets/products_3d_png/compounds_cutout.png',
    cardImage: '/assets/categories/clean/card_compounds.jpg',"""
)

content = content.replace(
    """    id: 'couvertures',
    name: 'CHOCOLATE & COUVERTURES',
    cardImage: '/assets/categories/clean/card_couverture.jpg',""",
    """    id: 'couvertures',
    name: 'CHOCOLATE & COUVERTURES',
    cutoutImage: '/assets/chocolate/romas_slab_cutout.png',
    cardImage: '/assets/categories/clean/card_couverture.jpg',"""
)

content = content.replace(
    """    id: 'cocoa-products',
    name: 'COCOA PRODUCTS',
    cardImage: '/assets/categories/clean/card_cocoa.jpg',""",
    """    id: 'cocoa-products',
    name: 'COCOA PRODUCTS',
    cutoutImage: '/assets/products_3d_png/cocoa_cutout.png',
    cardImage: '/assets/categories/clean/card_cocoa.jpg',"""
)

content = content.replace(
    """    id: 'fillings',
    name: 'FILLINGS',
    cardImage: '/assets/categories/clean/card_fillings.jpg',""",
    """    id: 'fillings',
    name: 'FILLINGS',
    cutoutImage: '/assets/products_3d_png/fillings_3d.png',
    cardImage: '/assets/categories/clean/card_fillings.jpg',"""
)

content = content.replace(
    """    id: 'coated',
    name: 'COATED',
    cardImage: '/assets/categories/clean/card_coated.jpg',""",
    """    id: 'coated',
    name: 'COATED',
    cutoutImage: '/assets/products_3d_png/download_cutout.png',
    cardImage: '/assets/categories/clean/card_coated.jpg',"""
)

content = content.replace(
    """    id: 'decorations',
    name: 'DECORATIONS & INCLUSIONS',
    cardImage: '/assets/categories/clean/card_decorations.jpg',""",
    """    id: 'decorations',
    name: 'DECORATIONS & INCLUSIONS',
    cutoutImage: '/assets/products_3d_png/product_5_cutout.png',
    cardImage: '/assets/categories/clean/card_decorations.jpg',"""
)

# 3. Replace the carousel stage from {/* === TRUE 3D DEPTH CAROUSEL PRO STAGE === */} down to {/* === RICH PRODUCT SPECIFICATION MODAL === */}
stage_pattern = re.compile(
    r'\{\/\* =+[\r\n\s]+TRUE 3D DEPTH CAROUSEL PRO STAGE[\s\S]+?\{\/\* =+[\r\n\s]+RICH PRODUCT SPECIFICATION MODAL',
    re.MULTILINE
)

new_stage = """{/* =========================================================================
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

                      {/* Category Label below side products for intuitive browsing */}
                      {!isCurrent && (
                        <span className="mt-3 text-[11px] font-bold uppercase tracking-widest text-[#381A0E]/60 group-hover:text-[#381A0E] transition-colors">
                          {cat.name}
                        </span>
                      )}
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
          RICH PRODUCT SPECIFICATION MODAL"""

content = stage_pattern.sub(new_stage, content, count=1)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully updated Gr8rMenu.tsx to Unboxed 3D Product Showcase!")

