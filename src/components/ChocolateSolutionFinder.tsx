import React, { useState } from 'react';
import { Droplets, Compass } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface ChocolateSolutionFinderProps {
  onRequestSample: (product: Product) => void;
  onExploreProduct: (productId: string) => void;
}

export const ChocolateSolutionFinder: React.FC<ChocolateSolutionFinderProps> = ({
  onRequestSample,
  onExploreProduct,
}) => {
  const [selectedApplication, setSelectedApplication] = useState<string>('glaze');
  const [selectedPreference, setSelectedPreference] = useState<'compound' | 'couverture' | 'filling'>('compound');

  let matchedProductId = 'milk-compound-buttons';
  if (selectedApplication === 'glaze') {
    matchedProductId = selectedPreference === 'couverture' ? 'dark-couverture-55-callets' : 'dark-compound-buttons-slabs';
  } else if (selectedApplication === 'baking') {
    matchedProductId = 'bake-stable-chocolate-chips';
  } else if (selectedApplication === 'fillings') {
    matchedProductId = 'bake-stable-choco-filling';
  } else if (selectedApplication === 'icecream') {
    matchedProductId = 'milk-compound-buttons';
  } else if (selectedApplication === 'truffles') {
    matchedProductId = selectedPreference === 'couverture' ? 'intense-dark-couverture-70' : 'milk-compound-buttons';
  }

  const matchedProduct = PRODUCTS.find((p) => p.id === matchedProductId) || PRODUCTS[0];

  return (
    <section className="py-24 sm:py-36 bg-[#FAF8F5] text-[#2A0E04] relative overflow-hidden border-t border-[#381305]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-[#8C4724] mb-4">
            <Compass className="w-4 h-4 text-[#C59B27]" />
            <span>Chocolatier Formulation Advisor</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-[#2A0E04] leading-tight text-balance">
            Find Your Ideal Chocolate Solution
          </h2>
          <p className="mt-5 text-sm sm:text-base text-[#2A0E04]/75 leading-relaxed font-light text-balance">
            Calibrated for professional output. Select your pastry creation and formulation needs to reveal the exact ROMAS compound, couverture, or filling.
          </p>
        </div>

        {/* Advisor Interactive Box */}
        <div className="mt-16 max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-[#381305]/10 shadow-[0_20px_50px_rgba(42,14,4,0.06)]">
          <div className="space-y-10">
            
            {/* Step 1: Application selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C4724] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#C59B27] text-white flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <span>Select Your Pastry or Confectionery Application:</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { id: 'glaze', label: 'Mirror Glaze & Drips' },
                  { id: 'baking', label: 'Cookies & Brownies' },
                  { id: 'fillings', label: 'Croissants & Buns' },
                  { id: 'truffles', label: 'Moulded Bonbons' },
                  { id: 'icecream', label: 'Ice Cream Dips' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedApplication(item.id)}
                    className={`py-3.5 px-3 rounded-2xl text-xs font-bold uppercase tracking-wider text-center transition-all duration-300 cursor-pointer ${
                      selectedApplication === item.id
                        ? 'bg-[#381305] text-[#FAF8F5] shadow-md shadow-[#381305]/20'
                        : 'bg-[#FAF8F5] text-[#381305]/75 hover:bg-[#F3ECE1] hover:text-[#2A0E04] border border-[#381305]/10'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Formulation preference */}
            <div>
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C4724] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#C59B27] text-white flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <span>Select Required Technical Formulation:</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    id: 'compound',
                    title: 'Non-Temper Compound',
                    desc: 'Fast melting, high surface gloss, zero tempering required. For high-volume production.',
                  },
                  {
                    id: 'couverture',
                    title: 'Pure Cocoa Butter Couverture',
                    desc: '100% real cocoa butter. Snap and mouthfeel for haute chocolaterie.',
                  },
                  {
                    id: 'filling',
                    title: 'Bake-Stable Pipeable Cream',
                    desc: 'Oven-proof up to 200°C without burning or drying out inside dough.',
                  },
                ].map((pref) => (
                  <button
                    key={pref.id}
                    onClick={() => setSelectedPreference(pref.id as any)}
                    className={`p-5 rounded-2xl text-left transition-all duration-300 cursor-pointer ${
                      selectedPreference === pref.id
                        ? 'bg-[#FAF8F5] text-[#2A0E04] border-2 border-[#C59B27] shadow-md'
                        : 'bg-white text-[#381305]/70 hover:bg-[#FAF8F5] border border-[#381305]/10'
                    }`}
                  >
                    <span className="font-bold text-xs uppercase tracking-wider block mb-1 text-[#8C4724]">
                      {pref.title}
                    </span>
                    <span className="text-xs block leading-relaxed font-light">
                      {pref.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Match Result */}
            <div className="pt-8 border-t border-[#381305]/10">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF8F5] border border-[#C59B27]/40 flex flex-col md:flex-row items-center gap-6 justify-between">
                
                <div className="flex items-center gap-5">
                  <img
                    src={matchedProduct.image}
                    alt={matchedProduct.name}
                    className="w-24 h-24 rounded-2xl object-cover bg-white shrink-0 border border-[#381305]/10 shadow-md"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white bg-[#C59B27] px-2.5 py-0.5 rounded-full">
                        Recommended Solution
                      </span>
                      {matchedProduct.fluidity && (
                        <span className="text-[11px] text-[#8C4724] flex items-center gap-1 font-mono font-medium">
                          <Droplets className="w-3.5 h-3.5 text-[#C59B27]" />
                          Fluidity: {matchedProduct.fluidity}/5
                        </span>
                      )}
                    </div>
                    <h4 className="font-serif text-2xl font-bold text-[#2A0E04] mt-1.5">
                      {matchedProduct.name}
                    </h4>
                    <p className="text-xs text-[#2A0E04]/70 mt-0.5 line-clamp-1 font-light">
                      {matchedProduct.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button
                    onClick={() => onRequestSample(matchedProduct)}
                    className="flex-1 md:flex-none px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-[#140602] bg-gradient-to-r from-[#F9E7B9] via-[#E6C280] to-[#C59B27] hover:brightness-105 active:scale-95 rounded-full transition-all shadow-md whitespace-nowrap cursor-pointer"
                  >
                    Request Sample Pack
                  </button>
                  <button
                    onClick={() => onExploreProduct(matchedProduct.id)}
                    className="flex-1 md:flex-none px-5 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#381305] hover:text-[#2A0E04] bg-white hover:bg-[#F3ECE1] rounded-full border border-[#381305]/20 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    View Specs
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
