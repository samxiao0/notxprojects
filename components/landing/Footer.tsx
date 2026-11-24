"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Terminal, ArrowRight, Star, Heart, MessageCircle, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white relative overflow-hidden">
      {/* Top Banner Ribbon */}
      <div className="bg-[#CCFF00] text-black py-2.5 px-4 font-black uppercase text-xs tracking-wider flex items-center justify-between overflow-x-auto marquee-mask">
        <div className="flex items-center gap-6 whitespace-nowrap">
          <span>★ NOTX ACADEMIC DISSERTATION LAB</span>
          <span className="text-black/40">•</span>
          <span>FLAT ₹4,000 & ₹5,000 PLANS</span>
          <span className="text-black/40">•</span>
          <span>ANYDESK LIVE SETUP GUARANTEE</span>
          <span className="text-black/40">•</span>
          <span>30+ VIVA DEFENSE PREP</span>
          <span className="text-black/40">•</span>
          <span>WHATSAPP: +91 9000639955</span>
        </div>
        <span className="hidden md:inline-block font-mono text-[10px] bg-black text-white px-2.5 py-0.5 rounded-full border border-black">
          v2.6 // PROD-STABLE
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Massive Editorial Headline */}
        <div className="mb-14 sm:mb-20 pb-12 border-b border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="text-4xl sm:text-7xl xl:text-8xl font-black text-white tracking-tighter uppercase leading-[0.88]">
              BUILD THE <br />
              <span className="text-[#CCFF00]">REAL THING.</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <a
                href="#contact"
                className="px-8 py-4 bg-[#CCFF00] text-black font-black text-xs uppercase tracking-wider rounded-full shadow-md hover:bg-white transition-all duration-300"
              >
                PROPOSE YOUR PROJECT &rarr;
              </a>
              <a
                href="#pricing"
                className="px-8 py-4 bg-white text-black font-black text-xs uppercase tracking-wider rounded-full shadow-md hover:bg-[#CCFF00] transition-all duration-300"
              >
                VIEW PRICING PLANS &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* 4-Column Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Col 1: Studio Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#CCFF00] text-black font-black text-xl flex items-center justify-center shadow-md">
                N
              </div>
              <span className="font-black text-2xl tracking-tighter text-white uppercase">
                NOTX
              </span>
            </div>
            <p className="text-xs font-bold text-white/70 leading-relaxed">
              The creative academic engineering lab connecting computer science seniors with senior developers for production-grade final year capstone delivery.
            </p>
            <div className="inline-block px-3 py-1 bg-white/10 text-[#CCFF00] font-mono text-[10px] font-bold rounded-full border border-[#CCFF00]/30">
              Backblaze B2 Vault Secured
            </div>
          </div>

          {/* Col 2: Engineering Domains */}
          <div>
            <h4 className="text-xs font-black text-[#CCFF00] uppercase tracking-widest mb-4">
              // DISCIPLINES
            </h4>
            <ul className="space-y-2.5 text-xs font-bold text-white/80">
              <li><a href="#services" className="hover:text-[#CCFF00] transition-colors">AI & Machine Learning</a></li>
              <li><a href="#services" className="hover:text-[#CCFF00] transition-colors">Full-Stack Web Systems</a></li>
              <li><a href="#services" className="hover:text-[#CCFF00] transition-colors">Mobile Applications (iOS/Android)</a></li>
              <li><a href="#services" className="hover:text-[#CCFF00] transition-colors">IoT & LoRaWAN Telemetry</a></li>
              <li><a href="#services" className="hover:text-[#CCFF00] transition-colors">Algorithm Engineering</a></li>
            </ul>
          </div>

          {/* Col 3: Academic Guarantees */}
          <div>
            <h4 className="text-xs font-black text-[#CCFF00] uppercase tracking-widest mb-4">
              // ACADEMIC ASSURANCE
            </h4>
            <ul className="space-y-2.5 text-xs font-bold text-white/80">
              <li><span className="text-[#CCFF00]">✓</span> 100% Original IEEE Code</li>
              <li><span className="text-[#CCFF00]">✓</span> Guaranteed AnyDesk Live Run</li>
              <li><span className="text-[#CCFF00]">✓</span> 40+ Page Formatted Report</li>
              <li><span className="text-[#CCFF00]">✓</span> 30+ Viva Oral Defense Q&A</li>
              <li><span className="text-[#CCFF00]">✓</span> Student Group Concessions</li>
            </ul>
          </div>

          {/* Col 4: Direct Communication Desk */}
          <div>
            <h4 className="text-xs font-black text-[#CCFF00] uppercase tracking-widest mb-4">
              // DIRECT CONTACT
            </h4>
            <ul className="space-y-2.5 text-xs font-bold text-white/80">
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href="https://wa.me/919000639955"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#CCFF00] transition-colors"
                >
                  WhatsApp: +91 9000639955
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#CCFF00] shrink-0" />
                <a href="tel:+919000639955" className="hover:text-[#CCFF00] transition-colors">
                  Call: +91 9000639955
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#CCFF00] shrink-0" />
                <a href="mailto:projects.notx@gmail.com" className="hover:text-[#CCFF00] transition-colors">
                  projects.notx@gmail.com
                </a>
              </li>
              <li>
                <span className="text-white/60">Hours: Mon - Sat (9 AM - 9 PM)</span>
              </li>
              <li>
                <span className="text-white/60">Turnaround: Under 4 Hours</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Stamps & Copyright Strip */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-white/60">
          <div>
            &copy; {new Date().getFullYear()} NOTX ACADEMIC ENGINEERING STUDIO. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4 text-[11px] font-bold">
            <span className="text-[#CCFF00]">INDIAN RUPEES (₹) TRANSACTIONS</span>
            <span>•</span>
            <span className="text-white">BACKBLAZE B2 VAULT</span>
            <span>•</span>
            <span className="text-[#CCFF00]">ANYDESK LIVE SETUP GUARANTEED</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
