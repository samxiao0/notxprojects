"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Bell, Menu, X, ShieldCheck, Check } from "lucide-react";
import { mockStore } from "@/lib/mock-store";

export default function AdminHeader() {
  const { profile } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notifications = profile ? mockStore.getNotifications(profile.uid) : [];
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const links = [
    { href: "/admin", label: "Overview" },
    { href: "/admin/students", label: "Students" },
    { href: "/admin/developers", label: "Developers" },
    { href: "/admin/projects", label: "Projects" },
    { href: "/admin/quotations", label: "Quotations" },
    { href: "/admin/payments", label: "Payments" },
    { href: "/admin/assignments", label: "Assignments" },
    { href: "/admin/files", label: "Vault" },
    { href: "/admin/activity-logs", label: "Activity Logs" },
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200/90 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <div className="lg:hidden flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-600 text-white font-extrabold text-xs flex items-center justify-center">
            N
          </div>
          <span className="font-extrabold text-sm text-slate-900">NOTX Admin</span>
        </div>
        <div className="hidden sm:block text-xs text-slate-500 font-medium">
          Master Console • <strong className="text-slate-800">{profile?.displayName || "Elena Rostova"}</strong>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Full Clearance</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-float p-3 z-50 animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                <span className="text-xs font-bold text-slate-800">Admin Alerts</span>
                <span className="text-[10px] text-purple-600 font-semibold">{unreadCount} new</span>
              </div>
              <div className="max-h-64 overflow-y-auto space-y-2">
                {notifications.length === 0 ? (
                  <div className="text-center py-4 text-xs text-slate-400">No notifications</div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2.5 rounded-xl text-xs transition-colors ${
                        n.isRead ? "bg-slate-50 text-slate-600" : "bg-purple-50/60 text-slate-900 font-medium"
                      }`}
                    >
                      <div className="font-semibold text-slate-800 text-[11px] mb-0.5">{n.title}</div>
                      <div className="text-[10px] text-slate-500 leading-tight mb-1">{n.message}</div>
                      {!n.isRead && (
                        <button
                          onClick={() => mockStore.markNotificationAsRead(n.id)}
                          className="text-[9px] text-purple-600 font-bold hover:underline flex items-center gap-1"
                        >
                          <Check className="w-2.5 h-2.5" /> Mark read
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center">
          {profile?.displayName?.charAt(0) || "A"}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bg-white border-b border-slate-200 p-4 shadow-float z-40 space-y-2 max-h-[80vh] overflow-y-auto animate-in slide-in-from-top-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:text-purple-600 hover:bg-slate-50 rounded-lg"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
