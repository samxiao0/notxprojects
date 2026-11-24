"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile as updateFirebaseProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "@/lib/firebase/client";
import { UserProfile, UserRole } from "@/types";
import { initialUsers } from "@/lib/mock-data";
import { mockStore } from "@/lib/mock-store";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  isDemoMode: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; role?: UserRole; error?: string }>;
  register: (
    email: string,
    pass: string,
    displayName: string,
    role?: UserRole
  ) => Promise<{ success: boolean; role?: UserRole; error?: string }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  switchDemoRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(!isFirebaseConfigured);
  const router = useRouter();

  // Load demo profile or initial saved profile from localStorage
  useEffect(() => {
    if (!isFirebaseConfigured) {
      setIsDemoMode(true);
      const savedRole = (typeof window !== "undefined" && localStorage.getItem("notx_demo_role")) as UserRole;
      const initialUser = initialUsers.find((u) => u.role === (savedRole || "student")) || initialUsers[0];
      setProfile(initialUser);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setUser(fbUser);
      if (fbUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", fbUser.uid));
          if (userDoc.exists()) {
            setProfile(userDoc.data() as UserProfile);
          } else {
            // Default profile for newly registered users
            const defaultProfile: UserProfile = {
              uid: fbUser.uid,
              email: fbUser.email || "",
              displayName: fbUser.displayName || "New User",
              role: "student", // All new registrations default to student
              status: "active",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            await setDoc(doc(db, "users", fbUser.uid), defaultProfile);
            setProfile(defaultProfile);
          }
        } catch (err) {
          console.error("Error fetching user profile from Firestore:", err);
          // Fallback to local profile
          const mockUser = initialUsers.find((u) => u.email === fbUser.email) || initialUsers[0];
          setProfile(mockUser);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      if (!isFirebaseConfigured) {
        // Find matching demo user or match by role/email
        let matched = initialUsers.find(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );
        if (!matched) {
          if (email.includes("admin")) matched = initialUsers[2];
          else if (email.includes("dev")) matched = initialUsers[1];
          else matched = initialUsers[0];
        }
        setProfile(matched);
        if (typeof window !== "undefined") {
          localStorage.setItem("notx_demo_role", matched.role);
        }
        return { success: true, role: matched.role };
      }

      const cred = await signInWithEmailAndPassword(auth, email, pass);
      const userDoc = await getDoc(doc(db, "users", cred.user.uid));
      let role: UserRole = "student";
      if (userDoc.exists()) {
        const data = userDoc.data() as UserProfile;
        setProfile(data);
        role = data.role;
      }
      return { success: true, role };
    } catch (err: any) {
      console.error("Login failed:", err);
      return { success: false, error: err.message || "Failed to sign in. Please verify your credentials." };
    }
  };

  const register = async (
    email: string,
    pass: string,
    displayName: string,
    role: UserRole = "student"
  ) => {
    try {
      // Per requirements: New registrations MUST default to Student!
      const assignedRole: UserRole = "student";

      if (!isFirebaseConfigured) {
        const newUser: UserProfile = {
          uid: `user-${Date.now()}`,
          email,
          displayName,
          role: assignedRole,
          status: "active",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setProfile(newUser);
        if (typeof window !== "undefined") {
          localStorage.setItem("notx_demo_role", newUser.role);
        }
        return { success: true, role: assignedRole };
      }

      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      await updateFirebaseProfile(cred.user, { displayName });

      const newProfile: UserProfile = {
        uid: cred.user.uid,
        email: cred.user.email || email,
        displayName,
        role: assignedRole,
        status: "active",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await setDoc(doc(db, "users", cred.user.uid), newProfile);
      setProfile(newProfile);

      return { success: true, role: assignedRole };
    } catch (err: any) {
      console.error("Registration failed:", err);
      return { success: false, error: err.message || "Registration failed." };
    }
  };

  const logout = async () => {
    if (isFirebaseConfigured) {
      await signOut(auth);
    }
    setProfile(null);
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("notx_demo_role");
    }
    router.push("/login");
  };

  const resetPassword = async (email: string) => {
    try {
      if (isFirebaseConfigured) {
        await sendPasswordResetEmail(auth, email);
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Password reset failed." };
    }
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!profile) return;
    const updated = { ...profile, ...updates, updatedAt: new Date().toISOString() };
    setProfile(updated);

    if (isFirebaseConfigured && user) {
      try {
        await setDoc(doc(db, "users", user.uid), updated, { merge: true });
      } catch (e) {
        console.error("Firestore profile update error:", e);
      }
    } else {
      mockStore.updateUser(profile.uid, updates);
    }
  };

  const switchDemoRole = (role: UserRole) => {
    const demoUser = initialUsers.find((u) => u.role === role) || initialUsers[0];
    setProfile(demoUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("notx_demo_role", role);
    }
    router.push(`/${role}`);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isDemoMode,
        login,
        register,
        logout,
        resetPassword,
        updateUserProfile,
        switchDemoRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
