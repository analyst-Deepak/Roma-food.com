import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface VisionPillar {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  highlight: string;
}

export const Gr8rBlog: React.FC = () => {
  const pillars: VisionPillar[] = [
    {
      id: 'sourcing',
      title: 'ETHICAL SOURCING',
      subtitle: 'Bean-to-Bar Integrity',
      image: '/assets/vision/vision_sourcing.jpg',
      description:
        'Building long-term relationships with regional cocoa cultivators, ensuring sustainable agricultural practices, fair compensation, and preserving natural biodiversity from bean to bar.',
      highlight: 'Direct Farm Partnerships & Pure Origins',
    },
    {
      id: 'innovation',
      title: 'INSPIRING INNOVATION',
      subtitle: 'Formulation & Texture Mastery',
      image: '/assets/vision/vision_innovation.jpg',
      description:
        'Combining expertise in taste, texture, form, and flavor with sub-20 micron micro-milling and precision conching science to empower the creativity of visionary pâtissiers and bakers.',
      highlight: 'Custom Tonnage & Calibrated Formulations',
    },
    {
      id: 'experiences',
      title: 'ELEVATING EXPERIENCES',
      subtitle: 'Extraordinary Palate Delights',
      image: '/assets/vision/vision_experiences.jpg',
      description:
        'Chocolate has the power to elevate everyday moments into extraordinary culinary creations. Formulated for glossy mirror glazes, clean crisp snaps, and effortless melting.',
      highlight: 'Pure Cocoa Butter & Velvet Fluidity',
    },
    {
      id: 'connections',
      title: 'BUILDING CONNECTIONS',
      subtitle: 'Community of Craftspeople',
      image: '/assets/vision/vision_connections.jpg',
      description:
        'Deepening our collective pursuit of mastery through hands-on pastry formulation masterclasses, technical baking support, and reliable cold-chain supply across India.',
      highlight: 'Culinary Masterclasses & B2B Solutions',
    },
  ];

  return (
    <section
      id="blog"
      className="py-20 sm:py-28 bg-[#edecea] text-[#381A0E] select-none border-t border-[#381A0E]/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Matching Reference Image) */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-base sm:text-lg font-bold text-[#C5222A] tracking-wide block mb-1.5"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            What Drives Us
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-4xl lg:text-[42px] font-medium text-[#2A0E04] tracking-tight leading-snug mb-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Your dreams give purpose to our passion
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs sm:text-sm text-[#7D6B63] italic font-light"
          >
            Hover over the cards to learn more about our vision
          </motion.p>
        </div>

        {/* 4 Vision Pillar Cards (Matching Reference Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="group relative h-[460px] sm:h-[500px] lg:h-[520px] rounded-2xl overflow-hidden bg-[#1C0E07] shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer border border-[#381A0E]/15"
            >
              {/* Full-bleed Portrait Photography */}
              <img
                src={pillar.image}
                alt={pillar.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                loading="lazy"
                draggable={false}
              />

              {/* Left Red Vertical Indicator Line (Matching Reference Image) */}
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-16 bg-[#C5222A] rounded-r-md transition-all duration-300 group-hover:h-24 group-hover:shadow-[0_0_12px_rgba(197,34,42,0.6)] z-20"
                aria-hidden="true"
              />

              {/* Permanent Bottom Vignette for Crisp Contrast */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 via-35% to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-0"
                aria-hidden="true"
              />

              {/* Default State: Title & Floral Motif */}
              <div className="absolute bottom-6 inset-x-5 flex items-center justify-between z-10 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
                <h3
                  className="text-base sm:text-lg font-bold tracking-[0.14em] uppercase text-[#FEE8B4] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {pillar.title}
                </h3>

                {/* 3-Tier Chevron Motif (Red / Gold / Red) */}
                <div className="flex flex-col items-center gap-1 shrink-0 ml-2">
                  <span className="w-1.5 h-1.5 rotate-45 bg-[#C5222A]" />
                  <span className="w-1.5 h-1.5 rotate-45 bg-[#E5C384]" />
                  <span className="w-1.5 h-1.5 rotate-45 bg-[#C5222A]" />
                </div>
              </div>

              {/* Interactive Hover State: Frosted Glass Vision Card */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C0E07]/95 via-[#1C0E07]/85 to-[#1C0E07]/50 p-6 sm:p-7 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out z-30 backdrop-blur-sm pointer-events-none sm:pointer-events-auto">
                <div className="inline-flex items-center gap-1.5 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#C5222A]">
                    {pillar.subtitle}
                  </span>
                </div>

                <h3
                  className="text-2xl font-bold uppercase tracking-wider text-[#F9BD03] mb-3 leading-tight"
                  style={{ fontFamily: "'Cabin Condensed', 'Bayon', Impact, sans-serif" }}
                >
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#FEE8B4]/90 font-light leading-relaxed mb-5">
                  {pillar.description}
                </p>

                <div className="pt-3.5 border-t border-white/15 flex items-center justify-between text-[11px] font-semibold text-[#FEE8B4]/80">
                  <span className="text-[#F9BD03]">{pillar.highlight}</span>
                  <div className="w-6 h-6 rounded-full bg-[#C5222A]/20 flex items-center justify-center text-[#F9BD03] group-hover:bg-[#C5222A] group-hover:text-white transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
