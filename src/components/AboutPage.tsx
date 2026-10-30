import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Award } from 'lucide-react';
import { Gr8rStatement } from './Gr8rStatement';
import { Gr8rFeatures } from './Gr8rFeatures';
import { Gr8rTestimonials } from './Gr8rTestimonials';
import { Gr8rFaq } from './Gr8rFaq';

interface AboutPageProps {
  onOpenReservation: () => void;
  onNavigateHome: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onOpenReservation,
  onNavigateHome,
}) => {
  const teamMembers = [
    {
      name: 'CHRISTOPHER MONTGOMERY',
      role: 'Master Chocolatier & Head of R&D',
      image: '/assets/team/team_1.png',
      experience: '18+ Years Confectionery Experience',
    },
    {
      name: 'SEBASTIAN KINGSLEY',
      role: 'Executive Pastry Chef & Formulations',
      image: '/assets/team/team_2.png',
      experience: 'Former Luxury Hotel Patissier',
    },
    {
      name: 'NICHOLAS WELLINGTON',
      role: 'Master Cocoa Roaster & Terroir Profiler',
      image: '/assets/team/team_3.png',
      experience: 'Single-Origin Sourcing Expert',
    },
    {
      name: 'ALEXANDER WHITMORE',
      role: 'Tempering & Conching Food Scientist',
      image: '/assets/team/team_4.png',
      experience: 'FSSAI Central Quality Auditor',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#381A0E] selection:bg-[#F9BD03] selection:text-[#381A0E]">
      {/* 1. HERO: Monumental 3D ROMAS Chocolate Slab on Ground Typography */}
      <section className="relative w-full min-h-[90vh] lg:min-h-screen flex flex-col justify-between pt-28 sm:pt-36 pb-12 overflow-hidden bg-[#FFFFFF]">
        {/* Subtle Ambient Studio Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#FEE8B4]/20 rounded-full blur-[140px] pointer-events-none" />

        {/* Top Header Tagline */}
        <div className="text-center z-10 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <img
              src="/assets/romas-logo-brown.png"
              alt="ROMAS Spreading Happiness"
              className="h-12 sm:h-14 w-auto object-contain mx-auto filter drop-shadow-sm"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-[#381A0E] leading-[0.92]"
            style={{ fontFamily: "'Cabin Condensed', 'Bayon', Impact, sans-serif" }}
          >
            CRAFTED FOR CHOCOLATE LOVERS
          </motion.h1>
        </div>

        {/* Center: The Monumental 3D ROMAS Chocolate Slab & Floor Scene */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 my-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.02 }}
            className="relative w-full max-w-5xl cursor-pointer group"
          >
            <img
              src="/assets/chocolate/about_roma_slab.png"
              alt="ROMAS Chocolate Slab 3D Craft Showcase"
              className="w-full h-auto object-contain drop-shadow-[0_35px_50px_rgba(56,26,14,0.18)] select-none pointer-events-none"
              draggable={false}
            />

            {/* Interactive Floating Badge Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="absolute -bottom-4 sm:bottom-4 left-1/2 -translate-x-1/2 px-6 py-2.5 rounded-full bg-[#381A0E] text-[#FEE8B4] border border-[#F9BD03]/30 shadow-2xl flex items-center gap-3 backdrop-blur-md"
            >
              <Award className="w-4 h-4 text-[#F9BD03]" />
              <span
                className="text-xs font-black uppercase tracking-widest"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                100% PURE COCOA BUTTER EMBOSSED SLAB
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Indicator */}
        <div className="text-center z-10 pt-8">
          <a
            href="#statement"
            className="inline-flex flex-col items-center gap-1 text-xs font-black tracking-widest text-[#381A0E]/50 hover:text-[#381A0E] transition-colors uppercase"
          >
            <span>SCROLL TO DISCOVER</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-[#F9BD03]" />
          </a>
        </div>
      </section>

      {/* 2. STATEMENT SECTION */}
      <div id="statement">
        <Gr8rStatement />
      </div>

      {/* 3. FOUR COMMITMENTS FEATURE GRID */}
      <Gr8rFeatures />

      {/* 4. MEET THE MASTER CHOCOLATIERS (Team Section matching Framer About Page) */}
      <section className="py-24 sm:py-36 bg-[#FFFFFF] text-[#381A0E] border-t border-[#381A0E]/10 select-none">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <span
              className="text-xs font-black tracking-[0.25em] uppercase text-[#8C4724] block mb-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              OUR ARTISANS
            </span>

            <h2
              className="text-5xl sm:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-[#381A0E] leading-[0.9]"
              style={{ fontFamily: "'Cabin Condensed', 'Bayon', Impact, sans-serif" }}
            >
              MEET THE MASTER CHOCOLATIERS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-[#F8F5F1] rounded-3xl p-5 border border-[#381A0E]/10 hover:border-[#381A0E]/30 transition-all group flex flex-col justify-between"
              >
                <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-5 bg-[#381A0E]/5">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <h3
                    className="text-xl sm:text-2xl font-black uppercase text-[#381A0E] tracking-tight leading-none mb-2"
                    style={{ fontFamily: "'Cabin Condensed', sans-serif" }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-xs font-bold uppercase text-[#8C4724] tracking-wider mb-2">
                    {member.role}
                  </p>
                  <p className="text-xs text-[#381A0E]/60 font-normal">
                    {member.experience}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <Gr8rTestimonials />

      {/* 6. FAQS */}
      <Gr8rFaq />
    </div>
  );
};

