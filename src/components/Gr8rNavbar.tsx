import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import { MotionOverlayMenu } from './MotionOverlayMenu';
import { useCart } from '../context/CartContext';

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
  const { cartCount, cartTotal, setIsCartOpen, wishlistCount, setIsWishlistOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'SHOP', id: 'shop' },
    { label: 'ABOUT', id: 'about' },
    { label: 'PRODUCT', id: 'menu' },
    { label: 'CAREERS', id: 'careers' },
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
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 flex justify-center ${
          variant === 'solid'
            ? 'bg-[#381A0E] border-b border-[#FEE8B4]/15 px-4 sm:px-8 py-2.5 sm:py-3 shadow-lg'
            : isScrolled
            ? 'px-4 sm:px-8 py-2 sm:py-2.5 bg-[#1C0E07]/95 backdrop-blur-xl border-b border-gr8r-yellow/15 shadow-lg'
            : 'px-4 sm:px-8 pt-3.5 sm:pt-4 pb-2.5 bg-linear-to-b from-[#1C0E07]/80 via-[#1C0E07]/40 to-transparent'
        }`}
      >
        <motion.div
          layout
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-7xl mx-auto transition-all duration-300 flex items-center justify-between"
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
                variant === 'solid' ? 'h-7 sm:h-8' : isScrolled ? 'h-6 sm:h-7' : 'h-7 sm:h-9 md:h-10'
              }`}
            />
          </button>

          {/* Center Navigation Links with Capsule Hover Style */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive =
                (link.id === 'shop' && currentPage === 'shop') ||
                (link.id === 'about' && currentPage === 'about') ||
                (link.id === 'home' && currentPage === 'home');
              return (
                <button
                  key={link.label}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={`text-xs font-black tracking-widest uppercase transition-all px-3.5 py-1 rounded-full select-none cursor-pointer ${
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

          {/* Wishlist, Cart & Motion Overlay Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Mobile-only SHOP quick link */}
            <button
              onClick={(e) => handleLinkClick(e, 'shop')}
              className={`md:hidden shrink-0 text-[11px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full select-none cursor-pointer transition-all ${
                currentPage === 'shop'
                  ? 'bg-[#F9BD03] text-[#1C0E07] shadow-sm'
                  : 'text-[#FEE8B4] border border-[#F9BD03]/35 hover:text-[#F9BD03]'
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Shop
            </button>

            {/* Wishlist (Heart) Trigger Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              aria-label={`Open wishlist (${wishlistCount} saved items)`}
              title="My Wishlist"
              className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-full bg-[#1C0E07]/90 hover:bg-gr8r-brown border border-gr8r-yellow/35 hover:border-red-400/60 transition-all duration-200 flex items-center justify-center cursor-pointer shadow-md active:scale-95 group"
            >
              <Heart
                className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                  wishlistCount > 0
                    ? 'text-red-500 fill-red-500'
                    : 'text-gr8r-cream group-hover:text-red-400'
                }`}
              />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-red-500 border-2 border-[#1C0E07] text-white text-[9px] font-black font-mono flex items-center justify-center shadow-md">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label={`Open shopping bag (${cartCount} items)`}
              className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-full bg-[#1C0E07]/90 hover:bg-gr8r-yellow border border-gr8r-yellow/35 transition-all duration-200 flex items-center justify-center cursor-pointer shadow-md active:scale-95 group"
            >
              <ShoppingCart className="w-4 h-4 text-gr8r-cream group-hover:text-[#1C0E07] transition-transform group-hover:scale-110" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-gr8r-yellow border-2 border-[#1C0E07] text-[#1C0E07] text-[9px] font-black font-mono flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Cart Total (desktop only, shown alongside the bag button) */}
            {cartTotal > 0 && (
              <span className="hidden sm:inline text-xs font-bold font-mono text-gr8r-cream">
                ₹{cartTotal}
              </span>
            )}

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
