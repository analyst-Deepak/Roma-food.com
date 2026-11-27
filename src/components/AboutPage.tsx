import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ShieldCheck,
  Building2,
  Factory,
  Award,
  Users,
  Compass,
  ArrowRight,
  Heart,
  CheckCircle2,
  FileText,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  Truck,
  Flame,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

interface AboutPageProps {
  onOpenReservation: () => void;
  onNavigateHome: () => void;
}

/* =========================================================================
   OFFICIAL CERTIFICATE & STATUTORY BADGE COMPONENTS (VECTOR SVGS)
   ========================================================================= */

// Official FSSAI Brand Emblem
export const FssaiLogoBadge: React.FC<{ className?: string }> = ({ className = 'h-9 w-auto' }) => (
  <svg viewBox="0 0 150 65" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="150" height="65" rx="8" fill="#FFFFFF" />
    <path d="M14 16 C28 8, 52 8, 68 16" stroke="#F58220" strokeWidth="4.5" strokeLinecap="round" />
    <path d="M136 16 C122 8, 98 8, 84 16" stroke="#007A3D" strokeWidth="3.5" strokeLinecap="round" />
    <text x="14" y="44" fontFamily="'Arial Black', Arial, sans-serif" fontWeight="900" fontSize="30" fill="#1A3B70" letterSpacing="-1">
      fssai
    </text>
    <text x="14" y="55" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="5.5" fill="#555555" letterSpacing="0.4">
      FOOD SAFETY & STANDARDS
    </text>
  </svg>
);

// Official GST & Govt of India Emblem
export const GstLogoBadge: React.FC<{ className?: string }> = ({ className = 'h-9 w-auto' }) => (
  <svg viewBox="0 0 150 65" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="150" height="65" rx="8" fill="#FFFFFF" />
    {/* Tricolor Ribbon */}
    <rect x="14" y="10" width="122" height="3" rx="1.5" fill="#FF9933" />
    <rect x="14" y="13" width="122" height="2" fill="#FFFFFF" />
    <rect x="14" y="15" width="122" height="3" rx="1.5" fill="#138808" />
    {/* Ashoka Chakra Motif */}
    <circle cx="32" cy="38" r="11" stroke="#000080" strokeWidth="1.5" fill="#F0F4FA" />
    <circle cx="32" cy="38" r="3" fill="#000080" />
    {/* GST Typography */}
    <text x="52" y="44" fontFamily="'Arial Black', Arial, sans-serif" fontWeight="900" fontSize="24" fill="#1D3A6C" letterSpacing="1.5">
      GST
    </text>
    <text x="53" y="55" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="5.5" fill="#666666" letterSpacing="0.5">
      GOVT. OF INDIA REG-06
    </text>
  </svg>
);

// Official FSSAI 100% Vegetarian Mark
export const VegMarkBadge: React.FC<{ className?: string }> = ({ className = 'h-9 w-auto' }) => (
  <svg viewBox="0 0 150 65" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="150" height="65" rx="8" fill="#FFFFFF" />
    {/* Green square with green dot */}
    <rect x="16" y="15" width="34" height="34" rx="4" stroke="#008000" strokeWidth="2.5" fill="#FFFFFF" />
    <circle cx="33" cy="32" r="9.5" fill="#008000" />
    <text x="58" y="30" fontFamily="'Arial Black', Arial, sans-serif" fontWeight="900" fontSize="13" fill="#008000">
      100% VEG
    </text>
    <text x="58" y="42" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="7.5" fill="#1B4D1B">
      PURE VEGETARIAN
    </text>
    <text x="58" y="52" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="6" fill="#666666">
      ZERO ANIMAL FATS
    </text>
  </svg>
);

// Industrial Production Capacity Badge
export const CapacityLogoBadge: React.FC<{ className?: string }> = ({ className = 'h-9 w-auto' }) => (
  <svg viewBox="0 0 150 65" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="150" height="65" rx="8" fill="#FFFFFF" />
    <circle cx="32" cy="33" r="14" fill="#FAF5EC" stroke="#8C4724" strokeWidth="1.5" />
    <path d="M25 40V30L29 32V28L33 30V25L39 25V40H25Z" fill="#8C4724" />
    <text x="54" y="30" fontFamily="'Arial Black', Arial, sans-serif" fontWeight="900" fontSize="12" fill="#381A0E">
      1,000 MT/DAY
    </text>
    <text x="54" y="42" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="7" fill="#8C4724">
      INDUSTRIAL WORKS
    </text>
    <text x="54" y="52" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="6" fill="#666666">
      STATE LICENSE VERIFIED
    </text>
  </svg>
);

