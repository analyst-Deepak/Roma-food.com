import React, { useState } from 'react';
import { Eye, ChevronRight, Award, ShieldCheck, Check, Sparkles, X } from 'lucide-react';
import { IMAGES, PRODUCTS, COMPANY_INFO } from '../data/products';
import { RomasLogo } from './RomasLogo';

interface BrandIntroProps {
  onStoryClick: () => void;
  onExploreProduct: (productId: string) => void;
}

export const BrandIntro: React.FC<BrandIntroProps> = ({ onStoryClick, onExploreProduct }) => {
  const [showPackagingModal, setShowPackagingModal] = useState(false);
  const heroProduct = PRODUCTS[0]; // ROMAS Milk Compound Buttons

  return (
    <section id="intro" className="py-24 sm:py-32 bg-white text-[#2A0E04] overflow-hidden border-t border-[#381305]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Official Packaging as an Haute Confectionery Artifact (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden bg-[#FAF8F5] p-3 sm:p-5 shadow-2xl border border-[#381305]/10 group">
              
              {/* Product Packaging Image */}
              <div className="relative rounded-2xl overflow-hidden bg-[#F6F1EA] aspect-[4/3] sm:aspect-[16/12]">
                <img
                  src={IMAGES.officialPackaging}
                  alt="ROMAS Milk Compound Buttons official packaging with front pouch and back nutritional information"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A0E04]/60 via-transparent to-transparent pointer-events-none" />

                {/* Inspect Packaging Button Overlay */}
                <button
                  onClick={() => setShowPackagingModal(true)}
                  className="absolute bottom-5 right-5 inline-flex items-center gap-2 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#140602] bg-gradient-to-r from-[#FAD674] via-[#E6C280] to-[#C59B27] hover:brightness-105 active:scale-95 rounded-full shadow-lg transition-all cursor-pointer"
                  aria-label="Inspect official ROMAS packaging details"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Official Pouch</span>
                </button>

                {/* Top Badge */}
                <div className="absolute top-5 left-5 px-3.5 py-1 rounded-full bg-[#381305]/90 text-[#FAD674] text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md border border-[#C59B27]/40 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FAD674]" />
                  <span>Official Factory Range</span>
                </div>
              </div>

              {/* Bottom Card Summary */}
              <div className="mt-5 px-2 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[#2A0E04]">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif text-xl font-bold text-[#381305]">
                      ROMAS Milk Compound Buttons
                    </h4>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#FAD674]/30 text-[#4A1704]">
                      Non-Temper
                    </span>
                  </div>
                  <p className="text-xs text-[#2A0E04]/70 mt-0.5 font-light">
                    500g & 1kg Zipper Moisture-Barrier Pouch · 10kg Master Carton
                  </p>
                </div>

                <button
                  onClick={() => onExploreProduct(heroProduct.id)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#8C4724] hover:text-[#381305] uppercase tracking-wider shrink-0 cursor-pointer"
                >
                  <span>View Specifications</span>
                  <ChevronRight className="w-4 h-4 text-[#C59B27]" />
                </button>
              </div>

            </div>

            {/* Ambient gold glow */}
            <div
              className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#FAD674]/20 rounded-full blur-3xl pointer-events-none"
              aria-hidden="true"
            />
          </div>

          {/* Right Column: High-Fashion Editorial Storytelling (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Brand Logo & Editorial Kicker */}
            <div className="flex items-center gap-3 mb-4">
              <RomasLogo variant="brown" size="sm" showTagline={false} />
              <span className="w-8 h-[1px] bg-[#C59B27]" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8C4724]">
                Maison Roma Foods
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#2A0E04] leading-[1.1] text-balance">
              More Than Chocolate.{' '}
              <span className="italic font-normal text-gold-gradient">
                It's Spreading Happiness.
              </span>
            </h2>

            {/* Body Copy */}
            <p className="mt-6 text-base sm:text-lg text-[#2A0E04]/80 leading-relaxed font-light">
              At ROMAS, every confectionery creation is engineered to share happiness, elevate
              bakery craftsmanship, and deliver uncompromised consistency across India.
              Manufactured under strict Roma Foods quality protocols in Dhamtari, we combine
              micro-milled cocoa solids with specialty fats for an effortless gloss that never fails.
            </p>

            {/* 3 Technical Feature Highlights */}
            <div className="mt-8 space-y-4 pt-6 border-t border-[#381305]/10">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#FAD674] flex items-center justify-center shrink-0 mt-0.5 text-[#381305]">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#381305]">
                    Micro-Refined Fluidity (40°C–45°C Melt)
                  </h5>
                  <p className="text-xs text-[#2A0E04]/70 font-light mt-0.5">
                    Flows effortlessly into molds, spreads mirror glazes smoothly, and snaps cleanly without waxy mouth-coating.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#FAD674] flex items-center justify-center shrink-0 mt-0.5 text-[#381305]">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#381305]">
                    Nitrogen-Flushed Gold Barrier Zipper Pouch
                  </h5>
                  <p className="text-xs text-[#2A0E04]/70 font-light mt-0.5">
                    Moisture-sealed pouch protects delicate cocoa volatiles from tropical humidity and ambient heat.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#FAD674] flex items-center justify-center shrink-0 mt-0.5 text-[#381305]">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#381305]">
                    Pure Couverture & Compound Specializations
                  </h5>
                  <p className="text-xs text-[#2A0E04]/70 font-light mt-0.5">
                    Whether you need zero-temper convenience for daily cakes or pure cocoa butter noir for fine bonbons, ROMAS delivers.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onStoryClick}
                className="px-7 py-3 rounded-full bg-[#381305] hover:bg-[#4A1704] text-[#FAF8F5] text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 shadow-md cursor-pointer flex items-center gap-2"
              >
                <span>Read The Maison Story</span>
                <ChevronRight className="w-4 h-4 text-[#FAD674]" />
              </button>

              <button
                onClick={() => setShowPackagingModal(true)}
                className="px-6 py-3 rounded-full bg-[#FAF8F5] hover:bg-[#F6F1EA] text-[#381305] border border-[#381305]/15 text-xs font-bold uppercase tracking-[0.16em] transition-all cursor-pointer flex items-center gap-2"
              >
                <Eye className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>Verify FSSAI Nutrition Label</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Packaging Inspection Modal */}
      {showPackagingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl p-6 sm:p-10 text-[#2A0E04] border border-[#C59B27]/40"
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowPackagingModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-[#2A0E04]/60 hover:text-[#2A0E04] hover:bg-black/5 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#381305]/10">
                <img
                  src={IMAGES.officialPackaging}
                  alt="Official ROMAS Milk Compound Packaging Label"
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAD674]/30 text-[#381305] text-[10px] font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Verified Factory Packaging</span>
                </div>

                <h3 className="font-serif text-3xl font-bold text-[#381305]">
                  ROMAS Milk Compound Buttons
                </h3>

                <p className="text-xs text-[#2A0E04]/70 leading-relaxed font-light">
                  Direct photographic record of official retail & trade pouch manufactured by Roma Foods.
                </p>

                {/* Nutritional Information Table */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#381305]/10">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#8C4724] mb-3">
                    Nutritional Information (Approximate Values per 100g):
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-[#381305]/10">
                      <span className="text-[#2A0E04]/70">Energy:</span>
                      <span className="font-semibold">{heroProduct.nutritionalInfo?.energy}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#381305]/10">
                      <span className="text-[#2A0E04]/70">Protein:</span>
                      <span className="font-semibold">{heroProduct.nutritionalInfo?.protein}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#381305]/10">
                      <span className="text-[#2A0E04]/70">Carbohydrate:</span>
                      <span className="font-semibold">{heroProduct.nutritionalInfo?.carbohydrate}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#381305]/10">
                      <span className="text-[#2A0E04]/70">Sugars:</span>
                      <span className="font-semibold">{heroProduct.nutritionalInfo?.sugars}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#381305]/10">
                      <span className="text-[#2A0E04]/70">Total Fat:</span>
                      <span className="font-semibold">{heroProduct.nutritionalInfo?.totalFat}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#381305]/10">
                      <span className="text-[#2A0E04]/70">Trans Fat:</span>
                      <span className="font-semibold">{heroProduct.nutritionalInfo?.transFat}</span>
                    </div>
                  </div>
                </div>

                {/* Manufacturer Coordinates */}
                <div className="text-xs space-y-1.5 p-4 rounded-2xl bg-[#FAF8F5] border border-[#381305]/10 text-[#2A0E04]/80 font-light">
                  <div><strong className="text-[#381305]">Manufacturer:</strong> {COMPANY_INFO.parentCompany}</div>
                  <div><strong className="text-[#381305]">Factory Address:</strong> {COMPANY_INFO.address}</div>
                  <div><strong className="text-[#381305]">FSSAI License:</strong> {COMPANY_INFO.fssaiNumber}</div>
                  <div><strong className="text-[#381305]">Customer Care:</strong> {COMPANY_INFO.phone} · {COMPANY_INFO.email}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
