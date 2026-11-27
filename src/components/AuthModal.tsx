import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, KeyRound, Eye, EyeOff, Mail, CheckCircle2, MessageCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (username: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const displayName = username || email.split('@')[0] || 'Valued Customer';
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'romas_auth_user',
          JSON.stringify({ name: displayName, email: email || 'user@romafoods.com' })
        );
      }
      setSuccessMessage(
        activeTab === 'login' ? `Welcome back, ${displayName}!` : `Account created! Welcome to ROMAS.`
      );
      setTimeout(() => {
        setSuccessMessage(null);
        if (onLoginSuccess) onLoginSuccess(displayName);
        onClose();
      }, 1200);
    }, 800);
  };

  const handleWhatsAppLogin = () => {
    const text = encodeURIComponent('Hello ROMAS! I would like to sign in / register via WhatsApp for B2B wholesale access.');
    window.open(`https://wa.me/919098229454?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[860px] bg-white rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col md:flex-row min-h-[500px]"
        >
          {/* Close Button Top Right */}
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 text-neutral-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* LEFT COLUMN: Authentic Yellow Product Packaging Showcase */}
          <div className="relative w-full md:w-[45%] bg-[#FECD1C] flex flex-col items-center justify-between p-6 sm:p-8 select-none overflow-hidden">
            {/* Top Brand Emblem */}
            <div className="w-full flex items-center justify-between z-10">
              <img
                src="/assets/romas-logo-gold.png"
                alt="ROMAS"
                className="h-7 w-auto object-contain filter drop-shadow-sm brightness-0"
              />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#1C0E07]/80 bg-[#F9BD03]/40 px-2.5 py-0.5 rounded-full border border-[#1C0E07]/20">
                100% Vegetarian
              </span>
            </div>

            {/* Floating Official Product Pouch */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full my-auto flex items-center justify-center py-4 z-10"
            >
              <img
                src="/assets/official_products_png/choco_chips/milk_front.png"
                alt="ROMAS Milk Choco Chips Pouch"
                className="max-h-[300px] w-auto object-contain filter drop-shadow-[0_16px_25px_rgba(42,19,8,0.38)]"
              />
            </motion.div>

            {/* Bottom Podium Accent */}
            <div className="w-full text-center z-10">
              <p className="text-xs font-black uppercase tracking-wider text-[#1C0E07]">
                ROMAS MILK CHOCO CHIPS
              </p>
              <p className="text-[10px] font-medium text-[#1C0E07]/75">
                Spreading Happiness · Premium Patisserie Formulation
              </p>
            </div>

            <div className="absolute inset-0 bg-radial from-transparent via-[#FECD1C]/30 to-[#F6BD00]/60 pointer-events-none" />
          </div>

          {/* RIGHT COLUMN: Clean Authentication Form Card */}
          <div className="w-full md:w-[55%] bg-white p-6 sm:p-10 flex flex-col justify-center">
            {/* Login / Sign Up Tabs */}
            <div className="flex border-b border-neutral-200 mb-8">
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-3 text-sm font-bold tracking-wide transition-all cursor-pointer ${
                  activeTab === 'login'
                    ? 'text-white bg-black rounded-t-lg'
                    : 'text-neutral-500 hover:text-black bg-neutral-100'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('signup')}
                className={`flex-1 py-3 text-sm font-bold tracking-wide transition-all cursor-pointer ${
                  activeTab === 'signup'
                    ? 'text-white bg-black rounded-t-lg'
                    : 'text-neutral-500 hover:text-black bg-neutral-100'
                }`}
              >
                Sign Up
              </button>
            </div>

            {successMessage ? (
              <div className="py-10 text-center flex flex-col items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-[#2E7D32] mb-3 animate-bounce" />
                <p className="text-base font-bold text-neutral-900">{successMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <div className="relative flex items-center border border-neutral-300 rounded-md focus-within:border-black focus-within:ring-1 focus-within:ring-black transition-all">
                    <span className="pl-3.5 pr-2.5 text-neutral-400">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Username / Email"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full py-2.5 pr-3 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                    />
                  </div>
                </div>

                {activeTab === 'signup' && (
                  <div>
                    <div className="relative flex items-center border border-neutral-300 rounded-md focus-within:border-black focus-within:ring-1 focus-within:ring-black transition-all">
                      <span className="pl-3.5 pr-2.5 text-neutral-400">
                        <Mail className="w-4 h-4" />
                      </span>
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full py-2.5 pr-3 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <div className="relative flex items-center border border-neutral-300 rounded-md focus-within:border-black focus-within:ring-1 focus-within:ring-black transition-all">
                    <span className="pl-3.5 pr-2.5 text-neutral-400">
                      <KeyRound className="w-4 h-4" />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full py-2.5 pr-10 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-600 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-neutral-300 text-black focus:ring-black"
                    />
                    <span>Remember me</span>
                  </label>
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Please contact ROMAS support at +91-9098229454 to reset your wholesale account password.');
                    }}
                    className="text-neutral-700 hover:underline hover:text-black font-medium"
                  >
                    Forgot Password?
                  </a>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-full bg-black hover:bg-neutral-800 text-white font-black text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-md disabled:opacity-60"
                  >
                    {isSubmitting
                      ? 'PROCESSING...'
                      : activeTab === 'login'
                      ? 'SIGN IN'
                      : 'CREATE ACCOUNT'}
                  </button>
                </div>

                <div className="pt-2 text-center">
                  <p className="text-[11px] text-neutral-400 uppercase tracking-widest mb-2 font-semibold">
                    OR
                  </p>
                  <button
                    type="button"
                    onClick={handleWhatsAppLogin}
                    className="w-full py-2.5 rounded-full border border-neutral-300 hover:border-[#25D366] hover:bg-[#25D366]/5 text-neutral-800 hover:text-[#128C7E] font-bold text-xs tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                    <span>Instant WhatsApp Wholesale Sign In</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

