"use client";

import React, { useState } from "react";
import {
  Layers,
  ArrowRight,
  Code2,
  Cpu,
  Globe,
  Sparkles,
  CheckCircle2,
  Tag,
  Star,
  Eye,
  X,
  FileText,
  Laptop,
  Check,
} from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  planTier: string;
  planName: string;
  description: string;
  fullOverview: string;
  techStack: string[];
  deliverables: string[];
  ieeeChapters: string[];
  status: string;
  color: string;
}

export default function ExploreProjects() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const projects: ProjectItem[] = [
    {
      id: "proj-101",
      title: "Autonomous Drone Obstacle Avoidance via Deep Q-Learning",
      category: "AI/ML",
      planTier: "premium_5000",
      planName: "Premium Support (₹5,000)",
      description: "Reinforcement learning pipeline simulated in AirSim & PyBullet for quadcopter navigation with depth-map obstacle inputs.",
      fullOverview: "Custom deep reinforcement learning framework using Double DQN and Prioritized Experience Replay. Simulates multi-rotor dynamics across obstacle fields with sensory depth maps, achieving 98.4% collision-free waypoint transit.",
      techStack: ["Python", "PyTorch", "AirSim", "OpenCV", "ROS2", "Next.js"],
      deliverables: [
        "Pre-trained PyTorch Weights Loader",
        "ROS2 Sensor Integration Node",
        "42-Page Report",
        "PowerPoint Presentation Deck (25 Slides)",
        "30+ Viva Oral Exam Q&A Sheet",
        "AnyDesk Remote Laptop Setup Guarantee",
      ],
      ieeeChapters: [
        "1. Abstract & Problem Formulation",
        "2. Related Works & Mathematical Background",
        "3. Deep Q-Network Architecture & Reward Functions",
        "4. AirSim Simulation Environment & Sensor Ingestion",
        "5. Experimental Benchmarks & Convergence Graphs",
        "6. Conclusion & Future Aerial Robotics Scope",
      ],
      status: "Verified & Production Tested",
      color: "bg-[#CCFF00]",
    },
    {
      id: "proj-102",
      title: "Smart Agri-IoT Microclimate Monitoring & Irrigation Control",
      category: "IoT",
      planTier: "premium_5000",
      planName: "Premium Support (₹5,000)",
      description: "Multi-sensor mesh network (ESP32/LoRaWAN) streaming soil humidity, solar flux, and telemetry to automated solenoid valves.",
      fullOverview: "Field-deployable hardware telemetry system. Uses low-power ESP32 nodes with LoRaWAN gateways to publish sensor metrics via MQTT brokers to a time-series InfluxDB database and real-time dashboard.",
      techStack: ["C++", "ESP32", "LoRaWAN", "MQTT", "Node.js", "InfluxDB"],
      deliverables: [
        "Complete Microcontroller C++ Firmware",
        "MQTT Broker & InfluxDB Telemetry Pipeline",
        "Real-Time Responsive Web Dashboard",
        "Circuit Schematic & Wiring Diagrams",
        "40+ Report",
        "AnyDesk Remote Laptop Setup & Live Run",
      ],
      ieeeChapters: [
        "1. Agricultural Water Conservation Overview",
        "2. Microcontroller & LoRaWAN Topologies",
        "3. Sensor Interfacing & Power Optimization",
        "4. Telemetry Broker & Data Pipeline",
        "5. Automated Solenoid Valve Actuation Logic",
        "6. Field Results & Water Conservation Metrics",
      ],
      status: "Hardware Calibrated & Verified",
      color: "bg-[#FFE500]",
    },
    {
      id: "proj-103",
      title: "Healthcare WebRTC Telemedicine Platform with EHR",
      category: "Full Stack",
      planTier: "standard_4000",
      planName: "Standard Plan (₹4,000)",
      description: "Video consultation system with FHIR electronic health records, end-to-end encrypted messaging, and PDF prescription generation.",
      fullOverview: "Production-grade medical consultation architecture utilizing WebRTC Selective Forwarding Units (SFU) for low-latency multi-party video. Integrated with encrypted PostgreSQL medical history vaults and automated PDF generation.",
      techStack: ["Next.js", "WebRTC SFU", "PostgreSQL", "Docker", "TailwindCSS"],
      deliverables: [
        "Clean Modular TypeScript & React Codebase",
        "Docker Compose Production Deployment Scripts",
        "PostgreSQL Schemas with Seed Data",
        "Automated PDF Prescription Generator",
        "40-Page IEEE Architecture Dissertation",
        "Step-by-Step Dependency Installation Readme",
      ],
      ieeeChapters: [
        "1. Telemedicine & FHIR Standards",
        "2. WebRTC SFU Mesh vs Selective Forwarding",
        "3. Cryptographic Storage of Patient Records",
        "4. Relational Database Normalization",
        "5. Security Audits & Latency Benchmarks",
        "6. Deployment on Docker & Cloud Infrastructure",
      ],
      status: "Dockerized & Plagiarism Free",
      color: "bg-white",
    },
    {
      id: "proj-104",
      title: "Edge Vision Defect Detection on Edge TPU Accelerator",
      category: "AI/ML",
      planTier: "standard_4000",
      planName: "Standard Plan (₹4,000)",
      description: "Industrial surface inspection pipeline performing real-time microscopic flaw classification at 120 FPS on Raspberry Pi 5 with Coral TPU.",
      fullOverview: "Quantized deep convolutional neural network deployed on Google Coral Edge TPU coprocessors. Processes high-speed camera feeds with 8-bit integer inference, tagging microscopic manufacturing defects with 99.2% accuracy.",
      techStack: ["TensorRT", "Edge TPU", "FastAPI", "Python", "React"],
      deliverables: [
        "Quantized INT8 Model Compiled for Edge TPU",
        "FastAPI High-Speed Video Stream Server",
        "Benchmark Latency & Confusion Matrix Scripts",
        "Interactive React Flaw Inspection Frontend",
        "40+ Page IEEE Hardware Acceleration Report",
        "Full Git Commit History & Execution Manual",
      ],
      ieeeChapters: [
        "1. Industrial Quality Assurance Challenges",
        "2. Quantization-Aware Deep Learning Models",
        "3. Edge TPU Matrix Multiplication Engine",
        "4. Real-Time Video Ingestion Pipeline",
        "5. Accuracy vs Latency Benchmark Results",
        "6. University Viva Defense Oral Q&A Summary",
      ],
      status: "Benchmarked 120 FPS",
      color: "bg-[#FF4D8D]",
    },
  ];

  const categories = ["ALL", "AI/ML", "Full Stack", "IoT"];

  const filtered =
    selectedCategory === "ALL"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-16 sm:py-28 bg-[#0D3B2E] text-white relative overflow-hidden">
      {/* Ambient background glow orb */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-[#CCFF00]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 -right-32 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#CCFF00] text-black font-black text-xs uppercase rounded-full shadow-sm mb-3 sm:mb-4">
              <Star className="w-3.5 h-3.5 fill-black animate-spin-slow" />
              <span>CAPSTONE PROJECT SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-[0.95]">
              PROVEN ACADEMIC <br />
              <span className="text-[#CCFF00]">DELIVERABLES.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-base font-bold text-white/80 max-w-md bg-black/30 p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-white/10 backdrop-blur-sm">
            Inspect real university projects built by our engineering network. Each project is complete with tested code, IEEE documentation, and guaranteed viva readiness.
          </p>
        </div>

        {/* Filter Pills with smooth modern transitions */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 sm:mb-10 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 font-black text-xs uppercase tracking-wider rounded-full whitespace-nowrap transition-all duration-300 ${selectedCategory === cat
                ? "bg-[#CCFF00] text-black shadow-glow-lime scale-105"
                : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                }`}
            >
              {cat === "ALL" ? "ALL PROJECTS" : cat}
            </button>
          ))}
        </div>

        {/* Responsive Mobile Horizontal Snap Carousel + PC 2-Column Grid */}
        {/* On Mobile: Swipe horizontally (compact card height, snap scroll) */}
        {/* On PC: Expansive 2-Column Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible scrollbar-none">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              className={`group ${proj.color} text-black p-6 sm:p-9 rounded-3xl border border-black/10 shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between w-[85vw] sm:w-[380px] shrink-0 snap-center md:w-auto md:shrink md:snap-align-none`}
            >
              <div>
                {/* Header Tag Bar */}
                <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4 flex-wrap">
                  <span className="px-3 py-1 bg-black text-white font-black text-[10px] sm:text-[11px] uppercase tracking-wider rounded-full">
                    {proj.category}
                  </span>
                  <span className="px-3 py-1 bg-white text-black font-extrabold text-[10px] sm:text-[11px] uppercase rounded-full shadow-sm border border-black/10">
                    {proj.planName}
                  </span>
                </div>

                <h3 className="text-lg sm:text-2xl font-black text-black tracking-tight leading-snug mb-2 sm:mb-3">
                  {proj.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-black/80 leading-relaxed mb-4 sm:mb-6 line-clamp-3 md:line-clamp-none">
                  {proj.description}
                </p>

                {/* Tech Stack Chips */}
                <div className="mb-4 sm:mb-6">
                  <span className="text-[10px] font-black uppercase text-black/60 block mb-1.5 tracking-wider">
                    Core Technologies:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-black/10 text-black font-extrabold text-[10px] sm:text-[11px] rounded-lg border border-black/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Deliverables Summary */}
                <div className="p-3.5 sm:p-4 bg-white/90 rounded-2xl border border-black/10 space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 text-xs font-bold shadow-sm">
                  <span className="text-[10px] uppercase font-black text-black/60 block mb-0.5">
                    Guaranteed Deliverables:
                  </span>
                  {proj.deliverables.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-black text-[11px] sm:text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                  {proj.deliverables.length > 3 && (
                    <div className="text-[10px] font-black text-black/60 pt-0.5">
                      + {proj.deliverables.length - 3} more deliverables included
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Card Action: View Full Specification Modal Trigger */}
              <div className="pt-3 sm:pt-4 border-t border-black/15 flex items-center justify-between gap-2">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-black/80">
                  {proj.status}
                </span>
                <button
                  onClick={() => setActiveModalProject(proj)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-black text-[#CCFF00] font-black text-xs uppercase rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-sm shrink-0"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View Spec &amp; Report
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Guidance Note */}
        <div className="flex md:hidden items-center justify-center gap-2 text-white/60 text-xs font-bold mt-2">
          <span>← Swipe to explore other project specs →</span>
        </div>

        {/* Bottom Banner */}
        <div className="mt-10 sm:mt-14 p-6 sm:p-9 bg-[#CCFF00] text-black rounded-3xl border border-black/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg sm:text-2xl font-black uppercase tracking-tight">
              Have a Unique Custom Academic Requirement?
            </h4>
            <p className="text-xs sm:text-sm font-bold text-black/80 mt-1 max-w-xl">
              From quantum algorithms to specialized hardware micro-controllers, our technical team will review your faculty synopsis and formulate an itemized proposal.
            </p>
          </div>
          <a
            href="#contact"
            className="w-full md:w-auto px-7 py-4 bg-black text-white font-black text-xs uppercase tracking-wider rounded-full shadow-md hover:bg-white hover:text-black hover:shadow-lg transition-all duration-300 text-center shrink-0"
          >
            Submit Custom Synopsis &rarr;
          </a>
        </div>
      </div>

      {/* INTERACTIVE PROJECT SPECIFICATION MODAL (Desktop & Mobile Optimized) */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white text-black w-full max-w-2xl max-h-[90vh] rounded-3xl p-6 sm:p-8 overflow-y-auto shadow-2xl relative border border-black/10">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-black/10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-black text-white font-black text-[10px] uppercase rounded-full">
                    {activeModalProject.category}
                  </span>
                  <span className="px-3 py-1 bg-[#CCFF00] text-black font-black text-[10px] uppercase rounded-full border border-black/10">
                    {activeModalProject.planName}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
                  {activeModalProject.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors shrink-0"
                aria-label="Close specification modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-5 space-y-5 text-xs sm:text-sm">
              {/* Architectural Overview */}
              <div>
                <h4 className="font-black uppercase tracking-wider text-black text-xs mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#FF4D00]" />
                  System Architecture &amp; Methodology
                </h4>
                <p className="font-semibold text-black/80 leading-relaxed bg-[#FBF8F1] p-4 rounded-2xl border border-black/5">
                  {activeModalProject.fullOverview}
                </p>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="font-black uppercase tracking-wider text-black text-xs mb-2">
                  Technical Stack &amp; Libraries
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-black text-[#CCFF00] font-black text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Complete Deliverables */}
              <div>
                <h4 className="font-black uppercase tracking-wider text-black text-xs mb-2">
                  All Included Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-[#FBF8F1] p-4 rounded-2xl border border-black/5">
                  {activeModalProject.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs font-bold text-black">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 40+ Page IEEE Report Table of Contents */}
              <div>
                <h4 className="font-black uppercase tracking-wider text-black text-xs mb-2 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-blue-600" />
                  40+ Page IEEE Manuscript Outline
                </h4>
                <div className="space-y-1.5 bg-[#FBF8F1] p-4 rounded-2xl border border-black/5 font-mono text-xs font-bold text-black/80">
                  {activeModalProject.ieeeChapters.map((ch, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-[#FF4D00]">▸</span>
                      <span>{ch}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-4 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs font-bold text-black/60 text-center sm:text-left">
                Ready to develop or customize this project?
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={`#contact`}
                  onClick={() => setActiveModalProject(null)}
                  className="w-full sm:w-auto px-6 py-3 bg-[#CCFF00] text-black font-black text-xs uppercase rounded-full shadow-md hover:bg-black hover:text-[#CCFF00] transition-all duration-200 text-center"
                >
                  Inquire This Topic &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
