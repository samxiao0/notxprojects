"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderGit2,
  FileSpreadsheet,
  FileBox,
  MessageSquare,
  CreditCard,
  Bell,
  User,
  Settings,
  LogOut,
  PlusCircle,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function StudentSidebar() {
  const pathname = usePathname();
  const { logout, profile } = useAuth();

  const links = [
    { href: "/student", label: "Overview", icon: LayoutDashboard, exact: true },
    { href: "/student/projects", label: "My Projects", icon: FolderGit2 },
    { href: "/student/quotations", label: "Quotations", icon: FileSpreadsheet },
    { href: "/student/payments", label: "Payments & Invoices", icon: CreditCard },
    { href: "/student/files", label: "Project Files", icon: FileBox },
    { href: "/student/messages", label: "Messages", icon: MessageSquare },
    { href: "/student/notifications", label: "Notifications", icon: Bell },
    { href: "/student/profile", label: "Profile", icon: User },
    { href: "/student/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex w-64 bg-white border-r border-slate-200/90 flex-col justify-between shrink-0 h-screen sticky top-0 select-none">
      <div>
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <Link href="/student" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-extrabold text-base flex items-center justify-center shadow-xs">
              N
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-slate-900 text-base tracking-tight leading-tight">
                NOTX
              </span>
              <span className="text-[10px] text-blue-600 font-bold tracking-wider uppercase">
                Student Workspace
              </span>
            </div>
          </Link>
        </div>

        {/* Submit Requirement Action */}
        <div className="px-4 py-4">
          <Link
            href="/student/new-project"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 shadow-sm transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            Submit Requirement
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
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
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
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
              {profile?.displayName?.charAt(0) || "S"}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-800 truncate">
                {profile?.displayName || "Student"}
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {profile?.email || "student@notx.dev"}
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
