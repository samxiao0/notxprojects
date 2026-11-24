"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Code,
  FolderGit2,
  FileSpreadsheet,
  UserCheck,
  FileBox,
  MessageSquare,
  CreditCard,
  Bell,
  ScrollText,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout, profile } = useAuth();

  const links = [
    { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
    { href: "/admin/students", label: "Students", icon: Users },
    { href: "/admin/developers", label: "Developers", icon: Code },
    { href: "/admin/projects", label: "Projects", icon: FolderGit2 },
    { href: "/admin/quotations", label: "Quotations", icon: FileSpreadsheet },
    { href: "/admin/payments", label: "Payments Desk", icon: CreditCard },
    { href: "/admin/assignments", label: "Assignments", icon: UserCheck },
    { href: "/admin/files", label: "Master Vault", icon: FileBox },
    { href: "/admin/messages", label: "Messages", icon: MessageSquare },
    { href: "/admin/activity-logs", label: "Activity Logs", icon: ScrollText },
    { href: "/admin/notifications", label: "Notifications", icon: Bell },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between shrink-0 h-screen sticky top-0 select-none hidden lg:flex">
      <div className="flex flex-col h-[calc(100vh-80px)]">
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100 shrink-0">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white font-extrabold text-base flex items-center justify-center shadow-xs">
              N
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-slate-900 text-base tracking-tight leading-tight">
                NOTX
              </span>
              <span className="text-[10px] text-purple-600 font-bold tracking-wider uppercase">
                Admin Console
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items (Scrollable) */}
        <nav className="p-3 space-y-0.5 overflow-y-auto flex-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = link.exact
              ? pathname === link.href
              : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? "bg-purple-50 text-purple-700 font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-purple-600" : "text-slate-400"}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile & Logout */}
      <div className="p-4 border-t border-slate-100 shrink-0">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center shrink-0">
              {profile?.displayName?.charAt(0) || "A"}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-800 truncate">
                {profile?.displayName || "Elena Rostova"}
              </div>
              <div className="text-[10px] text-purple-600 font-medium truncate">
                Director of Operations
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