// ISO 9001 Circular Seal Badge
export const IsoBadge: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="#FFFFFF" stroke="#004D99" strokeWidth="3" />
    <circle cx="50" cy="50" r="41" fill="#F0F7FF" stroke="#004D99" strokeWidth="1" strokeDasharray="3 2" />
    <text x="50" y="38" textAnchor="middle" fontFamily="'Arial Black', Arial, sans-serif" fontWeight="900" fontSize="15" fill="#004D99">
      ISO
    </text>
    <text x="50" y="55" textAnchor="middle" fontFamily="'Arial Black', Arial, sans-serif" fontWeight="900" fontSize="13" fill="#D97706">
      9001
    </text>
    <text x="50" y="69" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="7" fill="#004D99">
      CERTIFIED
    </text>
  </svg>
);

// HACCP Food Safety Seal Badge
export const HaccpBadge: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="#FFFFFF" stroke="#059669" strokeWidth="3" />
    <circle cx="50" cy="50" r="41" fill="#ECFDF5" stroke="#059669" strokeWidth="1" strokeDasharray="3 2" />
    <text x="50" y="42" textAnchor="middle" fontFamily="'Arial Black', Arial, sans-serif" fontWeight="900" fontSize="13" fill="#059669">
      HACCP
    </text>
    <text x="50" y="58" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="8" fill="#1F2937">
      FOOD SAFETY
    </text>
    <text x="50" y="70" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="7" fill="#059669">
      COMPLIANT
    </text>
  </svg>
);

// GMP Good Manufacturing Practice Seal Badge
export const GmpBadge: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="#FFFFFF" stroke="#8C4724" strokeWidth="3" />
    <circle cx="50" cy="50" r="41" fill="#FAF5EC" stroke="#8C4724" strokeWidth="1" strokeDasharray="3 2" />
    <text x="50" y="42" textAnchor="middle" fontFamily="'Arial Black', Arial, sans-serif" fontWeight="900" fontSize="16" fill="#8C4724">
      GMP
    </text>
    <text x="50" y="58" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="8" fill="#381A0E">
      PRACTICE
    </text>
    <text x="50" y="70" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="7" fill="#8C4724">
      CERTIFIED
    </text>
  </svg>
);


/* Decorative glossy 3D chocolate splash (pure inline SVG — no external asset). */
const ChocolateSplash: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
    <defs>
      <radialGradient id="choc3d" cx="40%" cy="30%" r="78%">
        <stop offset="0%" stopColor="#A6693A" />
        <stop offset="45%" stopColor="#6B3B1C" />
        <stop offset="100%" stopColor="#38200E" />
      </radialGradient>
      <filter id="chocShadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#2A1308" floodOpacity="0.45" />
      </filter>
    </defs>
    <g filter="url(#chocShadow)" fill="url(#choc3d)">
      {/* Flung droplets radiating outward */}
      {[
        { t: 'translate(100,62) rotate(0) scale(1.1)' },
        { t: 'translate(127,73) rotate(45) scale(0.9)' },
        { t: 'translate(138,100) rotate(90) scale(1.15)' },
        { t: 'translate(127,127) rotate(135) scale(0.85)' },
        { t: 'translate(100,138) rotate(180) scale(1.2)' },
        { t: 'translate(73,127) rotate(225) scale(0.9)' },
        { t: 'translate(62,100) rotate(270) scale(1.0)' },
        { t: 'translate(73,73) rotate(315) scale(0.95)' },
      ].map((d, i) => (
        <path key={i} transform={d.t} d="M0 0 C 7 -8 7 -22 0 -30 C -7 -22 -7 -8 0 0 Z" />
      ))}
      {/* Central irregular splat body */}
      <path d="M100 60 C 120 58 122 78 138 76 C 130 94 150 102 136 116 C 124 110 128 134 108 132 C 102 118 82 136 76 120 C 84 102 60 108 66 90 C 76 78 60 68 80 66 C 94 72 84 56 100 60 Z" />
      {/* Scattered micro-droplets */}
      <circle cx="100" cy="20" r="6" />
      <circle cx="162" cy="52" r="5" />
      <circle cx="180" cy="112" r="4" />
      <circle cx="150" cy="168" r="6" />
      <circle cx="94" cy="184" r="4" />
      <circle cx="44" cy="162" r="5" />
      <circle cx="20" cy="104" r="5" />
      <circle cx="40" cy="42" r="4" />
    </g>
    {/* Specular gloss highlight for the 3D sheen */}
    <ellipse cx="86" cy="84" rx="20" ry="11" fill="#FFFFFF" opacity="0.18" transform="rotate(-30 86 84)" />
  </svg>
);

