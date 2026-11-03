import React from 'react';
import { motion } from 'framer-motion';
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
} from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

interface AboutPageProps {
  onOpenReservation: () => void;
  onNavigateHome: () => void;
}

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
  const leadershipTeam = [
    {
      name: 'NAND KISHORE AGRAWAL',
      role: 'Managing Partner & Operations Head',
      qualification: 'Graduate',
      responsibilities:
        'Person-in-charge of manufacturing operations under FSSAI license protocols. Directs industrial scaling, bean procurement, micro-refining facilities, and quality infrastructure at Kurud Works, Dhamtari.',
      image: '/assets/team/nand_kishore_agrawal.jpg',
      badge: 'Operational Head (FSSAI)',
    },
    {
      name: 'TRIPTI AGRAWAL',
      role: 'Partner & Strategic Management',
      qualification: 'Graduate',
      responsibilities:
        'Drives corporate governance, financial strategy, and national B2B supply-chain partnerships across commercial bakeries, 5-star patisseries, and distribution hubs across India.',
      image: '/assets/team/tripti_agrawal.jpg',
      badge: 'Authorized Partner (GST)',
    },
  ];

  const statutoryCredentials = [
    {
      icon: ShieldCheck,
      label: 'FSSAI Central / State License',
      value: '10526005000033',
      sub: 'Valid Upto October 2031',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      icon: FileText,
      label: 'GST Registration Number',
      value: '22ABAFR5939G2Z8',
      sub: 'Govt. of India Form GST REG-06',
      color: 'text-amber-800 bg-amber-50 border-amber-200',
    },
    {
      icon: Factory,
      label: 'Production Capacity',
      value: '1,000 MT / Day',
      sub: 'Industrial General Manufacturing',
      color: 'text-amber-900 bg-stone-50 border-stone-200',
    },
    {
      icon: CheckCircle2,
      label: 'Dietary Standard',
      value: '100% Vegetarian',
      sub: 'Zero Animal Fats or Rennet',
      color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
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
          <img
            src="/assets/chocolate/roma_slab_official.jpg"
            alt="ROMA Official Embossed Chocolate Slab"
            className="w-full h-full object-cover object-center"
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-md mb-5"
          >
            <span className="text-[11px] font-black uppercase tracking-[0.24em] text-[#F9BD03]">
              ROMA FOODS — ABOUT US
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
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
          <div className="max-w-3xl mb-12">
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
          </div>

          {/* Statutory Credentials Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {statutoryCredentials.map((c, i) => {
              const IconComp = c.icon;
              return (
                <div
                  key={i}
                  className={`p-6 rounded-2xl border ${c.color} shadow-sm flex flex-col justify-between`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10.5px] font-bold uppercase tracking-wider opacity-80">
                      {c.label}
                    </span>
                    <IconComp className="w-5 h-5 opacity-90" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight mb-1">
                      {c.value}
                    </div>
                    <div className="text-xs opacity-75">{c.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Entity Information Table */}
          <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 border border-[#381A0E]/10 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-xs sm:text-sm">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C4724] block">
                  Legal & Trade Name
                </span>
                <p className="font-bold text-base text-[#381A0E]">ROMA FOODS</p>
                <p className="text-[#381A0E]/70 font-light">Constitution of Business: Partnership Firm</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C4724] block">
                  GST Registration
                </span>
                <p className="font-bold text-base font-mono text-[#381A0E]">22ABAFR5939G2Z8</p>
                <p className="text-[#381A0E]/70 font-light">Govt. of India Form GST REG-06 | Range-II</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C4724] block">
                  FSSAI Manufacturing License
                </span>
                <p className="font-bold text-base font-mono text-[#381A0E]">10526005000033</p>
                <p className="text-[#381A0E]/70 font-light">Capacity: 1,000 Metric Tons/Day (State License)</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C4724] block">
                  Factory & Registered Works
                </span>
                <p className="font-semibold text-[#381A0E]">
                  KH No. 154/1, Village Darba, Block Kurud, Dhamtari - 493663, Chhattisgarh
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C4724] block">
                  Corporate Office
                </span>
                <p className="font-semibold text-[#381A0E]">
                  Sf-8, Shyam Plaza, Opp. Bus Stand, Pandri, Raipur (C.G.)
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C4724] block">
                  Approved Manufacturing Scope
                </span>
                <p className="text-[#381A0E]/80 font-light leading-snug">
                  Cocoa Mass, Cocoa Cake, Chocolate Liquor, Pure Couverture, Cocoa Powders & Confectionery.
                </p>
              </div>
            </div>
          </div>
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
          POINT 4: LEADERSHIP / MANAGEMENT
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
              GOVERNANCE & STEWARDSHIP
            </span>
            <h2
              className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#381A0E] leading-tight"
              style={{ fontFamily: "'Cabin Condensed', sans-serif" }}
            >
              LEADERSHIP & MANAGEMENT
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#381A0E]/80 font-light">
              Managed and directed by authorized partners recognized under Government of India GST
              and Food Safety & Standards Authority of India (FSSAI) regulatory charters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 max-w-4xl mx-auto">
            {leadershipTeam.map((leader, idx) => {
              const initials = leader.name
                .split(' ')
                .slice(0, 2)
                .map((w) => w[0])
                .join('');
              return (
                <motion.div
                  key={leader.name}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="group relative overflow-hidden bg-white rounded-3xl p-6 sm:p-8 border border-[#381A0E]/12 shadow-sm hover:shadow-[0_28px_55px_-20px_rgba(140,71,36,0.45)] hover:border-[#F9BD03]/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Top gold accent bar on hover */}
                  <div className="absolute top-0 left-0 h-1 w-full origin-left scale-x-0 group-hover:scale-x-100 bg-gradient-to-r from-[#8C4724] via-[#F9BD03] to-[#8C4724] transition-transform duration-500" />

                  {/* Soft warm glow on hover */}
                  <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#F9BD03]/0 group-hover:bg-[#F9BD03]/15 blur-3xl transition-colors duration-500" />

                  <div className="relative">
                    {/* Monogram Avatar + Partner Chip */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#381A0E] to-[#8C4724] text-[#F9BD03] flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-105 group-hover:shadow-lg transition-all duration-300 shrink-0"
                        style={{ fontFamily: "'Cabin Condensed', sans-serif" }}
                      >
                        {initials}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#8C4724] bg-[#FAF0E4] border border-[#EADBCC] px-2.5 py-1 rounded-full">
                        Authorized Partner
                      </span>
                    </div>

                    <h3
                      className="text-2xl font-bold uppercase text-[#381A0E] tracking-tight leading-snug mb-1 group-hover:text-[#8C4724] transition-colors"
                      style={{ fontFamily: "'Cabin Condensed', sans-serif" }}
                    >
                      {leader.name}
                    </h3>

                    <p className="text-xs font-semibold text-[#8C4724] mb-3">
                      {leader.role}
                    </p>

                    <p className="text-xs text-[#381A0E]/80 font-light leading-relaxed">
                      {leader.responsibilities}
                    </p>
                  </div>

                  <div className="relative mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-[#381A0E]/60">
                    <span>Resident of Chhattisgarh, India</span>
                    <span className="font-semibold text-emerald-700 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2l2.39 1.75 2.96-.02 1.08 2.76 2.76 1.08-.02 2.96L23 12l-1.75 2.39.02 2.96-2.76 1.08-1.08 2.76-2.96-.02L12 23l-2.39-1.75-2.96.02-1.08-2.76-2.76-1.08.02-2.96L1 12l1.75-2.39-.02-2.96 2.76-1.08 1.08-2.76 2.96.02L12 2zm-1.2 13.2l5.66-5.66-1.41-1.41-4.25 4.24-2.12-2.12-1.41 1.41 3.53 3.54z" />
                      </svg>
                      Verified Partner
                    </span>
                  </div>
                </motion.div>
              );
            })}
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
