"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(false);

  return (
    <aside
      aria-label="Contact options"
      className="fixed bottom-16 md:bottom-6 right-4 md:right-6 z-50 flex items-center gap-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Floating tooltip/label on hover */}
      <div
        className={`hidden sm:flex items-center gap-2 px-4 py-2 bg-black text-white text-xs font-bold rounded-full shadow-xl border border-white/15 transition-all duration-300 ${
          hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping"></span>
        <span>Chat with NOTX Engineers (+91 9000639955)</span>
      </div>

      {/* Floating WhatsApp Action Pill */}
      <a
        href="https://wa.me/919000639955?text=Hi%20NOTX%20Team%2C%20I%20would%20like%20to%20discuss%20my%20academic%20project%20requirement."
        target="_blank"
        rel="noopener noreferrer"
        className="relative group flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/20"
        aria-label="Direct WhatsApp Chat"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 group-hover:opacity-40"></span>
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7 fill-white relative z-10 transition-transform group-hover:rotate-6" />
      </a>
    </aside>
  );
}
