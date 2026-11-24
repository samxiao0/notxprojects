"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types";
import { ShieldCheck, User, Code, Sparkles, ChevronUp, ChevronDown, Check } from "lucide-react";

export default function DemoRoleSwitcher() {
  const { profile, switchDemoRole, isDemoMode } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Show the role switcher whenever demo/evaluating mode is active, or for rapid reviewer testing
  return (
    <div className="fixed bottom-4 right-4 z-50 print:hidden font-sans">
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-float overflow-hidden transition-all duration-200 text-xs text-slate-700">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 px-3.5 py-2.5 hover:bg-slate-50 transition-colors w-full text-left"
          title="Switch Active Testing Role"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          <div className="flex flex-col">
            <span className="font-semibold text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Role Preview
            </span>
            <span className="text-[10px] text-slate-500 capitalize">
              Active: <strong className="text-blue-700">{profile?.role || "Visitor"}</strong>
            </span>
          </div>
          {isOpen ? (
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-2" />
          ) : (
            <ChevronUp className="w-3.5 h-3.5 text-slate-400 ml-2" />
          )}
        </button>

        {isOpen && (
          <div className="p-2 pt-0 border-t border-slate-100 flex flex-col gap-1 w-64">
            <div className="px-2 py-1.5 text-[10px] text-slate-400 font-medium uppercase tracking-wider">
              Switch Workspace View
            </div>

            <button
              onClick={() => {
                switchDemoRole("student");
                setIsOpen(false);
              }}
              className={`flex items-center justify-between p-2 rounded-xl transition-colors ${
                profile?.role === "student"
                  ? "bg-blue-50 text-blue-700 font-semibold border border-blue-200"
                  : "hover:bg-slate-50 text-slate-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  <User className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <div className="text-xs">Student Portal</div>
                  <div className="text-[10px] text-slate-400 font-normal">Alex Rivera (Stanford)</div>
                </div>
              </div>
              {profile?.role === "student" && <Check className="w-3.5 h-3.5 text-blue-600" />}
            </button>

            <button
              onClick={() => {
                switchDemoRole("developer");
                setIsOpen(false);
              }}
              className={`flex items-center justify-between p-2 rounded-xl transition-colors ${
                profile?.role === "developer"
                  ? "bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200"
                  : "hover:bg-slate-50 text-slate-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                  <Code className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <div className="text-xs">Developer Portal</div>
                  <div className="text-[10px] text-slate-400 font-normal">Marcus Vance (Full-Stack/AI)</div>
                </div>
              </div>
              {profile?.role === "developer" && <Check className="w-3.5 h-3.5 text-emerald-600" />}
            </button>

            <button
              onClick={() => {
                switchDemoRole("admin");
                setIsOpen(false);
              }}
              className={`flex items-center justify-between p-2 rounded-xl transition-colors ${
                profile?.role === "admin"
                  ? "bg-purple-50 text-purple-700 font-semibold border border-purple-200"
                  : "hover:bg-slate-50 text-slate-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <div className="text-xs">Admin Console</div>
                  <div className="text-[10px] text-slate-400 font-normal">Elena Rostova (Operations)</div>
                </div>
              </div>
              {profile?.role === "admin" && <Check className="w-3.5 h-3.5 text-purple-600" />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
