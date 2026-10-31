import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const Gr8rFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Do You Offer Commercial Bakery Sample Kits?',
      a: 'Yes! Commercial bakeries, luxury hotels, and confectionery artists can request our complimentary trade sample kit. We dispatch insulated tasting boxes containing our signature buttons, slabs, and fillings directly to your kitchen.',
    },
    {
      q: 'Do I Need To Temper ROMAS Compound Slabs & Buttons?',
      a: 'No! ROMAS Compounds are formulated with a non-temper confectionery fat matrix. Simply melt gently between 40°C–45°C, and they set with a crisp snap and high mirror sheen without marble-slab seeding curves.',
    },
    {
      q: 'How Should Chocolate Be Stored In Peak Summer?',
      a: 'Store sealed in a cool, dry place between 18°C–22°C away from direct sunlight. Our resealable airtight gold zipper pouch locks out tropical humidity, preventing fat bloom.',
    },
    {
      q: 'Are All ROMAS Confectionery Products 100% Vegetarian?',
      a: 'Yes, 100%. All ROMAS chocolates carry the green vegetarian dot and are manufactured in our certified facility in Dhamtari, Chhattisgarh, following strict FSSAI central standards without any animal fats.',
    },
    {
      q: 'Do You Provide Tonnage Cartons For Industrial Lines?',
      a: 'For industrial and high-volume commercial bakeries, we supply 10kg master cartons with individual 1kg or 2.5kg inner blocks, as well as palletized bulk lots and customized temperature formulations.',
    },
    {
      q: 'Can I Order Custom Formulations & Viscosity?',
      a: 'Yes. Our technical food scientists engineer custom melting curves, cocoa percentages, and fluidity calibrations tailored to your exact manufacturing equipment.',
    },
  ];

  return (
    <section className="py-24 sm:py-36 bg-[#F8F5F1] text-[#381A0E] border-t border-[#381A0E]/10 select-none">
      <div className="max-w-4xl mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span
            className="text-xs font-black tracking-[0.25em] uppercase text-[#8C4724] block mb-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            FAQS
          </span>

          <h2
            className="text-4xl sm:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-[#381A0E] leading-[0.9]"
            style={{ fontFamily: "'Cabin Condensed', 'Bayon', Impact, sans-serif" }}
          >
            EVERYTHING YOU
            <br />
            NEED TO KNOW
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="rounded-3xl border border-[#381A0E]/10 bg-white overflow-hidden shadow-sm hover:border-[#F9BD03] transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span
                    className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#381A0E]"
                    style={{ fontFamily: "'Cabin Condensed', 'Bayon', Impact, sans-serif" }}
                  >
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className={`w-9 h-9 rounded-full border border-[#381A0E]/10 flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-[#381A0E] text-[#F9BD03]' : 'bg-[#FAF8F5] text-[#381A0E]'
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
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-xs sm:text-sm text-[#381A0E]/75 font-light leading-relaxed">
                        <p className="pt-2 border-t border-[#381A0E]/10">
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

