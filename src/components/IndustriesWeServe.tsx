import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cake, Hotel, IceCream, Sparkles, Factory, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { MotionReveal } from './MotionReveal';

interface IndustriesWeServeProps {
  onSelectSegment: (segmentId: string) => void;
}

export const IndustriesWeServe: React.FC<IndustriesWeServeProps> = ({ onSelectSegment }) => {
  const framerEase = [0.16, 1, 0.3, 1] as const;

  const industries = [
    {
      id: 'bakery',
      title: 'Bakeries & Patisseries',
      icon: Cake,
      tagline: 'High-Volume Commercial & Artisan Baking',
      description: 'Zero-temper chocolate compounds, mirror glazes, and bake-stable drops engineered for high-heat ovens (200°C) without losing shape.',
      popularProducts: ['Milk Compound Buttons', 'Dark Compound Slabs', 'Bake-Stable Choco Drops'],
      bgGradient: 'from-[#FAF6F0] to-[#F5ECE1]',
      badge: 'Baking Staple',
      badgeColor: 'bg-[#C59B27]/15 text-[#8C6514] border-[#C59B27]/30',
    },
    {
      id: 'pastry-chefs',
      title: 'HoReCa & Luxury Hotels',
      icon: Hotel,
      tagline: 'Banquets, Buffets & Gourmet Desserts',
      description: 'Silky, high-fluidity pure couvertures and instant ganache bases designed for buffet longevity, mirror sheen, and rapid plated prep.',
      popularProducts: ['55% Dark Couverture', 'Silk Milk 38%', 'Hazelnut Praline Filling'],
      bgGradient: 'from-[#FAF8F5] to-[#F2E8DC]',
      badge: 'Executive Chef Pick',
      badgeColor: 'bg-[#4A1704]/10 text-[#4A1704] border-[#4A1704]/20',
    },
    {
      id: 'pastry-chefs',
      title: 'Chocolatiers & Artisans',
      icon: Sparkles,
      tagline: 'Fine Bonbons, Pralines & Truffles',
      description: 'Pure cocoa butter couvertures with precise crystallization curves, delivering a resonant snap, satin gloss, and sublime mouth-melt.',
      popularProducts: ['70% Single Origin Noir', 'White Velvet Couverture', 'Cocoa Butter Deodorized'],
      bgGradient: 'from-[#FFFDF9] to-[#F9F3EA]',
      badge: 'Pure Couverture',
      badgeColor: 'bg-[#C59B27]/20 text-[#381305] border-[#C59B27]/40',
    },
    {
      id: 'bakery',
      title: 'Ice Cream & Frozen Desserts',
      icon: IceCream,
      tagline: 'Dip Coatings & Stracciatella Inclusions',
      description: 'Rapid-setting fat matrices that coat ice-cream sticks evenly, creating a crisp crackle at -18°C without flaking or condensation sweating.',
      popularProducts: ['Quick-Set Dip Coating', 'Crispy Cocoa Stracciatella', 'White Ice Enrobing'],
      bgGradient: 'from-[#FAF6F0] to-[#EFE4D6]',
      badge: 'Sub-Zero Crackle',
      badgeColor: 'bg-blue-900/10 text-blue-900 border-blue-900/20',
    },
    {
      id: 'industrial',
      title: 'Industrial & Large FMCG',
      icon: Factory,
      tagline: 'Custom Formulations & Tonnage Cartons',
      description: 'Consistent batch-to-batch viscosity, customized melting curves, and palletized bulk supply in 10kg cartons or liquid heated tankers.',
      popularProducts: ['10kg Industrial Compound Slabs', 'Dutch Cocoa Powder', 'Industrial Drops'],
      bgGradient: 'from-[#FDFBF7] to-[#F4EBDF]',
      badge: 'Tonnage Supply',
      badgeColor: 'bg-emerald-900/10 text-emerald-900 border-emerald-900/20',
    },
    {
      id: 'home-bakers',
      title: 'Home Bakers & Confectioners',
      icon: HeartHandshake,
      tagline: 'Zipper Pouches & Festive Celebrations',
      description: 'Consumer-friendly 500g and 1kg resealable gold barrier pouches with easy melt buttons that empower every celebration with joy.',
      popularProducts: ['500g Zipper Compound Buttons', 'Royal Celebration Gift Box', 'Butterscotch Drops'],
      bgGradient: 'from-[#FAF8F5] to-[#F7EDE1]',
      badge: 'Easy Zipper Pack',
      badgeColor: 'bg-[#FECF6A]/30 text-[#4A1704] border-[#FECF6A]',
    },
  ];

  return (
    <section id="industries" className="py-24 bg-[#FBF8F3] text-[#2A0E04] border-t border-[#381305]/10 relative overflow-hidden">
      {/* Background Decorative Ambient glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#FECF6A]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <MotionReveal className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#381305]/5 border border-[#381305]/15 text-[#8C4724] text-[11px] font-bold uppercase tracking-[0.22em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27]" />
            <span>Tailored Confectionery Solutions</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#2A0E04] tracking-tight leading-tight">
            Industries We Empower
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-[#2A0E04]/75 font-light leading-relaxed">
            From artisanal patisseries in metro cities to large-scale industrial confectionery lines,
            ROMAS provides calibrated chocolate performance designed specifically for your craft.
          </p>
        </MotionReveal>

        {/* 6-Grid Industry Cards with Motion & Stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {industries.map((ind, idx) => {
            const IconComponent = ind.icon;
            return (
              <motion.div
                key={ind.title}
                initial={{ opacity: 0, y: 32, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: idx * 0.08, ease: framerEase }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="group relative rounded-3xl p-7 sm:p-8 bg-white border border-[#381305]/10 hover:border-[#C59B27]/50 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="w-13 h-13 rounded-2xl bg-[#FAF6F0] group-hover:bg-[#FAD674] border border-[#381305]/10 group-hover:border-[#C59B27] flex items-center justify-center transition-colors duration-300">
                      <IconComponent className="w-6 h-6 text-[#381305]" />
                    </div>

                    <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${ind.badgeColor}`}>
                      {ind.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-serif text-2xl font-bold text-[#2A0E04] group-hover:text-[#381305] transition-colors">
                    {ind.title}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C59B27] mt-1 mb-3">
                    {ind.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-[#2A0E04]/75 font-light leading-relaxed mb-6">
                    {ind.description}
                  </p>

                  {/* Popular Products Tags */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-[#381305]/10">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C4724] block">
                      Recommended Formulations:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {ind.popularProducts.map((p) => (
                        <span
                          key={p}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#381305]/10 text-[11px] font-medium text-[#2A0E04]/80"
                        >
                          <CheckCircle2 className="w-3 h-3 text-[#C59B27]" />
                          <span>{p}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Link */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onSelectSegment(ind.id)}
                  className="w-full inline-flex items-center justify-between px-5 py-3 rounded-2xl bg-[#FAF8F5] group-hover:bg-[#381305] text-[#381305] group-hover:text-[#F3E5AB] border border-[#381305]/10 group-hover:border-[#381305] text-xs font-bold uppercase tracking-[0.16em] transition-all duration-300 cursor-pointer"
                >
                  <span>Explore Industry Range</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <MotionReveal delay={0.2} className="mt-14 rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-[#381305] via-[#4A1704] to-[#2A0E04] text-[#FAF8F5] border border-[#C59B27]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#FECF6A] block">
              Commercial Trade Concierge
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl font-bold">
              Require a Custom Melt Curve or Bulk Tonnage Supply?
            </h4>
            <p className="text-xs sm:text-sm text-[#FAF8F5]/80 max-w-xl font-light">
              Our food scientists and master chocolatiers formulate custom viscosity and crystallization curves tailored to your exact manufacturing equipment.
            </p>
          </div>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="shrink-0 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FAD674] via-[#E6C280] to-[#C59B27] hover:brightness-105 text-[#2A0E04] text-xs font-bold uppercase tracking-[0.2em] shadow-lg cursor-pointer"
          >
            Request Custom Consultation
          </motion.a>
        </MotionReveal>

      </div>
    </section>
  );
};
