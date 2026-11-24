"use client";

import React, { useState } from "react";
import {
  BrainCircuit,
  Layers,
  Globe,
  Smartphone,
  Cpu,
  Code2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function Services() {
  const [activeDomain, setActiveDomain] = useState<number | null>(null);

  const services = [
    {
      title: "AI & MACHINE LEARNING",
      icon: BrainCircuit,
      category: "AI/ML",
      description: "Deep learning models, computer vision, natural language processing, LLMs, reinforcement learning in AirSim/PyBullet, and PyTorch/TensorFlow academic pipelines.",
      technologies: ["PyTorch", "TensorFlow", "OpenCV", "HuggingFace", "Python", "AirSim"],
      badge: "HIGH DEMAND",
      cardColor: "bg-[#CCFF00]",
      textColor: "text-black",
    },
    {
      title: "FULL STACK PLATFORMS",
      icon: Layers,
      category: "Full Stack Development",
      description: "Production-grade multi-tier web platforms with robust relational/NoSQL backends, real-time WebSockets, microservices, and Docker container orchestration.",
      technologies: ["Next.js", "Node.js", "PostgreSQL", "FastAPI", "Docker", "TailwindCSS"],
      badge: "MOST POPULAR",
      cardColor: "bg-white",
      textColor: "text-black",
    },
    {
      title: "WEB APPLICATIONS",
      icon: Globe,
      category: "Web Development",
      description: "High-performance responsive frontends, interactive analytics visualizers, WebGL animations, WebRTC audio/video SFUs, and seamless REST/GraphQL APIs.",
      technologies: ["React", "TypeScript", "Tailwind", "Next.js", "Three.js", "WebRTC"],
      badge: "FAST TURNAROUND",
      cardColor: "bg-[#FF4D8D]",
      textColor: "text-white",
    },
    {
      title: "MOBILE APPLICATIONS",
      icon: Smartphone,
      category: "Mobile Applications",
      description: "Native and cross-platform iOS & Android applications featuring offline-first databases, push notifications, and hardware sensor telemetry integrations.",
      technologies: ["Flutter", "React Native", "Swift", "Kotlin", "SQLite", "Firebase"],
      badge: "IOS & ANDROID",
      cardColor: "bg-[#FFE500]",
      textColor: "text-black",
    },
    {
      title: "IOT & EMBEDDED SYSTEMS",
      icon: Cpu,
      category: "IoT",
      description: "Hardware micro-controller firmware, LoRaWAN mesh networks, MQTT telemetry brokers, smart agricultural sensors, and industrial automation triggers.",
      technologies: ["ESP32", "Arduino", "Raspberry Pi", "MQTT", "C++", "InfluxDB"],
      badge: "HARDWARE LAB",
      cardColor: "bg-[#FBF8F1]",
      textColor: "text-black",
    },
    {
      title: "SOFTWARE ENGINEERING",
      icon: Code2,
      category: "Software Development",
      description: "Algorithmic research, distributed consensus implementations, cryptographic security pipelines, compiler design, and high-throughput systems.",
      technologies: ["Rust", "Go", "C++", "Java", "Linux", "gRPC"],
      badge: "RESEARCH GRADE",
      cardColor: "bg-[#FF4D00]",
      textColor: "text-white",
    },
  ];

  return (
    <section id="services" className="py-16 sm:py-28 bg-[#0047FF] text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black text-[#CCFF00] font-black text-xs uppercase rounded-full shadow-sm mb-3 sm:mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#CCFF00] animate-pulse" />
              <span>DISCIPLINES &amp; EXPERTISE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-[0.95]">
              ENGINEERING <br />
              <span className="text-[#CCFF00]">DOMAINS COVERED.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-base font-bold text-white max-w-md bg-black/30 p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-white/20 backdrop-blur-sm">
            From modern web clouds to micro-controllers and mathematical AI, our developers build across every academic computer science discipline.
          </p>
        </div>

        {/* Mobile Horizontal Snap Track + PC 3-Column Studio Grid */}
        {/* Eliminates endless vertical scroll on mobile screens */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible scrollbar-none">
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`group ${item.cardColor} ${item.textColor} p-6 sm:p-9 rounded-3xl border border-black/10 shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between w-[82vw] sm:w-[360px] shrink-0 snap-center md:w-auto md:shrink md:snap-align-none`}
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

                  <h3 className="text-lg sm:text-2xl font-black tracking-tight uppercase leading-snug mb-2 sm:mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold opacity-85 leading-relaxed mb-4 sm:mb-6 line-clamp-3 md:line-clamp-none">
                    {item.description}
                  </p>

                  {/* Tech stack chips */}
                  <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-6">
                    {item.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-black/10 font-black text-[10px] sm:text-[11px] rounded-lg border border-black/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-black/15 flex items-center justify-between">
                  <span className="text-[10px] sm:text-[11px] font-black uppercase">
                    Fixed: ₹4k / ₹5k
                  </span>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-black text-white font-black text-xs uppercase rounded-full hover:bg-white hover:text-black transition-all duration-200 shadow-sm"
                  >
                    Inquire Domain
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Swipe Guidance Note */}
        <div className="flex md:hidden items-center justify-center gap-2 text-white/60 text-xs font-bold mt-1">
          <span>← Swipe to explore other disciplines →</span>
        </div>
      </div>
    </section>
  );
}
