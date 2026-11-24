"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!profile) {
        router.push("/login");
        return;
      }

      if (allowedRoles && !allowedRoles.includes(profile.role)) {
        // Redirect to user's assigned role dashboard
        router.push(`/${profile.role}`);
      }
    }
  }, [profile, loading, allowedRoles, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="p-8 flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl mb-4 shadow-subtle animate-pulse">
            N
          </div>
          <div className="flex items-center gap-2 text-slate-600 font-medium text-sm">
            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
            Loading NOTX secure workspace...
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(profile.role)) {
    return null;
  }

  return <>{children}</>;
}
