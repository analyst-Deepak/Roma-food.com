import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { MotionReveal } from './MotionReveal';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const framerEase = [0.16, 1, 0.3, 1] as const;

  const faqs = [
    {
      q: 'Do I need to temper ROMAS Compound Buttons or Slabs?',
      a: 'No! ROMAS Compounds are specifically engineered with a non-temper confectionery fat matrix. Simply melt them gently between 40°C–45°C in a microwave or double boiler, and they will set with a clean snap and mirror gloss without requiring marble-slab seeding curves.',
    },
    {
      q: 'What is the difference between ROMAS Compound and Real Couverture?',
      a: 'ROMAS Compounds use specialty vegetable fats in place of cocoa butter for zero-temper convenience and tropical stability. ROMAS Couvertures, on the other hand, contain 100% pure cocoa butter (available in 45%, 55%, and 70% Single Origin), which requires traditional tempering (45°C -> 27°C -> 31°C) for artisanal bonbons and high-end tableting.',
    },
    {
      q: 'How should ROMAS chocolates be stored in peak Indian summers?',
      a: 'Store sealed in a cool, dry place away from direct sunlight, ideally between 18°C–22°C with humidity below 60%. Our resealable airtight gold zipper pouch locks out moisture, so always zip the pouch closed after scooping out your batch.',
    },
    {
      q: 'Are all ROMAS confectionery products 100% Vegetarian?',
      a: 'Yes, 100%. All ROMAS products carry the green vegetarian dot and are manufactured in our certified facility in Dhamtari, Chhattisgarh, following strict FSSAI central standards without any animal fats or gelatin.',
    },
    {
      q: 'How can our bakery or hotel request a complimentary trade sample box?',
      a: 'Commercial bakeries, pastry chefs, and catering managers can click "Trade Sample Kit" in the header or submit an inquiry through our Trade Concierge. Our technical desk qualifies the request and dispatches an insulated sample kit directly to your kitchen.',
    },
    {
      q: 'What bulk packaging options are available for high-volume manufacturers?',
      a: 'For industrial and high-volume commercial bakeries, we supply 10kg master cartons with individual 1kg or 2.5kg inner blocks, as well as palletized bulk lots and customized temperature formulations for high-speed wrapping lines.',
    },
  ];

  return (
    <section id="faq" className="py-24 sm:py-32 bg-white text-[#2A0E04] border-t border-[#381305]/10 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <MotionReveal className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-[#381305]/10 text-[#8C4724] text-[11px] font-bold uppercase tracking-[0.22em] mb-4 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Pastry Chef & Trade Inquiries</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#2A0E04] leading-tight tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#2A0E04]/70 font-light leading-relaxed">
            Everything you need to know about melting performance, storage stability, and commercial trade supply.
          </p>
        </MotionReveal>

        {/* Accordion List with Framer Height Animation */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: framerEase }}
                className="rounded-3xl border border-[#381305]/10 bg-[#FAF8F5] overflow-hidden transition-colors hover:border-[#C59B27]/40 shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-serif text-lg sm:text-xl font-bold text-[#381305]">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className={`w-8 h-8 rounded-full border border-[#381305]/15 flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-[#381305] text-[#FAD674]' : 'bg-white text-[#381305]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: framerEase }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-xs sm:text-sm text-[#2A0E04]/75 font-light leading-relaxed">
                        <p className="pt-2 border-t border-[#381305]/10">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
