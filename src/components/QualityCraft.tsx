import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';
import { Reveal } from './Reveal';

export const QualityCraft: React.FC = () => {
  const qualityPillars = [
    {
      title: 'Formulation Balance',
      desc: 'Carefully calibrated cocoa solids and premium confectionery fats ensure a silky mouthfeel without waxiness or oily residue.',
      metric: 'Optimal Cocoa Curve',
    },
    {
      title: 'Flow & Viscosity Precision',
      desc: 'Calibrated viscosity delivers easy dipping, smooth mould release, and glossy mirror finishes without requiring complex tempering.',
      metric: 'Easy-Melt Compound',
    },
    {
      title: 'Moisture-Lock Packaging',
      desc: 'Our signature warm-yellow barrier pouches protect the chocolates from humidity, temperature fluctuation, and foreign odors.',
      metric: 'Zipper Freshness',
    },
    {
      title: 'Versatile Confectionery Performance',
      desc: 'From high-temperature cookie baking to chilled pastry glazes, ROMAS buttons hold their integrity under demanding bakery conditions.',
      metric: 'Kitchen Tested',
    },
  ];

  return (
    <section id="craftsmanship" className="py-24 sm:py-36 bg-[#FAF6F0] text-[#1A0A04] border-t border-[#1A0A04]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <Reveal className="max-w-3xl">
          <div className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-[#8C4724] mb-4">
            <span className="w-8 h-[1px] bg-[#D4AF37]" />
            <span>Standards of Haute Confectionery</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-[#1A0A04] leading-tight text-balance">
            Every Detail Deserves Attention.
          </h2>
          <p className="mt-5 text-sm sm:text-base text-[#1A0A04]/75 leading-relaxed font-light text-balance">
            Crafting confectionery that consistently performs in high-volume commercial bakeries while
            delighting gourmet dessert artisans requires exacting standards. Discover how Roma Foods
            engineers the ROMAS chocolate experience.
          </p>
        </Reveal>

        {/* Quality Cards Grid */}
        <Reveal className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {qualityPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-[#1A0A04]/10 hover:border-[#D4AF37] shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#8C4724] font-mono mb-6">
                  <span>Standard 0{idx + 1}</span>
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1A0A04] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#1A0A04]/70 leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100">
                <span className="text-[10px] uppercase font-bold tracking-[0.18em] text-[#8C4724] bg-[#FAF6F0] px-3 py-1.5 rounded-full block text-center">
                  {pillar.metric}
                </span>
              </div>
            </div>
          ))}
        </Reveal>

        {/* Certified Compliance Banner */}
        <Reveal className="mt-16 p-8 rounded-3xl bg-[#1A0A04] text-[#FAF6F0] border border-[#D4AF37]/35 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <ShieldCheck className="w-8 h-8 text-[#D4AF37] shrink-0" />
            <div>
              <span className="font-serif font-bold text-xl block text-[#FAF6F0]">
                FSSAI Certified Manufacturing Facility
              </span>
              <span className="text-xs text-[#FAF6F0]/70 font-light mt-0.5 block">
                Manufactured under License #{COMPANY_INFO.fssaiNumber} at {COMPANY_INFO.address}.
              </span>
            </div>
          </div>
          <a
            href="#contact"
            className="px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#140602] bg-gradient-to-r from-[#F9E7B9] via-[#E6C280] to-[#B8860B] hover:brightness-110 rounded-full transition-all whitespace-nowrap shadow-md cursor-pointer"
          >
            Verify Factory Details
          </a>
        </Reveal>

      </div>
    </section>
  );
};
