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
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const db = getFirestore(auth.app);

interface SignupData {
  name: string;
  email: string;
  password: string;
  country?: string;
  currency?: string;
  role?: string;
}

interface UserProfile {
  name: string;
  email: string;
  country: string;
  currency: string;
  role: string;
  createdAt: any;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  login: (email: string, password: string) => Promise<any>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        // Fetch user profile from Firestore
        const docRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserProfile(docSnap.data() as UserProfile);
        } else {
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async ({ name, email, password, country = "", currency = "", role = "admin" }: SignupData) => {
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
      country,
      currency,
      role,
      createdAt: new Date(),
    });
  };

  const logout = async () => {
    await signOut(auth);
    window.location.href = "/login"; // Redirect to login page
  };

  if (isLoading) {
    return null;
  }

  return <AuthContext.Provider value={{ user, userProfile, login, signup, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
