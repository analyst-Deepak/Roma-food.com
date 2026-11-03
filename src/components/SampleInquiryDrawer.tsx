import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Send, CheckCircle2, PackageCheck } from 'lucide-react';
import { Product } from '../types';

interface SampleInquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSamples?: Product[];
  samples?: Product[];
  onRemoveSample: (productId: string) => void;
  onClearSamples: () => void;
  onProceedToInquiry?: () => void;
}

export const SampleInquiryDrawer: React.FC<SampleInquiryDrawerProps> = ({
  isOpen,
  onClose,
  selectedSamples,
  samples: propSamples,
  onRemoveSample,
  onClearSamples,
  onProceedToInquiry,
}) => {
  const samples = selectedSamples || propSamples || [];
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName || !recipientPhone || !deliveryAddress) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const handleFinish = () => {
    onClearSamples();
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="w-screen max-w-md bg-white text-[#2A0E04] shadow-2xl border-l border-[#381305]/15 flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 bg-[#FAF8F5] text-[#2A0E04] flex items-center justify-between border-b border-[#381305]/10">
                <div className="flex items-center gap-3">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#2A0E04]">Sample Tasting Bag</h3>
                    <p className="text-xs text-[#2A0E04]/60 mt-0.5 font-light">
                      {samples.length} confectionery sample{samples.length === 1 ? '' : 's'} selected
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-full text-[#2A0E04]/60 hover:text-[#2A0E04] hover:bg-black/5 cursor-pointer"
                  aria-label="Close sample drawer"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="font-serif text-2xl font-bold text-[#381305]">
                      Sample Request Received!
                    </h4>
                    <p className="text-xs text-[#2A0E04]/75 max-w-xs mx-auto font-light leading-relaxed">
                      Thank you, {recipientName}. Our dispatch desk will prepare your complimentary tasting box and send tracking details to {recipientPhone}.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleFinish}
                      className="mt-4 px-6 py-2.5 rounded-full bg-[#FAF8F5] border border-[#381305]/15 text-xs font-bold text-[#381305] uppercase tracking-wider cursor-pointer"
                    >
                      Done
                    </motion.button>
                  </motion.div>
                ) : samples.length === 0 ? (
                  <div className="py-20 text-center space-y-4 text-[#2A0E04]/60">
                    <PackageCheck className="w-12 h-12 mx-auto text-[#C59B27]/40" />
                    <p className="text-sm font-light">Your tasting bag is currently empty.</p>
                    <p className="text-xs text-[#2A0E04]/50 max-w-xs mx-auto">
                      Explore our collection and click "+ Sample" on any product to add complimentary samples.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-[#8C4724] font-semibold uppercase tracking-wider">
                        <span>Selected Items</span>
                        <button
                          onClick={onClearSamples}
                          className="text-[#8C4724] hover:text-[#381305] text-[10.5px] cursor-pointer"
                        >
                          Clear All
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        {samples.map((item) => (
                          <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#381305]/10 flex items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-3 truncate">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-11 h-11 rounded-xl object-cover shrink-0"
                              />
                              <div className="truncate">
                                <h5 className="font-serif font-bold text-sm text-[#381305] truncate">
                                  {item.name}
                                </h5>
                                <span className="text-[10px] text-[#2A0E04]/60 font-light block">
                                  {item.packSize}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => onRemoveSample(item.id)}
                              className="p-1.5 rounded-full text-[#2A0E04]/40 hover:text-red-700 hover:bg-red-50 cursor-pointer transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Order Details Form */}
                    <form onSubmit={handleSubmit} className="pt-4 border-t border-[#381305]/10 space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C4724]">
                        Bakery / Delivery Destination
                      </h4>

                      <div>
                        <label className="block text-[10.5px] font-semibold text-[#2A0E04]/75 mb-1">
                          Chef / Manager Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={recipientName}
                          onChange={(e) => setRecipientName(e.target.value)}
                          placeholder="e.g. Chef Amit Sharma"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#381305]/15 bg-[#FAF8F5] text-[#2A0E04] focus:outline-none focus:border-[#C59B27] focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10.5px] font-semibold text-[#2A0E04]/75 mb-1">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={recipientPhone}
                          onChange={(e) => setRecipientPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#381305]/15 bg-[#FAF8F5] text-[#2A0E04] focus:outline-none focus:border-[#C59B27] focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10.5px] font-semibold text-[#2A0E04]/75 mb-1">
                          Bakery Studio Address & City *
                        </label>
                        <textarea
                          rows={2}
                          required
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          placeholder="Shop/Studio address, City, PIN code"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#381305]/15 bg-[#FAF8F5] text-[#2A0E04] focus:outline-none focus:border-[#C59B27] focus:bg-white resize-none"
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={submitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-3.5 px-4 text-xs font-bold uppercase tracking-[0.2em] text-[#140602] bg-gradient-to-r from-[#FAD674] via-[#E6C280] to-[#C59B27] hover:brightness-105 disabled:opacity-50 rounded-full shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{submitting ? 'Dispatching...' : 'Confirm Sample Request'}</span>
                      </motion.button>
                    </form>
                  </>
                )}
              </div>

              {/* Footer Note */}
              <div className="p-4 bg-[#FAF8F5] border-t border-[#381305]/10 text-center">
                <p className="text-[10px] text-[#2A0E04]/60 font-light">
                  Samples dispatched from Roma Foods, Dhamtari (C.G.). Subject to verification.
                </p>
              </div>

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
