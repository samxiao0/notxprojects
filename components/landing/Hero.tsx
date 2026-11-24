"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
  Sparkles,
  Terminal,
  CheckCircle2,
  Code2,
  Laptop,
  FileText,
  Star,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-[#FF4D00] text-black overflow-hidden pt-12 sm:pt-20 pb-0">
      {/* Background ambient decorative shapes with smooth floating animation */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-[#CCFF00]/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Floating Animated Badges */}
      <div className="absolute top-8 left-8 hidden xl:inline-flex items-center gap-2 px-4 py-2 bg-[#CCFF00] rounded-full font-black text-xs uppercase shadow-soft animate-float border border-black/15 z-10">
        <Star className="w-3.5 h-3.5 fill-black animate-spin-slow" />
        ACADEMIC DISSERTATION LAB
      </div>
      <div className="absolute top-12 right-12 hidden xl:inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full font-black text-xs uppercase shadow-soft animate-float-delayed border border-black/10 z-10">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>₹4,000 & ₹5,000 FIXED TIERS</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pb-16 sm:pb-24">
          {/* Left Column: Bold Typography & Focused CTAs (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Category Tag with live pulse */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black text-[#CCFF00] font-black text-xs uppercase tracking-wider rounded-full shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CCFF00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#CCFF00]"></span>
              </span>
              <span>THE ACADEMIC ENGINEERING STUDIO</span>
              <span className="w-1 h-1 bg-[#CCFF00]/50 rounded-full"></span>
              <span className="text-white/80">NO GENERIC TEMPLATES</span>
            </div>

            {/* Massive Editorial Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-white tracking-tighter leading-[0.95] uppercase">
              YOUR IDEA. <br />
              <span className="bg-[#CCFF00] text-black px-4 py-1.5 inline-block -rotate-1 rounded-2xl shadow-soft my-1.5">
                OUR EXPERTISE.
              </span> <br />
              A REAL PROJECT.
            </h1>

            {/* Editorial Manifesto Subtitle */}
            <p className="text-base sm:text-xl font-bold text-black max-w-xl leading-relaxed bg-[#FBF8F1] p-5 sm:p-6 rounded-3xl shadow-soft border border-black/10">
              Stop settling for broken Github clones and boilerplate templates. NOTX constructs working research software, 40+ page IEEE documentation, and guaranteed live laptop runs with complete viva defense coaching.
            </p>

            {/* High-Impact Harmonious CTAs without repeated WhatsApp buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#CCFF00] text-black font-black text-base uppercase tracking-wider rounded-full shadow-soft hover:shadow-glow-lime hover:-translate-y-1 active:translate-y-0 transition-all duration-300 text-center"
              >
                <span>PROPOSE YOUR PROJECT</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-black text-base uppercase tracking-wider rounded-full shadow-soft hover:shadow-lg hover:-translate-y-1 active:translate-y-0 transition-all duration-300 text-center border border-black/10"
              >
                EXPLORE SHOWCASE
              </a>
            </div>

            {/* Trust Highlights Strip with smooth pill badges */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2 text-xs font-black uppercase text-black">
              <span className="px-3.5 py-1.5 bg-white/95 rounded-full border border-black/10 shadow-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 100% ORIGINAL IEEE CODE
              </span>
              <span className="px-3.5 py-1.5 bg-[#CCFF00] rounded-full border border-black/15 shadow-sm flex items-center gap-1.5">
                <Laptop className="w-3.5 h-3.5 text-black" /> ANYDESK LIVE RUN GUARANTEE
              </span>
              <span className="px-3.5 py-1.5 bg-black text-white rounded-full shadow-sm flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#CCFF00]" /> 30+ VIVA DEFENSE PREP
              </span>
            </div>
          </div>

          {/* Right Column: Live Engineering Studio Feed (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#0A0A0A] text-[#CCFF00] rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10 font-mono text-xs space-y-4 relative transition-all duration-500 hover:shadow-glow-lime hover:-translate-y-1">
              {/* Studio Window Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF2E2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFE500]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#CCFF00]"></div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-[10px] tracking-widest uppercase font-black text-white/70 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                    NOTX-SPECIFICATION // LIVE
                  </span>
                </div>
              </div>

              {/* Terminal Specification Stream */}
              <div className="space-y-2.5 text-[11px] leading-relaxed">
                <div className="text-white/60">$ notx spec --tier premium_5000</div>
                <div className="text-[#CCFF00] font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#CCFF00] shrink-0" />
                  <span>Topic Verified: Autonomous Quadcopter Obstacle Avoidance</span>
                </div>
                <div className="text-white/80">
                  &gt; Tech: [PyTorch, CUDA, AirSim, OpenCV, ROS2, Next.js]
                </div>
                <div className="text-white/80">
                  &gt; Deliverables: 42-page IEEE Manuscript + PPT + AnyDesk Live Setup
                </div>
                <div className="p-3 bg-white/5 border border-white/10 text-white rounded-2xl">
                  <div className="flex justify-between items-center mb-1 text-[10px]">
                    <span className="font-bold text-[#CCFF00]">ACADEMIC VERIFICATION GATE:</span>
                    <span className="text-emerald-400 font-extrabold">[100% PASS RATE]</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="text-[#CCFF00]">✓ Live AnyDesk Run</span>
                    <span className="text-white/30">•</span>
                    <span className="text-[#CCFF00]">✓ 30+ Viva Oral Q&A</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <span className="text-white/70">Fixed Plan Fee (Transparent INR):</span>
                  <span className="text-[#CCFF00] font-black text-sm">₹5,000 (Full Defense)</span>
                </div>
              </div>

              {/* Direct Inquiry CTA button inside terminal */}
              <a
                href="#contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#CCFF00] text-black font-black uppercase tracking-wider rounded-2xl text-xs hover:bg-white transition-all duration-300 shadow-sm"
              >
                <Terminal className="w-3.5 h-3.5" />
                Submit Your Topic Synopsis &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CONTINUOUS MARQUEE TICKER 1 (Neon Lime with gradient fade mask) */}
      <div className="bg-[#CCFF00] text-black py-3.5 border-y border-black/15 overflow-hidden font-black uppercase text-sm tracking-wider select-none marquee-mask">
        <div className="marquee-container">
          <div className="marquee-content gap-8 items-center">
            <span>✦ 100% ORIGINAL CODE</span>
            <span>★ NO GENERIC BOILERPLATES</span>
            <span>✦ IEEE 40+ PAGE REPORTS</span>
            <span>★ GUARANTEED ANYDESK LAPTOP SETUP</span>
            <span>✦ 30+ VIVA DEFENSE QUESTIONS</span>
            <span>★ ₹4,000 STANDARD & ₹5,000 FULL SUPPORT</span>
            <span>✦ STUDENT CONCESSIONS & DISCOUNTS</span>
            <span>★ BACKBLAZE B2 VAULT</span>
            {/* Duplicate for infinite loop */}
            <span>✦ 100% ORIGINAL CODE</span>
            <span>★ NO GENERIC BOILERPLATES</span>
            <span>✦ IEEE 40+ PAGE REPORTS</span>
            <span>★ GUARANTEED ANYDESK LAPTOP SETUP</span>
            <span>✦ 30+ VIVA DEFENSE QUESTIONS</span>
            <span>★ ₹4,000 STANDARD & ₹5,000 FULL SUPPORT</span>
            <span>✦ STUDENT CONCESSIONS & DISCOUNTS</span>
            <span>★ BACKBLAZE B2 VAULT</span>
          </div>
        </div>
      </div>

      {/* CONTINUOUS MARQUEE TICKER 2 (Solid Black with gradient fade mask) */}
      <div className="bg-[#0A0A0A] text-white py-3 border-b border-black/20 overflow-hidden font-mono uppercase text-xs tracking-widest select-none marquee-mask relative z-10">
        <div className="marquee-container">
          <div className="marquee-content gap-10 items-center">
            <span className="text-[#CCFF00]">AI / MACHINE LEARNING</span>
            <span className="text-white/30">•</span>
            <span className="text-white">FULL STACK DEVELOPMENT</span>
            <span className="text-white/30">•</span>
            <span className="text-[#FF4D8D]">IOT TELEMETRY & ESP32</span>
            <span className="text-white/30">•</span>
            <span className="text-[#CCFF00]">MOBILE APPLICATIONS</span>
            <span className="text-white/30">•</span>
            <span className="text-white">WEBRTC SFU ARCHITECTURES</span>
            <span className="text-white/30">•</span>
            <span className="text-[#FF4D8D]">ALGORITHMIC RESEARCH</span>
            <span className="text-white/30">•</span>
            {/* Duplicate for infinite loop */}
            <span className="text-[#CCFF00]">AI / MACHINE LEARNING</span>
            <span className="text-white/30">•</span>
            <span className="text-white">FULL STACK DEVELOPMENT</span>
            <span className="text-white/30">•</span>
            <span className="text-[#FF4D8D]">IOT TELEMETRY & ESP32</span>
            <span className="text-white/30">•</span>
            <span className="text-[#CCFF00]">MOBILE APPLICATIONS</span>
            <span className="text-white/30">•</span>
            <span className="text-white">WEBRTC SFU ARCHITECTURES</span>
            <span className="text-white/30">•</span>
            <span className="text-[#FF4D8D]">ALGORITHMIC RESEARCH</span>
          </div>
        </div>
      </div>
    </section>
  );
}
