import React, { useState } from 'react';
import { Gift, Check } from 'lucide-react';
import { IMAGES } from '../data/products';
import { Reveal } from './Reveal';

interface GiftingSectionProps {
  onInquireGifting: () => void;
}

export const GiftingSection: React.FC<GiftingSectionProps> = ({ onInquireGifting }) => {
  const [selectedOccasion, setSelectedOccasion] = useState<string>('corporate');

  const occasions = [
    {
      id: 'corporate',
      title: 'Corporate & Executive Gifting',
      desc: 'Bespoke presentation hampers with gold foil client branding, personalized ribbons, and curated confectionery flights.',
      minOrder: '50 Hampers',
      leadTime: '7–10 Days',
    },
    {
      id: 'weddings',
      title: 'Wedding Favours & Milestones',
      desc: 'Sophisticated truffle gift boxes matched to couture celebration palettes for memorable guest appreciation.',
      minOrder: '100 Boxes',
      leadTime: '14 Days',
    },
    {
      id: 'festive',
      title: 'Diwali & New Year Hampers',
      desc: 'Ceremonial presentation boxes blending handcrafted truffles, chocolate tablets, and festive confectionery delicacies.',
      minOrder: '25 Hampers',
      leadTime: '5 Days',
    },
  ];

  const currentOccasion = occasions.find((o) => o.id === selectedOccasion) || occasions[0];

  return (
    <section id="gifting" className="py-24 sm:py-36 bg-[#FAF8F5] text-[#2A0E04] overflow-hidden relative border-t border-[#381305]/10">
      {/* Decorative Warm Gold Glow */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#FECF6A]/15 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-[#8C4724] mb-4">
            <Gift className="w-4 h-4 text-[#C59B27]" />
            <span>Ceremonial & Corporate Atelier</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-bold leading-tight text-[#2A0E04] text-balance">
            Make Every Celebration Sweeter.
          </h2>
          <p className="mt-5 text-sm sm:text-base text-[#2A0E04]/75 leading-relaxed font-light text-balance">
            Find an exquisite chocolate gift for special occasions, grand weddings, and corporate milestones.
            We craft personalized luxury hampers and bespoke chocolate tablets.
          </p>
        </Reveal>

        {/* Main Gifting Showcase */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Luxury Photography */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden bg-white border border-[#381305]/10 shadow-[0_20px_50px_rgba(42,14,4,0.06)] group">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={IMAGES.giftingBox}
                  alt="Luxury ROMAS celebration chocolate gift box tied with golden ribbon"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Tag overlay */}
              <div className="absolute top-5 left-5 px-3.5 py-1 rounded-full bg-[#381305]/90 backdrop-blur-md text-[#FAF8F5] text-[10px] font-bold tracking-[0.2em] uppercase border border-[#C59B27]/40">
                Celebration Collection
              </div>

              <div className="p-7 bg-[#FAF8F5] border-t border-[#381305]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif text-2xl font-bold text-[#2A0E04]">
                    ROMAS Bespoke Gift Hampers
                  </h4>
                  <p className="text-xs text-[#2A0E04]/70 mt-1 font-light">
                    Includes artisan truffles, embossed chocolate tablets & festive satin ribbons
                  </p>
                </div>
                <button
                  onClick={onInquireGifting}
                  className="px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-[#140602] bg-gradient-to-r from-[#F9E7B9] via-[#E6C280] to-[#C59B27] rounded-full transition-all cursor-pointer whitespace-nowrap shadow-md hover:brightness-105 self-start sm:self-auto"
                >
                  Custom Quote
                </button>
              </div>
            </div>
          </div>

          {/* Right: Occasion Details */}
          <div className="lg:col-span-6 space-y-8">
            {/* Occasion Selector */}
            <div className="grid grid-cols-3 gap-2.5 p-2 bg-white rounded-2xl sm:rounded-full border border-[#381305]/10 shadow-sm">
              {occasions.map((occ) => (
                <button
                  key={occ.id}
                  onClick={() => setSelectedOccasion(occ.id)}
                  className={`py-3 px-3 rounded-xl sm:rounded-full text-xs font-bold uppercase tracking-[0.16em] transition-all duration-300 cursor-pointer truncate ${
                    selectedOccasion === occ.id
                      ? 'bg-[#381305] text-[#FAF8F5] shadow-md'
                      : 'text-[#381305]/70 hover:text-[#2A0E04]'
                  }`}
                >
                  {occ.title.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Selected Occasion Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#381305]/10 shadow-[0_20px_50px_rgba(42,14,4,0.06)] space-y-6">
              <h3 className="font-serif text-3xl font-bold text-[#2A0E04]">
                {currentOccasion.title}
              </h3>

              <p className="text-sm text-[#2A0E04]/80 leading-relaxed font-light">
                {currentOccasion.desc}
              </p>

              <div className="grid grid-cols-2 gap-6 py-5 border-y border-[#381305]/10 text-xs">
                <div>
                  <span className="text-[#2A0E04]/55 block text-[10px] uppercase tracking-[0.2em]">
                    Minimum Production Batch
                  </span>
                  <span className="font-mono text-lg font-bold text-[#2A0E04] mt-1 block">
                    {currentOccasion.minOrder}
                  </span>
                </div>
                <div>
                  <span className="text-[#2A0E04]/55 block text-[10px] uppercase tracking-[0.2em]">
                    Dispatch Lead Time
                  </span>
                  <span className="font-mono text-lg font-bold text-[#2A0E04] mt-1 block">
                    {currentOccasion.leadTime}
                  </span>
                </div>
              </div>

              {/* Customization Options */}
              <div className="space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8C4724]">
                  Bespoke Services Included:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#2A0E04]/80">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#C59B27]" />
                    <span>Company Foil Stamping</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#C59B27]" />
                    <span>Personalized Greeting Note</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#C59B27]" />
                    <span>Satin Ribbon Coordination</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#C59B27]" />
                    <span>Pan-India Temperature Courier</span>
                  </li>
                </ul>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <button
                  onClick={onInquireGifting}
                  className="w-full py-4 px-6 text-xs font-bold uppercase tracking-[0.22em] text-[#140602] bg-gradient-to-r from-[#F9E7B9] via-[#E6C280] to-[#C59B27] hover:brightness-105 active:scale-95 rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Gift className="w-4 h-4" />
                  <span>Enquire For Bespoke Gifting</span>
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
