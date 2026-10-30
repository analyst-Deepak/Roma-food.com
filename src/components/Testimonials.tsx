import React from 'react';
import { Quote, Star } from 'lucide-react';
import { Reveal } from './Reveal';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote:
        'The flow rate and viscosity of ROMAS Milk Compound Buttons makes drip cakes and mirror glazes an absolute breeze. Zero grittiness and a brilliant sheen every single time.',
      name: 'Chef Ananya Sharma',
      role: 'Head Pastry Chef · Velvet Crumb Studio',
      product: 'ROMAS Milk Compound Buttons',
    },
    {
      quote:
        'We switched to ROMAS for our artisan cookie production. The chocolate buttons hold their plump shape during baking while remaining meltingly soft inside.',
      name: 'Vikram Mehta',
      role: 'Founder · The Artisan Bakehouse',
      product: 'ROMAS Bake-Stable Chips',
    },
    {
      quote:
        'For our annual corporate Diwali gift hampers, ROMAS delivered custom ribbon boxes that received phenomenal feedback from our partners across India.',
      name: 'Pooja Singhania',
      role: 'Corporate Communications Director',
      product: 'ROMAS Celebration Gift Box',
    },
  ];

  return (
    <section className="py-24 sm:py-36 bg-[#FAF6F0] text-[#1A0A04] border-t border-[#1A0A04]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <Reveal className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-[#8C4724] mb-4">
            <Quote className="w-4 h-4 text-[#D4AF37]" />
            <span>Community & Kitchen Voices</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-[#1A0A04] leading-tight text-balance">
            Loved by Pastry Artisans & Celebrations
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-[#1A0A04]/65 font-light text-balance">
            Feedback and tasting notes from commercial kitchens, confectionery partners, and celebration recipients.
          </p>
        </Reveal>

        {/* Testimonials 3-Column Grid */}
        <Reveal className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 sm:p-10 rounded-3xl bg-white border border-[#1A0A04]/10 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#D4AF37] mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="font-serif text-lg sm:text-xl text-[#1A0A04] italic leading-relaxed font-normal">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-gray-100">
                <h4 className="font-serif text-base font-bold text-[#1A0A04]">{t.name}</h4>
                <p className="text-xs text-[#1A0A04]/60 mt-0.5 font-light">{t.role}</p>
                <span className="inline-block mt-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8C4724] bg-[#FAF6F0] px-3 py-1 rounded-full">
                  Ref: {t.product}
                </span>
              </div>
            </div>
          ))}
        </Reveal>

      </div>
    </section>
  );
};
