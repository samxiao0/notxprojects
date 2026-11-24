"use client";

import React from "react";
import { MessageCircle, Send, ArrowRight } from "lucide-react";

export default function MobileBottomBar() {
  return (
    <aside
      aria-label="Quick mobile contact actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FBF8F1]/95 backdrop-blur-md border-t border-black/10 px-4 py-2.5 shadow-2xl flex items-center justify-between gap-3 safe-area-pb"
    >
      {/* Direct WhatsApp Quick Chat */}
      <a
        href="https://wa.me/919000639955?text=Hi%20NOTX%20Team%2C%20I%20would%20like%20to%20inquire%20about%20a%20final%20year%20project."
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 bg-[#25D366] text-white font-black text-xs uppercase rounded-full shadow-md active:scale-95 transition-transform"
      >
        <MessageCircle className="w-4 h-4 fill-white" />
        <span>WhatsApp</span>
      </a>

      {/* Direct Consultation Desk jump */}
      <a
        href="#contact"
        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-black text-[#CCFF00] font-black text-xs uppercase rounded-full shadow-md active:scale-95 transition-transform"
      >
        <span>Get Quote</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </aside>
  );
}
