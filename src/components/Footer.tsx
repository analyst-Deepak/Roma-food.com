import React, { useState } from 'react';
import { ArrowUp, BookOpen, Phone, Mail, MapPin, X, ShieldCheck, Heart } from 'lucide-react';
import { RomasLogo } from './RomasLogo';
import { COMPANY_INFO, PRODUCT_CATEGORIES } from '../data/products';

interface FooterProps {
  onOpenBrandGuide: () => void;
  onNavigate?: (sectionId: string, label?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBrandGuide, onNavigate }) => {
  const [activeLegalModal, setActiveLegalModal] = useState<'privacy' | 'terms' | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent, sectionId: string, label: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(sectionId, label);
    }
  };

  return (
    <footer className="bg-[#1C0E07] text-[#FAF8F5] pt-24 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-96 bg-[#FAD674]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Section: Big Framer-Style Brand Wordmark Banner */}
        <div className="pb-16 border-b border-white/10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div className="space-y-4">
            <RomasLogo variant="badge" size="lg" showTagline={true} />
            <p className="text-xs sm:text-sm text-white/70 max-w-md font-light leading-relaxed">
              Maison Roma Foods · Dhamtari, India. Engineering premier confectionery compounds,
              micro-refined buttons, and pure couvertures dedicated to spreading happiness.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={onOpenBrandGuide}
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-[#C59B27]/40 text-[#FAD674] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#FAD674]" />
              <span>Brand Guidelines</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white transition-colors cursor-pointer"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Middle Section: Organized 4-Column Grid */}
        <div className="py-14 border-b border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Collection */}
          <div className="space-y-4">
            <h5 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#FAD674]">
              Collection
            </h5>
            <ul className="space-y-2.5 text-xs text-white/75 font-light">
              <li>
                <a
                  href="#chocolates"
                  onClick={(e) => handleLinkClick(e, 'chocolates', 'Compounds')}
                  className="hover:text-[#FAD674] transition-colors"
                >
                  Milk & Dark Compounds
                </a>
              </li>
              <li>
                <a
                  href="#chocolates"
                  onClick={(e) => handleLinkClick(e, 'chocolates', 'Pure Couvertures')}
                  className="hover:text-[#FAD674] transition-colors"
                >
                  Pure Couvertures (45%–70%)
                </a>
              </li>
              <li>
                <a
                  href="#chocolates"
                  onClick={(e) => handleLinkClick(e, 'chocolates', 'Bakery Fillings')}
                  className="hover:text-[#FAD674] transition-colors"
                >
                  Hazelnut & Praline Fillings
                </a>
              </li>
              <li>
                <a
                  href="#chocolates"
                  onClick={(e) => handleLinkClick(e, 'chocolates', 'Cocoa Powder')}
                  className="hover:text-[#FAD674] transition-colors"
                >
                  Dutch Alkalized Cocoa
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: The Atelier */}
          <div className="space-y-4">
            <h5 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#FAD674]">
              The Atelier
            </h5>
            <ul className="space-y-2.5 text-xs text-white/75 font-light">
              <li>
                <a
                  href="#process"
                  onClick={(e) => handleLinkClick(e, 'process', 'The Craft')}
                  className="hover:text-[#FAD674] transition-colors"
                >
                  The Craft & Milling
                </a>
              </li>
              <li>
                <a
                  href="#industries"
                  onClick={(e) => handleLinkClick(e, 'industries', 'Industries')}
                  className="hover:text-[#FAD674] transition-colors"
                >
                  Industries We Serve
                </a>
              </li>
              <li>
                <a
                  href="#recipes"
                  onClick={(e) => handleLinkClick(e, 'recipes', 'Chef Studio')}
                  className="hover:text-[#FAD674] transition-colors"
                >
                  Chef Recipes & Tempering
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleLinkClick(e, 'faq', 'FAQ')}
                  className="hover:text-[#FAD674] transition-colors"
                >
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Manufacturing & Works */}
          <div className="space-y-4">
            <h5 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#FAD674]">
              Works & Factory
            </h5>
            <div className="space-y-2 text-xs text-white/75 font-light leading-relaxed">
              <p>Roma Foods Works:</p>
              <p className="text-white/60">
                {COMPANY_INFO.address}
              </p>
              <p className="pt-1">
                FSSAI Lic. <span className="font-mono text-[#FAD674]">#{COMPANY_INFO.fssaiNumber}</span>
              </p>
            </div>
          </div>

          {/* Col 4: Trade Concierge Hotline */}
          <div className="space-y-4">
            <h5 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#FAD674]">
              Trade Desk
            </h5>
            <div className="space-y-2.5 text-xs text-white/75 font-light">
              <div>
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="text-sm font-semibold text-white hover:text-[#FAD674] transition-colors inline-block"
                >
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="hover:text-white transition-colors"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAD674] text-[#140602] text-[10.5px] font-bold uppercase tracking-wider"
                >
                  Request Trade Samples
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section: Legal & Heritage Credo */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50 font-light">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>100% Pure Vegetarian</span>
            <span className="text-white/20">|</span>
            <span>Central FSSAI Certified</span>
          </div>

          <div>
            <p>
              © {new Date().getFullYear()} ROMAS™ · Roma Foods Confectionery. Spreading Happiness.
            </p>
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={() => setActiveLegalModal('privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy
            </button>
            <button
              onClick={() => setActiveLegalModal('terms')}
              className="hover:text-white transition-colors"
            >
              Terms of Trade
            </button>
          </div>
        </div>

      </div>

      {/* Modal */}
      {activeLegalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-white text-[#2A0E04] rounded-3xl p-8 shadow-2xl">
            <button
              onClick={() => setActiveLegalModal(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-black/60 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif text-2xl font-bold text-[#381305] mb-3">
              {activeLegalModal === 'privacy' ? 'Privacy Policy' : 'Terms of Trade'}
            </h3>
            <p className="text-xs text-[#2A0E04]/75 leading-relaxed font-light">
              Roma Foods maintains strict confidential protocols for commercial pastry clients. All factory dispatches conform to FSSAI manufacturing parameters.
            </p>
          </div>
        </div>
      )}
    </footer>
  );
};
