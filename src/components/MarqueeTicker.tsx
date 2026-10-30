import React from 'react';
import { Sparkles, ShieldCheck, Flame, Award, Truck, Package } from 'lucide-react';

interface MarqueeTickerProps {
  variant?: 'yellow' | 'brown';
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({ variant = 'yellow' }) => {
  const items = [
    { text: '100% Pure Cocoa Solids', icon: Sparkles },
    { text: 'Non-Temper 40°C–45°C Easy Melt', icon: Flame },
    { text: 'Free Trade Sample Kit for Bakeries', icon: Package },
    { text: 'Micro-Milled Under 20 Microns', icon: Award },
    { text: 'Nitrogen-Flushed Gold Barrier Pouch', icon: ShieldCheck },
    { text: 'FSSAI Lic. #10526005000033 · Dhamtari', icon: ShieldCheck },
    { text: 'Pan-India Temperature-Controlled Logistics', icon: Truck },
    { text: 'Spreading Happiness in Every Bite', icon: Sparkles },
  ];

  const isYellow = variant === 'yellow';

  return (
    <div
      className={`overflow-hidden py-3 border-y select-none relative z-20 ${
        isYellow
          ? 'bg-[#FAD674] text-[#2A0E04] border-[#D4AF37]/50'
          : 'bg-[#2A0E04] text-[#FAF8F5] border-[#C59B27]/30'
      }`}
    >
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap text-xs font-bold uppercase tracking-[0.22em]">
        {/* Double array for seamless loop */}
        {[...items, ...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-3 shrink-0">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                  isYellow ? 'bg-[#381305] text-[#FAD674]' : 'bg-[#FAD674] text-[#381305]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </span>
              <span>{item.text}</span>
              <span className={`text-base font-serif ${isYellow ? 'text-[#381305]/40' : 'text-[#FAD674]/50'}`}>
                ✦
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

