import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY_INFO } from '../data/products';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_IN: [number, number, number, number] = [0.4, 0, 1, 1];
const EASE_SMOOTH: [number, number, number, number] = [0.65, 0, 0.35, 1];
const ICON_MS = 520;

export interface MenuItem {
  label: string;
  id: string;
  href?: string;
  badge?: string;
}

export interface SecondaryLink {
  label: string;
  href: string;
}

interface MotionOverlayMenuProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onNavigate?: (id: string) => void;
  currentPage?: string;
  links?: MenuItem[];
  secondary?: SecondaryLink[];
  variant?: 'floating' | 'solid';
}

const DEFAULT_LINKS: MenuItem[] = [
  { label: 'SHOP', id: 'shop', badge: '3D' },
  { label: 'ABOUT', id: 'about' },
  { label: 'PRODUCT', id: 'menu' },
  { label: 'CAREERS', id: 'careers' },
  { label: 'BLOG', id: 'blog' },
  { label: 'CONTACT', id: 'contact' },
];

const DEFAULT_SECONDARY: SecondaryLink[] = [
  { label: 'Instagram', href: 'https://instagram.com' },
  {
    label: 'WhatsApp Concierge',
    href: 'https://wa.me/919098229454?text=Hello%20Roma%20Foods%20Concierge,%20I%20am%20interested%20in%20ROMAS%20chocolates.',
  },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
];

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export const MotionOverlayMenu: React.FC<MotionOverlayMenuProps> = ({
  onNavigate,
  links = DEFAULT_LINKS,
  secondary = DEFAULT_SECONDARY,
}) => {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [btnHover, setBtnHover] = useState(false);
  const [mounted, setMounted] = useState(false);

  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const originRef = useRef('calc(100% - 44px) 36px');
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateOrigin = useCallback(() => {
    const el = toggleBtnRef.current;
    if (el && typeof window !== 'undefined') {
      const rect = el.getBoundingClientRect();
      originRef.current = `${Math.round(rect.right - 20)}px ${Math.round(rect.top + rect.height / 2)}px`;
    }
  }, []);

  const openMenu = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    updateOrigin();
    setHovered(null);
    setClosing(false);
    setOpen(true);
  }, [updateOrigin]);

  const closeMenu = useCallback(() => {
    if (closeTimerRef.current) return;
    setClosing(true);
    const wait = ICON_MS * 0.35;
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      setClosing(false);
      setOpen(false);
    }, wait);
  }, []);

  const toggleMenu = useCallback(() => {
    if (open) {
      closeMenu();
    } else {
      openMenu();
    }
  }, [open, closeMenu, openMenu]);

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, closeMenu]);

  const handleLinkClick = (id: string, href?: string) => {
    closeMenu();
    if (href && (href.startsWith('/') || href.startsWith('http'))) {
      if (href.startsWith('http')) {
        window.open(href, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = href;
      }
      return;
    }
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Toggle button two-phase animation
  const dur = ICON_MS / 1000;
  const phase = {
    duration: dur,
    times: [0, 0.5, 1],
    ease: EASE_SMOOTH,
  };

  const topVariants = {
    open: { y: [null, 3.5, 3.5], rotate: [null, 0, 45], transition: phase },
    closed: { y: [null, 3.5, 0], rotate: [null, 0, 0], transition: phase },
  };

  const bottomVariants = {
    open: { y: [null, -3.5, -3.5], rotate: [null, 0, -45], transition: phase },
    closed: { y: [null, -3.5, 0], rotate: [null, 0, 0], transition: phase },
  };

  const iconActive = open && !closing;
  const isButtonActive = btnHover || iconActive;

  // Circular reveal variants
  const bgVariants = {
    hidden: {
      clipPath: `circle(0% at ${originRef.current})`,
    },
    visible: {
      clipPath: `circle(150% at ${originRef.current})`,
      transition: {
        duration: 0.85,
        ease: EASE_OUT,
      },
    },
    exit: {
      clipPath: `circle(0% at ${originRef.current})`,
      transition: {
        duration: 0.7,
        ease: EASE_IN,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 28,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: EASE_OUT,
        delay: 0.18 + i * 0.06,
      },
    }),
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.25,
        ease: EASE_IN,
      },
    },
  };

  const footerDelay = 0.24 + links.length * 0.07 + 0.05;

  const dividerVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.75, ease: EASE_OUT, delay: footerDelay },
    },
    exit: { opacity: 0, transition: { duration: 0.25, ease: EASE_IN } },
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: (j: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: EASE_OUT, delay: footerDelay + 0.1 + j * 0.06 },
    }),
    exit: { opacity: 0, transition: { duration: 0.25, ease: EASE_IN } },
  };

  return (
    <>
      {/* Sleek Toggle Button (Works on Desktop & Mobile) */}
      <button
        ref={toggleBtnRef}
        type="button"
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={open}
        onClick={toggleMenu}
        onPointerEnter={(e) => {
          if (e.pointerType === 'mouse') setBtnHover(true);
        }}
        onPointerLeave={() => setBtnHover(false)}
        className="flex items-center gap-3 p-1 rounded-full cursor-pointer select-none text-[#FEE8B4] hover:text-[#F9BD03] transition-colors focus:outline-none"
      >
        {/* Sliding Label: "Menu" / "Close" */}
        <span
          className="text-xs font-black tracking-widest uppercase hidden sm:grid justify-items-end overflow-hidden py-1 leading-none select-none"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <motion.span
            initial={false}
            animate={{ y: iconActive ? -14 : 0, opacity: iconActive ? 0 : 1 }}
            transition={{ duration: 0.45, ease: EASE_SMOOTH }}
            className="col-start-1 row-start-1"
          >
            Menu
          </motion.span>
          <motion.span
            initial={false}
            animate={{ y: iconActive ? 0 : 14, opacity: iconActive ? 1 : 0 }}
            transition={{ duration: 0.45, ease: EASE_SMOOTH }}
            className="col-start-1 row-start-1"
          >
            Close
          </motion.span>
        </span>

        {/* Circular Morphing Icon Pill */}
        <span
          className={`w-10 h-10 rounded-full flex flex-col items-end justify-center gap-[5px] px-[11px] transition-all duration-300 border ${
            isButtonActive
              ? 'bg-[#F9BD03]/25 border-[#F9BD03]/50 text-[#F9BD03] shadow-[0_0_15px_rgba(249,189,3,0.3)]'
              : 'bg-[#FEE8B4]/10 border-[#FEE8B4]/20 text-[#FEE8B4]'
          }`}
        >
          {/* Top Line */}
          <motion.span
            className="block h-[2px] rounded-full bg-current origin-center"
            style={{ width: 18 }}
            variants={topVariants}
            animate={iconActive ? 'open' : 'closed'}
          />
          {/* Bottom Line (Animates from 11px to 18px on hover/open) */}
          <motion.span
            className="block h-[2px] rounded-full bg-current origin-center"
            style={{
              width: isButtonActive ? 18 : 11,
              transition: 'width 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            variants={bottomVariants}
            animate={iconActive ? 'open' : 'closed'}
          />
        </span>
      </button>

      {/* Full-Screen Portal Overlay */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label="Full screen site navigation"
                variants={bgVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed inset-0 z-[9999] overflow-hidden flex flex-col justify-between text-[#FEE8B4] bg-[#160A04] selection:bg-[#F9BD03] selection:text-[#160A04]"
              >
                {/* Scoped CSS to completely eliminate any scrollbars on the overlay */}
                <style>{`
                  .no-menu-scrollbar {
                    scrollbar-width: none !important;
                    -ms-overflow-style: none !important;
                  }
                  .no-menu-scrollbar::-webkit-scrollbar {
                    display: none !important;
                    width: 0 !important;
                    height: 0 !important;
                    background: transparent !important;
                  }
                `}</style>

                {/* Ambient Golden Chocolate Glow Effect */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none bg-[radial-gradient(720px_520px_at_88%_12%,rgba(249,189,3,0.12),transparent_70%)]"
                />

                {/* Top Header Bar Inside Overlay */}
                <header className="relative z-10 shrink-0 w-full max-w-7xl mx-auto px-6 sm:px-10 py-3 sm:py-4 flex items-center justify-between border-b border-[#FEE8B4]/10">
                  <div
                    onClick={() => {
                      closeMenu();
                      onNavigate?.('home');
                    }}
                    className="flex items-center cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <img
                      src="/assets/romas-logo-gold.png"
                      alt="ROMAS Spreading Happiness"
                      className="h-7 sm:h-9 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(249,189,3,0.35)]"
                    />
                  </div>

                  {/* Close Button Inside Overlay */}
                  <button
                    type="button"
                    onClick={closeMenu}
                    className="flex items-center gap-2.5 p-1 rounded-full cursor-pointer select-none text-[#FEE8B4] hover:text-[#F9BD03] transition-colors"
                  >
                    <span
                      className="text-xs font-black tracking-widest uppercase hidden sm:inline-block leading-none"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Close
                    </span>
                    <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex flex-col items-end justify-center gap-[4.5px] px-[10px] bg-[#F9BD03]/25 border border-[#F9BD03]/50 text-[#F9BD03] shadow-[0_0_15px_rgba(249,189,3,0.3)]">
                      <motion.span
                        className="block h-[2px] rounded-full bg-current origin-center"
                        style={{ width: 17 }}
                        variants={topVariants}
                        animate="open"
                      />
                      <motion.span
                        className="block h-[2px] rounded-full bg-current origin-center"
                        style={{ width: 17 }}
                        variants={bottomVariants}
                        animate="open"
                      />
                    </span>
                  </button>
                </header>

                {/* Main Navigation Links Area with Staggered Blur + Slide */}
                <div className="relative z-10 flex-1 min-h-0 flex flex-col max-w-7xl w-full mx-auto px-6 sm:px-12 md:px-16 py-2 overflow-y-auto no-menu-scrollbar">
                  <nav aria-label="Overlay main navigation" className="my-auto w-full max-w-4xl py-2">
                    <ul className="flex flex-col gap-1 sm:gap-2 md:gap-2.5 list-none p-0 m-0">
                      {links.map((item, i) => {
                        const isHovered = hovered === i;
                        const dimmed = hovered !== null && !isHovered;

                        return (
                          <motion.li
                            key={item.id}
                            custom={i}
                            variants={itemVariants}
                            className="m-0 p-0"
                          >
                            <motion.button
                              type="button"
                              onClick={() => handleLinkClick(item.id, item.href)}
                              onPointerEnter={(e) => {
                                if (e.pointerType === 'mouse') setHovered(i);
                              }}
                              onPointerLeave={() => setHovered(null)}
                              animate={{
                                x: isHovered ? 14 : 0,
                                opacity: dimmed ? 0.35 : 1,
                              }}
                              transition={{
                                type: 'spring',
                                stiffness: 350,
                                damping: 30,
                                mass: 0.6,
                              }}
                              className="w-full text-left inline-flex items-center gap-3 sm:gap-5 py-0.5 sm:py-1 cursor-pointer select-none group transition-colors"
                            >
                              {/* Number Badge (01, 02, etc.) */}
                              <span
                                className="font-mono font-bold tracking-widest text-[#F9BD03]/80 group-hover:text-[#F9BD03] select-none shrink-0"
                                style={{ fontSize: 'clamp(0.7rem, 1.4vh, 1rem)' }}
                              >
                                {pad(i + 1)}
                              </span>
                              {/* Link Label with fluid responsive sizing so it never overflows 100vh */}
                              <span
                                className="font-black uppercase tracking-tight text-[#FEE8B4] group-hover:text-[#F9BD03] transition-colors inline-flex items-center"
                                style={{
                                  fontSize: 'clamp(1.35rem, 3.8vh, 3.25rem)',
                                  lineHeight: 1.1,
                                  fontFamily: "'Cabin Condensed', 'Bayon', 'Inter', Impact, sans-serif",
                                }}
                              >
                                {item.label}
                                {item.badge && (
                                  <span className="ml-3 px-2 py-0.5 text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase bg-[#F9BD03] text-[#160A04] rounded-full shadow-[0_0_10px_rgba(249,189,3,0.35)]">
                                    {item.badge}
                                  </span>
                                )}
                              </span>

                              {/* Sleek Golden Accent Arrow that appears on hover */}
                              <motion.span
                                initial={false}
                                animate={{
                                  opacity: isHovered ? 1 : 0,
                                  x: isHovered ? 0 : -8,
                                }}
                                transition={{ duration: 0.18 }}
                                className="hidden sm:inline-block text-[#F9BD03] text-xl sm:text-2xl font-bold ml-3"
                              >
                                →
                              </motion.span>
                            </motion.button>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </nav>
                </div>

                {/* Footer Section Inside Overlay */}
                <footer className="relative z-10 shrink-0 max-w-7xl w-full mx-auto px-6 sm:px-12 pb-4 pt-2">
                  {/* Expanding Divider Line */}
                  <motion.div
                    variants={dividerVariants}
                    className="h-[1px] w-full bg-[#FEE8B4]/15 origin-left mb-3 sm:mb-4"
                  />

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs font-medium text-[#FEE8B4]/70">
                    <motion.div custom={0} variants={footerVariants}>
                      <span className="text-[10px] sm:text-xs tracking-wider text-[#FEE8B4]/60">
                        © 2026 ROMAS CHOCOLATES (ROMA FOODS). DHAMTARI WORKS.
                      </span>
                    </motion.div>

                    {/* Secondary Quick Links with Animated Underline */}
                    <ul className="flex flex-wrap items-center gap-3 sm:gap-5 list-none m-0 p-0">
                      {secondary.map((sec, j) => (
                        <motion.li key={sec.label} custom={j + 1} variants={footerVariants}>
                          <a
                            href={sec.href}
                            target={sec.href.startsWith('http') ? '_blank' : undefined}
                            rel={sec.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            onClick={(e) => {
                              if (sec.href.startsWith('/')) {
                                e.preventDefault();
                                closeMenu();
                                window.location.href = sec.href;
                              }
                            }}
                            className="relative group text-[10px] sm:text-xs text-[#FEE8B4]/75 hover:text-[#F9BD03] transition-colors pb-0.5"
                          >
                            <span>{sec.label}</span>
                            <span className="absolute left-0 right-0 bottom-0 h-[1.5px] bg-[#F9BD03] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
                          </a>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </footer>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};
