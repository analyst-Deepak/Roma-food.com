import React from 'react';
import { motion } from 'framer-motion';

export const Gr8rFeatures: React.FC = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=GFS+Didot&display=swap');

        .font-gfs-didot {
          font-family: 'GFS Didot', Georgia, serif;
        }
        .font-dm-sans {
          font-family: 'DM Sans', Arial, sans-serif;
        }
      `}</style>

      {/* Outer wrapper to allow smooth top-left curve transition */}
      <div className="w-full bg-[#edecea]">
        <section
          id="quality"
          className="relative w-full bg-[#f0e6d6] text-[#352015] pt-[85px] pb-[105px] sm:pt-[105px] sm:pb-[125px] rounded-tl-[60px] sm:rounded-tl-[100px] border-t border-[#d9c9b3]/50 select-none overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              
              {/* Left Column: Eyebrow + Heading + Cocoa Art Frame */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col"
              >
                <p className="font-dm-sans text-[12px] font-medium tracking-[0.22em] text-[#a16b33] uppercase mb-6 sm:mb-8">
                  THROUGH EVERY STAGE
                </p>

                <h2 className="font-gfs-didot text-4xl sm:text-6xl lg:text-[4.5rem] font-normal text-[#352015] leading-[1.08] tracking-[-0.035em] mb-8">
                  Consistency you<br className="hidden sm:inline" /> can build on.
                </h2>

                <div className="relative w-full h-[220px] sm:h-[250px] lg:h-[260px] rounded-tr-[65px] sm:rounded-tr-[80px] overflow-hidden bg-[#f6ecdc] shadow-sm">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    loading="lazy"
                    decoding="async"
                    src="/manufacturing-cocoa.webp"
                    alt="Cocoa beans and ingredients"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Right Column: Statement */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col justify-start lg:pt-14"
              >
                <p className="font-dm-sans text-[17px] sm:text-[19px] lg:text-[20px] leading-[1.65] text-[#352015] max-w-[540px]">
                  Quality and food safety guide the way we work, from the cocoa we select to the ingredients we prepare for our customers.
                </p>
              </motion.div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
};
