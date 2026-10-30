import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Flame, ShieldCheck, Award } from 'lucide-react';
import { IMAGES } from '../data/products';
import { MotionReveal } from './MotionReveal';

export const ProcessSection: React.FC = () => {
  const framerEase = [0.16, 1, 0.3, 1] as const;

  const steps = [
    {
      num: '01',
      title: 'Ethical Cocoa Sourcing',
      subtitle: 'Sun-dried beans selected for intense aromatic profile',
      description:
        'Every batch begins with carefully fermented cocoa beans, evaluated for fat content and rich, roasted cocoa character before entering our roasting drums.',
      icon: Sparkles,
      tag: 'Bean Selection',
    },
    {
      num: '02',
      title: 'Micro-Milling & Refining',
      subtitle: 'Refined under 20 microns for silky palate glide',
      description:
        'We grind cocoa solids and fine dairy powders through multi-roll refiners until particle size drops below 20 microns, eliminating any sandy or gritty mouthfeel.',
      icon: Award,
      tag: 'Micro-Refining',
    },
    {
      num: '03',
      title: 'Precision Temperature Conching',
      subtitle: 'Calibrated non-temper & couverture formulations',
      description:
        'Aerated and conched over hours to develop warm caramel notes while eliminating harsh astringency. Formulated for a crisp snap and effortless 42°C melting.',
      icon: Flame,
      tag: 'Conching Science',
    },
    {
      num: '04',
      title: 'Gold Barrier Preservation',
      subtitle: 'Nitrogen-flushed resealable zipper pouches',
      description:
        'To conquer India’s tropical heat and humidity, every pack is sealed in multi-layer gold foil pouches that protect volatile cocoa notes and prevent fat bloom.',
      icon: ShieldCheck,
      tag: 'Moisture Lock',
    },
  ];

  return (
    <section id="process" className="py-24 sm:py-36 bg-[#FAF6F0] text-[#2A0E04] relative overflow-hidden border-t border-[#381305]/10">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#FAD674]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <MotionReveal className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#381305]/10 text-[#8C4724] text-[11px] font-bold uppercase tracking-[0.22em] mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27]" />
            <span>The Bean-To-Happiness Process</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-[#2A0E04] leading-tight tracking-tight">
            The Craft Behind Every Drop
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#2A0E04]/75 font-light leading-relaxed">
            Just like fine single-origin cocoa conching and artisanal roasting, extraordinary chocolate is born
            from meticulous temperature control, micron-level milling, and respectful craft.
          </p>
        </MotionReveal>

        {/* 4-Step Bento Grid with Staggered Entrance & Spring Hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 32, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: framerEase }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="group relative rounded-3xl p-8 bg-white border border-[#381305]/10 hover:border-[#C59B27] shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between pb-6 border-b border-[#381305]/10 mb-6">
                    <span className="font-serif text-3xl font-bold text-[#C59B27]">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-[#FAF8F5] group-hover:bg-[#FAD674] flex items-center justify-center text-[#381305] transition-colors duration-300">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C4724] block mb-2">
                    {step.tag}
                  </span>

                  <h3 className="font-serif text-2xl font-bold text-[#2A0E04] mb-2 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#C59B27] mb-3">
                    {step.subtitle}
                  </p>

                  <p className="text-xs text-[#2A0E04]/70 leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#381305]/10 flex items-center justify-between text-[11px] font-mono text-[#8C4724]">
                  <span>Roma Standards</span>
                  <span className="w-2 h-2 rounded-full bg-[#C59B27]" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Atmosphere Highlight Card with Framer Motion Reveal */}
        <MotionReveal delay={0.2} className="mt-16 rounded-3xl overflow-hidden bg-[#2A0E04] text-[#FAF8F5] border border-[#C59B27]/30 shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            <div className="lg:col-span-7 p-8 sm:p-14 space-y-6">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#FAD674] block">
                The Master Chocolatier Standards
              </span>

              <h3 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
                Designed for Pastry Counters That Demand Perfection.
              </h3>

              <p className="text-xs sm:text-sm text-[#FAF8F5]/80 leading-relaxed font-light max-w-xl">
                Whether you're pouring a high-gloss mirror glaze over an entremet, enrobing delicate bonbons,
                or baking fudgy brownies in high-heat convection ovens — ROMAS gives you repeatable viscosity,
                clean palate release, and glorious shine without waxy residues.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <motion.a
                  href="#chocolates"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FAD674] via-[#E6C280] to-[#C59B27] hover:brightness-105 text-[#140602] text-xs font-bold uppercase tracking-[0.18em] shadow-lg cursor-pointer"
                >
                  Explore Collection
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-[#C59B27]/40 text-[#FAD674] text-xs font-bold uppercase tracking-[0.18em] transition-colors cursor-pointer"
                >
                  Request Trade Samples
                </motion.a>
              </div>
            </div>

            <div className="lg:col-span-5 h-72 lg:h-full relative overflow-hidden">
              <img
                src={IMAGES.craftsmanship}
                alt="Chocolatier working with tempered molten chocolate on marble"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#2A0E04] via-transparent to-transparent" />
            </div>

          </div>
        </MotionReveal>

      </div>
    </section>
  );
};
