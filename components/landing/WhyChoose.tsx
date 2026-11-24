"use client";

import React from "react";
import { ShieldCheck, Award, MessageSquare, Database, Users, Check } from "lucide-react";

export default function WhyChoose() {
  const points = [
    {
      icon: Award,
      title: "Academic Grade Standard",
      description: "Code written to meet IEEE, ACM, and top-tier university evaluation rubrics with clean modular architecture and unit tests.",
    },
    {
      icon: ShieldCheck,
      title: "Milestone-Gated Trust",
      description: "You never pay everything upfront. Release approvals only when each concrete milestone (UI, algorithm, testing) is verified.",
    },
    {
      icon: Database,
      title: "Backblaze B2 Direct Vault",
      description: "Deliverables, large datasets, and multi-gigabyte neural weights are stored securely on S3-compatible B2 with pre-signed direct URLs.",
    },
    {
      icon: MessageSquare,
      title: "Real-Time Direct Collaboration",
      description: "No middleman delays. Built-in instant messaging, shared notes, and task comments directly with your assigned senior engineer.",
    },
    {
      icon: Users,
      title: "Vetted Developer Network",
      description: "Every developer undergoes rigorous technical screening, background verification, and administrative clearance before joining NOTX.",
    },
    {
      icon: Check,
      title: "Plagiarism-Free & Fully Original",
      description: "Every line of code and research report is engineered from scratch with clean git commit history and citation integrity.",
    },
  ];

  return (
    <section id="why-choose" className="py-20 bg-slate-50/70 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3">
            The NOTX Advantage
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Students & Researchers Choose NOTX
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Engineered specifically to solve the uncertainty and stress of academic capstones, master's theses, and complex technical deliverables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {points.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs hover:shadow-card hover:border-blue-200 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
