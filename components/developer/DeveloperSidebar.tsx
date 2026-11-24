"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderGit2,
  FileBox,
  MessageSquare,
  Award,
  Bell,
  User,
  Settings,
  LogOut,
  Upload,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function DeveloperSidebar() {
  const pathname = usePathname();
  const { logout, profile } = useAuth();

  const links = [
    { href: "/developer", label: "Overview", icon: LayoutDashboard, exact: true },
    { href: "/developer/projects", label: "Assigned Projects", icon: FolderGit2 },
    { href: "/developer/milestones", label: "Milestones & Delivery", icon: Award },
    { href: "/developer/files", label: "Deliverables & Vault", icon: FileBox },
    { href: "/developer/messages", label: "Student Chat", icon: MessageSquare },
    { href: "/developer/notifications", label: "Notifications", icon: Bell },
    { href: "/developer/profile", label: "Developer Profile", icon: User },
    { href: "/developer/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between shrink-0 h-screen sticky top-0 select-none hidden lg:flex">
      <div>
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <Link href="/developer" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-extrabold text-base flex items-center justify-center shadow-xs">
              N
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-slate-900 text-base tracking-tight leading-tight">
                NOTX
              </span>
              <span className="text-[10px] text-emerald-600 font-bold tracking-wider uppercase">
                Developer Console
              </span>
            </div>
          </Link>
        </div>

        {/* Quick Deliverable Upload Action */}
        <div className="px-4 py-4">
          <Link
            href="/developer/files?action=upload"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 shadow-sm transition-all"
          >
            <Upload className="w-4 h-4" />
            Upload B2 Deliverable
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="px-3 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = link.exact
              ? pathname === link.href
              : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700 font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-emerald-600" : "text-slate-400"}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile & Logout */}
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0">
              {profile?.displayName?.charAt(0) || "D"}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-800 truncate">
                {profile?.displayName || "Marcus Vance"}
              </div>
              <div className="text-[10px] text-emerald-600 font-medium truncate">
                Verified Senior Engineer
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
