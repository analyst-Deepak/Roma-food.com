import React from 'react';
import { X, Check, ChefHat, FileText, Send, Droplets, Flame } from 'lucide-react';
import { Product } from '../types';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onRequestSample: (product: Product) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onRequestSample,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-[#381305]/15 p-6 sm:p-10 text-[#2A0E04]"
        role="dialog"
        aria-modal="true"
        aria-label={`Product specifications for ${product.name}`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-[#2A0E04]/60 hover:text-[#2A0E04] hover:bg-black/5 transition-colors cursor-pointer"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Media Column (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="rounded-2xl overflow-hidden bg-[#FAF8F5] aspect-[4/3] md:aspect-square relative shadow-md border border-[#381305]/10">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {product.badge && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#C59B27] text-[#140602] text-[9px] font-bold tracking-wider uppercase shadow-sm">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Technical Quick Spec Sheet */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#381305]/10 space-y-3 text-xs text-[#2A0E04]">
              <div className="font-bold uppercase tracking-wider text-[#8C4724] text-[11px] pb-2 border-b border-gray-200 flex items-center justify-between">
                <span>Technical Specifications</span>
                <span className="font-mono text-[#381305]">{product.packSize}</span>
              </div>

              {/* Fluidity Drops */}
              {product.fluidity && (
                <div className="flex items-center justify-between">
                  <span className="text-[#2A0E04]/70 flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-[#C59B27]" />
                    <span>Fluidity Index:</span>
                  </span>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((d) => (
                      <span
                        key={d}
                        className={`text-xs ${
                          d <= (product.fluidity || 0) ? 'text-[#C59B27]' : 'text-gray-300'
                        }`}
                      >
                        ●
                      </span>
                    ))}
                    <span className="ml-1 text-[11px] font-mono font-bold text-[#381305]">
                      ({product.fluidity}/5)
                    </span>
                  </div>
                </div>
              )}

              {/* Bake-Stability */}
              <div className="flex items-center justify-between">
                <span className="text-[#2A0E04]/70 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-600" />
                  <span>Bake Performance:</span>
                </span>
                <span className="font-semibold text-[#381305]">
                  {product.bakeStable ? 'Bake-Stable (Oven-Proof)' : 'Soft-Melt / Enrobing'}
                </span>
              </div>

              {/* Tempering */}
              <div className="flex items-center justify-between">
                <span className="text-[#2A0E04]/70">Tempering Needed:</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    product.temperNeeded
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {product.temperNeeded ? 'Yes (Couverture)' : 'No (Easy Compound)'}
                </span>
              </div>

              {/* Fat & Cocoa content */}
              {product.cocoaContent && (
                <div className="flex items-center justify-between pt-1 border-t border-gray-200">
                  <span className="text-[#2A0E04]/70">Cocoa Solids:</span>
                  <span className="font-mono font-bold text-[#381305]">{product.cocoaContent}</span>
                </div>
              )}
              {product.fatContent && (
                <div className="flex items-center justify-between">
                  <span className="text-[#2A0E04]/70">Fat Profile:</span>
                  <span className="font-mono">{product.fatContent}</span>
                </div>
              )}
            </div>
          </div>

          {/* Product Info Column (7 cols) */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8C4724]">
                <span>{product.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>ROMAS Professional Range</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A0E04] mt-1.5">
                {product.name}
              </h2>
              <p className="text-xs text-[#2A0E04]/70 mt-1 font-light">
                {product.subtitle}
              </p>
            </div>

            <p className="text-sm text-[#2A0E04]/80 leading-relaxed font-light">
              {product.detailedDescription}
            </p>

            {/* Target Segments */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-[#381305]">Formulated for:</span>
              {product.segments.map((seg) => (
                <span
                  key={seg}
                  className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FAF8F5] text-[#381305] border border-[#381305]/15"
                >
                  {seg.replace('-', ' ')}
                </span>
              ))}
            </div>

            {/* Features */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C4724] mb-2 flex items-center gap-1.5">
                <span>Professional Confectionery Highlights</span>
              </h4>
              <ul className="space-y-1.5">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[#2A0E04]/80">
                    <Check className="w-3.5 h-3.5 text-[#C59B27] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Where to use */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C4724] mb-2 flex items-center gap-1.5">
                <ChefHat className="w-3.5 h-3.5 text-[#381305]" />
                <span>Recommended Commercial Applications</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {product.applications.map((app, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2.5 py-1 rounded-md bg-[#FAF8F5] text-[#381305] font-medium border border-[#381305]/10"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>

            {/* Nutritional Info if available */}
            {product.nutritionalInfo && (
              <div className="pt-2 border-t border-gray-100">
                <h4 className="text-xs font-bold text-[#8C4724] mb-1.5 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Nutritional Values (Per 100g declared)</span>
                </h4>
                <div className="grid grid-cols-3 gap-2 font-mono text-[11px] bg-[#FAF8F5] p-3 rounded-2xl border border-[#381305]/10">
                  <div>
                    <span className="text-gray-500 block text-[10px]">Energy</span>
                    <span className="font-bold text-[#381305]">{product.nutritionalInfo.energy}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">Sugars</span>
                    <span className="font-semibold">{product.nutritionalInfo.sugars}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">Carbs</span>
                    <span className="font-semibold">{product.nutritionalInfo.carbohydrate}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  onRequestSample(product);
                  onClose();
                }}
                className="flex-1 py-3.5 px-5 text-xs font-bold uppercase tracking-wider text-[#140602] bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#C59B27] hover:brightness-105 rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Sample Pack</span>
              </button>

              <a
                href="#contact"
                onClick={onClose}
                className="py-3.5 px-5 text-xs font-semibold uppercase tracking-wider text-center text-[#381305] hover:bg-[#FAF8F5] border border-[#381305]/20 rounded-full transition-colors flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Commercial Bulk Enquiry</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
