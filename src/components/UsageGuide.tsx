import React, { useState } from 'react';
import { Cake, Cookie, IceCream, Sparkles, ChefHat, ArrowRight } from 'lucide-react';
import { USAGE_APPLICATIONS } from '../data/products';
import { Reveal } from './Reveal';

interface UsageGuideProps {
  onSelectProduct: (productId: string) => void;
}

export const UsageGuide: React.FC<UsageGuideProps> = ({ onSelectProduct }) => {
  const [activeTab, setActiveTab] = useState<string>('cakes');
  const currentApp = USAGE_APPLICATIONS.find((a) => a.id === activeTab) || USAGE_APPLICATIONS[0];

  const iconMap: Record<string, React.FC<{ className?: string }>> = {
    Cake: Cake,
    Cookie: Cookie,
    IceCream: IceCream,
    Sparkles: Sparkles,
  };

  return (
    <section id="applications" className="py-24 sm:py-36 bg-[#FAF6F0] text-[#1A0A04] border-t border-[#1A0A04]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <Reveal className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-[#8C4724] mb-4">
            <ChefHat className="w-4 h-4 text-[#D4AF37]" />
            <span>Official Application Studio</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-[#1A0A04] leading-tight text-balance">
            Where to Use ROMAS
          </h2>
          <p className="mt-5 text-sm sm:text-base text-[#1A0A04]/75 leading-relaxed font-light">
            As featured on our official packaging: discover how to elevate entremets, cookies, sundaes,
            and laminated viennoiseries with ROMAS chocolate compounds and inclusions.
          </p>
        </Reveal>

        {/* Application Navigation Tabs */}
        <div className="mt-14 flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-2 bg-[#1A0A04]/5 rounded-2xl sm:rounded-full max-w-3xl w-full border border-[#1A0A04]/10">
            {USAGE_APPLICATIONS.map((app) => {
              const Icon = iconMap[app.iconName] || ChefHat;
              const isSelected = activeTab === app.id;

              return (
                <button
                  key={app.id}
                  onClick={() => setActiveTab(app.id)}
                  className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl sm:rounded-full text-xs font-bold uppercase tracking-[0.16em] transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#F9E7B9] via-[#E6C280] to-[#B8860B] text-[#140602] shadow-lg shadow-black/30'
                      : 'text-[#1A0A04]/70 hover:text-[#1A0A04] hover:bg-white/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="truncate">{app.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Application Feature Card */}
        <div className="mt-10 max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-[#1A0A04]/10 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            
            <div className="md:col-span-8 space-y-5">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E6C280] bg-[#1A0A04] px-3.5 py-1.5 rounded-full inline-block">
                {currentApp.subtitle}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A0A04]">
                {currentApp.title}
              </h3>
              <p className="text-sm sm:text-base text-[#1A0A04]/80 leading-relaxed font-light">
                {currentApp.description}
              </p>

              {/* Pro Tip */}
              <div className="p-5 rounded-2xl bg-[#F3ECE1] border border-[#1A0A04]/10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C4724] block mb-1">
                  Pâtisserie Kitchen Tip:
                </span>
                <p className="text-xs sm:text-sm text-[#1A0A04]/80 italic leading-relaxed font-serif">
                  "{currentApp.tip}"
                </p>
              </div>
            </div>

            <div className="md:col-span-4 bg-[#FAF6F0] p-6 rounded-2xl border border-[#D4AF37]/30 flex flex-col justify-between h-full space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C4724] block mb-1">
                  Recommended Medium:
                </span>
                <h4 className="font-serif font-bold text-xl text-[#1A0A04]">
                  {currentApp.recommendedProduct}
                </h4>
                <p className="text-xs text-[#1A0A04]/65 mt-1 font-light">
                  Available in 500g, 1kg & 10kg zipper barrier cartons.
                </p>
              </div>

              <a
                href="#chocolates"
                className="w-full py-3 px-4 text-xs font-bold uppercase tracking-[0.18em] text-center text-[#140602] bg-gradient-to-r from-[#F9E7B9] via-[#E6C280] to-[#B8860B] hover:brightness-110 rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <span>View Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
