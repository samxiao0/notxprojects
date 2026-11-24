"use client";

import React, { useState } from "react";
import {
  Check,
  ArrowRight,
  ShieldCheck,
  Laptop,
  FileText,
  HelpCircle,
  Tag,
  Star,
  MessageSquare,
  Table,
  Layers,
} from "lucide-react";

export default function PricingPlans() {
  const [activeTab, setActiveTab] = useState<"both" | "standard" | "premium" | "compare">("both");

  // 6 Core Consolidated Comparison Dimensions (compact row height)
  const comparisonFeatures = [
    {
      feature: "Complete Modular Source Code",
      standard: "Included (GitHub Repo)",
      premium: "Included (GitHub Repo)",
      highlight: true,
      diff: false,
    },
    {
      feature: "IEEE Formatted Report (40+ Pages)",
      standard: "Included (PDF + Word)",
      premium: "Included (PDF + Word)",
      highlight: true,
      diff: false,
    },
    {
      feature: "Remote AnyDesk Live Laptop Setup",
      standard: "Self-Install Manual",
      premium: "Guaranteed Live Remote Run",
      highlight: true,
      diff: true,
    },
    {
      feature: "Custom Presentation Slides (PPT)",
      standard: "Optional Add-on",
      premium: "Editable 25+ Slides Deck",
      highlight: true,
      diff: true,
    },
    {
      feature: "30+ Viva Oral Exam Q&A Sheet",
      standard: "Optional Add-on",
      premium: "Included with Model Answers",
      highlight: true,
      diff: true,
    },
    {
      feature: "Revision & Sign-Off Guarantee",
      standard: "2 Rounds of Minor Fixes",
      premium: "Unlimited Until Faculty Approval",
      highlight: false,
      diff: true,
    },
  ];

  return (
    <section id="pricing" className="py-6 sm:py-8 lg:py-10 bg-[#FBF8F1] text-black relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Streamlined Compact Header - Fits in 1 Viewport */}
        <div className="text-center max-w-2xl mx-auto mb-3 sm:mb-4">

          <h2 className="text-xl sm:text-3xl lg:text-3xl font-black text-black tracking-tight uppercase leading-none">
            TWO FLAT PLANS. <span className="bg-[#CCFF00] text-black px-2 py-0.5 rounded-lg shadow-soft">ZERO SURPRISES.</span>
          </h2>
          <p className="mt-1 text-[11px] sm:text-xs font-bold text-black/70 max-w-lg mx-auto">
            Choose self-sufficient source code or upgrade to complete remote AnyDesk live setup and viva oral defense coaching.
          </p>
        </div>

        {/* Compact Segmented Plan Switcher */}
        <div className="flex items-center justify-center mb-3 sm:mb-4">
          <div className="bg-black/5 p-1 rounded-full border border-black/10 flex items-center gap-1 overflow-x-auto max-w-full scrollbar-none">
            <button
              onClick={() => setActiveTab("both")}
              className={`px-3 sm:px-4 py-1 text-xs font-black uppercase rounded-full transition-all duration-200 whitespace-nowrap flex items-center gap-1 ${activeTab === "both" ? "bg-black text-[#CCFF00] shadow-sm" : "text-black/70 hover:text-black"
                }`}
            >
              <Layers className="w-3 h-3" />
              Both Plans
            </button>
            <button
              onClick={() => setActiveTab("standard")}
              className={`px-3 sm:px-4 py-1 text-xs font-black uppercase rounded-full transition-all duration-200 whitespace-nowrap ${activeTab === "standard" ? "bg-black text-[#CCFF00] shadow-sm" : "text-black/70 hover:text-black"
                }`}
            >
              Standard (₹4k)
            </button>
            <button
              onClick={() => setActiveTab("premium")}
              className={`px-3 sm:px-4 py-1 text-xs font-black uppercase rounded-full transition-all duration-200 whitespace-nowrap ${activeTab === "premium" ? "bg-black text-[#CCFF00] shadow-sm" : "text-black/70 hover:text-black"
                }`}
            >
              Premium (₹5k)
            </button>
            <button
              onClick={() => setActiveTab("compare")}
              className={`px-3 sm:px-4 py-1 text-xs font-black uppercase rounded-full transition-all duration-200 whitespace-nowrap flex items-center gap-1 ${activeTab === "compare" ? "bg-black text-[#CCFF00] shadow-sm" : "text-black/70 hover:text-black"
                }`}
            >
              <Table className="w-3 h-3" />
              Compare Matrix
            </button>
          </div>
        </div>

        {/* Dual Plan Cards - Compact Single Viewport Layout */}
        {activeTab !== "compare" && (
          <div
            className={`grid gap-3 sm:gap-4 max-w-4xl mx-auto items-stretch ${activeTab === "both" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 max-w-md"
              }`}
          >
            {/* PLAN 1: STANDARD PLAN (₹4,000) */}
            {(activeTab === "both" || activeTab === "standard") && (
              <div className="bg-white text-black rounded-2xl border border-black/10 p-4 sm:p-5 shadow-lg hover:shadow-xl transition-all duration-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 bg-black text-white font-black text-[9px] uppercase tracking-wider rounded-full">
                      TIER 01 • CODE &amp; REPORT
                    </span>
                    <span className="text-[10px] font-bold text-black/60 uppercase">
                      Self-Install Manual
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between gap-2 mb-1.5">
                    <h3 className="text-lg lg:text-xl font-black tracking-tight uppercase">
                      Standard Plan
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-black tracking-tighter">
                        ₹4,000
                      </span>
                      <span className="text-[10px] font-bold text-black/50 uppercase">
                        INR
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] font-semibold text-black/70 mb-2.5 leading-snug">
                    Complete modular source code and 40+ page IEEE report for independent execution and viva defense.
                  </p>

                  {/* Compact Deliverables List */}
                  <div className="space-y-1 text-xs font-bold text-black border-t border-black/10 pt-2.5">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[3]" />
                      <span><strong>Complete Source Code:</strong> Modular GitHub Repository.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[3]" />
                      <span><strong>40+ Page IEEE Report:</strong> Formatted PDF &amp; Editable Word.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[3]" />
                      <span><strong>Setup Manual &amp; DB Seed:</strong> Step-by-step local scripts.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[3]" />
                      <span><strong>Plagiarism Free Guarantee:</strong> 100% original code.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[3]" />
                      <span><strong>Revision Window:</strong> 2 rounds of minor adjustments.</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-black/10">
                  <a
                    href="#contact"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-4 bg-black text-white font-black text-xs uppercase tracking-wider rounded-full shadow-sm hover:bg-[#CCFF00] hover:text-black transition-all text-center"
                  >
                    Select Standard (₹4,000)
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}

            {/* PLAN 2: PREMIUM SUPPORT PLAN (₹5,000) */}
            {(activeTab === "both" || activeTab === "premium") && (
              <div className="bg-[#FF4D00] text-black rounded-2xl border border-black/10 p-4 sm:p-5 shadow-xl hover:shadow-2xl transition-all duration-200 flex flex-col justify-between relative ring-2 ring-[#CCFF00]/40">
                {/* Compact Recommended Badge */}
                <div className="absolute -top-2.5 right-4 bg-[#CCFF00] text-black px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1 border border-black/10">
                  <Star className="w-2.5 h-2.5 fill-black" />
                  RECOMMENDED • FULL DEFENSE
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 bg-black text-[#CCFF00] font-black text-[9px] uppercase tracking-wider rounded-full">
                      TIER 02 • COMPLETE DEFENSE
                    </span>
                    <span className="text-[10px] font-extrabold text-white uppercase">
                      Live Run Guaranteed
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between gap-2 mb-1.5">
                    <h3 className="text-lg lg:text-xl font-black tracking-tight uppercase text-white">
                      Premium Support
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-white tracking-tighter">
                        ₹5,000
                      </span>
                      <span className="text-[10px] font-bold text-white/70 uppercase">
                        INR
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] font-bold text-white/90 mb-2.5 leading-snug">
                    Everything in Standard + remote AnyDesk installation, academic presentation slides, and viva Q&amp;A.
                  </p>

                  {/* Compact Deliverables List */}
                  <div className="space-y-1 text-xs font-bold text-white border-t border-white/20 pt-2.5">
                    <div className="flex items-center gap-2">
                      <Laptop className="w-3.5 h-3.5 text-[#CCFF00] shrink-0" />
                      <span><strong>Remote AnyDesk Live Setup:</strong> Live run guaranteed on laptop.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-[#CCFF00] shrink-0" />
                      <span><strong>PowerPoint Slides (PPT):</strong> Editable 25+ slides deck.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-3.5 h-3.5 text-[#CCFF00] shrink-0" />
                      <span><strong>30+ Viva Oral Exam Q&amp;A:</strong> Model answers &amp; proofs.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-3.5 h-3.5 text-[#CCFF00] shrink-0" />
                      <span><strong>1-on-1 Code Walkthrough:</strong> Architecture coaching call.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#CCFF00] shrink-0" />
                      <span><strong>Unlimited Revisions:</strong> Full support until sign-off.</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/20">
                  <a
                    href="#contact"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-4 bg-[#CCFF00] text-black font-black text-xs uppercase tracking-wider rounded-full shadow-md hover:bg-white hover:text-black transition-all text-center"
                  >
                    Select Premium (₹5,000)
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ULTRA-COMPACT FEATURE COMPARISON MATRIX (Fits in 1 Screen without Scrolling) */}
        {activeTab === "compare" && (
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-3 sm:p-4 border border-black/10 shadow-lg overflow-hidden animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-black/10 mb-2">
              <div>
                <h3 className="text-sm sm:text-base font-black uppercase tracking-tight">
                  Side-by-Side Feature Matrix
                </h3>
                <p className="text-[10px] sm:text-[11px] font-semibold text-black/60">
                  All 6 key deliverables compared line by line.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("both")}
                className="text-xs font-black uppercase text-black hover:underline"
              >
                &larr; Back to Cards
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-black/10 text-[10px] font-black uppercase tracking-wider text-black">
                    <th className="py-1.5 px-2">Deliverable</th>
                    <th className="py-1.5 px-2 bg-slate-50 rounded-t-lg text-center w-1/3">
                      Standard (₹4,000)
                    </th>
                    <th className="py-1.5 px-2 bg-[#FF4D00]/10 rounded-t-lg text-center text-[#FF4D00] w-1/3">
                      Premium Support (₹5,000)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 font-semibold text-black/85">
                  {comparisonFeatures.map((row, idx) => (
                    <tr
                      key={idx}
                      className={row.diff ? "bg-[#CCFF00]/10" : "hover:bg-slate-50"}
                    >
                      <td className="py-1.5 px-2 font-bold text-black text-xs">
                        {row.feature}
                        {row.diff && (
                          <span className="ml-1.5 text-[8px] font-black uppercase px-1.5 py-0.2 bg-[#FF4D00] text-white rounded-full">
                            Upgrade
                          </span>
                        )}
                      </td>
                      <td className="py-1.5 px-2 text-center bg-slate-50/50 text-xs">
                        {row.standard}
                      </td>
                      <td className="py-1.5 px-2 text-center bg-[#FF4D00]/5 font-black text-black text-xs">
                        {row.premium}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* In-Table Direct CTAs */}
            <div className="mt-2.5 pt-2 border-t border-black/10 flex items-center justify-between gap-3">
              <span className="text-[10px] font-bold text-black/60 hidden sm:inline">
                Both plans include 100% original code &amp; Backblaze B2 storage vault access.
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href="#contact"
                  className="flex-1 sm:flex-none px-3.5 py-1.5 bg-black text-white font-black text-xs uppercase rounded-full hover:bg-slate-800 text-center"
                >
                  Choose ₹4,000
                </a>
                <a
                  href="#contact"
                  className="flex-1 sm:flex-none px-3.5 py-1.5 bg-[#CCFF00] text-black font-black text-xs uppercase rounded-full hover:bg-[#b8e600] text-center"
                >
                  Choose ₹5,000
                </a>
              </div>
            </div>
          </div>
        )}


      </div>
    </section>
  );
}
