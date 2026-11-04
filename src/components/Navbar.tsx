import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, BookOpen, ChevronRight } from 'lucide-react';
import { RomasLogo } from './RomasLogo';
import { COMPANY_INFO } from '../data/products';

interface NavbarProps {
  onOpenBrandGuide: () => void;
  onOpenSampleBag: () => void;
  sampleCount: number;
  onNavigate?: (sectionId: string, label?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBrandGuide,
  onOpenSampleBag,
  sampleCount,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'chocolates', 'process', 'industries', 'applications', 'recipes', 'story', 'faq', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 280 && rect.bottom >= 280) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Collection', href: '#chocolates', sectionId: 'chocolates' },
    { label: 'The Craft', href: '#process', sectionId: 'process' },
    { label: 'Industries', href: '#industries', sectionId: 'industries' },
    { label: 'Chef Studio', href: '#recipes', sectionId: 'recipes' },
    { label: 'Heritage', href: '#story', sectionId: 'story' },
    { label: 'FAQ', href: '#faq', sectionId: 'faq' },
  ];

  const handleLinkClick = (e: React.MouseEvent, sectionId: string, label: string) => {
    if (onNavigate) {
      e.preventDefault();
      setMobileMenuOpen(false);
      onNavigate(sectionId, label);
    }
  };

  const framerEase = [0.16, 1, 0.3, 1] as const;

  return (
    <>
      {/* Framer-Style Floating Pill Navbar with Spring Entrance */}
      <div className="fixed top-3 sm:top-5 inset-x-0 z-40 px-3 sm:px-6 pointer-events-none">
        <motion.header
          initial={{ y: -32, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, ease: framerEase }}
          className={`max-w-6xl mx-auto rounded-full transition-all duration-300 pointer-events-auto border py-2.5 sm:py-3.5 px-5 sm:px-7 ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-2xl border-[#381305]/15 shadow-[0_12px_40px_rgba(42,14,4,0.12)]'
              : 'bg-white/85 backdrop-blur-xl border-[#381305]/10 shadow-[0_8px_30px_rgba(42,14,4,0.06)]'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            
            {/* Left: Official ROMAS Brand Logo */}
            <motion.a
              href="#home"
              onClick={(e) => handleLinkClick(e, 'home', 'The Maison')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="flex items-center gap-2 shrink-0 cursor-pointer"
              aria-label="ROMAS Official Brand Logo"
            >
              <RomasLogo variant="brown" size="sm" showTagline={true} />
            </motion.a>

            {/* Center: Framer-Style Editorial Links with Layout Indicator */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[11.5px] font-semibold tracking-[0.16em] uppercase">
              {navLinks.map((link) => {
                const isActive = activeSection === link.sectionId;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.sectionId, link.label)}
                    className={`whitespace-nowrap transition-colors relative py-1 cursor-pointer ${
                      isActive
                        ? 'text-[#C59B27] font-bold'
                        : 'text-[#2A0E04]/75 hover:text-[#C59B27]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="navbarActiveDot"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#C59B27]"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right: Framer-Style Capsule Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Sample Bag Capsule Button */}
              <motion.button
                onClick={onOpenSampleBag}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="relative inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-[#FAF8F5] hover:bg-[#F6F1EA] border border-[#381305]/15 text-[#381305] text-[11px] font-bold uppercase tracking-wider cursor-pointer shadow-sm hover:border-[#C59B27]"
                aria-label={`Open sample bag with ${sampleCount} items`}
              >
                <div className="relative">
                  <ShoppingBag className="w-3.5 h-3.5 text-[#381305]" />
                  {sampleCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                      className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#D4AF37] text-[#140602] font-black text-[9px] flex items-center justify-center ring-2 ring-white"
                    >
                      {sampleCount}
                    </motion.span>
                  )}
                </div>
                <span className="hidden sm:inline">Sample Bag</span>
              </motion.button>

              {/* Trade Concierge Pill Button */}
              <motion.a
                href="#contact"
                onClick={(e) => handleLinkClick(e, 'contact', 'Trade Concierge')}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#140602] bg-gradient-to-r from-[#FAD674] via-[#E6C280] to-[#C59B27] hover:brightness-105 rounded-full shadow-sm cursor-pointer"
              >
                <span className="hidden sm:inline">Trade Concierge</span>
                <span className="sm:hidden">Trade</span>
              </motion.a>

              {/* Mobile Menu Hamburger */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileTap={{ scale: 0.92 }}
                className="lg:hidden p-2 rounded-full text-[#2A0E04] hover:bg-[#FAF8F5] transition-colors cursor-pointer border border-[#381305]/10"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </motion.button>

            </div>

          </div>
        </motion.header>
      </div>

      {/* Mobile Slide-down Drawer with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: framerEase }}
            className="fixed inset-x-0 top-20 z-30 bg-white/98 backdrop-blur-2xl border-b border-[#381305]/15 shadow-2xl lg:hidden max-h-[85vh] overflow-y-auto p-6"
          >
            <div className="max-w-md mx-auto space-y-6">
              
              <div className="flex justify-center pb-4 border-b border-[#381305]/10">
                <RomasLogo variant="badge" size="sm" showTagline={true} />
              </div>

              <div className="space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.sectionId, link.label)}
                    className="flex items-center justify-between py-3 px-4 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] text-[#2A0E04] hover:bg-[#FAF8F5] hover:text-[#C59B27] transition-colors"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#C59B27]" />
                  </a>
                ))}
              </div>

              <div className="pt-4 border-t border-[#381305]/10 space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSampleBag();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#FAF8F5] border border-[#381305]/20 text-[#381305] text-xs font-bold uppercase tracking-[0.18em]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>View Sample Bag ({sampleCount})</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBrandGuide();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 text-[11px] font-semibold text-[#8C4724] uppercase tracking-wider"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Brand Identity Standards</span>
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
