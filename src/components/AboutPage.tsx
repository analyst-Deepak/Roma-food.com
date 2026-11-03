import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Building2,
  Factory,
  Sparkles,
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
            <Sparkles className="w-4 h-4 text-[#F9BD03]" />
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
              POINT 01 / VERIFIED ENTITY
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
                POINT 02 / HERITAGE & CRAFT
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
      <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#381A0E]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black tracking-[0.25em] uppercase text-[#8C4724] block mb-2">
              POINT 03 / PURPOSE & PATH
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

            {/* Vision Column (Unboxed, Motion On Scroll) */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative md:pr-8 lg:pr-12"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-[#C5222A]/10 text-[#C5222A] flex items-center justify-center shadow-sm">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#C5222A] block">
                    OUR VISION
                  </span>
                  <span className="text-[10px] text-[#381A0E]/50 font-medium">WHAT WE ASPIRE TO BUILD</span>
                </div>
              </div>

              <h3
                className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-[#381A0E] tracking-tight leading-tight mb-4"
                style={{ fontFamily: "'Cabin Condensed', sans-serif" }}
              >
                Real, World-Class Chocolate Made in India
              </h3>

              <p className="text-base sm:text-lg text-[#381A0E]/80 font-normal leading-relaxed">
                Our vision is to provide every baker, pastry chef, and chocolate lover across India with pure, international-quality chocolate. Crafted with authentic cocoa butter, honest ingredients, and 100% vegetarian goodness.
              </p>

              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[#C5222A]">
                <span className="w-8 h-0.5 bg-[#C5222A] rounded-full" />
                <span>100% Pure Cocoa • Indian Craftsmanship</span>
              </div>
            </motion.div>

            {/* Mission Column (Unboxed, Motion On Scroll) */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative md:pl-8 lg:pl-12 md:border-l md:border-[#381A0E]/12"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-[#8C4724]/10 text-[#8C4724] flex items-center justify-center shadow-sm">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#8C4724] block">
                    OUR MISSION
                  </span>
                  <span className="text-[10px] text-[#381A0E]/50 font-medium">WHAT WE DO EVERY DAY</span>
                </div>
              </div>

              <h3
                className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-[#381A0E] tracking-tight leading-tight mb-4"
                style={{ fontFamily: "'Cabin Condensed', sans-serif" }}
              >
                Spreading Happiness with Every Sweet Creation
              </h3>

              <p className="text-base sm:text-lg text-[#381A0E]/80 font-normal leading-relaxed">
                Our mission is to craft chocolates that bring joy to every home and help bakeries, hotels, and chefs succeed. We deliver rich taste, smooth melt, and dependable quality so every dessert turns into a memorable celebration.
              </p>

              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[#8C4724]">
                <span className="w-8 h-0.5 bg-[#8C4724] rounded-full" />
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
      <section className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#381A0E]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black tracking-[0.25em] uppercase text-[#8C4724] block mb-2">
              POINT 04 / GOVERNANCE & STEWARDSHIP
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
            {leadershipTeam.map((leader, idx) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#381A0E]/15 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Photo with Verified Badge */}
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6 bg-[#381A0E]/5 border border-[#381A0E]/10">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C4724] block mb-1">
                    AUTHORIZED PARTNER
                  </span>

                  <h3
                    className="text-2xl font-bold uppercase text-[#381A0E] tracking-tight leading-snug mb-1"
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

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-[#381A0E]/60">
                  <span>Resident of Chhattisgarh, India</span>
                  <span className="font-semibold text-emerald-700">Verified Partner</span>
                </div>
              </motion.div>
            ))}
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
