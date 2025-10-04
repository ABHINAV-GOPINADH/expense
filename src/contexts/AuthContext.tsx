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
}

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Monitor Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  // Login method
  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Signup method
  const signup = async ({ name, email, password, country, currency }: SignupData) => {
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
      createdAt: new Date(),
    });
  };

  // Logout method
  const logout = async () => {
    await signOut(auth);
    window.location.href = "/login"; // Redirect to login page
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
