"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Company, AuthContextType } from "@/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load session from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedCompany = localStorage.getItem("company");

    if (storedUser && storedCompany) {
      setUser(JSON.parse(storedUser));
      setCompany(JSON.parse(storedCompany));
    }

    setIsLoading(false);
  }, []);

  const loadStoredUsers = (): User[] => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  };

  const loadStoredCompanies = (): Company[] => {
    const companies = localStorage.getItem("companies");
    return companies ? JSON.parse(companies) : [];
  };

  const saveStoredUsers = (users: User[]) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  const saveStoredCompanies = (companies: Company[]) => {
    localStorage.setItem("companies", JSON.stringify(companies));
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const users = loadStoredUsers();
      const foundUser = users.find((u) => u.email === email);

      const mockPasswords: Record<string, string> = {
        "admin@company.com": "password",
        "jane@company.com": "password",
        "mike@company.com": "password",
        "sarah@company.com": "password",
      };

      const isMockUser = Object.keys(mockPasswords).includes(email);
      const isPasswordValid = isMockUser ? password === mockPasswords[email] : password === "password"; // default password check for new users

      if (!foundUser || !isPasswordValid) {
        throw new Error("Invalid credentials");
      }

      const companies = loadStoredCompanies();
      const userCompany = companies.find((c) => c.id === foundUser.companyId);

      if (!userCompany) {
        throw new Error("Company not found");
      }

      setUser(foundUser);
      setCompany(userCompany);

      localStorage.setItem("user", JSON.stringify(foundUser));
      localStorage.setItem("company", JSON.stringify(userCompany));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async ({
    name,
    email,
    password,
    country,
    currency,
  }: {
    name: string;
    email: string;
    password: string;
    country: string;
    currency: string;
  }) => {
    setIsLoading(true);
    try {
      const users = loadStoredUsers();
      const companies = loadStoredCompanies();

      const userExists = users.some((u) => u.email === email);
      if (userExists) {
        throw new Error("User already exists");
      }

      const newCompanyId = crypto.randomUUID();
      const newUserId = crypto.randomUUID();

      const newCompany: Company = {
        id: newCompanyId,
        name: `${name}'s Company`,
        country,
        currency,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const newUser: User = {
        id: newUserId,
        email,
        name,
        role: "employee",
        companyId: newCompanyId,
        isManagerApprover: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Save to "database"
      const updatedUsers = [...users, newUser];
      const updatedCompanies = [...companies, newCompany];
      saveStoredUsers(updatedUsers);
      saveStoredCompanies(updatedCompanies);

      // Set session
      setUser(newUser);
      setCompany(newCompany);
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("company", JSON.stringify(newCompany));
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setCompany(null);
    localStorage.removeItem("user");
    localStorage.removeItem("company");
  };

  return (
    <AuthContext.Provider value={{ user, company, login, logout, signup, isLoading }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
