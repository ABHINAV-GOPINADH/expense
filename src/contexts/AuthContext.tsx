"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/firebase/config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { sign } from "crypto";

const db = getFirestore(auth.app);

interface SignupData {
  name: string;
  email: string;
  password: string;
  country?: string;
  currency?: string;
  role?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Monitor Firebase Auth state
  useEffect(() => {
    // Check for existing session on mount
    const storedUser = localStorage.getItem("user");
    const storedCompany = localStorage.getItem("company");

    if (storedUser && storedCompany) {
      setUser(JSON.parse(storedUser));
      setCompany(JSON.parse(storedCompany));
    }
    setIsLoading(false);
  }, []);

  // Login method
  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Signup method
  const signup = async ({ name, email, password, country, currency, role = "admin" }: SignupData) => {
    // 1️⃣ Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // 2️⃣ Update display name
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: name });
    }

    // 3️⃣ Save additional info to Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      name,
      email,
      country: country || "",
      currency: currency || "",
      role, // 👈 store role
      createdAt: new Date(),
    });
  };

  // Logout method
  const logout = async () => {
    await signOut(auth);
    window.location.href = "/login"; // Redirect to login page
  };

  return <AuthContext.Provider value={{ user, login, logout, signup }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
