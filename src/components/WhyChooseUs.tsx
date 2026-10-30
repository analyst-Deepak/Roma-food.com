import React from 'react';
import { motion } from 'framer-motion';
import { WHY_CHOOSE_PILLARS } from '../data/products';
import { MotionReveal } from './MotionReveal';
import { Check, X, ShieldCheck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const romanNumerals = ['I', 'II', 'III', 'IV'];
  const framerEase = [0.16, 1, 0.3, 1] as const;

  const comparisonPoints = [
    {
      feature: 'Melt Curve & Palate Feel',
      romas: 'Rapid 40°C–45°C melt with silky mouthfeel and zero waxy tongue residue',
      others: 'Sluggish melting; leaves lingering waxy fat film on the roof of the mouth',
    },
    {
      feature: 'Viscosity & Enrobing Flow',
      romas: 'Precision-calibrated 4-drop fluidity for mirror glazes and fine mold piping',
      others: 'Inconsistent viscosity requiring added oils that ruin shine and snap',
    },
    {
      feature: 'Cocoa Milling & Texture',
      romas: 'Micro-refined under 20 microns for velvety smoothness in creams & mousses',
      others: 'Coarse milling causing sandy or gritty texture in delicate ganaches',
    },
    {
      feature: 'Barrier Packaging Standard',
      romas: 'Nitrogen-flushed gold multi-layer moisture pouch with resealable airtight zip',
      others: 'Thin transparent plastic with no moisture barrier, leading to fat bloom',
    },
    {
      feature: 'Factory Quality Compliance',
      romas: 'FSSAI License #10526005000033 with automated batch testing in Dhamtari',
      others: 'Unverified repackaged local goods with no batch traceability',
    },
  ];

  return (
    <section className="py-24 sm:py-36 bg-[#FAF6F0] text-[#1A0A04] border-t border-[#1A0A04]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <MotionReveal className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-[#8C4724] mb-4">
            <span className="w-8 h-[1px] bg-[#D4AF37]" />
            <span>The ROMAS Distinction</span>
            <span className="w-8 h-[1px] bg-[#D4AF37]" />
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-[#1A0A04] leading-tight">
            Why Visionary Bakers Switch to ROMAS
          </h2>
          <p className="mt-5 text-sm sm:text-base text-[#1A0A04]/75 leading-relaxed font-light">
            Engineered to overcome every frustration pastry chefs encounter with ordinary market compounds.
            Consistent, lustrous, and true to the art of fine confectionery.
          </p>
        </MotionReveal>

        {/* 4 Pillars Grid with Spring Hover */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {WHY_CHOOSE_PILLARS.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: framerEase }}
              whileHover={{ y: -8 }}
              className="p-8 rounded-3xl bg-white border border-[#1A0A04]/10 hover:border-[#D4AF37] shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Roman Numeral & Tagline */}
                <div className="flex items-center justify-between pb-5 border-b border-[#381305]/10 mb-6">
                  <span className="font-serif text-2xl font-bold text-[#8C4724]">
                    {romanNumerals[index]}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                    {pillar.tagline}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl font-bold text-[#1A0A04] mb-3">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#1A0A04]/75 leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>

              {/* Bottom accent */}
              <div className="mt-8 pt-4 border-t border-[#381305]/10 flex items-center justify-between text-xs text-[#8C4724] font-mono">
                <span>Pillar 0{index + 1}</span>
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Direct Technical Comparison Table with MotionReveal */}
        <MotionReveal delay={0.2} className="mt-20 max-w-5xl mx-auto rounded-3xl overflow-hidden bg-white border border-[#381305]/15 shadow-xl">
          <div className="p-6 sm:p-8 bg-gradient-to-r from-[#381305] via-[#4A1704] to-[#2A0E04] text-[#FAF8F5]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#FAD674] block">
                  Quality Audit
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
                  ROMAS Confectionery vs Ordinary Market Compounds
                </h3>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#FAD674] text-xs font-semibold backdrop-blur-md border border-[#C59B27]/40 shrink-0">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Chef Standards</span>
              </div>
            </div>
          </div>

          <div className="divide-y divide-[#381305]/10">
            {comparisonPoints.map((row) => (
              <div
                key={row.feature}
                className="grid grid-cols-1 md:grid-cols-12 p-5 sm:p-6 hover:bg-[#FAF8F5] transition-colors gap-4 items-center"
              >
                <div className="md:col-span-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#381305]">
                    {row.feature}
                  </span>
                </div>

                <div className="md:col-span-4 flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-0.5">
                      ROMAS Standards
                    </span>
                    <p className="text-xs text-[#2A0E04] font-medium leading-relaxed">
                      {row.romas}
                    </p>
                  </div>
                </div>

                <div className="md:col-span-4 flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-red-100 text-red-800 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-red-800 uppercase tracking-wider block mb-0.5">
                      Generic Compounds
                    </span>
                    <p className="text-xs text-[#2A0E04]/65 font-light leading-relaxed">
                      {row.others}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </MotionReveal>

      </div>
    </section>
  );
};
