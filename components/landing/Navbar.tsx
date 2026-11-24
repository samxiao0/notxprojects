"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Streamlined 5 essential links with clean casing and ample breathing room
  const navLinks = [
    { label: "Projects", href: "#projects" },
    { label: "Domains", href: "#services" },
    { label: "Pricing", href: "#pricing" },
    { label: "Viva Defense", href: "#viva-defense" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "FAQs", href: "#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FBF8F1]/95 backdrop-blur-md border-b border-black/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo - Creative Studio Sleek Identity */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-10 h-10 rounded-2xl bg-black text-[#CCFF00] flex items-center justify-center font-black text-xl shadow-md transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 group-hover:shadow-glow-lime">
              N

            </div>
            <div className="flex flex-col">
              <span className="font-black text-2xl tracking-tighter text-black uppercase leading-none">
                NOTX
              </span>

            </div>
          </Link>

          {/* Decongested Desktop Navigation - Clean, spacious, un-crowded */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-2 text-sm font-bold text-black/75 hover:text-black hover:bg-black/5 rounded-full transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Single Action - Clean, Uncongested CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-black uppercase tracking-wider rounded-full bg-black text-[#CCFF00] shadow-sm hover:bg-[#CCFF00] hover:text-black hover:shadow-glow-lime hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Get In Touch
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="#contact"
              className="px-3.5 py-1.5 text-xs font-black uppercase tracking-wider rounded-full bg-black text-[#CCFF00]"
            >
              Contact
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 bg-white rounded-xl border border-black/10 shadow-sm text-black hover:bg-slate-50 transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-black/10 bg-[#FBF8F1] px-4 pt-4 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200 shadow-xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-base font-bold text-black hover:bg-[#CCFF00] rounded-xl transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-black/10">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 px-4 bg-[#CCFF00] text-black font-black uppercase text-xs rounded-xl shadow-md block"
            >
              Consultation Desk &rarr;
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
