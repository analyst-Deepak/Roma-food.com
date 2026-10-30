import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Award, Heart, Sparkles, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO, IMAGES } from '../data/products';
import { MotionReveal } from './MotionReveal';
import { RomasLogo } from './RomasLogo';

interface BrandStoryProps {
  onContactClick: () => void;
}

export const BrandStory: React.FC<BrandStoryProps> = ({ onContactClick }) => {
  const [activeMilestone, setActiveMilestone] = useState(0);

  const framerEase = [0.16, 1, 0.3, 1] as const;

  const milestones = [
    {
      era: 'Foundations',
      title: 'Roots in Chhattisgarh',
      tagline: 'Pure Passion for Joyful Confectionery',
      description:
        'Born under Roma Foods in Dhamtari, ROMAS was founded with a singular purpose: to craft unadulterated chocolates and confectionery that elevate celebratory moments and spread pure happiness in every home.',
      stat: '100% Pure Heritage',
    },
    {
      era: 'Breakthrough',
      title: 'The Non-Temper Formula',
      tagline: 'Engineering the Perfect 42°C Melt',
      description:
        'Mastering the tropical climate of India: our food technologists perfected a proprietary confectionery fat matrix that melts like silk, sets with a glassy mirror sheen, and saves busy commercial bakeries hours of complex tempering.',
      stat: '0% Waxy Residue',
    },
    {
      era: 'Packaging Pride',
      title: 'Gold Barrier Freshness',
      tagline: 'Resealable Airtight Zipper Innovation',
      description:
        'Recognizing that humidity and heat are the enemies of fine chocolate, ROMAS engineered multi-layer nitrogen-flushed gold pouches with airtight zipper locks to guarantee factory freshness on the baker’s bench.',
      stat: '100% Moisture Lock',
    },
    {
      era: 'Scale & Trust',
      title: 'Modern Works & Pan-India Reach',
      tagline: 'Powering 500+ Bakeries & Pastry Chefs',
      description:
        'With FSSAI Central License #10526005000033 and advanced automated refining machinery in Dhamtari, ROMAS now powers premier patisseries, luxury hotels, and dessert brands across India with temperature-controlled logistics.',
      stat: '500+ Trade Partners',
    },
  ];

  return (
    <section id="story" className="py-24 sm:py-36 bg-[#FBF8F3] text-[#2A0E04] relative overflow-hidden border-t border-[#381305]/10">
      {/* Decorative Glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#FAD674]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <MotionReveal className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#381305]/5 border border-[#381305]/15 text-[#8C4724] text-[11px] font-bold uppercase tracking-[0.22em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27]" />
            <span>The ROMAS Heritage & Craft</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-[#2A0E04] leading-tight">
            Crafting Happiness Since Day One
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#2A0E04]/75 font-light leading-relaxed">
            From the fertile heartland of Dhamtari, Chhattisgarh to high-end dessert counters across India —
            the story of Roma Foods is one of unrelenting devotion to taste, science, and celebration.
          </p>
        </MotionReveal>

        {/* Interactive Milestones Timeline with Framer Spring Layout */}
        <div className="mb-20 max-w-5xl mx-auto">
          {/* Milestone Era Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 p-1.5 rounded-2xl bg-white border border-[#381305]/10 shadow-sm mb-8 relative">
            {milestones.map((m, idx) => {
              const isSelected = activeMilestone === idx;
              return (
                <button
                  key={m.era}
                  onClick={() => setActiveMilestone(idx)}
                  className={`relative py-3 px-3 rounded-xl text-center transition-colors cursor-pointer ${
                    isSelected ? 'text-[#FAD674] font-bold' : 'text-[#2A0E04]/70 hover:text-[#2A0E04]'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeMilestonePill"
                      className="absolute inset-0 rounded-xl bg-[#381305] shadow-md"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 text-[10px] font-bold uppercase tracking-wider block opacity-75">
                    Phase 0{idx + 1}
                  </span>
                  <span className="relative z-10 text-xs font-bold uppercase tracking-wider block mt-0.5 truncate">
                    {m.era}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Milestone Card with AnimatePresence */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#381305]/10 shadow-xl relative overflow-hidden min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMilestone}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: framerEase }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                <div className="md:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C59B27]">
                    <Sparkles className="w-4 h-4" />
                    <span>{milestones[activeMilestone].tagline}</span>
                  </div>
                  
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#381305]">
                    {milestones[activeMilestone].title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#2A0E04]/80 leading-relaxed font-light">
                    {milestones[activeMilestone].description}
                  </p>

                  <div className="pt-2 flex items-center gap-3">
                    <div className="px-3.5 py-1.5 rounded-full bg-[#FAD674]/30 text-[#381305] text-xs font-bold uppercase tracking-wider border border-[#C59B27]/40">
                      {milestones[activeMilestone].stat}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-4 flex justify-center">
                  <div className="p-4 rounded-3xl bg-[#FAF8F5] border border-[#381305]/10 shadow-inner flex flex-col items-center text-center">
                    <RomasLogo variant="badge" size="md" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C4724] mt-3">
                      Roma Foods Verified
                    </span>
                    <span className="text-[11px] text-[#2A0E04]/70 font-light mt-1">
                      Dhamtari, Chhattisgarh
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 2-Column Story Grid: Image & Corporate Standards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <MotionReveal className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#381305]/10 bg-[#0E0502] aspect-[4/3] relative group">
              <img
                src={IMAGES.craftsmanship}
                alt="Master chocolatier tempering smooth molten chocolate on marble table"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-[#FAF6F0]">
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#FAD674] block mb-1">
                  Artisanal Heritage · Dhamtari Works
                </span>
                <p className="font-serif text-2xl font-bold">
                  Refined for Exceptional Gloss, Flow & Pure Cocoa Aroma
                </p>
              </div>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.15} className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#8C4724]">
              <span className="w-8 h-[1px] bg-[#C59B27]" />
              <span>Confectionery Standards</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A0E04]">
              Manufacturing with Rigor, Crafting with Joy
            </h3>

            <p className="text-sm sm:text-base text-[#2A0E04]/80 leading-relaxed font-light">
              Unlike ordinary commodity compounds that cut corners with unrefined fats and artificial gums,
              every batch of ROMAS undergoes automated particle-size verification to ensure it remains below
              20 microns. The result is pure, silky indulgence that coats the palate with joy instead of grease.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-[#2A0E04]/85">
                <CheckCircle2 className="w-4 h-4 text-[#C59B27] shrink-0" />
                <span>Micro-milled cocoa solids ensuring velvety texture in mousses and glazes</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#2A0E04]/85">
                <CheckCircle2 className="w-4 h-4 text-[#C59B27] shrink-0" />
                <span>Zero fat bloom during summer transit thanks to temperature-tuned confectionery fats</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#2A0E04]/85">
                <CheckCircle2 className="w-4 h-4 text-[#C59B27] shrink-0" />
                <span>100% Pure Vegetarian certification backed by central FSSAI registration</span>
              </div>
            </div>

            <div className="pt-4">
              <motion.button
                onClick={onContactClick}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="px-8 py-3.5 rounded-full bg-[#381305] hover:bg-[#4A1704] text-[#FAF8F5] text-xs font-bold uppercase tracking-[0.18em] shadow-md cursor-pointer flex items-center gap-2"
              >
                <span>Partner With The Maison</span>
                <ArrowRight className="w-4 h-4 text-[#FAD674]" />
              </motion.button>
            </div>
          </MotionReveal>

        </div>

      </div>
    </section>
  );
};
