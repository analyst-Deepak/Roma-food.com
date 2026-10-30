import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface PageWipeTransitionProps {
  isWiping: boolean;
  targetLabel?: string;
  onMidpoint?: () => void;
  onComplete?: () => void;
}

export const PageWipeTransition: React.FC<PageWipeTransitionProps> = ({
  isWiping,
  targetLabel,
  onMidpoint,
  onComplete,
}) => {
  useEffect(() => {
    if (!isWiping) return;

    // Trigger scroll / navigation at the apex when screens are 100% covered
    const midpointTimer = setTimeout(() => {
      if (onMidpoint) {
        onMidpoint();
      }
    }, 420);

    // End wipe animation cycle
    const completeTimer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 950);

    return () => {
      clearTimeout(midpointTimer);
      clearTimeout(completeTimer);
    };
  }, [isWiping, onMidpoint, onComplete]);

  // Cubic bezier for high-end luxury wipe
  const luxuryEase: [number, number, number, number] = [0.77, 0, 0.175, 1];

  return (
    <AnimatePresence>
      {isWiping && (
        <div
          className="fixed inset-0 z-50 pointer-events-auto overflow-hidden"
          role="status"
          aria-live="polite"
          aria-label={targetLabel ? `Navigating to ${targetLabel}` : 'Navigating'}
        >
          {/* Layer 1: Haute Dark Chocolate Brown Curtain */}
          <motion.div
            key="wipe-chocolate"
            initial={{ y: '-100%' }}
            animate={{
              y: ['-100%', '0%', '0%', '100%'],
            }}
            transition={{
              duration: 0.92,
              times: [0, 0.44, 0.58, 1],
              ease: luxuryEase,
            }}
            className="absolute inset-0 bg-[#2A0E04] z-10 flex flex-col justify-between shadow-2xl"
          >
            {/* Top Gilded Accent Line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#C59B27] to-transparent opacity-80" />
            
            {/* Bottom Gilded Accent Line */}
            <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#FECF6A] to-transparent shadow-[0_0_15px_#C59B27]" />
          </motion.div>

          {/* Layer 2: Warm Silk Cream Curtain (Following Behind & Revealing) */}
          <motion.div
            key="wipe-cream"
            initial={{ y: '-100%' }}
            animate={{
              y: ['-100%', '0%', '0%', '100%'],
            }}
            transition={{
              duration: 0.92,
              times: [0, 0.48, 0.62, 1],
              delay: 0.04,
              ease: luxuryEase,
            }}
            className="absolute inset-0 bg-[#FAF8F5] z-20 flex flex-col justify-between border-y border-[#381305]/15 shadow-2xl"
          >
            {/* Top Gilded Trim */}
            <div className="h-[1px] w-full bg-[#C59B27]/40" />

            {/* Bottom Gilded Trim */}
            <div className="h-[2px] w-full bg-[#C59B27]/60" />
          </motion.div>

          {/* Layer 3: Central Luxury Monogram & Brand Insignia (Floating at apex) */}
          <motion.div
            key="wipe-badge"
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.94, 1, 1, 0.96],
              y: [15, 0, 0, -10],
            }}
            transition={{
              duration: 0.6,
              delay: 0.22,
              times: [0, 0.35, 0.7, 1],
              ease: 'easeInOut',
            }}
            className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
          >
            <div className="text-center px-6 py-5 rounded-3xl bg-white/90 backdrop-blur-md border border-[#C59B27]/30 shadow-[0_20px_50px_rgba(42,14,4,0.15)] max-w-sm mx-auto">
              {/* Emblem Spark */}
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#C59B27]/40 text-[#C59B27] mb-3 shadow-inner">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>

              {/* Brand Wordmark */}
              <div className="font-serif text-3xl sm:text-4xl font-extrabold tracking-[0.22em] text-[#2A0E04] uppercase">
                ROMAS
              </div>

              {/* Tagline */}
              <div className="mt-1 flex items-center justify-center gap-2">
                <span className="w-6 h-[1px] bg-[#C59B27]" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#8C4724]">
                  Spreading Happiness
                </span>
                <span className="w-6 h-[1px] bg-[#C59B27]" />
              </div>

              {/* Target Section hint if present */}
              {targetLabel && (
                <div className="mt-3 pt-2.5 border-t border-[#381305]/10 text-[11px] font-mono tracking-widest uppercase text-[#2A0E04]/60">
                  {targetLabel}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
