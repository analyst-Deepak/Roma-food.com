import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Check, Sparkles, Truck } from 'lucide-react';
import { COMPANY_INFO, PRODUCTS } from '../data/products';
import { MotionReveal } from './MotionReveal';
import { RomasLogo } from './RomasLogo';

interface ContactSectionProps {
  initialProductInterest?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialProductInterest = 'ROMAS Milk Compound Buttons',
}) => {
  const [activeTab, setActiveTab] = useState<'sample' | 'distributor' | 'bulk'>('sample');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const framerEase = [0.16, 1, 0.3, 1] as const;

  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    businessType: 'Artisan Bakery',
    monthlyVolume: '50kg – 200kg',
    productInterest: initialProductInterest,
    comments: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Roma Foods Concierge, I am interested in ROMAS chocolates for my business (${formData.businessName || 'Commercial Bakery'}). Please share commercial pricing and trade sample details.`
  );

  return (
    <section id="contact" className="py-24 sm:py-36 bg-[#FBF8F3] text-[#2A0E04] relative overflow-hidden border-t border-[#381305]/10">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#FAD674]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <MotionReveal className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#381305]/5 border border-[#381305]/15 text-[#8C4724] text-[11px] font-bold uppercase tracking-[0.22em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27]" />
            <span>Maison Roma Foods Trade Concierge</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-[#2A0E04] leading-tight">
            Partner With The Maison
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#2A0E04]/75 font-light leading-relaxed">
            Whether you operate a boutique patisserie, a multi-city bakery chain, or an ice cream manufacturing line,
            our technical confectioners are ready to power your creations.
          </p>
        </MotionReveal>

        {/* 2-Column Split: Info + Tabs Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Coordinates & Trust Cards (5 cols) */}
          <MotionReveal className="lg:col-span-5 space-y-8">
            
            {/* Official Factory Card */}
            <div className="p-8 rounded-3xl bg-white border border-[#381305]/10 shadow-lg">
              <div className="flex items-center gap-4 pb-6 border-b border-[#381305]/10 mb-6">
                <RomasLogo variant="badge" size="sm" />
                <div>
                  <h4 className="font-serif font-bold text-xl text-[#381305]">
                    Roma Foods Factory
                  </h4>
                  <p className="text-xs text-[#8C4724] font-medium">
                    FSSAI Lic. #{COMPANY_INFO.fssaiNumber}
                  </p>
                </div>
              </div>

              <div className="space-y-5 text-sm text-[#2A0E04]">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#C59B27] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#8C4724] block">
                      Works & Manufacturing Facility:
                    </span>
                    <p className="text-xs text-[#2A0E04]/80 mt-0.5 leading-relaxed font-light">
                      {COMPANY_INFO.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#C59B27] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#8C4724] block">
                      Direct Trade Hotline:
                    </span>
                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="text-xs font-semibold text-[#381305] hover:text-[#C59B27] transition-colors"
                    >
                      {COMPANY_INFO.phone}
                    </a>
                    <span className="text-[11px] text-[#2A0E04]/60 block font-light">
                      Mon – Sat: 9:30 AM to 7:00 PM IST
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-[#C59B27] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#8C4724] block">
                      Official Trade Inquiries:
                    </span>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-xs font-semibold text-[#381305] hover:text-[#C59B27] transition-colors"
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Priority Button with Spring */}
              <div className="mt-8 pt-6 border-t border-[#381305]/10">
                <motion.a
                  href={`https://wa.me/919098229454?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-[0.18em] shadow-md transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </motion.a>
              </div>
            </div>

            {/* Pan-India Cold-Chain Supply Guarantee Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#381305] to-[#2A0E04] text-[#FAF8F5] border border-[#C59B27]/30 shadow-lg space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FAD674]/20 border border-[#FAD674]/30 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-[#FAD674]" />
                </div>
                <div>
                  <h5 className="font-serif font-bold text-lg text-[#FAF8F5]">
                    Pan-India Temperature-Controlled Logistics
                  </h5>
                  <p className="text-[11px] text-[#FAF8F5]/70 font-light">
                    Direct dispatch from Dhamtari & Raipur hubs
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#FAF8F5]/80 leading-relaxed font-light">
                Our logistics network guarantees zero heat damage or fat blooming in transit.
                Dispatched with insulated protective packaging for commercial bakery operations.
              </p>
            </div>

          </MotionReveal>

          {/* Right Column: High-Conversion Interactive Trade Form (7 cols) */}
          <MotionReveal delay={0.15} className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-[#381305]/10 p-7 sm:p-10 shadow-xl">
              
              {/* Tabs Navigator with Framer layoutId */}
              <div className="flex items-center p-1.5 rounded-2xl bg-[#FAF8F5] border border-[#381305]/10 mb-8 gap-1 relative">
                {(['sample', 'distributor', 'bulk'] as const).map((tab) => {
                  const isSelected = activeTab === tab;
                  const labels = {
                    sample: 'Sample Kit',
                    distributor: 'Distributor',
                    bulk: 'Industrial Bulk',
                  };

                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`relative flex-1 py-3 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                        isSelected ? 'text-[#FAD674]' : 'text-[#2A0E04]/70 hover:text-[#2A0E04]'
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="activeContactFormTab"
                          className="absolute inset-0 rounded-xl bg-[#381305] shadow-md"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{labels[tab]}</span>
                    </button>
                  );
                })}
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-3xl font-bold text-[#381305]">
                    Trade Request Dispatched
                  </h4>
                  <p className="text-sm text-[#2A0E04]/75 max-w-md mx-auto font-light leading-relaxed">
                    Thank you, {formData.contactPerson || 'Chef'}. Our Roma Foods trade representative will review your {formData.businessName} inquiry and reach out within 4 business hours.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-[#FAF8F5] border border-[#381305]/15 text-xs font-bold text-[#381305] uppercase tracking-wider cursor-pointer"
                  >
                    Submit Another Inquiry
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8C4724] mb-2">
                        Bakery / Company Name *
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        required
                        placeholder="e.g. Grand Patisserie & Cafe"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-2xl bg-[#FAF8F5] border border-[#381305]/10 text-xs focus:outline-none focus:border-[#C59B27] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8C4724] mb-2">
                        Contact Person & Role *
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        required
                        placeholder="e.g. Chef Rahul (Head Pastry Chef)"
                        value={formData.contactPerson}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-2xl bg-[#FAF8F5] border border-[#381305]/10 text-xs focus:outline-none focus:border-[#C59B27] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8C4724] mb-2">
                        Mobile Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-2xl bg-[#FAF8F5] border border-[#381305]/10 text-xs focus:outline-none focus:border-[#C59B27] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8C4724] mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="chef@bakery.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-2xl bg-[#FAF8F5] border border-[#381305]/10 text-xs focus:outline-none focus:border-[#C59B27] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8C4724] mb-2">
                        City & State *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        placeholder="e.g. Raipur, CG / Mumbai, MH"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-2xl bg-[#FAF8F5] border border-[#381305]/10 text-xs focus:outline-none focus:border-[#C59B27] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8C4724] mb-2">
                        Business Classification
                      </label>
                      <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-2xl bg-[#FAF8F5] border border-[#381305]/10 text-xs focus:outline-none focus:border-[#C59B27] transition-colors cursor-pointer"
                      >
                        <option>Artisan Bakery / Patisserie</option>
                        <option>HoReCa / Hotel / Banquet</option>
                        <option>Ice Cream & Frozen Dessert Maker</option>
                        <option>Confectionery Distributor / Wholesaler</option>
                        <option>Industrial Food Manufacturer (Tonnage)</option>
                        <option>Home Baker / Cloud Kitchen</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8C4724] mb-2">
                      Primary Product Interest
                    </label>
                    <select
                      name="productInterest"
                      value={formData.productInterest}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-2xl bg-[#FAF8F5] border border-[#381305]/10 text-xs focus:outline-none focus:border-[#C59B27] transition-colors cursor-pointer"
                    >
                      {PRODUCTS.map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name} ({p.packSize})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8C4724] mb-2">
                      Specific Requirements or Monthly Volume
                    </label>
                    <textarea
                      name="comments"
                      rows={3}
                      placeholder="Tell us about your current monthly consumption or specific melt curve required..."
                      value={formData.comments}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-2xl bg-[#FAF8F5] border border-[#381305]/10 text-xs focus:outline-none focus:border-[#C59B27] transition-colors resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-[#FAD674] via-[#E6C280] to-[#C59B27] hover:brightness-105 active:scale-98 text-[#140602] text-xs font-bold uppercase tracking-[0.2em] shadow-xl transition-shadow flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <span>Transmitting Trade File...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Trade Application</span>
                      </>
                    )}
                  </motion.button>

                  <p className="text-[10px] text-center text-[#2A0E04]/60 font-light">
                    🔒 Strict commercial privacy. Sample dispatches subject to trade verification by Roma Foods.
                  </p>
                </form>
              )}

            </div>
          </MotionReveal>

        </div>

      </div>
    </section>
  );
};
