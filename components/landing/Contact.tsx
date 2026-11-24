"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Sparkles, MessageCircle } from "lucide-react";
import { ProjectCategory } from "@/types";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    institution: "",
    category: "AI/ML" as ProjectCategory,
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#CCFF00] text-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Editorial Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black text-[#CCFF00] font-black text-xs uppercase rounded-full shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              DIRECT CONSULTATION
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tighter uppercase leading-[0.95]">
              DISCUSS YOUR <br />
              <span className="bg-black text-white px-4 py-1.5 inline-block -rotate-1 rounded-2xl shadow-soft mt-1">
                TOPIC WITH US.
              </span>
            </h2>

            <p className="text-sm sm:text-base font-bold text-black/80 leading-relaxed bg-white p-6 rounded-3xl border border-black/10 shadow-xl">
              Need feedback on feasibility, datasets, algorithm architecture, or budget quotation? Leave a brief query or reach out directly on WhatsApp or Email. Our technical team reviews and responds within 4 hours.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-3 font-mono text-xs font-black">
              {/* WhatsApp Quick Chat */}
              <a
                href="https://wa.me/919000639955?text=Hi%20NOTX%2C%20I%20would%20like%20to%20discuss%20my%20academic%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-[#25D366] text-white rounded-2xl shadow-md flex items-center justify-between hover:scale-[1.02] transition-transform duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-[#25D366] flex items-center justify-center font-black">
                    <MessageCircle className="w-6 h-6 fill-[#25D366]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-white/80 block">Direct WhatsApp Chat</span>
                    <span className="text-sm font-bold text-white">+91 9000639955</span>
                  </div>
                </div>
                <span className="text-[11px] bg-white text-[#25D366] px-3 py-1 rounded-full font-black">
                  CHAT NOW &rarr;
                </span>
              </a>

              {/* Direct Email */}
              <a
                href="mailto:projects.notx@gmail.com"
                className="p-4 bg-white rounded-2xl border border-black/10 shadow-sm flex items-center gap-3 hover:scale-[1.01] transition-transform"
              >
                <div className="w-10 h-10 rounded-xl bg-black text-[#CCFF00] flex items-center justify-center font-black">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-black/60 block">Academic Consultation Email</span>
                  <span className="text-sm text-black">projects.notx@gmail.com</span>
                </div>
              </a>

              {/* Direct Phone */}
              <a
                href="tel:+919000639955"
                className="p-4 bg-white rounded-2xl border border-black/10 shadow-sm flex items-center gap-3 hover:scale-[1.01] transition-transform"
              >
                <div className="w-10 h-10 rounded-xl bg-black text-[#CCFF00] flex items-center justify-center font-black">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-black/60 block">Direct Telephone Hotline</span>
                  <span className="text-sm text-black">+91 9000639955 (Mon - Sat)</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Contact Form Card (7 cols) */}
          <div className="lg:col-span-7 bg-white p-7 sm:p-10 rounded-3xl border border-black/10 shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-[#CCFF00] text-black rounded-2xl shadow-md flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-black mb-2">
                  Inquiry Dispatched to NOTX!
                </h3>
                <p className="text-xs sm:text-sm font-bold text-black/70 max-w-sm mb-6">
                  Our technical coordinators will review your topic synopsis and reach out to {formData.email || "your email/phone"} within 4 hours with feasibility notes and an itemized quotation.
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://wa.me/919000639955?text=Hi%20NOTX%2C%20I%20just%20submitted%20an%20inquiry%20form%20for%20my%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-[#25D366] text-white font-black text-xs uppercase rounded-full shadow-md flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    Ping on WhatsApp
                  </a>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 bg-black text-white font-black text-xs uppercase rounded-full shadow-md"
                  >
                    Submit Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-black/10 pb-3 mb-2 flex items-center justify-between">
                  <span className="font-black text-sm uppercase text-black">
                    Quick Consultation Form
                  </span>
                  <span className="text-[10px] font-black uppercase px-3 py-1 bg-[#CCFF00] rounded-full border border-black/10">
                    Response within 4 Hours
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase text-black mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Rivera"
                      className="w-full px-4 py-3 bg-[#FBF8F1] rounded-2xl border border-black/10 text-xs font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#CCFF00] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-black mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. student@college.edu"
                      className="w-full px-4 py-3 bg-[#FBF8F1] rounded-2xl border border-black/10 text-xs font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#CCFF00] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase text-black mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 9876543210"
                      className="w-full px-4 py-3 bg-[#FBF8F1] rounded-2xl border border-black/10 text-xs font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#CCFF00] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-black mb-1">
                      Engineering Domain *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as ProjectCategory })}
                      className="w-full px-4 py-3 bg-[#FBF8F1] rounded-2xl border border-black/10 text-xs font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#CCFF00] transition-all"
                    >
                      <option value="AI/ML">AI / Machine Learning</option>
                      <option value="Full Stack Development">Full Stack Development</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile Applications">Mobile Applications</option>
                      <option value="IoT">IoT (Internet of Things)</option>
                      <option value="Software Development">Software Development</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1">
                    University / College Name
                  </label>
                  <input
                    type="text"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder="e.g. NIT Trichy / VTU / Anna University"
                    className="w-full px-4 py-3 bg-[#FBF8F1] rounded-2xl border border-black/10 text-xs font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#CCFF00] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1">
                    Problem Synopsis or Inquired Plan *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project topic, required algorithms or frameworks, or ask about Standard (₹4,000) vs Premium (₹5,000) plans or student group discounts..."
                    className="w-full px-4 py-3 bg-[#FBF8F1] rounded-2xl border border-black/10 text-xs font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#CCFF00] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-black text-[#CCFF00] font-black text-xs uppercase tracking-wider rounded-full shadow-md hover:shadow-glow-lime hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                >
                  DISPATCH INQUIRY TO NOTX ARCHITECTS &rarr;
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
