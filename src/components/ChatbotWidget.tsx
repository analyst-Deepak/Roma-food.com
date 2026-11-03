import React, { useState } from 'react';
import { X } from 'lucide-react';

/**
 * Floating ROMAS chat assistant (n8n webhook chat embedded in an iframe).
 * Placed bottom-LEFT so it never collides with the Call / WhatsApp buttons
 * that live in the bottom-right corner.
 */
const CHAT_URL =
  'https://n8n.srv1848322.hstgr.cloud/webhook/9175f260-8891-4dd7-958f-ae198e78e845/chat';

export const ChatbotWidget: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div
          className="fixed z-[9999] bottom-24 left-5 w-[370px] max-w-[calc(100vw-40px)] h-[560px] max-h-[calc(100vh-120px)] rounded-[26px] overflow-hidden bg-white shadow-[0_24px_60px_-12px_rgba(42,19,8,0.55)] ring-1 ring-[#F9BD03]/30 border border-[#381A0E]/10 animate-in slide-in-from-bottom-4 fade-in duration-300"
          role="dialog"
          aria-label="ROMAS chat assistant"
        >
          {/* Premium gold accent strip at the very top of the frame */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#F9BD03] via-[#FEE8B4] to-[#F9BD03] z-20 pointer-events-none" />

          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-[#1C0E07]/80 hover:bg-[#1C0E07] text-[#F9BD03] backdrop-blur-sm flex items-center justify-center shadow-md border border-[#F9BD03]/30 transition-all cursor-pointer active:scale-90"
          >
            <X className="w-4 h-4" />
          </button>

          <iframe
            src={CHAT_URL}
            title="ROMAS Chat Assistant"
            className="w-full h-full border-0"
          />

          {/* Subtle secure-concierge footer ribbon */}
          <div className="absolute bottom-0 inset-x-0 h-6 z-10 pointer-events-none flex items-center justify-center bg-gradient-to-t from-white via-white/80 to-transparent">
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8C4724]/70">
              ROMAS Concierge · Secure Chat
            </span>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <div className="fixed z-[9999] bottom-6 left-6 group">
        {/* Soft gold halo pulse */}
        {!open && (
          <span className="absolute -inset-1 rounded-full bg-[#F9BD03] opacity-50 blur-md animate-ping pointer-events-none" />
        )}

        {/* Hover label */}
        {!open && (
          <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded-full bg-[#1C0E07] text-[#FEE8B4] text-xs font-semibold shadow-lg opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
            Chat with ROMAS
          </span>
        )}

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close chat' : 'Chat with ROMAS'}
          aria-expanded={open}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#4A1704] to-[#1C0E07] hover:from-[#5A2008] hover:to-[#2A1308] text-[#F9BD03] flex items-center justify-center shadow-2xl ring-2 ring-[#F9BD03]/70 ring-offset-2 ring-offset-transparent transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        >
          {open ? <X className="w-6 h-6" /> : <span className="text-2xl leading-none">🍫</span>}

          {/* Online presence dot */}
          {!open && (
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow" />
          )}
        </button>
      </div>
    </>
  );
};