export const AboutPage: React.FC<AboutPageProps> = ({
  onOpenReservation,
  onNavigateHome,
}) => {
  const reduceMotion = useReducedMotion();
  const qualityCommitments = [
    {
      icon: Sparkles,
      num: '01',
      tag: 'Silky Palate Melt',
      title: 'Sub-20 Micron Refining',
      description:
        'Conched and micro-milled to sub-20 microns for a luxurious, velvety melt without graininess or waxy mouthfeel.',
      highlight: '<20µ Precision Conching',
    },
    {
      icon: Award,
      num: '02',
      tag: 'Zero Palm Oil',
      title: '100% Pure Cocoa Butter',
      description:
        'Pure chocolate couverture formulated exclusively with premium natural cocoa butter for authentic acoustic snap and clean flavor release.',
      highlight: 'Real Couverture Standard',
    },
    {
      icon: Flame,
      num: '03',
      tag: 'Engineered for India',
      title: 'Bake-Stable & Climate-Tuned',
      description:
        'Specially calibrated for tropical handling, providing high fluidity (3-drop) for flawless dipping, enrobing, and oven stability.',
      highlight: '42°C Fluidity & Temper',
    },
    {
      icon: Truck,
      num: '04',
      tag: 'Direct from Kurod Works',
      title: 'Cold-Chain Dispatch',
      description:
        'Temperature-controlled insulated shipping ensuring fresh, bloom-free deliveries across commercial kitchens nationwide.',
      highlight: 'Insulated Fast Logistics',
    },
  ];

  const statutoryCredentials = [
    {
      icon: ShieldCheck,
      badge: FssaiLogoBadge,
      label: 'FSSAI Central / State License',
      value: '10526005000033',
      sub: 'Valid Upto October 2031',
      color: 'text-emerald-900 bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/40 border-emerald-300',
      tag: 'Food Safety Licensed',
    },
    {
      icon: FileText,
      badge: GstLogoBadge,
      label: 'GST Registration Number',
      value: '22ABAFR5939G2Z8',
      sub: 'Govt. of India Form GST REG-06',
      color: 'text-amber-950 bg-gradient-to-br from-amber-50/80 via-white to-amber-50/40 border-amber-300',
      tag: 'Tax & Commerce Verified',
    },
    {
      icon: Factory,
      badge: CapacityLogoBadge,
      label: 'Production Capacity',
      value: '1,000 MT / Day',
      sub: 'Industrial General Manufacturing',
      color: 'text-stone-900 bg-gradient-to-br from-stone-50/80 via-white to-stone-50/40 border-stone-300',
      tag: 'Scale & Reliability',
    },
    {
      icon: CheckCircle2,
      badge: VegMarkBadge,
      label: 'Dietary Standard',
      value: '100% Vegetarian',
      sub: 'Zero Animal Fats or Rennet',
      color: 'text-emerald-950 bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/40 border-emerald-300',
      tag: '100% Plant Standard',
    },
  ];

  const qualityCertificates = [
    {
      name: 'ISO 9001:2015',
      number: 'QMS Standards Compliant',
      authority: 'Quality Management System',
      badge: <IsoBadge className="w-12 h-12" />,
      color: 'border-blue-200 bg-blue-50/60 text-blue-900',
    },
    {
      name: 'HACCP Certified',
      number: 'Food Safety Protocol',
      authority: 'Hazard Analysis Critical Control Point',
      badge: <HaccpBadge className="w-12 h-12" />,
      color: 'border-teal-200 bg-teal-50/60 text-teal-900',
    },
    {
      name: 'GMP Practice',
      number: 'Hygiene Assured',
      authority: 'Good Manufacturing Practices',
      badge: <GmpBadge className="w-12 h-12" />,
      color: 'border-amber-200 bg-amber-50/60 text-amber-900',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2A0E04] selection:bg-[#F9BD03] selection:text-[#381A0E]">
      
      {/* =========================================================================
          HERO: OFFICIAL ROMAS SLAB SHOWCASE - FULL WIDTH CINEMATIC HERO (DP STYLE)
          ========================================================================= */}
      <section className="relative w-full min-h-[70vh] sm:min-h-[82vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#0D0704] border-b border-[#381A0E]/20">
        {/* Full-width Edge-to-Edge Image */}
        <div className="absolute inset-0 w-full h-full">
          <motion.img
            src="/assets/chocolate/roma_slab_official.jpg"
            alt="ROMA Official Embossed Chocolate Slab"
            className="w-full h-full object-cover object-center"
            initial={reduceMotion ? false : { scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.7, ease: 'easeOut' }}
          />
          {/* DP Chocolates style luxury dark cinematic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0704] via-black/40 to-[#0D0704]/75" />
          <div className="absolute inset-0 bg-black/25" />
        </div>

        {/* Ambient Warm Golden Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-[#F9BD03]/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Centered Content over Full-Width Image */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-32 sm:pt-40 pb-16 sm:pb-24">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-md mb-5"
          >
            <span className="text-[11px] font-black uppercase tracking-[0.24em] text-[#F9BD03]">
              ROMA FOODS — ABOUT US
            </span>
          </motion.div>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white leading-[0.92] drop-shadow-2xl"
            style={{ fontFamily: "'Cabin Condensed', 'Bayon', Impact, sans-serif" }}
          >
            CRAFTED FOR CHOCOLATE LOVERS
          </motion.h1>
        </div>
      </section>

      {/* =========================================================================
          POINT 1: COMPANY OVERVIEW
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#381A0E]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mb-12"
          >
            <span className="text-xs font-black tracking-[0.25em] uppercase text-[#8C4724] block mb-2">
              VERIFIED ENTITY
            </span>
            <h2
              className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#381A0E] leading-tight"
              style={{ fontFamily: "'Cabin Condensed', sans-serif" }}
            >
              COMPANY OVERVIEW
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#381A0E]/80 font-light leading-relaxed">
              ROMA FOODS is an officially licensed confectionery and chocolate manufacturing partnership firm
              operating from the heart of Chhattisgarh, dedicated to industrial-scale chocolate production and
              artisanal formulation excellence.
            </p>
          </motion.div>

          {/* Statutory Credentials Bento Grid with Official Badges & Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {statutoryCredentials.map((c, i) => {
              const BadgeComp = c.badge;
              const IconComp = c.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 35, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.65,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25 } }}
                  className={`p-6 rounded-2xl border ${c.color} shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between relative group cursor-default`}
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#8C4724] block mb-1">
                        {c.tag}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider opacity-90 block text-[#2A0E04]">
                        {c.label}
                      </span>
                    </div>
                    {/* Official Certificate Icon / Badge */}
                    <div className="shrink-0 p-1.5 rounded-xl bg-white border border-black/10 shadow-xs group-hover:scale-105 transition-transform">
                      <BadgeComp className="h-8 w-auto max-w-[95px]" />
                    </div>
                  </div>

                  <div>
                    <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight mb-1 text-[#2A0E04]">
                      {c.value}
                    </div>
                    <div className="text-xs opacity-80 font-medium flex items-center gap-1.5 text-[#381A0E]">
                      <IconComp className="w-3.5 h-3.5 inline shrink-0 text-[#8C4724]" />
                      <span>{c.sub}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Official Certifications & Compliance Badges Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#FAF7F2] via-white to-[#FAF7F2] border border-[#EADBCC] shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-4 border-b border-[#EADBCC]">
              <div>
                <span className="text-[11px] font-black tracking-[0.25em] uppercase text-[#8C4724] block mb-1">
                  OFFICIAL RECOGNITION & ACCREDITATIONS
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#381A0E]" style={{ fontFamily: "'Cabin Condensed', sans-serif" }}>
                  Certifications & Quality Standards
                </h3>
              </div>
              <p className="text-xs text-[#381A0E]/70 max-w-sm font-light">
                Every chocolate formulation manufactured at our Kurud works adheres to rigorous national and international food standards.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {qualityCertificates.map((cert, idx) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 25, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + idx * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -6, scale: 1.025, transition: { duration: 0.22 } }}
                  className={`p-4 sm:p-5 rounded-2xl border ${cert.color} shadow-2xs hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center justify-between group cursor-default`}
                >
                  <div className="w-14 h-14 rounded-xl bg-white p-1.5 flex items-center justify-center mb-2.5 shadow-2xs group-hover:scale-110 transition-transform">
                    {cert.badge}
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold leading-tight text-[#2A0E04]">{cert.name}</p>
                    <p className="text-[10px] sm:text-xs text-[#8C4724] font-medium mt-1">{cert.number}</p>
                  </div>
                  <span className="mt-3 text-[10px] px-3 py-0.5 rounded-full bg-white text-emerald-800 border border-emerald-300 font-bold inline-flex items-center gap-1 shadow-2xs">
                    ✓ Verified
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          POINT 2: OUR STORY
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#381A0E]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Story Text */}
            <div>
              <span className="text-xs font-black tracking-[0.25em] uppercase text-[#8C4724] block mb-2">
                HERITAGE & CRAFT
              </span>
              <h2
                className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#381A0E] leading-tight mb-6"
                style={{ fontFamily: "'Cabin Condensed', sans-serif" }}
              >
                OUR STORY: SPREADING HAPPINESS SINCE 2012
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-[#381A0E]/85 font-light leading-relaxed">
                <p>
                  ROMA FOODS was founded with an unyielding purpose: to bridge the gap between world-class
                  European chocolate standards and the booming demand of India’s artisan bakery, patisserie,
                  and confectionery creators.
                </p>
                <p>
                  Established at Kurud, Dhamtari, we designed our manufacturing facility around the scientific
                  fundamentals of chocolate craftsmanship: multi-roll micro-refiners that mill cocoa solids and
                  dairy down to <strong>sub-20 microns</strong>, paired with slow temperature conching to release rich,
                  warm caramel undertones without bitter astringency.
                </p>
                <p>
                  From single bakery ovens to 5-star hotel pastry departments and high-volume industrial lines,
                  our chocolates carry the hallmark of pride: zero animal fats, 100% vegetarian formulation,
                  effortless 42°C melt points, and high-fluidity mirror gloss.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#381A0E]/15 grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-2xl bg-white border border-[#381A0E]/10 shadow-sm">
                  <div className="text-2xl sm:text-3xl font-bold text-[#8C4724] font-mono">2012</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mt-1">Established</div>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-[#381A0E]/10 shadow-sm">
                  <div className="text-2xl sm:text-3xl font-bold text-[#8C4724] font-mono">&lt;20µ</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mt-1">Micro-Milling</div>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-[#381A0E]/10 shadow-sm">
                  <div className="text-2xl sm:text-3xl font-bold text-[#8C4724] font-mono">1000 MT</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mt-1">Daily Capacity</div>
                </div>
              </div>
            </div>

            {/* Visual Feature Card */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#381A0E]/15 bg-white">
                <img
                  src="/assets/chocolate/branch_works.jpg"
                  alt="ROMA FOODS Manufacturing Works in Kurud, Dhamtari"
                  className="w-full h-[400px] sm:h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#F9BD03] block mb-1">
                    FACILITY SPOTLIGHT
                  </span>
                  <h3 className="text-2xl font-bold uppercase tracking-wider mb-2">
                    Kurod Works — Dhamtari
                  </h3>
                  <p className="text-xs text-white/80 font-light leading-relaxed">
                    Inside our FSSAI-certified central facility where cocoa mass, liquor, and fine couvertures
                    are tempered and molded daily.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          POINT 3: VISION & MISSION
          ========================================================================= */}
      <section className="relative overflow-hidden py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#381A0E]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black tracking-[0.25em] uppercase text-[#8C4724] block mb-2">
              PURPOSE & PATH
            </span>
            <h2
              className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#381A0E] leading-tight"
              style={{ fontFamily: "'Cabin Condensed', sans-serif" }}
            >
              VISION & MISSION
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#381A0E]/80 font-light">
              Guiding every formulation, temperature curve, and pastry chef partnership we build across India.
            </p>
          </div>

          {/* Unboxed Editorial Vision & Mission (Scroll Motion) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mb-16 relative">
            {/* Ambient Background Warm Accent Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-48 bg-[#F9BD03]/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Decorative 3D Chocolate Splash — top-right */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 -right-10 sm:-right-24 lg:-right-32 w-40 sm:w-60 lg:w-72 z-0 drop-shadow-xl"
              animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
            >
              <ChocolateSplash className="w-full h-auto" />
            </motion.div>

            {/* Decorative 3D Chocolate Splash — bottom-left */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 -left-10 sm:-left-24 lg:-left-32 w-36 sm:w-52 lg:w-64 z-0 drop-shadow-xl"
              animate={{ y: [0, 10, 0], rotate: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut', delay: 0.6 }}
            >
              <ChocolateSplash className="w-full h-auto rotate-[135deg]" />
            </motion.div>

            {/* Vision Column (Unboxed, Motion On Scroll) */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl p-7 sm:p-9 bg-gradient-to-br from-[#FFF6EC] via-[#FFE6CC] to-[#FFCC97] border border-[#FFB877]/50 shadow-[0_20px_45px_-18px_rgba(255,160,80,0.55)]"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-white/70 text-[#BC5A12] flex items-center justify-center shadow-sm">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#BC5A12] block">
                    OUR VISION
                  </span>
                  <span className="text-[10px] text-[#381A0E]/55 font-medium">WHAT WE ASPIRE TO BUILD</span>
                </div>
              </div>

              <h3
                className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-[#381A0E] tracking-tight leading-tight mb-4"
                style={{ fontFamily: "'Cabin Condensed', sans-serif" }}
              >
                Real, World-Class Chocolate Made in India
              </h3>

              <p className="text-base sm:text-lg text-[#381A0E]/85 font-normal leading-relaxed">
                Our vision is to provide every baker, pastry chef, and chocolate lover across India with pure, international-quality chocolate. Crafted with authentic cocoa butter, honest ingredients, and 100% vegetarian goodness.
              </p>

              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[#BC5A12]">
                <span className="w-8 h-0.5 bg-[#BC5A12] rounded-full" />
                <span>100% Pure Cocoa • Indian Craftsmanship</span>
              </div>
            </motion.div>

            {/* Mission Column (Unboxed, Motion On Scroll) */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl p-7 sm:p-9 bg-gradient-to-br from-[#FFEAD4] via-[#FFD2A6] to-[#FFA95E] border border-[#FF9D4D]/50 shadow-[0_20px_45px_-18px_rgba(255,140,50,0.55)]"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-white/70 text-[#A8450D] flex items-center justify-center shadow-sm">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#A8450D] block">
                    OUR MISSION
                  </span>
                  <span className="text-[10px] text-[#381A0E]/55 font-medium">WHAT WE DO EVERY DAY</span>
                </div>
              </div>

              <h3
                className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-[#381A0E] tracking-tight leading-tight mb-4"
                style={{ fontFamily: "'Cabin Condensed', sans-serif" }}
              >
                Spreading Happiness with Every Sweet Creation
              </h3>

              <p className="text-base sm:text-lg text-[#381A0E]/85 font-normal leading-relaxed">
                Our mission is to craft chocolates that bring joy to every home and help bakeries, hotels, and chefs succeed. We deliver rich taste, smooth melt, and dependable quality so every dessert turns into a memorable celebration.
              </p>

              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[#A8450D]">
                <span className="w-8 h-0.5 bg-[#A8450D] rounded-full" />
                <span>Reliable Melt & Shine • Spreading Sweet Smiles</span>
              </div>
            </motion.div>
          </div>

          {/* 4 Core Pillars with Motion on Scroll */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                num: '01',
                title: 'Pure & Ethical Cocoa',
                desc: 'Direct partnerships with trusted cocoa farms ensuring pure beans and fair trade practices.',
              },
              {
                num: '02',
                title: 'Made for Indian Climate',
                desc: 'Specially refined formulations that temper perfectly and hold smooth texture in tropical weather.',
              },
              {
                num: '03',
                title: 'Rich Taste & Silky Melt',
                desc: 'Deep aromatic chocolate flavor and velvety mouthfeel that elevates every cake, cookie, and dessert.',
              },
              {
                num: '04',
                title: 'Trusted Baker Community',
                desc: 'Supporting local bakeries, pastry chefs, and home creators with fresh batches and reliable supply.',
              },
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#381A0E]/10 hover:border-[#8C4724]/30 hover:shadow-md transition-all group"
              >
                <span className="text-xs font-black text-[#C5222A] uppercase block mb-1">
                  {pillar.num}. {pillar.title}
                </span>
                <p className="text-xs text-[#381A0E]/75 font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          POINT 4: QUALITY COMMITMENT & CULINARY STANDARDS
          ========================================================================= */}
      <section className="relative overflow-hidden py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#381A0E]/10">
        {/* Decorative floating chocolate — right side */}
        <motion.img
          src="/assets/chocolate/floating_choc_piece.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute top-10 -right-14 sm:right-0 lg:right-8 w-40 sm:w-56 lg:w-64 z-0 drop-shadow-[0_28px_28px_rgba(42,19,8,0.28)] select-none"
          animate={{ y: [0, -14, 0], rotate: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        />

        {/* Decorative floating chocolate — left side */}
        <motion.img
          src="/assets/chocolate/floating_choc_piece.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute bottom-6 -left-14 sm:left-0 lg:left-8 w-32 sm:w-44 lg:w-52 z-0 -scale-x-100 drop-shadow-[0_28px_28px_rgba(42,19,8,0.28)] select-none"
          animate={{ y: [0, 12, 0], rotate: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut', delay: 0.5 }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black tracking-[0.25em] uppercase text-[#8C4724] block mb-2">
              THE ROMA FOODS STANDARD
            </span>
            <h2
              className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#381A0E] leading-tight"
              style={{ fontFamily: "'Cabin Condensed', sans-serif" }}
            >
              OUR QUALITY COMMITMENT
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#381A0E]/80 font-light">
              From bean roasting to final micro-conching, every batch of chocolate leaving our Kurod Works is crafted to uncompromising culinary benchmarks.
            </p>
          </div>

          {/* 4 Pillars Quality Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 max-w-6xl mx-auto">
            {qualityCommitments.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden bg-white rounded-3xl p-6 sm:p-7 border border-[#381A0E]/12 shadow-sm hover:shadow-[0_24px_50px_-16px_rgba(140,71,36,0.25)] hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Top gold accent line */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Header: Icon + Number */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#381A0E] to-[#8C4724] text-[#F9BD03] flex items-center justify-center shadow-md group-hover:scale-105 group-hover:bg-[#F9BD03] group-hover:text-[#1C0E07] transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-2xl font-black text-[#381A0E]/20 group-hover:text-[#C8912B]/40 transition-colors">
                        {pillar.num}
                      </span>
                    </div>

                    {/* Tag */}
                    <span className="inline-block text-[10px] font-black uppercase tracking-[0.2em] text-[#8C4724] mb-1.5">
                      {pillar.tag}
                    </span>

                    {/* Title */}
                    <h3
                      className="text-xl font-bold uppercase text-[#381A0E] tracking-tight leading-snug mb-2 group-hover:text-[#8C4724] transition-colors"
                      style={{ fontFamily: "'Cabin Condensed', sans-serif" }}
                    >
                      {pillar.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-[#381A0E]/75 font-light leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Bottom Pill */}
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0E4] border border-[#EADBCC] text-[10px] font-bold text-[#8C4724] group-hover:bg-[#8C4724] group-hover:text-white group-hover:border-[#8C4724] transition-all duration-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8912B] group-hover:bg-[#F9BD03]" />
                      <span>{pillar.highlight}</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C8912B] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Trust Banner with 4 Badges */}
          <div className="mt-12 max-w-4xl mx-auto bg-white rounded-2xl border border-[#381A0E]/12 p-4 sm:p-5 shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#2A0E04]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Vegetarian</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#2A0E04]">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>FSSAI Certified</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#2A0E04]">
              <Award className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Zero Palm Oil</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#2A0E04]">
              <Factory className="w-4 h-4 text-[#8C4724] shrink-0" />
              <span>Direct Works Supply</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BOTTOM CTA & CATALOG ACCESS
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-[#381A0E] text-[#FEE8B4] text-center select-none">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs font-black uppercase tracking-[0.26em] text-[#F9BD03] block mb-3">
            ROMA FOODS TRADE CONCIERGE
          </span>
          <h2
            className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#FEE8B4] leading-tight mb-5"
            style={{ fontFamily: "'Cabin Condensed', sans-serif" }}
          >
            PARTNER WITH INDIA'S GROWING CHOCOLATE HOUSE
          </h2>
          <p className="text-xs sm:text-sm text-[#FEE8B4]/75 max-w-xl mx-auto font-light leading-relaxed mb-8">
            Request official formulation specifications, commercial pallet quotes, or complimentary
            sample boxes delivered direct from Dhamtari Works.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenReservation}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#F9BD03] hover:bg-[#FECF6A] text-[#1C0E07] text-xs font-black uppercase tracking-wider transition-all shadow-xl cursor-pointer"
            >
              <span>REQUEST SAMPLE BOX</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              <span>BACK TO HOME</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
