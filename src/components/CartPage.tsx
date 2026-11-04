import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  Truck,
  ArrowLeft,
  Tag,
  CheckCircle2,
  Trash2,
  Heart,
  ChevronRight,
  Sparkles,
  PhoneCall,
  MapPin,
  Clock,
  RotateCcw,
  ShoppingBag,
  CreditCard,
  QrCode,
  Smartphone,
  Copy,
  Check,
  Building2,
  Banknote,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  CheckCircle,
  ChevronDown,
  User,
  Shield,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ECOMMERCE_PRODUCTS } from '../data/ecommerceProducts';
import { EcommerceProduct, CustomerOrderDetails } from '../types/ecommerce';
import { LegalTabType } from './LegalPage';

interface CartPageProps {
  onNavigateHome?: (sectionId?: string) => void;
  onNavigateShop?: () => void;
  onSelectProduct?: (product: EcommerceProduct) => void;
  onOpenBrandGuide?: () => void;
  onOpenLegal?: (tab: LegalTabType) => void;
}

// Official ROMAS / Roma Foods WhatsApp business contact
const WHATSAPP_NUMBER = '917000860127';
const OFFICIAL_UPI_VPA = '9098229454@upi';
const OFFICIAL_PAYEE_NAME = 'Roma Foods Kurud Works';
const FACTORY_LOCATION = 'Kurud Works, Dhamtari, CG - 493663';

interface Coupon {
  code: string;
  discountPercent?: number;
  flatDiscount?: number;
  minOrder: number;
  description: string;
}

const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'ROMA10',
    discountPercent: 10,
    minOrder: 799,
    description: '10% instant discount on factory orders above ₹799',
  },
  {
    code: 'FACTORY50',
    flatDiscount: 50,
    minOrder: 499,
    description: 'Flat ₹50 off on direct Kurud factory dispatch',
  },
  {
    code: 'SWEETDIWALI',
    flatDiscount: 100,
    minOrder: 1199,
    description: 'Festive treat: Flat ₹100 off on hampers & bulk packs',
  },
];

// =========================================================================
// AUTHENTIC INDIAN PAYMENT BRAND BADGES & LOGOS (VECTOR SVGS)
// =========================================================================

// Google Pay Logo
const GooglePayLogo: React.FC<{ className?: string }> = ({ className = 'h-5 w-auto' }) => (
  <svg viewBox="0 0 74 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="74" height="30" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
    {/* G colored */}
    <g transform="translate(10, 6) scale(0.9)">
      <path
        d="M9.82 9.07c0-.74-.06-1.46-.19-2.14H0v4.06h5.51c-.24 1.28-.96 2.37-2.04 3.09v2.57h3.31c1.94-1.78 3.04-4.41 3.04-7.58z"
        fill="#4285F4"
      />
      <path
        d="M0 19.1c2.72 0 5-0.9 6.67-2.45l-3.31-2.57c-.92.62-2.1.98-3.36.98-2.6 0-4.8-1.76-5.58-4.12H-8.98v2.66C-7.3 17.07-3.9 19.1 0 19.1z"
        fill="#34A853"
      />
      <path
        d="M-5.58 10.94c-.2-.62-.32-1.28-.32-1.94s.12-1.32.32-1.94V4.4H-8.98C-9.64 5.72-10 7.31-10 9s.36 3.28 1.02 4.6l3.4-2.66z"
        fill="#FBBC05"
      />
      <path
        d="M0 -1.1c1.48 0 2.81.51 3.86 1.51l2.89-2.89C5 -4.08 2.72 -5 0 -5 -3.9 -5 -7.3 -2.97-8.98.4l3.4 2.66C-4.8.7-2.6-1.1 0-1.1z"
        fill="#EA4335"
      />
    </g>
    {/* Pay text */}
    <text x="36" y="20" fill="#3C4043" fontSize="13" fontWeight="700" fontFamily="system-ui">
      Pay
    </text>
  </svg>
);

// PhonePe Logo
const PhonePeLogo: React.FC<{ className?: string }> = ({ className = 'h-6 w-auto' }) => (
  <svg viewBox="0 0 86 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="86" height="30" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
    <circle cx="16" cy="15" r="9" fill="#5F259F" />
    {/* Hindi character 'पे' */}
    <text x="16" y="19" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
      पे
    </text>
    <text x="30" y="20" fill="#5F259F" fontSize="13" fontWeight="800" fontFamily="system-ui">
      PhonePe
    </text>
  </svg>
);

// Paytm Logo
const PaytmLogo: React.FC<{ className?: string }> = ({ className = 'h-5 w-auto' }) => (
  <svg viewBox="0 0 74 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="74" height="30" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
    <text x="10" y="20" fill="#002E6E" fontSize="13" fontWeight="900" fontFamily="system-ui">
      Pay
    </text>
    <text x="38" y="20" fill="#00BAF2" fontSize="13" fontWeight="900" fontFamily="system-ui">
      tm
    </text>
  </svg>
);

// BHIM UPI Official Logo
const BhimUpiLogo: React.FC<{ className?: string }> = ({ className = 'h-5 w-auto' }) => (
  <svg viewBox="0 0 76 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="76" height="30" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
    {/* BHIM tricolor slant */}
    <path d="M12 21 L16 9 L21 9 L17 21 Z" fill="#097939" />
    <path d="M19 21 L23 9 L28 9 L24 21 Z" fill="#ED752E" />
    <text x="33" y="19" fill="#0F172A" fontSize="11" fontWeight="900" fontFamily="system-ui">
      BHIM
    </text>
  </svg>
);

// CRED Pay Logo
const CredLogo: React.FC<{ className?: string }> = ({ className = 'h-5 w-auto' }) => (
  <svg viewBox="0 0 68 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="68" height="30" rx="4" fill="#1C1917" />
    <rect x="8" y="7" width="16" height="16" rx="3" fill="#292524" stroke="#FBBF24" strokeWidth="1.5" />
    <circle cx="16" cy="15" r="4" fill="#FBBF24" />
    <text x="29" y="19" fill="#FFFFFF" fontSize="10" fontWeight="900" letterSpacing="1" fontFamily="system-ui">
      CRED
    </text>
  </svg>
);

// RuPay Card Logo
const RuPayLogo: React.FC<{ className?: string }> = ({ className = 'h-4 w-auto' }) => (
  <svg viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <text x="0" y="15" fill="#097939" fontSize="13" fontWeight="900" fontFamily="system-ui">
      Ru
    </text>
    <text x="18" y="15" fill="#ED752E" fontSize="13" fontWeight="900" fontFamily="system-ui">
      Pay
    </text>
    <path d="M44 4 L54 10 L44 16 Z" fill="#ED752E" />
    <path d="M50 4 L60 10 L50 16 Z" fill="#097939" />
  </svg>
);

// Top Indian Bank Logos
const SbiLogo = () => (
  <div className="w-6 h-6 rounded-full bg-[#0082C6] flex items-center justify-center shrink-0">
    <div className="w-2.5 h-2.5 rounded-full bg-white relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-0.5 h-2.5 bg-[#0082C6]" />
    </div>
  </div>
);

const HdfcLogo = () => (
  <div className="w-6 h-6 rounded bg-[#004C8F] p-0.5 flex items-center justify-center shrink-0">
    <div className="w-3.5 h-3.5 bg-red-600 rounded-xs flex items-center justify-center">
      <div className="w-2 h-2 bg-white" />
    </div>
  </div>
);

const IciciLogo = () => (
  <div className="w-6 h-6 rounded bg-[#F58220] text-white text-[11px] font-black flex items-center justify-center shrink-0 italic">
    i
  </div>
);

const AxisLogo = () => (
  <div className="w-6 h-6 rounded bg-[#97144D] flex items-center justify-center shrink-0">
    <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[10px] border-b-white" />
  </div>
);

const KotakLogo = () => (
  <div className="w-6 h-6 rounded-full bg-[#ED1C24] text-white text-[9px] font-black flex items-center justify-center shrink-0">
    K
  </div>
);

const PnbLogo = () => (
  <div className="w-6 h-6 rounded bg-[#A20A27] text-yellow-300 text-[8px] font-black flex items-center justify-center shrink-0">
    PNB
  </div>
);

// Official Flipkart-style Empty Cart Illustration
const FlipkartEmptyCartIllustration: React.FC<{ className?: string }> = ({ className = 'w-48 h-36' }) => (
  <svg
    viewBox="0 0 220 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <ellipse cx="110" cy="142" rx="75" ry="4" fill="#EAEAEA" />
    <line x1="40" y1="140" x2="180" y2="140" stroke="#F0F0F0" strokeWidth="2" strokeLinecap="round" />
    <rect x="100" y="62" width="24" height="26" rx="4" fill="#2874F0" />
    <rect x="104" y="58" width="16" height="6" rx="2" fill="#1C5EC7" />
    <circle cx="112" cy="73" r="3" fill="#60A5FA" />
    <rect x="68" y="65" width="16" height="6" rx="3" fill="#B0B7C3" />
    <path d="M74 68 L86 68 L96 98" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M92 78 L152 78 C155 78 157 80 156 83 L147 118 C146 121 143 123 140 123 L102 123 C99 123 96 121 95 118 L88 83 C87 80 89 78 92 78 Z"
      fill="#ECEFF3"
      stroke="#D5D9E2"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <rect x="110" y="93" width="3.5" height="9" rx="1.75" fill="#9CA3AF" />
    <rect x="127" y="93" width="3.5" height="9" rx="1.75" fill="#9CA3AF" />
    <rect x="115" y="108" width="11" height="3" rx="1.5" fill="#9CA3AF" />
    <circle cx="102" cy="133" r="8" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2.5" />
    <circle cx="102" cy="133" r="3" fill="#64748B" />
    <circle cx="138" cy="133" r="8" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2.5" />
    <circle cx="138" cy="133" r="3" fill="#64748B" />
  </svg>
);

