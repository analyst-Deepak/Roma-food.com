import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Award, ShieldCheck } from 'lucide-react';

export const Gr8rFeatures: React.FC = () => {
  const features = [
    {
      num: '01',
      title: 'Single-Origin Cocoa Beans',
      desc: 'Carefully selected sun-dried beans for exceptional cocoa depth in every creation.',
      icon: Sparkles,
    },
    {
      num: '02',
      title: 'Freshly Conched Every Day',
      desc: 'Handcrafted with passion at our Dhamtari works, delivering rich flavor in every batch.',
      icon: Heart,
    },
    {
      num: '03',
      title: 'Master Chocolatiers',
      desc: 'Micro-refined under 20 microns on order for the silky, zero-waxy melt experience.',
      icon: Award,
    },
    {
      num: '04',
      title: 'Pure Chocolate Assurance',
      desc: '100% vegetarian, FSSAI certified chocolate solutions trusted by luxury bakeries nationwide.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#381A0E] text-[#FEE8B4] border-t border-[#FEE8B4]/10 select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span
            className="text-xs font-black tracking-[0.25em] uppercase text-[#F9BD03] block mb-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            OUR COMMITMENT
          </span>

          <h2
            className="text-4xl sm:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-[#FEE8B4] leading-[0.9]"
            style={{ fontFamily: "'Cabin Condensed', 'Bayon', Impact, sans-serif" }}
          >
            EVERY BITE,
            <br />
            PERFECTLY CRAFTED
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
                className="rounded-3xl p-8 bg-[#2A130A] border border-[#FEE8B4]/10 hover:border-[#F9BD03] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-[#FEE8B4]/10 mb-6">
                    <span
                      className="text-3xl font-bold text-[#F9BD03]"
                      style={{ fontFamily: "'Cabin Condensed', 'Bayon', sans-serif" }}
                    >
                      {feat.num}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-[#381A0E] flex items-center justify-center text-[#F9BD03]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3
                    className="text-2xl font-bold uppercase tracking-tight text-[#FEE8B4] mb-3 leading-snug"
                    style={{ fontFamily: "'Cabin Condensed', 'Bayon', Impact, sans-serif" }}
                  >
                    {feat.title}
                  </h3>

                  <p className="text-xs text-[#FEE8B4]/70 font-light leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#FEE8B4]/10 flex items-center justify-between text-xs font-mono text-[#F9BD03]">
                  <span>ROMAS Quality</span>
                  <span className="w-2 h-2 rounded-full bg-[#F9BD03]" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

