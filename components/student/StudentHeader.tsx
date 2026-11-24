"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Bell, Search, PlusCircle, Check } from "lucide-react";
import { mockStore } from "@/lib/mock-store";

export default function StudentHeader() {
  const { profile } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notifications = profile ? mockStore.getNotifications(profile.uid) : [];
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="h-16 bg-white border-b border-slate-200/90 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <div className="lg:hidden flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center">
            N
          </div>
          <span className="font-extrabold text-sm text-slate-900">NOTX</span>
        </div>
        <div className="hidden sm:block text-xs text-slate-500 font-medium">
          Welcome back, <strong className="text-slate-800">{profile?.displayName || "Student"}</strong>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="/student/new-project"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-xs"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          New Requirement
        </Link>

        {/* Notifications toggle */}
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
                <span className="text-xs font-bold text-slate-800">Notifications</span>
                <span className="text-[10px] text-blue-600 font-semibold">{unreadCount} new</span>
              </div>
              <div className="max-h-64 overflow-y-auto space-y-2">
                {notifications.length === 0 ? (
                  <div className="text-center py-4 text-xs text-slate-400">No notifications</div>
                ) : (
                  notifications.slice(0, 5).map((n) => (
                    <div
                      key={n.id}
                      className={`p-2.5 rounded-xl text-xs transition-colors ${
                        n.isRead ? "bg-slate-50 text-slate-600" : "bg-blue-50/60 text-slate-900 font-medium"
                      }`}
                    >
                      <div className="font-semibold text-slate-800 text-[11px] mb-0.5">{n.title}</div>
                      <div className="text-[10px] text-slate-500 leading-tight mb-1">{n.message}</div>
                      {!n.isRead && (
                        <button
                          onClick={() => mockStore.markNotificationAsRead(n.id)}
                          className="text-[9px] text-blue-600 font-bold hover:underline flex items-center gap-1"
                        >
                          <Check className="w-2.5 h-2.5" /> Mark as read
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
              <div className="pt-2 border-t border-slate-100 mt-2 text-center">
                <Link
                  href="/student/notifications"
                  onClick={() => setNotificationsOpen(false)}
                  className="text-[11px] text-blue-600 font-semibold hover:underline"
                >
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <Link href="/student/profile" className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
            {profile?.displayName?.charAt(0) || "S"}
          </div>
        </Link>
      </div>
    </header>
  );
}
