import React from 'react';
import { motion } from 'framer-motion';
import { Plus, ArrowRight } from 'lucide-react';

interface Gr8rMenuProps {
  onSelectItem: (item: any) => void;
}

export const Gr8rMenu: React.FC<Gr8rMenuProps> = ({ onSelectItem }) => {
  const menuItems = [
    {
      id: 'milk-compound',
      name: 'CLASSIC MILK COMPOUND',
      price: '₹280 / 500g',
      desc: 'Silky, non-temper chocolate buttons engineered for fast melting, enrobing, and mirror gloss.',
      image: '/assets/chocolate/menu_milk_compound.jpg',
      tag: 'Baking Staple',
    },
    {
      id: 'dark-couverture',
      name: 'SIGNATURE 55% COUVERTURE',
      price: '₹540 / 1kg',
      desc: 'Pure cocoa butter real chocolate with balanced bittersweet roast notes for bonbons and ganache.',
      image: '/assets/chocolate/menu_dark_couverture.jpg',
      tag: 'Chef Choice',
    },
    {
      id: 'caramel-butterscotch',
      name: 'CARAMEL BUTTERSCOTCH BUTTONS',
      price: '₹310 / 500g',
      desc: 'Warm golden toffee infused confectionery buttons delivering rich caramel sweetness to cakes.',
      image: '/assets/chocolate/menu_caramel_drops.jpg',
      tag: 'Sweet Crunch',
    },
    {
      id: 'noir-70',
      name: '70% SINGLE ORIGIN NOIR',
      price: '₹620 / 1kg',
      desc: 'Intense micro-refined dark couverture with subtle berry and woody roast terroir notes.',
      image: '/assets/chocolate/menu_noir_70.jpg',
      tag: 'Pure Noir',
    },
    {
      id: 'white-silk',
      name: 'IVORY WHITE SILK BUTTONS',
      price: '₹340 / 500g',
      desc: 'Creamy Madagascar vanilla cocoa butter drops crafted for velvet mousse, ganache, and truffles.',
      image: '/assets/chocolate/menu_white_chocolate.jpg',
      tag: 'Pure Velvet',
    },
    {
      id: 'hazelnut-praline',
      name: 'ROASTED HAZELNUT PRALINE',
      price: '₹680 / 1kg',
      desc: 'Stone-milled roasted hazelnut paste blended with smooth dairy milk chocolate for bonbon centers.',
      image: '/assets/chocolate/menu_hazelnut_praline.jpg',
      tag: 'Artisan Fill',
    },
  ];

  return (
    <section
      id="menu"
      className="py-24 sm:py-36 text-[#381A0E] select-none"
      style={{ backgroundColor: '#edecea' }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span
            className="text-xs font-black tracking-[0.25em] uppercase text-[#8C4724] block mb-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            OUR SELECTION
          </span>

          <h2
            className="text-5xl sm:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-[#381A0E] leading-[0.9]"
            style={{ fontFamily: "'Cabin Condensed', 'Bayon', Impact, sans-serif" }}
          >
            OUR PRODUCT
            <br />
            RANGE
          </h2>
        </div>

        {/* 6 Grid Cards exactly matching coffee-gr8r */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-3xl overflow-hidden p-6 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between border border-[#381A0E]/10"
            >
              <div>
                {/* Image */}
                <div className="rounded-2xl overflow-hidden bg-[#FAF8F5] aspect-square relative mb-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#381A0E] text-[#FEE8B4] text-[10px] font-black uppercase tracking-wider">
                    {item.tag}
                  </div>
                </div>

                {/* Name & Price */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3
                    className="text-2xl font-bold uppercase tracking-tight text-[#381A0E] leading-snug group-hover:text-[#8C4724] transition-colors"
                    style={{ fontFamily: "'Cabin Condensed', 'Bayon', Impact, sans-serif" }}
                  >
                    {item.name}
                  </h3>
                  <span
                    className="text-base font-black text-[#381A0E] shrink-0 font-mono"
                  >
                    {item.price.split(' ')[0]}
                  </span>
                </div>

                <p className="text-xs text-[#381A0E]/70 font-light leading-relaxed mb-4">
                  {item.desc}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[#381A0E]/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#8C4724] uppercase font-bold">
                  {item.price.split('/')[1] ? `Pack: ${item.price.split('/')[1]}` : 'Ready to Ship'}
                </span>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onSelectItem(item)}
                  className="w-10 h-10 rounded-full bg-[#381A0E] hover:bg-[#F9BD03] text-[#FEE8B4] hover:text-[#1C0E07] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label={`Select ${item.name}`}
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Big Explore Full Menu Button */}
        <div className="mt-16 text-center">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-9 py-4 rounded-full bg-[#F9BD03] hover:bg-[#E5AC00] text-[#1C0E07] text-xs font-black uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span>EXPLORE FULL MENU & SAMPLES</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>

      </div>
    </section>
  );
};
