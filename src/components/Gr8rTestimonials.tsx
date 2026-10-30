import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';

interface TestimonialEntry {
  quote: string;
  words: string[];
  author: string;
  role: string;
  company: string;
  rating: number;
  tint: string;
  avatarUrl: string;
  initials: string;
}

const TESTIMONIALS_DATA: Omit<TestimonialEntry, 'words' | 'initials'>[] = [
  {
    quote:
      'A truly polished experience. The chocolate buttons melt with effortless, repeatable viscosity on our marble tables. The gloss on our mirror glazes has never been more striking.',
    author: 'Arjun Mehta',
    role: 'Head Pastry Chef',
    company: 'Maison Royale',
    rating: 5,
    tint: '#FFD9B8',
    avatarUrl: '/assets/testimonials/avatar_1.jpg',
  },
  {
    quote:
      'From the first interaction, everything felt simple and professional. The airtight gold zipper pouch locks out moisture completely. It delivers exactly what top commercial bakeries demand.',
    author: 'Ananya Iyer',
    role: 'Creative Culinary Director',
    company: 'The Velvet Whisk',
    rating: 5,
    tint: '#CFE3FF',
    avatarUrl: '/assets/testimonials/avatar_2.jpg',
  },
  {
    quote:
      'The quality is impressive. Every detail feels thoughtful, refined, and beautifully crafted. Zero waxy residue on the palate and pure roasted cocoa character. Highly recommended.',
    author: 'Rohan Kapoor',
    role: 'Master Chocolatier',
    company: 'Atelier Cocoa',
    rating: 5,
    tint: '#D6F0D8',
    avatarUrl: '/assets/testimonials/avatar_3.jpg',
  },
  {
    quote:
      'Handoff used to be a week of back-and-forth testing batches. With ROMAS 55% Couverture, the first temper cycle landed perfectly with a brilliant snap and silky melt.',
    author: 'Priya Raghunathan',
    role: 'Studio Director',
    company: 'Patisserie Lumière',
    rating: 5,
    tint: '#F3D6F0',
    avatarUrl: '/assets/testimonials/avatar_4.jpg',
  },
  {
    quote:
      'Bake stability inside our morning brioche and croissants is remarkable. The batons keep their rich fudgy core without leaking or burning at 200°C oven heat.',
    author: 'Vikram Nair',
    role: 'Master Baker',
    company: 'Artisan Loaf & Co',
    rating: 5,
    tint: '#FFF0B8',
    avatarUrl: '/assets/testimonials/avatar_5.jpg',
  },
  {
    quote:
      'The dragées and coated almonds have elevated our luxury festive hampers. The high-gloss glaze prevents finger marks, while the roasted nut crunch remains immaculate.',
    author: 'Meera Deshpande',
    role: 'Confectionery Founder',
    company: 'Sweet Alchemy',
    rating: 5,
    tint: '#D9D4FF',
    avatarUrl: '/assets/testimonials/avatar_6.jpg',
  },
  {
    quote:
      'From custom tonnage dark compounds to fine Dutch cocoa powders, their batch consistency gives our multi-outlet hotel kitchens complete peace of mind.',
    author: 'Karan Malhotra',
    role: 'Executive Chef',
    company: 'Grand Heritage Hotels',
    rating: 5,
    tint: '#FFD1D1',
    avatarUrl: '/assets/testimonials/avatar_7.jpg',
  },
  {
    quote:
      'It is the subtle details — like the velvet cocoa butter mouthfeel and clean snap. Our culinary students notice the craftsmanship before they even read the label.',
    author: 'Sneha Reddy',
    role: 'Pastry Arts Director',
    company: 'Corvo Academy',
    rating: 5,
    tint: '#C9F0EC',
    avatarUrl: '/assets/testimonials/avatar_8.jpg',
  },
];

