import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MotionOverlayMenu } from './MotionOverlayMenu';

interface Gr8rNavbarProps {
  onOpenReservation?: () => void;
  onNavigate?: (id: string) => void;
  currentPage?: string;
  variant?: 'floating' | 'solid';
}

export const Gr8rNavbar: React.FC<Gr8rNavbarProps> = ({
  onNavigate,
  currentPage = 'home',
  variant = 'floating',
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'ABOUT', id: 'about' },
    { label: 'PRODUCT', id: 'menu' },
    { label: 'BRANCH', id: 'branch' },
    { label: 'BLOG', id: 'blog' },
    { label: 'CONTACT', id: 'contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Dynamic Island Header or Solid Brown Header */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          variant === 'solid'
            ? 'bg-[#381A0E] border-b border-[#FEE8B4]/15 px-4 sm:px-8 py-3.5 sm:py-4 shadow-lg'
            : isScrolled
            ? 'top-2.5 sm:top-4 px-3 sm:px-6 flex justify-center'
            : 'top-0 px-4 sm:px-8 pt-5 sm:pt-6 pb-4 bg-gradient-to-b from-[#1C0E07]/80 via-[#1C0E07]/40 to-transparent flex justify-center'
        }`}
      >
        <motion.div
          layout
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full transition-all duration-300 flex items-center justify-between ${
            variant === 'solid'
              ? 'max-w-7xl mx-auto'
              : isScrolled
              ? 'max-w-6xl rounded-full bg-[#1C0E07]/90 backdrop-blur-2xl border border-[#F9BD03]/35 shadow-[0_18px_45px_rgba(0,0,0,0.6),0_0_24px_rgba(249,189,3,0.15)] py-2 sm:py-2.5 px-4 sm:px-7'
              : 'max-w-7xl mx-auto'
          }`}
        >
          {/* Official ROMAS™ Spreading Happiness Logo */}
          <button
            onClick={() => onNavigate && onNavigate('home')}
            className="flex items-center hover:opacity-90 transition-opacity cursor-pointer group text-left shrink-0 py-0.5"
            aria-label="ROMAS Chocolates Home"
          >
            <img
              src="/assets/romas-logo-gold.png"
              alt="ROMAS Spreading Happiness"
              className={`w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(249,189,3,0.35)] transition-all duration-300 ${
                variant === 'solid' ? 'h-8 sm:h-10' : isScrolled ? 'h-7 sm:h-9' : 'h-8 sm:h-11 md:h-12'
              }`}
            />
          </button>

          {/* Center Navigation Links with Capsule Hover Style */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive =
                (link.id === 'about' && currentPage === 'about') ||
                (link.id === 'home' && currentPage === 'home');
              return (
                <button
                  key={link.label}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={`text-xs font-black tracking-widest uppercase transition-all px-3.5 py-1.5 rounded-full select-none cursor-pointer ${
                    isActive
                      ? 'bg-[#F9BD03] text-[#1C0E07] shadow-sm'
                      : 'text-[#FEE8B4] hover:text-[#F9BD03] hover:bg-[#FEE8B4]/10'
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Framer Motion Overlay Menu Toggle Button */}
          <div className="flex items-center">
            <MotionOverlayMenu
              onNavigate={onNavigate}
              currentPage={currentPage}
            />
          </div>
        </motion.div>
      </header>
    </>
  );
};
