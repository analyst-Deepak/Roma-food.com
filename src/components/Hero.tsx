import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';
import { IMAGES } from '../data/products';

interface HeroProps {
  onExploreClick: () => void;
  onStoryClick: () => void;
  onRequestSampleBox?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onRequestSampleBox }) => {
  const shouldReduceMotion = useReducedMotion();
  const luxuryEase = [0.16, 1, 0.3, 1] as const;

  // Soft fade-up entrance, sequenced top-to-bottom.
  const rise = (delay: number) => ({
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: luxuryEase },
  });

  return (
    <section
      id="home"
      className="relative min-h-[96vh] flex flex-col items-center justify-center overflow-hidden bg-[#FAF8F5] text-[#2A0E04] pt-36 sm:pt-44 pb-24 sm:pb-32"
    >
      {/* Ambient warm glow */}
      <div
        className="absolute top-[22%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[760px] bg-[#FAD674]/20 rounded-full blur-[170px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">

        {/* Kicker — single clean line */}
        <motion.div
          {...rise(0)}
          className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.32em] text-[#8C4724] mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27] animate-pulse" />
          <span>Maison Roma Foods · Haute Confectionery</span>
        </motion.div>

        {/* Monumental editorial headline */}
        <motion.h1
          {...rise(0.08)}
          className="font-serif font-bold tracking-tight text-[#2A0E04] leading-[0.98] text-balance text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem]"
        >
          A Little Bite.
          <span className="block italic font-normal text-gold-gradient mt-1">
            A Lot of Happiness.
          </span>
        </motion.h1>

        {/* One calm subtitle line */}
        <motion.p
          {...rise(0.16)}
          className="mt-8 max-w-2xl text-base sm:text-lg text-[#381305]/70 font-light leading-relaxed text-balance"
        >
          Zero-temper compounds, pure cocoa-butter couvertures, and silky bake-stable fillings —
          trusted by India's finest pastry chefs, bakeries, and celebrations.
        </motion.p>

        {/* Dual capsule CTAs */}
        <motion.div
          {...rise(0.24)}
          className="mt-11 flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={onExploreClick}
            className="group w-full sm:w-auto px-9 py-4 text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#140602] bg-gradient-to-r from-[#FAD674] via-[#E6C280] to-[#C59B27] hover:brightness-105 active:scale-[0.98] rounded-full transition-all duration-300 shadow-xl shadow-[#C59B27]/25 flex items-center justify-center gap-3 cursor-pointer"
          >
            <span>Explore Collection</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onRequestSampleBox}
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#381305] bg-white hover:bg-white/60 border border-[#381305]/15 hover:border-[#C59B27] rounded-full transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#C59B27]" />
            <span>Order Trade Sample Kit</span>
          </button>
        </motion.div>

        {/* One clean image band */}
        <motion.div
          {...rise(0.34)}
          className="mt-16 sm:mt-20 w-full"
        >
          <div className="group relative rounded-[2rem] overflow-hidden border border-[#381305]/10 shadow-[0_40px_90px_-40px_rgba(42,14,4,0.45)]">
            <div className="aspect-[16/10] sm:aspect-[16/7]">
              <img
                src={IMAGES.hero}
                alt="Molten ROMAS couverture cascading over artisan cocoa and golden chocolate buttons"
                className="w-full h-full object-cover transition-transform duration-[1300ms] ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Subtle scrims for label legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/40 pointer-events-none" />

            {/* Top label chip */}
            <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-white/40 text-[10px] font-bold uppercase tracking-[0.18em] text-[#381305]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27]" />
              <span>The ROMAS Atelier</span>
            </div>

            {/* Bottom caption */}
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 text-left">
              <p className="font-serif text-white text-xl sm:text-3xl font-bold leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] max-w-lg">
                Molten couverture, crafted at a flawless 42°C.
              </p>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.15em] text-[#FAD674] shrink-0">
                Particle &lt; 20µm
                <span className="w-1.5 h-1.5 rounded-full bg-[#FAD674]" />
              </span>
            </div>
          </div>

          {/* Minimal trust row under the image */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2A0E04]/55">
            <span>500+ Partner Bakeries</span>
            <span className="w-1 h-1 rounded-full bg-[#C59B27]" />
            <span>100% Pure Cocoa Butter</span>
            <span className="w-1 h-1 rounded-full bg-[#C59B27]" />
            <span>FSSAI Certified · Dhamtari</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
