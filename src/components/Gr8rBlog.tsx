import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const Gr8rBlog: React.FC = () => {
  const blogs = [
    {
      category: 'TEMPERING GUIDE',
      date: 'OCTOBER 18, 2026',
      title: 'MASTER THE PERFECT MIRROR GLAZE & SILK GANACHE AT HOME',
      image: '/assets/chocolate/blog_tempering.jpg',
      readTime: '4 MIN READ',
    },
    {
      category: 'COCOA BEANS',
      date: 'OCTOBER 10, 2026',
      title: 'CHOOSING THE RIGHT COCOA PERCENTAGE FOR YOUR PATISSERIE',
      image: '/assets/chocolate/blog_cocoa_beans.jpg',
      readTime: '6 MIN READ',
    },
    {
      category: 'CHEF GUIDE',
      date: 'OCTOBER 03, 2026',
      title: 'COUVERTURE VS COMPOUND: THE COMMERCIAL BAKER DIRECT COMPARISON',
      image: '/assets/chocolate/blog_chef_dessert.jpg',
      readTime: '5 MIN READ',
    },
  ];

  return (
    <section id="blog" className="py-24 sm:py-36 bg-[#F8F5F1] text-[#381A0E] border-t border-[#381A0E]/10 select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span
            className="text-xs font-black tracking-[0.25em] uppercase text-[#8C4724] block mb-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            JOURNAL & GUIDES
          </span>

          <h2
            className="text-5xl sm:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-[#381A0E] leading-[0.9]"
            style={{ fontFamily: "'Cabin Condensed', 'Bayon', Impact, sans-serif" }}
          >
            DISCOVER THE
            <br />
            CHOCOLATE WORLD
          </h2>
        </div>

        {/* 3 Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {blogs.map((b, index) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-[#381A0E]/10 flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[16/11] bg-[#FAF8F5] overflow-hidden">
                  <img
                    src={b.image}
                    alt={b.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#381A0E] text-[#FEE8B4] text-[9.5px] font-black uppercase tracking-wider">
                    {b.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 sm:p-8 space-y-3">
                  <div className="text-[11px] font-mono text-[#8C4724] flex items-center justify-between">
                    <span>{b.date}</span>
                    <span>{b.readTime}</span>
                  </div>

                  <h3
                    className="text-2xl font-bold uppercase tracking-tight text-[#381A0E] leading-snug group-hover:text-[#8C4724] transition-colors"
                    style={{ fontFamily: "'Cabin Condensed', 'Bayon', Impact, sans-serif" }}
                  >
                    {b.title}
                  </h3>
                </div>
              </div>

              {/* Read Article Link */}
              <div className="p-7 sm:p-8 pt-0 flex items-center justify-between border-t border-[#381A0E]/10 mt-4 pt-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#381A0E]">
                  READ ARTICLE
                </span>
                <div className="w-8 h-8 rounded-full bg-[#FAF8F5] group-hover:bg-[#F9BD03] group-hover:text-[#1C0E07] flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

