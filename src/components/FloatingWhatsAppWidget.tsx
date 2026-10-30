import React, { useState } from 'react';
import { X, Send, Sparkles, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';
import { RomasLogo } from './RomasLogo';

export const FloatingWhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userQuery, setUserQuery] = useState('');

  const handleSend = () => {
    const text = userQuery.trim()
      ? `Hello Roma Foods Trade Desk, ${userQuery}`
      : `Hello Roma Foods Concierge, I am interested in ROMAS chocolates for my bakery/business. Please share commercial trade sample details.`;
    window.open(`https://wa.me/919098229454?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end select-none">
      {/* Popover Bubble */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 rounded-3xl bg-white shadow-2xl border border-[#381305]/15 overflow-hidden animate-in slide-in-from-bottom-4 duration-300 text-[#2A0E04]">
          {/* Header */}
          <div className="bg-[#381305] text-[#FAF8F5] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FAD674] flex items-center justify-center text-[#381305] font-serif font-black text-xs">
                ROMAS
              </div>
              <div>
                <h5 className="font-serif font-bold text-sm text-[#FAD674]">
                  Trade Concierge Desk
                </h5>
                <span className="text-[10px] text-white/70 block font-light">
                  Roma Foods · Dhamtari Works
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-[#FAF8F5] space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-white border border-[#381305]/10 shadow-sm space-y-1.5 font-light leading-relaxed">
              <p className="font-semibold text-[#381305] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>Namaste & Welcome!</span>
              </p>
              <p className="text-[#2A0E04]/80">
                Operating a bakery, hotel, or cloud kitchen? We dispatch complimentary trade sample kits across India.
              </p>
            </div>

            {/* Quick Prompts */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <button
                onClick={() => {
                  setUserQuery('I want to request a free sample kit for my bakery.');
                }}
                className="px-2.5 py-1 rounded-full bg-white border border-[#381305]/15 text-[10px] font-medium text-[#381305] hover:bg-[#FAD674] transition-colors"
              >
                📦 Request Sample Kit
              </button>
              <button
                onClick={() => {
                  setUserQuery('I am interested in becoming a ROMAS distributor.');
                }}
                className="px-2.5 py-1 rounded-full bg-white border border-[#381305]/15 text-[10px] font-medium text-[#381305] hover:bg-[#FAD674] transition-colors"
              >
                🤝 Become Distributor
              </button>
              <button
                onClick={() => {
                  setUserQuery('Please share commercial pricing for 10kg cartons.');
                }}
                className="px-2.5 py-1 rounded-full bg-white border border-[#381305]/15 text-[10px] font-medium text-[#381305] hover:bg-[#FAD674] transition-colors"
              >
                💰 Bulk Pricing
              </button>
            </div>

            {/* Input & Send */}
            <div className="pt-2 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your bakery query..."
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 px-3.5 py-2.5 rounded-2xl bg-white border border-[#381305]/15 text-xs focus:outline-none focus:border-[#C59B27]"
              />
              <button
                onClick={handleSend}
                className="p-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-colors"
                aria-label="Send via WhatsApp"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Call Button */}
      <a
        href={`tel:${COMPANY_INFO.phone.replace(/[^+\d]/g, '')}`}
        className="mb-3 relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#381305] hover:bg-[#4A1704] text-[#FAD674] shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer border-2 border-[#FAD674]/60"
        aria-label={`Call ${COMPANY_INFO.parentCompany} trade desk`}
        title="Call our trade desk"
      >
        <Phone className="w-6 h-6" />
      </a>

      {/* Main Floating Trigger Button with Ripple */}
      <div className="relative group">
        {/* Pulse Ripple Effect */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-75 blur-sm group-hover:opacity-100 animate-ping pointer-events-none" />

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer border-2 border-white"
          aria-label="Open trade inquiry chat"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          {/* Notification dot */}
          <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-[#FAD674] border border-white animate-pulse" />
        </button>
      </div>
    </div>
  );
};

