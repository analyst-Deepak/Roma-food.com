import React from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Briefcase,
  Instagram,
  Linkedin,
  Facebook,
  Youtube,
  FileText,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

export type LegalTab = 'terms' | 'privacy' | 'cookie';

interface Gr8rFooterProps {
  onOpenReservation?: () => void;
  onOpenBrandGuide?: () => void;
  onNavigate?: (id: string) => void;
  onOpenLegal?: (tab: LegalTab) => void;
}

export const Gr8rFooter: React.FC<Gr8rFooterProps> = ({
  onOpenReservation,
  onOpenBrandGuide,
  onNavigate,
  onOpenLegal,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Pure icon-based social links (No text names, ultra-premium circular pills)
  const socialIcons = [
    {
      id: 'instagram',
      label: 'Instagram',
      href: 'https://instagram.com',
      icon: <Instagram className="w-5 h-5 transition-transform group-hover:scale-110" />,
      hoverBg: 'hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:text-white hover:border-transparent',
      hoverGlow: 'hover:shadow-[0_0_20px_rgba(221,42,123,0.45)]',
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      href: `https://wa.me/919098229454?text=Hello%20Roma%20Foods%20Concierge,%20I%20am%20interested%20in%20ROMAS%20chocolates.`,
      icon: (
        <svg className="w-5 h-5 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.68 12.05 3.68C14.25 3.68 16.32 4.54 17.88 6.1C19.43 7.66 20.28 9.72 20.28 11.92C20.28 16.46 16.59 20.15 12.05 20.15ZM16.57 14.38C16.32 14.25 15.11 13.66 14.88 13.58C14.66 13.5 14.49 13.46 14.33 13.71C14.16 13.96 13.69 14.51 13.54 14.68C13.4 14.85 13.25 14.87 13 14.75C12.75 14.62 11.95 14.36 11 13.52C10.26 12.86 9.76 12.05 9.61 11.8C9.47 11.55 9.6 11.41 9.72 11.29C9.83 11.18 9.97 11 10.1 10.85C10.22 10.7 10.27 10.59 10.35 10.43C10.43 10.26 10.39 10.12 10.33 10C10.27 9.87 9.77 8.65 9.57 8.14C9.37 7.65 9.16 7.72 9.01 7.71C8.87 7.7 8.7 7.7 8.54 7.7C8.37 7.7 8.1 7.76 7.87 8.01C7.64 8.26 7 8.86 7 10.08C7 11.3 7.89 12.47 8.01 12.64C8.14 12.81 9.76 15.3 12.24 16.37C12.83 16.63 13.29 16.78 13.65 16.89C14.24 17.08 14.78 17.05 15.21 16.99C15.68 16.92 16.67 16.39 16.88 15.8C17.08 15.21 17.08 14.71 17.02 14.6C16.96 14.5 16.81 14.44 16.57 14.38Z"/>
        </svg>
      ),
      hoverBg: 'hover:bg-[#00A859] hover:text-white hover:border-[#00A859]',
      hoverGlow: 'hover:shadow-[0_0_20px_rgba(0,168,89,0.45)]',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: <Linkedin className="w-5 h-5 transition-transform group-hover:scale-110" />,
      hoverBg: 'hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]',
      hoverGlow: 'hover:shadow-[0_0_20px_rgba(10,102,194,0.45)]',
    },
    {
      id: 'facebook',
      label: 'Facebook',
      href: 'https://facebook.com',
      icon: <Facebook className="w-5 h-5 transition-transform group-hover:scale-110" />,
      hoverBg: 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]',
      hoverGlow: 'hover:shadow-[0_0_20px_rgba(24,119,242,0.45)]',
    },
    {
      id: 'youtube',
      label: 'YouTube',
      href: 'https://youtube.com',
      icon: <Youtube className="w-5 h-5 transition-transform group-hover:scale-110" />,
      hoverBg: 'hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]',
      hoverGlow: 'hover:shadow-[0_0_20px_rgba(255,0,0,0.45)]',
    },
  ];

  return (
    <footer id="contact" className="relative bg-[#180A04] text-[#FEE8B4] pt-16 sm:pt-20 pb-12 overflow-hidden select-none border-t border-[#FEE8B4]/15">
      {/* Subtle Warm Amber Glow Layers */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[360px] bg-gradient-to-b from-[#F9BD03]/10 via-[#F9BD03]/5 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-[#381A0E]/60 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10">

        {/* Middle Section: 4 High-End Luxury Columns */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 border-b border-[#FEE8B4]/15">
          
          {/* Col 1: Official Brand Identity & Credentials */}
          <div className="lg:pr-2">
            <div className="mb-5 inline-block">
              <img
                src="/assets/romas-logo-gold.png"
                alt="ROMAS Spreading Happiness"
                className="h-11 sm:h-12 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(249,189,3,0.3)]"
              />
            </div>

            <p className="text-xs sm:text-sm text-[#FEE8B4]/70 leading-relaxed mb-6 font-normal">
              Spreading happiness through master-crafted couvertures, rich cocoa compounds, and artisanal drops manufactured in Dhamtari Works since 2012.
            </p>

            {/* Quality & FSSAI Trust Badges */}
            <div className="space-y-2 pt-2 border-t border-[#FEE8B4]/10">
              <div className="flex items-center gap-2 text-xs text-[#FEE8B4]/80">
                <span className="w-2.5 h-2.5 rounded-full border border-emerald-500 flex items-center justify-center p-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </span>
                <span className="font-semibold text-emerald-400">100% Vegetarian Chocolate</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#FEE8B4]/60">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F9BD03]" />
                <span>FSSAI Central Lic: 10526005000033</span>
              </div>

              {/* ONLY Social Icons directly under FSSAI Central Lic as requested */}
              <div className="pt-3 flex flex-wrap items-center gap-2.5">
                {socialIcons.map((s) => (
                  <motion.a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-9 h-9 rounded-full border border-[#FEE8B4]/20 bg-[#251006]/90 backdrop-blur-md flex items-center justify-center text-[#FEE8B4] transition-all duration-300 shadow-md group ${s.hoverBg} ${s.hoverGlow}`}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2: Works Location Map (Replaced Atelier Range as requested) */}
          <div>
            <h4
              className="text-xs font-black tracking-[0.24em] uppercase text-[#F9BD03] mb-4 flex items-center gap-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span>FACTORY LOCATION</span>
              <span className="w-6 h-[1px] bg-[#F9BD03]/40" />
            </h4>

            <p className="text-xs text-[#FEE8B4]/70 mb-3 font-normal leading-relaxed">
              <span className="text-[#F9BD03] font-semibold">Kurud Factory:</span> 154/1, Dhamtari Road, Kurod, Dhamtari (C.G.)
            </p>

            {/* Interactive Embedded Google Map */}
            <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-[#FEE8B4]/20 shadow-lg bg-[#251006] group">
              <iframe
                title="ROMAS Dhamtari Works Location Map"
                src="https://maps.google.com/maps?q=Kurud%2C+Dhamtari%2C+Chhattisgarh+493663&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter contrast-[1.05] opacity-90 group-hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="mt-3">
              <a
                href="https://maps.google.com/?q=Kurud+Dhamtari+Chhattisgarh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#F9BD03] hover:text-white transition-colors group"
              >
                <MapPin className="w-3.5 h-3.5 text-[#F9BD03]" />
                <span>Directions to Kurud Factory</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Col 3: Direct Commercial & Corporate Inquiries */}
          <div>
            <h4
              className="text-xs font-black tracking-[0.24em] uppercase text-[#F9BD03] mb-6 flex items-center gap-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span>OFFICES & WORKS</span>
              <span className="w-6 h-[1px] bg-[#F9BD03]/40" />
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-sm text-[#FEE8B4]/80">
              {/* Corporate Office */}
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#F9BD03] mt-0.5 shrink-0" />
                <div className="leading-snug">
                  <span className="text-[10px] font-black uppercase text-[#F9BD03] tracking-wider block mb-0.5">
                    Corporate Office
                  </span>
                  <span>{COMPANY_INFO.corporateOffice || 'Sf-8, Shyam Plaza, Opp. Bus Stand, Pandri, Raipur (C.G.)'}</span>
                </div>
              </li>

              {/* Factory Address */}
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#F9BD03] mt-0.5 shrink-0" />
                <div className="leading-snug">
                  <span className="text-[10px] font-black uppercase text-[#F9BD03] tracking-wider block mb-0.5">
                    Factory & Works (Kurud)
                  </span>
                  <span>{COMPANY_INFO.factoryAddress || COMPANY_INFO.address}</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#F9BD03] shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-[#F9BD03] font-semibold transition-colors">
                  {COMPANY_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#F9BD03] shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-[#F9BD03] transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-xs text-[#FEE8B4]/60 pt-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Mon – Sat: 9:00 AM – 7:30 PM IST</span>
              </li>
            </ul>

            {/* Quick WhatsApp Inquiry Pill Button */}
            <div className="mt-5 pt-4 border-t border-[#FEE8B4]/10">
              <a
                href={`https://wa.me/919098229454?text=Hello%20Roma%20Foods%20Concierge,%20I%20am%20interested%20in%20ROMAS%20chocolates.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00A859]/20 hover:bg-[#00A859] border border-[#00A859]/50 text-white text-xs font-bold transition-all shadow-md group"
              >
                <span className="w-2 h-2 rounded-full bg-[#86EFAC] animate-ping" />
                <span>Chat On WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Col 4: LEGAL & BRAND POLICIES */}
          <div>
            <h4
              className="text-xs font-black tracking-[0.24em] uppercase text-[#F9BD03] mb-6 flex items-center gap-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span>LEGAL & POLICIES</span>
              <span className="w-6 h-[1px] bg-[#F9BD03]/40" />
            </h4>
            <ul className="space-y-3.5">
              <li>
                <a
                  href="/terms-and-conditions"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenLegal?.('terms');
                  }}
                  className="text-xs sm:text-sm font-medium text-[#FEE8B4]/75 hover:text-[#F9BD03] transition-colors flex items-center gap-2 group text-left cursor-pointer"
                >
                  <span className="w-1 h-1 rounded-full bg-[#F9BD03]/40 group-hover:w-2 group-hover:bg-[#F9BD03] transition-all" />
                  <span>Terms & Conditions</span>
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenLegal?.('privacy');
                  }}
                  className="text-xs sm:text-sm font-medium text-[#FEE8B4]/75 hover:text-[#F9BD03] transition-colors flex items-center gap-2 group text-left cursor-pointer"
                >
                  <span className="w-1 h-1 rounded-full bg-[#F9BD03]/40 group-hover:w-2 group-hover:bg-[#F9BD03] transition-all" />
                  <span>Privacy Policy</span>
                </a>
              </li>
              <li>
                <a
                  href="/cookie-policy"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenLegal?.('cookie');
                  }}
                  className="text-xs sm:text-sm font-medium text-[#FEE8B4]/75 hover:text-[#F9BD03] transition-colors flex items-center gap-2 group text-left cursor-pointer"
                >
                  <span className="w-1 h-1 rounded-full bg-[#F9BD03]/40 group-hover:w-2 group-hover:bg-[#F9BD03] transition-all" />
                  <span>Cookie Policy</span>
                </a>
              </li>
              {onOpenBrandGuide && (
                <li className="pt-1">
                  <button
                    onClick={onOpenBrandGuide}
                    className="text-xs font-bold uppercase tracking-wider text-[#F9BD03] hover:text-[#ffffff] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#F9BD03]" />
                    <span>OFFICIAL BRAND STANDARDS</span>
                  </button>
                </li>
              )}
              <li className="pt-0.5">
                <a
                  href="/careers"
                  onClick={(e) => handleLinkClick(e, 'careers')}
                  className="text-xs font-bold uppercase tracking-wider text-[#F9BD03] hover:text-[#ffffff] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Briefcase className="w-3.5 h-3.5 text-[#F9BD03]" />
                  <span>CAREERS — WE'RE HIRING</span>
                </a>
              </li>
              <li className="pt-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2A1107] border border-[#FEE8B4]/15 text-[11px] text-[#FEE8B4]/60">
                  <FileText className="w-3.5 h-3.5 text-[#F9BD03]" />
                  <span>Compliant with Indian Law</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Monumental Giant ROMAS Watermark Across Bottom */}
        <div className="py-10 sm:py-16 text-center overflow-hidden border-b border-[#FEE8B4]/10 select-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[19vw] sm:text-[20vw] leading-[0.72] font-black uppercase text-[#FEE8B4]/10 hover:text-[#F9BD03]/20 transition-all duration-700 tracking-tight select-none pointer-events-none"
            style={{ fontFamily: "'Cabin Condensed', 'Bayon', Impact, sans-serif" }}
          >
            ROMAS
          </motion.div>
        </div>

        {/* Bottom Legal, Certification & Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#FEE8B4]/50">
          <p>© 2026 ROMAS CHOCOLATES (ROMA FOODS). ALL RIGHTS RESERVED.</p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] font-medium">
            <a
              href="/terms-and-conditions"
              onClick={(e) => {
                e.preventDefault();
                onOpenLegal?.('terms');
              }}
              className="hover:text-[#FEE8B4] cursor-pointer transition-colors"
            >
              TERMS & CONDITIONS
            </a>
            <span>•</span>
            <a
              href="/privacy-policy"
              onClick={(e) => {
                e.preventDefault();
                onOpenLegal?.('privacy');
              }}
              className="hover:text-[#FEE8B4] cursor-pointer transition-colors"
            >
              PRIVACY POLICY
            </a>
            <span>•</span>
            <a
              href="/cookie-policy"
              onClick={(e) => {
                e.preventDefault();
                onOpenLegal?.('cookie');
              }}
              className="hover:text-[#FEE8B4] cursor-pointer transition-colors"
            >
              COOKIE POLICY
            </a>
            <span>•</span>
            <span className="text-[#FEE8B4]/60">FSSAI CENTRAL LIC: 10526005000033</span>
            <span>•</span>
            <span className="text-[#F9BD03]/70 font-semibold">DHAMTARI, CHHATTISGARH</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
