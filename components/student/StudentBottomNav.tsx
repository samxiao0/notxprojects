"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderGit2,
  FileBox,
  MessageSquare,
  PlusCircle,
} from "lucide-react";

export default function StudentBottomNav() {
  const pathname = usePathname();

  const items = [
    { href: "/student", label: "Overview", icon: LayoutDashboard, exact: true },
    { href: "/student/projects", label: "Projects", icon: FolderGit2 },
    { href: "/student/new-project", label: "Submit", icon: PlusCircle, isAction: true },
    { href: "/student/files", label: "Files", icon: FileBox },
    { href: "/student/messages", label: "Messages", icon: MessageSquare },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/90 z-40 px-2 py-1 flex items-center justify-around h-16 shadow-subtle">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);

        if (item.isAction) {
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center -mt-5"
            >
              <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md hover:bg-blue-700 transition-colors">
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-semibold text-slate-700 mt-0.5">
                {item.label}
              </span>
            </Link>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-colors ${
              isActive ? "text-blue-600 font-bold" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
