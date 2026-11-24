"use client";

import React from "react";
import {
  Laptop,
  FileText,
  HelpCircle,
  Video,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function VivaDefenseHub() {
  const defenseItems = [
    {
      title: "GUARANTEED LIVE LAPTOP SETUP",
      icon: Laptop,
      badge: "ANYDESK SCREEN-SHARE",
      cardBg: "bg-[#CCFF00]",
      textColor: "text-black",
      description: "Our engineers connect remotely to your personal laptop via AnyDesk or Google Meet. We install dependencies (Node, Python, CUDA, Docker, libraries) and verify the project compiles and runs live with zero syntax or runtime errors.",
    },
    {
      title: "ACADEMIC PRESENTATION SLIDES (PPT)",
      icon: FileText,
      badge: "EDITABLE PPTX DECK",
      cardBg: "bg-white",
      textColor: "text-black",
      description: "Ready-to-present, beautifully formatted PowerPoint presentation deck covering problem synopsis, proposed architecture diagrams, database DFDs, benchmark results, and live demo captures matching college guidelines.",
    },
    {
      title: "30+ VIVA DEFENSE QUESTIONS & ANSWERS",
      icon: HelpCircle,
      badge: "ORAL EXAM DEFENSE GUIDE",
      cardBg: "bg-[#FFE500]",
      textColor: "text-black",
      description: "Curated oral defense sheet containing 30+ commonly asked viva questions: algorithm mathematical justification, stack trade-offs, edge case handling, and examiner trick questions with model responses.",
    },
    {
      title: "1-ON-1 CODE ARCHITECTURE WALKTHROUGH",
      icon: Video,
      badge: "30-MIN COACHING CALL",
      cardBg: "bg-[#FF4D8D]",
      textColor: "text-white",
      description: "Private 1-on-1 session with your assigned senior developer explaining how backend controllers, database schemas, frontend components, and APIs connect, enabling you to explain any code snippet confidently.",
    },
  ];

  return (
    <section id="viva-defense" className="py-16 sm:py-28 bg-[#7928CA] text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#CCFF00] text-black font-black text-xs uppercase rounded-full shadow-sm mb-3 sm:mb-4">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>ACADEMIC DEFENSE ASSURANCE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-[0.95]">
              WE DON&apos;T JUST DUMP CODE. <br />
              <span className="text-[#CCFF00]">WE GUARANTEE YOUR VIVA.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-base font-bold text-white max-w-md bg-black/30 p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-white/20 backdrop-blur-sm">
            Included automatically in our ₹5,000 Premium Support Plan. Zero anxiety on presentation day.
          </p>
        </div>

        {/* Mobile Horizontal Snap Track + PC 2-Column Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible scrollbar-none">
          {defenseItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`group ${item.cardBg} ${item.textColor} p-6 sm:p-9 rounded-3xl border border-black/10 shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between w-[82vw] sm:w-[380px] shrink-0 snap-center md:w-auto md:shrink md:snap-align-none`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black text-white rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#CCFF00]" />
                    </div>
                    <span className="px-3 py-1 bg-black text-white font-black text-[9px] sm:text-[10px] uppercase tracking-wider rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-2xl font-black uppercase tracking-tight mb-2 sm:mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold opacity-90 leading-relaxed mb-4 sm:mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-black/15 flex items-center justify-between text-xs font-black uppercase">
                  <span>✓ 100% Guaranteed Outcome</span>
                  <span className="px-3 py-1 bg-black text-white rounded-full">
                    Tier 2 Pack
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Swipe Guidance Note */}
        <div className="flex md:hidden items-center justify-center gap-2 text-white/60 text-xs font-bold mt-1">
          <span>← Swipe to view viva defense deliverables →</span>
        </div>

        {/* Bottom Callout */}
        <div className="mt-10 sm:mt-14 p-6 sm:p-9 bg-[#CCFF00] text-black rounded-3xl border border-black/10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black text-[#CCFF00] rounded-2xl flex items-center justify-center font-black text-xl shrink-0 shadow-md">
              🎓
            </div>
            <div>
              <h4 className="text-base sm:text-xl font-black uppercase text-black">
                Need Both Code &amp; Full Viva Coaching?
              </h4>
              <p className="text-xs sm:text-sm font-bold text-black/80 mt-0.5">
                Choose the Premium Support Plan (₹5,000) for guaranteed AnyDesk setup, editable presentation PPT, and 30+ viva Q&amp;A.
              </p>
            </div>
          </div>
          <a
            href="#pricing"
            className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-black text-white font-black text-xs uppercase tracking-wider rounded-full shadow-md hover:bg-white hover:text-black transition-all duration-300 text-center shrink-0"
          >
            Select Premium Support (₹5,000) &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
