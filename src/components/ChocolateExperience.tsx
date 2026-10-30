import React, { useState } from 'react';
import { Flame, Droplets, Sparkles, Thermometer, Check } from 'lucide-react';
import { Reveal } from './Reveal';

export const ChocolateExperience: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(2);

  const meltingSteps = [
    {
      step: 1,
      title: 'Gentle De-crystallization',
      temp: '40°C – 45°C',
      description: 'Slow, indirect heat unlocks rich cocoa butter crystal matrices without scorching delicate dairy solids.',
      icon: Flame,
    },
    {
      step: 2,
      title: 'Optimal Working Flow',
      temp: '32°C – 34°C',
      description: 'Ideal enrobing viscosity for glossy drip cakes, hollow bonbon casting, and uniform pastry enrobing.',
      icon: Droplets,
    },
    {
      step: 3,
      title: 'Setting & Clean Snap',
      temp: '18°C – 20°C',
      description: 'Controlled cooling creates a clean audible snap, high surface gloss, and zero fat bloom over time.',
      icon: Sparkles,
    },
  ];

  return (
    <section className="relative py-28 sm:py-40 bg-white text-[#2A0E04] overflow-hidden border-t border-[#381305]/10">
      {/* Subtle Warm Silk Backdrop Glow */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[550px] h-[550px] bg-[#FECF6A]/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Editorial Headline & Narrative */}
          <Reveal className="lg:col-span-7">
            <div className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-[#8C4724] mb-5">
              <Sparkles className="w-4 h-4 text-[#C59B27]" />
              <span>Sensorial Alchemy</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-[#2A0E04] text-balance">
              Made for Moments That Matter.
            </h2>

            <p className="mt-8 text-base sm:text-lg text-[#2A0E04]/80 leading-relaxed font-light max-w-2xl text-balance">
              From everyday bakery indulgence to prestigious banquet celebrations, make every
              creation unforgettable with ROMAS. Our micro-milled cocoa particles ensure instantaneous
              melting that coats the palate with deep, rounded warmth.
            </p>

            {/* Sensorial Pillars */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-[#381305]/10">
              <div>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-gold-gradient">100%</span>
                <h4 className="text-sm font-semibold text-[#2A0E04] mt-1.5 uppercase tracking-wider text-[11px]">
                  Confectionery Grade
                </h4>
                <p className="text-xs text-[#2A0E04]/65 mt-1 font-light leading-relaxed">
                  Consistent batch yields for high-demand patisseries.
                </p>
              </div>

              <div>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-gold-gradient">&lt;20µm</span>
                <h4 className="text-sm font-semibold text-[#2A0E04] mt-1.5 uppercase tracking-wider text-[11px]">
                  Silky Particle Size
                </h4>
                <p className="text-xs text-[#2A0E04]/65 mt-1 font-light leading-relaxed">
                  Zero graininess or friction on the tongue.
                </p>
              </div>

              <div>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-gold-gradient">Gold Foil</span>
                <h4 className="text-sm font-semibold text-[#2A0E04] mt-1.5 uppercase tracking-wider text-[11px]">
                  Barrier Protection
                </h4>
                <p className="text-xs text-[#2A0E04]/65 mt-1 font-light leading-relaxed">
                  Resealable zipper locks out Indian humidity.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Interactive Melting & Handling Guide */}
          <Reveal className="lg:col-span-5" delay={0.12}>
            <div className="p-8 sm:p-10 rounded-3xl bg-[#FAF8F5] border border-[#381305]/10 shadow-[0_20px_50px_rgba(42,14,4,0.06)]">
              <div className="flex items-center justify-between pb-5 border-b border-[#381305]/10">
                <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-[#8C4724]">
                  <Thermometer className="w-4 h-4 text-[#C59B27]" />
                  <span>The Temper & Melt Curve</span>
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#2A0E04]/50">Roma Standards</span>
              </div>

              <div className="mt-8 space-y-4">
                {meltingSteps.map((stepItem) => {
                  const Icon = stepItem.icon;
                  const isActive = activeStep === stepItem.step;

                  return (
                    <div
                      key={stepItem.step}
                      onClick={() => setActiveStep(stepItem.step)}
                      className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-white border-2 border-[#C59B27] shadow-md'
                          : 'bg-white/60 border-[#381305]/10 hover:bg-white text-[#2A0E04]/80'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3.5">
                          <div
                            className={`p-2.5 rounded-xl ${
                              isActive ? 'bg-[#C59B27] text-white' : 'bg-[#FAF8F5] text-[#8C4724]'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-serif font-bold text-[#2A0E04]">{stepItem.title}</h4>
                            <span className="text-xs font-mono font-medium text-[#8C4724]">{stepItem.temp}</span>
                          </div>
                        </div>

                        {isActive && <Check className="w-4 h-4 text-[#C59B27]" />}
                      </div>

                      {isActive && (
                        <p className="mt-3.5 text-xs text-[#2A0E04]/80 leading-relaxed border-t border-[#381305]/10 pt-3 font-light">
                          {stepItem.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-5 border-t border-[#381305]/10 text-center">
                <p className="text-[11px] text-[#2A0E04]/60 font-light">
                  Tip: For compounds, warm gently to 40°C and work at 32°C. No seeding crystal tempering needed.
                </p>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};