// Deterministic pseudo-random helper for orbital scatter and sinusoidal drift
function pseudoRandom(index: number, seed: number) {
  const n = Math.sin(index * 12.9898 + seed * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

// Exact Star SVG Path from TestimonialLoom
const STAR_PATH =
  'M10 1.6l2.36 4.93 5.4.72-3.94 3.76.97 5.37L10 13.8l-4.79 2.58.97-5.37L2.24 7.25l5.4-.72L10 1.6z';

export const Gr8rTestimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerSize, setContainerSize] = useState({ w: 1200, h: 620 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [cycleKey, setCycleKey] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const avatarElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const animFrameRef = useRef<number>(0);

  // Format entries with word arrays and initials
  const entries: TestimonialEntry[] = useMemo(() => {
    return TESTIMONIALS_DATA.map((item) => ({
      ...item,
      words: item.quote.split(' '),
      initials: item.author
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w.charAt(0).toUpperCase())
        .join(''),
    }));
  }, []);

  const total = entries.length;
  const activeEntry = entries[currentIndex];

  // Measure container responsive dimensions
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateSize = () => {
      setContainerSize({ w: el.clientWidth, h: el.clientHeight });
    };

    updateSize();

    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(updateSize);
      ro.observe(el);
      return () => ro.disconnect();
    } else {
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);
    }
  }, []);

  // IntersectionObserver to only drift and count down when visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry) setIsVisible(entry.isIntersecting);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Testimonial Navigation
  const navigateDelta = useCallback(
    (delta: number) => {
      setCurrentIndex((prev) => (prev + delta + total) % total);
      setCycleKey((prev) => prev + 1);
    },
    [total]
  );

  const selectIndex = useCallback(
    (idx: number) => {
      if (idx !== currentIndex) {
        setCurrentIndex(idx);
        setCycleKey((prev) => prev + 1);
      }
    },
    [currentIndex]
  );

  // Continuous floating drift animation via requestAnimationFrame
  useEffect(() => {
    if (!isVisible) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    let startTime = performance.now();

    const loop = (currentTime: number) => {
      const elapsedSeconds = (currentTime - startTime) / 1000;
      const driftSpeed = 0.45;
      const driftDistance = 8; // subtle floating amplitude

      avatarElementsRef.current.forEach((el, idx) => {
        if (!el || idx === currentIndex) return;

        const phaseX = pseudoRandom(idx, 5) * Math.PI * 2;
        const phaseY = pseudoRandom(idx, 6) * Math.PI * 2;
        const offsetX =
          Math.sin(elapsedSeconds * (0.7 + pseudoRandom(idx, 7) * 0.6) * driftSpeed + phaseX) *
          driftDistance;
        const offsetY =
          Math.cos(elapsedSeconds * (0.6 + pseudoRandom(idx, 8) * 0.5) * driftSpeed + phaseY) *
          driftDistance;

        el.style.transform = `translate3d(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px, 0)`;
      });

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isVisible, currentIndex]);

  // Spatial layout mathematics (exact adaptation of po from TestimonialLoom)
  const layout = useMemo(() => {
    const width = containerSize.w || 1200;
    const height = containerSize.h || 620;
    const isNarrow = width < 780;

    const avatarSize = clamp(58, 36, 90);
    const focusSize = clamp(126, 70, 160) * (isNarrow ? 0.72 : 1);
    const bubbleWidth = Math.min(clamp(540, 280, 850), isNarrow ? width - 36 : width * 0.58);

    const horizontalOffset = (width - (isNarrow ? bubbleWidth : focusSize + 24 + bubbleWidth)) / 2;

    const focusPos = isNarrow
      ? { x: width / 2, y: height * 0.22, s: focusSize }
      : { x: horizontalOffset + focusSize / 2, y: height / 2, s: focusSize };

    const bubbleX = isNarrow ? (width - bubbleWidth) / 2 : horizontalOffset + focusSize + 24;
    const bubbleY = isNarrow ? focusPos.y + focusSize / 2 + 18 : height / 2;

    // Orbital positioning for inactive avatars
    const homes: { x: number; y: number; s: number }[] = [];
    const count = Math.max(1, total);

    for (let r = 0; r < total; r++) {
      const angle = ((r + 0.5) / count) * Math.PI * 2 - Math.PI / 2 + (pseudoRandom(r, 1) - 0.5) * 0.4;
      const radiusX = width / 2 - avatarSize * 1.1;
      const radiusY = height / 2 - avatarSize * 1.1;
      const distanceFactor = 0.84 + pseudoRandom(r, 2) * 0.16;

      let posX = width / 2 + Math.cos(angle) * radiusX * distanceFactor;
      let posY = height / 2 + Math.sin(angle) * radiusY * distanceFactor;
      const size = avatarSize * (isNarrow ? 0.75 + pseudoRandom(r, 4) * 0.2 : 0.8 + pseudoRandom(r, 4) * 0.35);

      if (isNarrow) {
        const row = r % 2;
        const col = Math.floor(r / 2);
        const colsInRow = row ? Math.floor(total / 2) : Math.ceil(total / 2);
        posX = ((col + 0.5) / Math.max(1, colsInRow)) * width;
        posY = row ? height - avatarSize * 0.75 - (col % 2) * avatarSize * 0.25 : avatarSize * 0.75 + (col % 2) * avatarSize * 0.25;
      }

      homes.push({
        x: clamp(posX, size / 2 + 8, width - size / 2 - 8),
        y: clamp(posY, size / 2 + 8, height - size / 2 - 8),
        s: size,
      });
    }

    return { isNarrow, focus: focusPos, bubbleX, bubbleY, bubbleWidth, homes };
  }, [containerSize, total]);

  return (
    <section
      id="testimonials"
      className="py-24 sm:py-36 text-[#2A1A10] border-t border-black/5 select-none overflow-hidden relative"
      style={{
        background:
          'radial-gradient(60% 55% at 52% 48%, #FCF5EC 0%, #F4EBDF 55%, #EFE6D8 100%)',
      }}
    >
      {/* Soft warm peach ambient glow (TestimonialLoom light background) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[620px] rounded-full bg-[#FBD9B0]/30 blur-[180px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span
            className="text-xs font-black tracking-[0.25em] uppercase text-[#F6521E] block mb-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            TESTIMONIALS
          </span>

          <h2
            className="text-5xl sm:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-[#381A0E] leading-[0.9]"
            style={{ fontFamily: "'Cabin Condensed', 'Bayon', Impact, sans-serif" }}
          >
            LOVED BY
            <br />
            CHOCOLATE LOVERS
          </h2>
        </div>

        {/* TestimonialLoom Interactive Constellation Canvas */}
        <div
          ref={containerRef}
          role="region"
          aria-roledescription="testimonials"
          aria-label="Chef & Client Testimonials"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
              e.preventDefault();
              navigateDelta(1);
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
              e.preventDefault();
              navigateDelta(-1);
            }
          }}
          onPointerEnter={() => setIsHovered(true)}
          onPointerLeave={() => setIsHovered(false)}
          className="relative w-full h-[640px] sm:h-[620px] rounded-3xl sm:rounded-[36px] overflow-hidden focus:outline-none"
          style={{ background: 'transparent' }}
        >

          {/* Hidden Accessible Live Announcement */}
          <div aria-live="polite" className="sr-only">
            {`${activeEntry.quote} — ${activeEntry.author}, ${activeEntry.role}`}
          </div>

          {/* Testimonial Avatars Constellation */}
          {entries.map((entry, idx) => {
            const isSpeaker = idx === currentIndex;
            const target = isSpeaker ? layout.focus : layout.homes[idx];

            return (
              <button
                key={entry.author}
                type="button"
                aria-label={isSpeaker ? `${entry.author}, speaking now` : `Hear from ${entry.author}`}
                aria-current={isSpeaker ? 'true' : undefined}
                onClick={() => selectIndex(idx)}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: `${target.s}px`,
                  height: `${target.s}px`,
                  transform: `translate3d(${(target.x - target.s / 2).toFixed(1)}px, ${(
                    target.y - target.s / 2
                  ).toFixed(1)}px, 0)`,
                  zIndex: isSpeaker ? 20 : 5,
                  transition:
                    'transform 0.9s cubic-bezier(0.2, 0.9, 0.2, 1), width 0.9s cubic-bezier(0.2, 0.9, 0.2, 1), height 0.9s cubic-bezier(0.2, 0.9, 0.2, 1), opacity 0.4s ease',
                  opacity: isSpeaker ? 1 : 0.82,
                }}
                className="group cursor-pointer rounded-full p-0 border-none bg-none outline-none focus-visible:ring-4 focus-visible:ring-[#F6521E]"
              >
                {/* Floating drift wrapper for inactive avatars */}
                <div
                  ref={(el) => {
                    avatarElementsRef.current[idx] = isSpeaker ? null : el;
                    if (isSpeaker && el) el.style.transform = 'none';
                  }}
                  className="absolute inset-0 transition-transform duration-300 group-hover:scale-110"
                >
                  {/* Avatar Portrait with Ring Shadow */}
                  <div
                    className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center font-bold text-sm shadow-md"
                    style={{
                      background: entry.tint,
                      boxShadow: isSpeaker
                        ? '0 0 0 3px #FFFFFF, 0 18px 36px -12px rgba(42,14,4,0.28)'
                        : '0 0 0 2.5px #FFFFFF, 0 10px 22px -10px rgba(42,14,4,0.20)',
                    }}
                  >
                    <span className="text-[#2A0E04]/75 select-none font-bold">
                      {entry.initials}
                    </span>
                    <img
                      src={entry.avatarUrl}
                      alt={entry.author}
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>

                  {/* Circular Animated Progress Ring for Active Speaker */}
                  {isSpeaker && (
                    <svg
                      key={`ring-${cycleKey}`}
                      className="absolute -inset-[9px] w-[calc(100%+18px)] h-[calc(100%+18px)] pointer-events-none -rotate-90"
                      viewBox="0 0 36 36"
                      aria-hidden="true"
                    >
                      {/* Background track circle */}
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke="#000000"
                        strokeOpacity={0.08}
                        strokeWidth="2"
                      />
                      {/* Animated countdown progress ring */}
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke="#F6521E"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        pathLength={100}
                        style={{
                          strokeDasharray: 100,
                          strokeDashoffset: 100,
                          animation: 'loomRing 7s linear forwards',
                          animationPlayState: isHovered ? 'paused' : 'running',
                        }}
                        onAnimationEnd={() => navigateDelta(1)}
                      />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}

          {/* Testimonial Speech Bubble */}
          <div
            key={`bubble-${cycleKey}`}
            style={{
              position: 'absolute',
              left: `${layout.bubbleX}px`,
              top: `${layout.bubbleY}px`,
              width: `${layout.bubbleWidth}px`,
              zIndex: 30,
              transform: layout.isNarrow ? 'none' : 'translateY(-50%)',
              animation: layout.isNarrow
                ? 'loomPopNarrow 0.65s cubic-bezier(0.2, 1.25, 0.3, 1) both'
                : 'loomPop 0.65s cubic-bezier(0.2, 1.25, 0.3, 1) both',
            }}
          >
            <div
              className="relative bg-white text-[#2A0E04] rounded-3xl p-6 sm:p-9 border border-black/5"
              style={{
                boxShadow:
                  '0 32px 70px -24px rgba(0,0,0,0.65), 0 8px 24px -10px rgba(0,0,0,0.3)',
              }}
            >
              {/* Pointing Arrow Pointer */}
              <span
                aria-hidden="true"
                className="absolute w-5 h-5 bg-white border border-black/5"
                style={{
                  borderRadius: 3,
                  transform: 'rotate(45deg)',
                  ...(layout.isNarrow
                    ? { top: -9, left: 'calc(50% - 10px)', borderRight: 'none', borderBottom: 'none' }
                    : { left: -9, top: 'calc(50% - 10px)', borderTop: 'none', borderRight: 'none' }),
                }}
              />

              {/* 5 Star Rating */}
              <div
                role="img"
                aria-label={`Rated ${activeEntry.rating} out of 5`}
                className="inline-flex items-center gap-1 mb-4"
              >
                {[0, 1, 2, 3, 4].map((starIdx) => (
                  <svg
                    key={starIdx}
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className="text-[#F6521E]"
                  >
                    <path d={STAR_PATH} fill="currentColor" opacity={starIdx < activeEntry.rating ? 1 : 0.25} />
                  </svg>
                ))}
              </div>

              {/* Word-by-Word Reveal Quote */}
              <p className="text-base sm:text-lg md:text-xl font-normal text-[#2A0E04] leading-relaxed m-0 font-sans">
                {activeEntry.words.map((word, wIdx) => (
                  <span
                    key={`word-${wIdx}`}
                    className="inline-block"
                    style={{
                      opacity: 0,
                      transform: 'translateY(0.35em)',
                      filter: 'blur(4px)',
                      animation: 'loomWord 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
                      animationDelay: `${wIdx * 32 + 220}ms`,
                    }}
                  >
                    {word}&nbsp;
                  </span>
                ))}
              </p>

              {/* Meta & Navigation Bar */}
              <div
                className="flex items-center justify-between gap-4 mt-6 pt-5 border-t border-[#2A0E04]/10 flex-wrap"
                style={{
                  opacity: 0,
                  animation: 'loomFade 0.5s ease forwards',
                  animationDelay: '420ms',
                }}
              >
                {/* Author & Role */}
                <div className="min-w-0 pr-2">
                  <div className="font-bold text-base sm:text-lg text-[#2A0E04] leading-tight">
                    {activeEntry.author}
                  </div>
                  <div className="text-xs sm:text-sm text-[#7A5C4D] font-medium mt-0.5">
                    {activeEntry.role} · <span className="text-[#7A5C4D] font-semibold">{activeEntry.company}</span>
                  </div>
                </div>

                {/* Counter & Prev/Next Arrow Buttons */}
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold text-[#7A5C4D] tabular-nums tracking-wider mr-1">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </span>

                  {/* Previous Button */}
                  <button
                    type="button"
                    aria-label="Previous testimonial"
                    onClick={() => navigateDelta(-1)}
                    className="w-9 h-9 rounded-full flex items-center justify-center bg-[#2A0E04]/5 text-[#2A0E04] hover:bg-[#2A0E04]/10 hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  >
                    <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true">
                      <path
                        d="M11 4 6 9l5 5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {/* Next Button */}
                  <button
                    type="button"
                    aria-label="Next testimonial"
                    onClick={() => navigateDelta(1)}
                    className="w-9 h-9 rounded-full flex items-center justify-center bg-[#F6521E] text-white hover:bg-[#E0491A] hover:scale-110 active:scale-95 shadow-md transition-all cursor-pointer font-bold"
                  >
                    <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true">
                      <path
                        d="M7 4l5 5-5 5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Keyframes for TestimonialLoom animations */}
        <style>{`
          @keyframes loomRing {
            from { stroke-dashoffset: 100; }
            to { stroke-dashoffset: 0; }
          }
          @keyframes loomPop {
            from {
              opacity: 0;
              transform: translateY(-50%) scale(0.65);
            }
            to {
              opacity: 1;
              transform: translateY(-50%) scale(1);
            }
          }
          @keyframes loomPopNarrow {
            from {
              opacity: 0;
              transform: scale(0.75);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          @keyframes loomWord {
            to {
              opacity: 1;
              transform: translateY(0);
              filter: blur(0);
            }
          }
          @keyframes loomFade {
            to {
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </section>
  );
};
