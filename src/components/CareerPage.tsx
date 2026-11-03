import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  TrendingUp,
  ShieldCheck,
  HeartHandshake,
  MapPin,
  Briefcase,
  ArrowRight,
  ArrowDown,
  Check,
  MessageCircle,
  Mail,
  Loader2,
  ChefHat,
  Factory,
  Megaphone,
  Truck,
  Clock,
  Building2,
  ChevronDown,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/products';
import { Gr8rNavbar } from './Gr8rNavbar';
import { Gr8rFooter, LegalTab } from './Gr8rFooter';
import { supabase } from '../lib/supabase';

interface CareerPageProps {
  onNavigateHome: (sectionId?: string) => void;
  onNavigateAbout?: () => void;
  onOpenReservation?: () => void;
  onOpenBrandGuide?: () => void;
  onOpenLegal: (tab: LegalTab) => void;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const VALUES = [
  {
    num: '01',
    icon: Sparkles,
    tag: 'Artisan Excellence',
    title: 'Craft Mastery',
    body: 'Learn hands-on beside master chocolatiers, roasters and food technologists working with real cocoa butter couverture.',
    highlight: 'Pure Cocoa Butter',
  },
  {
    num: '02',
    icon: TrendingUp,
    tag: 'Pan-India Scale',
    title: 'Real Growth',
    body: 'Grow with a fast-scaling B2B chocolate house supplying patisseries, hotels and cloud kitchens across India.',
    highlight: 'Fast-Track Career',
  },
  {
    num: '03',
    icon: ShieldCheck,
    tag: 'FSSAI Central Certified',
    title: 'World-Class Standards',
    body: 'Work inside an FSSAI Central-licensed facility built around micro-refinement, hygiene and precise tempering.',
    highlight: '<20 Micron Precision',
  },
  {
    num: '04',
    icon: HeartHandshake,
    tag: 'People & Purpose',
    title: 'Happiness-First Culture',
    body: 'A people-first team that lives by our promise — Spreading Happiness — to colleagues as much as customers.',
    highlight: 'Empowering Culture',
  },
];

export interface DetailedOpening {
  id: string;
  title: string;
  dept: string;
  location: string;
  type: string;
  workplace: string;
  experience: string;
  badge?: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const RICH_OPENINGS: DetailedOpening[] = [
  {
    id: 'master-chocolatier',
    title: 'Master Chocolatier (R&D)',
    dept: 'Product Development',
    location: 'Kurod Works, Dhamtari',
    type: 'Full-time',
    workplace: 'On-site Works',
    experience: '4–8 Years',
    badge: 'High Priority',
    summary: 'Formulate next-generation single-origin couvertures, bake-stable fillings, and micro-refined praline textures.',
    responsibilities: [
      'Develop bespoke couverture flavor profiles, fluidity ratings, and cocoa butter melt curves.',
      'Pilot new confectionery formulations for commercial patisseries and industrial bakery clients.',
      'Collaborate with food scientists on shelf-life stability, bloom resistance, and sensory panels.',
    ],
    requirements: [
      'Diploma / Degree in Culinary Arts, Pastry & Baking, or Food Technology.',
      'Demonstrated expertise in chocolate tempering, bean-to-bar roasting, and ganache emulsion.',
      'Passion for fine cocoa craft and deep understanding of Indian bakery industry requirements.',
    ],
    icon: ChefHat,
  },
  {
    id: 'production-supervisor',
    title: 'Production Supervisor',
    dept: 'Manufacturing',
    location: 'Kurod Works, Dhamtari',
    type: 'Full-time',
    workplace: 'On-site Works',
    experience: '3–6 Years',
    summary: 'Direct day-to-day continuous conching lines, automatic drop depositor plants, and temperature-controlled tempering tunnels.',
    responsibilities: [
      'Oversee shift operations across refining, conching, moulding, and automated pillow packing lines.',
      'Enforce daily production targets, yield optimization, and scrap minimization standards.',
      'Coordinate with maintenance engineering to ensure zero unplanned machinery downtime.',
    ],
    requirements: [
      'B.Tech / Diploma in Food Engineering, Mechanical, or Production Technology.',
      'Prior supervisor experience in confectionery, dairy, FMCG, or food processing facilities.',
      'Strong leadership, shift scheduling, and standard operating procedure (SOP) enforcement skills.',
    ],
    icon: Factory,
  },
  {
    id: 'food-technologist-qa',
    title: 'Food Technologist — QA / QC',
    dept: 'Quality & Safety',
    location: 'Kurod Works, Dhamtari',
    type: 'Full-time',
    workplace: 'On-site Works',
    experience: '2–5 Years',
    summary: 'Uphold strict FSSAI Central-licensed quality benchmarks, micron particle size verification, and microbiological compliance.',
    responsibilities: [
      'Conduct analytical testing on incoming cocoa liquor, cocoa butter, milk solids, and sugar.',
      'Perform micron grind size analysis (<20 microns), viscosity testing, and moisture checks on every batch.',
      'Maintain GMP, HACCP, ISO 22000 hygiene documentation and lead internal quality audits.',
    ],
    requirements: [
      'B.Sc / M.Sc / B.Tech in Food Technology, Food Chemistry, or Microbiology.',
      'Hands-on familiarity with lab testing equipment (viscometers, moisture analyzers, refractometers).',
      'Impeccable attention to regulatory compliance and sanitary standards.',
    ],
    icon: ShieldCheck,
  },
  {
    id: 'area-sales-manager-b2b',
    title: 'Area Sales Manager (B2B)',
    dept: 'Commercial',
    location: 'Pan-India',
    type: 'Full-time',
    workplace: 'Field & Client Travel',
    experience: '3–7 Years',
    badge: 'Urgent Hiring',
    summary: 'Expand commercial distribution of ROMAS compounds, couvertures, and glazes to hotel chains, premier bakeries, and cloud kitchens.',
    responsibilities: [
      'Identify, onboard, and manage master bakery ingredient distributors across assigned territories.',
      'Conduct live chef sampling demonstrations alongside our technical baking specialists.',
      'Achieve monthly volume targets and manage distributor credit lines and stock health.',
    ],
    requirements: [
      'Proven B2B sales track record in bakery ingredients, HoReCa supplies, or dairy/FMCG distribution.',
      'Existing relationships with pastry chefs, bakery owners, and wholesale confectionery distributors.',
      'Self-driven with strong negotiation, pipeline tracking, and territory growth capabilities.',
    ],
    icon: TrendingUp,
  },
  {
    id: 'brand-marketing-executive',
    title: 'Brand Marketing Executive',
    dept: 'Marketing',
    location: 'Raipur / Hybrid',
    type: 'Full-time',
    workplace: 'Hybrid',
    experience: '2–4 Years',
    summary: 'Champion the ROMAS brand across digital channels, pastry chef masterclasses, trade expos, and culinary content.',
    responsibilities: [
      'Curate visually appetizing video recipes, product hero reels, and chef spotlights for digital media.',
      'Organize and manage trade showcase booths at AAHAR, Bakery Business, and regional hospitality expos.',
      'Collaborate with design agencies to produce luxury product catalogs, sample boxes, and brand assets.',
    ],
    requirements: [
      'Degree in Marketing, Mass Communication, or Visual Arts with strong aesthetic sensibilities.',
      'Proficiency in social media strategy, content marketing, and community building in the culinary space.',
      'Excellent English & Hindi copywriting skills with a deep appreciation for premium gastronomy.',
    ],
    icon: Megaphone,
  },
  {
    id: 'logistics-dispatch-coordinator',
    title: 'Logistics & Dispatch Coordinator',
    dept: 'Supply Chain',
    location: 'Kurod Works, Dhamtari',
    type: 'Full-time',
    workplace: 'On-site Works',
    experience: '2–5 Years',
    summary: 'Orchestrate reefer cold-chain transportation, multi-state freight dispatch, and automated warehouse inventory control.',
    responsibilities: [
      'Schedule refrigerated trucks and express freight partners to preserve chocolate temperature during transit.',
      'Generate e-way bills, GST delivery challans, and real-time shipment tracking for distributors.',
      'Monitor finished goods inventory levels to prevent stockouts of fast-moving compound slabs and buttons.',
    ],
    requirements: [
      'Graduate in Supply Chain Management, Logistics, Commerce, or related disciplines.',
      'Experience with temperature-sensitive / cold-chain freight (dairy, chocolate, frozen foods).',
      'Proficient in ERP systems, spreadsheet reconciliation, and transport vendor negotiations.',
    ],
    icon: Truck,
  },
];

const INDIAN_STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Other',
];

const EXPERIENCE = ['Fresher (0–1 yr)', '1–3 years', '3–6 years', '6–10 years', '10+ years'];

export const CareerPage: React.FC<CareerPageProps> = ({
  onNavigateHome,
  onNavigateAbout,
  onOpenReservation,
  onOpenBrandGuide,
  onOpenLegal,
}) => {
  const formRef = useRef<HTMLDivElement>(null);
  const openingsRef = useRef<HTMLDivElement>(null);

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [openings, setOpenings] = useState<DetailedOpening[]>(RICH_OPENINGS);
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    state: '',
    experience: '',
    resume: '',
    message: '',
    agree: false,
  });

  useEffect(() => {
    document.title = 'Careers at ROMAS Chocolates | Roma Foods';
  }, []);

  // Load live openings posted by admin from Supabase (falls back to RICH_OPENINGS).
  useEffect(() => {
    if (!supabase) return;
    let active = true;
    supabase
      .from('job_openings')
      .select('title, department, location, type')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (!active || error || !data || data.length === 0) return;
        setOpenings((prev) => {
          return data.map((r, idx) => {
            const matched = prev.find((p) => p.title.toLowerCase() === r.title.toLowerCase());
            if (matched) return matched;
            return {
              id: `role-${idx}`,
              title: r.title,
              dept: r.department || 'Operations',
              location: r.location || 'Kurod Works, Dhamtari',
              type: r.type || 'Full-time',
              workplace: 'On-site Works',
              experience: '2–5 Years',
              summary: 'Join our team at ROMAS Chocolates to spread happiness across India.',
              responsibilities: [
                'Execute assigned operational and manufacturing duties with utmost precision.',
                'Maintain compliance with FSSAI hygiene and quality assurance standards.',
                'Collaborate effectively across cross-functional confectionery teams.',
              ],
              requirements: [
                'Relevant educational degree or professional certification.',
                'Prior experience in food manufacturing or commercial FMCG operations.',
                'Dedication to quality craftsmanship and collaborative teamwork.',
              ],
              icon: Briefcase,
            };
          });
        });
      });
    return () => {
      active = false;
    };
  }, []);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const applyFor = (title: string) => {
    setForm((prev) => ({ ...prev, position: title }));
    scrollToRef(formRef);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const isValid =
    form.name.trim() &&
    form.email.trim() &&
    form.phone.trim() &&
    form.position.trim() &&
    form.state.trim() &&
    form.agree;

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `ROMAS Careers — New Application\n\n` +
        `Name: ${form.name}\n` +
        `Position: ${form.position}\n` +
        `Email: ${form.email}\n` +
        `Phone: ${form.phone}\n` +
        `State: ${form.state}\n` +
        `Experience: ${form.experience || 'Not specified'}\n` +
        (form.resume ? `CV Link: ${form.resume}\n` : '') +
        (form.message ? `Note: ${form.message}\n` : '')
    );
    window.open(`https://wa.me/919098229454?text=${text}`, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setSubmitting(true);

    try {
      if (supabase) {
        const { error } = await supabase.from('career_applications').insert({
          full_name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          position_applied: form.position.trim(),
          state: form.state.trim(),
          experience: form.experience || null,
          resume_url: form.resume.trim() || null,
          cover_note: form.message.trim() || null,
        });
        if (error) {
          console.warn('Supabase careers insert returned error:', error.message);
        }
      }
    } catch (err) {
      console.warn('Supabase submission failed:', err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
      openWhatsApp();
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF8F3] text-[#2A0E04] flex flex-col font-sans selection:bg-[#F9BD03] selection:text-[#381A0E] antialiased">
      {/* 0. Top Navbar */}
      <Gr8rNavbar
        onOpenReservation={onOpenReservation}
        onNavigate={(id) => {
          if (id === 'about' && onNavigateAbout) {
            onNavigateAbout();
          } else {
            onNavigateHome(id);
          }
        }}
        currentPage="careers"
        variant="solid"
      />

      <main className="flex-1 w-full pt-20 sm:pt-24">
        {/* 1. HERO */}
        <section className="relative py-20 sm:py-32 px-4 sm:px-6 text-center overflow-hidden bg-gradient-to-b from-[#F2ECE1] via-[#FBF8F3] to-[#FBF8F3]">
          {/* Subtle Ambient Chocolate & Warm Golden Glow Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.35, 0.55, 0.35],
              x: [-15, 20, -15],
              y: [-10, 15, -10],
            }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-28 -left-28 w-96 h-96 rounded-full bg-[#E2C192]/35 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <motion.div
            animate={{
              scale: [1.12, 1, 1.12],
              opacity: [0.3, 0.5, 0.3],
              x: [20, -15, 20],
              y: [15, -10, 15],
            }}
            transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#C8912B]/25 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#381A0E_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Luxury Frosted Badge with Animated Sparkle */}
            <motion.div
              initial={{ opacity: 0, y: -18, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, ease: EASE }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-[#8C4724]/20 shadow-sm shadow-[#8C4724]/10 mb-5 group select-none"
            >
              <motion.span
                animate={{ rotate: [0, 16, -12, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex text-[#C8912B]"
              >
                <Sparkles className="w-3.5 h-3.5 fill-[#C8912B]/25" />
              </motion.span>
              <span className="text-[11px] sm:text-xs font-black tracking-[0.25em] uppercase text-[#8C4724]">
                Build a Career with ROMAS
              </span>
            </motion.div>

            {/* Headline with Masked Cinematic Slide-Up Motion */}
            <h1 className="select-none flex flex-col items-center justify-center">
              {/* Line 1: CRAFTING HAPPINESS */}
              <span className="block overflow-hidden py-0.5">
                <motion.span
                  initial={{ y: '115%', opacity: 0, rotateX: 25 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{ duration: 0.85, delay: 0.12, ease: EASE }}
                  className="block text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-tight text-[#381A0E] leading-[0.92]"
                  style={{ fontFamily: "'Cabin Condensed', 'Bayon', Impact, sans-serif" }}
                >
                  Crafting Happiness
                </motion.span>
              </span>

              {/* Line 2: TAKES CRAFTSPEOPLE */}
              <span className="block overflow-hidden py-0.5 mt-0.5 sm:mt-1">
                <motion.span
                  initial={{ y: '115%', opacity: 0, rotateX: 25 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{ duration: 0.9, delay: 0.28, ease: EASE }}
                  className="block text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-tight leading-[0.92] bg-gradient-to-r from-[#8C4724] via-[#B86226] to-[#8C4724] bg-clip-text text-transparent"
                  style={{ fontFamily: "'Cabin Condensed', 'Bayon', Impact, sans-serif" }}
                >
                  Takes Craftspeople
                </motion.span>
              </span>
            </h1>

            {/* Animated Gold Divider with Rotating Center Diamond */}
            <div className="relative mx-auto mt-6 sm:mt-8 flex items-center justify-center">
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.85, delay: 0.45, ease: EASE }}
                className="h-[2px] w-28 sm:w-36 origin-center rounded-full bg-gradient-to-r from-transparent via-[#C8912B] to-transparent"
                aria-hidden="true"
              />
              <motion.div
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: [0, 1.25, 1], rotate: 45 }}
                transition={{ duration: 0.55, delay: 0.65, ease: EASE }}
                className="absolute w-2.5 h-2.5 bg-[#C8912B] rounded-[2px] shadow-[0_0_10px_rgba(200,145,43,0.8)]"
                aria-hidden="true"
              />
            </div>

            {/* Subtitle with Delayed Smooth Reveal */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
              className="mt-6 text-sm sm:text-base lg:text-lg text-[#381A0E]/75 max-w-xl mx-auto font-light leading-relaxed"
            >
              We craft premium couvertures, compounds and cocoa for master patisseries across India.
              Come temper, roast, sell and dream with a team that lives to{' '}
              <span className="font-semibold text-[#8C4724]">spread happiness</span>.
            </motion.p>

            {/* Action Buttons with Interactive Motion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.68, ease: EASE }}
              className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4"
            >
              <motion.button
                onClick={() => scrollToRef(openingsRef)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#381A0E] hover:bg-[#8C4724] text-[#FEE8B4] text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#381A0E]/25 border border-[#C8912B]/30 cursor-pointer"
              >
                <span>View Open Roles</span>
                <motion.span
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-flex"
                >
                  <ArrowDown className="w-4 h-4 text-[#F9BD03]" />
                </motion.span>
              </motion.button>

              <motion.button
                onClick={() => scrollToRef(formRef)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white/75 hover:bg-white text-[#381A0E] hover:text-[#8C4724] text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md border border-[#381A0E]/15 hover:border-[#8C4724]/40 cursor-pointer backdrop-blur-sm"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* 2. WHY JOIN (ENHANCED LUXURY SCROLL MOTION & HOVER STYLING) */}
        <section className="py-20 sm:py-28 px-4 sm:px-6 bg-white border-y border-[#381A0E]/10 relative overflow-hidden">
          {/* Subtle Background Accent Texture */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#381A0E_1px,transparent_1px)] [background-size:20px_20px]" />

          <div className="max-w-6xl mx-auto relative z-10">
            {/* Staggered Scroll Motion Header */}
            <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, ease: EASE }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7EFE6] border border-[#381A0E]/10 text-xs font-black tracking-[0.25em] uppercase text-[#8C4724] mb-3"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C8912B]" />
                <span>Why ROMAS</span>
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
                className="text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#381A0E] leading-[0.95]"
                style={{ fontFamily: "'Cabin Condensed', 'Bayon', Impact, sans-serif" }}
              >
                More than a job — a craft
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
                className="mx-auto mt-5 h-[2px] w-20 origin-center rounded-full bg-gradient-to-r from-transparent via-[#C8912B] to-transparent"
                aria-hidden="true"
              />

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.22, ease: EASE }}
                className="mt-4 text-xs sm:text-sm text-[#381A0E]/70 max-w-md mx-auto font-light leading-relaxed"
              >
                Four foundational pillars that drive our conching precision, employee wellbeing, and culinary excellence.
              </motion.p>
            </div>

            {/* 4 Cards Grid with Smooth Staggered Scroll & Rich Hover Interactions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
              {VALUES.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 45, scale: 0.94 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{
                      duration: 0.65,
                      delay: i * 0.12,
                      ease: EASE,
                    }}
                    whileHover={{
                      y: -8,
                      scale: 1.02,
                      transition: { duration: 0.28, ease: 'easeOut' },
                    }}
                    className="group relative rounded-3xl bg-[#FBF8F3] hover:bg-white border border-[#381A0E]/10 hover:border-[#F9BD03]/70 p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-[0_24px_50px_-16px_rgba(56,26,14,0.18)] transition-all duration-300 cursor-default"
                  >
                    {/* Top Golden Light Beam Accent that glows on hover */}
                    <div
                      className="absolute top-0 inset-x-6 h-[3px] bg-gradient-to-r from-transparent via-[#F9BD03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* Subtle Warm Gradient Wash Layer on Hover */}
                    <div
                      className="absolute inset-0 bg-gradient-to-b from-[#FFFDF9] via-[#FAF7F2]/50 to-[#F5ECE0]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* Card Content Top Section */}
                    <div className="relative z-10">
                      {/* Top Row: Icon + Sequence Number */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-13 h-13 rounded-2xl bg-[#381A0E] text-[#F9BD03] flex items-center justify-center shadow-md group-hover:bg-[#F9BD03] group-hover:text-[#1C0E07] group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span
                          className="font-mono text-3xl font-black text-[#381A0E]/15 group-hover:text-[#C8912B]/40 transition-colors duration-300 select-none"
                          aria-hidden="true"
                        >
                          {v.num}
                        </span>
                      </div>

                      {/* Domain Tag */}
                      <span className="inline-block text-[10px] font-black uppercase tracking-[0.18em] text-[#8C4724] mb-1.5">
                        {v.tag}
                      </span>

                      {/* Card Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-[#2A0E04] group-hover:text-[#8C4724] transition-colors duration-300 leading-snug">
                        {v.title}
                      </h3>

                      {/* Card Body */}
                      <p className="mt-2.5 text-xs sm:text-sm text-[#381A0E]/70 font-light leading-relaxed">
                        {v.body}
                      </p>
                    </div>

                    {/* Bottom Highlight Pill with Dynamic Arrow Reveal */}
                    <div className="relative z-10 mt-6 pt-4 border-t border-[#381A0E]/8 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-[#8C4724] group-hover:text-[#381A0E] transition-colors duration-300 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C8912B] group-hover:scale-125 transition-transform" />
                        <span>{v.highlight}</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C8912B] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. ROLES WE'RE HIRING FOR (RE-ENGINEERED LUXURY DESIGN) */}
        <section ref={openingsRef} className="py-16 sm:py-28 px-4 sm:px-6 lg:px-8 scroll-mt-24">
          <div className="max-w-5xl mx-auto">
            
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
              <span className="text-xs font-black tracking-[0.25em] uppercase text-[#8C4724] block mb-2">
                Current Openings
              </span>
              <h2
                className="text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#381A0E] leading-[0.92]"
                style={{ fontFamily: "'Cabin Condensed', 'Bayon', Impact, sans-serif" }}
              >
                Roles we're hiring for
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-[#381A0E]/70 max-w-lg mx-auto font-light leading-relaxed">
                Explore high-impact positions across our state-of-the-art Dhamtari chocolate works, technical culinary labs, and national sales network.
              </p>
            </div>

            {/* Job Openings List */}
            <div className="space-y-4">
              {openings.map((job, i) => {
                  const Icon = job.icon || Briefcase;
                  const isExpanded = expandedJobId === job.id;

                  return (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.45, delay: i * 0.05, ease: EASE }}
                      className="group bg-white rounded-2xl sm:rounded-3xl border border-[#381A0E]/10 hover:border-[#F9BD03]/60 shadow-sm hover:shadow-[0_20px_45px_-18px_rgba(56,26,14,0.18)] transition-all duration-300 overflow-hidden relative"
                    >
                      {/* Subtle Top Gold Highlight on Hover */}
                      <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[#F9BD03]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      {/* Main Summary Row */}
                      <div className="p-5 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5">
                        {/* Left Column: Icon + Role Details */}
                        <div className="flex items-start sm:items-center gap-4 sm:gap-5 min-w-0 flex-1">
                          {/* Role Icon */}
                          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#381A0E] text-[#F9BD03] flex items-center justify-center shrink-0 shadow-md group-hover:bg-[#F9BD03] group-hover:text-[#1C0E07] transition-all duration-300">
                            <Icon className="w-6 h-6" />
                          </div>

                          <div className="min-w-0 flex-1">
                            {/* Badges Row */}
                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C4724] bg-[#F7EFE6] px-2.5 py-0.5 rounded-full">
                                {job.dept}
                              </span>
                              {job.badge && (
                                <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-400/20 border border-amber-500/30 px-2 py-0.5 rounded-full">
                                  {job.badge}
                                </span>
                              )}
                            </div>

                            {/* Title */}
                            <h3 className="text-xl sm:text-2xl font-bold text-[#2A0E04] leading-snug group-hover:text-[#8C4724] transition-colors">
                              {job.title}
                            </h3>

                            {/* 1-Line Role Summary */}
                            <p className="text-xs sm:text-sm text-[#381A0E]/70 font-light mt-1 line-clamp-2 sm:line-clamp-1 leading-relaxed">
                              {job.summary}
                            </p>

                            {/* Meta Tags (Location, Experience, Workplace, Type) */}
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3">
                              <span className="inline-flex items-center gap-1.5 text-xs text-[#381A0E]/75 font-medium bg-[#FBF8F3] border border-[#381A0E]/8 px-2.5 py-1 rounded-full">
                                <MapPin className="w-3.5 h-3.5 text-[#D11218]" />
                                <span>{job.location}</span>
                              </span>
                              <span className="inline-flex items-center gap-1.5 text-xs text-[#381A0E]/75 font-medium bg-[#FBF8F3] border border-[#381A0E]/8 px-2.5 py-1 rounded-full">
                                <Clock className="w-3.5 h-3.5 text-[#C8912B]" />
                                <span>{job.experience}</span>
                              </span>
                              <span className="inline-flex items-center gap-1.5 text-xs text-[#381A0E]/75 font-medium bg-[#FBF8F3] border border-[#381A0E]/8 px-2.5 py-1 rounded-full">
                                <Building2 className="w-3.5 h-3.5 text-[#381A0E]/60" />
                                <span>{job.workplace}</span>
                              </span>
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#8C4724] bg-[#F9BD03]/15 px-2.5 py-1 rounded-full">
                                {job.type}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right Column: Actions */}
                        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-[#381A0E]/10 justify-between md:justify-end">
                          <button
                            type="button"
                            onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#381A0E]/15 hover:border-[#381A0E] text-[#381A0E] text-xs font-bold transition-all cursor-pointer hover:bg-black/5"
                          >
                            <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform duration-300 ${
                                isExpanded ? 'rotate-180 text-[#8C4724]' : ''
                              }`}
                            />
                          </button>

                          <button
                            type="button"
                            onClick={() => applyFor(job.title)}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#381A0E] hover:bg-[#F9BD03] text-[#FEE8B4] hover:text-[#1C0E07] text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-md hover:scale-105 cursor-pointer"
                          >
                            <span>Apply</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                          </button>
                        </div>
                      </div>

                      {/* Expandable Specifications Accordion */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: EASE }}
                            className="border-t border-[#381A0E]/10 bg-[#FAF7F2] p-5 sm:p-7"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Responsibilities */}
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C4724] mb-3 flex items-center gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-[#C8912B]" />
                                  <span>Core Responsibilities</span>
                                </h4>
                                <ul className="space-y-2.5">
                                  {job.responsibilities.map((resp, rIdx) => (
                                    <li key={rIdx} className="text-xs sm:text-sm text-[#2A0E04]/80 flex items-start gap-2.5 leading-relaxed">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8912B] mt-2 shrink-0" />
                                      <span>{resp}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Requirements */}
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C4724] mb-3 flex items-center gap-2">
                                  <Award className="w-4 h-4 text-[#C8912B]" />
                                  <span>Ideal Candidate Profile</span>
                                </h4>
                                <ul className="space-y-2.5">
                                  {job.requirements.map((req, qIdx) => (
                                    <li key={qIdx} className="text-xs sm:text-sm text-[#2A0E04]/80 flex items-start gap-2.5 leading-relaxed">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#D11218] mt-2 shrink-0" />
                                      <span>{req}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Bottom Bar in Expanded View */}
                            <div className="mt-6 pt-4 border-t border-[#381A0E]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                              <p className="text-xs text-[#381A0E]/60 text-center sm:text-left">
                                Ready to bring your confectionery craft to ROMAS?
                              </p>
                              <button
                                type="button"
                                onClick={() => applyFor(job.title)}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#381A0E] hover:bg-[#F9BD03] text-[#FEE8B4] hover:text-[#1C0E07] text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
                              >
                                <span>Proceed to Application</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>

            {/* Spontaneous Open Application Banner */}
            <div className="mt-12 rounded-3xl bg-gradient-to-br from-[#381A0E] to-[#250F07] text-[#FEE8B4] p-7 sm:p-9 border border-[#F9BD03]/25 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-xl text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F9BD03]/15 text-[#F9BD03] text-[11px] font-bold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Spontaneous Application</span>
                </div>
                <h3
                  className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white leading-tight"
                  style={{ fontFamily: "'Cabin Condensed', 'Bayon', Impact, sans-serif" }}
                >
                  Don't see your exact role?
                </h3>
                <p className="text-xs sm:text-sm text-[#FEE8B4]/75 font-light mt-2 leading-relaxed">
                  We are always keen to meet passionate chocolatiers, food chemists, automated machinery technicians, and regional sales managers. Submit an Open Application and we'll connect when a match opens.
                </p>
              </div>
              <button
                type="button"
                onClick={() => applyFor('Open Application')}
                className="shrink-0 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#F9BD03] hover:bg-[#E5AC00] text-[#1C0E07] text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-lg hover:scale-105 cursor-pointer"
              >
                <span>Submit Open Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </section>

        {/* 4. APPLICATION FORM */}
        <section ref={formRef} className="py-16 sm:py-24 px-4 sm:px-6 bg-white border-t border-[#381A0E]/10 scroll-mt-24">
          <div className="max-w-3xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
              <span className="text-xs font-black tracking-[0.25em] uppercase text-[#8C4724] block mb-2">
                Apply Now
              </span>
              <h2
                className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#381A0E] leading-[0.95]"
                style={{ fontFamily: "'Cabin Condensed', 'Bayon', Impact, sans-serif" }}
              >
                Send us your application
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-[#381A0E]/65">
                Fill the form and submit — it opens WhatsApp with your details prefilled to our HR desk.
                You can email your CV to{' '}
                <a href="mailto:Hr@roomafoods.com" className="font-semibold text-[#8C4724] underline">
                  Hr@roomafoods.com
                </a>.
              </p>

              {/* Active Role Selected Indicator */}
              {form.position && (
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF7F2] border border-[#8C4724]/20 text-xs text-[#8C4724]">
                  <span>Applying for:</span>
                  <span className="font-bold text-[#381A0E]">{form.position}</span>
                  <button
                    onClick={() => setForm((prev) => ({ ...prev, position: '' }))}
                    className="ml-1 text-gray-400 hover:text-red-500 font-bold"
                  >
                    &times;
                  </button>
                </div>
              )}
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-8 sm:p-10 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-4">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#2A0E04] mb-2">Application received!</h3>
                <p className="text-sm text-[#381A0E]/70 max-w-md mx-auto">
                  Thank you — our HR team has your details and will reach out if there's a fit.
                  You can also message us at <strong>+91 9098229454</strong> or email{' '}
                  <strong>Hr@roomafoods.com</strong> with your CV.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                  <a
                    href={`https://wa.me/919098229454`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Open WhatsApp
                  </a>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Submit another
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#381A0E] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Chef Priya Sharma"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FBF8F3] text-sm text-[#2A0E04] focus:outline-none focus:border-[#C8912B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#381A0E] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="priya@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FBF8F3] text-sm text-[#2A0E04] focus:outline-none focus:border-[#C8912B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#381A0E] mb-2">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FBF8F3] text-sm text-[#2A0E04] focus:outline-none focus:border-[#C8912B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#381A0E] mb-2">
                      Role Applied For *
                    </label>
                    <select
                      name="position"
                      required
                      value={form.position}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FBF8F3] text-sm text-[#2A0E04] focus:outline-none focus:border-[#C8912B]"
                    >
                      <option value="">Select a role…</option>
                      {openings.map((j) => (
                        <option key={j.title} value={j.title}>
                          {j.title} ({j.dept})
                        </option>
                      ))}
                      <option value="Open Application">Open Application</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#381A0E] mb-2">
                      Current State / City *
                    </label>
                    <select
                      name="state"
                      required
                      value={form.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FBF8F3] text-sm text-[#2A0E04] focus:outline-none focus:border-[#C8912B]"
                    >
                      <option value="">Select your state…</option>
                      {INDIAN_STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#381A0E] mb-2">
                      Total Experience
                    </label>
                    <select
                      name="experience"
                      value={form.experience}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FBF8F3] text-sm text-[#2A0E04] focus:outline-none focus:border-[#C8912B]"
                    >
                      <option value="">Select experience level…</option>
                      {EXPERIENCE.map((e) => (
                        <option key={e} value={e}>
                          {e}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#381A0E] mb-2">
                    Resume / Portfolio Link (Google Drive, LinkedIn, Dropbox)
                  </label>
                  <input
                    type="url"
                    name="resume"
                    value={form.resume}
                    onChange={handleChange}
                    placeholder="https://drive.google.com/your-cv-link"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FBF8F3] text-sm text-[#2A0E04] focus:outline-none focus:border-[#C8912B]"
                  />
                  <p className="text-[11px] text-[#381A0E]/50 mt-1">
                    Or simply email your PDF to <strong>Hr@roomafoods.com</strong> after submitting.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#381A0E] mb-2">
                    Brief note about you & why ROMAS
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your chocolate journey, patisserie craft, or commercial distribution experience..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FBF8F3] text-sm text-[#2A0E04] focus:outline-none focus:border-[#C8912B]"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agree"
                    name="agree"
                    checked={form.agree}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 rounded text-[#381A0E] focus:ring-[#C8912B]"
                  />
                  <label htmlFor="agree" className="text-xs text-[#381A0E]/70 leading-relaxed">
                    I agree to allow ROMAS Chocolates / Roma Foods to store my application details and reach out regarding this role or future career opportunities.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!isValid || submitting}
                  className="w-full py-4 rounded-full bg-[#381A0E] hover:bg-[#F9BD03] text-[#FEE8B4] hover:text-[#1C0E07] disabled:opacity-40 disabled:hover:bg-[#381A0E] disabled:hover:text-[#FEE8B4] text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting…</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4" />
                      <span>Submit Application</span>
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-[#381A0E]/50 flex items-center justify-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  Prefer email? Write to Hr@roomafoods.com
                </p>
              </form>
            )}
          </div>
        </section>
      </main>

      <Gr8rFooter
        onOpenReservation={onOpenReservation}
        onOpenBrandGuide={onOpenBrandGuide}
        onNavigate={(id) => onNavigateHome(id)}
        onOpenLegal={onOpenLegal}
      />
    </div>
  );
};
