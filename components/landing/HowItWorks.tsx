"use client";

import React from "react";
import {
  FileText,
  MessageSquare,
  CheckCircle2,
  Laptop,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Users2,
  Tag,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "PROPOSE & CHOOSE PLAN",
      badge: "STEP ONE",
      cardBg: "bg-white",
      textColor: "text-black",
      description: "Submit your university problem statement, faculty synopsis, and select your tier: Standard Plan (₹4,000) for source code & report, or Premium Support (₹5,000) for complete live setup and viva defense.",
      highlight: "₹4,000 / ₹5,000 Fixed Plans",
    },
    {
      num: "02",
      title: "SCOPE & CONCESSION REVIEW",
      badge: "STEP TWO",
      cardBg: "bg-[#FF4D00]",
      textColor: "text-white",
      description: "Our technical team reviews your syllabus and faculty requirements. Connect directly with our team to adjust scope and apply student group discounts before locking your price.",
      highlight: "Student Group Discounts",
    },
    {
      num: "03",
      title: "DEVELOPMENT & 2-STEP TEST",
      badge: "STEP THREE",
      cardBg: "bg-[#CCFF00]",
      textColor: "text-black",
      description: "Senior developers implement your custom architecture from scratch. Every project passes strict dual-pass verification: internal unit & integration benchmarking, followed by your review.",
      highlight: "Plagiarism-Free IEEE Code",
    },
    {
      num: "04",
      title: "ANYDESK LIVE SETUP & VIVA PREP",
      badge: "STEP FOUR",
      cardBg: "bg-[#0047FF]",
      textColor: "text-white",
      description: "We connect remotely via AnyDesk / Google Meet to install dependencies and execute the project live on your laptop without any errors. Plus receive your viva PPT and 30+ oral defense Q&A guide.",
      highlight: "Guaranteed Live Laptop Run",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-28 bg-[#FBF8F1] text-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black text-[#CCFF00] font-black text-xs uppercase rounded-full shadow-sm mb-3 sm:mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#CCFF00] animate-pulse" />
            <span>THE 4-STEP ACADEMIC LIFECYCLE</span>
          </div>
          <h2 className="text-3xl sm:text-6xl font-black text-black tracking-tighter uppercase leading-[0.95]">
            HOW NOTX <br />
            <span className="bg-[#CCFF00] text-black px-4 py-1.5 inline-block -rotate-1 rounded-2xl shadow-soft mt-1">
              ACTUALLY WORKS.
            </span>
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-lg font-bold text-black/70 max-w-xl mx-auto">
            Zero ambiguity. Total transparency. From synopsis submission to final university defense.
          </p>
        </div>

        {/* Mobile Horizontal Snap Stepper + PC 4-Column Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 md:overflow-visible scrollbar-none">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className={`group ${s.cardBg} ${s.textColor} p-6 sm:p-9 rounded-3xl border border-black/10 shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between w-[82vw] sm:w-[280px] shrink-0 snap-center md:w-auto md:shrink md:snap-align-none`}
            >
              <div>
                {/* Header with Step Badge and Number */}
                <div className="flex items-center justify-between mb-3 sm:mb-4 border-b border-black/10 pb-3">
                  <span className="px-3 py-1 bg-black text-white font-black text-[9px] sm:text-[10px] uppercase tracking-wider rounded-full">
                    {s.badge}
                  </span>
                  <span className="text-3xl sm:text-5xl font-black tracking-tighter opacity-90 font-mono transition-transform duration-300 group-hover:scale-110">
                    {s.num}
                  </span>
                </div>

                <h3 className="text-base sm:text-xl font-black tracking-tight uppercase mb-2 sm:mb-3 leading-snug">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold opacity-85 leading-relaxed mb-4 sm:mb-6">
                  {s.description}
                </p>
              </div>

              <div className="pt-3 border-t border-black/10">
                <span className="inline-block px-3 py-1 bg-black text-[#CCFF00] font-black text-[9px] sm:text-[10px] uppercase tracking-wider rounded-full shadow-sm">
                  {s.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Guidance Note */}
        <div className="flex md:hidden items-center justify-center gap-2 text-black/60 text-xs font-bold mt-1">
          <span>← Swipe to follow the 4-step process →</span>
        </div>

        {/* Bottom CTA Block with modern styling */}
        <div className="mt-10 sm:mt-14 p-6 sm:p-9 bg-[#0A0A0A] text-white rounded-3xl border border-white/10 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#CCFF00] text-black rounded-2xl flex items-center justify-center font-black text-xl sm:text-2xl shrink-0 shadow-md">
              ⚡
            </div>
            <div>
              <h4 className="text-base sm:text-xl font-black uppercase text-white">
                Ready to Initiate Your Project Requirement?
              </h4>
              <p className="text-xs sm:text-sm text-white/70 font-semibold mt-0.5">
                Takes 2 minutes. Receive your itemized proposal and negotiate with our technical lead within hours.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="w-full sm:w-auto px-7 py-3.5 sm:py-4 bg-[#CCFF00] text-black font-black text-xs uppercase tracking-wider rounded-full shadow-md hover:bg-white hover:text-black transition-all duration-300 text-center shrink-0"
          >
            Submit Proposal &amp; Select Plan &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
