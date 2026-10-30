import React from 'react';
import { ShieldCheck, Droplet, Flame, Timer, Package, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';
import { Reveal } from './Reveal';

/**
 * Credential band shown directly beneath the Hero. Mirrors the trust-marker row
 * on reference maisons (e.g. morde.com) but uses only genuine ROMAS facts drawn
 * from the product data — no fabricated third-party certifications.
 */
export const TrustStrip: React.FC = () => {
  const markers = [
    {
      icon: ShieldCheck,
      value: 'FSSAI Certified',
      label: `Lic. #${COMPANY_INFO.fssaiNumber}`,
    },
    {
      icon: Droplet,
      value: '100% Cocoa Butter',
      label: 'Pure Couverture Line',
    },
    {
      icon: Timer,
      value: 'Non-Temper',
      label: 'Effortless Easy-Melt',
    },
    {
      icon: Flame,
      value: 'Bake-Stable 200°C',
      label: 'Oven-Proof Fillings',
    },
    {
      icon: Package,
      value: 'Gold Barrier Pack',
      label: 'Moisture-Locked Freshness',
    },
    {
      icon: MapPin,
      value: 'Crafted in India',
      label: 'Roma Foods · Dhamtari',
    },
  ];

  return (
    <section
      aria-label="ROMAS quality credentials"
      className="relative bg-white border-y border-[#381305]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <Reveal className="text-center mb-8" y={18}>
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-[#8C4724]">
            The ROMAS Standard · Trusted by Professional Kitchens Across India
          </span>
        </Reveal>

        <Reveal
          stagger
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-x-4"
        >
          {markers.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.value}
                className="group flex flex-col items-center text-center gap-2.5 px-2"
              >
                <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#FAF8F5] border border-[#C59B27]/30 text-[#C59B27] transition-colors duration-300 group-hover:bg-gradient-to-br group-hover:from-[#F3E5AB] group-hover:to-[#C59B27] group-hover:text-[#140602]">
                  <Icon className="w-5 h-5" />
                </span>
                <span className="font-serif text-base sm:text-lg font-bold text-[#2A0E04] leading-none">
                  {m.value}
                </span>
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#2A0E04]/55 font-semibold leading-tight">
                  {m.label}
                </span>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
};
