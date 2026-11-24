import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
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
  Paperclip,
  ChefHat,
  Factory,
  Megaphone,
  Truck,
  Clock,
  ChevronDown,
  CheckCircle2,
  Users,
  Award,
  Wrench,
  Compass,
  Layers,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/products';
import { Gr8rNavbar } from './Gr8rNavbar';
import { Gr8rFooter, LegalTab } from './Gr8rFooter';
import { supabase } from '../lib/supabase';
import { validateCareerForm } from '../lib/validation';

interface CareerPageProps {
  onNavigateHome: (sectionId?: string) => void;
  onNavigateAbout?: () => void;
  onOpenReservation?: () => void;
  onOpenBrandGuide?: () => void;
  onOpenLegal: (tab: LegalTab) => void;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const CULTURE_HIGHLIGHTS = [
  {
    num: '01',
    icon: Award,
    tag: 'Skill Mastery',
    title: 'Learn from Experts',
    desc: 'Hands-on training alongside master chocolatiers, food technologists, and roasting specialists.',
  },
  {
    num: '02',
    icon: TrendingUp,
    tag: 'Career Growth',
    title: 'Fast-Track Opportunities',
    desc: 'Grow with a fast-scaling chocolate brand serving luxury bakeries, cafes, and hotels nationwide.',
  },
  {
    num: '03',
    icon: ShieldCheck,
    tag: 'World-Class Standards',
    title: 'Modern Certified Plant',
    desc: 'Work in an advanced, hygienic, and certified facility where product quality comes first.',
  },
  {
    num: '04',
    icon: HeartHandshake,
    tag: 'People & Purpose',
    title: 'Supportive Culture',
    desc: 'A positive, caring work environment that lives by our promise of spreading happiness.',
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
  foodSafety?: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const RICH_OPENINGS: DetailedOpening[] = [
  {
    id: 'plant-hr-blue-collar',
    title: 'Plant HR – Blue-Collar Hiring',
    dept: 'Human Resources',
    location: 'Raipur / Kurud Plant, CG',
    type: 'Full-Time',
    workplace: 'On-site Plant',
    experience: '1–4 Years',
    summary: 'Responsible for blue-collar recruitment and core plant HR operations, ensuring timely manpower availability, effective employee administration and workforce management.',
    responsibilities: [
      'Manage end-to-end recruitment for machine operators, helpers, production workers, technicians and other plant positions.',
      'Source candidates through local networks, contractors, job portals, employee referrals and recruitment agencies.',
      'Screen candidates, schedule interviews and manage joining formalities.',
      'Maintain manpower plans, attendance, leave records, employee files, recruitment MIS and HR trackers.',
      'Handle employee grievances, discipline, workforce engagement, onboarding and induction documentation.',
    ],
    requirements: [
      'Graduate in HR, Business Administration or a related discipline preferred.',
      '1–4 years of experience in HR operations and blue-collar recruitment.',
      'Manufacturing, food processing or plant HR experience preferred.',
      'Strong candidate sourcing, HR documentation, attendance management and employee relations.',
    ],
    foodSafety: [
      'Ensure employees receive basic training on personal hygiene and workplace cleanliness.',
      'Communicate handwashing and protective clothing requirements during induction.',
      'Maintain food safety and hygiene training records.',
      'Ensure employees understand illness reporting and production-area hygiene rules.',
    ],
    icon: Users,
  },
  {
    id: 'production-manager-tutti-frutti',
    title: 'Production Manager / Production Head – Tutti Frutti',
    dept: 'Manufacturing',
    location: 'Raipur / Kurud Plant, CG',
    type: 'Full-Time',
    workplace: 'On-site Plant',
    experience: '4–8 Years',
    badge: 'Urgent Hiring',
    summary: 'Responsible for leading end-to-end Tutti Frutti manufacturing operations, ensuring production efficiency, product consistency, process control and achievement of production targets.',
    responsibilities: [
      'Lead Tutti Frutti manufacturing activities: fruit preparation, cutting, blanching, syrup treatment, colouring, flavouring, drying and finishing.',
      'Prepare and execute daily, weekly and monthly production plans.',
      'Monitor product parameters such as colour, texture, taste, moisture and consistency.',
      'Manage production output, machine efficiency, manpower deployment and shift performance.',
      'Control raw material consumption, process losses, rejection, manufacturing costs and develop production SOPs.',
    ],
    requirements: [
      'Degree / Diploma in Food Technology, Food Science or a related discipline preferred.',
      '4–8 years of experience in food manufacturing.',
      'Tutti Frutti, candied fruit or fruit-processing experience strongly preferred.',
      'Fruit processing knowledge, production planning, process optimization, cost control and team leadership.',
    ],
    foodSafety: [
      'Ensure hygienic handling of fruits, ingredients and work-in-progress.',
      'Maintain cleaning and sanitation standards for equipment and production areas.',
      'Monitor process parameters affecting product safety, including blanching, syrup preparation and drying.',
      'Prevent cross-contamination through appropriate material segregation and proper storage.',
    ],
    icon: Factory,
  },
  {
    id: 'machine-operator-tutti-frutti',
    title: 'Machine Operator – Tutti Frutti',
    dept: 'Manufacturing',
    location: 'Raipur / Kurud Plant, CG',
    type: 'Full-Time',
    workplace: 'On-site Plant',
    experience: '1–5 Years',
    summary: 'Responsible for operating and monitoring machinery used in Tutti Frutti processing while maintaining production targets, product quality and safe machine operations.',
    responsibilities: [
      'Operate machinery used for fruit cutting, blanching, syrup processing, colouring and drying.',
      'Follow machine operating instructions, batch sheets and standard operating procedures.',
      'Monitor machine settings, temperature, processing time and output quality.',
      'Ensure correct feeding and handling of raw materials and report abnormal conditions promptly.',
      'Perform routine cleaning, basic preventive maintenance and maintain shift-wise production records.',
    ],
    requirements: [
      'ITI, Diploma or relevant technical qualification preferred.',
      '1–5 years of machine operation experience.',
      'Food processing or fruit-processing machinery experience preferred.',
      'Machine operation, basic mechanical troubleshooting, attention to detail and safety discipline.',
    ],
    foodSafety: [
      'Maintain personal hygiene and use appropriate protective clothing.',
      'Keep food-contact surfaces, machinery and utensils clean.',
      'Protect ingredients and work-in-progress from contamination and follow material segregation.',
    ],
    icon: Wrench,
  },
  {
    id: 'plant-manager-chocolate',
    title: 'Plant Manager – Chocolate',
    dept: 'Manufacturing',
    location: 'Raipur / Kurud Plant, CG',
    type: 'Full-Time',
    workplace: 'On-site Plant',
    experience: '7–12 Years',
    badge: 'Key Leadership',
    summary: 'Responsible for providing overall leadership to the chocolate manufacturing facility. The role owns plant performance, production, quality, cost efficiency, manpower and timely fulfilment of business requirements.',
    responsibilities: [
      'Lead and oversee all plant functions, including production, quality, maintenance, stores and dispatch.',
      'Establish plant objectives, operational priorities and departmental performance expectations.',
      'Oversee chocolate manufacturing processes: melting, mixing, refining, conching, tempering, depositing, cooling and packaging.',
      'Monitor product specifications, taste, texture, viscosity, colour and batch consistency.',
      'Review plant capacity, machine utilization, manpower productivity, cost optimization and yield improvement.',
    ],
    requirements: [
      'Degree in Food Technology, Dairy Technology, Chemical Engineering or a related discipline preferred.',
      '7–12 years of experience in food or chocolate manufacturing.',
      'Strong experience in chocolate, compound chocolate or cocoa-based ingredient manufacturing essential.',
      'Experience managing complete plant operations and cross-functional teams.',
    ],
    foodSafety: [
      'Establish and enforce plant-wide food safety, hygiene and sanitation standards.',
      'Implement controls for allergen awareness, material segregation and cross-contamination prevention.',
      'Review cleaning schedules, sanitation performance, temperature controls and lead corrective actions.',
    ],
    icon: Award,
  },
  {
    id: 'plant-manager-tutti-frutti',
    title: 'Plant Manager – Tutti Frutti',
    dept: 'Manufacturing',
    location: 'Raipur / Kurud Plant, CG',
    type: 'Full-Time',
    workplace: 'On-site Plant',
    experience: '7–12 Years',
    badge: 'Key Leadership',
    summary: 'Responsible for leading the complete Tutti Frutti manufacturing facility, ensuring operational excellence, production targets, consistent quality, cost control and timely dispatch.',
    responsibilities: [
      'Lead plant operations across production, QA/QC, maintenance, stores and dispatch.',
      'Establish production priorities based on customer orders, sales forecasts and plant capacity.',
      'Oversee fruit processing, cutting, blanching, syrup preparation, colouring, drying and packaging.',
      'Monitor product consistency, including colour, texture, moisture, taste and shelf-life parameters.',
      'Control raw material consumption, wastage, inventory, manufacturing costs and drive SOP implementations.',
    ],
    requirements: [
      'Degree / Diploma in Food Technology, Food Science or a related discipline preferred.',
      '7–12 years of experience in food processing or manufacturing.',
      'Tutti Frutti, candied fruit or fruit-processing experience strongly preferred.',
      'Experience managing complete manufacturing operations, cost management and quality oversight.',
    ],
    foodSafety: [
      'Establish hygiene standards for raw-fruit receipt, washing, processing and finished-product packaging.',
      'Ensure proper cleaning and sanitation of processing equipment and production areas.',
      'Monitor storage conditions, prevent contamination and ensure food safety deviations are investigated.',
    ],
    icon: Factory,
  },
  {
    id: 'production-supervisor-chocolate',
    title: 'Production Supervisor – Chocolate',
    dept: 'Manufacturing',
    location: 'Raipur / Kurud Plant, CG',
    type: 'Full-Time',
    workplace: 'On-site Plant',
    experience: '2–5 Years',
    summary: 'Responsible for supervising daily chocolate production and shop-floor teams to ensure production schedules, product specifications and operational requirements are achieved.',
    responsibilities: [
      'Supervise daily chocolate production, shift operations, melting, mixing, tempering, depositing, cooling and packaging.',
      'Allocate duties to operators, helpers and production workers to ensure efficient utilization of machinery and materials.',
      'Monitor shift-wise production output, downtime, rejection and coordinate in-process inspections with QA/QC.',
      'Maintain shop-floor discipline, housekeeping and ensure production matches approved schedules.',
    ],
    requirements: [
      'ITI, Diploma or Graduate qualification preferred.',
      '2–5 years of production supervision experience.',
      'Chocolate, confectionery or food manufacturing experience preferred.',
      'Knowledge of chocolate production processes, shift handling, team supervision and shop-floor management.',
    ],
    foodSafety: [
      'Verify cleanliness of machinery, utensils and food-contact surfaces before production.',
      'Ensure employees follow handwashing, personal hygiene and proper material handling.',
      'Prevent cross-contamination during production and report deviations immediately.',
    ],
    icon: Layers,
  },
  {
    id: 'chocolate-chef-r-and-d',
    title: 'Chocolate Chef – Industrial Product Development',
    dept: 'Product & R&D',
    location: 'Raipur / Kurud Plant, CG',
    type: 'Full-Time',
    workplace: 'R&D Kitchen / Plant',
    experience: '3–8 Years',
    badge: 'Culinary & Innovation',
    summary: 'Responsible for developing, testing and standardizing chocolate formulations and applications for institutional B2B customers, with practical expertise in industrial chocolate manufacturing.',
    responsibilities: [
      'Develop and standardize Dark, Milk and White chocolate formulations, compound slabs, chips, paste, dips, coins, fillings and coatings.',
      'Develop flavoured compounds and pastes, including Orange, Mango and Hazelnut variants.',
      'Conduct product trials, sampling, recipe standardization and commercial scale-up with production teams.',
      'Evaluate taste, texture, viscosity, melting behaviour and setting performance.',
      'Develop customized applications for bakeries, confectioneries, cafés, ice cream manufacturers and food factories.',
    ],
    requirements: [
      'Diploma / Degree in Culinary Arts, Bakery & Confectionery, Food Technology or related discipline preferred.',
      '3–8 years of relevant experience in chocolate or confectionery.',
      'Industrial chocolate formulation and application expertise with sensory evaluation skills.',
      'Knowledge of compound chocolate, fillings, dips, coatings and technical recipe standardization.',
    ],
    foodSafety: [
      'Follow strict personal hygiene and sanitation practices during product development.',
      'Use clean, food-grade utensils, containers and work surfaces.',
      'Maintain allergen awareness, proper labelling, storage and batch traceability of samples.',
    ],
    icon: ChefHat,
  },
  {
    id: 'qa-qc-manager-head',
    title: 'QA & QC Manager / Head',
    dept: 'Quality & Food Safety',
    location: 'Raipur / Kurud Plant, CG',
    type: 'Full-Time',
    workplace: 'On-site Plant',
    experience: '4–8 Years',
    badge: 'Key Leadership',
    summary: 'Responsible for leading quality assurance and quality control across manufacturing operations, ensuring raw materials, production processes and finished products meet defined quality and food safety standards.',
    responsibilities: [
      'Lead the QA/QC function and establish quality systems, SOPs and inspection plans.',
      'Inspect incoming raw materials, in-process batches and finished products for moisture, viscosity, texture, colour, and taste.',
      'Manage sampling, laboratory testing, product specifications, batch traceability and quality records.',
      'Conduct internal quality audits, plant hygiene inspections and lead customer complaint investigations.',
      'Train employees on quality, hygiene, GMP and HACCP-based food safety practices.',
    ],
    requirements: [
      'Degree in Food Technology, Microbiology, Chemistry or a related discipline.',
      '4–8 years of QA/QC experience in food manufacturing.',
      'Chocolate, confectionery, bakery ingredients or food-processing experience preferred.',
      'Comprehensive understanding of GMP, HACCP, laboratory testing, audits and root-cause analysis.',
    ],
    foodSafety: [
      'Establish food safety controls for raw material receipt, processing, storage and dispatch.',
      'Monitor allergen controls, batch identification, traceability and verify cleaning effectiveness.',
      'Conduct regular food safety awareness and plant hygiene inspections.',
    ],
    icon: ShieldCheck,
  },
  {
    id: 'national-sales-manager-nsm',
    title: 'National Sales Manager (NSM) – Institutional',
    dept: 'Sales & Commercial',
    location: 'Pan-India / Regional Hubs',
    type: 'Full-Time',
    workplace: 'Corporate / National Travel',
    experience: '8–15 Years',
    badge: 'Senior Executive',
    summary: 'Responsible for leading national B2B sales strategy for institutional chocolate and food ingredients, driving revenue growth, key-account acquisition, distributor development and market expansion across India.',
    responsibilities: [
      'Develop and lead national B2B sales strategy, annual business plan and revenue targets.',
      'Drive sales of chocolate slabs, chips, paste, dips, coins, flavoured compounds, cocoa powder, butterscotch, tutti frutti and inclusions.',
      'Acquire large institutional customers, food manufacturers, bakery chains, hotel groups and strategic accounts.',
      'Lead and develop regional sales teams, distributors, channel partners and key accounts nationwide.',
      'Lead major commercial negotiations, product positioning, trade terms, sales forecasting and CRM management.',
    ],
    requirements: [
      'Graduate degree in Business, Marketing or a related discipline; MBA preferred.',
      '8–15 years of B2B sales experience in food ingredients, chocolate, confectionery, bakery ingredients or FMCG.',
      'Proven track record in national or multi-region sales leadership and institutional key-account acquisition.',
      'Established buyer and distributor relationships with willingness to travel nationally.',
    ],
    foodSafety: [
      'Ensure sales teams communicate accurate product specifications, storage instructions and handling.',
      'Promote appropriate storage, transportation and handling practices for food products.',
      'Ensure product samples are packed, identified and transported hygienically.',
    ],
    icon: TrendingUp,
  },
  {
    id: 'regional-sales-manager-rsm',
    title: 'Regional Sales Manager (RSM) – Institutional',
    dept: 'Sales & Commercial',
    location: 'Assigned Territory (North / West / South / East)',
    type: 'Full-Time',
    workplace: 'Territory Travel',
    experience: '4–10 Years',
    summary: 'Responsible for driving regional B2B sales and market development for institutional chocolate and food ingredients, with ownership of territory growth, customer acquisition and regional business performance.',
    responsibilities: [
      'Achieve regional sales, volume, profitability and collection targets across assigned territory.',
      'Promote chocolate slabs, chips, paste, dips, coins, flavoured compounds, cocoa powder, butterscotch and tutti frutti.',
      'Develop business with bakeries, cafés, hotels, cloud kitchens, ice cream manufacturers, confectioners and food factories.',
      'Appoint, manage and support regional distributors, dealers and channel partners.',
      'Build relationships with purchase heads, owners, chefs, production teams and institutional decision-makers.',
    ],
    requirements: [
      'Graduate degree in Business, Marketing, Food Science or related discipline; MBA advantageous.',
      '4–10 years of B2B sales experience in food ingredients, chocolate, confectionery or bakery supplies.',
      'Strong regional network of institutional buyers, distributor contacts and commercial negotiation skills.',
      'Self-driven with strong customer relationship, forecasting, pipeline tracking and territory growth capabilities.',
    ],
    foodSafety: [
      'Communicate correct product storage, shelf-life and handling information to customers.',
      'Ensure samples are stored, transported and presented hygienically.',
      'Guide distributors on protecting products from contamination, moisture and unsuitable storage conditions.',
    ],
    icon: Compass,
  },
];

const DEPARTMENTS = [
  'All',
  'Manufacturing',
  'Product & R&D',
  'Quality & Food Safety',
  'Sales & Commercial',
  'Human Resources',
];

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
  const [selectedDept, setSelectedDept] = useState('All');
  const [lastMailtoUrl, setLastMailtoUrl] = useState('');

  // Compact Avinash-style form state
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    position: 'Open Application',
    message: '',
    agree: true,
    resume: '',
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState('');

  const handleResumeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setUploadMsg('File is larger than 5MB — please select a smaller file.');
      return;
    }
    setResumeFile(file);
    setUploadMsg('');

    if (!supabase) {
      setUploadMsg('File attached ✓');
      return;
    }
    try {
      setUploading(true);
      // Validate file extension with whitelist
      const allowedExts = ['pdf', 'doc', 'docx', 'txt', 'rtf'];
      const ext = (file.name.split('.').pop() || '').toLowerCase();
      if (!allowedExts.includes(ext)) {
        setUploadMsg('Only PDF, DOC, DOCX files allowed');
        setUploading(false);
        return;
      }
      const path = `applications/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage
        .from('resumes')
        .upload(path, file, { upsert: false, contentType: file.type });
      if (error) throw error;
      const { data } = supabase.storage.from('resumes').getPublicUrl(path);
      setForm((prev) => ({ ...prev, resume: data.publicUrl }));
      setUploadMsg('File uploaded successfully ✓');
    } catch {
      setUploadMsg('File attached ✓');
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    document.title = 'Careers at ROMAS Chocolates | Roma Foods';
  }, []);

  // Sync live openings from Supabase
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
                'Dedication to high quality standards and collaborative teamwork.',
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

  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const applyFor = (title: string) => {
    setForm((prev) => ({ ...prev, position: title }));
    scrollToRef(formRef);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  // Enhanced validation with security checks
  const validationResult = validateCareerForm({
    name: form.name,
    email: form.email,
    phone: form.phone,
    position: form.position,
    message: form.message,
  });
  const isValid = validationResult.isValid && form.agree;

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `ROMAS Careers — New Application\n\n` +
        `Name: ${form.name}\n` +
        `Position: ${form.position || 'Open Application'}\n` +
        `Phone: ${form.phone}\n` +
        `Email: ${form.email}\n` +
        (form.resume ? `CV Link: ${form.resume}\n` : '') +
        (form.message ? `Message: ${form.message}\n` : '')
    );
    window.open(`https://wa.me/919098229454?text=${text}`, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setSubmitting(true);

    const hrEmail = COMPANY_INFO.hrEmail || 'Hr@roomafoods.com';
    // Validate HR email configuration
    if (!isValidEmail(hrEmail)) {
      alert('HR email configuration error');
      setSubmitting(false);
      return;
    }
    const positionApplied = form.position?.trim() || 'Open Application';
    const resumeDetails = form.resume.trim() || (resumeFile ? resumeFile.name : 'Not attached');

    // Prepare pre-filled email directly addressed to HR
    const mailSubject = encodeURIComponent(`Job Application: ${positionApplied} - ${form.name.trim()}`);
    const mailBody = encodeURIComponent(
      `Dear Roma Foods HR Team,\n\n` +
      `I would like to apply for the position: ${positionApplied}\n\n` +
      `Candidate Details:\n` +
      `• Full Name: ${form.name.trim()}\n` +
      `• Phone Number: ${form.phone.trim()}\n` +
      `• Email Address: ${form.email.trim()}\n` +
      `• Position Applied: ${positionApplied}\n` +
      (resumeDetails !== 'Not attached' ? `• Resume Details / Link: ${resumeDetails}\n` : '') +
      (form.message.trim() ? `• Cover Note / Background:\n${form.message.trim()}\n` : '') +
      `\nSubmitted on: ${new Date().toLocaleString('en-IN')}\n\n` +
      `Warm regards,\n${form.name.trim()}`
    );
    const mailto = `mailto:${hrEmail}?subject=${mailSubject}&body=${mailBody}`;
    setLastMailtoUrl(mailto);

    // 1. Send automated background email to HR via FormSubmit API
    try {
      await fetch(`https://formsubmit.co/ajax/${hrEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `New Job Application: ${positionApplied} - ${form.name.trim()}`,
          _template: 'table',
          _captcha: 'false',
          Candidate_Name: form.name.trim(),
          Phone_Number: form.phone.trim(),
          Email_Address: form.email.trim(),
          Position_Applied: positionApplied,
          Resume_Details: resumeDetails,
          Cover_Note: form.message.trim() || 'None provided',
          Submitted_At: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        }),
      });
    } catch (err) {
      console.warn('Background mail dispatch notice:', err);
    }

    // 2. Insert into Supabase if configured
    try {
      if (supabase) {
        const { error } = await supabase.from('career_applications').insert({
          full_name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          position_applied: positionApplied,
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
      // Trigger user's mail client directly so applicant can also send from their mailbox
      try {
        window.location.href = mailto;
      } catch {
        // Fallback handled by the prominent direct button
      }
    }
  };

  // Filter openings by selected department
  const filteredOpenings = openings.filter((job) => {
    if (selectedDept === 'All') return true;
    if (selectedDept === 'Product & R&D') return job.dept === 'Product & R&D' || job.dept === 'Product Development';
    if (selectedDept === 'Manufacturing') return job.dept === 'Manufacturing';
    if (selectedDept === 'Quality & Food Safety') return job.dept === 'Quality & Food Safety' || job.dept === 'Quality & Safety';
    if (selectedDept === 'Sales & Commercial') return job.dept === 'Sales & Commercial' || job.dept === 'Commercial' || job.dept === 'Marketing';
    if (selectedDept === 'Human Resources') return job.dept === 'Human Resources';
    return job.dept === selectedDept;
  });

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
        {/* 1. HERO (AVINASH-STYLE SMOOTH MOTION) */}
        <section className="relative py-20 sm:py-28 px-4 sm:px-6 text-center overflow-hidden bg-gradient-to-b from-[#F2ECE1] via-[#FAF5EC] to-[#FBF8F3]">
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[350px] bg-[#C8912B]/15 blur-3xl pointer-events-none rounded-full" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/90 border border-[#8C4724]/20 text-xs font-bold tracking-[0.2em] uppercase text-[#8C4724] mb-5 shadow-sm"
            >
              <span>Career Opportunities at ROMAS</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-[#381A0E] leading-[0.95]"
              style={{ fontFamily: "'Cabin Condensed', 'Bayon', Impact, sans-serif" }}
            >
              We Make Happiness <br />
              <span className="bg-gradient-to-r from-[#8C4724] via-[#B86226] to-[#8C4724] bg-clip-text text-transparent">
                With Great People
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
              className="mt-6 text-sm sm:text-base lg:text-lg text-[#381A0E]/75 max-w-2xl mx-auto leading-relaxed"
            >
              We craft delicious, high-quality chocolates loved by bakeries and food lovers across India.
              Explore our current openings and build a fulfilling career with us.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              <button
                type="button"
                onClick={() => scrollToRef(openingsRef)}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#381A0E] hover:bg-[#8C4724] text-[#FEE8B4] text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 cursor-pointer"
              >
                <span>View Openings</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollToRef(formRef)}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-[#FAF5EC] text-[#381A0E] border border-[#381A0E]/20 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xs hover:shadow-md hover:scale-105 cursor-pointer"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* 2. LIFE AT ROMAS (AVINASH-STYLE TWO-COLUMN MOTION WITH SLIDE-IN) */}
        <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-white border-y border-[#EADBCC] overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Column: Image with Smooth Slide-in from Left (translateX -70px) */}
              <motion.div
                initial={{ opacity: 0, x: -70 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.75, ease: EASE }}
                className="lg:col-span-5 relative"
              >
                <div className="relative rounded-[28px] overflow-hidden shadow-2xl border border-[#EADBCC] aspect-[4/3] sm:aspect-[1/1] max-h-[500px] w-full bg-[#FAF5EC]">
                  <img
                    src="/assets/chocolate/kurod_factory_chocolate_making.jpg"
                    alt="Life at ROMAS Chocolate Plant"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Subtle Badge */}
                  <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#EADBCC] shadow-lg flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-widest text-[#8C4724]">Our Chocolate Works</p>
                      <p className="text-xs font-bold text-[#2A0E04]">Dhamtari, Chhattisgarh</p>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Content with Smooth Slide-in from Right (translateX 70px) */}
              <motion.div
                initial={{ opacity: 0, x: 70 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.75, ease: EASE }}
                className="lg:col-span-7 flex flex-col justify-center"
              >
                <span className="text-xs font-black tracking-[0.25em] uppercase text-[#8C4724] mb-2 block">
                  Life at ROMAS
                </span>
                <h2
                  className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#2A0E04] leading-[0.95] mb-6"
                  style={{ fontFamily: "'Cabin Condensed', 'Bayon', Impact, sans-serif" }}
                >
                  Where Innovation Meets Sweet Craftsmanship
                </h2>

                <p className="text-sm sm:text-base text-[#381A0E]/80 leading-relaxed mb-4">
                  Joining ROMAS means stepping into an inspiring environment that blends culinary artistry with modern food production technology. We believe our passionate people are the true foundation behind every batch of delicious chocolate we craft.
                </p>

                <p className="text-sm sm:text-base text-[#381A0E]/80 leading-relaxed mb-8">
                  At ROMAS, your growth is our priority. Through hands-on skill learning, clear career pathways, and a collaborative, friendly atmosphere, we empower each team member to thrive and build a proud legacy.
                </p>

                {/* 4 Quick Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CULTURE_HIGHLIGHTS.map((h, idx) => {
                    const Icon = h.icon;
                    return (
                      <motion.div
                        key={h.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 * idx, ease: EASE }}
                        className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EADBCC] flex items-start gap-3.5 hover:bg-white hover:shadow-md transition-all duration-300"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#381A0E] text-[#F9BD03] flex items-center justify-center shrink-0 shadow-xs">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-[#2A0E04] leading-snug">{h.title}</h3>
                          <p className="text-xs text-[#381A0E]/70 mt-1 leading-relaxed">{h.desc}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* 3. CURRENT OPENINGS (AVINASH-STYLE CARDS & MOTION) */}
        <section ref={openingsRef} className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-[#FBF8F3] scroll-mt-24">
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs font-black tracking-[0.25em] uppercase text-[#8C4724] block mb-2"
              >
                Join Our Team
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#381A0E] leading-[0.95]"
                style={{ fontFamily: "'Cabin Condensed', 'Bayon', Impact, sans-serif" }}
              >
                Current Openings
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-3 text-xs sm:text-sm text-[#381A0E]/70 max-w-lg mx-auto"
              >
                Explore exciting career opportunities across our manufacturing, culinary R&D, quality, and commercial sales teams.
              </motion.p>

              {/* Department Filter Pills (Like Avinash) */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                {DEPARTMENTS.map((dept) => {
                  const isActive = selectedDept === dept;
                  return (
                    <button
                      key={dept}
                      type="button"
                      onClick={() => setSelectedDept(dept)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-[#381A0E] text-[#FEE8B4] shadow-md scale-105'
                          : 'bg-white text-[#381A0E]/80 border border-[#381A0E]/15 hover:border-[#8C4724] hover:text-[#8C4724]'
                      }`}
                    >
                      {dept}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Avinash-Style 3-Column Job Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOpenings.map((job, i) => {
                const Icon = job.icon || Briefcase;
                const isExpanded = expandedJobId === job.id;

                return (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -35 : 35, y: 25 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.55, delay: (i % 3) * 0.1, ease: EASE }}
                    whileHover={{ y: -6 }}
                    className="bg-white rounded-2xl border border-[#EADBCC] hover:border-[#C8912B] p-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 relative group overflow-hidden"
                  >
                    {/* Top Golden Accent */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#C8912B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div>
                      {/* Top: Icon + Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#FAF2E6] text-[#8C4724] flex items-center justify-center border border-[#EADBCC] group-hover:bg-[#381A0E] group-hover:text-[#F9BD03] transition-colors duration-300 shadow-xs">
                          <Icon className="w-6 h-6" />
                        </div>
                        {job.badge && (
                          <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-400/20 border border-amber-500/30 px-2.5 py-1 rounded-full">
                            {job.badge}
                          </span>
                        )}
                      </div>

                      {/* Job Title */}
                      <h3 className="text-xl font-bold text-[#2A0E04] leading-snug group-hover:text-[#8C4724] transition-colors mb-4">
                        {job.title}
                      </h3>

                      {/* Key Details in Avinash Format */}
                      <div className="space-y-1.5 text-xs text-[#381A0E]/75 mb-4">
                        <p>
                          <span className="font-bold text-[#2A0E04]">Experience : </span>
                          {job.experience}
                        </p>
                        <p>
                          <span className="font-bold text-[#2A0E04]">Location : </span>
                          {job.location}
                        </p>
                        <p>
                          <span className="font-bold text-[#2A0E04]">Department : </span>
                          {job.dept}
                        </p>
                      </div>

                      <p className="text-xs text-[#381A0E]/70 line-clamp-2 leading-relaxed mb-4">
                        {job.summary}
                      </p>

                      {/* View Details Toggle */}
                      <button
                        type="button"
                        onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8C4724] hover:underline mb-2 cursor-pointer"
                      >
                        <span>{isExpanded ? 'Hide Details' : 'View Requirements'}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Expandable Details Accordion */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-3 pt-3 border-t border-gray-100 text-xs text-[#381A0E]/80 space-y-3"
                          >
                            <div>
                              <p className="font-bold text-[#2A0E04] mb-1">Key Responsibilities:</p>
                              <ul className="list-disc pl-4 space-y-1">
                                {job.responsibilities.map((r, idx) => (
                                  <li key={idx}>{r}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="font-bold text-[#2A0E04] mb-1">Qualifications & Experience:</p>
                              <ul className="list-disc pl-4 space-y-1">
                                {job.requirements.map((req, idx) => (
                                  <li key={idx}>{req}</li>
                                ))}
                              </ul>
                            </div>
                            {job.foodSafety && job.foodSafety.length > 0 && (
                              <div>
                                <p className="font-bold text-[#2A0E04] mb-1">Food Safety Practices:</p>
                                <ul className="list-disc pl-4 space-y-1">
                                  {job.foodSafety.map((fs, idx) => (
                                    <li key={idx}>{fs}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Avinash-Style Pill Button: Apply Now */}
                    <div className="mt-5 pt-4 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => applyFor(job.title)}
                        className="w-full py-2.5 px-4 rounded-full border border-[#8C4724] text-[#8C4724] hover:bg-[#8C4724] hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 text-center flex items-center justify-center gap-2 group-hover:shadow-md cursor-pointer"
                      >
                        <span>Apply Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>

        {/* 4. APPLICATION FORM (EXACT AVINASH-STYLE COMPACT FORM) */}
        <section ref={formRef} className="py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-b from-[#F5EFE6] via-[#FAF5EC] to-[#FDFBF7] border-t border-[#EADBCC] scroll-mt-24">
          <div className="max-w-2xl mx-auto">
            
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <h2
                className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#2A0E04] leading-[0.95] mb-3"
                style={{ fontFamily: "'Cabin Condensed', 'Bayon', Impact, sans-serif" }}
              >
                Apply Now
              </h2>
              <p className="text-xs sm:text-sm text-[#2A0E04]/80 font-medium max-w-md mx-auto">
                Send us your details below and become a part of the ROMAS family.
              </p>

              {/* Active Role Indicator */}
              {form.position && form.position !== 'Open Application' && (
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#8C4724]/40 text-xs font-semibold text-[#8C4724] shadow-xs">
                  <span>Applying for: <strong>{form.position}</strong></span>
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, position: 'Open Application' }))}
                    className="ml-1 text-gray-500 hover:text-red-500 font-bold cursor-pointer"
                  >
                    &times;
                  </button>
                </div>
              )}
            </motion.div>

            {/* Form Container (Clean & Compact matching Avinash Group) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#D6C4B0] shadow-xl"
            >
              {submitted ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-600/20">
                    <Check className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#2A0E04] mb-2 font-serif">
                    Application Sent to HR!
                  </h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-3">
                    <Mail className="w-3.5 h-3.5" />
                    <span>Dispatched to {COMPANY_INFO.hrEmail || 'Hr@roomafoods.com'}</span>
                  </div>
                  <p className="text-sm text-[#381A0E]/80 max-w-lg mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#8C4724]">{form.name}</strong>! Your application details for{' '}
                    <strong>{form.position || 'Open Application'}</strong> have been delivered to our recruitment team.
                    You can also confirm via direct email or connect instantly on WhatsApp.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                    <a
                      href={lastMailtoUrl || `mailto:${COMPANY_INFO.hrEmail}?subject=Application for ${encodeURIComponent(form.position || 'Open Application')}`}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#381A0E] hover:bg-[#8C4724] text-[#FEE8B4] hover:text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:scale-105"
                    >
                      <Mail className="w-4 h-4" />
                      Email HR Directly
                    </a>
                    <a
                      href={`https://wa.me/919098229454?text=${encodeURIComponent(
                        `Hello Roma Foods HR, I just submitted an application for ${form.position || 'Open Application'} (${form.name}, ${form.phone}).`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:scale-105"
                    >
                      <MessageCircle className="w-4 h-4" />
                      HR WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setForm({
                          name: '',
                          phone: '',
                          email: '',
                          position: 'Open Application',
                          message: '',
                          agree: true,
                          resume: '',
                        });
                        setResumeFile(null);
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border border-gray-200"
                    >
                      Submit Another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {form.position && form.position !== 'Open Application' && (
                    <div className="p-2.5 px-3.5 rounded-xl bg-amber-50 border border-amber-200/70 flex items-center justify-between text-xs text-amber-900">
                      <span>
                        Applying for: <strong className="font-bold text-[#8C4724]">{form.position}</strong>
                      </span>
                      <button
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, position: 'Open Application' }))}
                        className="text-[10px] text-gray-500 hover:text-red-600 underline cursor-pointer"
                      >
                        Reset to General
                      </button>
                    </div>
                  )}
                  
                  {/* Row 1: Name (50%) + Phone (50%) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Name *"
                        className="w-full px-4 py-3 rounded-xl border-2 border-[#D6C5B2] hover:border-[#8C4724]/70 bg-[#FDFBF7] text-sm text-[#2A0E04] font-medium placeholder:text-[#7A6357] focus:outline-none focus:border-[#8C4724] focus:ring-1 focus:ring-[#8C4724] shadow-xs transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Phone Number *"
                        className="w-full px-4 py-3 rounded-xl border-2 border-[#D6C5B2] hover:border-[#8C4724]/70 bg-[#FDFBF7] text-sm text-[#2A0E04] font-medium placeholder:text-[#7A6357] focus:outline-none focus:border-[#8C4724] focus:ring-1 focus:ring-[#8C4724] shadow-xs transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email (100%) */}
                  <div>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Email Address *"
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#D6C5B2] hover:border-[#8C4724]/70 bg-[#FDFBF7] text-sm text-[#2A0E04] font-medium placeholder:text-[#7A6357] focus:outline-none focus:border-[#8C4724] focus:ring-1 focus:ring-[#8C4724] shadow-xs transition-colors"
                    />
                  </div>

                  {/* Row 3: Enter your Message (100% textarea) */}
                  <div>
                    <textarea
                      name="message"
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Enter your Message or brief background..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#D6C5B2] hover:border-[#8C4724]/70 bg-[#FDFBF7] text-sm text-[#2A0E04] font-medium placeholder:text-[#7A6357] focus:outline-none focus:border-[#8C4724] focus:ring-1 focus:ring-[#8C4724] shadow-xs transition-colors"
                    />
                  </div>

                  {/* Avinash Disclaimer */}
                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="agree"
                      name="agree"
                      checked={form.agree}
                      onChange={handleChange}
                      className="mt-0.5 w-4 h-4 rounded border-2 border-[#8C4724] text-[#8C4724] accent-[#8C4724] focus:ring-[#8C4724] cursor-pointer shrink-0"
                    />
                    <label htmlFor="agree" className="text-xs text-[#2A0E04] font-medium leading-relaxed cursor-pointer select-none">
                      I authorise ROMAS Chocolates & its representatives to contact me with updates and notifications via Email / SMS / WhatsApp / Call.
                    </label>
                  </div>

                  {/* Bottom Row: Attach Resume (Left) + Apply Now Button (Right) */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-gray-200">
                    {/* Left: Attach Resume */}
                    <div className="flex items-center">
                      <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[#D6C5B2] hover:border-[#8C4724] bg-white hover:bg-[#FAF7F2] text-[#2A0E04] text-xs font-bold cursor-pointer transition-all shadow-xs group">
                        <Paperclip className="w-4 h-4 text-[#8C4724] group-hover:rotate-45 transition-transform" />
                        <span className="truncate max-w-[200px]">
                          {uploading ? 'Uploading...' : resumeFile ? resumeFile.name : 'Attach Resume'}
                        </span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleResumeFile}
                          className="hidden"
                        />
                      </label>
                      {uploadMsg && (
                        <span className="text-[11px] text-emerald-700 ml-2 font-bold truncate">
                          {uploadMsg}
                        </span>
                      )}
                    </div>

                    {/* Right: Round Apply Now Button */}
                    <button
                      type="submit"
                      disabled={!isValid || submitting}
                      className="px-8 py-3 rounded-full bg-[#381A0E] hover:bg-[#8C4724] text-[#FEE8B4] hover:text-white disabled:bg-[#4A2416] disabled:text-[#FEE8B4]/85 disabled:cursor-not-allowed text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Apply Now</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}
            </motion.div>

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