// High-precision Authentic UPI QR Code Vector
const UpiDynamicQrSvg: React.FC<{ size?: number }> = ({ size = 190 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="rounded-lg shadow-xs"
  >
    <rect width="200" height="200" rx="8" fill="#FFFFFF" />

    {/* Corner Finder 1: Top-Left */}
    <rect x="16" y="16" width="44" height="44" rx="4" fill="#1C1917" />
    <rect x="22" y="22" width="32" height="32" rx="2" fill="#FFFFFF" />
    <rect x="28" y="28" width="20" height="20" rx="2" fill="#1C1917" />

    {/* Corner Finder 2: Top-Right */}
    <rect x="140" y="16" width="44" height="44" rx="4" fill="#1C1917" />
    <rect x="146" y="22" width="32" height="32" rx="2" fill="#FFFFFF" />
    <rect x="152" y="28" width="20" height="20" rx="2" fill="#1C1917" />

    {/* Corner Finder 3: Bottom-Left */}
    <rect x="16" y="140" width="44" height="44" rx="4" fill="#1C1917" />
    <rect x="22" y="146" width="32" height="32" rx="2" fill="#FFFFFF" />
    <rect x="28" y="152" width="20" height="20" rx="2" fill="#1C1917" />

    {/* Timing Patterns */}
    <rect x="68" y="20" width="6" height="6" fill="#1C1917" />
    <rect x="80" y="20" width="6" height="6" fill="#1C1917" />
    <rect x="92" y="20" width="6" height="6" fill="#1C1917" />
    <rect x="104" y="20" width="6" height="6" fill="#1C1917" />
    <rect x="116" y="20" width="6" height="6" fill="#1C1917" />
    <rect x="128" y="20" width="6" height="6" fill="#1C1917" />

    <rect x="20" y="68" width="6" height="6" fill="#1C1917" />
    <rect x="20" y="80" width="6" height="6" fill="#1C1917" />
    <rect x="20" y="92" width="6" height="6" fill="#1C1917" />
    <rect x="20" y="104" width="6" height="6" fill="#1C1917" />
    <rect x="20" y="116" width="6" height="6" fill="#1C1917" />
    <rect x="20" y="128" width="6" height="6" fill="#1C1917" />

    {/* Data Matrix Bits */}
    <rect x="68" y="32" width="8" height="8" fill="#1C1917" />
    <rect x="82" y="32" width="8" height="8" fill="#1C1917" />
    <rect x="110" y="32" width="8" height="8" fill="#1C1917" />
    <rect x="124" y="32" width="8" height="8" fill="#1C1917" />

    <rect x="68" y="46" width="14" height="6" fill="#1C1917" />
    <rect x="94" y="46" width="8" height="12" fill="#1C1917" />
    <rect x="114" y="46" width="16" height="6" fill="#1C1917" />

    <rect x="36" y="68" width="14" height="8" fill="#1C1917" />
    <rect x="56" y="68" width="8" height="14" fill="#1C1917" />
    <rect x="140" y="68" width="12" height="8" fill="#1C1917" />
    <rect x="160" y="68" width="16" height="8" fill="#1C1917" />

    <rect x="36" y="84" width="8" height="14" fill="#1C1917" />
    <rect x="52" y="86" width="14" height="8" fill="#1C1917" />
    <rect x="144" y="82" width="16" height="10" fill="#1C1917" />
    <rect x="168" y="82" width="12" height="12" fill="#1C1917" />

    <rect x="68" y="64" width="12" height="12" fill="#1C1917" />
    <rect x="120" y="64" width="12" height="12" fill="#1C1917" />

    <rect x="68" y="124" width="12" height="12" fill="#1C1917" />
    <rect x="120" y="124" width="12" height="12" fill="#1C1917" />

    <rect x="68" y="144" width="18" height="8" fill="#1C1917" />
    <rect x="94" y="140" width="8" height="14" fill="#1C1917" />
    <rect x="110" y="144" width="18" height="8" fill="#1C1917" />
    <rect x="136" y="140" width="10" height="14" fill="#1C1917" />
    <rect x="156" y="144" width="24" height="8" fill="#1C1917" />

    <rect x="68" y="160" width="10" height="14" fill="#1C1917" />
    <rect x="86" y="160" width="16" height="8" fill="#1C1917" />
    <rect x="110" y="162" width="12" height="12" fill="#1C1917" />
    <rect x="130" y="160" width="18" height="10" fill="#1C1917" />
    <rect x="156" y="160" width="12" height="14" fill="#1C1917" />
    <rect x="174" y="162" width="10" height="10" fill="#1C1917" />

    {/* Center Official UPI Shield Badge */}
    <rect x="76" y="76" width="48" height="48" rx="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
    <rect x="80" y="80" width="40" height="40" rx="6" fill="#F8FAFC" />
    <path d="M88 92 L98 106 L94 108 L86 94 Z" fill="#097939" />
    <path d="M96 92 L106 106 L102 108 L94 94 Z" fill="#ED752E" />
    <text x="100" y="116" textAnchor="middle" fontSize="9" fontWeight="900" fill="#0F172A" fontFamily="system-ui">
      UPI
    </text>
  </svg>
);

export const CartPage: React.FC<CartPageProps> = ({
  onNavigateHome,
  onNavigateShop,
  onSelectProduct,
}) => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    cartTotal,
    freeShippingThreshold,
    amountUntilFreeShipping,
    shippingCost,
    wishlist,
    moveToCart,
    toggleWishlist,
    isWishlisted,
  } = useCart();

  // View state: 'cart' = Items review, 'checkout' = Full-screen Place to Order, 'success' = Confirmed Order
  const [view, setView] = useState<'cart' | 'checkout' | 'success'>('cart');

  // Pincode & Delivery state
  const [pincode, setPincode] = useState('493663');
  const [isEditingPincode, setIsEditingPincode] = useState(false);
  const [tempPincode, setTempPincode] = useState('493663');
  const [pincodeMessage, setPincodeMessage] = useState<string | null>(
    'Delivery in 2 - 3 Days | Free Insulated Cold-Pack Packing'
  );

  // Coupon state
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Checkout address state
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressType, setAddressType] = useState<'Home' | 'Work'>('Home');
  const [orderDetails, setOrderDetails] = useState<CustomerOrderDetails>({
    name: 'Rahul Sharma',
    phone: '9098229454',
    address: 'House #14, Main Market Road, Near Gandhi Chowk',
    city: 'Kurud',
    pincode: '493663',
    state: 'Chhattisgarh',
    paymentMethod: 'upi',
  });

  // Payment Options tab inside Place Order checkout
  type PaymentTab = 'upi_qr' | 'upi_id' | 'whatsapp' | 'cod' | 'card' | 'netbanking';
  const [activePaymentTab, setActivePaymentTab] = useState<PaymentTab>('upi_qr');
  const [userVpa, setUserVpa] = useState('');
  const [vpaVerified, setVpaVerified] = useState(false);
  const [vpaError, setVpaError] = useState<string | null>(null);
  const [copiedVpa, setCopiedVpa] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(580); // 9:40 timer
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Selected Bank for Net Banking
  const [selectedBank, setSelectedBank] = useState<string>('SBI');

  // COD Captcha
  const [codCaptchaInput, setCodCaptchaInput] = useState('');
  const [codCaptchaCode, setCodCaptchaCode] = useState('4829');
  const [codCaptchaError, setCodCaptchaError] = useState<string | null>(null);

  // Card Dummy state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('Rahul Sharma');

  // Generated Order ID for success
  const [confirmedOrderId, setConfirmedOrderId] = useState('ROMA-2026-8942');

  // QR Timer Countdown
  useEffect(() => {
    if (view !== 'checkout' || activePaymentTab !== 'upi_qr') return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 600));
    }, 1000);
    return () => clearInterval(interval);
  }, [view, activePaymentTab]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Generate random 4-digit captcha for COD
  const refreshCodCaptcha = () => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setCodCaptchaCode(code);
    setCodCaptchaInput('');
    setCodCaptchaError(null);
  };

  // Calculate pricing breakdown
  const totalMrp = cart.reduce(
    (sum, item) => sum + (item.product.mrp || Math.round(item.product.price * 1.2)) * item.quantity,
    0
  );
  const productDiscount = totalMrp - cartTotal;

  // Coupon discount calculation
  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      couponDiscount = Math.round((cartTotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.flatDiscount) {
      couponDiscount = appliedCoupon.flatDiscount;
    }
  }

  const finalShipping = cartTotal >= freeShippingThreshold ? 0 : shippingCost;
  const grandTotal = Math.max(0, cartTotal - couponDiscount + finalShipping);
  const totalSavings = productDiscount + couponDiscount + (cartTotal >= freeShippingThreshold ? 60 : 0);
  const progressPercent = Math.min(100, Math.round((cartTotal / freeShippingThreshold) * 100));

  // Pincode verification
  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempPincode || tempPincode.length !== 6 || isNaN(Number(tempPincode))) {
      setPincodeMessage('Please enter a valid 6-digit Indian Pincode');
      return;
    }
    setPincode(tempPincode);
    setIsEditingPincode(false);
    setPincodeMessage('Delivery available! Direct cold chain dispatch from Kurud Works, Dhamtari');
  };

  // Apply coupon
  const handleApplyCoupon = (coupon: Coupon) => {
    if (cartTotal < coupon.minOrder) {
      setCouponError(`Add items worth ₹${coupon.minOrder - cartTotal} more to apply code ${coupon.code}`);
      return;
    }
    setAppliedCoupon(coupon);
    setCouponError(null);
    setCouponInput('');
  };

  const handleCustomCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponInput.trim().toUpperCase();
    const found = AVAILABLE_COUPONS.find((c) => c.code === clean);
    if (!found) {
      setCouponError('Invalid coupon code. Try ROMA10 or FACTORY50.');
      return;
    }
    handleApplyCoupon(found);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  // Copy VPA
  const handleCopyVpa = () => {
    navigator.clipboard.writeText(OFFICIAL_UPI_VPA);
    setCopiedVpa(true);
    setTimeout(() => setCopiedVpa(false), 2000);
  };

  // Suffix handler for UPI ID
  const handleAppendUpiSuffix = (suffix: string) => {
    const parts = userVpa.split('@');
    const base = parts[0] || '9098229454';
    setUserVpa(`${base}${suffix}`);
  };

  // WhatsApp Checkout Link
  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    let message = `*🛒 OFFICIAL E-COMMERCE ORDER - ROMAS CHOCOLATES*\n`;
    message += `─────────────────────────\n`;
    cart.forEach((item, idx) => {
      message += `${idx + 1}. *${item.product.name}*\n`;
      message += `   Qty: ${item.quantity} × ₹${item.product.price} = ₹${
        item.quantity * item.product.price
      } (${item.product.weight})\n`;
    });
    message += `─────────────────────────\n`;
    message += `*Total MRP:* ₹${totalMrp}\n`;
    message += `*Discount:* -₹${productDiscount}\n`;
    if (appliedCoupon) {
      message += `*Coupon (${appliedCoupon.code}):* -₹${couponDiscount}\n`;
    }
    message += `*Thermal Packing:* FREE (Insulated)\n`;
    message += `*Shipping:* ${finalShipping === 0 ? 'FREE' : `₹${finalShipping}`}\n`;
    message += `*TOTAL TO PAY:* ₹${grandTotal}\n`;
    message += `*Total Saved:* ₹${totalSavings}\n\n`;

    message += `*Delivery Details:*\n`;
    message += `Name: ${orderDetails.name}\n`;
    message += `Phone: ${orderDetails.phone}\n`;
    message += `Address: ${orderDetails.address}, ${orderDetails.city} - ${orderDetails.pincode} (${orderDetails.state})\n`;
    message += `Type: ${addressType}\n`;
    message += `Payment Choice: ${activePaymentTab.toUpperCase()}\n\n`;
    message += `Please confirm my order and share official UPI QR code & dispatch tracking from Kurud Works, Dhamtari.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
  };

  // Save for later (Move to Wishlist)
  const handleSaveForLater = (product: EcommerceProduct) => {
    if (!isWishlisted(product.id)) {
      toggleWishlist(product);
    }
    removeFromCart(product.id);
  };

  // Confirm order execution
  const executeConfirmOrder = (method: string) => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      const randomId = `ROMA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setConfirmedOrderId(randomId);
      setOrderDetails((prev) => ({ ...prev, paymentMethod: method as any }));
      setIsProcessingPayment(false);
      setView('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);
  };

  // COD Order Submission
  const handleConfirmCod = (e: React.FormEvent) => {
    e.preventDefault();
    if (codCaptchaInput.trim() !== codCaptchaCode) {
      setCodCaptchaError(`Invalid characters. Please type ${codCaptchaCode} correctly.`);
      return;
    }
    executeConfirmOrder('cod');
  };

  // UPI VPA Verification & Pay
  const handleVerifyVpaAndPay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userVpa.includes('@')) {
      setVpaError('Please enter a valid UPI ID (e.g. mobile@upi or name@okaxis)');
      return;
    }
    setVpaError(null);
    setVpaVerified(true);
    executeConfirmOrder('upi');
  };

  // Card Submit
  const handleCardPay = (e: React.FormEvent) => {
    e.preventDefault();
    if (cardNumber.replace(/\s+/g, '').length < 12 || cardCvv.length < 3) {
      alert('Please enter valid card details');
      return;
    }
    executeConfirmOrder('card');
  };

  // Net Banking Submit
  const handleNetBankingPay = (e: React.FormEvent) => {
    e.preventDefault();
    executeConfirmOrder('netbanking');
  };

  // UPI Deep link for Mobile Apps
  const upiDeepLink = `upi://pay?pa=${OFFICIAL_UPI_VPA}&pn=${encodeURIComponent(
    OFFICIAL_PAYEE_NAME
  )}&am=${grandTotal}&cu=INR&tn=${encodeURIComponent('Romas Chocolates Order')}`;

  return (
    <div className="min-h-screen bg-[#F1F3F6] text-[#212121] font-sans antialiased pb-20 selection:bg-[#F9BD03] selection:text-[#1C0E07]">
      {/* =========================================================================
          FLIPKART-STYLE TOP HEADER BAR & MOBILE STEP RIBBON
          ========================================================================= */}
      <header className="sticky top-0 z-40 bg-white border-b border-neutral-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-15 sm:h-18 flex items-center justify-between">
          {/* Logo & Navigation */}
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <button
              onClick={() => {
                if (view === 'checkout') setView('cart');
                else if (onNavigateShop) onNavigateShop();
                else onNavigateHome?.('shop');
              }}
              className="p-1.5 sm:p-2 -ml-1 sm:-ml-2 rounded-full hover:bg-neutral-100 text-neutral-600 transition-colors cursor-pointer shrink-0"
              title="Go Back"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => onNavigateHome?.()}
              className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity shrink-0"
            >
              <img
                src="/assets/romas-logo-gold.png"
                alt="ROMAS Chocolates"
                className="h-7 sm:h-9 w-auto object-contain filter drop-shadow-xs"
              />
            </button>

            {/* Stepper Breadcrumb inside Header (Desktop) */}
            <div className="hidden md:flex items-center gap-3 text-xs pl-5 border-l border-neutral-200 font-semibold shrink-0">
              <span
                onClick={() => setView('cart')}
                className={`flex items-center gap-1.5 cursor-pointer ${
                  view === 'cart' ? 'text-[#2874F0]' : 'text-neutral-500 hover:text-black'
                }`}
              >
                <span className="w-4.5 h-4.5 rounded-full bg-neutral-100 text-[10px] flex items-center justify-center font-bold">
                  1
                </span>
                <span>Cart</span>
              </span>

              <span className="text-neutral-300">─────</span>

              <span
                onClick={() => cart.length > 0 && setView('checkout')}
                className={`flex items-center gap-1.5 cursor-pointer ${
                  view === 'checkout' ? 'text-[#2874F0]' : 'text-neutral-500 hover:text-black'
                }`}
              >
                <span className="w-4.5 h-4.5 rounded-full bg-neutral-100 text-[10px] flex items-center justify-center font-bold">
                  2
                </span>
                <span>Place Order & Payment</span>
              </span>

              <span className="text-neutral-300">─────</span>

              <span
                className={`flex items-center gap-1.5 ${
                  view === 'success' ? 'text-emerald-700 font-bold' : 'text-neutral-400'
                }`}
              >
                <span className="w-4.5 h-4.5 rounded-full bg-neutral-100 text-[10px] flex items-center justify-center font-bold">
                  3
                </span>
                <span>Order Confirmation</span>
              </span>
            </div>
          </div>

          {/* Secure Trust Badge & WhatsApp helpline */}
          <div className="flex items-center gap-2 sm:gap-4 text-xs shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 text-neutral-600 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Safe Checkout</span>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20ROMAS%20Concierge,%20I%20need%20help%20with%20checkout.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-emerald-200 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Help: +91 70008 60127</span>
              <span className="sm:hidden font-bold">Help</span>
            </a>
          </div>
        </div>

        {/* Mobile-Only Interactive Stepper Ribbon */}
        <div className="md:hidden bg-neutral-50 border-t border-neutral-200 px-4 py-2 flex items-center justify-between text-[11px] font-bold">
          <button
            onClick={() => setView('cart')}
            className={`flex items-center gap-1.5 cursor-pointer ${
              view === 'cart' ? 'text-[#2874F0]' : 'text-neutral-600'
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                view === 'cart' ? 'bg-[#2874F0] text-white' : 'bg-neutral-200 text-neutral-700'
              }`}
            >
              1
            </span>
            <span>Cart</span>
          </button>

          <span className="text-neutral-300">───</span>

          <button
            onClick={() => cart.length > 0 && setView('checkout')}
            className={`flex items-center gap-1.5 cursor-pointer ${
              view === 'checkout' ? 'text-[#2874F0]' : 'text-neutral-600'
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                view === 'checkout' ? 'bg-[#2874F0] text-white' : 'bg-neutral-200 text-neutral-700'
              }`}
            >
              2
            </span>
            <span>Place Order</span>
          </button>

          <span className="text-neutral-300">───</span>

          <span
            className={`flex items-center gap-1.5 ${
              view === 'success' ? 'text-emerald-700 font-bold' : 'text-neutral-400'
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                view === 'success' ? 'bg-emerald-600 text-white' : 'bg-neutral-200 text-neutral-500'
              }`}
            >
              3
            </span>
            <span>Confirmed</span>
          </span>
        </div>
      </header>

      {/* =========================================================================
          VIEW 1: ORDER CONFIRMED / SUCCESS SCREEN
          ========================================================================= */}
      {view === 'success' && (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 sm:p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center text-4xl mb-4 border-2 border-emerald-300 shadow-sm animate-bounce">
              ✓
            </div>

            <h1
              className="text-2xl sm:text-3xl font-black uppercase text-[#2A1308] tracking-tight mb-2"
              style={{ fontFamily: "'Cabin Condensed', sans-serif" }}
            >
              Order Placed Successfully!
            </h1>

            <p className="text-sm text-neutral-600 max-w-md mx-auto mb-6">
              Thank you, <strong>{orderDetails.name}</strong>! Your order has been registered directly with ROMAS Kurud Works (Dhamtari).
            </p>

            {/* Order Details Badge Card */}
            <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-5 max-w-lg mx-auto text-left space-y-2.5 text-xs text-neutral-700 mb-8">
              <div className="flex justify-between items-center pb-2 border-b border-neutral-200 font-bold text-neutral-900">
                <span>Order ID: #{confirmedOrderId}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[11px]">
                  CONFIRMED
                </span>
              </div>
              <p>
                <strong>Delivery Address:</strong> {orderDetails.address}, {orderDetails.city} - {orderDetails.pincode} ({orderDetails.state}) [{addressType}]
              </p>
              <p>
                <strong>Contact Number:</strong> +91 {orderDetails.phone}
              </p>
              <p>
                <strong>Payment Method:</strong>{' '}
                <span className="uppercase font-bold text-[#2874F0]">
                  {orderDetails.paymentMethod}
                </span>
              </p>
              <p>
                <strong>Total Amount:</strong>{' '}
                <span className="font-mono font-bold text-base text-[#2A1308]">₹{grandTotal}</span> (Inclusive of taxes & thermal cold packaging)
              </p>
              <p>
                <strong>Estimated Delivery:</strong> 2 - 3 Days via Insulated Cold Chain Dispatch
              </p>
            </div>

            {/* Primary Action: Get Live Updates on WhatsApp */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Get Order Receipt & Live Tracking on WhatsApp</span>
              </button>
              <button
                onClick={() => {
                  clearCart();
                  if (onNavigateShop) onNavigateShop();
                  else onNavigateHome?.('shop');
                }}
                className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </main>
      )}

      {/* =========================================================================
          VIEW 2: DEDICATED FULL-SCREEN PLACE TO ORDER (CHECKOUT & PAYMENT GATEWAY)
          ========================================================================= */}
      {view === 'checkout' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
            {/* LEFT COLUMN: 8 Columns - Stepper Checkout */}
            <div className="lg:col-span-8 space-y-4">
              {/* STEP 1: LOGIN / USER PROFILE */}
              <div className="bg-white rounded-xl border border-neutral-200 shadow-2xs overflow-hidden">
                <div className="px-5 py-3.5 flex items-center justify-between border-b border-neutral-100 bg-neutral-50/80">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center">
                      ✓
                    </span>
                    <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-600">
                      1. LOGIN
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-neutral-900">{orderDetails.name}</span>
                    <span className="text-neutral-500 font-mono">+91 {orderDetails.phone}</span>
                  </div>
                </div>
              </div>

              {/* STEP 2: DELIVERY ADDRESS CARD */}
              <div className="bg-white rounded-xl border border-neutral-200 shadow-2xs overflow-hidden">
                <div className="bg-[#2874F0] text-white px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-white text-[#2874F0] text-xs font-bold flex items-center justify-center">
                      2
                    </span>
                    <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                      DELIVERY ADDRESS
                    </h2>
                  </div>
                  {!isEditingAddress && (
                    <button
                      onClick={() => setIsEditingAddress(true)}
                      className="text-xs font-bold uppercase px-3 py-1 rounded bg-white text-[#2874F0] hover:bg-neutral-100 transition-colors cursor-pointer"
                    >
                      Change Address
                    </button>
                  )}
                </div>

                <div className="p-5">
                  {isEditingAddress ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setIsEditingAddress(false);
                      }}
                      className="space-y-4 text-xs"
                    >
                      {/* Name & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold text-neutral-700 block mb-1">Full Name *</label>
                          <input
                            type="text"
                            required
                            value={orderDetails.name}
                            onChange={(e) => setOrderDetails({ ...orderDetails, name: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:border-[#2874F0]"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-neutral-700 block mb-1">10-Digit Mobile *</label>
                          <input
                            type="tel"
                            required
                            value={orderDetails.phone}
                            onChange={(e) => setOrderDetails({ ...orderDetails, phone: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:border-[#2874F0]"
                          />
                        </div>
                      </div>

                      {/* Pincode & City */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold text-neutral-700 block mb-1">Pincode *</label>
                          <input
                            type="text"
                            required
                            maxLength={6}
                            value={orderDetails.pincode}
                            onChange={(e) => setOrderDetails({ ...orderDetails, pincode: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 font-mono focus:outline-none focus:border-[#2874F0]"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-neutral-700 block mb-1">City / District *</label>
                          <input
                            type="text"
                            required
                            value={orderDetails.city}
                            onChange={(e) => setOrderDetails({ ...orderDetails, city: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:border-[#2874F0]"
                          />
                        </div>
                      </div>

                      {/* Complete Street Address */}
                      <div>
                        <label className="font-bold text-neutral-700 block mb-1">
                          Complete Address (House No, Building, Street, Area) *
                        </label>
                        <textarea
                          required
                          rows={2}
                          value={orderDetails.address}
                          onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-[#2874F0]"
                        />
                      </div>

                      {/* Address Type Selection */}
                      <div>
                        <label className="font-bold text-neutral-700 block mb-1.5">Address Type</label>
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="addressType"
                              checked={addressType === 'Home'}
                              onChange={() => setAddressType('Home')}
                              className="text-[#2874F0] focus:ring-[#2874F0]"
                            />
                            <span className="font-semibold text-neutral-800">Home (All-day delivery)</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="addressType"
                              checked={addressType === 'Work'}
                              onChange={() => setAddressType('Work')}
                              className="text-[#2874F0] focus:ring-[#2874F0]"
                            />
                            <span className="font-semibold text-neutral-800">Work (10 AM - 6 PM delivery)</span>
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-lg bg-[#FB641B] hover:bg-[#e85611] text-white font-bold uppercase tracking-wider text-xs shadow-sm cursor-pointer"
                        >
                          Save & Deliver Here
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditingAddress(false)}
                          className="text-neutral-500 hover:text-black font-semibold cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex items-start justify-between gap-3 text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-neutral-900 text-sm">{orderDetails.name}</span>
                          <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 font-bold text-[10px] uppercase">
                            {addressType}
                          </span>
                          <span className="text-neutral-600 font-mono font-semibold">+91 {orderDetails.phone}</span>
                        </div>
                        <p className="text-neutral-700">
                          {orderDetails.address}, {orderDetails.city} - {orderDetails.pincode} ({orderDetails.state})
                        </p>
                      </div>
                      <span className="text-emerald-700 font-bold text-xs shrink-0 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Ready for Dispatch
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* STEP 3: ORDER SUMMARY (COLLAPSED REVIEW) */}
              <div className="bg-white rounded-xl border border-neutral-200 shadow-2xs overflow-hidden">
                <div className="bg-neutral-50 px-5 py-3 border-b border-neutral-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-neutral-800">
                    <span className="w-5 h-5 rounded-full bg-neutral-200 text-neutral-700 text-xs font-bold flex items-center justify-center">
                      3
                    </span>
                    <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                      ORDER SUMMARY ({cartCount} {cartCount === 1 ? 'ITEM' : 'ITEMS'})
                    </h2>
                  </div>
                  <button
                    onClick={() => setView('cart')}
                    className="text-xs font-bold text-[#2874F0] hover:underline cursor-pointer"
                  >
                    Edit Cart
                  </button>
                </div>

                {/* Items mini row */}
                <div className="p-4 sm:p-5 divide-y divide-neutral-100">
                  {cart.map((item) => (
                    <div key={item.product.id} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-13 rounded-lg bg-gradient-to-b from-[#FAF6F0] to-[#ECE2D2] border border-[#E5D7C5]/90 p-1 flex items-center justify-center shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="max-h-full max-w-full object-contain filter drop-shadow-xs"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-neutral-800 truncate">{item.product.name}</p>
                          <p className="text-[11px] text-neutral-500">
                            Qty: {item.quantity} &bull; {item.product.weight}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold font-mono text-neutral-900 text-sm">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* STEP 4: PAYMENT OPTIONS (THE MAIN ATTRACTION) */}
              <div className="bg-white rounded-xl border border-neutral-200 shadow-2xs overflow-hidden">
                <div className="bg-[#2874F0] text-white px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-white text-[#2874F0] text-xs font-bold flex items-center justify-center">
                      4
                    </span>
                    <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                      PAYMENT OPTIONS &bull; ₹{grandTotal} PAYABLE
                    </h2>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-blue-100">
                    <Lock className="w-3.5 h-3.5" />
                    <span>256-Bit SSL Encrypted</span>
                  </div>
                </div>

                {/* Payment Methods Accordion Tabs */}
                <div className="divide-y divide-neutral-200">
                  {/* --- TAB 1: UPI SCAN QR CODE & APPS --- */}
                  <div className="p-5">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment_choice"
                        checked={activePaymentTab === 'upi_qr' || activePaymentTab === 'upi_id'}
                        onChange={() => setActivePaymentTab('upi_qr')}
                        className="mt-1 w-4 h-4 text-[#2874F0] focus:ring-[#2874F0]"
                      />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                            <span>UPI (Google Pay, PhonePe, Paytm, BHIM, CRED)</span>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                              FASTEST
                            </span>
                          </span>

                          {/* Authentic App Brand Badges */}
                          <div className="flex items-center gap-1.5">
                            <GooglePayLogo className="h-4.5 w-auto" />
                            <PhonePeLogo className="h-4.5 w-auto" />
                            <PaytmLogo className="h-4.5 w-auto" />
                            <BhimUpiLogo className="h-4.5 w-auto" />
                          </div>
                        </div>
                        <p className="text-xs text-neutral-500 mt-1">
                          Instant verification & zero transaction fee directly to Kurud factory account.
                        </p>
                      </div>
                    </label>

                    {(activePaymentTab === 'upi_qr' || activePaymentTab === 'upi_id') && (
                      <div className="mt-4 pt-4 border-t border-neutral-100 ml-0 sm:ml-7 space-y-4">
                        {/* Sub-Switch: Scan QR Code vs Enter UPI ID (Mobile 2-Column Grid) */}
                        <div className="grid grid-cols-2 gap-2 border-b border-neutral-200 pb-2.5 text-xs font-bold">
                          <button
                            type="button"
                            onClick={() => setActivePaymentTab('upi_qr')}
                            className={`w-full py-2 px-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 text-center ${
                              activePaymentTab === 'upi_qr'
                                ? 'bg-[#2874F0] text-white shadow-xs'
                                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                            }`}
                          >
                            <QrCode className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">Scan QR / UPI Apps</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setActivePaymentTab('upi_id')}
                            className={`w-full py-2 px-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 text-center ${
                              activePaymentTab === 'upi_id'
                                ? 'bg-[#2874F0] text-white shadow-xs'
                                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                            }`}
                          >
                            <Smartphone className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">Enter UPI ID</span>
                          </button>
                        </div>

                        {/* SUB-VIEW A: DYNAMIC UPI QR CODE & DIRECT 1-TAP MOBILE INTENTS */}
                        {activePaymentTab === 'upi_qr' && (
                          <div className="bg-neutral-50 rounded-xl p-4 sm:p-5 border border-neutral-200 space-y-4">
                            {/* Mobile 1-Tap UPI Apps Section (Visible on Phone Screens) */}
                            <div className="sm:hidden bg-white p-3.5 rounded-xl border border-neutral-200 space-y-2.5">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 block">
                                ⚡ Tap to Pay via UPI App:
                              </span>
                              <div className="grid grid-cols-2 gap-2">
                                <a
                                  href={`phonepe://pay?pa=${OFFICIAL_UPI_VPA}&pn=${encodeURIComponent(
                                    OFFICIAL_PAYEE_NAME
                                  )}&am=${grandTotal}&cu=INR`}
                                  className="py-2.5 px-3 rounded-lg bg-[#5F259F] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
                                >
                                  <span>PhonePe</span>
                                </a>
                                <a
                                  href={`gpay://upi/pay?pa=${OFFICIAL_UPI_VPA}&pn=${encodeURIComponent(
                                    OFFICIAL_PAYEE_NAME
                                  )}&am=${grandTotal}&cu=INR`}
                                  className="py-2.5 px-3 rounded-lg bg-white border border-neutral-300 text-neutral-800 font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
                                >
                                  <span className="text-[#4285F4]">G</span>
                                  <span className="text-[#EA4335]">P</span>
                                  <span className="text-[#FBBC05]">a</span>
                                  <span className="text-[#34A853]">y</span>
                                </a>
                                <a
                                  href={`paytmmp://pay?pa=${OFFICIAL_UPI_VPA}&pn=${encodeURIComponent(
                                    OFFICIAL_PAYEE_NAME
                                  )}&am=${grandTotal}&cu=INR`}
                                  className="py-2.5 px-3 rounded-lg bg-[#00BAF2] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
                                >
                                  <span>Paytm</span>
                                </a>
                                <a
                                  href={upiDeepLink}
                                  className="py-2.5 px-3 rounded-lg bg-[#2874F0] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
                                >
                                  <span>Any UPI App</span>
                                </a>
                              </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-6">
                              {/* QR SVG with frame & scanner animation */}
                              <div className="p-3 bg-white rounded-xl border border-neutral-300 shadow-sm shrink-0 text-center relative overflow-hidden mx-auto md:mx-0">
                                <UpiDynamicQrSvg size={175} />

                                {/* Subtle scanning bar animation */}
                                <div className="absolute inset-x-3 top-3 h-0.5 bg-linear-to-r from-transparent via-[#2874F0] to-transparent animate-pulse opacity-75" />

                                <div className="mt-2 text-[10px] text-neutral-500 font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                                  <Clock className="w-3 h-3 text-amber-600" />
                                  <span>Expires in: {formatTimer(timerSeconds)}</span>
                                </div>
                              </div>

                              {/* Payment Instructions & Copy VPA */}
                              <div className="space-y-3 flex-1 text-xs text-neutral-700 w-full">
                                <div className="flex items-center gap-2">
                                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                                    <ShieldCheck className="w-3 h-3" /> NPCI Verified Merchant
                                  </span>
                                  <span className="text-[10px] text-neutral-400 font-mono">FSSAI 10526005000033</span>
                                </div>

                                <div>
                                  <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
                                    PAYEE NAME
                                  </span>
                                  <span className="font-bold text-neutral-900 text-sm block">
                                    {OFFICIAL_PAYEE_NAME}
                                  </span>
                                  <span className="text-[11px] text-neutral-500 block">
                                    Direct Factory Account &bull; Dhamtari, Chhattisgarh
                                  </span>
                                </div>

                                <div>
                                  <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
                                    OFFICIAL UPI ID (VPA)
                                  </span>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <span className="font-mono font-bold text-neutral-900 bg-white px-2.5 py-1 rounded border border-neutral-300 text-xs">
                                      {OFFICIAL_UPI_VPA}
                                    </span>
                                    <button
                                      onClick={handleCopyVpa}
                                      className="px-2.5 py-1 rounded bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                                    >
                                      {copiedVpa ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                                      <span>{copiedVpa ? 'Copied!' : 'Copy'}</span>
                                    </button>
                                  </div>
                                </div>

                                <div>
                                  <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
                                    EXACT PAYABLE AMOUNT
                                  </span>
                                  <span className="text-2xl font-black font-mono text-[#2A1308]">
                                    ₹{grandTotal}
                                  </span>
                                </div>

                                {/* Supported UPI Apps Row */}
                                <div className="pt-1">
                                  <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                                    SCAN WITH ANY UPI APP:
                                  </span>
                                  <div className="flex flex-wrap items-center gap-1.5">
                                    <GooglePayLogo className="h-4.5 w-auto" />
                                    <PhonePeLogo className="h-4.5 w-auto" />
                                    <PaytmLogo className="h-4.5 w-auto" />
                                    <BhimUpiLogo className="h-4.5 w-auto" />
                                    <CredLogo className="h-4.5 w-auto" />
                                  </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                                  <button
                                    type="button"
                                    onClick={() => executeConfirmOrder('upi')}
                                    disabled={isProcessingPayment}
                                    className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#FB641B] hover:bg-[#e85611] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer disabled:opacity-50"
                                  >
                                    {isProcessingPayment ? 'Verifying UPI...' : 'I Have Paid • Confirm Order'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* SUB-VIEW B: ENTER UPI ID */}
                        {activePaymentTab === 'upi_id' && (
                          <form onSubmit={handleVerifyVpaAndPay} className="space-y-4 bg-neutral-50 p-5 rounded-xl border border-neutral-200">
                            <div>
                              <label className="text-xs font-bold text-neutral-700 block mb-1">
                                Enter your UPI ID (Google Pay / PhonePe / Paytm / BHIM)
                              </label>
                              <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                  type="text"
                                  required
                                  value={userVpa}
                                  onChange={(e) => {
                                    setUserVpa(e.target.value);
                                    setVpaError(null);
                                  }}
                                  placeholder="e.g. 9098229454@okhdfcbank"
                                  className="flex-1 px-3.5 py-2.5 rounded-lg border border-neutral-300 text-xs focus:outline-none focus:border-[#2874F0] bg-white font-mono"
                                />
                                <button
                                  type="submit"
                                  disabled={isProcessingPayment}
                                  className="px-6 py-2.5 rounded-lg bg-[#FB641B] hover:bg-[#e85611] text-white text-xs font-bold uppercase tracking-wider cursor-pointer disabled:opacity-50"
                                >
                                  {isProcessingPayment ? 'Verifying...' : `Verify & Pay ₹${grandTotal}`}
                                </button>
                              </div>
                              {vpaError && <p className="text-xs text-red-600 mt-1">{vpaError}</p>}
                            </div>

                            {/* Suffix Shortcut Chips */}
                            <div>
                              <span className="text-[11px] font-bold text-neutral-500 block mb-1.5">
                                Quick Handles:
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {['@okhdfcbank', '@okaxis', '@oksbi', '@ybl', '@ibl', '@paytm'].map((handle) => (
                                  <button
                                    key={handle}
                                    type="button"
                                    onClick={() => handleAppendUpiSuffix(handle)}
                                    className="px-2.5 py-1 rounded bg-white hover:bg-neutral-100 text-neutral-700 font-mono text-[11px] border border-neutral-200 cursor-pointer transition-colors"
                                  >
                                    {handle}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <p className="text-[11px] text-neutral-500">
                              A collect request of ₹{grandTotal} will be sent to your UPI app. Approve it within 5 minutes to complete the order.
                            </p>
                          </form>
                        )}
                      </div>
                    )}
                  </div>

                  {/* --- TAB 2: WHATSAPP DIRECT ORDER --- */}
                  <div className="p-5">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment_choice"
                        checked={activePaymentTab === 'whatsapp'}
                        onChange={() => setActivePaymentTab('whatsapp')}
                        className="mt-1 w-4 h-4 text-[#2874F0] focus:ring-[#2874F0]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                            <span>WhatsApp Official Concierge Order</span>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                              1-CLICK
                            </span>
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          Direct chat with Kurud factory team. Receive bill receipt, live tracking, and UPI QR on WhatsApp.
                        </p>
                      </div>
                    </label>

                    {activePaymentTab === 'whatsapp' && (
                      <div className="mt-4 pt-4 border-t border-neutral-100 ml-0 sm:ml-7 space-y-3">
                        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-2">
                          <p className="font-semibold">
                            💬 Your order for <strong>₹{grandTotal}</strong> with delivery to <strong>{orderDetails.name} ({orderDetails.pincode})</strong> will be sent to official ROMAS WhatsApp: <strong>+91 70008 60127</strong>.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            handleWhatsAppCheckout();
                            executeConfirmOrder('whatsapp');
                          }}
                          className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm cursor-pointer"
                        >
                          <span>Send Order to WhatsApp Concierge</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* --- TAB 3: CASH ON DELIVERY (COD) --- */}
                  <div className="p-5">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment_choice"
                        checked={activePaymentTab === 'cod'}
                        onChange={() => setActivePaymentTab('cod')}
                        className="mt-1 w-4 h-4 text-[#2874F0] focus:ring-[#2874F0]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                            <span>Cash on Delivery (COD)</span>
                            <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 text-[10px] font-bold">
                              ₹0 EXTRA
                            </span>
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          Pay cash or UPI directly to delivery agent upon receiving insulated parcel.
                        </p>
                      </div>
                    </label>

                    {activePaymentTab === 'cod' && (
                      <form onSubmit={handleConfirmCod} className="mt-4 pt-4 border-t border-neutral-100 ml-0 sm:ml-7 space-y-3">
                        <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-700 space-y-2 max-w-md">
                          <p className="font-semibold">
                            To prevent automated spam orders, please enter the 4 digits below:
                          </p>
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1.5 shrink-0">
                                <span className="font-mono text-xl font-bold tracking-widest px-3.5 py-1.5 rounded bg-neutral-200 text-neutral-800 select-none border border-neutral-300">
                                  {codCaptchaCode}
                                </span>
                                <button
                                  type="button"
                                  onClick={refreshCodCaptcha}
                                  className="p-1.5 rounded hover:bg-neutral-200 text-neutral-600 transition-colors cursor-pointer"
                                  title="Change Captcha"
                                >
                                  <RefreshCw className="w-4 h-4" />
                                </button>
                              </div>
                              <input
                                type="text"
                                required
                                maxLength={4}
                                inputMode="numeric"
                                value={codCaptchaInput}
                                onChange={(e) => {
                                  setCodCaptchaInput(e.target.value);
                                  setCodCaptchaError(null);
                                }}
                                placeholder="Type 4 digits"
                                className="flex-1 sm:w-32 px-3 py-2 rounded border border-neutral-300 font-mono text-sm sm:text-xs focus:outline-none focus:border-[#2874F0] bg-white"
                              />
                            </div>
                            <button
                              type="submit"
                              className="w-full sm:w-auto px-5 py-2.5 sm:py-2 rounded bg-[#FB641B] hover:bg-[#e85611] text-white font-bold text-xs uppercase tracking-wider cursor-pointer active:scale-98"
                            >
                              Confirm COD
                            </button>
                          </div>
                          {codCaptchaError && <p className="text-xs text-red-600">{codCaptchaError}</p>}
                        </div>
                      </form>
                    )}
                  </div>

                  {/* --- TAB 4: CREDIT / DEBIT / ATM CARD --- */}
                  <div className="p-5">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment_choice"
                        checked={activePaymentTab === 'card'}
                        onChange={() => setActivePaymentTab('card')}
                        className="mt-1 w-4 h-4 text-[#2874F0] focus:ring-[#2874F0]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                            <span>Credit / Debit / ATM Card</span>
                            <span className="text-xs text-neutral-400 font-mono">RuPay &bull; Visa &bull; Mastercard</span>
                          </span>
                          <RuPayLogo className="h-3.5 w-auto" />
                        </div>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          All major domestic and international debit and credit cards supported.
                        </p>
                      </div>
                    </label>

                    {activePaymentTab === 'card' && (
                      <form onSubmit={handleCardPay} className="mt-4 pt-4 border-t border-neutral-100 ml-0 sm:ml-7 space-y-3 max-w-md">
                        <div>
                          <label className="text-xs font-bold text-neutral-700 block mb-1">Card Number</label>
                          <input
                            type="text"
                            required
                            maxLength={19}
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="xxxx xxxx xxxx xxxx"
                            className="w-full px-3.5 py-2 rounded border border-neutral-300 font-mono text-xs focus:outline-none focus:border-[#2874F0] bg-white"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-bold text-neutral-700 block mb-1">Valid Thru</label>
                            <input
                              type="text"
                              required
                              maxLength={5}
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="MM/YY"
                              className="w-full px-3.5 py-2 rounded border border-neutral-300 font-mono text-xs focus:outline-none focus:border-[#2874F0] bg-white"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-neutral-700 block mb-1">CVV</label>
                            <input
                              type="password"
                              required
                              maxLength={4}
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              placeholder="123"
                              className="w-full px-3.5 py-2 rounded border border-neutral-300 font-mono text-xs focus:outline-none focus:border-[#2874F0] bg-white"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-neutral-700 block mb-1">Name on Card</label>
                          <input
                            type="text"
                            required
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            className="w-full px-3.5 py-2 rounded border border-neutral-300 text-xs focus:outline-none focus:border-[#2874F0] bg-white"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-lg bg-[#FB641B] hover:bg-[#e85611] text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
                        >
                          Pay ₹{grandTotal} Securely
                        </button>
                      </form>
                    )}
                  </div>

                  {/* --- TAB 5: NET BANKING --- */}
                  <div className="p-5">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment_choice"
                        checked={activePaymentTab === 'netbanking'}
                        onChange={() => setActivePaymentTab('netbanking')}
                        className="mt-1 w-4 h-4 text-[#2874F0] focus:ring-[#2874F0]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                            <span>Net Banking</span>
                            <span className="text-xs text-neutral-400">All Major Indian Banks</span>
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          SBI, HDFC, ICICI, Axis, Kotak, PNB and 40+ other Indian banks.
                        </p>
                      </div>
                    </label>

                    {activePaymentTab === 'netbanking' && (
                      <form onSubmit={handleNetBankingPay} className="mt-4 pt-4 border-t border-neutral-100 ml-0 sm:ml-7 space-y-4 max-w-lg">
                        {/* Top Banks Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                          {[
                            { id: 'SBI', name: 'State Bank of India', Logo: SbiLogo },
                            { id: 'HDFC', name: 'HDFC Bank', Logo: HdfcLogo },
                            { id: 'ICICI', name: 'ICICI Bank', Logo: IciciLogo },
                            { id: 'AXIS', name: 'Axis Bank', Logo: AxisLogo },
                            { id: 'KOTAK', name: 'Kotak Bank', Logo: KotakLogo },
                            { id: 'PNB', name: 'Punjab National Bank', Logo: PnbLogo },
                          ].map((b) => (
                            <button
                              type="button"
                              key={b.id}
                              onClick={() => setSelectedBank(b.id)}
                              className={`p-2.5 rounded-lg border text-left flex items-center gap-2 cursor-pointer transition-colors ${
                                selectedBank === b.id
                                  ? 'border-[#2874F0] bg-blue-50/50 text-[#2874F0] font-bold'
                                  : 'border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700'
                              }`}
                            >
                              <b.Logo />
                              <span className="truncate">{b.name}</span>
                            </button>
                          ))}
                        </div>

                        {/* Other Banks Dropdown */}
                        <div>
                          <label className="text-[11px] font-bold text-neutral-600 block mb-1">Or Select Other Bank</label>
                          <select
                            value={selectedBank}
                            onChange={(e) => setSelectedBank(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs bg-white focus:outline-none focus:border-[#2874F0]"
                          >
                            <option value="SBI">State Bank of India</option>
                            <option value="HDFC">HDFC Bank</option>
                            <option value="ICICI">ICICI Bank</option>
                            <option value="AXIS">Axis Bank</option>
                            <option value="KOTAK">Kotak Mahindra Bank</option>
                            <option value="PNB">Punjab National Bank</option>
                            <option value="BOB">Bank of Baroda</option>
                            <option value="CANARA">Canara Bank</option>
                            <option value="UNION">Union Bank of India</option>
                            <option value="INDUSIND">IndusInd Bank</option>
                            <option value="IDFC">IDFC FIRST Bank</option>
                            <option value="YES">Yes Bank</option>
                            <option value="FEDERAL">Federal Bank</option>
                          </select>
                        </div>

                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-lg bg-[#FB641B] hover:bg-[#e85611] text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
                        >
                          Pay ₹{grandTotal} via {selectedBank}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: 4 Columns - Sticky Price Summary */}
            <div className="lg:col-span-4 sticky top-24 space-y-4">
              <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
                <div className="p-4 border-b border-neutral-200">
                  <h3 className="text-xs font-black uppercase tracking-wider text-neutral-500">
                    PRICE DETAILS
                  </h3>
                </div>

                <div className="p-5 space-y-3 text-xs text-neutral-600">
                  <div className="flex justify-between items-center">
                    <span>Price ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
                    <span className="font-mono font-semibold text-neutral-800">₹{totalMrp}</span>
                  </div>

                  <div className="flex justify-between items-center text-emerald-700">
                    <span>Discount</span>
                    <span className="font-mono font-semibold">- ₹{productDiscount}</span>
                  </div>

                  {appliedCoupon && couponDiscount > 0 && (
                    <div className="flex justify-between items-center text-emerald-700">
                      <span>Coupons for you ({appliedCoupon.code})</span>
                      <span className="font-mono font-semibold">- ₹{couponDiscount}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span>Insulated Cold-Pack Packing</span>
                    <div className="flex items-center gap-1.5">
                      <span className="line-through text-neutral-400 font-mono text-[11px]">₹40</span>
                      <span className="text-emerald-700 font-bold uppercase text-[11px]">Free</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Delivery Charges</span>
                    <div className="flex items-center gap-1.5">
                      {finalShipping === 0 ? (
                        <>
                          <span className="line-through text-neutral-400 font-mono text-[11px]">₹60</span>
                          <span className="text-emerald-700 font-bold uppercase text-[11px]">Free</span>
                        </>
                      ) : (
                        <span className="font-mono font-bold text-neutral-800">₹{finalShipping}</span>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-dashed border-neutral-300 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-[#2A1308]">Total Payable</span>
                    <span className="text-2xl font-black font-mono text-[#2A1308]">
                      ₹{grandTotal}
                    </span>
                  </div>

                  {totalSavings > 0 && (
                    <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-[11px] text-center border border-emerald-200">
                      🎉 You will save ₹{totalSavings} on this order
                    </div>
                  )}
                </div>

                <div className="p-4 border-t border-neutral-100 bg-neutral-50/50 space-y-2 text-xs text-neutral-500">
                  <div className="flex items-center gap-2 text-neutral-700 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Safe & Secure Payments</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Easy returns &bull; 100% Authentic products directly from ROMAS Kurud Works, Dhamtari.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* =========================================================================
          VIEW 3: STANDARD CART PAGE (ITEMS & PRICE DETAILS)
          ========================================================================= */}
      {view === 'cart' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 pb-28 sm:pb-6">
          {cart.length === 0 ? (
            /* Exact Flipkart-Style Empty Cart State */
            <div className="bg-white rounded-sm border border-neutral-200/80 shadow-2xs p-8 sm:p-14 text-center max-w-4xl mx-auto my-6 flex flex-col items-center justify-center">
              {/* Shopping Cart Illustration */}
              <div className="my-2">
                <FlipkartEmptyCartIllustration className="w-52 h-36 mx-auto filter drop-shadow-2xs" />
              </div>

              {/* Heading matching Flipkart */}
              <h2 className="text-xl sm:text-2xl font-medium text-neutral-800 mt-4 mb-2">
                Your cart is empty!
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 max-w-sm mx-auto mb-6">
                Explore our freshly tempered 3D chocolate slabs, couvertures & nut pralines.
              </p>

              {/* Primary Action Button: "Shop now" in Flipkart Blue */}
              <button
                onClick={() => (onNavigateShop ? onNavigateShop() : onNavigateHome?.('shop'))}
                className="px-14 py-2.5 rounded-xs bg-[#2874F0] hover:bg-[#1C5EC7] text-white font-medium text-sm transition-all shadow-xs cursor-pointer active:scale-98"
              >
                Shop now
              </button>

              {/* Quick Suggestions Row */}
              <div className="mt-12 pt-8 border-t border-neutral-200 w-full text-left">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-600">
                    Featured 3D Chocolates For You
                  </h3>
                  <button
                    onClick={() => (onNavigateShop ? onNavigateShop() : onNavigateHome?.('shop'))}
                    className="text-xs font-bold text-[#2874F0] hover:underline cursor-pointer"
                  >
                    View All &rarr;
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {ECOMMERCE_PRODUCTS.slice(0, 3).map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => onSelectProduct?.(prod)}
                      className="p-3.5 rounded-lg border border-neutral-200 hover:border-[#2874F0] hover:shadow-sm transition-all cursor-pointer bg-white flex items-center gap-3.5 group"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-14 h-16 object-contain shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-neutral-800 truncate group-hover:text-[#2874F0] transition-colors">
                          {prod.name}
                        </p>
                        <p className="text-[11px] text-neutral-500 mt-0.5">{prod.weight}</p>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-sm font-bold font-mono text-neutral-900">₹{prod.price}</span>
                          {prod.mrp > prod.price && (
                            <span className="text-[10px] line-through text-neutral-400">₹{prod.mrp}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Active Cart 2-Column Responsive Layout */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
              {/* LEFT COLUMN: Items, Address & Offers (8 of 12 cols) */}
              <div className="lg:col-span-8 space-y-4">
                {/* Delivery Address & Pincode Strip */}
                <div className="bg-white rounded-xl border border-neutral-200 shadow-2xs p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">
                          Deliver to:
                        </span>
                        <span className="text-xs font-bold text-[#2A1308]">
                          {orderDetails.name}, {pincode}
                        </span>
                        <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-sm bg-neutral-100 text-neutral-600 uppercase">
                          {addressType}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600 mt-0.5">
                        {pincodeMessage || 'Direct dispatched from Kurud Works, Dhamtari (493663)'}
                      </p>
                    </div>
                  </div>

                  {isEditingPincode ? (
                    <form onSubmit={handleCheckPincode} className="flex items-center gap-2 shrink-0">
                      <input
                        type="text"
                        maxLength={6}
                        value={tempPincode}
                        onChange={(e) => setTempPincode(e.target.value)}
                        placeholder="6-digit Pincode"
                        className="w-28 px-3 py-1.5 text-xs font-mono rounded-lg border border-neutral-300 focus:outline-none focus:border-amber-600"
                      />
                      <button
                        type="submit"
                        className="px-3.5 py-1.5 rounded-lg bg-[#381A0E] text-white text-xs font-bold hover:bg-[#4E2413] transition-colors cursor-pointer"
                      >
                        Check
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingPincode(false)}
                        className="text-xs text-neutral-500 hover:text-black cursor-pointer"
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <button
                      onClick={() => {
                        setTempPincode(pincode);
                        setIsEditingPincode(true);
                      }}
                      className="px-3.5 py-1.5 rounded-lg border border-neutral-300 hover:border-amber-600 text-xs font-bold text-[#381A0E] hover:text-amber-700 transition-colors cursor-pointer shrink-0"
                    >
                      Change Pincode
                    </button>
                  )}
                </div>

                {/* Free Insulated Cold-Pack Shipping Progress Banner */}
                <div className="bg-white rounded-xl border border-neutral-200 shadow-2xs p-4">
                  {cartTotal >= freeShippingThreshold ? (
                    <div className="flex items-center gap-2.5 text-xs font-bold text-emerald-700">
                      <span className="text-base">🎉</span>
                      <span>
                        Congratulations! You've unlocked <strong>FREE Insulated Thermal Shipping</strong> across India!
                      </span>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between text-xs text-neutral-700 mb-1.5">
                        <span>
                          Add <strong className="text-amber-800 font-mono font-bold">₹{amountUntilFreeShipping}</strong> more of delicious chocolates to unlock <strong>FREE Cold-Pack Delivery</strong>!
                        </span>
                        <span className="font-mono font-bold text-amber-800 text-[11px]">{progressPercent}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-amber-500 via-yellow-500 to-[#F9BD03] rounded-full transition-all duration-300"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Cart Items List Card */}
                <div className="bg-white rounded-xl border border-neutral-200 shadow-2xs overflow-hidden">
                  <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h2
                        className="text-lg font-bold uppercase tracking-wide text-[#2A1308]"
                        style={{ fontFamily: "'Cabin Condensed', sans-serif" }}
                      >
                        Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
                      </h2>
                    </div>
                    <button
                      onClick={clearCart}
                      className="text-xs text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="divide-y divide-neutral-200">
                    {cart.map((item) => {
                      const itemMrp = item.product.mrp || Math.round(item.product.price * 1.2);
                      const itemSavings = (itemMrp - item.product.price) * item.quantity;
                      const discountPercent = Math.round(((itemMrp - item.product.price) / itemMrp) * 100);

                      return (
                        <motion.div
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, x: -20 }}
                          key={item.product.id}
                          className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 hover:bg-neutral-50/50 transition-colors"
                        >
                          {/* Thumbnail & Product Details */}
                          <div className="flex items-start gap-4 min-w-0 flex-1">
                            <div
                              onClick={() => onSelectProduct?.(item.product)}
                              className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl bg-gradient-to-b from-[#FAF6F0] to-[#ECE2D2] border border-[#E5D7C5]/90 p-2 flex items-center justify-center shrink-0 cursor-pointer group shadow-[inset_0_1px_4px_rgba(42,19,8,0.04)]"
                            >
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="max-h-[94%] max-w-[94%] object-contain filter drop-shadow-md group-hover:scale-106 transition-transform"
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="px-2 py-0.5 rounded-sm bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-wider">
                                  {item.product.tag || 'Bestseller'}
                                </span>
                                <span className="text-[11px] text-neutral-500 font-medium">
                                  {item.product.categoryLabel}
                                </span>
                              </div>

                              <h3
                                onClick={() => onSelectProduct?.(item.product)}
                                className="text-sm sm:text-base font-bold text-[#2A1308] hover:text-amber-800 cursor-pointer truncate transition-colors"
                                style={{ fontFamily: "'Cabin Condensed', sans-serif" }}
                              >
                                {item.product.name}
                              </h3>

                              <p className="text-xs text-neutral-500 mb-2">{item.product.weight}</p>

                              <p className="text-[11px] text-neutral-500 flex items-center gap-1.5 mb-3">
                                <span>Seller: <strong>ROMAS Dhamtari Works</strong></span>
                                <span>&bull;</span>
                                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" /> In Stock
                                </span>
                              </p>

                              {/* Price Block */}
                              <div className="flex items-baseline gap-2.5">
                                <span className="text-lg sm:text-xl font-bold font-mono text-[#2A1308]">
                                  ₹{item.product.price * item.quantity}
                                </span>
                                <span className="text-xs line-through font-mono text-neutral-400">
                                  ₹{itemMrp * item.quantity}
                                </span>
                                <span className="text-xs font-bold text-emerald-700">
                                  {discountPercent}% Off
                                </span>
                                {itemSavings > 0 && (
                                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">
                                    Save ₹{itemSavings}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Stepper & Actions */}
                          <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                            <div className="flex items-center rounded-lg bg-neutral-100 border border-neutral-300 p-0.5">
                              <button
                                onClick={() => updateQuantity(item.product.id, -1)}
                                className="w-7 h-7 rounded-md flex items-center justify-center font-bold text-sm text-neutral-700 hover:bg-white transition-colors cursor-pointer"
                                title="Decrease quantity"
                                aria-label="Decrease quantity"
                              >
                                -
                              </button>
                              <span className="w-9 text-center font-mono font-bold text-xs text-neutral-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, 1)}
                                className="w-7 h-7 rounded-md flex items-center justify-center font-bold text-sm text-neutral-700 hover:bg-white transition-colors cursor-pointer"
                                title="Increase quantity"
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>

                            <div className="flex items-center gap-3 text-xs font-bold">
                              <button
                                onClick={() => handleSaveForLater(item.product)}
                                className="text-neutral-600 hover:text-amber-800 transition-colors cursor-pointer flex items-center gap-1"
                              >
                                <Heart className="w-3.5 h-3.5" />
                                <span>SAVE FOR LATER</span>
                              </button>
                              <span className="text-neutral-300">|</span>
                              <button
                                onClick={() => removeFromCart(item.product.id)}
                                className="text-neutral-400 hover:text-red-600 transition-colors cursor-pointer flex items-center gap-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>REMOVE</span>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="p-4 bg-neutral-50/70 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-emerald-700" />
                      <span>Dispatched in food-grade thermal insulation with frozen cooling packs.</span>
                    </div>
                    <button
                      onClick={() => (onNavigateShop ? onNavigateShop() : onNavigateHome?.('shop'))}
                      className="font-bold text-[#381A0E] hover:text-amber-700 underline cursor-pointer"
                    >
                      + Add More Chocolates
                    </button>
                  </div>
                </div>

                {/* Coupons & Discounts Section */}
                <div className="bg-white rounded-xl border border-neutral-200 shadow-2xs p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-amber-700" />
                      <h3 className="text-sm font-bold uppercase tracking-wider text-[#2A1308]">
                        Apply Factory Coupons & Promo Codes
                      </h3>
                    </div>
                    {appliedCoupon && (
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
                      >
                        Remove Coupon
                      </button>
                    )}
                  </div>

                  {appliedCoupon ? (
                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-emerald-700" />
                        <div>
                          <p className="text-xs font-bold text-emerald-900">
                            Code <span className="font-mono uppercase">{appliedCoupon.code}</span> applied successfully!
                          </p>
                          <p className="text-[11px] text-emerald-700">
                            You saved ₹{couponDiscount} extra on this order.
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-bold font-mono text-emerald-700">-₹{couponDiscount}</span>
                    </div>
                  ) : (
                    <form onSubmit={handleCustomCouponSubmit} className="space-y-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => {
                            setCouponInput(e.target.value);
                            setCouponError(null);
                          }}
                          placeholder="Enter coupon code (e.g. ROMA10)"
                          className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-neutral-300 uppercase font-mono focus:outline-none focus:border-amber-600 bg-neutral-50"
                        />
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-[#381A0E] hover:bg-[#4E2413] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>

                      {couponError && (
                        <p className="text-xs text-red-600 font-medium">{couponError}</p>
                      )}

                      <div className="flex flex-wrap gap-2 pt-1">
                        {AVAILABLE_COUPONS.map((cp) => (
                          <button
                            key={cp.code}
                            type="button"
                            onClick={() => handleApplyCoupon(cp)}
                            className="px-3 py-1.5 rounded-lg border border-dashed border-amber-300 bg-amber-50/50 hover:bg-amber-100/70 text-left transition-colors cursor-pointer flex items-center gap-2"
                          >
                            <span className="font-mono font-bold text-xs text-amber-900">{cp.code}</span>
                            <span className="text-[10px] text-amber-700">&bull; {cp.description}</span>
                          </button>
                        ))}
                      </div>
                    </form>
                  )}
                </div>

                {/* Saved For Later (Wishlist) Section */}
                {wishlist.length > 0 && (
                  <div className="bg-white rounded-xl border border-neutral-200 shadow-2xs p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                      <h3 className="text-sm font-bold uppercase tracking-wider text-[#2A1308]">
                        Saved For Later ({wishlist.length} {wishlist.length === 1 ? 'item' : 'items'})
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {wishlist.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 rounded-xl border border-neutral-200 flex items-center justify-between gap-3 bg-neutral-50/40"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-14 object-contain shrink-0"
                            />
                            <div className="min-w-0">
                              <h4 className="text-xs font-bold text-[#2A1308] truncate">{item.name}</h4>
                              <p className="text-[11px] text-neutral-500">{item.weight}</p>
                              <p className="text-xs font-bold font-mono text-[#2A1308]">₹{item.price}</p>
                            </div>
                          </div>

                          <button
                            onClick={() => moveToCart(item)}
                            className="px-3 py-1.5 rounded-lg bg-[#381A0E] hover:bg-[#4E2413] text-white text-[11px] font-bold uppercase shrink-0 transition-colors cursor-pointer"
                          >
                            Move to Bag
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN: Sticky Price Details & PLACE ORDER Button */}
              <div className="lg:col-span-4 sticky top-24 space-y-4">
                <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
                  <div className="p-4 border-b border-neutral-200">
                    <h3 className="text-xs font-black uppercase tracking-wider text-neutral-500">
                      PRICE DETAILS
                    </h3>
                  </div>

                  <div className="p-5 space-y-3 text-xs text-neutral-600">
                    <div className="flex justify-between items-center">
                      <span>Price ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
                      <span className="font-mono font-semibold text-neutral-800">₹{totalMrp}</span>
                    </div>

                    <div className="flex justify-between items-center text-emerald-700">
                      <span>Discount</span>
                      <span className="font-mono font-semibold">- ₹{productDiscount}</span>
                    </div>

                    {appliedCoupon && couponDiscount > 0 && (
                      <div className="flex justify-between items-center text-emerald-700">
                        <span>Coupons for you ({appliedCoupon.code})</span>
                        <span className="font-mono font-semibold">- ₹{couponDiscount}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span>Insulated Cold-Pack Packing</span>
                      <div className="flex items-center gap-1.5">
                        <span className="line-through text-neutral-400 font-mono text-[11px]">₹40</span>
                        <span className="text-emerald-700 font-bold uppercase text-[11px]">Free</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Delivery Charges</span>
                      <div className="flex items-center gap-1.5">
                        {finalShipping === 0 ? (
                          <>
                            <span className="line-through text-neutral-400 font-mono text-[11px]">₹60</span>
                            <span className="text-emerald-700 font-bold uppercase text-[11px]">Free</span>
                          </>
                        ) : (
                          <span className="font-mono font-bold text-neutral-800">₹{finalShipping}</span>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-dashed border-neutral-300 flex justify-between items-baseline">
                      <span className="text-sm font-bold text-[#2A1308]">Total Amount</span>
                      <span className="text-2xl font-black font-mono text-[#2A1308]">
                        ₹{grandTotal}
                      </span>
                    </div>

                    {totalSavings > 0 && (
                      <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-[11px] text-center border border-emerald-200">
                        🎉 You will save ₹{totalSavings} on this order
                      </div>
                    )}
                  </div>

                  {/* Primary Action Buttons */}
                  <div className="p-4 pt-1 space-y-2.5 border-t border-neutral-100 bg-neutral-50/50">
                    {/* Big Flipkart-Style PLACE ORDER Button */}
                    <button
                      onClick={() => {
                        setView('checkout');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full py-3.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider bg-[#FB641B] hover:bg-[#e85611] text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <Lock className="w-4 h-4" />
                      <span>PLACE ORDER &bull; ₹{grandTotal}</span>
                    </button>

                    {/* Direct WhatsApp Instant Checkout Button */}
                    <button
                      onClick={handleWhatsAppCheckout}
                      className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.004.577 1.764.787 2.806.787 3.182 0 5.768-2.587 5.768-5.766.001-3.187-2.575-5.77-5.768-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.062-1.118-.073-.284-.09-.646-.226-1.114-.429-1.964-.848-3.238-2.822-3.336-2.952-.097-.13-.799-1.062-.799-2.025 0-.962.505-1.436.684-1.631.18-.195.392-.244.523-.244.131 0 .261.002.375.008.12.006.28-.046.438.334.162.388.553 1.349.602 1.448.049.098.082.213.016.343-.065.13-.098.21-.195.324-.098.115-.205.257-.293.345-.098.098-.2.205-.086.401.114.195.508.839 1.09 1.358.749.667 1.38.874 1.576.972.195.098.31.082.424-.049.115-.13.491-.571.622-.767.13-.195.261-.163.441-.098.18.065 1.144.54 1.34.638.196.098.327.147.376.229.049.082.049.475-.095.88z" />
                      </svg>
                      <span>Instant WhatsApp Order</span>
                    </button>
                  </div>
                </div>

                {/* Safe & Secure Assurance Card */}
                <div className="bg-white rounded-xl border border-neutral-200 shadow-2xs p-4 space-y-3 text-xs text-neutral-500">
                  <div className="flex items-center gap-2 text-neutral-700 font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Safe and Secure Payments · 100% Authentic</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Packed fresh at ROMAS Kurud Works (Dhamtari) inside food-grade insulated thermal shippers.
                  </p>
                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px]">
                    <span>FSSAI Lic. 10526005000033</span>
                    <span className="font-bold text-neutral-600">UPI · Cards · NetBanking · COD</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Flipkart-Style Mobile Fixed Bottom Action Bar */}
          {cart.length > 0 && (
            <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-neutral-200 px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.1)] flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-black font-mono text-[#2A1308]">₹{grandTotal}</span>
                  {totalSavings > 0 && (
                    <span className="text-[11px] line-through text-neutral-400 font-mono">₹{totalMrp}</span>
                  )}
                </div>
                <span className="text-[10px] text-emerald-700 font-bold block">
                  {finalShipping === 0 ? '✓ Free Thermal Delivery' : `+ ₹${finalShipping} Shipping`}
                </span>
              </div>
              <button
                onClick={() => {
                  setView('checkout');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-2.5 rounded-lg bg-[#FB641B] hover:bg-[#e85611] text-white font-black text-xs uppercase tracking-wider shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>PLACE ORDER</span>
              </button>
            </div>
          )}
        </main>
      )}
    </div>
  );
};
