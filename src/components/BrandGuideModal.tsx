import React from 'react';
import { X, Check, AlertCircle, FileText } from 'lucide-react';
import { RomasLogo } from './RomasLogo';
import { COMPANY_INFO } from '../data/products';

interface BrandGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandGuideModal: React.FC<BrandGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FAF6F0] rounded-3xl shadow-2xl border border-[#D4AF37]/35 p-6 sm:p-10 text-[#1A0A04]"
        role="dialog"
        aria-modal="true"
        aria-label="ROMAS Brand Identity & Logo Standards"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-[#1A0A04]/70 hover:text-[#1A0A04] hover:bg-black/5 transition-colors cursor-pointer"
          aria-label="Close brand guidelines modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center pb-6 border-b border-[#1A0A04]/10">
          <div className="flex justify-center items-center gap-4 mb-4">
            <RomasLogo variant="badge" size="lg" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#1A0A04]">
            Brand Identity & Logo Standards
          </h2>
          <p className="text-xs sm:text-sm text-[#1A0A04]/70 mt-2 max-w-md mx-auto font-light">
            Official guidelines extracted directly from the verified ROMAS™ Logo Usage and Don'ts Guide.
          </p>
        </div>

        {/* Content Body */}
        <div className="mt-8 space-y-6">
          {/* Brand Colors */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8C4724] mb-3">
              Official Brand Palette
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-[#331206] text-white flex flex-col justify-between h-24 shadow-sm">
                <span className="text-xs font-semibold">Chocolate Brown</span>
                <span className="font-mono text-xs text-[#E6C280]">#4A1704 / #331206</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#E6C280] text-[#140602] flex flex-col justify-between h-24 shadow-sm">
                <span className="text-xs font-semibold">Warm Gold Yellow</span>
                <span className="font-mono text-xs">#FECF6A / #E6C280</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#1A0A04]/15 text-[#1A0A04] flex flex-col justify-between h-24 shadow-sm">
                <span className="text-xs font-semibold">Cream & Silk</span>
                <span className="font-mono text-xs text-[#8C4724]">#FAF6F0 / #FFFDF9</span>
              </div>
            </div>
          </div>

          {/* Do's and Don'ts */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* DO */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs uppercase tracking-wider mb-3">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Brand Rules (DO)</span>
              </div>
              <ul className="text-xs space-y-2 text-emerald-900/80 font-light">
                <li>• Use approved primary, secondary & submark versions</li>
                <li>• Keep logo proportions and alignment unchanged</li>
                <li>• Use the approved ROMAS brand colours</li>
                <li>• Maintain sufficient clear space around the logo</li>
                <li>• Choose backgrounds providing clear contrast</li>
              </ul>
            </div>

            {/* DON'T */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200">
              <div className="flex items-center gap-2 text-amber-900 font-semibold text-xs uppercase tracking-wider mb-3">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Strict Prohibitions (DON'T)</span>
              </div>
              <ul className="text-xs space-y-2 text-amber-950/80 font-light">
                <li>• Do not stretch, compress or rotate the logo</li>
                <li>• Do not change colors or add artificial drop shadows</li>
                <li>• Do not place on low contrast or busy photos</li>
                <li>• Do not rearrange letters or change the typeface</li>
                <li>• Do not alter the signature 'R' flourish</li>
              </ul>
            </div>
          </div>

          {/* Manufacturer & Registration Details */}
          <div className="p-5 rounded-2xl bg-[#1A0A04]/5 border border-[#1A0A04]/10 text-xs text-[#1A0A04] space-y-1.5 font-light">
            <div className="font-bold text-[#8C4724] text-xs uppercase tracking-wider mb-1">Authentic Manufacturer Coordinates:</div>
            <div><span className="font-semibold">Manufacturer:</span> {COMPANY_INFO.parentCompany}</div>
            <div><span className="font-semibold">Factory Address:</span> {COMPANY_INFO.address}</div>
            <div><span className="font-semibold">FSSAI License:</span> {COMPANY_INFO.fssaiNumber}</div>
            <div><span className="font-semibold">Customer Care:</span> {COMPANY_INFO.phone} · {COMPANY_INFO.email}</div>
          </div>

          {/* PDF Source */}
          <div className="flex items-center justify-between pt-4 border-t border-[#1A0A04]/10">
            <span className="text-[11px] text-[#1A0A04]/60 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#D4AF37]" />
              Source: ROMAS_Logo_Usage_and_Donts_Guide_Final.pdf
            </span>
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#140602] bg-[#E6C280] hover:brightness-110 rounded-full transition-all cursor-pointer shadow-md"
            >
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
