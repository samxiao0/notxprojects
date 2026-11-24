"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Sparkles, HelpCircle } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is the project code guaranteed to be 100% original?",
      a: "Yes, absolutely. All projects developed through NOTX are written from scratch specifically for your project synopsis. Every deliverable comes with clean git commit histories and passes Turnitin, Codequiry, and university code plagiarism checks.",
    },
    {
      q: "What is the difference between the ₹4,000 and ₹5,000 plans?",
      a: "The Standard Plan (₹4,000) provides complete working source code, a 40+ page IEEE report, database seed, and execution manual for self-installation. The Premium Support Plan (₹5,000) adds remote screen-share AnyDesk laptop installation, customized PPT presentation slides, 30+ viva defense oral exam Q&A, and unlimited revisions.",
    },
    {
      q: "Can I negotiate the price or get a student group discount?",
      a: "Yes! Cost should never hold back an engineering student. When you reach out via our consultation desk or WhatsApp (+91 9000639955), you can request concessions for multi-member student groups (2+ members) or grant limits, and our team will formulate an official concession.",
    },
    {
      q: "How does the AnyDesk Remote Laptop Setup work?",
      a: "For Premium Support students, an engineer connects remotely via AnyDesk or Google Meet. We install all dependencies (Python, Node.js, Docker, CUDA, libraries) and verify the code compiles and runs live on your machine with zero errors so you can demonstrate it without fear during your viva.",
    },
    {
      q: "How can I contact NOTX directly?",
      a: "You can WhatsApp or call our team directly at +91 9000639955 or email us at projects.notx@gmail.com. We respond within 4 hours to review your synopsis and verify feasibility.",
    },
    {
      q: "How are files stored and delivered securely?",
      a: "NOTX integrates Backblaze B2 cloud storage. Deliverables, zip archives, and IEEE reports are provided directly via secure 1-click cloud download links.",
    },
  ];

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#FBF8F1] text-black relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black text-[#CCFF00] font-black text-xs uppercase rounded-full shadow-sm mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#CCFF00]" />
            <span>CLARITY & HONESTY</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-black tracking-tighter uppercase leading-[0.95]">
            FREQUENTLY <br />
            <span className="bg-[#CCFF00] text-black px-4 py-1.5 inline-block -rotate-1 rounded-2xl shadow-soft mt-1">
              ANSWERED QUESTIONS.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg font-bold text-black/70 max-w-xl mx-auto">
            Everything you need to know about our ₹4k/₹5k plans, AnyDesk live setup, and student concessions.
          </p>
        </div>

        {/* Sleek Modern Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className={`rounded-2xl border border-black/10 shadow-md transition-all duration-300 overflow-hidden ${
                  isOpen ? "bg-white shadow-xl ring-2 ring-[#CCFF00]/60" : "bg-white hover:bg-slate-50"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className={`w-full py-5 px-6 sm:px-7 flex items-center justify-between text-left transition-colors ${
                    isOpen ? "bg-[#CCFF00] text-black" : ""
                  }`}
                >
                  <span className="font-black text-base sm:text-lg tracking-tight uppercase pr-4">
                    {faq.q}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-black shrink-0 transition-transform duration-300">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#CCFF00]" /> : <ChevronDown className="w-4 h-4 text-white" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="p-6 sm:p-7 bg-white text-xs sm:text-sm font-semibold text-black/90 leading-relaxed border-t border-black/5 animate-in slide-in-from-top-1 duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
