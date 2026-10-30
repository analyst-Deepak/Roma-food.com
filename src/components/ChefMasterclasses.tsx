import React, { useState } from 'react';
import { ChefHat, Clock, Sparkles, ArrowRight, X, Check, BookOpen } from 'lucide-react';
import { CHEF_RECIPES } from '../data/products';
import { ChefRecipe } from '../types';
import { Reveal } from './Reveal';

interface ChefMasterclassesProps {
  onSelectProductInterest: (productName: string) => void;
}

export const ChefMasterclasses: React.FC<ChefMasterclassesProps> = ({
  onSelectProductInterest,
}) => {
  const [selectedRecipe, setSelectedRecipe] = useState<ChefRecipe | null>(null);

  return (
    <section id="recipes" className="py-24 sm:py-36 bg-[#FAF6F0] text-[#1A0A04] border-t border-[#1A0A04]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-[#8C4724] mb-4">
            <span className="w-8 h-[1px] bg-[#D4AF37]" />
            <span>Haute Pâtisserie Masterclasses</span>
            <span className="w-8 h-[1px] bg-[#D4AF37]" />
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-[#1A0A04] leading-tight text-balance">
            Chef Recipes & Formulations
          </h2>
          <p className="mt-5 text-sm sm:text-base text-[#1A0A04]/75 leading-relaxed font-light text-balance">
            Inspired by European pastry traditions and calibrated for Indian kitchens.
            Master mirror glazes, molten cookie pools, and laminated viennoiseries with ROMAS chocolates.
          </p>
        </Reveal>

        {/* Masterclass Showcase Grid */}
        <Reveal className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CHEF_RECIPES.map((recipe) => (
            <div
              key={recipe.id}
              className="group bg-white rounded-3xl overflow-hidden border border-[#1A0A04]/10 hover:border-[#D4AF37] shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Media Image */}
                <div className="relative aspect-[4/3] bg-[#0E0502] overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-108"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  {/* Category & Time Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#140602]/85 text-[#F3E5AB] text-[9px] font-bold uppercase tracking-[0.2em] border border-[#D4AF37]/35 backdrop-blur-md">
                    {recipe.skillLevel}
                  </div>
                  <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-[11px] font-mono text-white/90">
                    <Clock className="w-3.5 h-3.5 text-[#E6C280]" />
                    <span>{recipe.prepTime}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C4724] block mb-2 font-mono">
                    {recipe.category}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#1A0A04] group-hover:text-[#8C4724] transition-colors leading-snug">
                    {recipe.title}
                  </h3>
                  <p className="mt-3 text-xs text-[#1A0A04]/70 line-clamp-2 leading-relaxed font-light">
                    {recipe.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-gray-100 text-[11px]">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C4724] block font-semibold">
                      Featured Medium:
                    </span>
                    <span className="truncate block font-medium text-[#1A0A04] mt-0.5">
                      {recipe.recommendedProduct}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedRecipe(recipe)}
                  className="w-full py-3 px-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#140602] bg-gradient-to-r from-[#F9E7B9] via-[#E6C280] to-[#B8860B] hover:brightness-110 rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>View Formulation</span>
                </button>
              </div>
            </div>
          ))}
        </Reveal>

      </div>

      {/* Recipe Formulation Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div
            className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#FAF6F0] text-[#1A0A04] rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#D4AF37]/35"
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={() => setSelectedRecipe(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-[#1A0A04]/70 hover:text-[#1A0A04] hover:bg-black/5 transition-colors"
              aria-label="Close recipe"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8C4724] uppercase tracking-[0.2em]">
                <span>{selectedRecipe.category}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedRecipe.skillLevel}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedRecipe.prepTime}</span>
              </div>
              <h3 className="font-serif text-3xl font-bold text-[#1A0A04] mt-2">
                {selectedRecipe.title}
              </h3>
              <p className="text-sm text-[#1A0A04]/75 mt-3 leading-relaxed font-light">
                {selectedRecipe.description}
              </p>
            </div>

            {/* Ingredients & Formulation */}
            <div className="mt-8 pt-6 border-t border-[#1A0A04]/10 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C4724] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Ingredients & Metric Quantities</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#1A0A04]">
                {selectedRecipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-2.5 bg-white p-3 rounded-2xl border border-[#1A0A04]/10 shadow-sm">
                    <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pastry Chef Tip */}
            <div className="mt-8 p-5 rounded-2xl bg-[#1A0A04] text-[#FAF6F0] border border-[#D4AF37]/30">
              <div className="flex items-center gap-2 text-xs font-bold text-[#F3E5AB] uppercase tracking-wider mb-2">
                <ChefHat className="w-4 h-4 text-[#D4AF37]" />
                <span>Executive Pastry Chef's Secret Technique</span>
              </div>
              <p className="text-xs text-[#FAF6F0]/85 italic leading-relaxed font-serif">
                "{selectedRecipe.chefTip}"
              </p>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-[#1A0A04]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#1A0A04]">
                <span className="font-semibold block text-[#8C4724] uppercase text-[10px] tracking-wider">
                  Featured Product:
                </span>
                <span className="font-serif font-bold text-base">{selectedRecipe.recommendedProduct}</span>
              </div>
              <button
                onClick={() => {
                  onSelectProductInterest(selectedRecipe.recommendedProduct);
                  setSelectedRecipe(null);
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#140602] bg-gradient-to-r from-[#F9E7B9] via-[#E6C280] to-[#B8860B] hover:brightness-110 rounded-full transition-all shadow-md cursor-pointer"
              >
                Inquire For This Medium
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
