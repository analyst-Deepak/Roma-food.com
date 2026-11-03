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
          className="fixed z-[9999] bottom-24 left-5 w-[370px] max-w-[calc(100vw-40px)] h-[560px] max-h-[calc(100vh-120px)] rounded-2xl overflow-hidden bg-white shadow-[0_8px_28px_rgba(0,0,0,0.35)] border border-black/10 animate-in slide-in-from-bottom-4 fade-in duration-300"
          role="dialog"
          aria-label="ROMAS chat assistant"
        >
          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full bg-black/45 hover:bg-black/70 text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          <iframe
            src={CHAT_URL}
            title="ROMAS Chat Assistant"
            className="w-full h-full border-0"
          />
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Chat with ROMAS'}
        aria-expanded={open}
        className="fixed z-[9999] bottom-6 left-6 w-14 h-14 rounded-full bg-[#4A1704] hover:bg-[#381305] text-white flex items-center justify-center shadow-2xl border-2 border-white transition-all duration-300 hover:scale-110 cursor-pointer"
      >
        {open ? <X className="w-6 h-6" /> : <span className="text-2xl leading-none">🍫</span>}
      </button>
    </>
  );
};
