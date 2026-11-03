import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

export const Gr8rBranches: React.FC = () => {
  const branches = [
    {
      name: 'THE RESERVE CHOCOLATERIE',
      subtitle: 'Kurud Works & Primary Manufacturing Facility',
      address: COMPANY_INFO.factoryAddress || COMPANY_INFO.address,
      hours: 'Monday – Sunday | 9:30 AM – 7:00 PM IST',
      phone: COMPANY_INFO.phone,
      image: '/assets/chocolate/branch_works.jpg',
      mapsUrl: 'https://maps.google.com/?q=Kurud+Dhamtari+Chhattisgarh',
    },
    {
      name: 'THE ROAST & TEMPER STUDIO',
      subtitle: 'Corporate Office & Commercial Center',
      address: COMPANY_INFO.corporateOffice || 'Sf-8, Shyam Plaza, Opp. Bus Stand, Pandri, Raipur (C.G.)',
      hours: 'Monday – Saturday | 9:00 AM – 8:00 PM IST',
      phone: COMPANY_INFO.phone,
      image: '/assets/chocolate/branch_atelier.jpg',
      mapsUrl: 'https://maps.google.com/?q=Shyam+Plaza+Pandri+Raipur',
    },
  ];

  return (
    <section id="branch" className="py-24 sm:py-36 bg-[#F8F5F1] text-[#381A0E] border-t border-[#381A0E]/10 select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span
            className="text-xs font-black tracking-[0.25em] uppercase text-[#8C4724] block mb-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            OUR WORKS & STUDIOS
          </span>

          <h2
            className="text-4xl sm:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-[#381A0E] leading-[0.9]"
            style={{ fontFamily: "'Cabin Condensed', 'Bayon', Impact, sans-serif" }}
          >
            WHY ROMA
            <br />
            FOODS
          </h2>
        </div>

        {/* 2 Branch Cards Grid matching coffee-gr8r */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {branches.map((branch, index) => (
            <motion.div
              key={branch.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-[#381A0E]/10 flex flex-col justify-between"
            >
              <div>
                {/* Branch Image */}
                <div className="relative aspect-[16/10] bg-[#FAF8F5] overflow-hidden">
                  <img
                    src={branch.image}
                    alt={branch.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-[#381A0E] text-[#FEE8B4] text-[10px] font-black uppercase tracking-wider">
                    {branch.subtitle}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 sm:p-10 space-y-4">
                  <h3
                    className="text-3xl font-bold uppercase tracking-tight text-[#381A0E] leading-snug"
                    style={{ fontFamily: "'Cabin Condensed', 'Bayon', Impact, sans-serif" }}
                  >
                    {branch.name}
                  </h3>

                  <div className="space-y-3 pt-2 text-xs text-[#381A0E]/75 font-light">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#F9BD03] shrink-0 mt-0.5" />
                      <span>{branch.address}</span>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-[#F9BD03] shrink-0 mt-0.5" />
                      <span>{branch.hours}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Get Directions Button */}
              <div className="p-8 sm:p-10 pt-0">
                <motion.a
                  href={branch.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 px-6 rounded-full bg-[#381A0E] hover:bg-[#F9BD03] text-[#FEE8B4] hover:text-[#1C0E07] text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span>GET DIRECTIONS</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

