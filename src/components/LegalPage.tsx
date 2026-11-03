import React, { useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { COMPANY_INFO } from '../data/products';
import { Gr8rFooter } from './Gr8rFooter';
import { Gr8rNavbar } from './Gr8rNavbar';

export type LegalTabType = 'terms' | 'privacy' | 'cookie';

interface LegalPageProps {
  currentTab: LegalTabType;
  onSelectTab: (tab: LegalTabType) => void;
  onNavigateHome: (sectionId?: string) => void;
  onNavigateAbout?: () => void;
  onOpenReservation?: () => void;
  onOpenBrandGuide?: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({
  currentTab,
  onSelectTab,
  onNavigateHome,
  onNavigateAbout,
  onOpenReservation,
  onOpenBrandGuide,
}) => {
  // Update browser document title based on tab
  useEffect(() => {
    if (currentTab === 'privacy') {
      document.title = 'Privacy Policy | ROMAS Chocolates - Roma Foods';
    } else if (currentTab === 'terms') {
      document.title = 'Terms & Conditions | ROMAS Chocolates - Roma Foods';
    } else if (currentTab === 'cookie') {
      document.title = 'Cookie Policy | ROMAS Chocolates - Roma Foods';
    }
  }, [currentTab]);

  const tabs: { id: LegalTabType; label: string; title: string }[] = [
    { id: 'terms', label: 'Terms & Conditions', title: 'Terms & Conditions' },
    { id: 'privacy', label: 'Privacy Policy', title: 'Privacy Policy' },
    { id: 'cookie', label: 'Cookie Policy', title: 'Cookie Policy' },
  ];

  const activeTabConfig = tabs.find((t) => t.id === currentTab) || tabs[0];

  // Motion animation presets — smooth premium easing
  const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.06,
      },
    },
    exit: {
      opacity: 0,
      y: -16,
      transition: { duration: 0.3, ease: EASE },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 26 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: EASE,
      },
    },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.96, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.85,
        ease: EASE,
      },
    },
  };

  // Cascades each policy's body sections in one after another
  const sectionGroupVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.04 } },
  };

  return (
    <div className="min-h-screen bg-[#FBF8F3] text-[#381A0E] flex flex-col font-sans selection:bg-[#F9BD03] selection:text-[#381A0E]">
      
      {/* 1. Exact Coffee-Gr8r Solid Header Bar */}
      <Gr8rNavbar
        onNavigate={(id) => {
          if (id === 'about') {
            if (onNavigateAbout) onNavigateAbout();
            else window.location.href = '/about';
          } else {
            onNavigateHome(id);
          }
        }}
        onOpenReservation={onOpenReservation}
        currentPage="home"
        variant="solid"
      />

      {/* 2. Main Page Content (White Background, Monumental Chocolate Typography & Motion) */}
      <main className="flex-1 w-full pt-28 sm:pt-36 pb-20 sm:pb-28">
        
        {/* Sleek Policy Tab Switcher with Spring Motion Indicator */}
        <div className="max-w-4xl mx-auto px-6 mb-8 sm:mb-12 flex justify-center">
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-[#FAF6F0] border border-[#381A0E]/10 shadow-inner">
            {tabs.map((tab) => {
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  className={`relative px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-black tracking-wide uppercase transition-colors cursor-pointer select-none ${
                    isActive ? 'text-[#FEE8B4]' : 'text-[#381A0E]/70 hover:text-[#381A0E]'
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeLegalPill"
                      className="absolute inset-0 rounded-full bg-[#381A0E] shadow-md"
                      transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Animated Content Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-3xl sm:max-w-4xl mx-auto px-6 sm:px-10"
          >
            {/* Monumental Title Matching Screenshot */}
            <motion.h1
              variants={titleVariants}
              className="text-5xl sm:text-7xl md:text-8xl font-black text-[#381A0E] text-center tracking-tight leading-[0.95] mb-4"
              style={{ fontFamily: "'Cabin Condensed', 'Bayon', 'Inter', Impact, sans-serif" }}
            >
              {activeTabConfig.title}
            </motion.h1>

            {/* Gold accent divider */}
            <motion.div
              variants={itemVariants}
              className="mx-auto mb-6 h-[3px] w-20 sm:w-28 origin-center rounded-full bg-gradient-to-r from-transparent via-[#C8912B] to-transparent"
              aria-hidden="true"
            />

            {/* Centered Date in Tracked Uppercase */}
            <motion.p
              variants={itemVariants}
              className="text-center text-xs sm:text-sm font-bold tracking-[0.22em] uppercase text-[#381A0E]/65 mb-14 sm:mb-16"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              LAST UPDATED: AUGUST 21, 2026
            </motion.p>

            {/* TAB 1: TERMS & CONDITIONS */}
            {currentTab === 'terms' && (
              <motion.div
                variants={sectionGroupVariants}
                className="space-y-8 sm:space-y-10 text-base sm:text-lg text-[#381A0E]/85 leading-relaxed"
              >
                
                {/* Introductory Paragraph */}
                <motion.p variants={itemVariants} className="font-normal text-[#381A0E]/90">
                  Welcome to <strong>ROMAS Chocolates</strong> (operated by <strong>Roma Foods</strong>). By accessing our website, placing an order, requesting chocolate tasting boxes, or using our services, you agree to these Terms & Conditions. Please read them carefully before using our website.
                </motion.p>

                {/* Section 1 */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <h2
                    className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#381A0E]"
                    style={{ fontFamily: "'Cabin Condensed', 'Inter', sans-serif" }}
                  >
                    1. USE OF OUR WEBSITE
                  </h2>
                  <p className="text-sm sm:text-base text-[#381A0E]/80 leading-relaxed">
                    You agree to use our website only for lawful purposes and in a way that does not interfere with its operation, security, or the experience of other pastry chefs and commercial buyers. Unauthorized reproduction, automated scraping, or frame mirroring of our 3D chocolate slab media is strictly prohibited.
                  </p>
                </motion.div>

                {/* Section 2 */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <h2
                    className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#381A0E]"
                    style={{ fontFamily: "'Cabin Condensed', 'Inter', sans-serif" }}
                  >
                    2. ORDERS & PURCHASES
                  </h2>
                  <p className="text-sm sm:text-base text-[#381A0E]/80 leading-relaxed">
                    All bulk couverture orders, wholesale inquiries, and insulated sample box requests are subject to manufacturing availability and confirmation from our Dhamtari Works dispatch unit. We reserve the right to accept, modify, or cancel a request when freight conditions or supply thresholds require.
                  </p>
                </motion.div>

                {/* Section 3 */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <h2
                    className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#381A0E]"
                    style={{ fontFamily: "'Cabin Condensed', 'Inter', sans-serif" }}
                  >
                    3. USER REGISTRATION & COMMUNICATIONS
                  </h2>
                  <p className="text-sm sm:text-base text-[#381A0E]/80 leading-relaxed">
                    By submitting a wholesale inquiry or pastry chef request, you consent to receive direct commercial updates, batch analysis reports, and airway bills from our concierge via email, SMS, or the WhatsApp Business Cloud API (+91 9098229454). You may opt out of promotional messages at any time.
                  </p>
                </motion.div>

                {/* Section 4 */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <h2
                    className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#381A0E]"
                    style={{ fontFamily: "'Cabin Condensed', 'Inter', sans-serif" }}
                  >
                    4. INTELLECTUAL PROPERTY & DESIGNS
                  </h2>
                  <p className="text-sm sm:text-base text-[#381A0E]/80 leading-relaxed">
                    All trademarks, logos (including the registered ROMAS™ emblem), bespoke 3D chocolate slab geometry, cinematic video sequence renders, and formulation guides are the exclusive intellectual property of Roma Foods. No license is granted without prior written consent.
                  </p>
                </motion.div>

                {/* Section 5 */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <h2
                    className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#381A0E]"
                    style={{ fontFamily: "'Cabin Condensed', 'Inter', sans-serif" }}
                  >
                    5. META API & DATA PRIVACY COMPLIANCE
                  </h2>
                  <p className="text-sm sm:text-base text-[#381A0E]/80 leading-relaxed">
                    Our platform integrates with Meta Platforms (including the WhatsApp Cloud API) to facilitate rapid B2B wholesale support. We operate in strict conformity with Meta Developer Data Policies and India&apos;s Digital Personal Data Protection (DPDP) Act 2023. We do not sell or monetize personal communications.
                  </p>
                </motion.div>

                {/* Section 6 */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <h2
                    className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#381A0E]"
                    style={{ fontFamily: "'Cabin Condensed', 'Inter', sans-serif" }}
                  >
                    6. DISCLAIMER & LIMITATION OF LIABILITY
                  </h2>
                  <p className="text-sm sm:text-base text-[#381A0E]/80 leading-relaxed font-mono uppercase bg-gray-50 p-5 rounded-2xl border border-gray-200">
                    OUR WEBSITE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND. UNDER NO CIRCUMSTANCES SHALL ROMA FOODS, ITS PARTNERS, OR EMPLOYEES BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING FROM YOUR ACCESS TO OR INABILITY TO USE THIS WEBSITE.
                  </p>
                </motion.div>

                {/* Section 7 */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <h2
                    className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#381A0E]"
                    style={{ fontFamily: "'Cabin Condensed', 'Inter', sans-serif" }}
                  >
                    7. GOVERNING LAW & CONTACT
                  </h2>
                  <p className="text-sm sm:text-base text-[#381A0E]/80 leading-relaxed">
                    These Terms & Conditions are governed by and construed in accordance with the laws of India. Any legal proceedings shall be subject to the exclusive jurisdiction of the competent courts in Dhamtari / Raipur, Chhattisgarh, India.
                  </p>
                  <p className="text-sm text-[#381A0E]/70 pt-2">
                    For inquiries, contact: <strong>{COMPANY_INFO.email}</strong> | Phone: <strong>{COMPANY_INFO.phone}</strong>
                  </p>
                </motion.div>

              </motion.div>
            )}

            {/* TAB 2: PRIVACY POLICY */}
            {currentTab === 'privacy' && (
              <motion.div
                variants={sectionGroupVariants}
                className="space-y-8 sm:space-y-10 text-base sm:text-lg text-[#381A0E]/85 leading-relaxed"
              >
                
                {/* Intro */}
                <motion.p variants={itemVariants} className="font-normal text-[#381A0E]/90">
                  At <strong>ROMAS Chocolates (Roma Foods)</strong>, we respect your privacy and are committed to safeguarding all business and personal data collected through <strong>https://romaschocolates.com/</strong> and our official WhatsApp communication channels.
                </motion.p>

                {/* Section 1 */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <h2
                    className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#381A0E]"
                    style={{ fontFamily: "'Cabin Condensed', 'Inter', sans-serif" }}
                  >
                    1. INFORMATION WE COLLECT
                  </h2>
                  <p className="text-sm sm:text-base text-[#381A0E]/80 leading-relaxed">
                    When you contact our sales desk, request complimentary tasting boxes, or connect via WhatsApp, we collect:
                  </p>
                  <ul className="list-disc pl-6 text-sm sm:text-base text-[#381A0E]/80 space-y-1.5">
                    <li>Chef / Representative Name and Business Entity Name</li>
                    <li>Official Email address and WhatsApp telephone number</li>
                    <li>Delivery address for cold-chain chocolate sample shipments</li>
                    <li>Chocolate couverture profiles of interest (e.g. 55% Dark, Milk, Butterscotch Buttons)</li>
                  </ul>
                </motion.div>

                {/* Section 2 */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <h2
                    className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#381A0E]"
                    style={{ fontFamily: "'Cabin Condensed', 'Inter', sans-serif" }}
                  >
                    2. WHATSAPP BUSINESS & META CLOUD API
                  </h2>
                  <p className="text-sm sm:text-base text-[#381A0E]/80 leading-relaxed">
                    We provide direct sales support powered by the <strong>WhatsApp Cloud API (Meta Platforms, Inc.)</strong>. All WhatsApp chat conversations are end-to-end encrypted. We process messages exclusively to provide commercial quotes, share technical specification PDFs, and issue dispatch tracking numbers. We never scrape contacts or transmit spam broadcasts.
                  </p>
                </motion.div>

                {/* Section 3 */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <h2
                    className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#381A0E]"
                    style={{ fontFamily: "'Cabin Condensed', 'Inter', sans-serif" }}
                  >
                    3. USE & NON-DISCLOSURE OF INFORMATION
                  </h2>
                  <p className="text-sm sm:text-base text-[#381A0E]/80 leading-relaxed">
                    <strong>We never sell, rent, or share your personal data.</strong> Information is only shared with verified temperature-controlled logistics partners solely for delivering physical chocolate sample orders to your bakery address, or when required by statutory Indian authorities.
                  </p>
                </motion.div>

                {/* Section 4 */}
                <motion.div id="data-deletion" variants={itemVariants} className="space-y-3">
                  <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200">
                    <h2
                      className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#381A0E] mb-2"
                      style={{ fontFamily: "'Cabin Condensed', 'Inter', sans-serif" }}
                    >
                      4. USER RIGHTS & DATA DELETION INSTRUCTIONS
                    </h2>
                    <p className="text-sm sm:text-base text-[#381A0E]/85 leading-relaxed mb-3">
                      In compliance with Meta Platform Terms and Indian Privacy Laws (DPDP Act 2023), you hold the right to access, rectify, or request permanent deletion of your data at any time.
                    </p>
                    <p className="text-sm sm:text-base font-bold text-[#381A0E]">
                      How to Request Immediate Data Deletion:
                    </p>
                    <p className="text-sm text-[#381A0E]/80 mt-1">
                      Email our Data Officer at <strong>{COMPANY_INFO.email}</strong> with the subject <em>&quot;Data Deletion Request&quot;</em> or message WhatsApp at <strong>+91 9098229454</strong>. All personal records and chat logs will be permanently deleted within 48 hours.
                    </p>
                  </div>
                </motion.div>

                {/* Section 5 */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <h2
                    className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#381A0E]"
                    style={{ fontFamily: "'Cabin Condensed', 'Inter', sans-serif" }}
                  >
                    5. DATA SECURITY & RETENTION
                  </h2>
                  <p className="text-sm sm:text-base text-[#381A0E]/80 leading-relaxed">
                    We employ 256-bit TLS/SSL encryption and restricted-access storage. Records are retained strictly for the duration of commercial partnerships or as required by applicable tax and food safety regulatory audits.
                  </p>
                </motion.div>

                {/* Section 6 */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <h2
                    className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#381A0E]"
                    style={{ fontFamily: "'Cabin Condensed', 'Inter', sans-serif" }}
                  >
                    6. GRIEVANCE REDRESSAL OFFICER
                  </h2>
                  <p className="text-sm sm:text-base text-[#381A0E]/80 leading-relaxed">
                    <strong>Roma Foods (ROMAS Chocolates)</strong><br />
                    Atelier: {COMPANY_INFO.address}<br />
                    Email: {COMPANY_INFO.email} | Phone: {COMPANY_INFO.phone}<br />
                    FSSAI Central License: 10526005000033
                  </p>
                </motion.div>

              </motion.div>
            )}

            {/* TAB 3: COOKIE POLICY */}
            {currentTab === 'cookie' && (
              <motion.div
                variants={sectionGroupVariants}
                className="space-y-8 sm:space-y-10 text-base sm:text-lg text-[#381A0E]/85 leading-relaxed"
              >
                
                {/* Intro */}
                <motion.p variants={itemVariants} className="font-normal text-[#381A0E]/90">
                  This Cookie Policy explains how <strong>ROMAS Chocolates (Roma Foods)</strong> uses cookies, local browser storage, and related web technologies when you browse our website.
                </motion.p>

                {/* Section 1 */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <h2
                    className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#381A0E]"
                    style={{ fontFamily: "'Cabin Condensed', 'Inter', sans-serif" }}
                  >
                    1. WHAT ARE COOKIES
                  </h2>
                  <p className="text-sm sm:text-base text-[#381A0E]/80 leading-relaxed">
                    Cookies are small text files saved to your computer or mobile device. They help the website remember your actions and preferences over a period of time, ensuring consistent navigation.
                  </p>
                </motion.div>

                {/* Section 2 */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <h2
                    className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#381A0E]"
                    style={{ fontFamily: "'Cabin Condensed', 'Inter', sans-serif" }}
                  >
                    2. COOKIES WE DEPLOY
                  </h2>
                  <ul className="list-disc pl-6 text-sm sm:text-base text-[#381A0E]/80 space-y-2">
                    <li><strong>Essential Cookies:</strong> Necessary to maintain state across pages and retain items in your chocolate tasting inquiry drawer.</li>
                    <li><strong>Sequence Canvas Buffering:</strong> Allows 80-frame HD chocolate action sequences to pre-buffer locally, saving cellular data on repeat visits.</li>
                    <li><strong>Analytics:</strong> Anonymous visit statistics to determine demand for dark couverture versus milk compound buttons.</li>
                  </ul>
                </motion.div>

                {/* Section 3 */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <h2
                    className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#381A0E]"
                    style={{ fontFamily: "'Cabin Condensed', 'Inter', sans-serif" }}
                  >
                    3. MANAGING YOUR PREFERENCES
                  </h2>
                  <p className="text-sm sm:text-base text-[#381A0E]/80 leading-relaxed">
                    You can manage or disable cookies through your web browser preferences (Chrome, Safari, Firefox, Edge). Note that disabling functional cookies may prevent your selected tasting samples from persisting when you refresh the page.
                  </p>
                </motion.div>

              </motion.div>
            )}

          </motion.div>
        </AnimatePresence>

      </main>

      {/* 3. Grand ROMAS Luxury Dark Footer */}
      <Gr8rFooter
        onOpenReservation={onOpenReservation}
        onOpenBrandGuide={onOpenBrandGuide}
        onNavigate={(id) => onNavigateHome(id)}
        onOpenLegal={(tab) => {
          onSelectTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

    </div>
  );
};
