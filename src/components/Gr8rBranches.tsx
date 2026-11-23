import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowRight, Phone, Mail, Globe, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

export const Gr8rBranches: React.FC = () => {
  const branches = [
    {
      name: 'THE RESERVE CHOCOLATERIE',
      badge: 'Manufacturing Works',
      subtitle: 'Kurud Works & Primary Conching Facility',
      address: COMPANY_INFO.factoryAddress || COMPANY_INFO.address,
      hours: 'Monday – Sunday | 9:30 AM – 7:00 PM IST',
      phone: COMPANY_INFO.phone,
      image: '/assets/chocolate/branch_works.jpg',
      mapsUrl: 'https://maps.google.com/?q=Kurud+Dhamtari+Chhattisgarh',
      detailsTitle: 'Facility & Trust Details',
      details: [
        { label: 'Facility', value: 'Conching & Tempering Works' },
        { label: 'Phone', value: COMPANY_INFO.phone, href: `tel:${COMPANY_INFO.phone}` },
        { label: 'FSSAI Lic.', value: COMPANY_INFO.fssaiNumber },
        { label: 'Dispatch', value: 'Temperature-Controlled' },
      ],
    },
    {
      name: 'THE ROAST & TEMPER STUDIO',
      badge: 'Corporate Studio',
      subtitle: 'Corporate Office & Commercial Center',
      address: COMPANY_INFO.corporateOffice || 'Sf-8, Shyam Plaza, Opp. Bus Stand, Pandri, Raipur (C.G.)',
      hours: 'Monday – Saturday | 9:00 AM – 8:00 PM IST',
      phone: COMPANY_INFO.phone,
      image: '/assets/chocolate/branch_atelier.jpg',
      mapsUrl: 'https://maps.google.com/?q=Shyam+Plaza+Pandri+Raipur',
      detailsTitle: 'Company & Office Details',
      details: [
        { label: 'Website', value: COMPANY_INFO.website, href: `https://${COMPANY_INFO.website}` },
        { label: 'Email', value: COMPANY_INFO.email, href: `mailto:${COMPANY_INFO.email}` },
        { label: 'FSSAI Lic.', value: COMPANY_INFO.fssaiNumber },
        { label: 'Established', value: `Est. ${COMPANY_INFO.establishedYear}` },
      ],
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-stretch">
          {branches.map((branch, index) => (
            <motion.div
              key={branch.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-[#381A0E]/10 flex flex-col justify-between h-full"
            >
              <div>
                {/* Branch Image with Badge Pill */}
                <div className="relative aspect-[16/10] bg-[#FAF8F5] overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#1C0E07]/80 backdrop-blur-md text-[#F9BD03] text-[10px] font-black uppercase tracking-widest border border-[#F9BD03]/30 shadow-md">
                    {branch.badge}
                  </div>
                  <img
                    src={branch.image}
                    alt={branch.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Content */}
                <div className="p-8 sm:p-10 space-y-4">
                  <div>
                    <h3
                      className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#381A0E] leading-snug group-hover:text-[#8C4724] transition-colors"
                      style={{ fontFamily: "'Cabin Condensed', 'Bayon', Impact, sans-serif" }}
                    >
                      {branch.name}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#8C4724] mt-1">
                      {branch.subtitle}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2 text-xs text-[#381A0E]/75 font-light">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#8C4724] shrink-0 mt-0.5" />
                      <span className="font-normal text-[#2A0E04] leading-relaxed">{branch.address}</span>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-[#8C4724] shrink-0 mt-0.5" />
                      <span className="font-normal text-[#2A0E04]">{branch.hours}</span>
                    </div>

                    {/* Symmetrical, High-Contrast Company/Facility Details Box */}
                    <div className="pt-2">
                      <div className="bg-[#FAF6EE] rounded-2xl p-4 border border-[#EADBCC] space-y-2.5">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8C4724]">
                          {branch.detailsTitle}
                        </p>
                        <div className="grid grid-cols-2 gap-3 pt-0.5">
                          {branch.details.map((item, dIdx) => (
                            <div key={dIdx} className="flex flex-col">
                              <span className="text-[10px] font-bold text-[#8C4724]/80 uppercase tracking-wider">
                                {item.label}
                              </span>
                              {item.href ? (
                                <a
                                  href={item.href}
                                  target={item.href.startsWith('http') ? '_blank' : undefined}
                                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                  className="text-xs font-semibold text-[#2A0E04] hover:text-[#8C4724] transition-colors truncate"
                                >
                                  {item.value}
                                </a>
                              ) : (
                                <span className="text-xs font-semibold text-[#2A0E04] truncate">
                                  {item.value}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Get Directions Button */}
              <div className="p-8 sm:p-10 pt-2">
                <motion.a
                  href={branch.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 px-6 rounded-full bg-[#2A0E04] hover:bg-[#8C4724] text-[#FEE8B4] hover:text-white text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span>GET DIRECTIONS</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

