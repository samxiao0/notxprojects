"use client";

import React from "react";
import { Check, Clock, Code, FileCheck, Layers, PlayCircle, Shield } from "lucide-react";

export default function Process() {
  const phases = [
    {
      title: "1. Scope & Requirements",
      description: "Define dataset requirements, mathematical state space, wireframes, and project constraints.",
      items: ["Problem Formulation", "Tech Stack Finalization", "Feasibility Assessment"],
    },
    {
      title: "2. Architecture & Design",
      description: "Design modular component hierarchies, database schemas, and API contracts.",
      items: ["Database Normalization", "System Topology Diagrams", "Wireframes & Mockups"],
    },
    {
      title: "3. Sprint Development",
      description: "Iterative programming with transparent task boards, continuous code commits, and testing.",
      items: ["Core Algorithm Implementation", "Frontend/Backend Integration", "Hardware Sensor Interfacing"],
    },
    {
      title: "4. Testing & Verification",
      description: "Rigorous unit testing, validation scripts, accuracy benchmarking, and stress tests.",
      items: ["Automated Test Suites", "Performance Benchmarking", "Plagiarism & Originality Audit"],
    },
    {
      title: "5. Final Handoff & Walkthrough",
      description: "Complete deliverable packaging, comprehensive report drafting, and 1-on-1 walkthrough video.",
      items: ["IEEE Format Documentation", "Docker Compose Package", "Video Demonstration"],
    },
  ];

  return (
    <section id="process" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3">
            Engineering Lifecycle
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Development Process
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            A disciplined, academic-standard software development lifecycle that leaves zero room for eleventh-hour surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {phases.map((p, idx) => (
            <div
              key={p.title}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 flex flex-col justify-between hover:shadow-card hover:border-blue-300 transition-all"
            >
              <div>
                <div className="text-xs font-bold text-blue-600 mb-2 uppercase tracking-wide">
                  Phase 0{idx + 1}
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {p.description}
                </p>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-slate-100">
                {p.items.map((item) => (
                  <div key={item} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                    <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
